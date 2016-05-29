using System;
using System.Linq;
using System.IO;
using System.Xml;
using System.Web;
using System.Net;
using System.Text;
using System.Data;
using System.Security;
using System.Reflection;
using System.Collections;
using System.Web.Services;
using System.Configuration;
using System.ComponentModel;
using System.Xml.Serialization;
using System.Runtime.InteropServices;
using System.Web.Services.Protocols;
using System.Collections.Specialized;

using log4net;
using log4net.Config;

using System.Globalization;
using System.Threading;
using Microsoft.Xrm.Sdk;
using System.ServiceModel.Description;
using Microsoft.Xrm.Sdk.Client;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Messages;
using DocumentFormat.OpenXml.CustomProperties;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml.VariantTypes;
using System.Web.Script.Services;
using System.ServiceModel.Web;
using System.Xml.Linq;

//using Team.Crm4;

namespace Lior.Documenter
{
    /// <summary>
    /// Summary description for Service1
    /// </summary>C:\project\SolutionCRMJerusalem\documenter\DocumentService.asmx
    [WebService(Namespace = "http://schemas.microsoft.com/crm/2006/WebServices")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ScriptService]
    [ToolboxItem(false)]

    public class DocumentCreator : System.Web.Services.WebService
    {
        private string m_netPath = String.Empty;
        private static ILog m_log;
        const int thumbSize = 300;

        StringDictionary m_propertyList = new StringDictionary();

        public DocumentCreator()
        {
            log4net.Config.XmlConfigurator.Configure();
            m_log = LogManager.GetLogger("LogFile");
        }


        /// <summary>
        /// retrieve Hebrew Formated date
        /// </summary>
        /// <param name="crmDateTime">DateTime as string "#YYYY#-#MM#-#DD#"</param>
        /// <returns>hebrew date as string</returns>
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public string GetHebrewDate(string crmDateTime)
        {
            string date = String.Empty;
            try
            {
                date = Helper.GetHebrewJuwishDateString(Convert.ToDateTime(crmDateTime, CultureInfo.InvariantCulture), false);
            }
            catch (Exception ex)
            {
                m_log.Error(ex);
                throw ex;
            }
            return date;
        }



        /// <summary>
        /// Render templates to Word Document
        /// </summary>
        /// <param name="orgName">Organization name</param>
        /// <param name="entityList">Array of EntityFilter structures </param>
        /// <param name="templateList">Array of teplates file names</param>
        /// <param name="propertyList">Array of properies structures, that represents static fields in templates</param>
        /// <param name="fileName">Output File Name</param>
        /// <param name="logoName">Logo file that may contan custom vba scripts</param>
        /// <returns>Return structure with success indication,etc.</returns>

        string GetUserName()
        {
            return Context.User.Identity.Name;

        }

        Tuple<string, string> GetEnityNameFolder(EntityFilter[] entityList, string orgName, IOrganizationService crmService, Entity currentEntity)
        {
            string code = "Unkown";
            if (entityList != null && entityList.Any())
            {
                var entityFilter = entityList.Where(ex => ex.isMain).Cast<EntityFilter?>().Select(ss => ss).FirstOrDefault();
                if (entityFilter != null)
                {
                    var entity = new Entity();
                    var results = Helper.GetFolders(crmService, orgName, entityFilter.Value.entityName, entityFilter.Value.entityId, out entity);
                    currentEntity = entity;
                    return results;
                }
            }
            return new Tuple<string, string>("Unkown", code);

        }
        Tuple<string, string> GetEnityNameFolderOld(EntityFilter[] entityList, string orgName, IOrganizationService crmService, Entity currentEntity)
        {
            string code = "Unkown";
            if (entityList != null && entityList.Any())
            {
                var entityFilter = entityList.Where(ex => ex.isMain).Cast<EntityFilter?>().Select(ss => ss).FirstOrDefault();
                if (entityFilter != null)
                {
                    currentEntity = EntityRetrieve(crmService, orgName, entityFilter.Value.entityName, entityFilter.Value.entityId);
                    var entityName = entityFilter.Value.entityName;

                    if (entityName == "incident")
                    {
                        code = currentEntity["title"].ToString();
                        return new Tuple<string, string>("פניה", code);
                    }
                    code = currentEntity["new_mailobjectcode"].ToString();
                    return new Tuple<string, string>("פריט_דואר", code);
                }
            }
            return new Tuple<string, string>("Unkown", code);

        }

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public Infrastucture.ReturnValue Render(string orgName, EntityFilter[] entityList, string[] templateList, property[] propertyList, string fileName, string logoName, string language, [Optional] TableMapping[] TableMapArr)
        {
            string userName = GetUserName();

            //    ;
            Infrastucture.ReturnValue returnValue = new Infrastucture.ReturnValue();

            try
            {
                var serverName = ConfigurationManager.AppSettings["CRMHost"];
                var documenterHost = ConfigurationManager.AppSettings["DocumenterHost"];
                var m_netPath = ConfigurationManager.AppSettings["netPath"];


                IOrganizationService crmService = Helper.GetCRMService(orgName);//GetCRMService(orgName, false);

                Entity currentEntity = null;
                bool isHeb = true;
                string serverPath = Path.Combine(m_netPath, "templates\\");
                // string savePath = Path.Combine(m_netPath, String.Format("docs\\{0}_{1:yyyyMMddHHmm}_{1:ssfff}.docm", fileName, DateTime.Now));
                //string savePath = Path.Combine(m_netPath, String.Format("docs\\{0}_{1:yyyyMMddHHmm}_{1:ssfff}.docm", fileName, DateTime.Now));

                var data = GetEnityNameFolder(entityList, orgName, crmService, currentEntity);
                var folderEntityType = data.Item1;
                var folderCode = data.Item2;

                //foreach (char c in Path.GetInvalidPathChars()){
                //    folderEntityType = folderEntityType.Replace(System.Char.ToString(c), "_");
                //    folderCode = folderCode.Replace(System.Char.ToString(c), "_");
                //}
                //folderEntityType = folderEntityType.Replace("/", "_");
                //folderCode = folderCode.Replace("/", "_");
                //folderEntityType = folderEntityType.Replace(" ", "_");
                //folderCode = folderCode.Replace(" ", "_");

                folderCode = folderCode.ToValidFolder();
                folderEntityType = folderEntityType.ToValidFolder();

                //string invalid = new string(Path.GetInvalidFileNameChars()) + new string(Path.GetInvalidPathChars());

                //foreach (char cv in invalid)
                //{
                //    fileName = fileName.Replace(cv.ToString(), "");
                //}
                //fileName = fileName.Replace(" ", "_");
                //fileName = fileName.Replace("/", "");
                fileName = fileName.ToValidFile();
                //folderEntityType = folderEntityType.Replace(":", "_");
                // folderCode = folderCode.Replace(":", "_");

                //string saveOnlyPath = Path.Combine(m_netPath, "docs", "out", folderEntityType, DateTime.Now.Year.ToString(), folderCode);

                //if (!System.IO.Directory.Exists(saveOnlyPath))
                //{
                //    System.IO.Directory.CreateDirectory(saveOnlyPath);
                //}
                string saveOnlyPath = Helper.GetPath(folderEntityType, true, folderCode);
                // string savePath = Path.Combine(saveOnlyPath, String.Format("{0}_{1:yyyyMMddHHmm}_{1:ssfff}.docm", fileName, DateTime.Now));
                string savePath = fileName.ToFormatFile(saveOnlyPath, ".docm");

                string tmp;

                if (logoName == null || logoName == String.Empty)
                {
                    tmp = Path.Combine(serverPath, "logos\\logo.docm");
                }
                else
                {
                    tmp = Path.Combine(serverPath, "logos\\" + logoName);
                }
                // Load Logo as main document
                byte[] logoDocument = File.ReadAllBytes(tmp);
                using (var newDocumentStream = new MemoryStream())
                {
                    newDocumentStream.Write(logoDocument, 0, (int)logoDocument.Length);
                    using (var wordDocument = WordprocessingDocument.Open(newDocumentStream, true))
                    {
                        var wordDocumentMainPart = wordDocument.MainDocumentPart;

                        //  Add templates to it
                        foreach (string templateName in templateList)
                        {
                            using (var temlateDocument = WordprocessingDocument.Open(Path.Combine(serverPath, templateName), false))
                            {
                                wordDocumentMainPart.Document.AppendChild(temlateDocument.MainDocumentPart.Document.Body.CloneNode(true));
                            }
                        }
                        /*      ***************************** test ******************************************                */

                        //using (var temlateDocument = WordprocessingDocument.Open(Path.Combine(serverPath, "e.docx"), false))
                        //{
                        //    wordDocumentMainPart.Document.AppendChild(temlateDocument.MainDocumentPart.Document.Body.CloneNode(true));
                        //}
                        /*      ***************************** test ******************************************                */


                        // add Properties

                        if (wordDocument.CustomFilePropertiesPart == null)
                        {
                            var customPropertiesPart = wordDocument.AddCustomFilePropertiesPart();
                            customPropertiesPart.Properties = new Properties();
                        }

                        var properties = wordDocument.CustomFilePropertiesPart.Properties;

                        var orgProperty = new CustomDocumentProperty();
                        orgProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        orgProperty.Name = "Organization";
                        orgProperty.VTLPWSTR = new VTLPWSTR(orgName);

                        var fullPathProperty = new CustomDocumentProperty();
                        fullPathProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        fullPathProperty.Name = "FullPath";
                        fullPathProperty.VTLPWSTR = new VTLPWSTR(savePath);

                        var serverHostProperty = new CustomDocumentProperty();
                        serverHostProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        serverHostProperty.Name = "ServerHostName";
                        serverHostProperty.VTLPWSTR = new VTLPWSTR(documenterHost);


                        properties.AppendChild(orgProperty);
                        properties.AppendChild(fullPathProperty);
                        properties.AppendChild(serverHostProperty);

                        int pid = 2;
                        foreach (CustomDocumentProperty item in properties)
                        {
                            item.PropertyId = pid++;
                        }

                        properties.Save();

                        string propertyValue;
                        string propertyName;


                        //     ReplacePlaceHolder("{createdonhebrew}", Helper.GetHebrewJuwishDateString(DateTime.Now, false), wordDocumentMainPart.Document);


                        FillSimpleText(wordDocumentMainPart.Document, "{createdonhebrew}", Helper.GetHebrewJuwishDateString(DateTime.Now, false));

                        string dateTimeFormat, CultureLang;

                        if (ConfigurationManager.AppSettings["dateTimeFormat"] != null)
                        {
                            dateTimeFormat = (string)ConfigurationManager.AppSettings["dateTimeFormat"];
                        }
                        else
                        {
                            dateTimeFormat = "dd-MM-yyyy";
                        }

                        if (string.IsNullOrEmpty(language))
                        {
                            if (ConfigurationManager.AppSettings["CultureLang"] != null)
                            {
                                CultureLang = (string)ConfigurationManager.AppSettings["CultureLang"];
                            }
                            else
                            {
                                CultureLang = "en-US";
                            }
                        }
                        else
                        {
                            CultureLang = language;
                        }
                        if (CultureLang == "en-US") isHeb = false;
                        var dateTime = DateTime.Now.ToString(dateTimeFormat, new CultureInfo(CultureLang));
                        //ReplacePlaceHolder("{createdon}", dateTime, wordDocumentMainPart.Document);

                        FillSimpleText(wordDocumentMainPart.Document, "{createdon}", dateTime, isHeb);


                        foreach (property entry in propertyList)
                        {
                            propertyName = "{" + entry.name + "}";
                            propertyValue = entry.value;
                            //ReplacePlaceHolder(propertyName, propertyValue, wordDocumentMainPart.Document);
                            FillSimpleText(wordDocumentMainPart.Document, propertyName, propertyValue, isHeb);

                        }

                        // Replace properties for main entity and related entities

                        Entity entity = null;
                        const string c_templ = "{0}/{1}";

                        foreach (EntityFilter entityFilter in entityList)
                        {
                            if (entityFilter.isMain)
                            {
                                var entityNameProperty = new CustomDocumentProperty();
                                entityNameProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                                entityNameProperty.Name = "EntityName";
                                entityNameProperty.VTLPWSTR = new VTLPWSTR(entityFilter.entityName);

                                var entityIdProperty = new CustomDocumentProperty();
                                entityIdProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                                entityIdProperty.Name = "EntityId";
                                entityIdProperty.VTLPWSTR = new VTLPWSTR(entityFilter.entityId);

                                properties.AppendChild(entityNameProperty);
                                properties.AppendChild(entityIdProperty);

                                pid = 2;
                                foreach (CustomDocumentProperty item in properties)
                                {
                                    item.PropertyId = pid++;
                                }
                                properties.Save();
                            }

                            if (entityFilter.entityName != "annotation")
                            {
                                if (entityFilter.isLinked)
                                {
                                    entity = LinkedEntityRetrieve(crmService, orgName, entityFilter.entityId, entityFilter.entityName, entityFilter.linkedPropertyName);
                                }
                                else
                                {
                                    entity = EntityRetrieve(crmService, orgName, entityFilter.entityName, entityFilter.entityId);
                                    //entity=currentEntity!=null?currentEntity:EntityRetrieve(crmService, orgName, entityFilter.entityName, entityFilter.entityId);
                                }
                            }

                            foreach (var attribute in entity.Attributes)
                            {

                                propertyValue = String.Empty;
                                propertyName = String.Concat("{", String.Format(c_templ, entity.LogicalName, attribute.Key), "}");
                                propertyValue = GetPropertyValue(attribute.Key, entity);
                                //ReplacePlaceHolder(propertyName, propertyValue, wordDocumentMainPart.Document);
                                FillSimpleText(wordDocumentMainPart.Document, propertyName, propertyValue, isHeb);
                            }
                        }

                        ClearAllStd(wordDocumentMainPart.Document);


                        // Save the document
                        wordDocumentMainPart.Document.Save();
                        wordDocument.Close();

                        using (var fileStream = File.Create(savePath))
                        {
                            newDocumentStream.Position = 0;
                            newDocumentStream.WriteTo(fileStream);
                        }

                        returnValue.returnValue = savePath.ToString();
                        returnValue.success = true;
                        returnValue.message = String.Empty;

                    }
                }

            }
            catch (SoapException ex)
            {
                string errorMessage = "User: " + userName + " Fatal Error: " + ex.Detail.InnerText + "\r\n" + ex.Message + "\r\n" + ex.StackTrace;
                m_log.Error(errorMessage + "\r\n");
                returnValue.returnValue = "error";
                returnValue.success = false;
                returnValue.message = errorMessage;

            }
            catch (Exception ex)
            {
                string errorMessage = "User: " + userName + " Fatal Error: " + ex.Message + "\r\n" + ex.StackTrace;
                m_log.Error(errorMessage + "\r\n");
                returnValue.returnValue = "error";
                returnValue.success = false;
                returnValue.message = errorMessage;

            }

            return returnValue;
        }

        private void FillSimpleText(OpenXmlElement document, string fieldname, string replacementText, bool isHeb = true)
        {
            Paragraph p;
            Run rWord = new Run();
            if (!String.IsNullOrEmpty(fieldname) && fieldname.ToLower().IndexOf("new_inner_text") > 0)
                rWord.Append(new Break());
            parseTextForOpenXML(rWord, replacementText);
            //var txtTemp = new Text(replacementText);
            //txtTemp.Space = SpaceProcessingModeValues.Preserve;
            //rWord.AppendChild<Text>(txtTemp);
            var defaultHebFont = "David";

            var placeHolder = document
                 .Descendants()
                 .Where(e => e is SdtBlock || e is SdtRun)
                 .Cast<SdtElement>()
                 .Where(run => run.SdtProperties.GetFirstChild<Tag>().Val == fieldname)
                 .SingleOrDefault();
            // remove the showing place holder element  
            if (placeHolder == null)
                return;

            SdtProperties ccProperties = placeHolder.SdtProperties;
            if (ccProperties != null)
                ccProperties.RemoveAllChildren<ShowingPlaceholder>();
            Run ccRun = null;
            // fetch content block Run element 
            if (placeHolder is SdtRun)
            {
                SdtContentRun contentRun = ((SdtRun)placeHolder).SdtContentRun;
                ccRun = contentRun.GetFirstChild<Run>();


                if (ccRun != null && ccRun.RunProperties != null)
                {
                    rWord.RunProperties = new RunProperties(ccRun.RunProperties.CloneNode(true));

                    if (rWord.RunProperties.RunFonts == null && !String.IsNullOrEmpty(defaultHebFont) && isHeb)
                    {
                        rWord.RunProperties.Languages = GetHebrew();
                        rWord.RunProperties.RunFonts = new RunFonts();
                        //  rprLtr.RunFonts.Hint = FontTypeHintValues.EastAsia;
                        rWord.RunProperties.RunFonts.Ascii = defaultHebFont;
                    }
                }
                p = GetFirstParent<Paragraph>(placeHolder);
                if (p != null)
                    p.Append(rWord);
                placeHolder.Remove();
            }
            else if (placeHolder is SdtBlock)
            {
                p = placeHolder.Descendants<Paragraph>().FirstOrDefault();
                if (placeHolder.Parent != null && placeHolder.Parent is Body)
                {
                    // var sdt=(SdtContentBlock)p.Parent;
                    ccRun = p.GetFirstChild<Run>();
                    if (ccRun != null && ccRun.RunProperties != null)
                    {
                        rWord.RunProperties = new RunProperties(ccRun.RunProperties.CloneNode(true));

                        if (rWord.RunProperties.RunFonts == null && !String.IsNullOrEmpty(defaultHebFont) && isHeb)
                        {
                            rWord.RunProperties.Languages = GetHebrew();
                            rWord.RunProperties.RunFonts = new RunFonts();
                            rWord.RunProperties.RunFonts.Ascii = defaultHebFont;
                        }
                    }
                    Paragraph newp = new Paragraph();
                    newp.Append(rWord);
                    if (p.ParagraphProperties != null)
                        newp.ParagraphProperties = new ParagraphProperties(p.ParagraphProperties.CloneNode(true));
                    placeHolder.Parent.ReplaceChild(newp, placeHolder);
                }
            }
        }

        void parseTextForOpenXML(Run run, string textualData)
        {
            if (String.IsNullOrEmpty(textualData))
                return;

            //{ Environment.NewLine };
            // string[] textArray = textualData.Split(newLineArray, StringSplitOptions.None);
            string[] textArray = textualData.Split(Environment.NewLine.ToCharArray());
            bool first = true;

            foreach (string line in textArray)
            {
                if (!first)
                {
                    run.Append(new Break());
                }

                first = false;

                Text txt = new Text();
                txt.Text = line;
                txt.Space = SpaceProcessingModeValues.Preserve;
                run.Append(txt);
            }
        }







        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json, UseHttpGet = false)]
        public Infrastucture.ReturnValue RenderRoman(string orgName, EntityFilter[] entityList, string[] templateList, property[] propertyList, string fileName, string logoName, string language, [Optional] TableMapping[] TableMapArr)
        {
            string userName = Context.User.Identity.Name;
            //string userName = Thread.CurrentThread.SecurityPrincipal
            //    ;
            Infrastucture.ReturnValue returnValue = new Infrastucture.ReturnValue();

            try
            {
                var serverName = ConfigurationManager.AppSettings["CRMHost"];
                var documenterHost = ConfigurationManager.AppSettings["DocumenterHost"];
                var m_netPath = ConfigurationManager.AppSettings["netPath"];



                string serverPath = Path.Combine(m_netPath, "templates\\");

                string savePath = Path.Combine(m_netPath, String.Format("docs\\{0}_{1:yyyyMMddHHmm}_{1:ssfff}.docm", fileName, DateTime.Now));

                string tmp;
                if (logoName == null || logoName == String.Empty)
                {
                    tmp = Path.Combine(serverPath, "logos\\logo.docm");
                }
                else
                {
                    tmp = Path.Combine(serverPath, "logos\\" + logoName);
                }
                // Load Logo as main document
                byte[] logoDocument = File.ReadAllBytes(tmp);
                using (var newDocumentStream = new MemoryStream())
                {
                    newDocumentStream.Write(logoDocument, 0, (int)logoDocument.Length);
                    using (var wordDocument = WordprocessingDocument.Open(newDocumentStream, true))
                    {
                        var wordDocumentMainPart = wordDocument.MainDocumentPart;

                        // Add templates to it
                        foreach (string templateName in templateList)
                        {
                            using (var temlateDocument = WordprocessingDocument.Open(Path.Combine(serverPath, templateName), false))
                            {
                                wordDocumentMainPart.Document.AppendChild(temlateDocument.MainDocumentPart.Document.Body.CloneNode(true));
                            }

                            //AlternativeFormatImportPart chunk = wordDocumentMainPart
                            //    .AddAlternativeFormatImportPart(AlternativeFormatImportPartType.WordprocessingML);
                            //string altchunkid = wordDocumentMainPart.GetIdOfPart(chunk);

                            //using (var fileStream = File.OpenRead(Path.Combine(serverPath, templateName)))
                            //{
                            //    chunk.FeedData(fileStream);
                            //}

                            //AltChunk altChunk = new AltChunk();
                            //altChunk.Id = altchunkid;
                            //wordDocumentMainPart.Document.Body.AppendChild(altChunk);

                        }
                        // add Properties

                        if (wordDocument.CustomFilePropertiesPart == null)
                        {
                            var customPropertiesPart = wordDocument.AddCustomFilePropertiesPart();
                            customPropertiesPart.Properties = new Properties();
                        }

                        var properties = wordDocument.CustomFilePropertiesPart.Properties;

                        var orgProperty = new CustomDocumentProperty();
                        orgProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        orgProperty.Name = "Organization";
                        orgProperty.VTLPWSTR = new VTLPWSTR(orgName);

                        var fullPathProperty = new CustomDocumentProperty();
                        fullPathProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        fullPathProperty.Name = "FullPath";
                        fullPathProperty.VTLPWSTR = new VTLPWSTR(savePath);

                        var serverHostProperty = new CustomDocumentProperty();
                        serverHostProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                        serverHostProperty.Name = "ServerHostName";
                        serverHostProperty.VTLPWSTR = new VTLPWSTR(documenterHost);


                        properties.AppendChild(orgProperty);
                        properties.AppendChild(fullPathProperty);
                        properties.AppendChild(serverHostProperty);

                        int pid = 2;
                        foreach (CustomDocumentProperty item in properties)
                        {
                            item.PropertyId = pid++;
                        }

                        properties.Save();

                        string propertyValue;
                        string propertyName;


                        ReplacePlaceHolder("{createdonhebrew}", Helper.GetHebrewJuwishDateString(DateTime.Now, false), wordDocumentMainPart.Document);

                        string dateTimeFormat, CultureLang;

                        if (ConfigurationManager.AppSettings["dateTimeFormat"] != null)
                        {
                            dateTimeFormat = (string)ConfigurationManager.AppSettings["dateTimeFormat"];
                        }
                        else
                        {
                            dateTimeFormat = "dd-MM-yyyy";
                        }

                        if (string.IsNullOrEmpty(language))
                        {
                            if (ConfigurationManager.AppSettings["CultureLang"] != null)
                            {
                                CultureLang = (string)ConfigurationManager.AppSettings["CultureLang"];
                            }
                            else
                            {
                                CultureLang = "en-US";
                            }
                        }
                        else
                        {
                            CultureLang = language;
                        }

                        var dateTime = DateTime.Now.ToString(dateTimeFormat, new CultureInfo(CultureLang));
                        ReplacePlaceHolder("{createdon}", dateTime, wordDocumentMainPart.Document);


                        foreach (property entry in propertyList)
                        {
                            propertyName = "{" + entry.name + "}";
                            propertyValue = entry.value;
                            ReplacePlaceHolder(propertyName, propertyValue, wordDocumentMainPart.Document);
                        }

                        // Replace properties for main entity and related entities

                        Entity entity = null;
                        const string c_templ = "{0}/{1}";
                        IOrganizationService crmService = GetCRMService(orgName, true);

                        foreach (EntityFilter entityFilter in entityList)
                        {
                            if (entityFilter.isMain)
                            {
                                var entityNameProperty = new CustomDocumentProperty();
                                entityNameProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                                entityNameProperty.Name = "EntityName";
                                entityNameProperty.VTLPWSTR = new VTLPWSTR(entityFilter.entityName);

                                var entityIdProperty = new CustomDocumentProperty();
                                entityIdProperty.FormatId = "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}";
                                entityIdProperty.Name = "EntityId";
                                entityIdProperty.VTLPWSTR = new VTLPWSTR(entityFilter.entityId);

                                properties.AppendChild(entityNameProperty);
                                properties.AppendChild(entityIdProperty);

                                pid = 2;
                                foreach (CustomDocumentProperty item in properties)
                                {
                                    item.PropertyId = pid++;
                                }
                                properties.Save();
                            }

                            if (entityFilter.entityName != "annotation")
                            {
                                if (entityFilter.isLinked)
                                {
                                    entity = LinkedEntityRetrieve(crmService, orgName, entityFilter.entityId, entityFilter.entityName, entityFilter.linkedPropertyName);
                                }
                                else
                                {
                                    entity = EntityRetrieve(crmService, orgName, entityFilter.entityName, entityFilter.entityId);
                                }
                            }

                            foreach (var attribute in entity.Attributes)
                            {

                                propertyValue = String.Empty;
                                propertyName = String.Concat("{", String.Format(c_templ, entity.LogicalName, attribute.Key), "}");
                                propertyValue = GetPropertyValue(attribute.Key, entity);
                                ReplacePlaceHolder(propertyName, propertyValue, wordDocumentMainPart.Document);
                            }
                        }




                        // Save the document
                        wordDocumentMainPart.Document.Save();
                        wordDocument.Close();

                        using (var fileStream = File.Create(savePath))
                        {
                            newDocumentStream.Position = 0;
                            newDocumentStream.WriteTo(fileStream);
                        }

                        returnValue.returnValue = savePath.ToString();
                        returnValue.success = true;
                        returnValue.message = String.Empty;

                    }
                }

            }
            catch (SoapException ex)
            {
                string errorMessage = "User: " + userName + " Fatal Error: " + ex.Detail.InnerText + "\r\n" + ex.Message + "\r\n" + ex.StackTrace;
                m_log.Error(errorMessage + "\r\n");
                returnValue.returnValue = "error";
                returnValue.success = false;
                returnValue.message = errorMessage;

            }
            catch (Exception ex)
            {
                string errorMessage = "User: " + userName + " Fatal Error: " + ex.Message + "\r\n" + ex.StackTrace;
                m_log.Error(errorMessage + "\r\n");
                returnValue.returnValue = "error";
                returnValue.success = false;
                returnValue.message = errorMessage;

            }

            return returnValue;
        }

        private IOrganizationService GetCRMService(string orgName, bool useDefaultCredentials)
        {
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
        private string GetPropertyValue(string propertyName, Entity entity)
        {
            if (entity.FormattedValues.ContainsKey(propertyName))
                return entity.FormattedValues[propertyName];

            var attribute = entity.Attributes[propertyName];
            if (attribute == null)
                return "";

            if (attribute is string)
                return (string)attribute;

            else if (attribute is DateTime)
                return ((DateTime)attribute).ToString();
            else if (attribute is EntityReference)
                return ((EntityReference)attribute).Name;

            return "";

        }

        private Entity EntityRetrieve(IOrganizationService crmService, string orgName, string entityName, string entityId)
        {
            return crmService.Retrieve(entityName, new Guid(entityId), new ColumnSet(true));
        }

        private Entity LinkedEntityRetrieve(IOrganizationService srv, string orgName, string entityId, string linkedEntity, string linkedPropertyName)
        {
            QueryByAttribute query = new QueryByAttribute();
            query.ColumnSet = new ColumnSet(true);
            query.EntityName = linkedEntity;
            query.Attributes.Add(linkedPropertyName);
            query.Values.Add(new Guid(entityId));

            RetrieveMultipleRequest req = new RetrieveMultipleRequest();
            req.Query = query;

            RetrieveMultipleResponse resp = (RetrieveMultipleResponse)srv.Execute(req);
            if (resp.EntityCollection.Entities.Count > 0)
            {
                return resp.EntityCollection.Entities[0];
            }
            return null;

        }

        static Languages GetHebrew()
        {
            Languages lang = new Languages();
            lang.Bidi = "he-IL";
            lang.Val = "he-IL";
            return lang;
        }


        private void ClearAllStd(OpenXmlElement document)
        {
            var placeHolders = document
                   .Descendants()
                   .Where(e => e is SdtBlock || e is SdtRun)
                   .Cast<SdtElement>();

            if (placeHolders != null && placeHolders.Any())
            {
                foreach (var placeHolder in placeHolders)
                {
                    placeHolder.Remove();
                }
            }


        }

        static T GetFirstParent<T>(OpenXmlElement element)
           where T : OpenXmlElement
        {
            if (element.Parent == null)
            {
                return null;
            }
            else if (element.Parent.GetType() == typeof(T))
            {
                return element.Parent as T;
            }
            else
            {
                return GetFirstParent<T>(element.Parent);
            }
        }

        public void ReplacePlaceHolder(string name, string value, OpenXmlElement element)
        {
            var placeHolder = element
                .Descendants()
                .Where(e => e is SdtBlock || e is SdtRun)
                .Cast<SdtElement>()
                .Where(run => run.SdtProperties.GetFirstChild<Tag>().Val == name)
                .SingleOrDefault();

            if (placeHolder != null)
            {
                placeHolder.GetFirstChild<SdtProperties>();//.AppendChild(new DocumentFormat.OpenXml.Wordprocessing.Languages { Bidi = "he-IL", Val = "he-IL" });

                var text = placeHolder.Descendants<Text>().SingleOrDefault();
                text.Text = value;
            }
        }
    }

    [Serializable()]
    public struct property
    {
        public string name;
        public string value;
        public property(string name, string value)
        {
            this.name = name;
            this.value = value;
        }

    }



    public struct EntityFilter
    {
        public string entityName;
        public string attributeName;
        public string entityId;
        public string linkedPropertyName;
        public bool isLinked;
        public bool isMain;

        public EntityFilter(string entityName, string attributeName, string entityId, bool isLinked, string linkedPropertyName, bool isMain)
        {
            this.entityName = entityName;
            this.attributeName = attributeName;
            this.entityId = entityId;
            this.linkedPropertyName = linkedPropertyName;
            this.isLinked = isLinked;
            this.isMain = isMain;
        }

    }

    [Serializable()]
    [XmlInclude(typeof(TableProperties))]
    public class TableMapping
    {

        [XmlElement(ElementName = "TableProp")]
        public TableProperties[] TableProp;
        public string FetchXMLQuery;
        public string BookmarkName;

    }

    [Serializable()]
    public class TableProperties
    {
        [XmlAttribute(AttributeName = "DisplayText")]
        public string DisplayText;
        [XmlAttribute(AttributeName = "FieldName")]
        public string FieldName;
        [XmlAttribute(AttributeName = "Format")]
        public string Format;


    }
    /// <summary>
    /// class represent structures
    /// </summary>
    public class Infrastucture
    {

        /// <summary>
        /// Return Value contains message, state succeded or not,and Returned Value
        /// </summary>
        [Serializable]
        public struct ReturnValue
        {
            public string message;
            public bool success;
            public string returnValue;

            public ReturnValue(string returnValue, bool success, string message)
            {
                this.message = message;
                this.returnValue = returnValue;
                this.success = success;
            }

        }
        /// <summary>
        /// Serialize object
        /// </summary>
        /// <param name="pObject">Object for serialization</param>
        /// <returns>string as XML</returns>
        public String SerializeObject(Object pObject)
        {
            MemoryStream memoryStream = new MemoryStream();
            XmlSerializer xs = new XmlSerializer(pObject.GetType());
            XmlTextWriter xmlTextWriter = new XmlTextWriter(memoryStream, Encoding.UTF8);
            xs.Serialize(xmlTextWriter, pObject);
            memoryStream = (MemoryStream)xmlTextWriter.BaseStream;
            UTF8Encoding encoding = new UTF8Encoding();
            return encoding.GetString(memoryStream.ToArray());
        }

    }

}
