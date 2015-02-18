var dataType;
var id = "{00000000-0000-0000-0000-000000000000}";
var vm;
var details;

$(function () {
   // debugger;
    var crmItems = [];
    var params = parseQueryString();
    if (params["id"] != null)
        id = params["id"];
    if (params["data"] != null)
        dataType = getDataType(params["data"]);
//    $.ajax({
//        url: "new_configlu"
//    }).done(function (data) {
       $.getJSON("new_configlu" ,function (data) {
        //data = eval("(" + data + ")");
        var finditem = jQuery.grep(data.items, function (obj) {
            return obj!=null && obj.name === dataType;
        });
      
        var url = getUrl(data.port, data.url);
        details = finditem[0].details;
        loadData(url, details, id, function (xhr) {
            var xml = xhr.responseXML;
            var isErrorNode = xml.selectSingleNode("//IsError");
            if (isErrorNode == null || isErrorNode.text == "true") {
                alert("error occur");
                return;
            }
            $(xml).find('Items').find('RecItem').each(function () {
                var id = $(this).find('Id').text();
                var isSelected = $(this).find('IsSelected').text() == "true" ? true : false;
                var name = $(this).find('Name').text();
                crmItems.push({ Id: id, isSelected: isSelected, Name: name });
            });
            vm = new AppViewModel(crmItems);
            ko.applyBindings(vm);
            vm.descf();
        }
        );
    });
});
function getDataType(p) {
    var l = p.replace(/\+/g, " ").split("="); //.split("%3d");
    return l[1];
}
function getUrl(port,path) {
    return "//"+location.hostname +":" + port+ "/" + path;
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
        var iHeight = '550';
        var bCenter = true;
        bResize = true;
        var iWidth = '600';
        var sFeatures = "dialogHeight: " + iHeight + "px; dialogWidth: " + iWidth + "px; ; center: " + bCenter + ";resizable: " + bResize + ";"; // status: " + bStatus + ";";
        window.showModalDialog("new_dialoguipl.htm", vm, sFeatures);
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
    self.reset = function () {
    };
}
function loadData(url, data, id, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', url, false);
    // build SOAP request
    var sr = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                    '<soap:Body>' +
                       ' <' + data.method + ' xmlns="http://tempuri.org/">' +
                               '<r>' +
                                '<RecId>' + id + '</RecId>' +
                                '</r>' +
                        '</' + data.method + '>' +
                    '</soap:Body>' +
                '</soap:Envelope>';
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) 
                callback(xmlhttp);
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
}