var __config = [
{
    "Name": "x1",
    "Url": "http://localhost:9894/custompicklist/Grid/SimpleGrid.asmx",
    "Org": "",
    "Detail": { "Method": "MockData", 
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
            "Method": "fakeCall", 
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 1, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [{ "Name": "ListName", "Desc": "שם פרטי", "Width": 145, "CanSort": true }, { "Name": "MemberCount", "Desc": "שם משפחה", "Width": 222, "CanSort": false }, { "Name": "CampaignName", "Desc": "dd f", "Width": 100, "CanSort": true}], "FilterFields": []

        }
    },
    {
        "Name": "fe",
        "Url": "http://crm11mantad/MANTA",
        "Org": "",
        "Detail": {
            "Method": "<fetch mapping='logical'><entity name='new_gridcrmtest'><attribute name='new_name' /><attribute name='new_x1' /> <attribute name='new_test' /></entity></fetch>",
            "SettingGrid": { "SortName": "ListName", "SortOrder": true, "TypeData": 2, "CurrentPage": 1, "MaxPerPage": 50, "MaxRows": 0, "IsToggle": false },
            "Schema": [{ "Name": "new_name", "Desc": "שם ", "Width": 145, "CanSort": true }, { "Name": "new_x1", "Desc": "קישקוש", "Width": 222, "CanSort": false }, { "Name": "new_test", "Desc": "בדיקה", "Width": 100, "CanSort": true}], "FilterFields": []
        }
    }
     ]; 
     