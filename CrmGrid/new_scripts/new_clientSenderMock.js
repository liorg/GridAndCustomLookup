function clientSender(id,url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, callback, err) {
        debugger;
        var url = "new_scripts/new_fakeData.xml"; //this.Url + "/" + this.Method;
        var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.open("GET", url, false);
        xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlhttp.send();
        //var responseText = eval(xmlhttp.responseText);
         var responseText =JSON.parse(xmlhttp.responseText); 
        callback(responseText.d);
        //        var payload = { "request": { Id: id, SettingGrid: gridProp} };
        //        $.ajax({
        //            type: "POST",
        //            url: url,
        //            data: JSON.stringify(payload),
        //            contentType: "application/json; charset=utf-8",
        //            dataType: "json",
        //            success: function (data) {
        //                callback(data.d);
        //            },
        //            error: function (xmlHttpRequest, textStatus, errorThrown) {
        //                err(xmlHttpRequest.responseText);
        //            }
        //        });
    };
}