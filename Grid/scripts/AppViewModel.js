

function AppViewModel(vmData) {
    var self = this;
    self.crmItems = ko.observableArray(vmData.CrmItems);
    self.crmSchema = ko.observableArray(vmData.Schema);
    self.isToggle = ko.observable(vmData.SettingGrid.IsToggle);
    self.sortName = ko.observable(vmData.SettingGrid.SortName);
    self.sortOrder = ko.observable(vmData.SettingGrid.SortOrder);
    self.currentPage = ko.observable(vmData.SettingGrid.CurrentPage);
    self.maxPerPage = ko.observable(vmData.SettingGrid.MaxPerPage);
    self.maxRows = ko.observable(vmData.SettingGrid.MaxRows);
    self.isLoading = ko.observable(true);
    self.noData = ko.observable(false);

    self.startRow = ko.computed(function () {
        return (self.maxPerPage() * self.currentPage()) + 1;
    });
    self.lastRow = ko.computed(function () {
        return (self.startRow() + self.maxPerPage() - 1) > self.maxRows() ? self.maxRows() : (self.startRow() + self.maxPerPage() - 1);
    });
    self.isLastPage = ko.computed(function () {
        return (self.startRow() + self.maxPerPage() - 1) < self.maxRows() ? false : true;
    });

    self.lastRowCss = ko.computed(function () {
        return self.isLastPage() == true ? "ms-crm-ImageStrip-page_L0" : "ms-crm-ImageStrip-page_L1";
    });

    self.firstRowCss = ko.computed(function () {
        return self.startRow() == 1 ? "ms-crm-ImageStrip-page_R0" : "ms-crm-ImageStrip-page_R1";
    });

    self.getLayoutSchema = ko.computed(function () {
       //var c = [{ "Width": 32}];
       var c = [];
       c.push({ "Width": 32 });
        ko.utils.arrayForEach(self.crmSchema(), function (item) {
            c.push({ "Width": item.Width });
        });
        return c;
    });

    self.Refresh = function () {
        self.crmItems([]);
        self.noData(false);
        setTimeout(function () {
            vmData = { schema: [], crmItems: [] };
            var crmItems = [];
            var objItem = { "Id": "2", "subSrc": "gr.htm?id=2", "Fields": [
                                                         { "Key": "ListName", "Val": "xxx" },
                                                         { "Key": "MemberCount", "Val": "22" },
                                                         { "Key": "CampaignName", "Val": "sdsds" }
                                                      ]
            };
            crmItems.push(objItem);

            var objItem = { "Id": "2", "subSrc": "gr.htm?id=2", "Fields": [
                                                         { "Key": "ListName", "Val": "yyy" },
                                                         { "Key": "MemberCount", "Val": "656" },
                                                         { "Key": "CampaignName", "Val": "dfgdfg" }
                                                      ]
            };
            crmItems.push(objItem);
            cleanFrames();
            self.crmItems(crmItems);
            self.noData(crmItems.length == 0);
        }, 4000);
    }
    self.Sort = function (d) {
        self.sortName(d.Name);
        self.sortOrder(!self.sortOrder());
    }

    self.GetValueByField = function (data, field) {
        var finditem = jQuery.grep(data, function (obj) {
            return obj != null && obj.Key === field;
        });
        if (finditem != null && finditem[0] != null) {
            return finditem[0].Val;
        }
        return "";
    }

    self.NextPage = function (d) {
        alert('next');
    }

    self.PrevPage = function (d) {
        alert('prev');
    }
}