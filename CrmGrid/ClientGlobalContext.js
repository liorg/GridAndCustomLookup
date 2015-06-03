function GetGlobalContext() {
    var context = new moqContext();
    return context;
}
function moqContext() {
    this.getServerUrl=function (){
    return "http://mvs-crm-i-du2/MivtachSimon/";
    }
}