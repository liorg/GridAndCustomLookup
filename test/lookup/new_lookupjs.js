var dataType;
var id = "{00000000-0000-0000-0000-000000000000}";
var vm;
var details;
var url;
var iHeight = '550';
var bCenter = true;
var bResize = true;
var iWidth = '600';
var dirtyData = [];
$(function () {
    var crmItems = [];
    var params = parseQueryString();
    if (params["id"] != null)
        id = params["id"];
    if (params["data"] != null)
        dataType = getDataType(params["data"]);
    callConfig(function (data) {
        var finditem = jQuery.grep(data.items, function (obj) {
            return obj != null && obj.name === dataType;
        });
        url = getUrl(data.port, data.url);
        details = finditem[0].details;
        loadData(url, details, id, true, function (xhr, isAjax) {
            if (isAjax) {
                errorHandler(xhr);
                var xml = xhr.responseXML;
                crmItems = xmlToJsonArray(xml);
                vm = new AppViewModel(crmItems);
                ko.applyBindings(vm);
                vm.descf();
                loadFilteredDirty(details);
            }
        }
        );
    });
});
function getDataType(p) {
    var l = p.replace(/\+/g, " ").split("="); //.split("%3d");
    return l[1];
}
function getUrl(port, path) {
    return "//" + location.hostname + ":" + port + "/" + path;
}
function parseQueryString() {
    var str = decodeURIComponent(window.location.search);
    var objURL = {};
    str.replace(
        new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        function ($0, $1, $2, $3) {
            objURL[$1] = $3;
        }
    );
    return objURL;
};
function AppViewModel(items) {
    var self = this;
    self.crmItems = ko.observableArray(items);
    self.opwenui = function () {
        loadData(url, details, id, false, function (xhr, isAjax) {
            if (isAjax) {
                var crmItems = [];
                errorHandler(xhr);
                var xml = xhr.responseXML;
                crmItems = xmlToJsonArray(xml);
                vm.crmItems(crmItems);
                vm.descf();
            }
            var sFeatures = "dialogHeight: " + iHeight + "px; dialogWidth: " + iWidth + "px; ; center: " + bCenter + ";resizable: " + bResize + ";"; // status: " + bStatus + ";";
            window.showModalDialog("new_dialoguipl.htm", vm, sFeatures);
        })
    };
    self.desc = ko.observable("desc");
    self.descf = function () {
        var temp = "";
        var tempId = "";
        ko.utils.arrayForEach(this.crmItems(), function (item) {
            if (item != null && item.isSelected) {
                temp += item.Name + ";";
                tempId += item.Id + ";";
            }
        });
        self.desc(temp);
        setParentXrm(details.field, tempId);
    };
    self.reset = function (oldData) {
        self.crmItems(oldData);
        self.descf();
    };
}
function checkDirtyFiltered(data) {
    //debugger;
    if (dirtyData == null)
        loadFilteredDirty(data);

    if (dirtyData != null && dirtyData.length > 0 && data.listnersFields != null && data.listnersFields.length > 0) {
        for (i = 0; i < data.listnersFields.length; i++) {
            var finditem = jQuery.grep(dirtyData, function (obj) {
                return obj != null && obj.name === data.listnersFields[i].name;
            });
            var value = getParentXrm(data.listnersFields[i].name, data.listnersFields[i].type);
            if (finditem != null && finditem[0] != null && finditem[0].val != value) {
                finditem[0].val = value;
                return true;
            }
        }
    }
    return false;
}

function loadFilteredDirty(data) {
    //debugger;
    if (data.listnersFields != null && data.listnersFields.length > 0) {
        for (i = 0; i < data.listnersFields.length; i++) {
            var v = getParentXrm(data.listnersFields[i].name, data.listnersFields[i].type);
            dirtyData.push({ "name": data.listnersFields[i].name, "val": v });
        }
    }
}
function loadData(url, data, id, isLoad, callback) {
    //debugger;
    var xmlhttp = new XMLHttpRequest();
    if (!isLoad && !checkDirtyFiltered(data)) {
        callback(xmlhttp, false);
        return;
    }

    xmlhttp.open('POST', url, false);
    var filterFields = "";
    // build SOAP request
    if (data == null || data.method == null)
        throw "קונפיגורציה לא תקינה";
    if (data.listnersFields != null && data.listnersFields.length > 0) {
        for (i = 0; i < data.listnersFields.length; i++) {
            filterFields = filterFields + "<ParamKeyValuePair>";
            var value = getParentXrm(data.listnersFields[i].name, data.listnersFields[i].type);
            filterFields = filterFields + "<Key>" + data.listnersFields[i].name + "</Key>";
            filterFields = filterFields + "<Value>" + value + "</Value>";
            filterFields = filterFields + "<TypeObj>" + data.listnersFields[i].type + "</TypeObj>";
            filterFields = filterFields + "</ParamKeyValuePair>";
        }
    }
    var sr = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body>' +
                       ' <' + data.method + ' xmlns="http://tempuri.org/">' +
                               '<r>' +
                                '<RecId>' + id + '</RecId>' +
                                 '<Params>' +
                                 filterFields +
                                 '</Params>' +
                                '</r>' +
                        '</' + data.method + '>' +
                    '</soap:Body>' +
                '</soap:Envelope>';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200)
                callback(xmlhttp, true);
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
}

function errorHandler(xhr) {
    if (xhr == null)
        throw "error geting data xhr webservice";
    var xml = xhr.responseXML;
    var isErrorNode = xml.selectSingleNode("//IsError");
    if (isErrorNode == null || isErrorNode.text == "true") {
        throw "error geting data webservice";
    }
}
function xmlToJsonArray(xml) {
    var crmItems = [];
    $(xml).find('Items').find('RecItem').each(function () {
        var id = $(this).find('Id').text();
        var isSelected = $(this).find('IsSelected').text() == "true" ? true : false;
        var name = $(this).find('Name').text();
        crmItems.push({ Id: id, isSelected: isSelected, Name: name });
    });
    return crmItems;
}