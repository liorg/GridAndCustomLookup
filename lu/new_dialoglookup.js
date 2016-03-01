window.onload = fnInit;
var parentVm;
function fnInit() {
    debugger;
    var crmItems = [];
    if (window.dialogArguments != null) {
        parentVm = window.dialogArguments;
    }
    else {
        var data = getParameterByName("Data");
        if (window.opener != null && window.opener.frames[data] != null) {
            parentVm = window.opener.frames[data].vm;
        }
    }
    crmItems = parentVm != null ? parentVm.crmItems() : [];
    oldValues = (JSON.parse(JSON.stringify(crmItems)));
    ko.applyBindings(new AppViewModel(crmItems));
}

function AppViewModel(items) {
    debugger;
    var self = this;
    self.crmItems = ko.observableArray(items);
    self.Select = function () {
        parentVm.descf();
        window.close();
    };
    self.Reset = function () {
        parentVm.reset(oldValues);
        window.close();
    };
}
function getParameterByName(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

