function clientSender(url, method) {
    this.Url = url;
    this.Method = method;
    this.Send = function (gridProp, callback, err) {
        alert(this.Url);
    };
}