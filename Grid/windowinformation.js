function CRMWindowInfo(sUrl, iXOffset, iYOffset) {
    this.Width = parseInt(iXOffset, 10);
    this.Height = parseInt(iYOffset, 10);
    this.Url = Mscrm.CrmUri.create(sUrl);
} Type.registerNamespace('Mscrm');
Type.registerNamespace('Mscrm.Imported');
if (!Mscrm.Imported.WindowInformationImplementation) Mscrm.Imported.WindowInformationImplementation = {};
Mscrm.Imported.WindowInformationImplementation.getWindowInformationInternal = function (iObjectType) {
    //    return new CRMWindowInfo("/Grid/crm2013/loading.htm", 1000, 560);
    return;

}