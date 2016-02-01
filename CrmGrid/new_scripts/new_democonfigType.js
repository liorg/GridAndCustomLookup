var __config = [
    {
        "Name": "x1",
        "Url": "http://localhost:9894/custompicklist/Grid/SimpleGrid.asmx",
        "Org": "",
        "Detail": {
            "Method": "MockData",
            "SettingGrid": {
                "AggrField": "", "SortName": "ListName", "SortOrder": true, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false
            },
            "Schema": [
            { "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true },
            { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false },
            { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true }],
            "FilterFields": [], "IsParentXrm": false
        }
    },
    {
        "Name": "cb",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "fakeCall",
            "SettingGrid": { "AggrField": "", "SortName": "ListName", "SortOrder": true, "TypeData": 1, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true },
            { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false },
            { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true }],
            "FilterFields": [], "IsParentXrm": false
        }
    },
    {
        "Name": "fe",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_gridcrmtest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "ListName", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
             { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
             { "Name": "new_x1", "Desc": "קישקוש", "Width": 222, "CanSort": false },
             { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true }],
            "FilterFields": [], "IsParentXrm": false
        }
    },
    {
        "Name": "fef",
        "Url": "mvs-crm-i-d2",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical' distinct='false'><entity name='new_guardiantest'><attribute name='new_guardiantestid' />  <attribute name='new_name' />  <attribute name='new_x1' /> <attribute name='new_test' />  <attribute name='new_pl' /><order attribute='new_name' descending='false' /></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
             { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
             { "Name": "new_pl", "Desc": "שם3 ", "Width": 145, "CanSort": true },
             { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true }],
            "FilterFields": [], "IsParentXrm": false

        }
    },
    {
        "Name": "fec",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch   mapping='logical' distinct='true'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /><order attribute='new_name' descending='false' /><filter type='and'><condition attribute='new_accountid' operator='eq' value='{new_accountid}'/></filter><link-entity name='account' from='accountid' to='new_accountid' alias='ac'><attribute name='name' /><link-entity name='new_claim' from='new_account' to='accountid' alias='ca'><attribute name='new_name' /><order attribute='new_name' descending='false' /></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 2, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
            { "Name": "ca.new_name", "Desc": "תביעה", "Width": 222, "CanSort": true },
            { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true }],
            "FilterFields": [{ "Name": "new_accountid", "TypeField": "lu", "Val": "" }], "IsParentXrm": false
        }
    },
    {
        "Name": "fexrmid",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /><attribute name='new_pl' /><attribute name='new_test' /><order attribute='new_name' descending='false' /><filter type='and'><condition attribute='new_guardiantestid' operator='eq' value='{id}'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
            { "Name": "new_x1", "Desc": "קישקוש", "Width": 222, "CanSort": true },
            { "Name": "new_pl", "Desc": "בדיקה", "Width": 100, "CanSort": true }],
            "FilterFields": [], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_frmlwf2meeting_pw",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_powerattorney'><attribute name='createdon' /><attribute name='new_meetingsummarytelemeetingid' /><attribute name='new_telemeetingid' /><attribute name='new_mislakacodevalid' /><attribute name='new_mislakacode' /><attribute name='new_customer' /><attribute name='statecode' /><attribute name='new_appendixtype' /><attribute name='new_insurancecompany' /><attribute name='new_powerattorneyvalid' /> <attribute name='new_powerattorneysign' />  <attribute name='new_exclusion' /><order attribute='new_appendixtype' descending='false' /><filter type='and'><condition attribute='new_customer' operator='eq' value='{new_customer}'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "new_powerattorneysign", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_appendixtype", "Desc": "נספח", "Width": 145, "CanSort": true },
            { "Name": "new_powerattorneyvalid", "Desc": "תוקף ייפוי כוח", "Width": 100, "CanSort": true },
            { "Name": "new_powerattorneysign", "Desc": "תאריך חתימת ייפוי כוח", "Width": 100, "CanSort": true },
            { "Name": "new_exclusion", "Desc": "החרגות", "Width": 100, "CanSort": true },
            { "Name": "statecode", "Desc": "מצב", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "new_customer", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_frmlwf2meeting_taskmoked",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='task'><attribute name='createdby' /><attribute name='subject' /><attribute name='new_status_coordinator' /><attribute name='regardingobjectid' /><attribute name='ownerid' /><attribute name='new_meeting_date' /><attribute name='statecode' /><attribute name='new_sla' /><order attribute='subject' descending='false' /><filter type='and'><condition attribute='new_subject' operator='eq' value='7'/></filter><link-entity name='new_telemeeting' from='new_telemeetingid' to='regardingobjectid' alias='aa'><link-entity name='new_meetingsummary_telemeeting' from='new_telemeeting' to='new_telemeetingid' alias='ab'><link-entity name='new_frmlwf2meeting' from='new_meetingsummary' to='new_meetingsummary_telemeetingid' alias='ac'><filter type='and'><condition attribute='new_frmlwf2meetingid' operator='eq' value='{id}'/></filter></link-entity></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "statecode", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
               { "Name": "subject", "Desc": "נושא", "Width": 100, "CanSort": true },
               { "Name": "statecode", "Desc": "מצב הפעילות", "Width": 100, "CanSort": true },
               { "Name": "new_status_coordinator", "Desc": "סטאטוס מתאמת", "Width": 100, "CanSort": true },
               { "Name": "regardingobjectid", "Desc": "לגבי", "Width": 100, "CanSort": true },
               { "Name": "new_meeting_date", "Desc": "מועד פגישה מתואם", "Width": 100, "CanSort": true },
               { "Name": "new_sla", "Desc": "SLA", "Width": 100, "CanSort": true },
               { "Name": "ownerid", "Desc": "בעלים", "Width": 100, "CanSort": true },
               { "Name": "createdby", "Desc": "נוצר ע''י", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_meetingsummary_telemeeting_pw",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_powerattorney'><attribute name='createdon' /><attribute name='new_meetingsummarytelemeetingid' /><attribute name='new_telemeetingid' /><attribute name='new_mislakacodevalid' /><attribute name='new_mislakacode' /><attribute name='new_customer' /><attribute name='statecode' /><attribute name='new_appendixtype' /><attribute name='new_insurancecompany' /><attribute name='new_powerattorneyvalid' /> <attribute name='new_powerattorneysign' />  <attribute name='new_exclusion' /><order attribute='new_appendixtype' descending='false' /><filter type='and'><condition attribute='new_customer' operator='eq' value='{new_customer}'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "new_appendixtype", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_appendixtype", "Desc": "נספח", "Width": 145, "CanSort": true },
            { "Name": "new_insurancecompany", "Desc": "יצרן", "Width": 222, "CanSort": true },
            { "Name": "new_powerattorneyvalid", "Desc": "תוקף ייפוי כוח", "Width": 100, "CanSort": true },
            { "Name": "new_exclusion", "Desc": "החרגות", "Width": 100, "CanSort": true },
            { "Name": "new_powerattorneysign", "Desc": "תאריך חתימת ייפוי כוח", "Width": 100, "CanSort": true },
            { "Name": "statecode", "Desc": "מצב", "Width": 100, "CanSort": true },
            { "Name": "new_customer", "Desc": "מבוטח", "Width": 100, "CanSort": true },
            { "Name": "new_mislakacode", "Desc": "קוד מסלקה", "Width": 100, "CanSort": true },
            { "Name": "new_mislakacodevalid", "Desc": "תוקף קוד מסלקה", "Width": 100, "CanSort": true },
            { "Name": "new_telemeetingid", "Desc": "תהליך תיאום פגישה", "Width": 100, "CanSort": true },
            { "Name": "new_meetingsummarytelemeetingid", "Desc": "תוצר פגישה", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "new_customer", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    },
    {
        "Name": "new_devrequest_remarks",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='annotation'><attribute name='subject' /><attribute name='notetext' /><attribute name='createdon' /><attribute name='createdby' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='objectid' operator='eq' value='{id}'/><condition attribute='isdocument' operator='eq' value='0'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "subject", "Desc": "נושא", "Width": 145, "CanSort": true },
            { "Name": "notetext", "Desc": "הערות", "Width": 222, "CanSort": true },
            { "Name": "createdby", "Desc": "נוצר ע''י", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [], "IsParentXrm": true
        }
    },
    {
        "Name": "new_devrequest_files",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='annotation'><attribute name='filesize' /><attribute name='filename' /><attribute name='subject' /><attribute name='notetext' /><attribute name='createdon' /><attribute name='createdby' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='objectid' operator='eq' value='{id}'/><condition attribute='isdocument' operator='eq' value='1'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "filename", "Desc": "שם קובץ", "Width": 145, "CanSort": true },
            { "Name": "filesize", "Desc": "גודל", "Width": 145, "CanSort": true },
            { "Name": "notetext", "Desc": "הערות", "Width": 222, "CanSort": true },
            { "Name": "createdby", "Desc": "נוצר ע''י", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_telemeeting_tasks_annotations",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='annotation'><attribute name='filesize' /><attribute name='filename' /><attribute name='subject' /><attribute name='notetext' /><attribute name='createdon' /><attribute name='createdby' /> <order attribute='createdon' descending='false' /><link-entity name='task' from='activityid' to='objectid' alias='tsk'><attribute name='subject' /><link-entity name='new_telemeeting' from='new_telemeetingid' to='regardingobjectid' alias='tele'><filter type='and'><condition attribute='new_telemeetingid' operator='eq' value='{id}'/></filter></link-entity></link-entity> </entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "notetext", "Desc": "הערות", "Width": 350, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 100, "CanSort": true },
            { "Name": "createdby", "Desc": "נוצר ע''י", "Width": 100, "CanSort": true },
            { "Name": "tsk.subject", "Desc": "נושא", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [], "IsParentXrm": true
        }
    },
    {
        "Name": "new_telemeeting_accountproduct",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_accountproduct'><attribute name='new_name' /><attribute name='new_account' /><attribute name='new_prodstatus' /><attribute name='new_inscompprod' /><attribute name='new_customerinvsttype' /><attribute name='new_deposittype' /> <attribute name='new_insurancestart' /><attribute name='new_monthpremium' /><attribute name='new_yearpremium' /><attribute name='createdon' /> <order attribute='createdon' descending='false' /> <filter type='and'> <condition attribute='new_account' operator='eq' value='{new_customer}'/><condition attribute='statecode' operator='eq' value='0'/></filter> </entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "new_name", "Desc": "שם", "Width": 100, "CanSort": true },
            { "Name": "new_account", "Desc": "מבוטח", "Width": 100, "CanSort": true },
            { "Name": "new_prodstatus", "Desc": "סטאטוס מוצר", "Width": 100, "CanSort": true },
            { "Name": "new_inscompprod", "Desc": "מוצר יצרן", "Width": 100, "CanSort": true },
            { "Name": "new_customerinvsttype", "Desc": "מסלול השקעה ללקוח", "Width": 100, "CanSort": true },
            { "Name": "new_insurancestart", "Desc": "תחילת ביטוח", "Width": 100, "CanSort": true },
            { "Name": "new_monthpremium", "Desc": "פרמיה חודשית בספרים", "Width": 100, "CanSort": true },
            { "Name": "new_yearpremium", "Desc": "פרמיה שנתית", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "new_customer", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_telemeeting_accountproduct",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_accountproduct'><attribute name='new_name' /><attribute name='new_account' /><attribute name='new_prodstatus' /><attribute name='new_inscompprod' /><attribute name='new_customerinvsttype' /><attribute name='new_deposittype' /> <attribute name='new_insurancestart' /><attribute name='new_monthpremium' /><attribute name='new_yearpremium' /><attribute name='createdon' /> <order attribute='createdon' descending='false' /> <filter type='and'> <condition attribute='new_account' operator='eq' value='{new_customer}'/><condition attribute='statecode' operator='eq' value='0'/></filter> </entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": false, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "new_name", "Desc": "שם", "Width": 100, "CanSort": true },
            { "Name": "new_account", "Desc": "מבוטח", "Width": 100, "CanSort": true },
            { "Name": "new_prodstatus", "Desc": "סטאטוס מוצר", "Width": 100, "CanSort": true },
            { "Name": "new_inscompprod", "Desc": "מוצר יצרן", "Width": 100, "CanSort": true },
            { "Name": "new_customerinvsttype", "Desc": "מסלול השקעה ללקוח", "Width": 100, "CanSort": true },
            { "Name": "new_insurancestart", "Desc": "תחילת ביטוח", "Width": 100, "CanSort": true },
            { "Name": "new_monthpremium", "Desc": "פרמיה חודשית בספרים", "Width": 100, "CanSort": true },
            { "Name": "new_yearpremium", "Desc": "פרמיה שנתית", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "new_customer", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "new_telemeeting_pw",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_powerattorney'><attribute name='createdon' /><attribute name='new_meetingsummarytelemeetingid' /><attribute name='new_telemeetingid' /><attribute name='new_mislakacodevalid' /><attribute name='new_mislakacode' /><attribute name='new_customer' /><attribute name='statecode' /><attribute name='new_appendixtype' /><attribute name='new_insurancecompany' /><attribute name='new_powerattorneyvalid' /> <attribute name='new_powerattorneysign' />  <attribute name='new_exclusion' /><order attribute='new_appendixtype' descending='false' /><filter type='and'><condition attribute='new_customer' operator='eq' value='{new_customer}'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "new_appendixtype", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "new_name", "Desc": "שם", "Width": 100, "CanSort": true },
            { "Name": "new_account", "Desc": "מבוטח", "Width": 100, "CanSort": true },
            { "Name": "new_prodstatus", "Desc": "סטאטוס מוצר", "Width": 100, "CanSort": true },
            { "Name": "new_inscompprod", "Desc": "מוצר יצרן", "Width": 100, "CanSort": true },
            { "Name": "new_customerinvsttype", "Desc": "מסלול השקעה ללקוח", "Width": 100, "CanSort": true },
            { "Name": "new_insurancestart", "Desc": "תחילת ביטוח", "Width": 100, "CanSort": true },
            { "Name": "new_monthpremium", "Desc": "פרמיה חודשית בספרים", "Width": 100, "CanSort": true },
            { "Name": "new_yearpremium", "Desc": "פרמיה שנתית", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true }

            ],
            "FilterFields": [{ "Name": "new_customer", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    },
    {
        "Name": "incidenthealth_claimhistory",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_claim'><attribute name='new_claimnumbercrm' /><attribute name='new_claimtype' /><attribute name='new_collective' /><attribute name='new_claim_status' /><attribute name='ownerid' /><attribute name='modifiedon' /><attribute name='modifiedby' /><attribute name='createdby' /><attribute name='createdon' /><attribute name='new_description' /><attribute name='new_claimid' /><attribute name='new_transferdate' /><attribute name='new_createdonintty' /><attribute name='new_healthpolicyforcust' /><attribute name='new_operation_date' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='new_account' operator='eq' value='{customerid}'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 4, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "new_claimnumbercrm", "Desc": "מספר תביעה CRM", "Width": 100, "CanSort": true },
            { "Name": "new_claimtype", "Desc": "סוג תביעה", "Width": 100, "CanSort": true },
            { "Name": "new_collective", "Desc": "קולקטיב", "Width": 100, "CanSort": true },
            { "Name": "new_claim_status", "Desc": "סטטוס תביעה", "Width": 100, "CanSort": true },
            { "Name": "ownerid", "Desc": "בעלים", "Width": 100, "CanSort": true },
            { "Name": "new_description", "Desc": "תיאור", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true },
            { "Name": "new_createdonintty", "Desc": "תאריך פתיחת התביעה ב-TTY", "Width": 100, "CanSort": true },
            { "Name": "new_healthpolicyforcust", "Desc": "פוליסת לקוח", "Width": 100, "CanSort": true },
            { "Name": "new_transferdate", "Desc": "תאריך העברה ליצרן", "Width": 100, "CanSort": true },
            { "Name": "modifiedon", "Desc": "השתנה ב:", "Width": 125, "CanSort": true },
            { "Name": "modifiedby", "Desc": "השתנה ע''י:", "Width": 125, "CanSort": true },
            { "Name": "createdby", "Desc": "נוצר ע''י:", "Width": 125, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "customerid", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "incidenthealth_incidenthistory",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='incident'><attribute name='new_incidentnumber' /><attribute name='new_incident_subjectid' /><attribute name='new_subsubject' /><attribute name='ownerid' /><attribute name='createdon' /><attribute name='new_employer' /><attribute name='new_healthpolicyforcust_incidentid' /><attribute name='new_manufactor' /><attribute name='modifiedon' /><attribute name='modifiedby' /><attribute name='createdby' /><attribute name='new_description' /><attribute name='new_healthprogress' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='customerid' operator='eq' value='{customerid}'/><condition attribute='new_formtype' operator='eq' value='3'/><condition attribute='incidentid' operator='ne' value='{id}' uitype='incident'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_incidentnumber", "Desc": "קוד פניה", "Width": 100, "CanSort": true },
            { "Name": "new_incident_subjectid", "Desc": "נושא פניה", "Width": 100, "CanSort": true },
            { "Name": "new_subsubject", "Desc": "תת נושא", "Width": 100, "CanSort": true },
            { "Name": "ownerid", "Desc": "בעלים", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true },
            { "Name": "new_description", "Desc": "תיאור", "Width": 150, "CanSort": true },
            { "Name": "new_employer", "Desc": "מעסיק", "Width": 100, "CanSort": true },
            { "Name": "new_healthpolicyforcust_incidentid", "Desc": "פוליסה", "Width": 100, "CanSort": true },
            { "Name": "new_manufactor", "Desc": "יצרן", "Width": 100, "CanSort": true },
            { "Name": "new_healthprogress", "Desc": "המשך טיפול", "Width": 100, "CanSort": true },
            { "Name": "modifiedon", "Desc": "השתנה ב:", "Width": 125, "CanSort": true },
            { "Name": "modifiedby", "Desc": "השתנה ע''י:", "Width": 125, "CanSort": true },
            { "Name": "createdby", "Desc": "נוצר ע''י:", "Width": 125, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "customerid", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "incidentmashal_incidenthistory",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='incident'><attribute name='new_incident_subjectid' /><attribute name='new_implementation_missionid' /><attribute name='new_accountmngr' /><attribute name='new_manufactor' /><attribute name='new_mslstatuscode' /><attribute name='new_sla_internal' /><attribute name='new_sla_external' /><attribute name='new_sla' /><attribute name='createdon' /> <attribute name='ownerid' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='customerid' operator='eq' value='{customerid}'/><condition attribute='incidentid' operator='ne' value='{id}' uitype='incident'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [

            { "Name": "new_incident_subjectid", "Desc": "נושא פניה", "Width": 100, "CanSort": true },
            { "Name": "new_implementation_missionid", "Desc": "משימה לביצוע", "Width": 150, "CanSort": true },
            { "Name": "new_accountmngr", "Desc": "מנהל תיק", "Width": 100, "CanSort": true },
            { "Name": "new_manufactor", "Desc": "יצרן", "Width": 100, "CanSort": true },
            { "Name": "new_mslstatuscode", "Desc": "סטטוס מ.ש.ל", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true },
            { "Name": "ownerid", "Desc": "בעלים", "Width": 100, "CanSort": true },
            { "Name": "new_sla_internal", "Desc": "SLA פנימי", "Width": 100, "CanSort": true },
            { "Name": "new_sla_external", "Desc": "SLA חיצוני", "Width": 100, "CanSort": true },
            { "Name": "new_sla", "Desc": "SLA כולל", "Width": 100, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "customerid", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "incident_incidenthistory",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='incident'><attribute name='new_incidentnumber' /><attribute name='new_incident_subjectid' /><attribute name='statuscode' /><attribute name='new_financialstatus' /><attribute name='new_manufactor' /><attribute name='createdon' /><attribute name='ownerid' /><attribute name='new_incidentcreatedby' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='customerid' operator='eq' value='{customerid}'/><condition attribute='incidentid' operator='ne' value='{id}' uitype='incident'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_incidentnumber", "Desc": "קוד פניה", "Width": 100, "CanSort": true },
            { "Name": "new_incident_subjectid", "Desc": "נושא פניה", "Width": 100, "CanSort": true },
            { "Name": "statuscode", "Desc": "סטאטוס", "Width": 100, "CanSort": true },
            { "Name": "new_financialstatus", "Desc": "סטאטוס פיננסים", "Width": 100, "CanSort": true },
            { "Name": "new_manufactor", "Desc": "יצרן", "Width": 100, "CanSort": true },
            { "Name": "createdon", "Desc": "נוצר ב:", "Width": 125, "CanSort": true },
            { "Name": "ownerid", "Desc": "בעלים", "Width": 100, "CanSort": true },
            { "Name": "new_incidentcreatedby", "Desc": "שם הפונה", "Width": 125, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "customerid", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
    ,
    {
        "Name": "incidenthealth_ttyhistory",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_operationalsystemshistory'><attribute name='new_operationalsystemshistoryid' /><attribute name='new_writenon' /><attribute name='new_writenby' /><attribute name='new_description' /><order attribute='createdon' descending='false' /><filter type='and'><condition attribute='new_customer' operator='eq' value='{customerid}'/><condition attribute='new_source' operator='eq' value='1'/></filter></entity></fetch>",
            "SettingGrid": { "AggrField": "", "SortName": "createdon", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_writenon", "Desc": "נוצר ב:", "Width": 100, "CanSort": true },
            { "Name": "new_writenby", "Desc": "נרשם ע''י", "Width": 100, "CanSort": true },
            { "Name": "new_description", "Desc": "פרטים", "Width": 150, "CanSort": true }
            ],
            "FilterFields": [{ "Name": "customerid", "TypeField": "lu", "Val": "" }], "IsParentXrm": true
        }
    }
];
