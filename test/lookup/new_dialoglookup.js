window.onload = fnInit;
var parentVm;
function fnInit() {
    var crmItems = [];
    if (window.dialogArguments != null) {
        parentVm = window.dialogArguments;
        crmItems = parentVm.crmItems();
        oldValues = (JSON.parse(JSON.stringify(crmItems)));
    }
    ko.applyBindings(new AppViewModel(crmItems));
}

function AppViewModel(items) {
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
 



