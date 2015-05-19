function new_clientCaller(id, method) {
    this.CallerMethod = method;
    this.Call = function (gridProp, callback, err) {
        debugger;
        var payload = { "request": { Id: id, SettingGrid: gridProp} };
        try {
            var func = window.parent["UnitTest"];
            var data = func["FakeCall"]("1"); // = window.parent["UnitTest"];
            var FakeCall2 = window.parent["UnitTest"]["FakeCall"]("3");

            //.FakeCall.T"](payload);

           // var data = window.parent["x"](payload);
          //  var data = window.parent.UnitTest.FakeCall(payload);
            callback(data.d);

        } catch (e) {
            err(e.Description);

        }
    };
}