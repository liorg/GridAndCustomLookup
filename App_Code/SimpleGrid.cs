using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using MVSWeb.Grid.Server;

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
    [WebMethod(CacheDuration = 60)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public ResponseGrid MockData(RequestGrid request)
    {
        return new ResponseGrid { Id = request.Id, Name = "xxx_" };
    }
}
