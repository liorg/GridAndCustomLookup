ko.bindingHandlers.singleClick = {
    init: function (element, valueAccessor) {
        var handler = valueAccessor(),
            delay = 200,
            clickTimeout = false;

        $(element).click(function () {
            if (clickTimeout !== false) {
                clearTimeout(clickTimeout);
                clickTimeout = false;
            } else {
                clickTimeout = setTimeout(function () {
                    clickTimeout = false;
                    handler();
                }, delay);
            }
        });
    }
};
var noData = "!!!!אין נתונים";
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
    self.message = ko.observable(noData);
    self.typeData = ko.observable(vmData.SettingGrid.TypeData); /* 1=Ajax,2=Callback,3=FetchXml */
    self.startRow = ko.computed(function () {
        return (self.maxPerPage() * (self.currentPage() - 1)) + 1;
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
        var c = [];
        c.push({ "Width": 32 });
        ko.utils.arrayForEach(self.crmSchema(), function (item) {
            c.push({ "Width": item.Width });
        });
        return c;
    });
    self.GetGridSetting = function () {
        var gridSetting = {
            SortName: self.sortName(),
            SortOrder: self.sortOrder(),
            CurrentPage: self.currentPage(),
            MaxPerPage: self.maxPerPage(),
            MaxRows: self.maxRows(),
            IsToggle: self.isToggle()
        };
        return gridSetting;
    }

    self.Refresh = function () {
        self.crmItems([]);
        self.noData(false);
        var callData;
        callData = new dataSender(id, config);
        callData.Send(self.GetGridSetting(),
         function (d) {
             cleanFrames();
             self.isLoading(false);
             if (d.IsError) {
                 self.noData(true);
                 self.message(d.ErrDesc);
             }
             self.crmItems(d.CrmGrid.CrmGridItems);
             self.noData(d.CrmGrid.CrmGridItems.length == 0);

         }, function (e) {
             cleanFrames();
             self.isLoading(false);
             self.noData(true);
             self.message("אירעה שגיאה נא פנה למנהל מערכת");
         });
    }

    self.Sort = function (d) {
        if (!d.CanSort)
            return;
        self.sortName(d.Name);
        self.sortOrder(!self.sortOrder());
        self.Refresh();
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
        var cp = self.currentPage();
        self.currentPage(cp + 1);
        self.Refresh();
    }

    self.PrevPage = function (d) {
        var cp = self.currentPage();
        self.currentPage(cp - 1);
        self.Refresh();
    }

    this.clicked = function () {
        //  alert(333);
    };

    this.double = function (d) {
        if (d.openwin != '')
            window.open(d.openwin, "_blank", "width:900px,height:200px");
    };
}