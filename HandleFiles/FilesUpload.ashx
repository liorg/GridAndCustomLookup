<%@ WebHandler Language="C#" Class="FilesUpload" %>

using System;
using System.Web;
using Lior.Documenter;
public class FilesUpload : IHttpHandler
{
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        var id = context.Request["id"].ToString();
        var code = context.Request["code"].ToString();
        var path = "";
        if (context.Request.Files != null && context.Request.Files.Count > 0)
        {
            HttpPostedFile file = context.Request.Files[0];

            if (file.ContentLength > 0)
            {
                var fileName = System.IO.Path.GetFileName( file.FileName);
                var orgname = Helper.GetOrg();
                var crmService = Helper.GetCRMService(orgname);
                var entity=new Microsoft.Xrm.Sdk.Entity();
                var data = Helper.GetFolders(crmService, orgname, code, id, out entity);
                var folderEntityType = data.Item1;
                var folderCode = data.Item2;

                folderCode = folderCode.ToValidFolder();
                folderEntityType = folderEntityType.ToValidFolder();

                fileName = fileName.ToValidFile();
                string saveOnlyPath = Helper.GetPath(folderEntityType, false, folderCode);
                string savePath = fileName.ToFormatFile(saveOnlyPath, "");
                path = savePath;
                file.SaveAs(savePath);
               // Guardian.JerusalemMuni.Documenter.Helper.GetPath(
                //do something
                
            }
        }
        context.Response.Write(path);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}