function load() {
    var vmData;
    vmData = { Schema: [], CrmItems: [] };
    vmData.Schema = __config.Detail.Schema;
    vmData.SettingGrid = __config.Detail.SettingGrid;
    vm = new AppViewModel(vmData);
    ko.applyBindings(vm);
}