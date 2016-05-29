// JQ213 - Custom jQuery name
if (typeof (President) == "undefined") {
    President = { __namespace: true };
}



//debugger;
President.Incident = {
    __namespace: true, text_incident: null, inner_text: null,
    Lang: false,
    Nadon: 1, Mosad: 3,
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
    errorHandler: function (error) {
        alert(error.statusText);
        throw error;
    },
    OnLoad: function () {
        debugger;
        President.Incident.text_incident = Xrm.Page.getAttribute("new_new_text_incident");
        President.Incident.text_incident.addOnChange(President.Incident.TextChange);
        Xrm.Page.getAttribute("customerid").addOnChange(President.Incident.CustomerChange);
        President.Incident.inner_text = Xrm.Page.getAttribute("new_inner_text");
        President.Incident.TextChange();

        if (Xrm.Page.getAttribute("new_metapel").getValue() == null || Xrm.Page.getAttribute("new_metapel").getValue()[0] == null)
            President.Incident.CustomerChange();

    },
    OnSave: function () {
        President.Incident.TextChange();
    },
    CustomerChange: function () {
        debugger;
        if (Xrm.Page.getAttribute("customerid").getValue() != null && Xrm.Page.getAttribute("customerid").getValue()[0] != null) {

            var accountURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'" + Xrm.Page.getAttribute("customerid").getValue()[0].id + "')?$select="
                                                  + "Address1_City,PrimaryContactId";
            JQ213.ajax({
                type: "GET",
                url: accountURL,
                contentType: "application/json; charset=utf-8",
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Accept", "application/json");
                },
                async: false,
                success: function (data) {
                    debugger;
                    if (data.d.PrimaryContactId != null && data.d.PrimaryContactId.Id != null) {
                        var name = data.d.PrimaryContactId.Name || "";
                        Xrm.Page.getAttribute("new_metapel").setValue([{
                            id: data.d.PrimaryContactId.Id,
                            name: data.d.PrimaryContactId.Name,
                            entityType: data.d.PrimaryContactId.LogicalName
                        }]);
                    }
                    else
                        Xrm.Page.getAttribute("new_metapel").setValue(null);
                },
                error: President.Incident.errorHandler
            });
        }
    },
    TextChange: function () {
        if (President.Incident.text_incident.getValue() == null || President.Incident.text_incident.getValue()[0] == null) {
            President.Incident.inner_text.setValue("");
            return;
        }
        var id = President.Incident.text_incident.getValue()[0].id;
        var systemUserURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/New_textSet(guid'" + id + "')?$select="
            + "New_inner_text"
        JQ213.ajax({
            type: "GET",
            url: systemUserURL,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: false,
            success: function (data) {
                if (data.d.New_inner_text != null)
                    President.Incident.inner_text.setValue(data.d.New_inner_text);
                else
                    President.Incident.inner_text.setValue("");
            },
            error: President.Incident.errorHandler
        });
    },
    _RenderDocument: function () {
        // var documentCreatorURL = "http://localhost/";

        var documentCreatorURL = Xrm.Page.context.getClientUrl().replace("/" + Xrm.Page.context.getOrgUniqueName(), ":81/");

        JQ213.ajax({
            type: "POST",
            url: documentCreatorURL + "documenter/DocumentCreator.asmx/Render",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(President.Incident.renderDocument),
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("Accept", "application/json");
            },
            async: false,
            success: function (data) {
                if (!data.d.success) {
                    President.Incident.errorHandler({ statusText: data.d.message });
                }
                else {
                    window.open(data.d.returnValue);
                }
            },
            error: President.Incident.errorHandler

        });
    },

    OpenWord: function () {
        debugger;
        President.Incident.renderDocument.entityList = [];
        President.Incident.renderDocument.propertyList = [];
        if (President.Utils.IsNull("new_wordtemplatetype")) {
            alert("נא לבחור סוג תבנית");
            return;
        }
        var new_doc_to = Xrm.Page.getAttribute("new_doc_to");

        if (Xrm.Page.getAttribute("new_wordtemplatetype").getValue() != 4)
            return;  //TODO: l.g   // open word tamplate picklist


        if (President.Utils.IsNull("new_new_text_incident")) {
            alert("אין טקסט - לא ניתן ליצור קובץ ללא תוכן");
            return;
        }

        if (new_doc_to == null || new_doc_to.getValue() == null) {
            alert("יש לבחור ערך לכבוד");
            return;
        }

        var DocName = President.Utils.clearText(Xrm.Page.getAttribute("new_new_text_incident").getValue()[0].name);
        President.Incident.renderDocument.fileName = DocName;
        var text = Xrm.Page.getAttribute("new_inner_text").getValue();


        President.Incident.renderDocument.propertyList.push({ name: "incident/new_inner_text", value: text });
        // debugger;
        var ownerid = Xrm.Page.getAttribute("ownerid").getValue()[0]
        President.Incident.renderDocument.propertyList.push({ name: "incident/new_signature", value: ownerid.name });

        President.Incident.renderDocument.entityList.push({
            entityName: Xrm.Page.data.entity.getEntityName(),
            attributeName: Xrm.Page.data.entity.getEntityName() + "id",
            entityId: Xrm.Page.data.entity.getId(),
            linkedPropertyName: "",
            isLinked: false,
            isMain: true
        });


        President.Incident.renderDocument.propertyList.push({ name: "DateEn", value: President.Utils.BuildEnglishDateNow() });

        //   if (Xrm.Page.getAttribute('new_signature').getValue() == false) {
        var systemUserURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/SystemUserSet(guid'" + Xrm.Page.getAttribute("ownerid").getValue()[0].id + "')?$select="
        + "JobTitle"
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
                    President.Incident.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: data.d.JobTitle });
                else
                    President.Incident.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: "" });
            },
            error: President.Incident.errorHandler
        });
        //}// end Xrm.Page.getAttribute('new_signature').getValue()
        //  else
        //     President.Incident.renderDocument.propertyList.push({ name: "systemuser/jobtitle", value: "" });

        President.Incident.renderDocument.templateList = ["Platform.docx"];

        var new_doc_lang = Xrm.Page.getAttribute('new_doc_lang').getValue();
        var lng = '';
        switch (new_doc_lang) {
            case true:
                President.Incident.renderDocument.templateList = ["Platform_" + new_doc_to.getValue() + "_en.docx"];
                lng = "en-US";
                break;
            case false:
                President.Incident.renderDocument.templateList = ["Platform_" + new_doc_to.getValue() + "_he.docx"];
                lng = "he-IL";
                break;
            default:
                President.Incident.renderDocument.templateList = ["Platform_" + new_doc_to.getValue() + "_he.docx"];
                lng = "he-IL";
                break;
        }
        var logo = "";

        if (Xrm.Page.getAttribute("new_iswithlogo").getValue() == true)
            logo = "logo.docm";
        else
            logo = "EmptyLogo.docm";
        President.Incident.renderDocument.logoName = logo;

        var new_subjectcontact = Xrm.Page.getAttribute("new_subjectcontact").getValue();
        President.Utils.LoadCachData(President.Incident.errorHandler, function () {
            var title;
            //text = text.replace(/\n/gi, '^p');
            switch (new_doc_to.getValue()) {
                case President.Incident.Nadon:
                    if (President.Utils.IsNull("new_subjectcontact")) {
                        alert("יש לאכלס ערך עבור הפונה בשם הנדון")
                        return;
                    };
                    var contactURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + Xrm.Page.getAttribute("new_subjectcontact").getValue()[0].id + "')?$select="
                                        + "FullName, New_title,Address1_Line1,New_home_number,Address1_City,Address1_PostalCode,GovernmentId";
                    JQ213.ajax({
                        type: "GET",
                        url: contactURL,
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("Accept", "application/json");
                        },
                        async: false,
                        success: function (data) {
                            debugger;
                            var titleInc = President.Utils.GetTitleContact(data.d.New_title);
                            President.Incident.renderDocument.propertyList.push({ name: "incident/new_title", value: titleInc });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/address1_line1", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line1) });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/new_subjectcontact", value: data.d.FullName });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/new_home_number", value: President.Utils.GetEmptyWhenNull(data.d.New_home_number) });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/address1_city", value: President.Utils.GetEmptyWhenNull(data.d.Address1_City) });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/address1_postalcode", value: President.Utils.GetEmptyWhenNull(data.d.Address1_PostalCode) });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/governmentid", value: President.Utils.GetEmptyWhenNull(data.d.GovernmentId) });
                            President.Incident.renderDocument.propertyList.push({ name: "incident/nedontitle", value: titleInc + ' ' + data.d.FullName });
                            President.Incident._RenderDocument();
                        },
                        error: President.Incident.errorHandler
                    });
                    break;
                case President.Incident.Mosad:
                    if (President.Utils.IsNull("customerid")) {
                        alert("יש לאכלס ערך גורם מטפל")
                        return;
                    };
                    var accountURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/AccountSet(guid'" + Xrm.Page.getAttribute("customerid").getValue()[0].id + "')?$select="
                                            + "Address1_City,Address1_Line1,Address1_Line2,Address1_PostalCode";
                    JQ213.ajax({
                        type: "GET",
                        url: accountURL,
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("Accept", "application/json");
                        },
                        async: false,
                        success: function (data) {
                            // debugger;
                            President.Incident.renderDocument.propertyList.push({ name: "account/address1_line1", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line1) });
                            President.Incident.renderDocument.propertyList.push({ name: "account/address1_city", value: President.Utils.GetEmptyWhenNull(data.d.Address1_City) });
                            President.Incident.renderDocument.propertyList.push({ name: "account/address1_postalcode", value: President.Utils.GetEmptyWhenNull(data.d.Address1_PostalCode) });
                            President.Incident.renderDocument.propertyList.push({ name: "account/address1_postofficebox", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line2) });

                            if (!President.Utils.IsNull("new_metapel")) {
                                var metapelURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + Xrm.Page.getAttribute("new_metapel").getValue()[0].id + "')?$select="
                                       + "New_title,FullName,New_jobtitle,Department";
                                JQ213.ajax({
                                    type: "GET",
                                    url: metapelURL,
                                    contentType: "application/json; charset=utf-8",
                                    beforeSend: function (XMLHttpRequest) {
                                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                                    },
                                    async: false,
                                    success: function (data) {

                                        President.Incident.renderDocument.propertyList.push({ name: "cn/title", value: President.Utils.GetTitleContact(data.d.New_title) });
                                        President.Incident.renderDocument.propertyList.push({ name: "cn/fullname", value: President.Utils.GetEmptyWhenNull(data.d.FullName) });
                                        President.Incident.renderDocument.propertyList.push({ name: "cn/jobtitle", value: President.Utils.GetEmptyWhenNull(data.d.New_jobtitle) });
                                        President.Incident.renderDocument.propertyList.push({ name: "cn/department", value: President.Utils.GetEmptyWhenNull(data.d.Department) });
                                    },
                                    error: President.Incident.errorHandler
                                });
                            }
                            else {
                                President.Incident.renderDocument.propertyList.push({ name: "cn/title", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "cn/fullname", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "cn/jobtitle", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "cn/department", value: '' });
                            }
                            //debugger;
                            if (!President.Utils.IsNull("responsiblecontactid")) {
                                var responsibleURL = Xrm.Page.context.getClientUrl() + "/XRMServices/2011/OrganizationData.svc/ContactSet(guid'" + Xrm.Page.getAttribute("responsiblecontactid").getValue()[0].id + "')?$select="
                                       + "New_title,FullName,Address1_Line1,New_home_number,Address1_City,Address1_PostalCode,GovernmentId";
                                JQ213.ajax({
                                    type: "GET",
                                    url: responsibleURL,
                                    contentType: "application/json; charset=utf-8",
                                    beforeSend: function (XMLHttpRequest) {
                                        XMLHttpRequest.setRequestHeader("Accept", "application/json");
                                    },
                                    async: false,
                                    success: function (data) {
                                        debugger;
                                        President.Incident.renderDocument.propertyList.push({ name: "title", value: President.Utils.GetTitleContact(data.d.New_title) });
                                        President.Incident.renderDocument.propertyList.push({ name: "fullname", value: President.Utils.GetEmptyWhenNull(data.d.FullName) });
                                        President.Incident.renderDocument.propertyList.push({ name: "street", value: President.Utils.GetEmptyWhenNull(data.d.Address1_Line1) });
                                        President.Incident.renderDocument.propertyList.push({ name: "house", value: President.Utils.GetEmptyWhenNull(data.d.New_home_number) });
                                        President.Incident.renderDocument.propertyList.push({ name: "city", value: President.Utils.GetEmptyWhenNull(data.d.Address1_City) });
                                        President.Incident.renderDocument.propertyList.push({ name: "govid", value: President.Utils.GetEmptyWhenNull(data.d.GovernmentId) });


                                        var titledoc1 = President.Utils.GetTitleContact(data.d.New_title) + " " + President.Utils.GetEmptyWhenNull(data.d.FullName) + " " + ", ת.ז: " + President.Utils.GetEmptyWhenNull(data.d.GovernmentId) + " , " + President.Utils.GetEmptyWhenNull(data.d.Address1_Line1) + " " + President.Utils.GetEmptyWhenNull(data.d.New_home_number) + ", " + President.Utils.GetEmptyWhenNull(data.d.Address1_City);
                                        // alert(titledoc1);
                                        President.Incident.renderDocument.propertyList.push({ name: "titledoc1", value: titledoc1 });

                                    },
                                    error: President.Incident.errorHandler
                                });
                            }
                            else {
                                President.Incident.renderDocument.propertyList.push({ name: "title", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "fullname", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "street", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "house", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "city", value: '' });
                                President.Incident.renderDocument.propertyList.push({ name: "govid", value: '' });

                                President.Incident.renderDocument.propertyList.push({ name: " titledoc1", value: "" });
                            }

                            President.Incident._RenderDocument();
                        }, // end success customerid
                        error: President.Incident.errorHandler
                    });//end ajax call account
                    break;
            } //end switch (new_doc_to.getValue())
        });//end loadCache
    }//end openword

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
}

