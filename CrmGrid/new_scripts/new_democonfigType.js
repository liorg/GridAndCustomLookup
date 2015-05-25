var __config = [
{
    "Name": "x1",
    "Url": "http://localhost:9894/custompicklist/Grid/SimpleGrid.asmx",
    "Org": "",
    "Detail": { "Method": "MockData", "MethodCount": "",
        "SettingGrid": { "SortName": "ListName", "SortOrder": true, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
        "Schema": [{ "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true }, { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false },
    { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}], "FilterFields": []
    }
},
    {
        "Name": "cb",
        "Url": "",
        "Org": "",
        "Detail": {
            "Method": "fakeCall", "MethodCount": "",
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 1, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [{ "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true }, { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false }, { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}], "FilterFields": []

        }
    },
    {
        "Name": "fe",
        "Url": "crm11mantad",
        "Org": "MANTA",
        "Detail": {
            "Method": "<fetch mapping='logical' count='10'><entity name='account'><attribute name='new_lastname' /><attribute name='new_firstname' /></entity></fetch>"
            , "MethodCount": "",
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [{ "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true }, { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false }, { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}], "FilterFields": []

        }
    }
     ]; 
     