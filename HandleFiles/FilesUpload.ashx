<%@ WebHandler Language="C#" Class="FilesUpload" %>

using System;
using System.Web;

public class FilesUpload : IHttpHandler
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        var id = context.Request["id"].ToString();
        var code = context.Request["code"].ToString();
        if (context.Request.Files != null && context.Request.Files.Count > 0)
        {
            HttpPostedFile file = context.Request.Files[0];

            if (file.ContentLength > 0)
            {
                //do something
            }
        }
        context.Response.Write("Hello World");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}