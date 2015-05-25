var url;
var method;
var settingGrid;
var id;
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function load() {
    debugger;
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
    id = getParameterByName('id') == "" ? "{387A37A7-0000-0000-0000-D553F1CB7D63}" : getParameterByName('id').toString();
    var ajaxCall = new clientSender(id,url, method);
    ajaxCall.Send(__config.Detail.SettingGrid,
            function (d) {
              //   debugger;
//                 vm.sortName(d.SettingGrid.SortName);
//                 vm.sortOrder(d.SettingGrid.SortOrder);
//                 vm.currentPage(d.SettingGrid.CurrentPage);
//                 vm.maxPerPage(d.SettingGrid.MaxPerPage);
                 vm.maxRows(d.SettingGrid.MaxRows);
        //         vm.isToggle(d.SettingGrid.IsToggle);
                 vm.isLoading(false);
                 if (d.IsError) {
                     vm.noData(true);
                     vm.message(d.ErrDesc);
                 }
                 vm.noData(d.CrmGrid.CrmGridItems.length == 0);
                 vm.crmItems(d.CrmGrid.CrmGridItems);

             }, 
           function (e) {
                 vm.isLoading(false);
                 vm.noData(true);
                 vm.message("אירעה שגיאה נא פנה למנהל מערכת");
             });

}
