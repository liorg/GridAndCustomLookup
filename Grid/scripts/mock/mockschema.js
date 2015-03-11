function load() {
    var vmData;
    vmData = { Schema: [], CrmItems: [] };

    var schema = [];
    colNameItem = { Name: "ListName", Width: 45, Desc: "ליאור" };
    schema.push(colNameItem);

    colNameItem = { Name: "MemberCount", Width: 150, Desc: "בבבבבב" };
    schema.push(colNameItem);

    colNameItem = { Name: "CampaignName", Width: 100, Desc: "גגגגגג" };
    schema.push(colNameItem);

    vmData.Schema = schema;
    vmData.SettingGrid = {};

    vmData.SettingGrid.SortName = "MemberCount";
    vmData.SettingGrid.SortOrder = true;
    vmData.SettingGrid.CurrentPage = 2;
    vmData.SettingGrid.MaxPerPage = 50;
    vmData.SettingGrid.MaxRows = 444;
    vmData.SettingGrid.IsToggle = true;

    vm = new AppViewModel(vmData);
    ko.applyBindings(vm);
}