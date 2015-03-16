var url;
var method;
var settingGrid;
function load() {
    var vmData;
    url = __config.Url;
    var settingGrid=__config.Detail.SettingGrid;
    method = __config.Detail.Method;
    vmData = { Schema: [], CrmItems: [] };
    vmData.Schema = __config.Detail.Schema;
    vmData.SettingGrid = __config.Detail.SettingGrid;

    vm = new AppViewModel(vmData);
    ko.applyBindings(vm);

}
function loadGrid() {
    debugger;
    var ajaxCall = new clientSender(url, method);
    ajaxCall.Send(__config.Detail.SettingGrid,
            function (d) {
                 debugger;
//                 vm.sortName(d.SettingGrid.SortName);
//                 vm.sortOrder(d.SettingGrid.SortOrder);
//                 vm.currentPage(d.SettingGrid.CurrentPage);
//                 vm.maxPerPage(d.SettingGrid.MaxPerPage);
                 vm.maxRows(d.SettingGrid.MaxRows);                
                // vm.isToggle(d.SettingGrid.IsToggle);
                 vm.isLoading(false);
                 if (d.IsError) {
                     vm.noData(true);
                     vm.message(d.ErrDesc);
                 }
                 vm.crmItems(d.CrmGrid.CrmGridItems);

             }, 
           function (e) {
                 vm.isLoading(false);
                 vm.noData(true);
                 vm.message("אירעה שגיאה נא פנה למנהל מערכת");
             });

}