//var maxRecords;// max records saved
function dataSender(id, config) {
    // 
    var self = this;
    self.Config = config;
    self.Id = id;
    self.Url = config.Url == "" ? _sServerUrl : config.Url;
    self.caller = null;
    self.Send = function (gridProp, callback, err) {
        //    
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
        var payload = { "request": { Id: id, SettingGrid: gridProp } };
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
        // 
        var payload = { "request": { Id: id, SettingGrid: gridProp } };
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
    //  
    this.Send = function (gridProp, fieldsFilter, callback, err) {

        var payload = { "request": { Id: id, SettingGrid: gridProp } };
        var parseFetchXml = new ParserFetchXml(method);
        parseFetchXml.Conditions(id, fieldsFilter);
        parseFetchXml.Order(gridProp.SortName, gridProp.SortOrder ? "true" : "false");

        var oService = new FetchUtil();

        if (gridProp.MaxRows == 0) {
            gridProp.MaxRows = 50;
            var cxml = parseFetchXml.GetCountFetch(gridProp.AggrField);

            var results = oService.Excute(cxml);

            if (results.length > 0) {
                gridProp.MaxRows = results[0].attributes["c"].value;
            }
        }
        var records = gridProp.MaxRows == 0 ? 0 :
        gridProp.MaxRows >= (gridProp.MaxPerPage * gridProp.CurrentPage) ? gridProp.MaxPerPage : (gridProp.MaxRows - (gridProp.MaxPerPage * (gridProp.CurrentPage - 1))) > 0 ? (gridProp.MaxRows - (gridProp.MaxPerPage * (gridProp.CurrentPage - 1))) : gridProp.MaxRows; // Math.floor(gridProp.MaxRows / gridProp.CurrentPage);
        // alert(records);
        parseFetchXml.Paging(gridProp.CurrentPage, records);
        var xml = parseFetchXml.Xml();

        results = oService.Excute(xml);
        var data = manipulate.call(this, parseFetchXml, gridProp, results);
        callback(data.d);


    }    //end this.Send


    var manipulate = function (parseFetchXml, gridProp, results) {
        var data = {
            "d": {
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
            //
            var attr = results[i].attributes;
            // var guid = results[i].guid;
            var guid = results[i].id;
            var etc = 45;
            // when save page crm when open entity from ower custom grid (maybe in rollup it will fixed?)
            // we get "הגישה נדחתה"
            // in event log we see error like this:
            //Exception message: INVALID_WRPC_TOKEN: Validate WRPC Token: WRPCTokenState=Invalid, TOKEN_EXPIRY=4320, IGNORE_TOKEN=False, TOKEN_KEY=1FKttw0LEeWyyQBQVoReG6y0qcdd+Ov5U8mt23kV3gcpy6LwqD92Ma9zKlsL89wE
            // result: from forum(https://social.microsoft.com/Forums/en-US/2ff65a6c-1196-41f5-aad4-85a34368f3e4/invalidwrpctoken-at-associating-records-thru-crm-2011-ui?forum=crm)
            //The fix is to turn off token checks by creating a registry key, with the value 1:
            //HKLM\SOFTWARE\Microsoft\MSCRM\IgnoreTokenCheck (DWORD)
            var openwin = server + "/main.aspx?etn=" + parseFetchXml.GetEntity() + "&pagetype=entityrecord&id=" + encodeURIComponent(guid);
            //var openwin = "/main.aspx?etn=" + parseFetchXml.GetEntity() + "&pagetype=entityrecord&id=" + encodeURIComponent(guid);
            var objItem = { "Id": guid, "subSrc": "", "openwin": openwin, "entityType": parseFetchXml.GetEntity(), "etc:": etc };
            objItem.Fields = [];
            for (var j = 0; j < schema.length; j++) {
                //  
                var tempValue = "";
                if (attr[schema[j].Name] != null) {
                    tempValue = attr[schema[j].Name].value;
                    if (attr[schema[j].Name].type != null) {
                        if (attr[schema[j].Name].type == "OptionSetValue" || attr[schema[j].Name].type == "dateTime" || attr[schema[j].Name].type == "int" || attr[schema[j].Name].type == "number" || attr[schema[j].Name].type == "double" || attr[schema[j].Name].type == "Money")
                            tempValue = attr[schema[j].Name].formattedValue;
                        else if (attr[schema[j].Name].type == "EntityReference") {
                            tempValue = attr[schema[j].Name].name;
                        }
                    }

                }
                objItem.Fields.push({ "Key": schema[j].Name, "Val": tempValue });
            } //end loop schema
            data.d.CrmGrid.CrmGridItems.push(objItem);
        } //end loop results
        return data;
    }
} // end fetchSender
