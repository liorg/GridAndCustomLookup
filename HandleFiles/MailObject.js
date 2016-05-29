// JQ213 - Custom jQuery name
if (typeof (President) == "undefined") {
    President = { __namespace: true };
}


President.MailObject = {
    __namespace: true, text_mailobject: null, inner_text: null,
    Lang: false,
    Nadon: 1,
    Doc_To: 1,
    renderDocument: {
        orgName: Xrm.Page.context.getOrgUniqueName(),
        entityList: [],
        templateList: [],
        propertyList: [],
        fileName: "",
        logoName: "",
        language: "",
        TableMapArr: []
    },

    OnLoad: function () {
        President.MailObject.text_mailobject = Xrm.Page.getAttribute("new_new_text_new_mailobject");
        President.MailObject.text_mailobject.addOnChange(President.MailObject.TextChange);
        President.MailObject.inner_text = Xrm.Page.getAttribute("new_inner_text");
        President.MailObject.TextChange();
    },

    OnSave: function () {
        // debugger;
        President.MailObject.TextChange();
        var t = '';
        var new_clas_2_mail = Xrm.Page.getAttribute("new_clas_2_mail");
        var new_sec_class_mail = Xrm.Page.getAttribute("new_sec_class_mail");
        //  if (new_clas_2_mail != null && new_clas_2_mail.getValue() != null && new_clas_2_mail.getValue()[0] != null) {
        //     t = new_clas_2_mail.getValue()[0].name;
        //  }
        if (new_sec_class_mail != null && new_sec_class_mail.getValue() != null && new_sec_class_mail.getValue()[0] != null) {
            t = t + '' + new_sec_class_mail.getValue()[0].name;
        }
        Xrm.Page.getAttribute("new_name").setValue(t);
    },

    TextChange: function () {
        if (President.MailObject.text_mailobject.getValue() == null || President.MailObject.text_mailobject.getValue()[0] == null) {
            President.MailObject.inner_text.setValue("");
            return;
        }
        var id = President.MailObject.text_mailobject.getValue()[0].id;
        var systemUserURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/New_textSet(guid'" + id + "')?$select="
            + "new_docmailtype,New_inner_text"
        JQ213.ajax({
            type: "GET",
            url: systemUserURL,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: false,
            success: function (data) {
                // debugger;
                if (data.d.New_inner_text != null)
                    President.MailObject.inner_text.setValue(data.d.New_inner_text);
                else
                    President.MailObject.inner_text.setValue("");
                if (data.d.new_docmailtype != null && data.d.new_docmailtype.Value != null)
                    Xrm.Page.getAttribute("new_doc_to").setValue(data.d.new_docmailtype.Value);
                else
                    Xrm.Page.getAttribute("new_doc_to").setValue(1);
            },
            error: President.MailObject.errorHandler
        });
    },

    OpenWord: function () {
        debugger;
        President.MailObject.Doc_To = 1;
        President.MailObject.renderDocument.entityList = [];
        President.MailObject.renderDocument.propertyList = [];
        var new_wordtemplatetype = Xrm.Page.getAttribute("new_wordtemplatetype");
        if (President.Utils.IsNull("new_wordtemplatetype")) {
            alert("נא לבחור סוג תבנית");
            return;
        }
        var new_doc_to = Xrm.Page.getAttribute("new_doc_to");
        if (new_doc_to != null && new_doc_to.getValue() != null) {
            President.MailObject.Doc_To = new_doc_to.getValue();
        }


        if (new_wordtemplatetype.getValue() == 3) {
            if (President.Utils.IsNull("new_new_text_new_mailobject")) {
                alert("אין טקסט - לא ניתן ליצור קובץ ללא תוכן");
                return;
            }

            var DocName = President.Utils.clearText(Xrm.Page.getAttribute("new_new_text_new_mailobject").getValue()[0].name);
            President.MailObject.renderDocument.fileName = DocName;
            var text = Xrm.Page.getAttribute("new_inner_text").getValue();
            //text = text.replace(/\n/gi, '^p');
            if (!President.Utils.IsNull("new_contact_mailobject")) {
                President.MailObject.renderDocument.propertyList.push({ name: "incident/new_inner_text", value: text });
                President.MailObject.renderDocument.propertyList.push({ name: "incident/new_signature", value: Xrm.Page.getAttribute("new_signature_text").getValue() });

                President.MailObject.renderDocument.entityList.push({
                    entityName: Xrm.Page.data.entity.getEntityName(),
                    attributeName: Xrm.Page.data.entity.getEntityName() + "id",
                    entityId: Xrm.Page.data.entity.getId(),
                    linkedPropertyName: "",
                    isLinked: false,
                    isMain: true
                });

                // if (Xrm.Page.getAttribute('new_signature').getValue() == false) {
                var systemUserURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/SystemUserSet(guid'" + Xrm.Page.getAttribute("ownerid").getValue()[0].id + "')?$select="
                + "FullName,JobTitle,new_jobtitleeng,new_fullnameeng"

                JQ213.ajax({
                    type: "GET",
                    url: systemUserURL,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    async: false,
                    success: function (data) {
                        if (data.d.JobTitle != null)
                            President.MailObject.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: data.d.JobTitle });
                        else
                            President.MailObject.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: "" });
                        President.MailObject.renderDocument.propertyList.push({ name: "systemuser/jobtitleeng", value: President.Utils.GetEmptyWhenNull(data.d.new_jobtitleeng) });
                        President.MailObject.renderDocument.propertyList.push({ name: "systemuser/fullnameeng", value: President.Utils.GetEmptyWhenNull(data.d.new_fullnameeng) });
                        President.MailObject.renderDocument.propertyList.push({ name: "systemuser/fullname", value: President.Utils.GetEmptyWhenNull(data.d.FullName) });
                    },
                    error: President.MailObject.errorHandler
                });

                // }
                //  else {
                //        President.MailObject.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: "" });
                //   }

                President.MailObject.renderDocument.templateList = ["Platform.docx"];
                debugger;
                var new_doc_lang = Xrm.Page.getAttribute('new_doc_lang').getValue();

                var lng = '';
                switch (new_doc_lang) {
                    case true:
                        President.MailObject.renderDocument.templateList = ["Platform_" + President.MailObject.Doc_To + "_en_mailobject.docx"];
                        lng = "en-US";
                        President.MailObject.renderDocument.language = lng;
                        break;
                    case false:
                        President.MailObject.renderDocument.templateList = ["Platform_" + President.MailObject.Doc_To + "_he_mailobject.docx"];
                        lng = "he-IL";
                        break;
                }

                var logo = "";

                if (Xrm.Page.getAttribute("new_iswithlogo").getValue() == true) {
                    logo = "logo.docm";
                    if (lng == "en-US") logo = "logoen.docm";
                }
                else
                    logo = "EmptyLogo.docm";

                President.MailObject.renderDocument.logoName = logo;

                var contactURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + Xrm.Page.getAttribute("new_contact_mailobject").getValue()[0].id + "')?$select="
                + "New_title,Address1_Line1,Address1_Line2,New_home_number,Address1_City,Address1_PostalCode,GovernmentId,FirstName"

                JQ213.ajax({
                    type: "GET",
                    url: contactURL,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                    },
                    async: false,
                    success: function (data) {
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/titlefirstname", value: President.Utils.GetEmptyWhenNull(data.d.FirstName) + " שלום רב," });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/firstname", value: President.Utils.GetEmptyWhenNull(data.d.FirstName) });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/title", value: Xrm.Page.getAttribute("new_mailobjectcode").getValue() });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/new_subjectcontact", value: Xrm.Page.getAttribute("new_contact_mailobject").getValue()[0].name });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/address1_line1", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line1) });
                        //President.MailObject.renderDocument.propertyList.push({ name: "incident/address1_line2", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line2) });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/new_home_number", value: President.Utils.GetEmptyWhenNull(data.d.New_home_number) });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/address1_city", value: President.Utils.GetEmptyWhenNull(data.d.Address1_City) });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/address1_postalcode", value: President.Utils.GetEmptyWhenNull(data.d.Address1_PostalCode) });
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/governmentid", value: President.Utils.GetEmptyWhenNull(data.d.GovernmentId) });
                        var tadour = "";
                        if (data.d.Address1_Line2 != null && data.d.Address1_Line2 != "") {
                            tadour = "תד " + data.d.Address1_Line2;
                        }
                        President.MailObject.renderDocument.propertyList.push({ name: "incident/address1_line2", value: tadour });

                        SDK.Metadata.RetrieveAttribute(
                            "contact",
                            "new_title",
                            null,
                            true,
                            function (result) {
                                debugger;
                                for (var i = 0; i < result.OptionSet.Options.length; i++) {
                                    if (result.OptionSet.Options[i].Value == data.d.New_title.Value) {
                                        var title = President.Utils.GetEmptyWhenNull(result.OptionSet.Options[i].Label.LocalizedLabels[0].Label);
                                        var name = Xrm.Page.getAttribute("new_contact_mailobject").getValue()[0].name;
                                        President.MailObject.renderDocument.propertyList.push({ name: "incident/new_title", value: title });
                                        //{incident/new_titlename}
                                        President.MailObject.renderDocument.propertyList.push({ name: "incident/new_titlename", value: name + " ," + title + "" });
                                        var doctitle = title + " " + Xrm.Page.getAttribute("new_contact_mailobject").getValue()[0].name;
                                        President.MailObject.renderDocument.propertyList.push({ name: "doctitle", value: doctitle });
                                    }
                                }
                                President.MailObject._RenderDocument();
                            },
                            function (error) {
                                President.MailObject.errorHandler({ statusText: error });
                            }
                         );
                    },
                    error: President.MailObject.errorHandler
                });
            }
        }
        else {
            var templates = [];
            var FileDisplayName;


        }
    },

    _RenderDocument: function () {
        //var documentCreatorURL = "http://localhost/";
        var documentCreatorURL = Xrm.Page.context.getClientUrl().replace("/" + Xrm.Page.context.getOrgUniqueName(), ":81/");
        // alert(documentCreatorURL );
        JQ213.ajax({
            type: "POST",
            url: documentCreatorURL + "documenter/DocumentCreator.asmx/Render",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(President.MailObject.renderDocument),
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: false,
            success: function (data) {
                if (!data.d.success) {
                    President.MailObject.errorHandler({ statusText: data.d.message });
                }
                else {
                    window.open(data.d.returnValue);
                }
            },
            error: President.MailObject.errorHandler

        });
    },

    errorHandler: function (error, x, y) {
        alert(error.statusText);
    }
     , Upload: function (code, id) {
         var webresourceurl = "/webresources/new_fileupload.htm?typename=" + code + "&id=" + id;

         var DialogOptions = new Xrm.DialogOptions();
         DialogOptions.width = 500;
         DialogOptions.height = 300;

         var crmUri = Mscrm.CrmUri.create(webresourceurl);
         Xrm.Internal.openDialog(webresourceurl, DialogOptions, null, null,
             function (result) {
                 alert(result);
             }
         );
     }
    , ShowFolder: function (code, id) {
        var webresourceurl = "/webresources/new_showFolder.html?typename=" + code + "&id=" + id;

        var DialogOptions = new Xrm.DialogOptions();
        DialogOptions.width = 500;
        DialogOptions.height = 500;

        var crmUri = Mscrm.CrmUri.create(webresourceurl);
        Xrm.Internal.openDialog(webresourceurl, DialogOptions, null, null,
            function (result) {
                alert(result);
            }
        );
    }
};
