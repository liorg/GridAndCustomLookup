function firstLoad() {
    alert(1);
    var vmData;
    vmData = { Schema: [], CrmItems: [] }
    var crmItems = [];
    var objItem = { "Id": "2", "subSrc": "gr.htm?id=2", "openwin": "http://www.ynet.co.il",
        "Fields": [
                                                         { "Key": "ListName", "Val": "liior" },
                                                         { "Key": "MemberCount", "Val": "3" },
                                                         { "Key": "CampaignName", "Val": "ddddd" }
                                                      ]
    };
    crmItems.push(objItem);

    var objItem = { "Id": "2", "subSrc": "gr.htm?id=2", "openwin": "http://www.google.com",
        "Fields": [
                                                         { "Key": "ListName", "Val": "bbbb" },
                                                         { "Key": "MemberCount", "Val": "666" },
                                                         { "Key": "CampaignName", "Val": "xxxx" }
                                                      ]
    };
    crmItems.push(objItem);

    vm.crmItems(crmItems);
    vm.sortName("MemberCount");
    vm.sortOrder(true);
    vm.currentPage(2);
    vm.maxRows(444);

    vm.isLoading(false);
    vm.noData(false);
}