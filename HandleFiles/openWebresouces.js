, Upload: function (code, id) {
    var webresourceurl = "/webresources/new_fileupload.htm?typename=" + code + "&id=" + id;

    var DialogOptions = new Xrm.DialogOptions();
    DialogOptions.width = 500;
    DialogOptions.height = 300;

    var crmUri = Mscrm.CrmUri.create(webresourceurl);
    Xrm.Internal.openDialog(webresourceurl, DialogOptions, null, null,
        function (result) {
            alert(result);
        }
    );


}
    , ShowFolder: function (code, id) {
        var webresourceurl = "/webresources/new_showFolder.html?typename=" + code + "&id=" + id;

        var DialogOptions = new Xrm.DialogOptions();
        DialogOptions.width = 500;
        DialogOptions.height = 500;

        var crmUri = Mscrm.CrmUri.create(webresourceurl);
        Xrm.Internal.openDialog(webresourceurl, DialogOptions, null, null,
            function (result) {
                alert(result);
            }
        );
    }