var __config = [
    {
        "Name": "x1",
        "Url": "http://localhost:9894/custompicklist/Grid/SimpleGrid.asmx",
        "Org": "",
        "Detail": { "Method": "MockData",
            "SettingGrid": {
                "SortName": "ListName", "SortOrder": true, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false
            },
            "Schema": [
            { "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true },
            { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false },
            { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}],
            "FilterFields": [], "IsParentXrm": false
        }
    },
    {
        "Name": "cb",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "fakeCall",
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 1, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true },
            { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false },
            { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}],
            "FilterFields": [], "IsParentXrm": false
        }
    },
      {
          "Name": "fet",
          "Url": "",
          "Org": "",
          "Detail": {
              "Method": "<fetch mapping='logical'><entity name='new_gridcrmtest'><attribute name='new_name' /><attribute name='new_pl' /> <attribute name='new_test' /></entity></fetch>",
              "SettingGrid": { "SortName": "new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
              "Schema": [
             { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
             { "Name": "new_pl", "Desc": "קישקוש PL", "Width": 222, "CanSort": false },
             { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
              "FilterFields": [], "IsParentXrm": false
          }
      },
    {
        "Name": "fe",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_gridcrmtest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /></entity></fetch>",
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
             { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
             { "Name": "new_x1", "Desc": "קישקוש", "Width": 222, "CanSort": false },
             { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
            "FilterFields": [], "IsParentXrm": false
        }
    },
    {
        "Name": "fef",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /><order attribute='new_name' descending='false' /><link-entity name='account' from='accountid' to='new_accountid' alias='ac'><attribute name='name' /><link-entity name='new_claim' from='new_account' to='accountid' alias='ca'><attribute name='new_name' /><order attribute='new_name' descending='false' /></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
             { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
             { "Name": "ca.new_name", "Desc": "תביעה", "Width": 222, "CanSort": true },
             { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
            "FilterFields": [], "IsParentXrm": false

        }
    },
    {
        "Name": "fec",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /><order attribute='new_name' descending='false' /><filter type='and'><condition attribute='new_accountid' operator='eq' value='{new_accountid}'/></filter><link-entity name='account' from='accountid' to='new_accountid' alias='ac'><attribute name='name' /><link-entity name='new_claim' from='new_account' to='accountid' alias='ca'><attribute name='new_name' /><order attribute='new_name' descending='false' /></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
            { "Name": "ca.new_name", "Desc": "תביעה", "Width": 222, "CanSort": true },
            { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
            "FilterFields": [{ "Name": "new_accountid", "TypeField": "lu", "Val": ""}], "IsParentXrm": false
        }
    },
    {
        "Name": "fexrm",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /><order attribute='new_name' descending='false' /><filter type='and'><condition attribute='new_accountid' operator='eq' value='{new_accountid}'/></filter><link-entity name='account' from='accountid' to='new_accountid' alias='ac'><attribute name='name' /><link-entity name='new_claim' from='new_account' to='accountid' alias='ca'><attribute name='new_name' /><order attribute='new_name' descending='false' /></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
            { "Name": "ca.new_name", "Desc": "תביעה", "Width": 222, "CanSort": true }, 
            { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
            "FilterFields": [{ "Name": "new_accountid", "TypeField": "lu", "Val": ""}], "IsParentXrm": true
        }
    },
    {
        "Name": "fexrmid",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_guardiantest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /><order attribute='new_name' descending='false' /><filter type='and'><condition attribute='new_guardiantestid' operator='eq' value='{id}'/></filter><link-entity name='account' from='accountid' to='new_accountid' alias='ac'  link-type='outer' ><attribute name='name' /><link-entity name='new_claim' from='new_account' to='accountid' link-type='outer' alias='ca'><attribute name='new_name' /><order attribute='new_name' descending='false' /></link-entity></link-entity></entity></fetch>",
            "SettingGrid": { "SortName": "ca.new_name", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [
            { "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true },
            { "Name": "ca.new_name", "Desc": "תביעה", "Width": 222, "CanSort": true }, 
            { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}],
            "FilterFields": [], "IsParentXrm": true
        }
    }
];
