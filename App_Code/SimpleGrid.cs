using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using MVSWeb.Grid.Server;
using MVSWeb.Grid.Server.Mock;


/// <summary>
/// Summary description for SimpleGrid
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class SimpleGrid : System.Web.Services.WebService {

    public SimpleGrid () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld() {
        return "Hello World";
    }
    [WebMethod()]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseGrid MockData(RequestGrid request)
    {
        var res = new ResponseGrid { Id = request.Id, IsError = false, ErrDesc = "", CrmGrid = new MockData().CrmGrid };
        //res.SettingGrid = request.SettingGrid;
        //res.SettingGrid.CurrentPage += 1;
        //res.SettingGrid.MaxRows = 102;
        //res.SettingGrid.SortName = "MemberCount";

        return res;
    }
}
