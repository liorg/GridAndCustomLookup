//var maxRecords;// max records saved
function dataSender(id, config) {
    var self = this;
    self.Config = config;
    self.Id = id;
    self.caller = null;
    self.Send = function (gridProp, callback, err) {
        self.caller.Send(gridProp, callback, err);
    }
    factory(id, config);
    function factory(id, conifg) {
        switch (config.Detail.SettingGrid.TypeData) {
            case 0:
                self.caller = new clientSender(id, conifg.Url, conifg.Detail.Method);
                break;
            case 1:
                self.caller = new clientCaller(id, conifg.Detail.Method);
                break;
            case 2:
                self.caller = new fetchSender(id, conifg.Url, conifg.Detail.Org, conifg.Detail.Method, conifg.Detail.MethodCount);
                break;
            default:
                self.caller = new clientSender(id, conifg.Url, conifg.Detail.Method);
                break;
        };
    }
}

function clientSender(id, url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, callback, err) {
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
    this.Send = function (gridProp, callback, err) {
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

function fetchSender(server, org, url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, callback, err) {
        var url = this.Url + "/" + this.Method;
        var payload = { "request": { Id: id, SettingGrid: gridProp} };

    };
}
