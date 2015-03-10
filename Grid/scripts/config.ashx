<%@ WebHandler Language="C#" Class="config" %>

using System;
using System.Web;
using System.Collections.Generic;
using System.Linq;
public class config : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/javascript";
        MVSWeb.Grid.server.GridConfig gridconfig = null;
        using (var stream = System.IO.File.OpenText(context.Server.MapPath(@"..\json\config.json")))
        {
            //Read the file              
            string st = stream.ReadToEnd();
            gridconfig = new System.Web.Script.Serialization.JavaScriptSerializer().Deserialize<MVSWeb.Grid.server.GridConfig>(st);
        }

        context.Response.Cache.SetNoStore();
        var id = context.Request["id"] == null ? "x1" : context.Request["id"];
        var configItem = gridconfig.Items.Where(d => d.Name == id).FirstOrDefault();
        var json = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(configItem);

        context.Response.Write(" var __config=" + json + ";");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}