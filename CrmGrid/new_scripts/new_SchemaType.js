var url;
var method;
var settingGrid;
var id;
var config;

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
function load(gid, configName) {
    var vmData; config = null;
    for (var i = 0; i < __config.length; i++) {
        if (__config[i].Name == configName) {
            config = __config[i];
            break;
        }
    }
    url = config.Url;
    var settingGrid = config.Detail.SettingGrid;
    method = config.Detail.Method;
    vmData = { Schema: [], CrmItems: [] };
    vmData.Schema = config.Detail.Schema;
    vmData.SettingGrid = config.Detail.SettingGrid;
    vm = new AppViewModel(vmData);
    id = gid;
    ko.applyBindings(vm);
}
function loadGrid() {
    // id = getParameterByName('id') == "" ? "{387A37A7-0000-0000-0000-D553F1CB7D63}" : getParameterByName('id').toString();
    var callData = new dataSender(id, config);
    //    if (config.Detail.SettingGrid.TypeData == 0) // ajax
    //        ajaxCall = new clientSender(id, url, method);
    //    else if (config.Detail.SettingGrid.TypeData == 1) //callback
    //        ajaxCall = new clientCaller(id, method);
    //    else if (config.Detail.SettingGrid.TypeData == 2)//fechxml
    //        ajaxCall = new clientCaller(id, method)

    callData.Send(config.Detail.SettingGrid,
            function (d) {

                //                 vm.sortName(d.SettingGrid.SortName);
                //                 vm.sortOrder(d.SettingGrid.SortOrder);
                //                 vm.currentPage(d.SettingGrid.CurrentPage);
                //                 vm.maxPerPage(d.SettingGrid.MaxPerPage);
                //                vm.maxRows(d.SettingGrid.MaxRows);
                //         vm.isToggle(d.SettingGrid.IsToggle);
                vm.isLoading(false);
                if (d.IsError) {
                    vm.noData(true);
                    vm.message(d.ErrDesc);
                }
                vm.noData(d.CrmGrid.CrmGridItems.length == 0);
                vm.crmItems(d.CrmGrid.CrmGridItems);
                var maxRow = config.Detail.SettingGrid.MaxRows;
                if (d.SettingGrid != null && d.SettingGrid.MaxRows != "")
                    maxRow = d.SettingGrid.MaxRows;
                vm.maxRows(maxRow);
                //  vm.maxRows(d.CrmGrid.CrmGridItems.length);

            },
           function (e) {
               vm.isLoading(false);
               vm.noData(true);
               vm.message("אירעה שגיאה נא פנה למנהל מערכת");
           });

}
