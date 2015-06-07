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
    this.Send = function (gridProp, fieldsFilter,callback, err) {
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

    this.Send = function (gridProp,fieldsFilter, callback, err) {
        //  debugger;
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
