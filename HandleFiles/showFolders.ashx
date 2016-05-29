<%@ WebHandler Language="C#" Class="FilesUpload" %>

using System;
using System.Web;
using Lior.Documenter;
using Newtonsoft.Json;
public class FilesUpload : IHttpHandler
{

   
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "javascript/plain";
        context.Response.AppendHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        context.Response.AppendHeader("Pragma", "no-cache"); // HTTP 1.0.
        context.Response.AppendHeader("Expires", "0"); // Proxies.
        context.Response.Cache.SetNoStore();

        var id = context.Request["id"].ToString();
        var code = context.Request["code"].ToString();

        var resources = Helper.LoadFolders(code, id);
        
        //var json ="'"+id+ "="+code+"'";
        var json = JsonConvert.SerializeObject(resources);
        var jsonParameter = "var g_data=" + json + ";";
        context.Response.Write(jsonParameter);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}