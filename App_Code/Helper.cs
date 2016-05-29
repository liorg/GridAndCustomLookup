using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Net;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.Services.Protocols;

using System.Globalization;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System.IO;
using System.ServiceModel.Description;
using Microsoft.Xrm.Sdk.Client;
using Newtonsoft.Json;
using System.Collections.Generic;


namespace Lior.Documenter
{

    public class Resources
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("parent")]
        public string Parent { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("icon", NullValueHandling = NullValueHandling.Ignore)]
        public string Icon { get; set; }

        [JsonProperty("state", NullValueHandling = NullValueHandling.Ignore)]
        public State State { get; set; }

        [JsonProperty("a_attr", NullValueHandling = NullValueHandling.Ignore)]
        public Attr Attr { get; set; }

    }
    [JsonObject("state")]
    public class State
    {
        [JsonProperty("selected")]
        public bool Selected { get; set; }
        [JsonProperty("opened")]
        public bool Opened { get; set; }
    }

    [JsonObject("a_attr")]
    public class Attr
    {
        [JsonProperty("href")]
        public string Href { get; set; }
    }

    /* 
       { "id": "ajson1", "parent": "#", "text": "Simple root node" },
                    { "id": "ajson2", "parent": "#", "text": "Root node 2" },
                    { "id": "ajson3", "parent": "ajson2", "text": "Child 1" },
                    { "id": "ajson4", "parent": "ajson2", "text": "link",
                        icon: "new_document.png",
                        'state':
                                {
                                    'selected': false,
                                    'opened': true
                                },
                        'a_attr': { href: "http://www.google.com" }
                    },
                 ] 
     * 
    
     */

    public static class Helper
    {

        public static List<Resources> LoadFolders(string code, string id)
        {
            List<Resources> resources = new List<Resources>();

            var entity = new Entity();
            var data = GetFolders(GetCRMService(GetOrg()), GetOrg(), code, id, out entity);
            var folderEntityType = data.Item1;
            var folderCode = data.Item2;

            folderCode = folderCode.ToValidFolder();
            folderEntityType = folderEntityType.ToValidFolder();

            resources.Add(new Resources
            {
                Id = "pa",
                Parent = "#",
                Text = folderCode,
                State = new State { Opened = true, Selected = false }
            });

            string foldersIn = Helper.GetPath(folderEntityType, false, folderCode);
            var filesInFolderIn = System.IO.Directory.GetFiles(foldersIn);
            bool hasFiles = filesInFolderIn != null && filesInFolderIn.Length > 0 ? true : false;
            resources.Add(new Resources
            {
                Id = "in",
                Parent = "pa",
                Text = "in",
                State = new State { Opened = hasFiles, Selected = false },

            });

            foreach (var fileInFolder in filesInFolderIn)
            {
                var filename = Path.GetFileName(fileInFolder);
                resources.Add(new Resources
                {
                    Id = filename,
                    Parent = "in",
                    Text = filename,
                    State = new State { Opened = false, Selected = false },
                    Icon = "new_document.png",
                    Attr = new Attr { Href = fileInFolder }
                });
            }

            string foldersOut = Helper.GetPath(folderEntityType, true, folderCode);

            var filesInFolderOut = System.IO.Directory.GetFiles(foldersOut);
            hasFiles = filesInFolderOut != null && filesInFolderOut.Length > 0 ? true : false;
            resources.Add(new Resources
            {
                Id = "out",
                Parent = "pa",
                Text = "out",
                State = new State { Opened = hasFiles, Selected = false },
            });
            foreach (var fileInFolder in filesInFolderOut)
            {
                var filename = Path.GetFileName(fileInFolder);

                resources.Add(new Resources
                {
                    Id = filename,
                    Parent = "out",
                    Text = filename,
                    State = new State { Opened = false, Selected = false },
                    Icon = "new_document.png",
                    Attr = new Attr { Href = fileInFolder }
                });
            }


            return resources;
        }
        public static string ToValidFolder(this string str)
        {
            foreach (char c in Path.GetInvalidPathChars())
            {
                str = str.Replace(System.Char.ToString(c), "_");

            }
            str = str.Replace("/", "_");
            str = str.Replace(" ", "_");
            return str;
        }

        public static string ToValidFile(this string fileName)
        {
            string invalid = new string(Path.GetInvalidFileNameChars()) + new string(Path.GetInvalidPathChars());

            foreach (char cv in invalid)
            {
                fileName = fileName.Replace(cv.ToString(), "");
            }
            fileName = fileName.Replace(" ", "_");
            fileName = fileName.Replace("/", "");
            return fileName;
        }

        public static IOrganizationService GetCRMService(string orgName)
        {
            bool useDefaultCredentials = false;
            var serviceUrl = @"http://{0}/{1}/XRMServices/2011/Organization.svc";

            var hostname = ConfigurationManager.AppSettings["CRMHost"];
            var domain = ConfigurationManager.AppSettings["CRMDomain"];
            var userName = ConfigurationManager.AppSettings["CRMUserName"];
            var password = ConfigurationManager.AppSettings["CRMUserPassword"];

            var clientCredentials = new ClientCredentials();

            if (!useDefaultCredentials)
            {
                clientCredentials.Windows.ClientCredential = new NetworkCredential
                {
                    Domain = domain,
                    UserName = userName,
                    Password = password
                };
            }
            else
            {
                clientCredentials.Windows.ClientCredential = CredentialCache.DefaultNetworkCredentials;
            }

            var serviceManagment = ServiceConfigurationFactory.CreateManagement<IOrganizationService>(new Uri(String.Format(serviceUrl, hostname, orgName)));
            return serviceManagment.CreateChannelFactory(clientCredentials).CreateChannel();
        }

        public static string ToFormatFile(this string fileName, string saveOnlyPath, string ext = "")
        {
            var currentfile = fileName;
            if (ext == "")
            {
                currentfile = Path.GetFileNameWithoutExtension(fileName);
                ext = Path.GetExtension(fileName);
            }

            return Path.Combine(saveOnlyPath, String.Format("{0}_{1:yyyyMMddHHmm}_{1:ssfff}" + ext, currentfile, DateTime.Now));
        }

        public static string GetPath(string folderEntityType, bool isOut, string folderCode)
        {
            var m_netPath = ConfigurationManager.AppSettings["netPath"];
            string folderDirection = isOut ? "out" : "in";
            string saveOnlyPath = Path.Combine(m_netPath, "docs", folderEntityType, folderCode, folderDirection);

            if (!System.IO.Directory.Exists(saveOnlyPath))
            {
                System.IO.Directory.CreateDirectory(saveOnlyPath);
            }
            return saveOnlyPath;
        }

        public static Tuple<string, string> GetFolders(IOrganizationService crmService, string orgName, string entityName, string entityId, out Entity currentEntity)
        {
            string code = "Unkown";
            currentEntity = EntityRetrieve(crmService, orgName, entityName, entityId);
            if (entityName == "incident")
            {
                code = currentEntity["title"].ToString();
                return new Tuple<string, string>("פניה", code);
            }
            code = currentEntity["new_mailobjectcode"].ToString();
            return new Tuple<string, string>("פריט_דואר", code);
        }

        public static Entity EntityRetrieve(IOrganizationService crmService, string orgName, string entityName, string entityId)
        {
            return crmService.Retrieve(entityName, new Guid(entityId), new ColumnSet(true));
        }

        public static string GetHebrewJuwishDateString(DateTime anyDate, bool addDayOfWeek)
        {
            System.Text.StringBuilder hebrewFormatedString = new System.Text.StringBuilder();

            // Create the hebrew culture to use hebrew (Juwish) calendar
            CultureInfo juwishCulture = CultureInfo.CreateSpecificCulture("he-IL");
            juwishCulture.DateTimeFormat.Calendar = new HebrewCalendar();

            #region Format the date into a Juwish format

            if (addDayOfWeek)
            {
                // Day of the week in the format " "
                hebrewFormatedString.Append(anyDate.ToString("dddd", juwishCulture) + " ");
            }

            // Day of the month in the format "'"
            hebrewFormatedString.Append(anyDate.ToString("dd", juwishCulture) + " ");

            // Month and year in the format " "
            hebrewFormatedString.Append("" + anyDate.ToString("y", juwishCulture));

            #endregion

            return hebrewFormatedString.ToString();

        }

        public static string GetOrg()
        {
            return ConfigurationManager.AppSettings["org"].ToString();
        }

    }
}
