using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using LU;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class MVLookupService : System.Web.Services.WebService {

    public MVLookupService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld(string s) {
        return "Hello World " + s;
    }

    [WebMethod]
    public LUResponse GetSelHealth(LURequest r)
    { 
        List<RecItem> items=new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "בריאות 1", IsSelected = true });
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "בריאות 2", IsSelected = false });
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "בריאות 3", IsSelected = true });


        return new LUResponse
        {
            Items = items
        };
    }

    [WebMethod]
    public LUResponse GetSalePersonalAccident(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "תאונות 1", IsSelected = true });
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "תאונות 2", IsSelected = false });
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "תאונות 3", IsSelected = true });
        return new LUResponse
        {
            Items = items
        };
    }

    [WebMethod]
    public LUResponse GetSaleCriticalIlless(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "מחלות 1", IsSelected = true });
        return new LUResponse
        {
            Items = items
        };
    }

    [WebMethod]
    public LUResponse GetSaleRisk(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "סיכון 1", IsSelected = true });
        return new LUResponse
        {
            Items = items
        };
    }

    [WebMethod]
    public LUResponse GetSaleCare(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "סיעוד 1", IsSelected = true });
        return new LUResponse
        {
            Items = items
        };
    }
   
    [WebMethod]
    public LUResponse GetSaleElementary(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.NewGuid(), Name = "אלמנטרי 1", IsSelected = true });
        return new LUResponse
        {
            Items = items
        };
    }

}
