//var maxRecords;// max records saved
function dataSender(id, config) {
    // debugger;
    var self = this;
    self.Config = config;
    self.Id = id;
    self.Url = config.Url == "" ? _sServerUrl : config.Url;
    self.caller = null;
    self.Send = function (gridProp, callback, err) {
        //    debugger;
        var fieldsFilter = [];
        for (var i = 0; i < self.Config.Detail.FilterFields.length; i++) {
            var field = self.Config.Detail.FilterFields[i];
            var fieldValue = getParentXrm(self.Config.Detail.IsParentXrm, field.Name, field.TypeField);
            fieldsFilter.push({ "key": field.Name, "val": fieldValue });
        }
        self.caller.Send(gridProp, fieldsFilter, callback, err);
    }
    factory(id, config);
    function factory(id, conifg) {
        switch (config.Detail.SettingGrid.TypeData) {
            case 0:
                self.caller = new clientSender(id, self.Url, conifg.Detail.Method);
                break;
            case 1:
                self.caller = new clientCaller(id, conifg.Detail.Method);
                break;
            case 2:
                self.caller = new fetchSender(id, self.Url, conifg.Org, conifg.Detail.Method, conifg.Detail.Schema);
                break;
            default:
                self.caller = new clientSender(id, self.Url, conifg.Detail.Method);
                break;
        };
    }
}

function clientSender(id, url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, fieldsFilter, callback, err) {
        var url = this.Url + "/" + this.Method;
        var payload = { "request": { Id: id, SettingGrid: gridProp} };
        $.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(payload),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                callback(data.d);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                err(xmlHttpRequest.responseText);
            }
        });
    };
}

function clientCaller(id, method) {
    this.CallerMethod = method;
    this.Send = function (gridProp, fieldsFilter, callback, err) {
        // debugger;
        var payload = { "request": { Id: id, SettingGrid: gridProp} };
        try {
            var func = window.parent[this.CallerMethod];
            var data = func(gridProp); // = window.parent["UnitTest"];
            callback(data.d);

        } catch (e) {
            err(e.Description);
        }
    };
}
function fetchSender(id, server, org, method, schema) {
    //  debugger;
    this.Send = function (gridProp, fieldsFilter, callback, err) {
        debugger;
        var payload = { "request": { Id: id, SettingGrid: gridProp} };
        var parseFetchXml = new ParserFetchXml(method);
        parseFetchXml.Conditions(id, fieldsFilter);
        parseFetchXml.Order(gridProp.SortName, gridProp.SortOrder ? "true" : "false");
        var oService = new FetchUtil(org, server);
        //debugger;
        $.when(counerXml(oService, parseFetchXml, gridProp)).always(function () {
            debugger;
            var records = gridProp.MaxRows == 0 ? 0 :
            gridProp.MaxRows >= (gridProp.MaxPerPage * gridProp.CurrentPage) ? gridProp.MaxPerPage : (gridProp.MaxRows - (gridProp.MaxPerPage * (gridProp.CurrentPage - 1))) > 0 ? (gridProp.MaxRows - (gridProp.MaxPerPage * (gridProp.CurrentPage - 1))) : gridProp.MaxRows; // Math.floor(gridProp.MaxRows / gridProp.CurrentPage);
            // alert(records);
            parseFetchXml.Paging(gridProp.CurrentPage, records);
            var xml = parseFetchXml.Xml();
            $.when(oService.Excute(xml)).then(function (results) {
                // debugger;
                var data = manipulate.call(this, parseFetchXml, gridProp, results);
                callback(data.d);
            }, function (errDesc) {
                err(errDesc);
            }); //end then 
        }); //end always
    }    //end this.Send

    var counerXml = function (oService, parseFetchXml, gridProp) {
        //debugger;
        var deferred = $.Deferred();
        if (gridProp.MaxRows == 0) {
            gridProp.MaxRows = 50;
            var cxml = parseFetchXml.GetCountFetch(gridProp.AggrField);
            var countsData = oService.Excute(cxml);
            countsData.done(function (results) {
                if (results.length > 0) {
                    gridProp.MaxRows = results[0].attributes["c"].value;
                }
                deferred.resolve();
            }).fail(function () {
                deferred.reject("error occur count");
            });
        }
        else {
            deferred.resolve();
        }
        return deferred.promise();
    }
    var manipulate = function (parseFetchXml, gridProp, results) {
        var data = { "d": {
            "__type": "MVSWeb.Grid.Server.ResponseGrid",
            "Id": id,
            "IsError": false,
            "ErrDesc": ""
        }
        };
        data.d.SettingGrid = gridProp;
        data.d.CrmGrid = {};
        data.d.CrmGrid.CrmGridItems = [];
        for (var i = 0; i < results.length; i++) {
            //debugger;
            var attr = results[i].attributes;
            var guid = results[i].guid;
            // when save page crm when open entity from ower custom grid (maybe in rollup it will fixed?)
            // we get "הגישה נדחתה"
            // in event log we see error like this:
            //Exception message: INVALID_WRPC_TOKEN: Validate WRPC Token: WRPCTokenState=Invalid, TOKEN_EXPIRY=4320, IGNORE_TOKEN=False, TOKEN_KEY=1FKttw0LEeWyyQBQVoReG6y0qcdd+Ov5U8mt23kV3gcpy6LwqD92Ma9zKlsL89wE
            // result: from forum(https://social.microsoft.com/Forums/en-US/2ff65a6c-1196-41f5-aad4-85a34368f3e4/invalidwrpctoken-at-associating-records-thru-crm-2011-ui?forum=crm)
            //The fix is to turn off token checks by creating a registry key, with the value 1:
            //HKLM\SOFTWARE\Microsoft\MSCRM\IgnoreTokenCheck (DWORD)
            var openwin = server + "/main.aspx?etn=" + parseFetchXml.GetEntity() + "&pagetype=entityrecord&id=" + encodeURIComponent(guid);
            //var openwin = "/main.aspx?etn=" + parseFetchXml.GetEntity() + "&pagetype=entityrecord&id=" + encodeURIComponent(guid);
            var objItem = { "Id": guid, "subSrc": "", "openwin": openwin };
            objItem.Fields = [];
            for (var j = 0; j < schema.length; j++) {
                var tempValue = "";
                if (attr[schema[j].Name] != null) {
                    tempValue = attr[schema[j].Name].value;
                    if (attr[schema[j].Name].type != null) {
                        if (attr[schema[j].Name].type == "a:OptionSetValue" || attr[schema[j].Name].type == "c:dateTime")
                            tempValue = attr[schema[j].Name].formattedValue;
                        else if (attr[schema[j].Name].type == "a:EntityReference")
                            tempValue = attr[schema[j].Name].name;
                    }

                }
                objItem.Fields.push({ "Key": schema[j].Name, "Val": tempValue });
            } //end loop schema
            data.d.CrmGrid.CrmGridItems.push(objItem);
        } //end loop results
        return data;
    }
} // end fetchSender

/*
function fetchSenderOld(id, server, org, method, schema) {
//  debugger;
this.Send = function (gridProp, fieldsFilter, callback, err) {
// debugger;
var payload = { "request": { Id: id, SettingGrid: gridProp} };
var parseFetchXml = new ParserFetchXml(method);
parseFetchXml.Conditions(id, fieldsFilter);
parseFetchXml.Order(gridProp.SortName, gridProp.SortOrder ? "true" : "false");
var xml = parseFetchXml.Xml();
var oService = new FetchUtil(org, server);
oService.Fetch(xml, function (results) {
//  debugger;
var data = { "d": {
"__type": "MVSWeb.Grid.Server.ResponseGrid",
"Id": id,
"IsError": false,
"ErrDesc": ""
}
};
data.d.SettingGrid = gridProp;
data.d.CrmGrid = {};
data.d.CrmGrid.CrmGridItems = [];
for (var i = 0; i < results.length; i++) {
//debugger;
var attr = results[i].attributes;
var guid = results[i].guid;
var openwin = server + "/main.aspx?etn=" + parseFetchXml.GetEntity() + "&pagetype=entityrecord&id=" + guid;
var objItem = { "Id": guid, "subSrc": "", "openwin": openwin };
objItem.Fields = [];
for (var j = 0; j < schema.length; j++) {
//debugger;
var tempValue = "";
if (attr[schema[j].Name] != null) {
tempValue = attr[schema[j].Name].type != null && attr[schema[j].Name].type == "a:OptionSetValue" ? attr[schema[j].Name].formattedValue : attr[schema[j].Name].value;
}
objItem.Fields.push({ "Key": schema[j].Name, "Val": tempValue });
} //end loop schema
data.d.CrmGrid.CrmGridItems.push(objItem);
} //end loop results
callback(data.d);
}); //end  callback fetch
}      //end this.Send 
} // end fetchSender
*/