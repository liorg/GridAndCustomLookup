function GetGlobalContext() {
    var context = new moqContext();
    return context;
}
function moqContext() {
    this.getServerUrl=function (){
        return "http://crm11mantad/MANTA";
    }
}