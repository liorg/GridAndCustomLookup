
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
public class MVLookupService : System.Web.Services.WebService
{

    public MVLookupService()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld(string s)
    {
        return "Hello World " + s;
    }

    [WebMethod]
    public LUResponse GetSelHealth(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();

        if (r.Params != null)
        {
            var dat = (from p in r.Params where p.Key == "new_manufacture" select p.Value).FirstOrDefault();
            if (dat != null)
            {
                if (dat == "1")
                    items.Add(new RecItem { Id = Guid.Parse("78c2b02e-7f2d-472a-8a1b-25c4be2d5d3f"), Name = "בריאות 1 שינוי 11111", IsSelected = true });
                if (dat == "2")
                    items.Add(new RecItem { Id = Guid.Parse("88c2b02e-7f2d-472a-8a1b-25c4be2d5d3f"), Name = "בריאות 22222 שינוי 2222", IsSelected = true });
            }

        }
        items.Add(new RecItem { Id = Guid.Parse("98c2b02e-7f2d-472a-8a1b-25c4be2d5d3f"), Name = "בריאות 1", IsSelected = true });
        items.Add(new RecItem { Id = Guid.Parse("68c2b02e-7f2d-472a-8a1b-25c4be2d5d3f"), Name = "בריאות 2", IsSelected = false });
        items.Add(new RecItem { Id = Guid.Parse("58c2b02e-7f2d-472a-8a1b-25c4be2d5d3f"), Name = "בריאות 3", IsSelected = true });


        return new LUResponse
        {
            Items = items
        };
    }

    [WebMethod]
    public LUResponse GetSalePersonalAccident(LURequest r)
    {
        List<RecItem> items = new List<RecItem>();
        items.Add(new RecItem { Id = Guid.Parse("24858f86-46f8-4c92-a221-d43d933474f4"), Name = "תאונות 1", IsSelected = true });
        items.Add(new RecItem { Id = Guid.Parse("34858f86-46f8-4c92-a221-d43d933474f4"), Name = "תאונות 2", IsSelected = false });
        items.Add(new RecItem { Id = Guid.Parse("44858f86-46f8-4c92-a221-d43d933474f4"), Name = "תאונות 3", IsSelected = true });
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


    //[WebMethod]
    //public LUResponse g(LURequest1 r)
    //{
    //    List<RecItem> items = new List<RecItem>();
    //    items.Add(new RecItem { Id = Guid.NewGuid(), Name = "אלמנטרי 1", IsSelected = true });
    //    return new LUResponse
    //    {
    //        Items = items
    //    };
    //}
}
