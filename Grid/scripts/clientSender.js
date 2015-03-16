function clientSender(url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, callback, err) {
        var url = this.Url + "/" + this.Method;
        var payload = { "request": { Id: 3, SettingGrid: gridProp} };
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
                debugger;
                err(xmlHttpRequest.responseText);
                //                console.log(xmlHttpRequest.responseText);
                //                console.log(textStatus);
                //                console.log(errorThrown);
            }
        });
    };
}