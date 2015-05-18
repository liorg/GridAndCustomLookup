Type.registerNamespace("Mscrm");
Mscrm.RequirementLevel = function () { };
Mscrm.RequirementLevel.prototype = {
    clientOnly: 0,
    serverOnly: 1,
    both: 2
};
Mscrm.RequirementLevel.registerEnum("Mscrm.RequirementLevel", false);
Mscrm.GridContextualAction = function () { };
Mscrm.GridContextualAction.prototype = {
    addRecord: 0,
    deleteRecord: 1
};
Mscrm.GridContextualAction.registerEnum("Mscrm.GridContextualAction", false);
Mscrm.IFilterSet = function () { };
Mscrm.IFilterSet.registerInterface("Mscrm.IFilterSet");
Mscrm.BeforeFormLoadEventArgs = function (objectTypeCode, objectId, objectRow) {
    Mscrm.BeforeFormLoadEventArgs.initializeBase(this);
    this.objectTypeCode = objectTypeCode;
    this.objectID = objectId;
    this.objectRow = objectRow
};
Mscrm.BeforeFormLoadEventArgs.prototype = {
    objectTypeCode: 0,
    objectID: null,
    objectRow: null,
    breakEvent: false
};
Mscrm.AppGridDefaultDataControl = function (element) {
    this.$$d_contextMenuItemClickHandler = Function.createDelegate(this, this.contextMenuItemClickHandler);
    this.$$d_$2I_3 = Function.createDelegate(this, this.$2I_3);
    this.$$d_$2J_3 = Function.createDelegate(this, this.$2J_3);
    this.$$d_$57_3 = Function.createDelegate(this, this.$57_3);
    this.$$d_$34_3 = Function.createDelegate(this, this.$34_3);
    this.$$d_$4I_3 = Function.createDelegate(this, this.$4I_3);
    this.$$d_handleContextMenu = Function.createDelegate(this, this.handleContextMenu);
    this.$A_3 = -1;
    this.$3_3 = [];
    this.$11_3 = [];
    this.$d_3 = -1;
    Mscrm.AppGridDefaultDataControl.initializeBase(this, [element]);
    this.$1q_3 = element;
    if (window.LOCID_UI_DIR === "RTL") {
        this.$26_3 = 39;
        this.$27_3 = 37
    } else {
        this.$26_3 = 37;
        this.$27_3 = 39
    }
};
Mscrm.AppGridDefaultDataControl.$3l = function ($p0) {
    return !(Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-DataCell") || Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-NonDataCell") || Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-DataCell-Lite")) && !(Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-SelectedRow") || Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-SelectedRow-Lite")) && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-HoveredRow") && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-SelectedMultilineRow") && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-List-HoveredMultilineRow")
};
Mscrm.AppGridDefaultDataControl.$R = function ($p0) {
    var $v_0 = $p0.getAttribute("selected");
    if (IsNull($v_0)) return false;
    return $v_0.toUpperCase() === "TRUE"
};
Mscrm.AppGridDefaultDataControl.$3F = function ($p0) {
    var $v_0 = $p0.getAttribute("expanded");
    if (IsNull($v_0)) return false;
    return $v_0.toUpperCase() === "TRUE"
};
Mscrm.AppGridDefaultDataControl.prototype = {
    add_onSelectionChange: function (value) {
        this.get_events().addHandler("OnSelectionChange", value)
    },
    remove_onSelectionChange: function (value) {
        this.get_events().removeHandler("OnSelectionChange", value)
    },
    add_onBeforeFormLoad: function (value) {
        this.get_events().addHandler("OnBeforeFormLoad", value)
    },
    remove_onBeforeFormLoad: function (value) {
        this.get_events().removeHandler("OnBeforeFormLoad", value)
    },
    $2Z_3: false,
    $P_3: 0,
    $22_3: 0,
    $L_3: null,
    $b_3: null,
    $1N_3: null,
    $2Y_3: 0,
    $1R_3: null,
    $c_3: null,
    $2a_3: 21,
    $1q_3: null,
    $r_3: null,
    $2L_3: 0,
    $26_3: 0,
    $27_3: 0,
    dispose: function () {
        this.$2Q_3(this.get_element(), false);
        var $v_0 = $get(this.$2f_3 + "_divDataArea");
        !IsNull($v_0) && $removeHandler($v_0, "contextmenu", this.$$d_handleContextMenu);
        $removeHandler(this.get_element(), "keyup", this.$$d_$4I_3);
        $removeHandler(this.get_element(), "keydown", this.$$d_$34_3);
        $removeHandler(this.get_element(), "mouseover", this.$$d_$57_3);
        $removeHandler(this.get_element(), "dblclick", this.$$d_$2J_3);
        $removeHandler(this.get_element(), "click", this.$$d_$2I_3);
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $1v_3: null,
    $2f_3: null,
    get_parentGridControl: function () {
        return this.$1v_3
    },
    set_parentGridControl: function (value) {
        this.$1v_3 = value;
        this.$2f_3 = this.$1v_3.get_element().id;
        if (!IsNull(value)) {
            if (IsNull(value.$0_3)) value.$0_3 = this;
            this.$2Q_3(this.get_element(), true)
        }
        return value
    },
    printRow: function (row) {
        if (!IsNull(row)) {
            var $v_0 = Mscrm.CrmUri.create("/_forms/print/print.aspx");
            $v_0.get_query()["objectType"] = this.get_element().getAttribute("oname");
            $v_0.get_query()["id"] = row.getAttribute("oid");
            $v_0.get_query()["subType"] = row.getAttribute("otype");
            openStdWinWithFeatures($v_0, "print" + buildWinName(row.getAttribute("oid")), "", false)
        }
    },
    previewRow: function (row) {
        if (IsNull(row) || IsNull(row.getAttribute("otype")) || IsNull(row.getAttribute("oid"))) return;
        parseInt(row.getAttribute("otype")) === 9100 && this.$3v_3(row)
    },
    openInNewWindow: function (row) {
        if (Mscrm.NavigationMode.DefaultNavigationMode !== Mscrm.NavigationMode.NavigationModeInline) return;
        if (IsNull(this.get_parentGridControl()) || IsNull(Mscrm.PageManager) || IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage()) return;
        if (!Mscrm.PageManager.isFlatObject(parseInt(this.get_element().getAttribute("oname")))) {
            this.$18_3(this.$s_3(row));
            return
        }
        var $v_0 = {};
        $v_0["etc"] = this.get_element().getAttribute("oname");
        $v_0["id"] = this.$s_3(row).getAttribute("oid");
        $v_0["pagetype"] = "entityrecord";
        $v_0["newWindow"] = true;
        $v_0["queryString"] = getParentEntityIdParams();
        this.get_parentGridControl().raiseEvent(Mscrm.ScriptEvents.NavigateRequest, $v_0)
    },
    openSelectedRecord: function (parameters) {
        if (!IsNull(this.get_selectedRecords()) && this.get_selectedRecords().length === 1) this.$18_3(this.$s_3(this.get_selectedRecords()[0][3]), parameters);
        else if (!IsNull(this.get_selectedRecords()) && this.get_selectedRecords().length > 1) throw Error.create("More than a single record selected.")
    },
    openGridInNewWindow: function () {
        if (Mscrm.NavigationMode.DefaultNavigationMode !== Mscrm.NavigationMode.NavigationModeInline) return;
        if (IsNull(this.get_parentGridControl()) || IsNull(Mscrm.PageManager) || IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage()) return;
        var $v_0 = {};
        $v_0["etc"] = this.get_element().getAttribute("oname");
        $v_0["viewid"] = this.get_parentGridControl().GetParameter("viewid");
        $v_0["pagetype"] = "entitylist";
        $v_0["newWindow"] = true;
        this.get_parentGridControl().raiseEvent(Mscrm.ScriptEvents.NavigateRequest, $v_0)
    },
    SelectRecords: function (start, stop, unselect) {
        if (IsNull(start)) start = 0;
        if (IsNull(stop)) stop = this.get_dataTableBody().rows.length - 1;
        if (!IsNull(unselect) && unselect && stop !== this.get_dataTableBody().rows.length - 1) for (var $v_0 = this.$3_3.length, $v_1 = 0; $v_1 < $v_0; $v_1++) {
            var $v_2 = this.$3_3[$v_1];
            if (!IsNull($v_2) && ($v_2.sectionRowIndex < start || $v_2.sectionRowIndex > stop)) {
                this.$19_3($v_2, false, false);
                Array.removeAt(this.$3_3, $v_1);
                $v_1--;
                $v_0--
            }
        }
        for (; start < stop + 1; start++) {
            this.$1V_3(this.get_dataTableBody().rows[start]);
            var $v_3 = this.$1e_3(this.get_dataTableBody().rows[start], false);
            if (!$v_3) break
        }
        this.$A_3 = stop;
        this.$h_3()
    },
    UnselectRecords: function (skip) {
        var $v_0 = this.$3_3[this.$3_3.length - 1];
        Array.removeAt(this.$3_3, this.$3_3.length - 1);
        while (!IsNull($v_0)) {
            this.$1V_3($v_0);
            this.$19_3($v_0, false, false);
            $v_0 = this.$3_3[this.$3_3.length - 1];
            Array.removeAt(this.$3_3, this.$3_3.length - 1)
        } !IsNull(skip) && this.$1e_3(skip, false);
        this.$h_3()
    },
    resizeColumn: function (columnName, width) {
        var $v_0 = this.FindColumnIndex(columnName);
        if ($v_0 > -1) this.get_element().getElementsByTagName("COL")[$v_0].style.width = (width + 3).toString() + "px"
    },
    autoResizeColumn: function (columnName) {
        var $v_0 = this.get_dataTableBody().rows,
            $v_1 = $v_0.length,
            $v_2 = this.FindColumnIndex(columnName),
            $v_3 = 0;
        if ($v_2 < 0) return -1;
        if (XUI.Html.DomUtils.GetFirstChild($v_0[0]).className !== "ms-crm-List-MessageText") for (var $v_4 = 0; $v_4 < $v_1; $v_4++) {
            var $v_5 = XUI.Html.DomUtils.GetFirstChild($v_0[$v_4].cells[$v_2]),
                $v_6 = $v_5.innerHTML;
            $v_5.innerHTML = "<span>" + $v_6 + "</span>";
            var $v_7 = XUI.Html.DomUtils.GetFirstChild($v_5);
            if ($v_7.offsetWidth > $v_3) $v_3 = $v_7.offsetWidth;
            $v_5.innerHTML = $v_6
        }
        return $v_3 + 10
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        $addHandler(this.get_element(), "keyup", this.$$d_$4I_3);
        $addHandler(this.get_element(), "keydown", this.$$d_$34_3);
        $addHandler(this.get_element(), "mouseover", this.$$d_$57_3);
        $addHandler(this.get_element(), "dblclick", this.$$d_$2J_3);
        $addHandler(this.get_element(), "click", this.$$d_$2I_3);
        this.$2L_3 = window.LOCID_GRID_SELECT_ALL_KEY.charCodeAt(0);
        this.$h_3();
        this.$3m_3()
    },
    $3m_3: function () {
        if (!IsNull(this.get_parentGridControl())) {
            var $v_0 = $get(this.get_parentGridControl().get_id() + "_divDataArea");
            $addHandler($v_0, "contextmenu", this.$$d_handleContextMenu);
            var $v_1 = this.get_numberOfRecords();
            if ($v_1 > 0) if (this.$3R_3()) {
                this.SelectRecords(0, 0, false);
                this.$A_3 = 0
            }
        }
    },
    $2Q_3: function ($p0, $p1) {
        if (this.$2Z_3 === $p1) if ($p1) this.$2Q_3($p0, !$p1);
        else return;
        else this.$2Z_3 = $p1;
        var $v_0 = this.get_parentGridControl().get_id(),
            $v_1 = {};
        $v_1["CrmGrid"] = this.get_parentGridControl().get_id();
        for (var $v_2 = $p0.getElementsByTagName("col"), $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_4 = $v_2[$v_3].getAttribute("name");
            if (!IsNull($v_4)) {
                var $v_5 = $v_0 + "_resize_" + $v_4;
                if ($p1) {
                    var $v_6 = $get($v_5);
                    !IsNull($v_6) && IsNull($find($v_5)) && Mscrm.CrmUIComponent.crmCreate(Mscrm.ColumnResizeControl, $v_1, null, null, $v_6)
                } else {
                    var $v_7 = $find($v_5);
                    if (!IsNull($v_7)) {
                        Sys.Application.removeComponent($v_7);
                        $v_7.dispose()
                    }
                }
            }
        }
    },
    $3R_3: function () {
        var $v_0 = false,
            $v_1 = this.get_parentGridControl().GetParameter("EnableFirstRecordSelection");
        if (!IsNull($v_1)) {
            $v_0 = Mscrm.Utilities.parseBoolean($v_1);
            if ($v_0 && this.get_parentGridControl().GetParameter("GridType") === "SubGrid" && !this.get_parentGridControl().$y_3) $v_0 = false
        }
        return $v_0
    },
    $2x_3: function ($p0) {
        for (var $v_0 = [], $v_1 = this.get_dataTableBody().rows.length, $v_2 = 0, $v_3 = 0; $v_3 < $v_1; $v_3++) {
            var $v_4 = this.get_dataTableBody().rows[$v_3];
            if (!IsNull($v_4.getAttribute("oid")) && (!$p0 || Mscrm.AppGridDefaultDataControl.$R($v_4))) {
                $v_0[$v_2] = [];
                $v_0[$v_2][0] = $v_4.getAttribute("oid");
                $v_0[$v_2][3] = $v_4;
                if (!IsNull($v_4.getAttribute("otype"))) {
                    $v_0[$v_2][1] = $v_4.getAttribute("otype");
                    $v_0[$v_2][3].setAttribute("otype", $v_4.getAttribute("otype"))
                } else {
                    $v_0[$v_2][1] = this.get_element().getAttribute("oname");
                    $v_0[$v_2][3].setAttribute("otype", this.get_element().getAttribute("oname"))
                }
                $v_0[$v_2][2] = $v_3;
                $v_2++
            }
        }
        return $v_0
    },
    get_selectedRecords: function () {
        return this.$2x_3(true)
    },
    get_allRecords: function () {
        return this.$2x_3(false)
    },
    get_contextMenuRow: function () {
        return this.$L_3
    },
    get_moreRecords: function () {
        return this.get_element().getAttribute("morerecords") === "1"
    },
    get_totalRecordCount: function () {
        var $v_0 = this.get_element().getAttribute("totalrecordcount");
        if (!IsNull($v_0)) return parseInt($v_0, 10);
        return -1
    },
    get_allRecordsCounted: function () {
        return this.get_element().getAttribute("allrecordscounted") !== "0"
    },
    get_dataTableBody: function () {
        var $v_0 = this.get_element().getElementsByTagName("tbody");
        if (!IsNull($v_0) && $v_0.length > 0) return $v_0[0];
        return this.get_element()
    },
    $h_3: function () {
        this.fireControlEvent("OnSelectionChange", Sys.EventArgs.Empty)
    },
    get_numberOfRecords: function () {
        var $v_0 = this.get_element().getAttribute("numRecords");
        if (!IsNull($v_0)) {
            this.$P_3 = parseInt($v_0);
            return this.$P_3
        }
        if (!this.$P_3) {
            for (var $v_1 = 0, $v_2 = this.$1q_3.rows.length, $v_3 = 0; $v_3 < $v_2; $v_3++) {
                var $v_4 = this.$1q_3.rows[$v_3].getAttribute("oid");
                if (!IsNull($v_4)) $v_1++
            }
            this.$P_3 = $v_1
        }
        return this.$P_3
    },
    get_defaultRowHeight: function () {
        return this.$2a_3
    },
    FindColumnIndex: function (columnName) {
        var $v_0 = 0,
            $v_1 = -1,
            $v_2 = this.get_element().getElementsByTagName("COL"),
            $v_3 = $v_2.length;
        while ($v_0 < $v_3) {
            var $v_4 = $v_2[$v_0];
            if (!IsNull($v_4.getAttribute("name")) && $v_4.getAttribute("name") === columnName) {
                $v_1 = $v_0;
                break
            }
            $v_0++
        }
        return $v_1
    },
    get_primaryFieldName: function () {
        return this.get_element().getAttribute("primaryfieldname")
    },
    get_primaryFieldLabel: function () {
        var $v_0 = XUI.Xml.LoadXml(this.get_parentGridControl().get_layoutXml()),
            $v_1 = XUI.Xml.SelectSingleNode($v_0, "columns/column[@fieldname='" + this.get_primaryFieldName() + "']", null);
        return XUI.Xml.GetText($v_1.attributes.getNamedItem("label"))
    },
    sendShortcut: function (throughEmail, objectTypeCode) {
        Mscrm.Utilities.sendSelectedRecordsUrl(throughEmail, this.$4y_3(this.get_parentGridControl().$0_3.get_selectedRecords()), objectTypeCode, false)
    },
    $4y_3: function ($p0) {
        for (var $v_0 = [], $v_1 = 0; $v_1 < $p0.length; ++$v_1) {
            var $v_2 = new Mscrm.RecentlyViewedItem;
            $v_2.Id = $p0[$v_1][0];
            $v_2.TypeCode = $p0[$v_1][1];
            $v_0[$v_1] = $v_2
        }
        return $v_0
    },
    get_primaryFieldColumnIndex: function () {
        if (!IsNull(this.get_element().getAttribute("primaryfieldname"))) {
            var $v_2 = this.FindColumnIndex(this.get_element().getAttribute("primaryfieldname"));
            if ($v_2 !== -1) return $v_2
        }
        for (var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.get_element()).children, $v_1 = $v_0.length, $v_3 = 0; $v_3 < $v_1; $v_3++) if (!IsNull($v_0[$v_3].getAttribute("name"))) return $v_3;
        return -1
    },
    $57_3: function ($p0) {
        var $v_0 = $p0.target;
        if (!IsNull($v_0) && !$v_0.title.length && $v_0.innerHTML.length > 0 && ($v_0.tagName.toUpperCase() === "NOBR" || this.get_parentGridControl() && this.get_parentGridControl().isLiteSubGrid() && $v_0.className === "ms-crm-data-format-string")) $v_0.title = XUI.Html.GetText($v_0)
    },
    $s_3: function ($p0) {
        while (!IsNull($p0) && ($p0.tagName.toUpperCase() !== "TR" || IsNull($p0.getAttribute("oid")))) {
            $p0 = $p0.parentNode;
            if (IsNull($p0.tagName)) return null
        }
        return $p0
    },
    $2J_3: function ($p0) {
        this.$r_3 = this.$1Y_3($p0, false);
        if (!IsNull(this.$r_3)) if (($p0.ctrlKey || $p0.target.tagName.toUpperCase() === "INPUT" && $p0.target.getAttribute("type") === "checkbox") && Mscrm.AppGridDefaultDataControl.$R(this.$r_3)) this.$19_3(this.$r_3, true, true);
        else this.$1b_3(this.$r_3, $p0.target, Mscrm.Utilities.getDomEventKeyCode($p0), $p0.shiftKey, $p0.ctrlKey);
        var $v_0 = this.get_selectedRecords();
        if (!$v_0.length) return;
        var $v_1 = $v_0[0],
            $v_2 = $v_1[3];
        this.$18_3($v_2)
    },
    $4P_3: function ($p0) {
        var $v_0 = true;
        if (!this.get_parentGridControl()) return $v_0;
        if (!isNullOrEmptyString(this.get_parentGridControl().GetParameter("disablePrimaryFieldClick"))) if (Mscrm.Utilities.parseBoolean(this.get_parentGridControl().GetParameter("disablePrimaryFieldClick"))) {
            $v_0 = false;
            return $v_0
        }
        var $v_1 = this.get_parentGridControl().GetProperty("dataProvider");
        if (!IsNull($v_1) && $v_1 === "Microsoft.Crm.Application.Controls.LookupGridDataProvider") this.$2J_3($p0);
        else {
            var $v_2 = this.$1Y_3($p0, false);
            !IsNull($v_2) && this.$18_3($v_2)
        }
        return $v_0
    },
    $18_3: function ($p0, $p1) {
        if (!this.get_parentGridControl() || this.get_parentGridControl().GetParameter("disableDblClick") === "1" || !this.$P_3) return;
        window.clearTimeout(this.$2Y_3);
        this.$2Y_3 = 0;
        $p0 = this.$s_3($p0);
        if (IsNull($p0)) return;
        var $v_0 = parseInt(this.get_element().getAttribute("oname"));
        if (!IsNull($p0.getAttribute("otype"))) $v_0 = parseInt($p0.getAttribute("otype"));
        if (this.$4w_3($p0, $v_0, $p0.getAttribute("oid"))) return;
        var $v_1 = null;
        if (!isNullOrEmptyString($p1)) $v_1 = $p1;
        else $v_1 = getParentEntityIdParams();
        if (!IsNull(this.get_parentGridControl()) && !IsNull(Mscrm.PageManager) && !IsNull(Mscrm.PageManager.get_instance()) && Mscrm.PageManager.isFlatUIPage() && Mscrm.PageManager.isFlatObject(parseInt(this.get_element().getAttribute("oname"), 10))) {
            var $v_2 = {};
            $v_2[Mscrm.RecordSetNavigation.PrimaryFieldName] = this.get_primaryFieldName();
            $v_2[Mscrm.RecordSetNavigation.PrimaryFieldColumnIndex] = this.get_primaryFieldColumnIndex();
            $v_2[Mscrm.RecordSetNavigation.PageNumber] = this.get_parentGridControl().get_pageNumber();
            var $v_3 = String.format(Mscrm.RecordSetNavigation.GridXmlMask, this.get_parentGridControl().get_pageNumber());
            $v_2[$v_3] = this.get_parentGridControl().get_gridXml();
            $v_2[Mscrm.RecordSetNavigation.LayoutXml] = this.get_parentGridControl().get_layoutXml();
            $v_2[Mscrm.RecordSetNavigation.RecordPosition] = this.$3x_3(this.get_allRecords(), $p0.getAttribute("oid"));
            var $v_4 = this.get_parentGridControl().GetParameter("viewTitle");
            if (IsNull($v_4) || !$v_4.length) $v_4 = window.LOCID_GRID_NO_VIEW_NAME;
            var $v_5 = false,
                $v_6 = this.get_parentGridControl().get_id(),
                $v_7 = $find($v_6 + "_SavedNewQuerySelector");
            if (!IsNull($v_7) && $v_7.showNewVSControl && !$v_7.showOriginalSelectBox && $v_7.selectedViewName === window.LOCID_SEARCH_RESULTS) $v_5 = true;
            var $v_8 = this.get_element().ownerDocument.getElementById($v_6 + "_SavedQuerySelector");
            if (!$v_5 && !IsNull($v_8) && !IsNull($v_8.SelectedOption) && !IsNull($v_8.SelectedOption.Search) && $v_8.SelectedOption.Search) $v_5 = true;
            if ($v_5) {
                $v_4 = window.LOCID_SEARCH_RESULTS;
                var $v_F = this.get_element().ownerDocument.getElementById($v_6 + "_findCriteria").value;
                if (!IsNull($v_F)) $v_4 = String.format(window.LOCID_WINDOW_TITLE_FORMAT, $v_4, $v_F)
            }
            $v_2[Mscrm.RecordSetNavigation.ViewName] = $v_4;
            var $v_9 = String.format(Mscrm.RecordSetNavigation.MoreRecordsMask, this.get_parentGridControl().get_pageNumber());
            $v_2[$v_9] = this.get_moreRecords();
            var $v_A = this.get_parentGridControl().get_layoutXml().indexOf('fieldname="' + this.get_primaryFieldName() + '"') >= 0,
                $v_B = [];
            if ($v_A) {
                $v_B[0] = this.get_primaryFieldName();
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldName] = this.get_primaryFieldName();
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldLabel] = this.get_primaryFieldLabel();
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldColumnIndex] = this.get_primaryFieldColumnIndex()
            } else {
                var $v_G = XUI.Xml.LoadXml(this.get_parentGridControl().get_layoutXml()),
                    $v_H = XUI.Xml.SelectSingleNode($v_G, "columns/column", null);
                $v_B[0] = XUI.Xml.GetText($v_H.attributes.getNamedItem("fieldname"));
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldName] = XUI.Xml.GetText($v_H.attributes.getNamedItem("fieldname"));
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldLabel] = XUI.Xml.GetText($v_H.attributes.getNamedItem("label"));
                $v_2[Mscrm.RecordSetNavigation.DisplayFieldColumnIndex] = 2
            }
            var $v_C = String.format(Mscrm.RecordSetNavigation.RecordsMask, this.get_parentGridControl().get_pageNumber());
            $v_2[$v_C] = Sys.Serialization.JavaScriptSerializer.serialize(Mscrm.Grid.getGridRecords(this.get_element(), $v_B, this.get_parentGridControl().get_layoutXml()));
            var $v_D = {};
            $v_D["data"] = $v_2;
            if (Mscrm.NavigationMode.DefaultNavigationMode === Mscrm.NavigationMode.NavigationModeNewWindow) {
                $v_D["cacheScope"] = Mscrm.CacheScope.ChildOnly;
                $v_D["purgeDataOnCacheSync"] = true
            }
            var $v_E = this.get_parentGridControl().raiseEvent(Mscrm.ScriptEvents.InsertCacheData, $v_D);
            if (!IsNull($v_E) && $v_E.length > 0) {
                $v_1 = IsNull($v_1) || !$v_1.length ? "?" : $v_1 + "&";
                $v_1 += "rskey=" + CrmEncodeDecode.CrmUrlEncode($v_E[0]);
                $v_1 += "&_gridType=" + CrmEncodeDecode.CrmUrlEncode(this.get_element().getAttribute("oname"))
            }
        }
        openObj($v_0, $p0.getAttribute("oid"), $v_1)
    },
    $3x_3: function ($p0, $p1) {
        if (IsNull($p0)) return -1;
        var $v_0 = 0,
            $v_1 = $p0.length;
        while ($v_0 < $v_1) {
            if ($p0[$v_0][0] === $p1) return $v_0;
            $v_0++
        }
        return -1
    },
    $4w_3: function ($p0, $p1, $p2) {
        var $v_0 = new Mscrm.BeforeFormLoadEventArgs($p1, $p2, $p0);
        this.fireControlEvent("OnBeforeFormLoad", $v_0);
        return $v_0.breakEvent
    },
    $1Y_3: function ($p0, $p1) {
        if (!this.$P_3) {
            this.$50_3($p0);
            return null
        }
        var $v_0 = $p0.target,
            $v_1 = $v_0.tagName.toUpperCase();
        if ($v_1 === "TBODY") return null;
        if ($v_1 === "IMG") {
            $v_0 = $v_0.parentNode;
            $v_1 = $v_0.tagName.toUpperCase();
            if ($v_1 !== "SPAN" && $v_1 !== "NOBR") return $v_0.parentNode
        }
        if ($v_0.tagName.toUpperCase() === "SPAN") $v_0 = $v_0.parentNode;
        if ($v_0.tagName.toUpperCase() === "LI") $v_0 = $v_0.parentNode;
        if ($v_0.tagName.toUpperCase() === "A") {
            if ($p1) return $v_0;
            $v_0 = $v_0.parentNode
        }
        if ($v_0.tagName.toUpperCase() === "NOBR") $v_0 = $v_0.parentNode;
        if ($v_0.tagName.toUpperCase() === "INPUT" && $v_0.getAttribute("type") === "checkbox") $v_0 = $v_0.parentNode;
        if ($v_0.tagName.toUpperCase() === "DIV") $v_0 = $v_0.parentNode;
        if ($v_0.tagName.toUpperCase() === "TD") {
            if (Mscrm.AppGridDefaultDataControl.$3l($v_0)) return null;
            $v_0 = $v_0.parentNode
        }
        if ($v_0.tagName.toUpperCase() === "TR") return $v_0;
        return null
    },
    $50_3: function ($p0) {
        if (!IsNull(this.get_parentGridControl()) && this.get_parentGridControl().GetParameter("LoadOnDemand") === "1" && !IsNull($p0) && $p0.target.getAttribute("id") === "LoadOnDemandMessage") {
            this.get_parentGridControl().SetParameter("LoadOnDemand", "0");
            this.get_parentGridControl().SetParameter("LoadOnDemand_GridEmptyMessage", "");
            this.get_parentGridControl().Refresh()
        }
    },
    $2I_3: function ($p0, $p1) {
        this.get_parentGridControl().doNotFocusGridQuickFindOnLoad = true;
        var $v_0, $v_1;
        if (IsNull($p1)) {
            $v_0 = $p0.target;
            $v_1 = this.$1Y_3($p0, true)
        } else {
            $v_0 = $p1;
            $v_1 = $p1
        }
        if (!IsNull($v_1) && !isNullOrEmptyString($v_1.className) && $v_1.className === "ms-crm-List-DeleteContainer-Div") $v_1 = $v_1.parentNode.parentNode;
        var $v_2 = false;
        if ($v_1) $v_2 = Mscrm.AppGridDefaultDataControl.$R($v_1);
        if ($v_0.tagName.toUpperCase() === "IMG") if (($v_0.src.indexOf("grid") > 0 || $v_0.className.indexOf("ms-crm-ImageStrip-r") > 0) && !$p0.ctrlKey) {
            $v_1 = $v_0.parentNode.parentNode;
            !$v_2 && this.$1b_3($v_1, $v_0, Mscrm.Utilities.getDomEventKeyCode($p0), $p0.shiftKey, $p0.ctrlKey);
            this.previewRow($v_1);
            return
        }
        if (!IsNull($v_1)) {
            var $v_3 = true;
            if ($v_1.tagName.toUpperCase() === "A") {
                if ($v_1.id.indexOf("primaryField") !== -1) $v_3 = this.$4P_3($p0);
                if (!$v_3) {
                    $v_1 = $v_1.parentNode.parentNode.parentNode;
                    $v_2 = Mscrm.AppGridDefaultDataControl.$R($v_1)
                } else return
            }
            var $v_4 = $v_0.tagName.toUpperCase() === "INPUT" && $v_0.getAttribute("type") === "checkbox",
                $v_5 = $p0.ctrlKey,
                $v_6 = this.get_parentGridControl().isLiteSubGrid();
            if (($v_4 || $v_5 || $v_6) && Mscrm.AppGridDefaultDataControl.$R($v_1)) this.$19_3($v_1, true, true);
            else this.$1b_3($v_1, $v_0, Mscrm.Utilities.getDomEventKeyCode($p0), $p0.shiftKey, $p0.ctrlKey);
            this.$2s_3($v_1)
        } !IsNull(this.get_parentGridControl()) && this.get_parentGridControl().GetParameter("LayoutStyle") === "LiteGridList" && !$v_2 && Mscrm.Utilities.parseBoolean(this.get_parentGridControl().GetParameter("enablesingleclick")) && this.handleSingleClick($p0)
    },
    handleSingleClick: function (targetEvent) {
        switch (this.get_parentGridControl().get_entityTypeCode()) {
            case Mscrm.EntityTypeCode.Incident:
                var $v_0 = this.fetchSelectedRecord(),
                    $v_1 = $get("titleHeader"),
                    $v_2 = !$v_0 || isNullOrEmptyString($v_0[2]) ? " " : $v_0[2];
                if (!IsNull($v_1)) {
                    XUI.Html.SetText($v_1, $v_2);
                    $v_1.title = $v_2.trim()
                }
                var $v_3 = {};
                $v_3["entityID"] = !$v_0 || !$v_0[0] ? "" : $v_0[0];
                var $v_4 = new Mscrm.EntityReference;
                $v_4.Id = $v_3["entityID"];
                $v_4.TypeName = "incident";
                $v_4.TypeCode = Mscrm.EntityTypeCode.Incident;
                $v_4.Name = $v_2;
                $v_3["entityReference"] = $v_4;
                $v_3["entityTypeToExpand"] = Mscrm.EntityTypeCode.IncidentResolution.toString();
                this.get_parentGridControl().raiseEvent(Mscrm.ScriptEvents.GridRowPreview, $v_3);
                break;
            default:
                this.$2J_3(targetEvent);
                break
        }
    },
    fetchSelectedRecord: function () {
        var $v_0 = [];
        if (IsNull(this.get_selectedRecords()) || this.get_selectedRecords().length < 1) return null;
        var $v_1 = this.$s_3(this.get_selectedRecords()[0][3]);
        if (IsNull($v_1)) return null;
        var $v_2 = $v_1.getAttribute("oid");
        $v_0[0] = $v_2;
        var $v_3 = parseInt(this.get_element().getAttribute("oname"));
        $v_0[1] = $v_3;
        var $v_4 = XUI.Html.GetText($v_1);
        $v_0[2] = $v_4;
        return $v_0
    },
    $34_3: function ($p0) {
        if ($p0.target.tagName.toUpperCase() === "INPUT" && ($p0.target.className !== "ms-crm-RowCheckBox" && $p0.target.className !== "ms-crm-RowCheckBox-Lite")) return;
        if ($p0.altKey) {
            $p0.preventDefault();
            return
        }
        var $v_0 = Mscrm.Utilities.getDomEventKeyCode($p0);
        if ($v_0 === 40 || $v_0 === 38) {
            $p0.preventDefault();
            var $v_1 = 0;
            if ($v_0 === 40) {
                if (this.$A_3 >= this.get_dataTableBody().rows.length - 1) return;
                $v_1 = 1
            } else if ($v_0 === 38) {
                if (this.$A_3 <= 0) return;
                $v_1 = -1
            }
            var $v_2 = this.$A_3 + $v_1,
                $v_3 = this.get_dataTableBody().rows[$v_2];
            if (!this.get_parentGridControl().isLiteSubGrid()) if ($v_3.cells[0].className === "ms-crm-List-PreviewCell" || $v_3.cells[1].className === "ms-crm-List-PreviewCell") $v_2 = $v_2 + $v_1;
            this.$2s_3($v_3);
            this.$2I_3($p0, $v_3);
            var $$t_6 = this;
            $v_2 = window.setInterval(function () {
                try {
                    !$$t_6.$5E_3($v_3, false) && window.clearInterval($v_2)
                } catch ($$e_5) {
                    window.clearInterval($v_2)
                }
            }, 0)
        } else if ($v_0 === this.$2L_3) $p0.ctrlKey && this.$P_3 > 0 && this.$5F_3();
        else if ($v_0 === 80) this.get_parentGridControl().GetParameter("preview") === "1" && $p0.preventDefault();
        else if ($v_0 === 32) {
            this.get_parentGridControl().get_maximumSelectableRecords() && $p0.preventDefault();
            return
        }
    },
    $4I_3: function ($p0) {
        var $v_0 = Mscrm.Utilities.getDomEventKeyCode($p0);
        if ($p0.altKey || $p0.shiftKey || $p0.ctrlKey && $v_0 !== this.$2L_3) return;
        if ($v_0 === 13) {
            if (this.$P_3 > 0 && this.$A_3 !== -1) {
                var $v_1 = $p0.target.parentNode.parentNode;
                if ($v_1.tagName.toUpperCase() === "A" && this.$r_3.getAttribute("id").indexOf("primaryField") === -1) XUI.Html.DispatchDomEvent(this.get_dataTableBody().rows[this.$A_3], XUI.Html.CreateDomEvent("click"));
                else XUI.Html.DispatchDomEvent(this.get_dataTableBody().rows[this.$A_3], XUI.Html.CreateDomEvent("dblclick"))
            }
        } else if ($v_0 === 80) this.get_parentGridControl().GetParameter("preview") === "1" && this.previewRow(this.get_dataTableBody().rows[this.$A_3]);
        else if ($v_0 === 32) {
            if (this.get_parentGridControl().get_maximumSelectableRecords()) {
                var $v_2 = this.$1Y_3($p0, false);
                if (!IsNull($v_2)) {
                    $p0.preventDefault();
                    if (Mscrm.AppGridDefaultDataControl.$R($v_2)) this.$19_3($v_2, true, true);
                    else this.$1b_3($v_2, $p0.target, Mscrm.Utilities.getDomEventKeyCode($p0), $p0.shiftKey, $p0.ctrlKey)
                }
            }
        } else if ($v_0 === this.$27_3) this.get_moreRecords() && this.get_parentGridControl().set_pageNumber(this.get_parentGridControl().get_pageNumber() + 1);
        else if ($v_0 === this.$26_3) this.get_parentGridControl().get_pageNumber() > 1 && this.get_parentGridControl().set_pageNumber(this.get_parentGridControl().get_pageNumber() - 1)
    },
    $5E_3: function ($p0, $p1) {
        var $v_0 = this.get_parentGridControl().get_id() + "_divDataArea",
            $v_1 = $get($v_0),
            $v_2 = $v_1.scrollTop,
            $v_3 = $v_1.clientHeight + $v_2,
            $v_4;
        if ($p1) {
            $v_4 = $p0.offsetTop + $p0.clientHeight;
            if ($v_4 > $v_3) {
                $v_1.scrollTop += Math.floor($v_1.offsetHeight / 8);
                return true
            }
        } else {
            $v_4 = $p0.offsetTop;
            if ($v_4 < $v_2) {
                $v_1.scrollTop -= Math.floor($v_1.offsetHeight / 8);
                return true
            }
        }
        return false
    },
    $1b_3: function ($p0, $p1, $p2, $p3, $p4) {
        if (!IsNull($p0.getAttribute("IsDisabled")) && $p0.getAttribute("IsDisabled") === "1") return;
        if ($p3 && this.$A_3 !== -1) {
            if (this.$d_3 === -1) this.$d_3 = this.$A_3;
            if ($p0.sectionRowIndex < this.$d_3) this.SelectRecords($p0.sectionRowIndex, this.$d_3, true);
            else this.SelectRecords(this.$d_3, $p0.sectionRowIndex, true);
            this.$A_3 = $p0.sectionRowIndex
        } else {
            if (!$p4) if ($p2 !== 32 && !this.$3t_3($p1) || this.get_parentGridControl().get_maximumSelectableRecords() === 1) {
                var $v_0 = this.get_parentGridControl().GetParameter("multiSelectOnRowClick");
                (IsNull($v_0) || $v_0 !== "true") && this.UnselectRecords($p0)
            }
            this.$1e_3($p0, false);
            this.$A_3 = $p0.sectionRowIndex;
            this.$d_3 = -1
        }
        this.$h_3()
    },
    $3t_3: function ($p0) {
        if (this.$2o_3($p0)) return true;
        return this.$3s_3($p0)
    },
    $2o_3: function ($p0) {
        if (IsNull($p0.tagName)) return false;
        return $p0.tagName.toUpperCase() === "INPUT" && $p0.getAttribute("type") === "checkbox"
    },
    $3s_3: function ($p0) {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild($p0);
        return IsNull($v_0) ? false : this.$2o_3($v_0)
    },
    $2X_3: function ($p0, $p1) {
        var $v_0 = "checkBox_" + $p0.getAttribute("oid"),
            $v_1 = $get($v_0, $p0);
        if (!IsNull($v_1)) $v_1.checked = $p1;
        $p0.setAttribute("selected", $p1 ? "true" : "false")
    },
    $2s_3: function ($p0) {
        if (!this.get_parentGridControl().isLiteSubGrid()) {
            var $v_0 = "checkBox_" + $p0.getAttribute("oid"),
                $v_1 = $get($v_0, $p0);
            if (!IsNull($v_1)) try {
                $v_1.focus()
            } catch ($$e_3) { }
        }
    },
    $1e_3: function ($p0, $p1) {
        if (IsNull($p0)) return false;
        if (IsNull(this.get_parentGridControl())) return false;
        var $v_0 = this.get_parentGridControl().get_maximumSelectableRecords();
        if (Mscrm.AppGridDefaultDataControl.$R($p0)) return true;
        if (0 === $v_0) return false;
        if (this.get_parentGridControl() && this.get_parentGridControl().isLiteSubGrid() && $p0.className === "ms-crm-Hidden-List") return false;
        if ($v_0 > 0 && this.$22_3 + 1 <= $v_0 || $v_0 === -1) {
            if (XUI.Html.DomUtils.GetFirstChild($p0).className !== "ms-crm-List-PreviewCell") {
                this.$22_3++;
                this.$2X_3($p0, true);
                if ($p0.className === "ms-crm-List-MultilineRow" || $p0.className === "ms-crm-List-HoveredMultilineRow") this.$g_3($p0, "ms-crm-List-SelectedMultilineRow");
                else if (this.get_parentGridControl().GetParameter("LayoutStyle") !== "LiteGridList") this.$g_3($p0, "ms-crm-List-SelectedRow");
                else {
                    var $v_1 = window.self._highConstrastEnabled;
                    if (!IsNull($v_1) && $v_1) this.$g_3($p0, "ms-crm-List-SelectedRow-Lite ms-crm-List-SelectedRow-Lite-HighContrast");
                    else this.$g_3($p0, "ms-crm-List-SelectedRow-Lite")
                }
                this.$3_3[this.$3_3.length] = $p0;
                !IsNull($p1) && $p1 && this.$h_3();
                this.get_parentGridControl().isLiteSubGrid() && Mscrm.GridControl.ShowDeleteButton($p0);
                return true
            }
        } else if (this.get_parentGridControl().isLiteSubGrid()) {
            if ($v_0 === 1) {
                this.UnselectRecords($p0);
                return true
            }
        } else {
            alert($v_0 === 1 ? window.LOCID_GRID_TOO_MANY_RECORDS_ONE : String.format(window.LOCID_GRID_TOO_MANY_RECORDS, $v_0));
            this.$2X_3($p0, false);
            return false
        }
        return false
    },
    $19_3: function ($p0, $p1, $p2) {
        if (!IsNull($p0) && Mscrm.AppGridDefaultDataControl.$R($p0)) {
            var $v_0 = this.get_dataTableBody().rows[$p0.sectionRowIndex + 1];
            if (!IsNull($v_0)) $v_0 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($v_0));
            this.$22_3--;
            if ($p0.className === "ms-crm-List-SelectedMultilineRow") this.$g_3($p0, "ms-crm-List-MultilineRow");
            else if (this.get_parentGridControl().GetParameter("LayoutStyle") !== "LiteGridList") this.$g_3($p0, "ms-crm-List-Row");
            else this.$g_3($p0, "ms-crm-List-Row-Lite");
            this.$2X_3($p0, false);
            if (!IsNull($p1) && $p1) for (var $v_1 = this.$3_3.length, $v_2 = 0; $v_2 < $v_1; $v_2++) if ($p0.sectionRowIndex === this.$3_3[$v_2].sectionRowIndex) {
                Array.removeAt(this.$3_3, $v_2);
                break
            } !IsNull($p2) && $p2 && this.$h_3();
            this.get_parentGridControl().isLiteSubGrid() && Mscrm.GridControl.HideDeleteButton($p0)
        }
    },
    saveSelectRows: function () {
        this.$11_3 = [];
        for (var $v_0 = 0; $v_0 < this.$3_3.length; $v_0++) this.$11_3[$v_0] = this.$3_3[$v_0]
    },
    reselectRows: function () {
        var $v_0 = this.$11_3.length;
        if ($v_0 > 0) for (var $v_1 = 0; $v_1 < $v_0; $v_1++) this.$1e_3(this.$11_3[$v_1], false);
        else this.get_numberOfRecords() > 0 && this.$3R_3() && this.SelectRecords(0, 0, true);
        this.$h_3()
    },
    $5F_3: function () {
        this.SelectRecords(0, this.get_dataTableBody().rows.length - 1, false)
    },
    $g_3: function ($p0, $p1) {
        var $v_0 = this.$2G_3($p0);
        if ($v_0) {
            var $v_1;
            if ($p1 === "ms-crm-List-SelectedRow" || $p1 === "ms-crm-List-SelectedMultilineRow") {
                $v_1 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/row_selected.gif"));
                $v_0.alt = window.LOCID_GRID_SELECTED_ROW;
                if (window.LOCID_UI_DIR === "RTL") {
                    Mscrm.Utilities.cancelElementFlipping($v_0);
                    Mscrm.Utilities.flipElementHorizontally($v_0)
                }
            } else {
                $v_1 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/r.gif"));
                $v_0.alt = window.LOCID_GRID_UNSELECTED_ROW;
                if (window.LOCID_UI_DIR === "RTL") {
                    Mscrm.Utilities.cancelElementFlipping($v_0);
                    Mscrm.Utilities.flipElementHorizontally($v_0)
                }
            }
            $v_0.src = $v_1.source;
            $v_0.className = Mscrm.ImageStrip.replaceExistingImageStripClass($v_0.className, $v_1.cssClass)
        }
        $p0.className = $p1
    },
    $2E_3: function ($p0) {
        var $v_0;
        if (!IsNull($p0.getAttribute("otype"))) $v_0 = parseInt($p0.getAttribute("otype"));
        else $v_0 = parseInt(this.get_element().getAttribute("oname"));
        return $v_0
    },
    handleContextMenu: function (e) {
        var $v_0 = $get("divMenu");
        if (IsNull($v_0)) return;
        this.$L_3 = this.$s_3(e.target);
        this.$1N_3 = document.createElement("DIV");
        this.$1N_3.setAttribute("id", "menuContainer");
        document.body.appendChild(this.$1N_3);
        this.$b_3 = Mscrm.Menu.createMenu(this.$1N_3);
        this.$b_3.set_stylePrefix(Mscrm.MenuStyles.popupStylePrefix);
        this.$b_3.set_width(170);
        var $v_1 = CrmEncodeDecode.CrmHtmlDecode($v_0.getAttribute("menuXml").toString()),
            $v_2 = XUI.Xml.LoadXml($v_1).firstChild,
            $v_3 = XUI.Xml.SelectNodes($v_2, "//Menu/MenuItem", null),
            $v_4 = false,
            $v_5 = 0;
        while ($v_5 < $v_3.length) {
            var $v_6 = null;
            $v_6 = Mscrm.MenuItem.createMenuItem(XUI.Xml.GetText($v_3[$v_5].attributes.getNamedItem("title")));
            var $v_7 = $v_3[$v_5].attributes.getNamedItem("isseparator");
            if (!IsNull($v_7)) $v_6 = Mscrm.MenuItemSeparator.createSeparator(false);
            else {
                $v_6.set_reference($v_3[$v_5].attributes.getNamedItem("typeId").nodeValue);
                $v_4 = $v_3[$v_5].attributes.getNamedItem("disableonemptygrid").nodeValue === "yes" ? true : false;
                $v_6.set_actionCallback(this.$$d_contextMenuItemClickHandler);
                var $v_8 = IsNull(this.$L_3) || IsNull(this.$L_3.getAttribute("oid")),
                    $v_9 = Number.parseInvariant($v_6.get_reference().toString());
                $v_6.set_disabled($v_8 && $v_4 || $v_9 === Mscrm.ContextMenuAction.copyShortcut && !Mscrm.Utilities.isIE())
            }
            this.$b_3.addItem($v_6);
            $v_5++
        }
        this.$b_3.set_left(e.clientX);
        this.$b_3.set_top(e.clientY);
        this.$b_3.show();
        e.preventDefault();
        e.stopPropagation()
    },
    $4k_3: function () {
        this.openInNewWindow(this.$L_3)
    },
    $51_3: function () {
        this.get_parentGridControl().Refresh()
    },
    $5S_3: function () {
        window.open(window.location.href)
    },
    $5G_3: function ($p0) {
        this.sendShortcut(true, $p0)
    },
    $4s_3: function () {
        this.printRow(this.$L_3)
    },
    $3n_3: function ($p0) {
        this.sendShortcut(false, $p0)
    },
    $4j_3: function () {
        this.$18_3(this.$L_3)
    },
    contextMenuItemClickHandler: function (item) {
        if (!IsNull(item)) {
            var $v_0 = Number.parseInvariant(item.get_reference().toString());
            switch ($v_0) {
                case Mscrm.ContextMenuAction.openInNewWindow:
                    this.$4k_3();
                    break;
                case Mscrm.ContextMenuAction.copyShortcut:
                    this.$3n_3(this.$2E_3(this.$L_3));
                    break;
                case Mscrm.ContextMenuAction.sendShortcut:
                    this.$5G_3(this.$2E_3(this.$L_3));
                    break;
                case Mscrm.ContextMenuAction.print:
                    this.$4s_3();
                    break;
                case Mscrm.ContextMenuAction.refresh:
                    this.$51_3();
                    break;
                case Mscrm.ContextMenuAction.openSource:
                    this.$5S_3();
                    break;
                case Mscrm.ContextMenuAction.open:
                    this.$4j_3();
                    break
            }
        }
    },
    $2G_3: function ($p0) {
        var $v_0 = "previewImage_" + $p0.getAttribute("oid"),
            $v_1 = $get($v_0);
        return $v_1
    },
    $1V_3: function ($p0) {
        var $v_0 = this.$2G_3($p0);
        if (!IsNull($p0) && Mscrm.AppGridDefaultDataControl.$3F($p0)) {
            var $v_1;
            if (Mscrm.AppGridDefaultDataControl.$R($p0)) {
                $v_1 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/row_selected.gif"));
                $v_0.setAttribute("alt", window.LOCID_GRID_SELECTED_ROW)
            } else {
                $v_1 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/r.gif"));
                $v_0.setAttribute("alt", window.LOCID_GRID_UNSELECTED_ROW);
                window.LOCID_UI_DIR === "RTL" && Mscrm.Utilities.flipElementHorizontally($v_0)
            }
            $v_0.setAttribute("src", $v_1.source);
            $v_0.className = Mscrm.ImageStrip.replaceExistingImageStripClass($v_0.className, $v_1.cssClass);
            this.get_dataTableBody().removeChild(XUI.Html.DomUtils.GetNextSibling($p0));
            $p0.setAttribute("expanded", "false");
            this.$1R_3 = null
        }
    },
    $3v_3: function ($p0) {
        if (IsNull($p0)) return;
        if (Mscrm.AppGridDefaultDataControl.$3F($p0)) {
            this.$1V_3($p0);
            return
        } else !IsNull(this.$1R_3) && this.$1V_3(this.$1R_3);
        var $v_0;
        if (!IsNull($p0.getAttribute("otype"))) $v_0 = $p0.getAttribute("otype");
        else $v_0 = this.get_element().getAttribute("oname");
        if (IsNull(this.$c_3)) this.$c_3 = new XMLHttpRequest;
        var $v_1 = Mscrm.CrmUri.create("/_grid/preview.aspx");
        $v_1.get_query()["type"] = $v_0;
        $v_1.get_query()["id"] = $p0.getAttribute("oid");
        this.$c_3.open("GET", $v_1.toString(), false);
        Mscrm.Utilities.setResponseTypeToMSXml(this.$c_3);
        this.$c_3.send(null);
        if (Mscrm.XmlUtil.handleXMLErr(this.$c_3.responseXML, false) !== window.ERROR_NONE) return;
        var $v_2 = this.get_dataTableBody().insertRow($p0.sectionRowIndex + 1);
        $v_2.setAttribute("oid", $p0.getAttribute("oid"));
        !IsNull($p0.getAttribute("otype")) && $v_2.setAttribute("otype", $p0.getAttribute("otype"));
        $v_2.style.height = "100%";
        var $$t_9 = this;
        $addHandler($v_2, "mouseover", function ($p1_0) {
            $p1_0.stopPropagation()
        });
        var $$t_A = this;
        $addHandler($v_2, "click ", function ($p1_0) {
            $p1_0.stopPropagation()
        });
        var $v_3 = $v_2.insertCell(0);
        $v_3.className = "ms-crm-List-PreviewCell";
        $v_3.colSpan = $p0.cells.length;
        $v_3.innerHTML = XUI.Xml.GetText(this.$c_3.responseXML.firstChild.firstChild);
        $p0.setAttribute("expanded", "true");
        $p0.style.paddingTop = "0px";
        var $v_4 = this.$2G_3($p0),
            $v_5 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/d.gif"));
        $v_4.src = $v_5.source;
        $v_4.className = Mscrm.ImageStrip.replaceExistingImageStripClass($v_4.className, $v_5.cssClass);
        $v_4.alt = window.LOCID_GRID_PREVIEW_ROW;
        this.$1R_3 = $p0
    }
};
Mscrm.AppGridFilterContainer = function (element) {
    this.$$d_$5I_3 = Function.createDelegate(this, this.$5I_3);
    this.$$d_refreshGridView = Function.createDelegate(this, this.refreshGridView);
    this.$$d_$5H_3 = Function.createDelegate(this, this.$5H_3);
    Mscrm.AppGridFilterContainer.initializeBase(this, [element]);
    this.$Q_3 = element.getAttribute("GridId");
    this.$2h_3 = parseInt(element.getAttribute("autorefresh"))
};
Mscrm.AppGridFilterContainer.prototype = {
    $16_3: null,
    $Q_3: null,
    $2h_3: 0,
    initialize: function () {
        this.$16_3 = $find(this.$Q_3);
        this.$2h_3 === 1 && this.$2k_3(this.$$d_$5H_3)
    },
    $5H_3: function ($p0) {
        var $v_0 = $find($p0.id);
        $v_0.add_onChange(this.$$d_refreshGridView)
    },
    refreshGridView: function (sender, ea) {
        this.$2k_3(this.$$d_$5I_3);
        this.$16_3.ResetPageNumber();
        this.$16_3.Refresh()
    },
    $5I_3: function ($p0) {
        switch ($p0.className) {
            case "AppGridFilterSelector":
                var $v_0 = $find($p0.id),
                    $v_1 = $v_0.getDataValue();
                if (!IsNull($v_1)) {
                    var $$dict_3 = $v_1;
                    for (var $$key_4 in $$dict_3) {
                        var $v_2 = {
                            key: $$key_4,
                            value: $$dict_3[$$key_4]
                        };
                        this.$16_3.SetParameter($v_2.key, $v_2.value)
                    }
                }
                break;
            default:
                !IsNull($p0.DataValue) && this.$16_3.SetParameter($p0.id, $p0.DataValue);
                break
        }
    },
    $2k_3: function ($p0) {
        var $v_0 = $get(this.$Q_3 + "_AppGridFilterSelector");
        !IsNull($v_0) && $p0($v_0)
    }
};
Mscrm.AppGridFilterSelector = function (element) {
    this.$$d_$4C_3 = Function.createDelegate(this, this.$4C_3);
    Mscrm.AppGridFilterSelector.initializeBase(this, [element]);
    this.$Q_3 = element.getAttribute("GridId")
};
Mscrm.AppGridFilterSelector.prototype = {
    add_onChange: function (value) {
        this.get_events().addHandler("OnChange", value)
    },
    remove_onChange: function (value) {
        this.get_events().removeHandler("OnChange", value)
    },
    $14_3: null,
    $1A_3: null,
    $Q_3: null,
    initialize: function () {
        var $v_0 = $get(this.$Q_3 + "_FilterControl");
        if (!IsNull($v_0)) {
            this.$14_3 = XUI.Html.DomUtils.GetFirstChild($v_0);
            $addHandler(this.$14_3, "change", this.$$d_$4C_3)
        }
        this.$1A_3 = $get(this.$Q_3 + "_ViewControl");
        !IsNull(this.$1A_3) && $addHandler(this.$1A_3, "change", this.$$d_$4C_3)
    },
    getDataValue: function () {
        var $v_0 = {}, $v_1 = false;
        if (!IsNull(this.$14_3)) {
            var $v_2 = this.$14_3.id.replace(this.$Q_3 + "_", "");
            $v_0[$v_2] = this.$14_3.value;
            $v_1 = true
        }
        if (!IsNull(this.$1A_3)) {
            var $v_3 = this.$1A_3,
                $v_4 = $v_3.options;
            if ($v_4.length > 0) {
                $v_0["queryapi"] = $v_4[$v_3.selectedIndex].getAttribute("queryapi");
                $v_1 = true
            }
        }
        if ($v_1) return $v_0;
        else return null
    },
    $4C_3: function ($p0) {
        this.fireControlEvent("OnChange", Sys.EventArgs.Empty)
    }
};
Mscrm.AppGridJumpBar = function (element) {
    this.$$d_$55_3 = Function.createDelegate(this, this.$55_3);
    this.$$d_$3f_3 = Function.createDelegate(this, this.$3f_3);
    this.$$d_$3w_3 = Function.createDelegate(this, this.$3w_3);
    Mscrm.AppGridJumpBar.initializeBase(this, [element]);
    this.$1w_3 = element
};
Mscrm.AppGridJumpBar.prototype = {
    $9_3: null,
    $1w_3: null,
    Reset: function () {
        !IsNull(this.$9_3) && this.$i_3(this.$9_3, false);
        this.$9_3 = this.$1w_3.rows[0].cells[0];
        this.$i_3(this.$9_3, true)
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        for (var $v_0 = this.$1w_3.rows[0].cells, $v_1 = 0; $v_1 < $v_0.length; $v_1++) if ($v_0[$v_1].className.indexOf("ms-crm-List-DefaultIndex") >= 0) this.$9_3 = $v_0[$v_1];
        !IsNull(this.$9_3) && this.$i_3(this.$9_3, true);
        this.$3g_3()
    },
    $i_3: function ($p0, $p1) {
        if ($p1) {
            if ($p0.className.indexOf(" ms-crm-List-SelectedIndex") === -1) $p0.className += " ms-crm-List-SelectedIndex"
        } else $p0.className = $p0.className.replace(" ms-crm-List-SelectedIndex", "")
    },
    $3g_3: function () {
        $addHandler(this.get_element(), "click", this.$$d_$3w_3);
        $addHandler(this.get_element(), "mouseover", this.$$d_$3f_3);
        $addHandler(this.get_element(), "mouseout", this.$$d_$55_3)
    },
    $3f_3: function ($p0) {
        $p0.target.tagName.toLowerCase() === "td" && $p0.target !== this.$9_3 && this.$i_3($p0.target, true)
    },
    $55_3: function ($p0) {
        $p0.target.tagName.toLowerCase() === "td" && $p0.target !== this.$9_3 && this.$i_3($p0.target, false)
    },
    $3w_3: function ($p0) {
        var $v_0 = $p0.target;
        if ($v_0.tagName.toLowerCase() === "td") {
            var $v_1 = Mscrm.GridControl.findComponent(this.get_element().getAttribute("gridId"));
            if ($v_1.GetParameter("ispreviewmode") === "1" || $v_1.GetParameter("InnerGridDisabled") === "1") return;
            this.$i_3(this.$9_3, false);
            this.$i_3($v_0, true);
            this.$9_3 = $v_0;
            var $v_2 = this.$9_3.cellIndex;
            $v_1.SetParameter("filter", !$v_2 ? "" : this.$9_3.getAttribute("filter"));
            $v_1.SetParameter("filterDisplay", !$v_2 ? "" : XUI.Html.GetText(this.$9_3));
            $v_1.ClearPagingCookie();
            $v_1.set_pageNumber(1)
        }
    }
};
Mscrm.ColumnResizeControl = function (element) {
    this.$$d_$5B_3 = Function.createDelegate(this, this.$5B_3);
    this.$$d_$5A_3 = Function.createDelegate(this, this.$5A_3);
    this.$$d_$3i_3 = Function.createDelegate(this, this.$3i_3);
    this.$$d_$5C_3 = Function.createDelegate(this, this.$5C_3);
    Mscrm.ColumnResizeControl.initializeBase(this, [element])
};
Mscrm.ColumnResizeControl.prototype = {
    $1m_3: null,
    CrmGrid: null,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        $addHandler(this.get_element(), "mousedown", this.$$d_$5C_3);
        $addHandler(this.get_element(), "dblclick", this.$$d_$3i_3)
    },
    dispose: function () {
        if (this.get_isDisposed()) return;
        $removeHandler(this.get_element(), "mousedown", this.$$d_$5C_3);
        $removeHandler(this.get_element(), "dblclick", this.$$d_$3i_3);
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    get_$1Z_3: function () {
        if (IsNull(this.$1m_3)) this.$1m_3 = Mscrm.GridControl.findComponent(this.CrmGrid);
        return this.$1m_3
    },
    $5C_3: function ($p0) {
        $p0.preventDefault();
        $addHandler(window.document, "mousemove", this.$$d_$5A_3);
        $addHandler(window.document, "mouseup", this.$$d_$5B_3);
        this.get_$1Z_3().HandleResizeStartup($p0)
    },
    $5B_3: function ($p0) {
        $p0.preventDefault();
        $removeHandler(window.document, "mousemove", this.$$d_$5A_3);
        $removeHandler(window.document, "mouseup", this.$$d_$5B_3);
        this.get_$1Z_3().HandleResizeCleanup($p0)
    },
    $5A_3: function ($p0) {
        $p0.preventDefault();
        this.get_$1Z_3().HandleResize($p0, this)
    },
    $3i_3: function ($p0) {
        this.get_$1Z_3().HandleAutoResize($p0, this)
    }
};
Mscrm.GridControl = function (element) {
    this.$$d_$3K_3 = Function.createDelegate(this, this.$3K_3);
    this.$$d_$4p_3 = Function.createDelegate(this, this.$4p_3);
    this.$$d_$4q_3 = Function.createDelegate(this, this.$4q_3);
    this.$$d_$4o_3 = Function.createDelegate(this, this.$4o_3);
    this.$$d_prepareEnablePresence = Function.createDelegate(this, this.prepareEnablePresence);
    this.$$d_initAppGridPresence = Function.createDelegate(this, this.initAppGridPresence);
    this.$$d_$4f_3 = Function.createDelegate(this, this.$4f_3);
    this.$$d_$2t_3 = Function.createDelegate(this, this.$2t_3);
    this.$$d_$49_3 = Function.createDelegate(this, this.$49_3);
    this.$$d_$48_3 = Function.createDelegate(this, this.$48_3);
    this.$$d_$4A_3 = Function.createDelegate(this, this.$4A_3);
    this.$$d_$4L_3 = Function.createDelegate(this, this.$4L_3);
    this.$$d_$4J_3 = Function.createDelegate(this, this.$4J_3);
    this.$$d_$4K_3 = Function.createDelegate(this, this.$4K_3);
    this.$$d_HandleGridResize = Function.createDelegate(this, this.HandleGridResize);
    this.$$d_$4e_3 = Function.createDelegate(this, this.$4e_3);
    this.$$d_$4h_3 = Function.createDelegate(this, this.$4h_3);
    this.$$d_$4g_3 = Function.createDelegate(this, this.$4g_3);
    this.$$d_$3Y_3 = Function.createDelegate(this, this.$3Y_3);
    this.$$d_$5O_3 = Function.createDelegate(this, this.$5O_3);
    this.$$d_$4D_3 = Function.createDelegate(this, this.$4D_3);
    this.$$d_$4E_3 = Function.createDelegate(this, this.$4E_3);
    this.$$d_$31_3 = Function.createDelegate(this, this.$31_3);
    this.$$d_$34_3 = Function.createDelegate(this, this.$34_3);
    this.$$d_$1a_3 = Function.createDelegate(this, this.$1a_3);
    this.$$d_$53_3 = Function.createDelegate(this, this.$53_3);
    this.$$d_$3y_3 = Function.createDelegate(this, this.$3y_3);
    this.$$d_$4Y_3 = Function.createDelegate(this, this.$4Y_3);
    this.$$d_$4r_3 = Function.createDelegate(this, this.$4r_3);
    this.$$d_$37_3 = Function.createDelegate(this, this.$37_3);
    this.$$d_$4v_3 = Function.createDelegate(this, this.$4v_3);
    this.$$d_$4x_3 = Function.createDelegate(this, this.$4x_3);
    this.$$d_$3H_3 = Function.createDelegate(this, this.$3H_3);
    this.$$d_$t_3 = Function.createDelegate(this, this.$t_3);
    this.$$d_$4B_3 = Function.createDelegate(this, this.$4B_3);
    this.$$d_$2K_3 = Function.createDelegate(this, this.$2K_3);
    this.$$d_$59_3 = Function.createDelegate(this, this.$59_3);
    this.$8_3 = new Array(0);
    this.$m_3 = new Array(0);
    this.$k_3 = new Array(0);
    this.$C_3 = null;
    this.$p_3 = null;
    this.$l_3 = Mscrm.GridControl.gridTypeNone;
    this.$n_3 = -1;
    this.refresh = this.Refresh;
    this.getProperty = this.GetProperty;
    Mscrm.GridControl.initializeBase(this, [element]);
    this.$4X_3()
};
Mscrm.GridControl.handleTabStateForReadForm = function (value, handler) {
    var $v_0 = $get("rofContainer");
    if (!IsNull($v_0)) {
        var $v_1 = Mscrm.GridSpanControl.getTabRead(value),
            $v_2 = Mscrm.GridControl.getExpanderClassName($v_1);
        if (!IsNull($v_1) && !isNullOrEmptyString($v_2) && $v_2.endsWith("_right")) {
            var $v_3 = $($v_1);
            if (!IsNull($v_3)) {
                var $v_4 = {};
                $v_4["tabExpander"] = $v_1;
                $v_4["controlObject"] = value;
                $v_4["expanderObject"] = $v_3;
                $v_3.bind(Mscrm.EventNames.inlineTabStateChange, $v_4, handler)
            }
        }
    }
};
Mscrm.GridControl.getExpanderClassName = function (expanderContainer) {
    if (expanderContainer) return XUI.Html.DomUtils.GetFirstChild(expanderContainer).className;
    else return null
};
Mscrm.GridControl.$2p = function ($p0) {
    $p0.rawEvent.returnValue = false
};
Mscrm.GridControl.findComponent = function (gridId) {
    var $v_0 = $find(gridId);
    if (!IsNull($v_0) && Mscrm.GridControl.isInstanceOfType($v_0)) return $v_0;
    return null
};
Mscrm.GridControl.ShowDeleteButton = function (rowElement) {
    var $v_0 = "gridBodyTable_delete_" + rowElement.getAttribute("oid") + "_" + rowElement.sectionRowIndex,
        $v_1 = $get($v_0);
    if (IsNull($v_1)) return;
    var $v_2 = Mscrm.GridControl.$2C(XUI.Html.DomUtils.GetFirstChild($v_1)),
        $v_3 = $v_2.GetParameter("deleteAction");
    if (isNullOrEmptyString($v_3) || $v_2.getFormData().get_isDisabled()) return;
    var $v_4 = Mscrm.GridControl.$3z($v_2);
    if (window.LOCID_UI_DIR === "RTL") $v_1.style.left = $v_4.toString() + "px";
    else $v_1.style.right = $v_4.toString() + "px";
    $v_1.parentNode.style.display = "inline";
    $v_1.parentNode.style.display = "block";
    $v_1.style.visibility = "visible";
    var $v_5 = XUI.Html.GetComputedStyle($v_1.parentNode.parentNode.parentNode, "backgroundColor");
    if ($v_5 === "transparent") $v_5 = "#FFFFFF";
    $v_1.style.backgroundColor = $v_5
};
Mscrm.GridControl.$3z = function ($p0) {
    var $v_0 = $get($p0.get_id() + "_divDataArea"),
        $v_1 = $v_0.offsetWidth,
        $v_2 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($v_0)).offsetWidth,
        $v_3 = $v_2 - $v_1 - $v_0.scrollLeft;
    return $v_3 > 0 ? $v_3 - 1 : 0
};
Mscrm.GridControl.HideDeleteButton = function (rowElement) {
    var $v_0 = "gridBodyTable_delete_" + rowElement.getAttribute("oid") + "_" + rowElement.sectionRowIndex,
        $v_1 = $get($v_0);
    if (IsNull($v_1)) return;
    var $v_2 = Mscrm.GridControl.$2C(XUI.Html.DomUtils.GetFirstChild($v_1)),
        $v_3 = $v_2.GetParameter("deleteAction");
    if (isNullOrEmptyString($v_3)) return;
    $v_1.style.visibility = "hidden"
};
Mscrm.GridControl.DeleteRecordLite = function (deleteButton) {
    var $v_0 = Mscrm.GridControl.$2C(deleteButton),
        $v_1 = $v_0.GetParameter("deleteAction");
    if (isNullOrEmptyString($v_1)) return;
    $v_0.$0_3.UnselectRecords(null);
    var $v_2 = deleteButton.parentNode.parentNode.parentNode.sectionRowIndex;
    $v_0.$0_3.SelectRecords($v_2, $v_2, true);
    if ($v_1 === "Delete") {
        var $v_3 = $v_0.get_selectedRecords(),
            $v_4 = Number.parseInvariant($v_0.GetParameter("otc"));
        if ($v_4 === Mscrm.EntityTypeCode.Connection && $v_3.length === 1) $v_0.$3p_3($v_3[0].Id.toString());
        else {
            var $v_5 = Mscrm.Grid.deleteRecords($v_0, $v_3, $v_4);
            !$v_5 && $v_0.$0_3.SelectRecords($v_2, $v_2, true)
        }
    } else if ($v_1 === "Remove") {
        var $v_6 = $v_0.GetParameter("relName"),
            $v_7 = Number.parseInvariant($v_0.GetParameter("oType")),
            $v_8 = $v_0.GetParameter("oId"),
            $v_9 = Number.parseInvariant($v_0.GetParameter("otc")),
            $v_A = $v_0.get_selectedRecords()[0].Id;
        $v_0.$3q_3($v_6, $v_7, $v_8, $v_9, $v_A)
    }
};
Mscrm.GridControl.$2C = function ($p0) {
    var $v_0 = $p0;
    while (!$v_0.id.toString().endsWith("_divDataArea")) $v_0 = $v_0.parentNode;
    var $v_1 = 12,
        $v_2 = $v_0.id.toString().substring(0, $v_0.id.toString().length - $v_1);
    return $find($v_2)
};
Mscrm.GridControl.loadGridView = function (containerId, gridId, url, oId, isSubGridLite) {
    var $v_0 = new XMLHttpRequest;
    $v_0.onreadystatechange = function () {
        if ($v_0.readyState === 4) {
            $v_0.onreadystatechange = null;
            $v_0.status === 200 && executeFunctionDeferred(function () {
                Mscrm.GridControl.$3D($v_0.responseXML, containerId, gridId, oId, isSubGridLite)
            }, false, false)
        }
    };
    $v_0.open("GET", url, true);
    Mscrm.Utilities.setResponseTypeToMSXml($v_0);
    $v_0.send(null)
};
Mscrm.GridControl.$3D = function ($p0, $p1, $p2, $p3, $p4) {
    var $v_0 = $get($p1);
    if (IsNull($v_0)) {
        window.setTimeout(function () {
            Mscrm.GridControl.$3D($p0, $p1, $p2, $p3, $p4)
        }, 10);
        return
    }
    var $v_1 = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($p0, "//gridXml/gridHtml", null));
    $v_0.innerHTML = $v_1;
    var $v_2 = $get($p2);
    !IsNull($p3) && $p3 !== "" && Mscrm.GridControl.setElementParameter($v_2, "oId", $p3);
    var $v_3 = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($p0, "//gridXml/gridHeader", null));
    $v_3 += XUI.Xml.GetText(XUI.Xml.SelectSingleNode($p0, "//gridXml/gridInitFunctionName", null)) + "();";
    var $v_4 = new Function($v_3);
    $v_4.apply(window)
};
Mscrm.GridControl.setElementParameter = function (element, name, value) {
    var $v_0 = $get("divGridParams", element);
    if (!IsNull($v_0)) {
        var $v_1 = $get(name, $v_0);
        if (IsNull($v_1)) {
            $v_1 = $v_0.ownerDocument.createElement("div");
            $v_1.id = name;
            $v_0.appendChild($v_1)
        }
        $v_1.setAttribute("value", value)
    }
};
Mscrm.GridControl.$2H = function ($p0) {
    for (var $v_0 = new Array($p0.length), $v_1 = 0; $v_1 < $p0.length; $v_1++) $v_0[$v_1] = $p0[$v_1][0];
    return $v_0
};
Mscrm.GridControl.$28 = function ($p0, $p1) {
    for (var $v_0 = new Array($p0.length), $v_1 = 0; $v_1 < $p0.length; $v_1++) {
        var $v_2 = $p0[$v_1],
            $v_3 = new Mscrm.EntityReference;
        $v_3.Id = $v_2[0];
        $v_3.TypeCode = parseInt($v_2[1], 10);
        var $v_4 = $v_2[3];
        $v_3.TypeName = $v_4.getAttribute("otypename");
        $v_3.Name = XUI.Html.GetText($v_4.children[$p1]);
        $v_0[$v_1] = $v_3
    }
    return $v_0
};
Mscrm.GridControl.prototype = {
    add_onSelectionChange: function (value) {
        this.get_events().addHandler("OnSelectionChange", value)
    },
    remove_onSelectionChange: function (value) {
        this.get_events().removeHandler("OnSelectionChange", value)
    },
    add_onBeforeFormLoad: function (value) {
        this.get_events().addHandler("OnBeforeFormLoad", value)
    },
    remove_onBeforeFormLoad: function (value) {
        this.get_events().removeHandler("OnBeforeFormLoad", value)
    },
    add_onReset: function (value) {
        this.get_events().addHandler("OnReset", value)
    },
    remove_onReset: function (value) {
        this.get_events().removeHandler("OnReset", value)
    },
    add_onResetComplete: function (value) {
        this.get_events().addHandler("OnResetComplete", value)
    },
    remove_onResetComplete: function (value) {
        this.get_events().removeHandler("OnResetComplete", value)
    },
    $w_3: null,
    $1E_3: null,
    $2g_3: false,
    RefreshAppGrid: function () {
        this.Reset(null)
    },
    Reset: function (funOnResetComplete) {
        this.fireControlEvent("OnReset", Sys.EventArgs.Empty);
        if (!IsNull(Mscrm.PageManager) && !IsNull(Mscrm.PageManager.get_instance()) && Mscrm.PageManager.isFlatUIPage()) {
            var $v_0 = {};
            $v_0["viewid"] = this.GetParameter("viewid");
            $v_0["viewtype"] = this.GetParameter("viewtype");
            this.raiseEvent(Mscrm.ScriptEvents.OnGridReset, $v_0)
        }
        if (!IsNull(Mscrm.IFilterSet)) {
            var $v_1 = $find(this.get_id() + "_filterSet");
            if (!IsNull($v_1)) {
                var $v_2 = this.$1W_3(),
                    $v_3 = $get("fetchXml", $v_2);
                !IsNull($v_3) && $v_2.removeChild($v_3)
            }
        }
        if (!IsNull(Mscrm.IFilterSet)) {
            var $v_4 = $find(this.get_id() + "_filterSet");
            !IsNull($v_4) && $v_4.DisposeFilterMenu()
        }
        this.$2n_3();
        this.ShowLoadingMessage();
        if (!IsNull(funOnResetComplete)) {
            this.$1E_3 = funOnResetComplete;
            window.setTimeout(this.$$d_$59_3, 1);
            return true
        } else {
            this.$1E_3 = null;
            return this.$3O_3()
        }
    },
    $59_3: function () {
        this.$3O_3()
    },
    $3O_3: function () {
        if (!this.$w_3) this.$w_3 = new Mscrm.RemoteCommandXml("AppGridWebService", "Reset");
        this.$w_3.setContent(this.$3j_3());
        this.$w_3.setParameter("id", this.get_id());
        var $v_0 = this.$w_3.execute();
        return this.$58_3($v_0)
    },
    $58_3: function ($p0) {
        if ($p0.get_success() && !isNullOrEmptyString($p0.get_returnValue())) {
            var $v_0 = XUI.Xml.LoadXml($p0.get_returnValue()),
                $v_1 = $get(this.get_id() + "_gridBodyContainer");
            $v_1.removeChild(XUI.Html.DomUtils.GetFirstChild($v_1));
            $v_1.innerHTML = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_0, "gridXml/gridHtml", null));
            this.$25_3();
            var $v_2 = XUI.Xml.SelectNodes($v_0, "gridXml/viewParameters/div", null);
            if ($v_2) for (var $v_3 = 0; $v_3 < $v_2.length; $v_3++) this.SetParameter($v_2[$v_3].attributes.getNamedItem("id").nodeValue, XUI.Xml.GetText($v_2[$v_3]));
            $v_2 = XUI.Xml.SelectNodes($v_0, "gridXml/gridProperties/div", null);
            if ($v_2) for (var $v_4 = 0; $v_4 < $v_2.length; $v_4++) this.SetProperty($v_2[$v_4].attributes.getNamedItem("id").nodeValue, XUI.Xml.GetText($v_2[$v_4]));
            this.$4S_3();
            this.$2K_3(null, null);
            this.InitPresence();
            eval(this.GetProperty("initStatements"));
            if (!IsNull(Mscrm.IFilterSet)) {
                var $v_5 = $find(this.get_id() + "_filterSet");
                if (!IsNull($v_5)) {
                    $v_5.handleGridReset();
                    for (var $v_6 = this.$43_3(), $v_7 = $v_6[0].length, $v_8 = 0; $v_8 < $v_7; $v_8++) {
                        var $v_9 = $v_6[1][$v_8],
                            $v_A = $v_6[0][$v_8];
                        if ($v_9 === "string") $create(Mscrm.StringFilterPopup, {}, null, null, $v_A);
                        else if ($v_9 === "number") $create(Mscrm.NumberFilterPopup, {}, null, null, $v_A);
                        else if ($v_9 === "datetime") $create(Mscrm.DateTimeFilterPopup, {}, null, null, $v_A);
                        else if ($v_9 === "picklist") $create(Mscrm.PicklistFilterPopup, {}, null, null, $v_A);
                        else $v_9 === "lookup" && $create(Mscrm.LookupFilterPopup, {}, null, null, $v_A);
                        $v_5.registerFilterPopup($v_6[0][$v_8].id, $v_9, "reset")
                    }
                    if ($v_5.isFilterEnabled()) if ($v_5.canEnableFilters()) $v_5.enableFilters();
                    else $v_5.markFiltersAsDisabled()
                }
            }
        } !IsNull(this.$1E_3) && this.$1E_3($p0, $p0.get_remoteCommandXml());
        this.fireControlEvent("OnResetComplete", Sys.EventArgs.Empty);
        if (!IsNull(Mscrm.PageManager) && !IsNull(Mscrm.PageManager.get_instance()) && Mscrm.PageManager.isFlatUIPage()) {
            var $v_B = {};
            $v_B["viewid"] = this.GetParameter("viewid");
            $v_B["viewtype"] = this.GetParameter("viewtype");
            this.raiseEvent(Mscrm.ScriptEvents.OnGridResetComplete, $v_B)
        }
        return $p0.get_success()
    },
    $43_3: function () {
        for (var $v_0 = "LI", $v_1 = "ms-crm-FilterPopupMenu", $v_2 = $get(this.get_id() + "_gridBar"), $v_3 = $v_2.getElementsByTagName($v_0), $v_4 = [
            [],
            []
        ], $v_5 = 0, $v_6 = $v_3.length; $v_5 < $v_6; $v_5++) if ($v_3[$v_5].className === $v_1) if (!IsNull($v_3[$v_5].getAttribute("filtermenutype"))) {
            $v_4[0].push($v_3[$v_5]);
            $v_4[1].push($v_3[$v_5].getAttribute("filtermenutype"))
        }
        return $v_4
    },
    Print: function () {
        Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/_common/scripts/ribbonactions.js"), true);
        Mscrm.GridRibbonActions.print(this)
    },
    ExportToExcel: function () {
        Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/_common/scripts/ribbonactions.js"), true);
        Mscrm.GridRibbonActions.exportToExcel(this, this.get_entityTypeCode())
    },
    RunReport: function (instance, name, reportType, helpId) {
        Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/_common/scripts/ribbonactions.js"), true);
        Mscrm.GridRibbonActions.runReportFromAppGrid(this, this.get_selectedIds(), instance, name, reportType, helpId)
    },
    $2K_3: function ($p0, $p1) {
        this.remove_onRefresh(this.$$d_$2K_3);
        this.add_onRefresh(this.$$d_$2K_3);
        var $v_0 = $get(this.get_id() + "_divDataArea");
        if ($v_0.getAttribute("Expandable") === "1" && this.get_element().parentNode.className !== "ms-crm-Category-List") {
            this.remove_onRefresh(this.$$d_$4B_3);
            this.add_onRefresh(this.$$d_$4B_3);
            this.$2g_3 && $removeHandler(window, "resize", this.$$d_$t_3);
            $addHandler(window, "resize", this.$$d_$t_3);
            this.$2g_3 = true;
            if (IsNull(this.$C_3)) this.$C_3 = this.$3E_3();
            this.$C_3 && this.$2v_3();
            this.$t_3(null)
        }
    },
    SetDivGridParameter: function (parametersDiv, name, value) {
        if (!IsNull(parametersDiv) && !IsNull(name) && !IsNull(value)) {
            var $v_0 = $get(name, parametersDiv);
            !IsNull($v_0) && $v_0.setAttribute("value", value)
        }
    },
    $4_3: null,
    $K_3: 0,
    $1p_3: null,
    $7_3: null,
    $e_3: 0,
    $E_3: null,
    $1F_3: 0,
    $x_3: 0,
    $2c_3: false,
    $2b_3: false,
    $2e_3: 0,
    GetGridSpan: function () {
        var $v_0 = this.get_id() + "_span",
            $v_1 = this.get_element().parentNode;
        while (!IsNull($v_1) && $v_1.id !== $v_0) $v_1 = $v_1.parentNode;
        return $v_1
    },
    $2D_3: function ($p0, $p1) {
        var $v_0 = null,
            $v_1 = $p1;
        if (IsNull($v_1)) {
            if (IsNull(this.$E_3)) this.$E_3 = this.GetGridSpan();
            $v_1 = this.$E_3
        }
        if (!IsNull($v_1)) {
            $v_0 = $v_1.parentNode;
            while (!IsNull($v_0) && $v_0.tagName !== $p0) $v_0 = $v_0.parentNode
        }
        return $v_0
    },
    getGridTDElement: function () {
        return this.$2D_3("TD", null)
    },
    $41_3: function () {
        return this.$2D_3("TR", null)
    },
    getGridColumnPosition: function () {
        var $v_0 = 0;
        if (this.$4_3) {
            var $v_1 = XUI.Html.DomUtils.GetPrevSibling(this.$4_3);
            while ($v_1) {
                $v_0 += $v_1.colSpan;
                $v_1 = XUI.Html.DomUtils.GetPrevSibling($v_1)
            }
        }
        return $v_0
    },
    getGridRowPosition: function () {
        var $v_0 = 0;
        if (this.$1p_3) {
            var $v_1 = this.$1p_3;
            while (XUI.Html.DomUtils.GetPrevSibling($v_1)) {
                $v_0++;
                $v_1 = XUI.Html.DomUtils.GetPrevSibling($v_1)
            }
        }
        return $v_0
    },
    getGridParentTable: function () {
        return this.$2D_3("TABLE", null)
    },
    findFirstEmptyCellColInTableRow: function (rowNumber) {
        for (var $v_0 = 0; $v_0 < 8; $v_0++) if (this.$8_3[rowNumber][$v_0] === "-1") return $v_0;
        return 0
    },
    $40_3: function () {
        if (this.$8_3.length) return;
        this.$7_3 = this.getGridParentTable();
        if (this.$7_3) {
            if (!this.$7_3.rows[0].offsetHeight) return;
            var $v_0;
            this.$e_3 = this.$7_3.rows.length;
            for (var $v_6 = 0; $v_6 < this.$e_3; $v_6++) {
                this.$m_3[$v_6] = [null, null, null, null, null, null, null, null];
                this.$8_3[$v_6] = ["-1", "-1", "-1", "-1", "-1", "-1", "-1", "-1"]
            }
            for (var $v_1 = 0, $v_2 = 0, $v_3 = 0, $v_4 = 0, $v_5 = 0, $v_7 = 0; $v_7 < this.$e_3; $v_7++) {
                $v_0 = this.$7_3.rows[$v_7];
                for (var $v_8 = $v_0.offsetHeight, $v_9, $v_A = this.findFirstEmptyCellColInTableRow($v_7), $v_B, $v_C, $v_D, $v_E = 0; $v_E < $v_0.cells.length; $v_E++) {
                    $v_B = $v_0.cells[$v_E];
                    $v_C = this.isHiddenCell($v_B);
                    while (this.$8_3[$v_7][$v_A] !== "-1") {
                        $v_A++;
                        if ($v_A >= 8) {
                            $v_A = 8;
                            break
                        }
                    }
                    $v_9 = $v_B.colSpan;
                    var $v_F = $v_B.getAttribute("topTDid") === this.get_id() + "_TopTD";
                    if ($v_F) $v_D = this.$2e_3;
                    else $v_D = $v_B.rowSpan;
                    for (var $v_G = 0; $v_G < $v_D; $v_G++) for (var $v_H = 0; $v_H < $v_9; $v_H++) {
                        var $v_I;
                        if ($v_C) {
                            if (!$v_G && !$v_H) $v_I = "hc";
                            else $v_I = "hm";
                            this.$m_3[$v_7 + $v_G][$v_A + $v_H] = $v_B
                        } else if ($v_F) {
                            $v_I = this.get_id();
                            $v_1 = $v_7;
                            $v_2 = $v_E;
                            $v_4 = $v_D;
                            $v_5 = $v_9;
                            $v_3 = $v_A
                        } else if (!$v_G && !$v_H) $v_I = "c";
                        else $v_I = "m";
                        this.$8_3[$v_7 + $v_G][$v_A + $v_H] = $v_I
                    }
                    $v_A = $v_A + $v_9
                }
                this.$k_3[$v_7] = $v_8
            }
            this.insertHiddenCell(this.$7_3, $v_1, $v_2, $v_4, $v_5, $v_3)
        }
    },
    isHiddenCell: function (cell) {
        var $v_0 = true;
        if (!IsNull(cell.children)) {
            var $$t_4 = this;
            XUI.Html.DomUtils.ForEachChild(cell, function ($p1_0) {
                var $v_1 = !IsNull($p1_0) && !IsNull($p1_0.style) && $p1_0.style.display === "none";
                if (!$v_1) {
                    $v_0 = false;
                    return true
                }
                return false
            })
        }
        return !IsNull(cell.style) && cell.style.display === "none" || $v_0
    },
    getInitialRowSpan: function () {
        var $v_0 = 0,
            $v_1 = $get(this.get_id() + "_divDataArea");
        if (!IsNull($v_1)) {
            var $v_2 = parseInt($v_1.getAttribute("MaxRowsBeforeScroll"), 10);
            if (!IsNull($v_2)) $v_0 = $v_2
        }
        return $v_0
    },
    insertHiddenCell: function (gridParentTable, currentGridRowPosition, currentGridColPosition, currentGridRowSpan, currentGridColSpan, currentGridColPositionInControlMatrix) {
        if (this.$2b_3 || IsNull(gridParentTable) || IsNull(currentGridRowPosition)) return;
        for (var $v_0 = 1; $v_0 < currentGridRowSpan; $v_0++) {
            for (var $v_1 = gridParentTable.rows[currentGridRowPosition + $v_0], $v_2 = 0, $v_3 = 0; $v_3 < currentGridColPositionInControlMatrix; $v_3++) if (this.$8_3[currentGridRowPosition + $v_0][$v_3] === "c" || this.$8_3[currentGridRowPosition + $v_0][$v_3] === "hc") $v_2++;
            if (this.GetParameter("LayoutStyle") !== "PrintList") {
                var $v_4 = $v_1.insertCell($v_2);
                $v_4.colSpan = this.$1F_3;
                $v_4.innerHTML = '<DIV style="display:none" />';
                $v_4.insertBy = this.get_id();
                $v_4.style.display = "none";
                this.$m_3[currentGridRowPosition + $v_0][currentGridColPositionInControlMatrix] = $v_4
            }
        }
        this.$2b_3 = true
    },
    isLastControlOfColumn: function () {
        if (this.$8_3.length > 0) {
            this.$K_3 = this.getGridRowPosition();
            var $v_0 = this.getGridColumnPosition();
            this.$1F_3 = this.$4_3.colSpan;
            for (var $v_1 = this.$K_3 + 1; $v_1 < this.$8_3.length; $v_1++) for (var $v_2 = $v_0; $v_2 < $v_0 + this.$1F_3; $v_2++) if (!IsNull(this.$8_3[$v_1][$v_2]) && (this.$8_3[$v_1][$v_2] === "c" || this.$8_3[$v_1][$v_2] === "mc")) return false
        }
        return true
    },
    $2v_3: function () {
        if (this.get_element().parentNode.className === "ms-crm-Category-List") return;
        this.$E_3 = this.GetGridSpan();
        this.$4_3 = this.getGridTDElement();
        this.$1p_3 = this.$41_3();
        this.$x_3 = this.getGridColumnPosition();
        this.$K_3 = this.getGridRowPosition();
        this.$7_3 = this.getGridParentTable();
        if (!IsNull(this.$7_3)) {
            this.$e_3 = this.$7_3.rows.length;
            this.$2e_3 = this.$4_3.rowSpan;
            this.$1F_3 = this.$4_3.colSpan;
            this.$4_3.setAttribute("topTDid", this.get_id() + "_TopTD");
            this.$40_3();
            this.$2c_3 = this.isLastControlOfColumn()
        }
    },
    $Y_3: 0,
    $46_3: function () {
        var $v_0 = this.get_element().parentNode;
        while (!IsNull($v_0) && $v_0.className !== "ms-crm-Form-SubGrid-Layout" && $v_0.className !== "ms-crm-Form-SubGrid-Layout-Lite") {
            if ($v_0.className === "ms-crm-Form") return this.get_element().offsetHeight;
            $v_0 = $v_0.parentNode
        }
        var $v_1 = 0;
        if (IsNull($v_0)) $v_1 = this.get_element().offsetHeight - Mscrm.Utilities.getVerticalBoxPadding(this.get_element());
        else {
            var $v_2 = $v_0.parentNode;
            $v_1 = $v_2.offsetHeight - Mscrm.Utilities.getVerticalBoxPadding($v_2)
        }
        return $v_1
    },
    $3E_3: function () {
        var $v_0 = this.GetParameter("subgridAutoExpand") === "1";
        if (this.isLiteSubGrid()) return $v_0 && this.isLastControlOfColumn();
        return $v_0
    },
    $4B_3: function ($p0, $p1) {
        this.$t_3(null)
    },
    $2j_3: function () {
        var $v_0 = this.get_element().offsetHeight,
            $v_1 = $get(this.get_id() + "_divDataBody").offsetHeight,
            $v_2 = $v_0 - $v_1,
            $v_3 = $get(this.get_id() + "_visualizationCompositeControl"),
            $v_4 = !IsNull($v_3) && $v_3.offsetHeight > 0 ? this.$46_3() - $v_3.offsetHeight : 0;
        return $v_4 + $v_2
    },
    $t_3: function ($p0) {
        if (this.get_isDisposed()) return;
        if (this.get_element().parentNode.className === "ms-crm-Category-List" || this.get_element().offsetHeight <= 0) return;
        var $v_0 = $get(this.get_id() + "_divDataArea");
        if ($v_0.getAttribute("Expandable") !== "1") return;
        if (IsNull(this.$C_3)) this.$C_3 = this.$3E_3();
        if (!this.$Y_3) if (this.$C_3) {
            if (IsNull(this.$4_3)) this.$4_3 = this.getGridTDElement();
            if (!IsNull(this.$4_3)) {
                var $v_4 = this.$4_3.rowSpan;
                this.$4_3.rowSpan = 1;
                this.$Y_3 = this.$2j_3();
                this.$4_3.rowSpan = $v_4
            }
        } else this.$Y_3 = this.$2j_3();
        this.$C_3 && this.$2v_3();
        var $v_1 = parseInt($v_0.getAttribute("MaxRowsBeforeScroll"), 10),
            $v_2 = this.GetParameter("RecordsPerPage"),
            $v_3 = 0;
        if (!IsNull($v_2)) {
            $v_3 = parseInt($v_2, 10);
            if ($v_3 < $v_1 || this.isLiteSubGrid()) $v_1 = $v_3
        }
        if (!isNaN($v_1) && $v_1 > 0 && !IsNull(this.$0_3)) {
            var $v_5 = this.$0_3.get_numberOfRecords();
            if (IsNull($v_5)) return;
            var $v_6 = this.$0_3.$2a_3,
                $v_7 = this.$0_3.get_dataTableBody();
            if ($v_5 > 0 && !IsNull($v_7) && $v_7.rows.length > 0 && !IsNull(XUI.Html.GetComputedStyle($v_7.rows[0], "height"))) {
                var $v_D = $v_7.rows[0].offsetHeight;
                if ($v_D > 0) $v_6 = $v_D
            }
            var $v_8 = $find("crmForm"),
                $v_9 = $get("mainContainer"),
                $v_A;
            if (IsNull($v_8)) if (IsNull($v_9)) return;
            else $v_A = $v_9.offsetHeight;
            else $v_A = $v_8.GetViewportHeight();
            var $v_B = $v_1,
                $v_C = 45;
            $v_B = Math.floor(($v_A - $v_C - this.$Y_3) / $v_6);
            if ($v_B < 0) $v_B = 2;
            if (!$v_5 || $v_5 === 1) $v_5 = 2;
            this.$4M_3($v_1, $v_3, $v_B, $v_6, $v_5, $v_0)
        }
    },
    $3V_3: function () {
        return this.$C_3 && this.$2c_3
    },
    $4M_3: function ($p0, $p1, $p2, $p3, $p4, $p5) {
        var $v_0;
        if (this.$C_3) {
            $p0 = $p1;
            var $v_3 = this.$3V_3() ? $p2 < $p0 ? $p2 : $p0 : 2;
            $p5.style.overflowY = "auto";
            $v_0 = $p3 * ($p4 < $v_3 ? $p4 : $v_3)
        } else {
            $p5.style.overflowY = "auto";
            $v_0 = $p3 * $p0 + 1
        }
        if (this.isLiteSubGrid()) {
            $p5.style.overflowY = "hidden";
            $p5.style.overflowX = "auto"
        }
        $v_0 += 3;
        if ($p5.scrollWidth > $p5.clientWidth) $v_0 = $v_0 + 17;
        if ($v_0 <= 0) return;
        if (this.$C_3) {
            $p5.style.height = $v_0.toString() + "px";
            if (this.$3V_3()) {
                this.$E_3 = this.GetGridSpan();
                !IsNull(this.$E_3) && this.$5J_3($v_0 + this.$Y_3)
            }
        }
        $p5.style.height = $v_0.toString() + "px";
        var $v_1 = this.GetParameter("isGridHidden"),
            $v_2 = this.GetParameter("GridType");
        if ($v_2 === "SubGrid" && $v_1 !== "true") {
            if (IsNull(this.$E_3)) this.$E_3 = this.GetGridSpan();
            if (!IsNull(this.$E_3)) {
                var $v_4 = 0,
                    $v_5 = 0,
                    $v_6 = 0,
                    $v_7 = 0;
                if (!Mscrm.Utilities.isIE7OrIE7CompactMode()) {
                    var $v_8 = XUI.Html.DomUtils.GetFirstChild(this.$E_3);
                    if (XUI.Html.GetComputedStyle($v_8, "position") === "absolute") {
                        $v_4 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle($v_8, "top"), 0);
                        $v_5 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle($v_8, "bottom"), 0)
                    }
                    $v_6 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle($v_8, "borderTopWidth"), 0);
                    $v_7 = Mscrm.Utilities.parseInt(XUI.Html.GetComputedStyle($v_8, "borderBottomWidth"), 0)
                }
                if (this.$C_3 || this.isLiteSubGrid()) this.$E_3.parentNode.style.height = ($v_4 + $v_5 + $v_6 + $v_7 + $v_0 + this.$Y_3).toString() + "px";
                else this.$E_3.style.height = ($v_4 + $v_5 + $v_0 + this.$Y_3).toString() + "px"
            }
        }
    },
    $5J_3: function ($p0) {
        var $v_0 = 0,
            $v_1 = false;
        if (!this.$8_3.length || !this.$7_3) return;
        for (var $v_5 = 0; $v_5 < this.$7_3.rows.length; $v_5++) this.$k_3[$v_5] = this.$7_3.rows[$v_5].offsetHeight;
        this.$k_3[this.$K_3] = 1;
        var $v_2 = this.$k_3[this.$K_3],
            $v_3 = this.$8_3.length,
            $v_4 = 8;
        while ($p0 > $v_2 + $v_4) if (this.$K_3 + $v_0 < $v_3 - 1) {
            $v_2 = $v_2 + this.$k_3[this.$K_3 + $v_0];
            $v_0 = $v_0 + 1
        } else {
            $v_1 = true;
            $v_0 = $v_0 + 1;
            break
        }
        $p0 - $v_2 > 0 && $v_1 && this.setLastRowHeight($p0 - $v_2);
        !$v_1 && this.setLastRowToAuto();
        this.setCellsHidden(this.$K_3 + 1, this.$K_3 + $v_0 - 1, this.$x_3, this.$x_3 + this.$4_3.colSpan - 1, true);
        this.setCellsHidden(this.$K_3 + $v_0, this.$e_3 - 1, this.$x_3, this.$x_3 + this.$4_3.colSpan - 1, false);
        this.$4_3.rowSpan = $v_0
    },
    setCellsHidden: function (startRow, endRow, startCol, endCol, hidden) {
        this.$7_3 = this.getGridParentTable();
        for (var $v_0 = startRow; $v_0 <= endRow; $v_0++) for (var $v_1 = startCol; $v_1 <= endCol; $v_1++) if (!IsNull(this.$m_3[$v_0][$v_1])) this.$m_3[$v_0][$v_1].style.display = hidden ? "none" : ""
    },
    setLastRowHeight: function (height) {
        if (height > 0) this.$7_3.rows[this.$e_3 - 1].style.height = height.toString()
    },
    setLastRowToAuto: function () {
        this.$7_3.rows[this.$e_3 - 1].style.height = "100%"
    },
    $4x_3: function ($p0, $p1) {
        this.fireControlEvent("OnSelectionChange", $p1)
    },
    $4v_3: function ($p0, $p1) {
        this.fireControlEvent("OnBeforeFormLoad", $p1)
    },
    $3j_3: function () {
        var $v_0 = "<grid>",
            $$t_6 = this;
        XUI.Html.DomUtils.ForEachChild(this.$1X_3(), function ($p1_0) {
            if (isNullOrEmptyString($p1_0.getAttribute("value"))) $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + "/>";
            else $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">" + CrmEncodeDecode.CrmXmlEncode($p1_0.getAttribute("value")) + "</" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">";
            return false
        });
        $v_0 += "<parameters>";
        var $v_1 = this.$1W_3(),
            $v_2 = $get("viewid", $v_1),
            $v_3 = !!$v_2 && $v_2.getAttribute("value") !== "{00000000-0000-0000-0000-000000000000}",
            $$t_7 = this;
        XUI.Html.DomUtils.ForEachChild($v_1, function ($p1_0) {
            if ((IsNull($p1_0.getAttribute("requiredMask")) || !IsNull($p1_0.getAttribute("requiredMask")) && $p1_0.getAttribute("requiredMask") !== 1) && (!$v_3 || $p1_0.id !== "layoutXml")) if (isNullOrEmptyString($p1_0.getAttribute("value"))) $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + "/>";
            else $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">" + CrmEncodeDecode.CrmXmlEncode($p1_0.getAttribute("value")) + "</" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">";
            return false
        });
        return $v_0 + "</parameters></grid>"
    },
    $1O_3: 0,
    $1I_3: 0,
    add_onRefresh: function (value) {
        this.get_events().addHandler("OnRefresh", value)
    },
    remove_onRefresh: function (value) {
        this.get_events().removeHandler("OnRefresh", value)
    },
    add_onChangePage: function (value) {
        this.get_events().addHandler("OnChangePage", value)
    },
    remove_onChangePage: function (value) {
        this.get_events().removeHandler("OnChangePage", value)
    },
    add_onBeforeRefresh: function (value) {
        this.get_events().addHandler("OnBeforeRefresh", value)
    },
    remove_onBeforeRefresh: function (value) {
        this.get_events().removeHandler("OnBeforeRefresh", value)
    },
    get_refreshAsynchronous: function () {
        if (IsNull(this.$p_3)) this.$p_3 = this.GetProperty("refreshAsync") === "True";
        return this.$p_3
    },
    set_refreshAsynchronous: function (value) {
        this.$p_3 = value;
        return value
    },
    get_addContextualButton: function () {
        var $v_0 = this.get_id() + "_addImageButton";
        return $get($v_0)
    },
    $Z_3: null,
    $j_3: null,
    $o_3: true,
    $20_3: true,
    $1k_3: true,
    $1u_3: "<TABLE class='ms-crm-List-Message' morerecords='0'><TR><TD ID='GridMessage'>{0}</TD></TR></TABLE>",
    $2d_3: "<TABLE class='ms-crm-List-Message' morerecords='0'><TR><TD ID='GridLoadingMessage'><IMG alt='' src='/_imgs/AdvFind/progress.gif'><br>{0}</TD></TR></TABLE>",
    $1t_3: null,
    $q_3: false,
    $v_3: null,
    $1B_3: null,
    $1D_3: null,
    $12_3: 0,
    $1r_3: 0,
    $1H_3: null,
    $1z_3: true,
    $1G_3: true,
    $y_3: false,
    $10_3: null,
    $G_3: null,
    $0_3: null,
    $1C_3: 0,
    get_innerGrid: function () {
        return this.$0_3
    },
    set_innerGrid: function (value) {
        this.$0_3 = value;
        return value
    },
    get_pageNumber: function () {
        return this.$2F_3()
    },
    set_pageNumber: function (value) {
        this.$2T_3(value);
        return value
    },
    get_maximumSelectableRecords: function () {
        return this.$42_3()
    },
    get_version: function () {
        return "3.0"
    },
    get_autoHideHScroll: function () {
        return this.$1k_3
    },
    set_autoHideHScroll: function (value) {
        this.$1k_3 = value;
        var $v_0 = $get(this.get_id() + "_divDataArea");
        if (!this.$1k_3) $v_0.style.overflowX = "scroll";
        else $v_0.style.overflowX = "auto";
        return value
    },
    get_hasFocus: function () {
        return this.$y_3
    },
    set_hasFocus: function (value) {
        this.$y_3 = value;
        return value
    },
    get_gridXml: function () {
        return this.$1U_3(false)
    },
    get_layoutXml: function () {
        return this.$2i_3()
    },
    get_gridRefreshTime: function () {
        return this.$1t_3
    },
    get_gridRefreshSourceElement: function () {
        return this.$1H_3
    },
    set_gridRefreshSourceElement: function (value) {
        this.$1H_3 = value;
        return value
    },
    get_isRefreshing: function () {
        return this.$q_3
    },
    $4S_3: function () {
        this.SetProperty("pageNum", "1");
        this.$3C_3()
    },
    $53_3: function ($p0) {
        $p0.preventDefault();
        this.Refresh()
    },
    Refresh: function () {
        if (this.isLiteSubGrid()) {
            var $v_0 = this.getFormData(),
                $v_1 = $v_0.get_recordId(),
                $v_2 = $v_0.get_isDisabled(),
                $v_3 = this.$2E_3(),
                $v_4 = $get(this.get_id() + "_quickFindControl"),
                $v_5 = $get(this.get_id() + "_addImageButton");
            if (isNullOrEmptyString($v_1) || isNullOrEmptyString($v_3)) {
                $v_5 && this.$1g_3($v_5, "none");
                $v_4 && this.$1g_3($v_4, "none");
                var $v_6 = window.LOCID_EMPTY_GRID_MESSAGE_REFRESH;
                $get(this.get_id() + "_divDataArea").innerHTML = '<div class="ms-crm-grid-Title-Data-Lite">' + CrmEncodeDecode.CrmHtmlEncode($v_6) + '</div><div style="height: 16px;></div>';
                return
            } else {
                Mscrm.GridControl.setElementParameter(this.get_element(), "oId", $v_1);
                Mscrm.GridControl.setElementParameter(this.get_element(), "oType", $v_3);
                $v_5 && !$v_2 && this.$1g_3($v_5, "block");
                $v_4 && this.$1g_3($v_4, "inline")
            }
        }
        this.$3N_3(false)
    },
    $1g_3: function ($p0, $p1) {
        var $v_0 = $find(this.get_id() + "_span");
        if ($p0.style.display.toLowerCase() !== $p1.toLowerCase()) {
            $p0.style.display = $p1;
            $v_0.setGridTopStyle()
        }
    },
    $2E_3: function () {
        var $v_0 = $get(this.get_id() + "_span"),
            $v_1 = null;
        if ($v_0) $v_1 = $($v_0);
        var $v_2 = $v_1.tmplItem(),
            $v_3 = $v_2.data,
            $v_4 = null;
        if ($v_3) $v_4 = $v_3["_entity"];
        var $v_5 = null;
        if (!IsNull($v_4)) $v_5 = $v_4.TypeCode.toString();
        return $v_5
    },
    $3N_3: function ($p0) {
        if (!this.$v_3) this.$v_3 = new Mscrm.RemoteCommandXml("AppGridWebService", "Refresh");
        this.$v_3.setContent(this.$1U_3($p0));
        this.$2B_3($p0, this.$v_3)
    },
    $2B_3: function ($p0, $p1) {
        Mscrm.Utilities.addControlMarker(this.get_id(), "Subgrid", "StartLoadTimestamp", (new Date).getTime().toString());
        if (IsNull($p0)) $p0 = false;
        this.$q_3 = true;
        var $v_0 = new Mscrm.BeforeRefreshEventArgs;
        this.fireControlEvent("OnBeforeRefresh", $v_0);
        if ($v_0.breakEvent) {
            this.$q_3 = false;
            return
        }
        this.$o_3 && this.DisablePaging();
        this.$2n_3();
        if (this.get_refreshAsynchronous()) {
            $p1.execute(this.$$d_$3H_3);
            this.ShowLoadingMessage();
            this.$1h_3(false)
        } else {
            this.ShowLoadingMessage();
            this.$1h_3(false);
            var $$t_3 = this;
            window.setTimeout(function () {
                $$t_3.$52_3($p1)
            }, 1)
        }
    },
    CancelRefresh: function () {
        this.$v_3.abort();
        this.$2r_3();
        this.$2R_3(String.format(this.$1u_3, window.LOCID_REFRESH_GRID_CANCELLED), true);
        this.$q_3 = false
    },
    ShowLoadingMessage: function () {
        var $v_0 = window.LOCID_LOADING_GRID_DATA;
        if (this.isLiteSubGrid()) {
            $v_0 = window.LOCID_LOADING_GRID_DATA_REFRESH;
            this.$2d_3 = "<TABLE class='ms-crm-List-Message-Lite' morerecords='0'><TR><TD ID='GridLoadingMessage' class='ms-crm-List-MessageText-Lite'>{0}<IMG alt='' src='/_imgs/grid/HorzPreloader_5x55.gif'></TD></TR></TABLE>"
        }
        if (IsNull($v_0)) $v_0 = window["LOCID_LOADING_" + this.get_id().toUpperCase()];
        if (IsNull(this.$10_3)) {
            var $v_1 = $get(this.get_id() + "_divDataArea");
            this.$10_3 = $v_1.style.overflowY;
            if (this.isLiteSubGrid()) $v_1.style.overflowY = "hidden";
            else $v_1.style.overflowY = "visible"
        }
        $get(this.get_id() + "_divDataArea").innerHTML = String.format(this.$2d_3, CrmEncodeDecode.CrmHtmlEncode($v_0))
    },
    $1U_3: function ($p0) {
        if (IsNull($p0)) $p0 = false;
        var $v_0 = "<grid>",
            $$t_8 = this;
        XUI.Html.DomUtils.ForEachChild(this.$1X_3(), function ($p1_0) {
            var $v_3 = $p1_0.getAttribute("value");
            if (isNullOrEmptyString($v_3)) $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + "/>";
            else $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">" + CrmEncodeDecode.CrmXmlEncode($v_3) + "</" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">";
            return false
        });
        if (IsNull($p0) || !$p0) $v_0 += "<refreshCalledFromRefreshButton>1</refreshCalledFromRefreshButton>";
        if (!IsNull(this.$0_3)) {
            $v_0 += "<totalrecordcount>" + CrmEncodeDecode.CrmXmlEncode(this.$0_3.get_totalRecordCount().toString()) + "</totalrecordcount>";
            $v_0 += "<allrecordscounted>" + (this.$0_3.get_allRecordsCounted() ? "true" : "false") + "</allrecordscounted>"
        }
        $v_0 += "<returntotalrecordcount>" + (this.$1z_3 ? "true" : "false") + "</returntotalrecordcount>";
        $v_0 += "<getParameters>";
        var $v_1 = this.GetParameter("GridType"),
            $v_2 = this.GetParameter("fetchXmlForFilters");
        if (!IsNull($v_1) && $v_1 === "SubGrid" && IsNull($v_2)) $v_0 += "getFetchXmlForFilters";
        $v_0 += "</getParameters>";
        $v_0 += "<parameters>";
        var $$t_9 = this;
        XUI.Html.DomUtils.ForEachChild(this.$1W_3(), function ($p1_0) {
            if (IsNull($p1_0.getAttribute("requiredMask")) || !IsNull($p1_0.getAttribute("requiredMask")) && $p1_0.getAttribute("requiredMask") !== 1) {
                var $v_4 = $p1_0.getAttribute("value");
                if ($v_4 && !$v_4.length) $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + "/>";
                else $v_0 += "<" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">" + CrmEncodeDecode.CrmXmlEncode($v_4) + "</" + CrmEncodeDecode.CrmXmlEncode($p1_0.id) + ">"
            }
            return false
        });
        $v_0 += "</parameters>";
        $v_0 += this.$2i_3();
        $v_0 += "</grid>";
        return $v_0
    },
    $2i_3: function () {
        var $v_0 = "",
            $v_1 = 0,
            $v_2 = this.get_id() + "_gridBar",
            $v_3 = this.get_id() + "_gridBarCols";
        $v_0 += "<columns>";
        var $v_4 = $get($v_2),
            $v_5 = $get($v_3);
        if ($v_4) {
            var $v_6 = $v_4.rows[0].cells,
                $v_7 = $v_6.length;
            for ($v_1 = 0; $v_1 < $v_7; $v_1++) {
                var $v_8 = $v_6[$v_1];
                if ($v_8.getAttribute("field")) {
                    $v_0 += "<column width=";
                    if ($v_8.getAttribute("isHidden")) $v_0 += '"0" isHidden="true"';
                    else {
                        var $v_9 = $v_8.scrollWidth;
                        if (!$v_9) {
                            var $v_A = XUI.Html.DomUtils.GetChildElementAt($v_5, $v_1).getAttribute("width");
                            if (!isNullOrEmptyString($v_A)) $v_9 = parseInt($v_A, 10)
                        }
                        $v_0 += '"' + $v_9 + '" isHidden="false"'
                    }
                    if ($v_8.getAttribute("metadataDisabled")) $v_0 += ' isMetadataBound="false"';
                    else $v_0 += ' isMetadataBound="true"';
                    if ($v_8.className === "ms-crm-List-Sortable") $v_0 += ' isSortable="true"';
                    else $v_0 += ' isSortable="false"';
                    $v_0 += ' label="' + CrmEncodeDecode.CrmXmlAttributeEncode($v_8.getAttribute("displayLabel")) + '"';
                    $v_0 += ' fieldname="' + CrmEncodeDecode.CrmXmlAttributeEncode($v_8.getAttribute("fieldname")) + '"';
                    $v_0 += ' entityname="' + CrmEncodeDecode.CrmXmlAttributeEncode($v_8.getAttribute("entityname")) + '"';
                    if ($v_8.getAttribute("renderertype")) $v_0 += ' renderertype="' + CrmEncodeDecode.CrmXmlAttributeEncode($v_8.getAttribute("renderertype")) + '"';
                    if ($v_8.getAttribute("relationshipname")) $v_0 += ' relationshipname="' + CrmEncodeDecode.CrmXmlAttributeEncode($v_8.getAttribute("relationshipname")) + '"';
                    $v_0 += ">" + CrmEncodeDecode.CrmXmlEncode($v_8.getAttribute("field")) + "</column>"
                }
            }
        }
        $v_0 += "</columns>";
        return $v_0
    },
    $52_3: function ($p0) {
        var $v_0 = $p0.execute();
        this.$3H_3($v_0, null)
    },
    $1h_3: function ($p0) {
        if (this.$17_3()) this.get_addContextualButton().className = $p0 ? "ms-crm-ImageStrip-addButton" : "ms-crm-ImageStrip-addButtonDisable"
    },
    $3H_3: function ($p0, $p1) {
        this.$2r_3();
        this.$1h_3(true);
        var $$t_2 = this;
        window.setTimeout(function () {
            $$t_2.$4z_3($p0, $p1)
        }, 1)
    },
    $4z_3: function ($p0, $p1) {
        if ($p0.get_success() && !isNullOrEmptyString($p0.get_returnValue())) {
            var $v_1 = XUI.Xml.LoadXml($p0.get_returnValue());
            this.SetProperty("pagingCookie", XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_1, "gridXml/pagingCookie", null)));
            this.$2R_3(XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_1, "gridXml/gridHtml", null)), true);
            var $v_2 = new Array(3);
            $v_2[0] = "effectiveFetchXml";
            $v_2[1] = "isFetchXmlNotFinal";
            $v_2[2] = "fetchXmlForFilters";
            for (var $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
                var $v_4 = XUI.Xml.SelectSingleNode($v_1, String.format("gridXml/gridParams/div[@id='{0}']", $v_2[$v_3]), null);
                $v_4 && this.SetParameter(XUI.Xml.GetText($v_4.attributes.getNamedItem("id")), XUI.Xml.GetText($v_4))
            }
        } else {
            if (this.isLiteSubGrid()) this.$1u_3 = "<TABLE class='ms-crm-List-Message-Lite' morerecords='0'><TR><TD ID='GridMessage' class='ms-crm-List-MessageText-Lite'>{0}</TD></TR></TABLE>";
            this.$2R_3(String.format(this.$1u_3, window.LOCID_LOADING_GRID_FAILED), true)
        }
        this.fireControlEvent("OnRefresh", Sys.EventArgs.Empty);
        var $v_0 = $find(this.get_id());
        if (!IsNull(Mscrm.PageManager) && !IsNull(Mscrm.PageManager.get_instance()) && Mscrm.PageManager.isFlatUIPage()) if (!IsNull($v_0)) {
            var $v_5 = {};
            $v_5["gridRefreshSourceElement"] = this.$1H_3;
            this.$1H_3 = null;
            $v_0.raiseEvent(Mscrm.ScriptEvents.OnGridRefresh, $v_5)
        }
        this.$4u_3($v_0, $p1);
        this.$1a_3(null);
        this.$1t_3 = new Date;
        this.$q_3 = false;
        Mscrm.Utilities.addControlMarker(this.get_id(), "Subgrid", "FinishLoadTimestamp", (new Date).getTime().toString())
    },
    $4u_3: function ($p0, $p1) {
        if (IsNull($p0)) return;
        if (!this.isLiteSubGrid()) return;
        var $v_0 = $p0.GetParameter("deleteAction").toString();
        if (isNullOrEmptyString($v_0)) return;
        if (!IsNull($p1)) {
            var $v_1 = {};
            $v_1["command"] = 1;
            $v_1["recordCount"] = this.$0_3.get_totalRecordCount().toString();
            $v_1["viewId"] = this.GetParameter("viewid");
            $v_1["entitytypecode"] = this.get_entityTypeCode();
            $v_1["relationshipName"] = this.GetParameter("relName");
            $p0.raiseEvent(Mscrm.ScriptEvents.GridContextualAction, $v_1)
        }
    },
    $3c_3: function () {
        var $v_0 = $get(this.get_id() + "_AppGridFilterSelector");
        !IsNull($v_0) && Mscrm.CrmUIComponent.crmCreate(Mscrm.AppGridFilterSelector, null, null, null, $v_0);
        var $v_1 = $get("AppGridFilterContainer");
        !IsNull($v_1) && Mscrm.CrmUIComponent.crmCreate(Mscrm.AppGridFilterContainer, null, null, null, $v_1)
    },
    $3d_3: function () {
        var $v_0 = $get(this.get_id() + "_JumpBar");
        !IsNull($v_0) && Mscrm.CrmUIComponent.crmCreate(Mscrm.AppGridJumpBar, null, null, null, $v_0)
    },
    $3e_3: function () {
        var $v_0 = "#titleContainer_";
        if (IsNull(Type.parse("window.jQuery"))) return;
        var $v_1 = $($v_0 + this.get_element().id);
        if (!$v_1.length) return;
        var $v_2 = $("#quick_add_hidden_div", $v_1);
        if (!IsNull($v_2) && $v_2.length > 0) {
            var $v_3 = $("#_" + this.get_element().id + "[dummy-data-attributename]", $v_2).first();
            if (!IsNull($v_3) && $v_3.length > 0) {
                var $v_4 = {};
                $v_4["AttributeId"] = this.get_element().id;
                $v_4["TargetEntityType"] = $v_2.attr("TargetEntityType");
                $v_4["ParentGridId"] = this.get_id();
                var $v_5 = $v_2.attr("ConnectionToEntity");
                $v_4["ConnectionToEntity"] = $v_5;
                $v_4["ConnectionToCategory"] = $v_2.attr("ConnectionToCategory");
                Mscrm.CrmUIComponent.crmCreate(Mscrm.QuickAddFlyOut, $v_4, null, null, this.get_addContextualButton());
                if ($v_5 === Mscrm.EntityLogicalNames.Contact || $v_5 === Mscrm.EntityLogicalNames.SystemUser) {
                    var $v_6 = {};
                    $v_6["ParentGridId"] = this.get_id();
                    $v_6["ConnectionToCategory"] = $v_2.attr("ConnectionToCategory");
                    Mscrm.CrmUIComponent.crmCreate(Mscrm.InlineEditDropDownFlyOut, $v_6, null, null, this.get_addContextualButton())
                }
            }
        }
    },
    $25_3: function () {
        var $v_0 = $get("gridBodyTable", this.get_element());
        if (!IsNull($v_0)) {
            var $v_1 = {};
            $v_1["parentGridControl"] = this;
            var $v_2 = {};
            $v_2["onSelectionChange"] = this.$$d_$4x_3;
            $v_2["onBeforeFormLoad"] = this.$$d_$4v_3;
            Mscrm.CrmUIComponent.crmCreate(Mscrm.AppGridDefaultDataControl, $v_1, $v_2, null, $v_0)
        }
    },
    $2n_3: function () {
        if (!IsNull(this.$0_3)) {
            this.$0_3.remove_onSelectionChange(this.$$d_$4x_3);
            this.$0_3.remove_onBeforeFormLoad(this.$$d_$4v_3);
            this.$0_3.dispose();
            Sys.Application.removeComponent(this.$0_3);
            this.$0_3 = null
        }
    },
    $2R_3: function ($p0, $p1) {
        var $v_0 = this.GetParameter("expandable"),
            $v_1 = this.GetParameter("maxrowsbeforescroll");
        if ($v_0 === "1" && !parseInt($v_1, 10)) $p0 = $p0 + '<div style="height: 16px;"></div>';
        $get(this.get_id() + "_divDataArea").innerHTML = $p0;
        this.$25_3();
        this.$3B_3($p1)
    },
    $2r_3: function () {
        if (!IsNull(this.$10_3)) {
            var $v_0 = $get(this.get_id() + "_divDataArea");
            if (!IsNull($v_0)) {
                $v_0.style.overflowY = this.$10_3;
                this.$10_3 = null
            }
        }
    },
    ClearPagingCookie: function () {
        this.SetProperty("pagingCookie", "")
    },
    $3C_3: function () {
        var $v_0 = $get(this.get_id() + "_PageInfo"),
            $v_1 = $get(this.get_id() + "_RecordSelectInfo"),
            $v_2 = null;
        if (!IsNull($v_0)) $v_2 = $get("_prevPageImg", $v_0);
        this.$o_3 = !IsNull($v_2);
        if (this.$o_3) this.$1C_3 = $v_2.tabIndex;
        if (!IsNull($v_1)) {
            var $v_6 = XUI.Html.GetText($v_1);
            this.$20_3 = !isNullOrEmptyString($v_6)
        } else this.$20_3 = false;
        this.$p_3 = this.GetProperty("refreshAsync") === "True";
        this.$1G_3 = this.GetParameter("InnerGridDisabled") !== "1" ? true : false;
        if (this.GetParameter("LoadOnDemand") === "1") {
            var $v_7 = $find("crmForm");
            if (!IsNull($v_7)) {
                var $v_8 = $v_7.GetTab(this.get_element(), false);
                if (!IsNull($v_8)) {
                    var $v_9 = $find($v_8.id);
                    if ($v_9.get_displayState() === Xrm.TabDisplayState.expanded) this.$3G_3();
                    else $v_9.add_tabStateChange(this.$$d_$37_3)
                }
            } else if (this.isLiteSubGrid()) {
                var $$t_E = this;
                Mscrm.GridControl.handleTabStateForReadForm(this, function ($p1_0) {
                    if (IsNull($p1_0.data)) return;
                    var $v_A = $p1_0.data;
                    if (!("tabExpander" in $v_A)) return;
                    if (!("controlObject" in $v_A)) return;
                    var $v_B = $v_A["controlObject"],
                        $v_C = Mscrm.GridControl.getExpanderClassName($v_A["tabExpander"]);
                    if (!isNullOrEmptyString($v_C) && $v_C.endsWith("_down") && $v_B.GetParameter("LoadOnDemand") === "1") {
                        $v_B.SetParameter("LoadOnDemand", "0");
                        $v_B.Refresh()
                    }
                })
            }
        }
        if (this.$o_3) if (this.$1G_3) {
            $addHandler($v_2, "click", this.$$d_$4r_3);
            $addHandler($get("_nextPageImg", $v_0), "click", this.$$d_$4Y_3);
            $addHandler($get("fastRewind", $v_0), "click", this.$$d_$3y_3)
        } else this.DisablePaging();
        var $v_3 = $get("refreshButtonLink", this.get_element());
        !IsNull($v_3) && $addHandler($v_3, "click", this.$$d_$53_3);
        var $v_4 = $get(this.get_id() + "_divDataArea");
        !IsNull($v_4) && $addHandler($v_4, "scroll", this.$$d_$1a_3);
        var $v_5 = $get(this.get_id() + "_findCriteria");
        if (!IsNull($v_5)) $v_5.disabled = !this.$1G_3;
        this.$3A_3(true);
        this.$3B_3(true);
        this.HandleGridResize();
        this.$1t_3 = new Date
    },
    $37_3: function ($p0, $p1) {
        if ($p1.get_displayState() === Xrm.TabDisplayState.expanded) {
            $p0.remove_tabStateChange(this.$$d_$37_3);
            this.$3G_3()
        }
    },
    $3G_3: function () {
        if (this.GetParameter("LoadOnDemand") === "1") {
            this.SetParameter("LoadOnDemand", "0");
            this.Refresh()
        }
    },
    $3A_3: function ($p0) {
        if ($p0) this.$G_3 = null;
        var $v_0 = this.get_id() + "_gridBar",
            $v_1 = $get($v_0);
        if ($v_1) {
            var $v_2 = $v_1.rows[0];
            $addHandler($v_2, "keydown", this.$$d_$34_3);
            $addHandler($v_2, "click", this.$$d_$31_3);
            $addHandler($v_2, "mouseover", this.$$d_$4E_3);
            $addHandler($v_2, "mouseout", this.$$d_$4D_3)
        }
    },
    $3B_3: function ($p0) {
        var $v_0 = $get("gridBodyTable", this.get_element());
        if (!IsNull($v_0)) this.$0_3 = $v_0.control;
        if (typeof $p0 === "undefined") $p0 = true;
        this.$1G_3 && $p0 && executeFunctionDeferred(this.$$d_$5O_3, false, false);
        if (!this.$0_3) return;
        this.$20_3 && this.$0_3.add_onSelectionChange(this.$$d_$3Y_3);
        this.$3Y_3(null, null)
    },
    $3Y_3: function ($p0, $p1) {
        this.$5Q_3(this.$0_3.get_selectedRecords().length, this.$0_3.get_numberOfRecords(), this.$0_3.get_moreRecords(), this.$0_3.get_totalRecordCount(), this.$0_3.get_allRecordsCounted())
    },
    $5Q_3: function ($p0, $p1, $p2, $p3, $p4) {
        var $v_0 = 0,
            $v_1 = 0,
            $v_2 = this.$45_3();
        if ($p1) {
            var $v_A = this.$2F_3();
            if (IsNull($v_A) || $v_A === -1) $v_A = 1;
            $v_0 = ($v_A - 1) * $v_2 + 1;
            $v_1 = ($v_A - 1) * $v_2 + $p1
        }
        if ($p3 >= 0) if ($v_1 > $p3 || $p1 < $v_2) {
            $p3 = $v_1;
            $p4 = !$p2
        }
        var $v_3 = $get(this.get_element().id + "_StatusBar");
        if (!IsNull($v_3) && ($v_3.className === "ms-crm-List-StatusBar-Lite" || $v_3.className === "ms-crm-List-StatusBar-Ex-Lite")) {
            if ($p3 > $v_2) $v_3.style.visibility = "visible";
            else if (!this.$0_3.get_moreRecords()) $v_3.style.visibility = "hidden";
            this.$36_3()
        }
        var $v_4 = $get(this.get_element().id + "_FirstItem");
        !IsNull($v_4) && XUI.Html.SetText($v_4, $v_0 + "");
        var $v_5 = $get(this.get_element().id + "_LastItem");
        !IsNull($v_5) && XUI.Html.SetText($v_5, $v_1 + "");
        var $v_6 = $get(this.get_element().id + "_ItemsTotal");
        !IsNull($v_6) && XUI.Html.SetText($v_6, this.$47_3($p3, $p4));
        var $v_7 = $get(this.get_element().id + "_TotalCountInfo");
        if (!IsNull($v_7)) $v_7.style.display = $p3 < 0 ? "none" : "inline";
        var $v_8 = $get(this.get_element().id + "_ItemsSelected");
        !IsNull($v_8) && XUI.Html.SetText($v_8, $p0.toString());
        var $v_9 = $get("chkAll", this.get_element());
        if (!IsNull($v_9)) {
            $v_9.checked = $p0 === $p1 && $p1 > 0;
            $v_9.disabled = !$p1
        }
    },
    $5O_3: function () {
        if (this.$o_3) {
            var $v_0 = false;
            if (!this.$0_3) $v_0 = false;
            else $v_0 = this.$0_3.get_moreRecords();
            var $v_1 = false,
                $v_2 = false,
                $v_3 = "0",
                $v_4 = $v_0 ? "1" : "0",
                $v_5 = "pointer",
                $v_6 = "pointer",
                $v_7 = this.GetProperty("pageNum"),
                $v_8 = $get(this.get_id() + "_PageInfo");
            XUI.Html.SetText($get("_PageNum", $v_8), $v_7);
            if (parseInt($v_7, 10) > 1) $v_3 = "1";
            else {
                $v_5 = "auto";
                $v_2 = true
            }
            if (!$v_0) {
                $v_6 = "auto";
                $v_1 = true
            }
            var $v_9 = $get("_prevPageImg", $v_8);
            if (!IsNull($v_9)) {
                var $v_C = XUI.Html.DomUtils.GetFirstChild($v_9);
                $v_9.style.cursor = $v_5;
                var $v_D = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_L" + $v_3 + ".gif"));
                $v_C.src = $v_D.source;
                $v_C.className = $v_D.cssClass;
                if ($v_2) {
                    $v_C.setAttribute("disabled", "disabled");
                    $v_9.setAttribute("disabled", "disabled");
                    $v_9.tabIndex = -1
                } else {
                    $v_C.removeAttribute("disabled");
                    $v_9.removeAttribute("disabled");
                    $v_9.tabIndex = this.$1C_3
                }
                this.SetLinkAttributes($v_9, $v_2);
                this.$u_3($v_9, $v_2)
            }
            var $v_A = $get("fastRewind", $v_8);
            if (!IsNull($v_A)) {
                var $v_E = XUI.Html.DomUtils.GetFirstChild($v_A);
                $v_A.style.cursor = $v_5;
                var $v_F = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_FL" + $v_3 + ".gif"));
                $v_E.src = $v_F.source;
                $v_E.className = $v_F.cssClass;
                if ($v_2) {
                    $v_E.setAttribute("disabled", "disabled");
                    $v_A.setAttribute("disabled", "disabled");
                    $v_A.tabIndex = -1
                } else {
                    $v_E.removeAttribute("disabled");
                    $v_A.removeAttribute("disabled");
                    $v_A.tabIndex = this.$1C_3
                }
                this.SetLinkAttributes($v_A, $v_2);
                this.$u_3($v_A, $v_2)
            }
            var $v_B = $get("_nextPageImg", $v_8);
            if (!IsNull($v_B)) {
                var $v_G = XUI.Html.DomUtils.GetFirstChild($v_B);
                $v_B.style.cursor = $v_6;
                var $v_H = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_R" + $v_4 + ".gif"));
                $v_G.src = $v_H.source;
                $v_G.className = $v_H.cssClass;
                if ($v_1) {
                    $v_G.setAttribute("disabled", "disabled");
                    $v_B.setAttribute("disabled", "disabled");
                    $v_B.tabIndex = -1
                } else {
                    $v_G.removeAttribute("disabled");
                    $v_B.removeAttribute("disabled");
                    $v_B.tabIndex = this.$1C_3
                }
                this.SetLinkAttributes($v_B, $v_1);
                this.$u_3($v_B, $v_1)
            }
        }
    },
    SetLinkAttributes: function (pageImage, isDisabled) {
        if (isDisabled) {
            pageImage.removeAttribute("href");
            $removeHandler(pageImage, "click", Mscrm.GridControl.$2p)
        } else {
            $addHandler(pageImage, "click", Mscrm.GridControl.$2p);
            pageImage.href = "javascript:onclick();";
            return false
        }
    },
    DisablePaging: function () {
        var $v_0 = $get("_prevPageImg", this.get_element()),
            $v_1 = XUI.Html.DomUtils.GetFirstChild($v_0);
        $v_0.style.cursor = "auto";
        var $v_2 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_L0.gif"));
        $v_1.src = $v_2.source;
        $v_1.className = $v_2.cssClass;
        if (window.LOCID_UI_DIR === "RTL") {
            Mscrm.Utilities.cancelElementFlipping($v_1);
            Mscrm.Utilities.flipElementHorizontally($v_1)
        }
        $v_1.setAttribute("disabled", "disabled");
        $v_0.setAttribute("disabled", "disabled");
        this.$u_3($v_0, true);
        var $v_3 = $get("fastRewind", this.get_element()),
            $v_4 = XUI.Html.DomUtils.GetFirstChild($v_3);
        $v_3.style.cursor = "auto";
        var $v_5 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_FL0.gif"));
        $v_4.src = $v_5.source;
        $v_4.className = $v_5.cssClass;
        if (window.LOCID_UI_DIR === "RTL") {
            Mscrm.Utilities.cancelElementFlipping($v_4);
            Mscrm.Utilities.flipElementHorizontally($v_4)
        }
        $v_4.setAttribute("disabled", "disabled");
        $v_3.setAttribute("disabled", "disabled");
        this.$u_3($v_3, true);
        var $v_6 = $get("_nextPageImg", this.get_element()),
            $v_7 = XUI.Html.DomUtils.GetFirstChild($v_6);
        $v_6.style.cursor = "auto";
        var $v_8 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/grid/page_R0.gif"));
        $v_7.src = $v_8.source;
        $v_7.className = $v_8.cssClass;
        if (window.LOCID_UI_DIR === "RTL") {
            Mscrm.Utilities.cancelElementFlipping($v_7);
            Mscrm.Utilities.flipElementHorizontally($v_7)
        }
        $v_7.setAttribute("disabled", "disabled");
        $v_6.setAttribute("disabled", "disabled");
        this.$u_3($v_6, true)
    },
    $u_3: function ($p0, $p1) {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild($p0);
        if (!IsNull($v_0)) if ($p1) {
            $v_0.alt = "";
            $v_0.title = ""
        } else if (isNullOrEmptyString($v_0.alt) && !IsNull($v_0.getAttribute("tempToolTip"))) {
            $v_0.alt = $v_0.getAttribute("tempToolTip").toString();
            $v_0.title = $v_0.alt
        }
    },
    HandleGridResize: function (domEvent) {
        this.$4n_3();
        this.$1a_3(domEvent);
        this.$36_3()
    },
    $1a_3: function ($p0) {
        var $v_0 = $get(this.get_id() + "_gridBodyContainer"),
            $v_1 = $get("fixedrow", $v_0),
            $v_2 = $get(this.get_id() + "_divDataArea");
        !IsNull($v_1) && !IsNull($v_2) && this.$5M_3($v_1, $v_2)
    },
    $36_3: function () {
        var $v_0 = $get("gridStatusBar", this.get_element()),
            $v_1 = $get(this.get_id() + "_PageInfo"),
            $v_2 = $get("page_R0", $v_1),
            $v_3 = $get(this.get_id() + "_RecordSelectInfo"),
            $v_4 = $get(this.get_id() + "_RecordSelectEndMarker"),
            $v_5 = $get("fastRewind", $v_1);
        if (IsNull($v_0) || IsNull($v_3) || IsNull($v_1) || IsNull($v_2)) return;
        var $v_6 = $v_0.offsetWidth,
            $v_7 = $get(this.get_id() + "_ItemsSelectedInfo"),
            $v_8 = $v_3.style,
            $v_9 = null;
        if ($v_7) $v_9 = $v_7.style;
        if ($v_8.display !== "none" && !this.$12_3) if (window.LOCID_UI_DIR !== "RTL") {
            this.$12_3 = 2 * $v_4.offsetLeft;
            if ($v_7) this.$1r_3 = 2 * $v_7.offsetLeft
        } else {
            this.$12_3 = 3 * $v_5.offsetLeft;
            this.$1r_3 = 2 * $v_5.offsetLeft
        }
        if ($v_6 <= this.$12_3) {
            if ($v_6 <= this.$1r_3) {
                if ($v_7) if ($v_9.display === "none") $v_9.display = "inline";
                if ($v_8.display !== "none") $v_8.display = "none"
            } else {
                if ($v_7) if ($v_9.display !== "none") $v_9.display = "none";
                if ($v_8.display === "none") $v_8.display = "inline"
            }
            return
        }
        if ($v_2.offsetLeft + $v_2.offsetWidth >= $v_1.offsetWidth) {
            $v_8.display = "none";
            this.$12_3 = $v_6;
            return
        }
        if ($v_8.display === "none") $v_8.display = "inline";
        if ($v_7) if ($v_9.display === "none") $v_9.display = "inline"
    },
    $4U_3: function ($p0) {
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
            var $v_0 = document.documentMode;
            if (IsNull($v_0)) $v_0 = Sys.Browser.version;
            if ($p0.scrollLeft > 0 || $v_0 <= 7) return false;
            return true
        }
        return Mscrm.Utilities.isFirefox()
    },
    $5M_3: function ($p0, $p1) {
        var $v_0 = 0;
        if (window.LOCID_UI_DIR === "RTL") {
            var $v_1 = $p1.scrollLeft,
                $v_2 = this.$4U_3($p0);
            if ($v_2) $v_0 = -Math.abs($p1.scrollLeft);
            else $v_0 = $p1.scrollLeft + $p1.clientWidth - $p1.scrollWidth;
            if ($v_0 !== parseInt($p0.style.marginRight, 10)) {
                $p0.style.marginRight = $v_0 + "px";
                $p1.scrollLeft = $v_1
            }
        } else {
            $v_0 = $p0.scrollLeft - $p1.scrollLeft;
            if ($v_0 !== parseInt($p0.style.marginLeft, 10)) {
                $p0.style.marginLeft = $v_0 + "px";
                $p1.scrollLeft = Math.abs($v_0)
            }
        }
    },
    $4r_3: function ($p0) {
        var $v_0 = $get("_prevPageImg", this.get_element()).getAttribute("disabled");
        (IsNull($v_0) || !$v_0) && this.$2N_3(parseInt(this.GetProperty("pageNum"), 10) - 1)
    },
    $4Y_3: function ($p0) {
        var $v_0 = $get("_nextPageImg", this.get_element()).getAttribute("disabled");
        (IsNull($v_0) || !$v_0) && this.$2N_3(parseInt(this.GetProperty("pageNum"), 10) + 1)
    },
    $3y_3: function ($p0) {
        var $v_0 = $get("fastRewind", this.get_element()).getAttribute("disabled");
        (IsNull($v_0) || !$v_0) && this.$2N_3(1)
    },
    $2N_3: function ($p0) {
        try {
            if ($p0 > 1) this.$1z_3 = false;
            this.$2T_3($p0)
        } finally {
            this.$1z_3 = true
        }
    },
    $2T_3: function ($p0) {
        if (this.$q_3) return;
        if ($p0 < 1) return;
        var $v_0 = new Mscrm.ChangePageEventArgs($p0, this.$2F_3());
        this.fireControlEvent("OnChangePage", $v_0);
        this.SetProperty("pageNum", $p0.toString());
        if ($v_0.breakEvent) return;
        this.$3N_3(true)
    },
    $34_3: function ($p0) {
        var $v_0 = Mscrm.Utilities.getDomEventKeyCode($p0);
        switch ($v_0) {
            case 13:
                $p0.target.tagName === "TH" && this.$31_3($p0);
                break;
            default:
                return
        }
    },
    $31_3: function ($p0) {
        var $v_0 = $p0.target;
        switch ($v_0.tagName) {
            case "IMG":
                if (Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-List-Sortable")) $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "LABEL":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "NOBR":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "A":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "TD":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode;
                break;
            case "INPUT":
                if (IsNull(this.$0_3)) return;
                if ($v_0.checked) this.$0_3.SelectRecords(0, this.$0_3.get_dataTableBody().rows.length - 1, false);
                else this.$0_3.UnselectRecords(null);
                return
        }
        if (!$v_0.getAttribute("field") || $v_0.className !== "ms-crm-List-Sortable") return;
        this.$2l_3($v_0);
        var $v_1 = this.GetProperty("enableMultiSort") === "true";
        this.$G_3.toggle($v_0.getAttribute("field"), $v_1 && $p0.shiftKey);
        this.$3T_3()
    },
    $4E_3: function ($p0) {
        var $v_0 = $p0.target;
        switch ($v_0.tagName) {
            case "IMG":
                if (Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-List-Sortable")) {
                    $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                    break
                } else return;
            case "LABEL":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "NOBR":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "A":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode.parentNode;
                break;
            case "TD":
                $v_0 = $v_0.parentNode.parentNode.parentNode.parentNode;
                break
        }
        if ($v_0.className === "ms-crm-List-Sortable" && $v_0.style.backgroundImage !== "url(/_imgs/theme/" + Xrm.Page.context.getCurrentTheme() + "/GridColumnGradientHover.png)") {
            $v_0.style.backgroundImage = "url(/_imgs/theme/" + window.CURRENT_THEME_TYPE + "/GridColumnGradientHover.png)";
            this.$Z_3 = $v_0
        }
    },
    $4D_3: function ($p0) {
        var $v_0 = $p0.rawEvent.relatedTarget || $p0.rawEvent.toElement;
        if (!IsNull(this.$Z_3) && !(!IsNull($v_0) && ($v_0 === this.$Z_3 || $v_0.parentNode === this.$Z_3 || $v_0.parentNode.parentNode === this.$Z_3))) {
            this.$Z_3.style.backgroundImage = "";
            this.$Z_3 = null
        }
    },
    $3T_3: function () {
        for (var $v_0 = this.$G_3.columns.length, $v_1 = 0; $v_1 < $v_0; $v_1++) {
            var $v_2 = this.$2q_3(this.$G_3.columns[$v_1].$N_0),
                $v_3 = null;
            if (!IsNull($v_2)) $v_3 = this.$2z_3($v_2);
            if (!$v_3) return;
            $v_3.style.visibility = "visible";
            Mscrm.Utilities.cancelElementFlipping($v_3);
            var $v_4 = "";
            if (!this.$G_3.columns[$v_1].$S_0) {
                Mscrm.Utilities.flipElementVertically($v_3);
                $v_4 = window.LOCID_ALT_COLUMNSORTORDER_DOWN
            } else $v_4 = window.LOCID_ALT_COLUMNSORTORDER_UP;
            $v_3.alt = $v_4;
            $v_3.title = $v_4;
            window.LOCID_UI_DIR === "RTL" && Mscrm.Utilities.flipElementHorizontally($v_3)
        }
        this.SetProperty("sortColumns", this.$G_3.serialize());
        this.ClearPagingCookie();
        this.$2T_3(1)
    },
    SortColumn: function (domElement, sortOrder, append) {
        domElement = domElement.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        if (IsNull(domElement.getAttribute("field")) || domElement.className !== "ms-crm-List-Sortable") return;
        this.$2l_3(domElement);
        var $v_0 = this.GetProperty("enableMultiSort") === "true";
        this.$G_3.multipleSort(domElement.getAttribute("field"), sortOrder, $v_0 && append);
        this.$3T_3()
    },
    $2l_3: function ($p0) {
        $p0.style.backgroundImage = "";
        if (IsNull(this.$G_3)) {
            this.$G_3 = new Mscrm.SortColumns;
            this.$G_3.deserialize(this.GetProperty("sortColumns"))
        }
        for (var $v_0 = this.$G_3.columns.length, $v_1 = 0; $v_1 < $v_0; $v_1++) {
            var $v_2 = this.$2q_3(this.$G_3.columns[$v_1].$N_0);
            if (!IsNull($v_2)) {
                var $v_3 = this.$2z_3($v_2);
                if(  $v_3!=null)//l.g
                $v_3.style.visibility = "hidden"
            }
        }
    },
    $2z_3: function ($p0) {
        var $v_0 = 0,
            $v_1 = null,
            $v_2 = $p0.getElementsByTagName("IMG");
        while ($v_0 < $v_2.length) {
            if (!IsNull($v_2[$v_0].className)) {
                for (var $v_3 = $v_2[$v_0].className.split(" "), $v_4 = 0; $v_4 < $v_3.length; $v_4++) if ($v_3[$v_4] === "ms-crm-List-Sortable") {
                    $v_1 = $v_2[$v_0];
                    break
                }
                if (!IsNull($v_1)) break
            }
            $v_0++
        }
        return $v_1
    },
    $2q_3: function ($p0) {
        var $v_0 = 0,
            $v_1 = $get(this.get_id() + "_gridBar"),
            $v_2 = $v_1.rows[0].cells,
            $v_3 = $v_2.length;
        while ($v_0 < $v_3) {
            if ($v_2[$v_0].getAttribute("field") && $v_2[$v_0].getAttribute("field") === $p0) return $v_2[$v_0];
            $v_0++
        }
        return null
    },
    ResetPageNumber: function () {
        this.SetProperty("pageNum", "1")
    },
    $2F_3: function () {
        return this.$o_3 ? parseInt(this.GetProperty("pageNum"), 10) : -1
    },
    $45_3: function () {
        return parseInt(this.GetProperty("recsPerPage"), 10)
    },
    $42_3: function () {
        return parseInt(this.GetProperty("max"), 10)
    },
    $2w_3: function () {
        var $v_0 = $get("fixedrow"),
            $v_1 = 0;
        if (!IsNull($v_0)) $v_1 = $v_0.offsetLeft;
        return $v_1
    },
    HandleResize: function (domEvent, column, width) {
        if (!this.$j_3) {
            var $v_0 = $get(this.get_element().id + "_gridBarCols");
            this.$j_3 = $v_0.children[parseInt(XUI.Html.DomUtils.GetPrevSibling(column.get_element().parentNode).cellIndex, 10)]
        }
        if (!IsNull(width) && width > 0) {
            this.$j_3.setAttribute("width", width + "px");
            !IsNull(this.$0_3) && this.$0_3.resizeColumn(XUI.Html.DomUtils.GetPrevSibling(column.get_element().parentNode).getAttribute("field"), width)
        } else {
            var $v_1 = 0,
                $v_2 = 0,
                $v_3 = this.$2w_3();
            if (window.LOCID_UI_DIR === "RTL") {
                $v_1 = this.$1O_3 - domEvent.screenX;
                $v_2 = this.$1I_3 - $v_3
            } else {
                $v_1 = domEvent.screenX - this.$1O_3;
                $v_2 = $v_3 - this.$1I_3
            }
            var $v_4 = parseInt(this.$j_3.getAttribute("width"), 10) + $v_1 - $v_2;
            if (($v_1 > 5 || $v_1 < -5) && $v_4 >= 1) {
                this.$1O_3 = domEvent.screenX;
                this.$1I_3 = $v_3;
                this.$j_3.setAttribute("width", $v_4 + "px");
                !IsNull(this.$0_3) && this.$0_3.resizeColumn(XUI.Html.DomUtils.GetPrevSibling(column.get_element().parentNode).getAttribute("field"), $v_4);
                this.$1a_3(domEvent)
            }
        }
    },
    HandleResizeCleanup: function (domEvent) {
        Mscrm.GlobalEvents.set_globalAllowDrag(false);
        this.$j_3 = null;
        this.$3A_3(false)
    },
    HandleResizeStartup: function (domEvent) {
        this.$1O_3 = domEvent.screenX;
        this.$1I_3 = this.$2w_3();
        Mscrm.GlobalEvents.set_globalAllowDrag(true);
        var $v_0 = $get(this.get_id() + "_gridBar").rows[0];
        $removeHandler($v_0, "keydown", this.$$d_$34_3);
        $removeHandler($v_0, "click", this.$$d_$31_3);
        $removeHandler($v_0, "mouseover", this.$$d_$4E_3);
        $removeHandler($v_0, "mouseout", this.$$d_$4D_3)
    },
    GetProperty: function (name) {
        var $v_0 = $get(name, this.$1X_3());
        return !IsNull($v_0) ? $v_0.getAttribute("value") : null
    },
    SetProperty: function (name, value) {
        var $v_0 = this.$1X_3(),
            $v_1 = $get(name, $v_0);
        if (IsNull($v_1)) {
            $v_1 = document.createElement("div");
            $v_1.setAttribute("id", name);
            $v_0.appendChild($v_1)
        }
        $v_1.setAttribute("value", value)
    },
    HandleAutoResize: function (domEvent, column) {
        if (IsNull(this.$0_3)) return;
        var $v_0 = this.$0_3.autoResizeColumn(XUI.Html.DomUtils.GetPrevSibling(column.get_element().parentNode).getAttribute("field"));
        if ($v_0 === -1) $v_0 = 10;
        this.HandleResize(domEvent, column, $v_0);
        this.HandleResizeCleanup(domEvent)
    },
    $4n_3: function () {
        var $v_0 = $get(this.get_id() + "_gridBodyContainer"),
            $v_1 = $get("refreshButton", $v_0);
        if (!IsNull($v_1)) {
            if (window.LOCID_UI_DIR === "RTL") {
                $v_1.style.left = "0px";
                $v_1.style.right = "auto"
            } else {
                $v_1.style.left = "auto";
                $v_1.style.right = "0px"
            }
            var $v_2 = $v_1.style.display !== "inline";
            if (Mscrm.Utilities.isIosDevice()) $v_2 = $v_1.style.display !== "inline" && $v_1.style.display !== "none";
            if ($v_2) $v_1.style.display = "inline"
        }
    },
    $47_3: function ($p0, $p1) {
        if ($p1) return String.format(window.LOCID_GRID_EXACTTOTALCOUNT, $p0);
        else return String.format(window.LOCID_GRID_APPROXTOTALCOUNT, $p0)
    },
    $6_3: null,
    $3b_3: false,
    $38_3: false,
    $2O_3: false,
    $4X_3: function () {
        var $v_0 = false;
        if (this.GetParameter("AutoRefreshOnLoad") === "1") {
            this.SetParameter("LoadOnDemand", "0");
            this.SetParameter("AutoRefreshOnLoad", "0");
            $v_0 = true
        } else if (this.GetParameter("RenderAsync") === "1") {
            this.SetParameter("RenderAsync", "0");
            if (this.GetParameter("LoadOnDemand") !== "1") $v_0 = true
        }
        if ($v_0) {
            this.add_onRefresh(this.$$d_$2K_3);
            this.Refresh()
        } else {
            this.$25_3();
            this.$2K_3(null, null)
        }
    },
    isLiteSubGrid: function () {
        return this.GetParameter("LayoutStyle") === "LiteGridList"
    },
    refreshLiteSubGrid: function () {
        this.ResetPageNumber();
        this.Refresh();
        this.HandleGridResize()
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        if (this.isLiteSubGrid()) {
            var $v_0 = this.getFormData(),
                $v_1 = null,
                $$t_4 = this;
            $v_1 = function ($p1_0) {
                $$t_4.refreshLiteSubGrid()
            };
            $v_0.addOnRecordIdChanged($v_1, false)
        }
        if (this.get_gridType() === Mscrm.GridControl.hompageGrid) {
            var $v_2 = this.GetParameter("titleformat");
            setPageTitle(String.format($v_2, this.get_entityDisplayPluralName(), this.get_viewTitle()))
        }
        this.add_onRefresh(this.$$d_$4g_3);
        this.add_onResetComplete(this.$$d_$4g_3);
        !IsNull(this.$0_3) && this.$0_3.add_onSelectionChange(this.$$d_$4h_3);
        if (this.get_gridType() === Mscrm.GridControl.inlineSubGrid) {
            this.$6_3 = this.get_element().parentNode;
            while (this.$6_3) if (!IsNull(this.$6_3.className) && Sys.UI.DomElement.containsCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout")) break;
            else this.$6_3 = this.$6_3.parentNode
        }
        this.$38_3 = true;
        this.$2O_3 && this.$35_3();
        this.$3C_3();
        !IsNull(this.get_$1i_3()) && window.setTimeout(this.get_$1i_3().$$d_syncToGridStatus, 0);
        this.$3d_3();
        this.$3e_3();
        this.$3c_3();
        this.initAppGridPresence(null, null);
        this.HandleGridResize();
        $addHandler(window, "load", this.$$d_$4e_3);
        $addHandler(window, "resize", this.$$d_HandleGridResize);
        if (this.$17_3()) {
            $addHandler(this.get_addContextualButton(), "mouseover", this.$$d_$4K_3);
            $addHandler(this.get_addContextualButton(), "mouseout", this.$$d_$4J_3);
            switch (this.get_addContextualButton().attributes.getNamedItem("action").value) {
                case "NewRecord":
                    $addHandler(this.get_addContextualButton(), "click", this.$$d_$4L_3);
                    break;
                case "AddNewStandard":
                    $addHandler(this.get_addContextualButton(), "click", this.$$d_$4A_3);
                    break;
                case "AddExistingStandard":
                    $addHandler(this.get_addContextualButton(), "click", this.$$d_$48_3);
                    break;
                case "AddExistingAssoc":
                    $addHandler(this.get_addContextualButton(), "click", this.$$d_$49_3);
                    break;
                case "QuickAdd":
                    break
            }
            this.$1h_3(true)
        }
    },
    $17_3: function () {
        return this.isLiteSubGrid() && !IsNull(this.get_addContextualButton())
    },
    $4K_3: function ($p0) {
        if (this.$17_3() && this.get_addContextualButton().className !== "ms-crm-ImageStrip-addButtonDisable") this.get_addContextualButton().className = "ms-crm-ImageStrip-addButtonHover"
    },
    $4J_3: function ($p0) {
        if (this.$17_3() && this.get_addContextualButton().className !== "ms-crm-ImageStrip-addButtonDisable") this.get_addContextualButton().className = "ms-crm-ImageStrip-addButton"
    },
    $4L_3: function ($p0) {
        if (this.get_addContextualButton().className === "ms-crm-ImageStrip-addButtonDisable") return;
        var $v_0 = Number.parseInvariant(this.GetParameter("otc"));
        openObj($v_0, null)
    },
    $4A_3: function ($p0) {
        if (this.get_addContextualButton().className === "ms-crm-ImageStrip-addButtonDisable") return;
        var $v_0 = Number.parseInvariant(this.GetParameter("otc")),
            $v_1 = Number.parseInvariant(this.GetParameter("oType")),
            $v_2 = this.GetParameter("oId");
        this.addNewFromSubGridStandard($v_0, $v_1, $v_2)
    },
    addNewFromSubGridStandard: function (gridTypeCode, parentEntityTypeCode, parentEntityId) {
        switch (gridTypeCode) {
            case Mscrm.EntityTypeCode.CustomerAddress:
                Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/sfa/address.js"));
                AddRelatedAddress(gridTypeCode, parentEntityTypeCode, parentEntityId);
                break;
            case Mscrm.EntityTypeCode.KbArticle:
                gridTypeCode = Mscrm.EntityTypeCode.NewKbArticle;
                locAddRelatedToNonForm(gridTypeCode, parentEntityTypeCode, parentEntityId, "");
                break;
            default:
                locAddRelatedToNonForm(gridTypeCode, parentEntityTypeCode, parentEntityId, "");
                break
        }
    },
    $48_3: function ($p0) {
        if (this.get_addContextualButton().className === "ms-crm-ImageStrip-addButtonDisable") return;
        var $v_0 = Number.parseInvariant(this.GetParameter("otc")),
            $v_1 = Number.parseInvariant(this.GetParameter("oType")),
            $v_2 = this.GetParameter("oId");
        Mscrm.Grid.addExistingFromSubGridStandard($v_0, this, $v_1, $v_2)
    },
    $49_3: function ($p0) {
        if (this.get_addContextualButton().className === "ms-crm-ImageStrip-addButtonDisable") return;
        var $v_0 = Number.parseInvariant(this.GetParameter("otc")),
            $v_1 = Number.parseInvariant(this.GetParameter("oType")),
            $v_2 = this.GetParameter("oId");
        Mscrm.Grid.addExistingFromSubGridAssociated($v_0, this, $v_1, $v_2)
    },
    $3q_3: function ($p0, $p1, $p2, $p3, $p4) {
        var $v_0 = "<disassociateAndRefresh>";
        $v_0 += "<disassociate>";
        $v_0 += "<associationName>" + CrmEncodeDecode.CrmXmlEncode($p0) + "</associationName>";
        $v_0 += "<parentTypeCode>" + CrmEncodeDecode.CrmXmlEncode($p1.toString()) + "</parentTypeCode>";
        $v_0 += "<parentId>" + CrmEncodeDecode.CrmXmlEncode($p2) + "</parentId>";
        $v_0 += "<targetTypeCode>" + CrmEncodeDecode.CrmXmlEncode($p3.toString()) + "</targetTypeCode>";
        $v_0 += "<targetId>" + CrmEncodeDecode.CrmXmlEncode($p4) + "</targetId>";
        $v_0 += "</disassociate>";
        $v_0 += this.$1U_3(false);
        $v_0 += "</disassociateAndRefresh>";
        if (!this.$1B_3) this.$1B_3 = new Mscrm.RemoteCommandXml("AppGridWebService", "DisassociateAndRefresh");
        this.$1B_3.setContent($v_0);
        this.$2B_3(false, this.$1B_3)
    },
    $3p_3: function ($p0) {
        var $v_0 = "<deleteConnectionAndRefresh>";
        $v_0 += "<delete><targetId>" + CrmEncodeDecode.CrmXmlEncode($p0) + "</targetId></delete>";
        $v_0 += this.$1U_3(false);
        $v_0 += "</deleteConnectionAndRefresh>";
        if (!this.$1D_3) this.$1D_3 = new Mscrm.RemoteCommandXml("AppGridWebService", "DeleteConnectionAndRefresh");
        this.$1D_3.setContent($v_0);
        this.$2B_3(false, this.$1D_3)
    },
    getFormData: function () {
        var $v_0 = $get(this.get_id() + "_span"),
            $v_1 = $v_0.getAttribute("FormDataEntityId"),
            $v_2 = $find($v_1);
        return $v_2
    },
    dispose: function () {
        this.$4a_3(null);
        $removeHandler(window, "resize", this.$$d_HandleGridResize);
        $removeHandler(window, "resize", this.$$d_$t_3);
        if (this.$17_3()) {
            $removeHandler(this.get_addContextualButton(), "mouseover", this.$$d_$4K_3);
            $removeHandler(this.get_addContextualButton(), "mouseout", this.$$d_$4J_3);
            switch (this.get_addContextualButton().attributes.getNamedItem("action").value) {
                case "NewRecord":
                    $removeHandler(this.get_addContextualButton(), "click", this.$$d_$4L_3);
                    break;
                case "AddNewStandard":
                    $removeHandler(this.get_addContextualButton(), "click", this.$$d_$4A_3);
                    break;
                case "AddExistingStandard":
                    $removeHandler(this.get_addContextualButton(), "click", this.$$d_$48_3);
                    break;
                case "AddExistingAssoc":
                    $removeHandler(this.get_addContextualButton(), "click", this.$$d_$49_3);
                    break
            }
        }
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $1X_3: function () {
        return $get("divGridProps", this.get_element())
    },
    $1W_3: function () {
        return $get("divGridParams", this.get_element())
    },
    getCellValue: function (columnName, rowId) {
        for (var $v_0 = this.GetRecordsFromInnerGrid(false), $v_1 = rowId.toUpperCase(), $v_2 = null, $v_5 = 0; $v_5 < $v_0.length; $v_5++) {
            var $v_6 = $v_0[$v_5][0];
            if ($v_6.toUpperCase() === $v_1) {
                $v_2 = $v_0[$v_5];
                break
            }
        }
        if (!$v_2) return null;
        var $v_3 = $v_2[3].getAttribute(columnName);
        if (!isNullOrEmptyString($v_3)) return $v_3;
        var $v_4 = this.$0_3.FindColumnIndex(columnName);
        if ($v_4 !== -1 && $v_4 < $v_2[3].children.length) {
            var $v_7 = XUI.Html.DomUtils.GetChildElementAt($v_2[3], $v_4),
                $v_8 = $v_7.attributes.getNamedItem("RawValue");
            if ($v_8) return $v_8.value;
            return XUI.Html.GetText($v_7)
        }
        return null
    },
    $3r_3: function () {
        if (this.$6_3 && Sys.UI.DomElement.containsCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout")) {
            Sys.UI.DomElement.removeCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout");
            Sys.UI.DomElement.addCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout-Selected");
            var $v_0 = this.$6_3.getElementsByTagName("tr")[0];
            Sys.UI.DomElement.addCssClass($v_0, "ms-crm-Form-SubGrid-viewRow");
            this.$y_3 = true;
            !IsNull(this.$0_3) && this.$0_3.reselectRows();
            this.$t_3(null)
        }
    },
    $56_3: function () {
        if (this.$6_3 && Sys.UI.DomElement.containsCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout-Selected")) {
            Sys.UI.DomElement.removeCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout-Selected");
            Sys.UI.DomElement.addCssClass(this.$6_3, "ms-crm-Form-SubGrid-Layout");
            var $v_0 = this.$6_3.getElementsByTagName("tr")[0];
            Sys.UI.DomElement.removeCssClass($v_0, "ms-crm-Form-SubGrid-viewRow");
            if (!IsNull(this.$0_3)) {
                this.$0_3.saveSelectRows();
                this.$0_3.UnselectRecords(null)
            }
            this.$y_3 = false;
            this.$t_3(null)
        }
    },
    $4h_3: function ($p0, $p1) {
        this.raiseEventWithCheck(Mscrm.ScriptEvents.SelectionChanged, null)
    },
    $4g_3: function ($p0, $p1) {
        !IsNull(this.$0_3) && this.$0_3.add_onSelectionChange(this.$$d_$4h_3);
        this.raiseEventWithCheck(Mscrm.ScriptEvents.SelectionChanged, null)
    },
    $4e_3: function ($p0) {
        executeFunctionDeferred(this.$$d_$2t_3, false, false)
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        switch (eventCode) {
            case Mscrm.ScriptEvents.ViewSelectorChanged:
                !IsNull(this.$0_3) && this.$0_3.add_onSelectionChange(this.$$d_$4h_3);
                this.raiseEventWithCheck(Mscrm.ScriptEvents.SelectionChanged, null);
                break;
            case Mscrm.ScriptEvents.GetPageInfo:
                return this.$4F_3(parameters);
            case Mscrm.ScriptEvents.RefreshGrid:
                var $v_0 = parameters["async"];
                if ($v_0) {
                    var $v_2 = this.get_refreshAsynchronous();
                    this.set_refreshAsynchronous(true);
                    this.$32_3(parameters);
                    this.set_refreshAsynchronous($v_2)
                } else this.$32_3(parameters);
                break;
            case Mscrm.ScriptEvents.PageLoaded:
                var $$t_8 = this,
                    $v_1 = function () {
                        var $v_4 = !!sourceComponent && sourceComponent === $find(sourceComponent.get_id()) && !$$t_8.doNotFocusGridQuickFindOnLoad;
                        $v_4 && $$t_8.$2t_3();
                        $$t_8.$2O_3 = true;
                        $$t_8.$35_3();
                        $$t_8.HandleGridResize()
                    };
                executeFunctionDeferred($v_1, false, false);
                break;
            case Mscrm.ScriptEvents.PageUnloaded:
                !IsNull(sourceComponent) && sourceComponent === this.get_rootManager() && this.$2A_3(null);
                break;
            case Mscrm.ScriptEvents.SetRibbonSelectedControl:
                var $v_3 = parameters["selectedControl"];
                if (!IsNull($v_3) && ($v_3.get_id() === this.get_id() || Mscrm.Utilities.isDescendant($v_3.get_element(), this.get_element()))) this.$3r_3();
                else this.$56_3();
                break
        }
        return Mscrm.CrmUIControl.prototype.handleEvent.call(this, eventCode, parameters, sourceComponent)
    },
    $35_3: function () {
        if (!this.$38_3) return;
        this.autoExpandGridControlRows();
        this.$2O_3 = false
    },
    autoExpandGridControlRows: function () {
        this.get_gridType() === Mscrm.GridControl.inlineSubGrid && this.$t_3(null)
    },
    doNotFocusGridQuickFindOnLoad: false,
    $2t_3: function () {
        if (!this.$3b_3) if (this.get_gridType() !== Mscrm.GridControl.inlineSubGrid) {
            var $v_0 = $get(this.get_id() + "_findCriteria");
            if (!IsNull($v_0)) try {
                $v_0.focus();
                this.$3b_3 = true
            } catch ($$e_1) { }
        }
    },
    SetParameter: function (name, value) {
        if (!IsNull(value)) value = value.toString();
        Mscrm.GridControl.setElementParameter(this.get_element(), name, value)
    },
    GetParameter: function (name) {
        var $v_0 = this.$1W_3(),
            $v_1 = null;
        if (!IsNull($v_0)) {
            var $v_2 = $get(name, $v_0);
            if (!IsNull($v_2)) $v_1 = $v_2.getAttribute("value")
        }
        return $v_1
    },
    get_disabled: function () {
        var $v_0 = false;
        if (this.get_element()) $v_0 = this.GetParameter("InnerGridDisabled") === "1";
        return $v_0
    },
    set_disabled: function (value) {
        return value
    },
    get_gridType: function () {
        if (this.$l_3 === Mscrm.GridControl.gridTypeNone) {
            var $v_0 = this.GetParameter("GridType");
            if ($v_0 === "AssociatedGrid") this.$l_3 = Mscrm.GridControl.associatedGrid;
            else if ($v_0 === "SubGrid") this.$l_3 = Mscrm.GridControl.inlineSubGrid;
            else {
                var $v_1 = Mscrm.Utilities.getContentUrl(this),
                    $v_2 = $v_1.get_path().toUpperCase();
                if (Mscrm.Utilities.isHomepageUrl($v_1)) this.$l_3 = Mscrm.GridControl.hompageGrid
            }
        }
        return this.$l_3
    },
    get_primaryFieldColumnIndex: function () {
        return this.$0_3.get_primaryFieldColumnIndex()
    },
    $32_3: function ($p0) {
        var $v_0 = $p0["etc"];
        if ($v_0 === this.get_entityTypeCode()) this.Refresh();
        else if (this.get_entityTypeCode() === Mscrm.EntityTypeCode.ActivityPointer) Mscrm.EntityPropUtil.isActivityTypeCode($v_0) && this.Refresh();
        else if (this.get_entityTypeCode() === Mscrm.EntityTypeCode.QueueItem) Mscrm.EntityPropUtil.isQueueItemTypeCode($v_0) && this.Refresh()
    },
    $4F_3: function ($p0) {
        if (!IsNull($p0) && !IsNull($p0["pageType"]) && $p0["pageType"] === "grid") {
            var $v_0 = {};
            $v_0["Id"] = this.GetParameter("viewid");
            $v_0["otc"] = this.GetParameter("otc");
            $v_0["etn"] = this.GetParameter("otn");
            $v_0["viewtype"] = this.GetParameter("viewtype");
            $v_0["title"] = this.GetParameter("viewTitle");
            $v_0["entitydisplayname"] = this.GetParameter("entitydisplayname");
            return $v_0
        } else return null
    },
    get_ribbonContextType: function () {
        var $v_0 = this.GetParameter("ribbonContext");
        if (isNullOrEmptyString($v_0)) $v_0 = Mscrm.RibbonContexts.homepageGrid;
        return $v_0
    },
    get_ribbonRelationshipType: function () {
        var $v_0 = this.GetParameter("relationshipType");
        if (!isNullOrEmptyString($v_0)) {
            var $v_1 = parseInt($v_0, 10);
            if (!isNaN($v_1)) return $v_1
        }
        return 0
    },
    get_entityTypeCode: function () {
        return parseInt(this.GetParameter("otc"), 10)
    },
    get_entityTypeName: function () {
        return this.GetParameter("otn")
    },
    get_entityDisplayName: function () {
        return this.GetParameter("entitydisplayname")
    },
    get_entityDisplayPluralName: function () {
        return this.GetParameter("entitypluraldisplayname")
    },
    get_selectedRecordCount: function () {
        return this.GetRecordsFromInnerGrid(true).length
    },
    get_recordCount: function () {
        return this.GetRecordsFromInnerGrid(false).length
    },
    get_allRecordIds: function () {
        return Mscrm.GridControl.$2H(this.GetRecordsFromInnerGrid(false))
    },
    get_selectedIds: function () {
        return Mscrm.GridControl.$2H(this.GetRecordsFromInnerGrid(true))
    },
    get_unselectedIds: function () {
        return Mscrm.GridControl.$2H(this.$30_3())
    },
    get_allRecords: function () {
        return Mscrm.GridControl.$28(this.GetRecordsFromInnerGrid(false), this.get_primaryFieldColumnIndex())
    },
    get_selectedRecords: function () {
        return Mscrm.GridControl.$28(this.GetRecordsFromInnerGrid(true), this.get_primaryFieldColumnIndex())
    },
    get_unselectedRecords: function () {
        return Mscrm.GridControl.$28(this.$30_3(), this.get_primaryFieldColumnIndex())
    },
    setFocus: function () { },
    setVisible: function (isVisible) {
        Sys.UI.DomElement.setVisible(this.get_element(), isVisible)
    },
    getVisible: function () {
        return Sys.UI.DomElement.getVisible(this.get_element())
    },
    disableOrEnableAllGridCheckBoxes: function (state) {
        for (var $v_0 = this.get_element().getElementsByTagName("INPUT"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            var $v_2 = $v_0[$v_1];
            if ($v_2.type === "checkbox") $v_2.disabled = state
        }
    },
    GetRecordsFromInnerGrid: function (onlySelectedRecords) {
        if (!IsNull(this.$0_3)) return onlySelectedRecords ? this.$0_3.get_selectedRecords() : this.$0_3.get_allRecords();
        return []
    },
    $30_3: function () {
        for (var $v_0 = this.GetRecordsFromInnerGrid(true), $v_1 = {}, $v_4 = 0; $v_4 < $v_0.length; $v_4++) $v_1[$v_0[$v_4][0]] = true;
        for (var $v_2 = this.GetRecordsFromInnerGrid(false), $v_3 = [], $v_5 = 0; $v_5 < $v_2.length; $v_5++) if (IsNull($v_1[$v_2[$v_5][0]])) $v_3[$v_3.length] = $v_2[$v_5];
        return $v_3
    },
    get_viewTitle: function () {
        if (!IsNull(this.get_element())) {
            var $v_0 = this.GetParameter("viewTitle");
            return isNullOrEmptyString($v_0) ? "" : $v_0
        } else return null
    },
    get_viewIsUserOwned: function () {
        if (!IsNull(this.get_$1i_3())) return this.get_$1i_3().get_viewIsUserOwned();
        else return false
    },
    $13_3: null,
    get_$1i_3: function () {
        if (!this.$13_3) {
            var $v_0 = this.get_id() + "_SavedQuerySelector";
            this.$13_3 = $find($v_0);
            if (IsNull(this.$13_3)) {
                var $v_1 = this.get_id() + "_SavedNewQuerySelector";
                this.$13_3 = $find($v_1)
            }
        }
        return this.$13_3
    },
    get_hasMorePages: function () {
        return this.$0_3.get_moreRecords()
    },
    get_totalRecordCount: function () {
        if (!IsNull(this.$0_3)) return this.$0_3.get_totalRecordCount();
        return -1
    },
    get_pageRecordCount: function () {
        return this.get_recordCount()
    },
    $1l_3: false,
    $B_3: null,
    $T_3: null,
    $1Q_3: null,
    $1x_3: null,
    $O_3: null,
    $1S_3: false,
    $1K_3: true,
    InitPresence: function () {
        this.initAppGridPresence(null, null)
    },
    $2m_3: function () {
        if (!this.$1l_3) {
            try {
                this.$B_3 = createPresenceControlInstance()
            } catch ($$e_0) { }
            this.$1l_3 = true;
            if (!IsNull(this.$B_3)) this.$B_3.OnStatusChange = this.$$d_$4f_3
        }
        return !IsNull(this.$B_3)
    },
    $2A_3: function ($p0) {
        if (!IsNull(this.$B_3)) {
            destroyPresenceControlInstance(this.$B_3);
            this.$B_3 = null;
            this.$1l_3 = false
        }
    },
    initAppGridPresence: function (sender, e) {
        this.$1K_3 = true;
        if (_bPresenceEnabled) {
            this.remove_onRefresh(this.$$d_initAppGridPresence);
            this.add_onRefresh(this.$$d_initAppGridPresence);
            this.$n_3 = window.setTimeout(this.$$d_prepareEnablePresence, 100)
        }
    },
    $4a_3: function ($p0) {
        try {
            this.$n_3 !== -1 && window.clearTimeout(this.$n_3);
            this.$n_3 = -1;
            this.$1K_3 = false;
            this.$2A_3($p0)
        } catch ($$e_1) { }
    },
    $44_3: function () {
        var $v_0 = [];
        if (IsNull(this.$0_3) || this.$0_3.get_isDisposed()) return $v_0;
        var $v_1, $v_2 = {};
        this.$T_3 = {};
        var $v_3 = this.$0_3.get_element().getElementsByTagName("SPAN");
        for ($v_1 = 0; $v_1 < $v_3.length; $v_1++) {
          //  debugger;
            var $v_4 = $v_3[$v_1];
            hasSipAttribute($v_4) && this.$3k_3($v_0, $v_2, $v_4, parseInt($v_4.getAttribute("otype")), $v_4.getAttribute("oid"))
        }
        return $v_0
    },
    $3k_3: function ($p0, $p1, $p2, $p3, $p4) {
        if (!IsNull($p3) && IsPresenceType($p3)) {
            if (IsNull(this.$T_3)) this.$T_3 = {};
            if (IsNull(this.$T_3[$p4])) this.$T_3[$p4] = [];
            this.$T_3[$p4].push($p2);
            if ($p1[$p4] !== 1) {
                $p0.push(createPresenceInfo($p4, $p2.getAttribute("sip")));
                $p1[$p4] = 1
            }
        }
    },
    $3M_3: function ($p0, $p1, $p2) {
        var $v_0 = getPresenceUri($p1);
        if (!IsNull(this.$T_3)) {
            var $v_1 = this.$T_3[$p0];
            if (!IsNull($v_1)) for (var $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
                var $v_3 = $v_1[$v_2];
                if (!IsNull($v_3) && $v_3.tagName.toUpperCase() === "SPAN") {
                    var $v_4 = XUI.Html.DomUtils.GetFirstChild($v_3);
                    if (!IsNull($v_4) && !IsNull($v_4.tagName) && $v_4.tagName.toUpperCase() === "IMG") {
                        $v_4.className = "ms-crm-Lookup-PresenceItem";
                        $v_4.src = $v_0
                    } else {
                        var $v_5 = '<IMG class=ms-crm-Lookup-PresenceItem alt="" src="' + CrmEncodeDecode.CrmHtmlAttributeEncode($v_0) + '">' + $v_3.innerHTML;
                        $v_3.innerHTML = $v_5;
                        $v_4 = XUI.Html.DomUtils.GetFirstChild($v_3)
                    }
                    $p2 && this.$3h_3($v_4)
                }
            }
        }
        this.$1Q_3[$p0] = $p1
    },
    $4q_3: function ($p0) {
        this.$3L_3($p0, 0)
    },
    $4p_3: function ($p0) {
        this.$3L_3($p0, 1)
    },
    $3K_3: function ($p0) {
        this.$B_3.HideOOUI();
        if (!IsNull(this.$1S_3) && !this.$1S_3 && Sys.Browser.version === 6) {
            this.$2A_3($p0);
            this.$2m_3()
        }
    },
    $3L_3: function ($p0, $p1) {
        var $v_0 = $p0.target,
            $v_1 = null;
        if ($v_0.parentNode.tagName.toUpperCase() === "SPAN") $v_1 = $v_0.parentNode.getAttribute("oid");
        if (!IsNull($v_1)) {
            var $v_2 = getImageLocation($v_0),
                $v_3 = $v_2.oouiX,
                $v_4 = $v_2.oouiY,
                $v_5 = this.$1x_3[$v_1];
            this.$B_3.ShowOOUI($v_5, $p1, $v_3, $v_4)
        }
    },
    $4f_3: function ($p0, $p1, $p2) {
        if (!IsNull(this.$1Q_3)) this.$1Q_3[$p2] !== $p1 && this.$3M_3($p2, $p1, false)
    },
    $4o_3: function ($p0) {
        if (!this.$O_3.InscrollFunc) {
            this.$O_3.InscrollFunc = true;
            this.$3K_3($p0);
            this.$O_3.InscrollFunc = false
        } !IsNull(this.$O_3.OriginalScrollFunc) && this.$O_3.OriginalScrollFunc($p0)
    },
    prepareEnablePresence: function () {
        if (this.get_isDisposed() || IsNull(this.$0_3) || this.$0_3.get_isDisposed()) return;
        this.$n_3 = -1;
        if (!this.$1K_3 || IsNull(this.get_id())) return;
        try {
            var $v_0 = this.$44_3();
            if ($v_0.length > 0 && this.$2m_3() && !IsNull(this.$B_3) && this.$B_3.PresenceEnabled) {
                this.$1Q_3 = {};
                this.$1x_3 = {};
                if (IsNull(this.$O_3)) {
                    var $v_1 = $get(this.get_id() + "_divDataArea");
                    if (!IsNull($v_1)) {
                        this.$O_3 = {};
                        this.$O_3.OriginalScrollFunc = $v_1.scroll;
                        this.$O_3.InscrollFunc = false;
                        $addHandler($v_1, "scroll", this.$$d_$4o_3)
                    }
                }
                this.$3u_3($v_0)
            }
            if (IsNull(this.$1S_3)) this.$1S_3 = $v_0.length > 0
        } catch ($v_2) {
            if (this.$1K_3) throw Error.create($v_2.message)
        }
    },
    $3u_3: function ($p0) {
        for (var $v_0 = 0; $v_0 < $p0.length; $v_0++) {
            var $v_1 = $p0[$v_0];
            if (!IsNull($v_1)) {
                var $v_2 = $v_1.oid,
                    $v_3 = $v_1.sipuri;
                if (!IsNull(this.$B_3) && !IsNull($v_3) && $v_3.length > 0) {
                    var $v_4 = this.$B_3.GetStatus($v_3, $v_2);
                    this.$1x_3[$v_2] = $v_3;
                    this.$3M_3($v_2, $v_4, true)
                }
            }
        }
    },
    $3h_3: function ($p0) {
        $addHandler($p0, "mouseover", this.$$d_$4q_3);
        $addHandler($p0, "focusin", this.$$d_$4p_3);
        $addHandler($p0, "mouseout", this.$$d_$3K_3);
        $addHandler($p0, "focusout", this.$$d_$3K_3)
    }
};
Mscrm.BeforeRefreshEventArgs = function () {
    Mscrm.BeforeRefreshEventArgs.initializeBase(this)
};
Mscrm.BeforeRefreshEventArgs.prototype = {
    breakEvent: false
};
Mscrm.ChangePageEventArgs = function (newPageNumber, currentPageNumber) {
    Mscrm.ChangePageEventArgs.initializeBase(this);
    this.newPageNumber = newPageNumber;
    this.currentPageNumber = currentPageNumber
};
Mscrm.ChangePageEventArgs.prototype = {
    newPageNumber: 0,
    currentPageNumber: 0,
    breakEvent: false
};
Mscrm.GridSizeCalculator = function (element) {
    this.$$d_$5K_3 = Function.createDelegate(this, this.$5K_3);
    this.$$d_$4R_3 = Function.createDelegate(this, this.$4R_3);
    Mscrm.GridSizeCalculator.initializeBase(this, [element])
};
Mscrm.GridSizeCalculator.prototype = {
    initialize: function () {
        Mscrm.CrmUIBehavior.prototype.initialize.call(this);
        var $v_0 = $get("inPageHelpCollapseDiv");
        !IsNull($v_0) && $addHandler($v_0, "click", this.$$d_$4R_3)
    },
    dispose: function () {
        var $v_0 = $get("inPageHelpCollapseDiv");
        !IsNull($v_0) && $removeHandler($v_0, "click", this.$$d_$4R_3);
        Mscrm.CrmUIBehavior.prototype.dispose.call(this)
    },
    $4R_3: function ($p0) {
        window.setTimeout(this.$$d_$5K_3, 0)
    },
    $5K_3: function () {
        var $v_0 = 0,
            $$t_3 = this,
            $v_1 = function ($p1_0) {
                if ($p1_0.id === $$t_3.get_element().id) {
                    if ($v_0 === $$t_3.$1n_3) return true;
                    $$t_3.$1n_3 = $v_0;
                    $p1_0.style.top = $$t_3.$1n_3.toString() + "px";
                    return true
                }
                $v_0 += $p1_0.offsetHeight;
                return false
            };
        !IsNull(this.get_element().parentNode) && XUI.Html.DomUtils.ForEachChild(this.get_element().parentNode, $v_1)
    },
    $1n_3: 0
};
Mscrm.GridSpanControl = function ($p0) {
    this.$$d_$37_3 = Function.createDelegate(this, this.$37_3);
    this.$$d_$54_3 = Function.createDelegate(this, this.$54_3);
    this.$$d_$4G_3 = Function.createDelegate(this, this.$4G_3);
    this.$$d_setGridTopStyle = Function.createDelegate(this, this.setGridTopStyle);
    Mscrm.GridSpanControl.initializeBase(this, [$p0])
};
Mscrm.GridSpanControl.getTabRead = function (value) {
    var $v_0 = null;
    if (Mscrm.GridControl.isInstanceOfType(value)) $v_0 = value.get_element();
    else if (Mscrm.GridSpanControl.isInstanceOfType(value)) $v_0 = value.get_element();
    else return null;
    var $v_1 = $v_0,
        $v_2 = $get("rofContainer");
    while (!IsNull($v_1) && $v_1.className !== "ms-crm-InlineTabBody-Read" && $v_1 !== $v_2) $v_1 = $v_1.parentNode;
    if (IsNull($v_1) || $v_1 === $v_2) $v_1 = null;
    else {
        var $v_3 = $v_1.id;
        if ($v_3.endsWith("_content")) {
            var $v_4 = "_content",
                $v_5 = "_Expander";
            $v_3 = $v_3.substr(0, $v_3.length - $v_4.length);
            $v_3 += $v_5;
            $v_1 = $get($v_3).parentNode
        } else $v_1 = null
    }
    return $v_1
};
Mscrm.GridSpanControl.prototype = {
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.$3U_3();
        if (this.get_$4V_3()) executeFunctionDeferred(this.$$d_setGridTopStyle, false, false);
        else this.setGridTopStyle();
        $addHandler(window, "resize", this.$$d_$4G_3)
    },
    dispose: function () {
        $removeHandler(window, "resize", this.$$d_$4G_3);
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $4G_3: function ($p0) {
        this.setGridTopStyle()
    },
    get_selectionControl: function () {
        return this.get_refInnerGrid()
    },
    $1J_3: null,
    get_innerGridId: function () {
        return this.$1J_3
    },
    set_innerGridId: function (value) {
        this.$1J_3 = value;
        return value
    },
    $1y_3: null,
    get_refInnerGrid: function () {
        if (IsNull(this.$1y_3) && !IsNull(this.$1J_3)) this.$1y_3 = Mscrm.GridControl.findComponent(this.$1J_3);
        return this.$1y_3
    },
    setGridTopStyle: function () {
        if (this.get_isDisposed()) return;
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.get_element()),
            $v_1 = 0,
            $$t_4 = this,
            $v_2 = function ($p1_0) {
                if ($p1_0.id.endsWith("_ccDiv")) {
                    $p1_0.style.top = $v_1.toString() + "px";
                    return true
                }
                $v_1 += $p1_0.offsetHeight;
                return false
            };
        XUI.Html.DomUtils.ForEachChild($v_0, $v_2)
    },
    $3U_3: function () {
        if (this.get_element().tagName === "TABLE" || !IsNull(this.get_refInnerGrid()) && this.get_refInnerGrid().get_gridType() !== Mscrm.GridControl.inlineSubGrid || XUI.Html.DomUtils.GetFirstChild(this.get_element()).className !== "ms-crm-Form-SubGrid-Layout" && XUI.Html.DomUtils.GetFirstChild(this.get_element()).className !== "ms-crm-Form-SubGrid-Layout-Lite") return;
        var $v_0 = this.get_element().parentNode;
        if (isNullOrEmptyString($v_0.getAttribute("rowSpan"))) return;
        var $v_1 = $v_0.offsetHeight;
        if ($v_1 > 0) $v_0.style.height = ($v_1 - 6).toString() + "px";
        else window.setTimeout(this.$$d_$54_3, 0)
    },
    $54_3: function () {
        var $v_0 = $find("crmForm");
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.GetTab(this.get_element(), false);
            if (!IsNull($v_1)) {
                var $v_2 = $find($v_1.id);
                if ($v_2.get_displayState() === Xrm.TabDisplayState.expanded) this.$33_3();
                else $v_2.add_tabStateChange(this.$$d_$37_3)
            }
        } else if (!IsNull(this.get_refInnerGrid()) && this.get_refInnerGrid().isLiteSubGrid()) {
            var $$t_5 = this;
            Mscrm.GridControl.handleTabStateForReadForm(this, function ($p1_0) {
                if (IsNull($p1_0.data)) return;
                var $v_3 = $p1_0.data;
                if (!("controlObject" in $v_3)) return;
                if (!("expanderObject" in $v_3)) return;
                $v_3["expanderObject"].unbind(Mscrm.EventNames.inlineTabStateChange);
                $v_3["controlObject"].$2S_3()
            })
        }
    },
    $37_3: function ($p0, $p1) {
        if ($p1.get_displayState() === Xrm.TabDisplayState.expanded) {
            $p0.remove_tabStateChange(this.$$d_$37_3);
            this.$33_3()
        }
    },
    $33_3: function () {
        this.$2S_3()
    },
    $2S_3: function () {
        this.$3U_3();
        this.setGridTopStyle();
        !IsNull(this.get_refInnerGrid()) && this.get_refInnerGrid().autoExpandGridControlRows()
    },
    handleLinkControlEvents: function () {
        this.$2S_3()
    },
    get_$4V_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.get_element());
        if (!IsNull($v_0) && $v_0.className === "ms-crm-Form-SubGrid-Layout") return true;
        return false
    }
};
Mscrm.GridViewSelector = function ($p0) {
    this.$$d_$4W_3 = Function.createDelegate(this, this.$4W_3);
    this.$$d_$3a_3 = Function.createDelegate(this, this.$3a_3);
    this.$$d_$3I_3 = Function.createDelegate(this, this.$3I_3);
    this.$$d_viewSelectorHidden = Function.createDelegate(this, this.viewSelectorHidden);
    this.$$d_$5D_3 = Function.createDelegate(this, this.$5D_3);
    this.$$d_$4Z_3 = Function.createDelegate(this, this.$4Z_3);
    this.$$d_$4d_3 = Function.createDelegate(this, this.$4d_3);
    this.$$d_$4b_3 = Function.createDelegate(this, this.$4b_3);
    this.$$d_$4i_3 = Function.createDelegate(this, this.$4i_3);
    this.$$d_$4c_3 = Function.createDelegate(this, this.$4c_3);
    this.$$d_syncToGridStatus = Function.createDelegate(this, this.syncToGridStatus);
    Mscrm.GridViewSelector.initializeBase(this, [$p0]);
    this.$f_3 = $p0
};
Mscrm.GridViewSelector.prototype = {
    $D_3: null,
    $f_3: null,
    $I_3: null,
    $5_3: null,
    $Q_3: null,
    $1P_3: false,
    $z_3: false,
    $1_3: null,
    $H_3: null,
    $4t_3: null,
    $2M_3: null,
    $1d_3: null,
    showNewVSControl: false,
    showOriginalSelectBox: true,
    isActivitiesViewSelector: false,
    createPersonalViewEnabled: false,
    viewEntityName: null,
    selectedSavedQuery: null,
    selectedSavedQueryName: null,
    selectedSavedQueryType: null,
    userSelectedDefaultView: null,
    userOwnedView: null,
    quickFindQuery: null,
    systemViewsXml: null,
    userViewsXml: null,
    systemViewsLabel: null,
    userViewsLabel: null,
    customViewsLabel: null,
    createPersonalViewLabel: null,
    renderForPrint: false,
    selectOptionsXml: null,
    $W_3: null,
    get_activityList: function () {
        return this.$W_3
    },
    set_activityList: function (value) {
        this.$W_3 = value;
        return value
    },
    $21_3: null,
    get_systemViewsMap: function () {
        return this.$21_3
    },
    $23_3: null,
    get_userViewsMap: function () {
        return this.$23_3
    },
    $1j_3: false,
    $24_3: false,
    selectedViewId: null,
    selectedViewType: null,
    selectedViewName: null,
    originalViewId: null,
    originalViewType: null,
    originalViewName: null,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        if (this.showNewVSControl) {
            var $v_0 = this.$f_3.parentNode.parentNode;
            if (!this.showOriginalSelectBox) {
                this.$I_3 = XUI.Html.DomUtils.GetFirstChild($v_0).getElementsByTagName("SPAN")[0];
                this.$5_3 = XUI.Html.DomUtils.GetFirstChild($v_0).getElementsByTagName("A")[0]
            } else {
                this.$I_3 = XUI.Html.DomUtils.GetNextSibling(XUI.Html.DomUtils.GetFirstChild($v_0)).getElementsByTagName("SPAN")[0];
                this.$5_3 = XUI.Html.DomUtils.GetNextSibling(XUI.Html.DomUtils.GetFirstChild($v_0)).getElementsByTagName("A")[0]
            }
            if (this.$I_3 && !this.renderForPrint) {
                $addHandler(this.$5_3, "mouseover", this.$$d_$4c_3);
                $addHandler(this.$5_3, "mouseout", this.$$d_$4i_3);
                $addHandler(this.$5_3, "focus", this.$$d_$4b_3);
                $addHandler(this.$5_3, "blur", this.$$d_$4i_3);
                $addHandler(this.$5_3, "keydown", this.$$d_$4d_3);
                $addHandler(this.$5_3, "click", this.$$d_$4Z_3)
            }
            this.$4t_3 = this.$f_3.parentNode.innerHTML;
            this.$21_3 = XUI.Xml.LoadXml(this.systemViewsXml);
            this.$23_3 = XUI.Xml.LoadXml(this.userViewsXml);
            this.selectedViewId = this.selectedSavedQuery;
            this.selectedViewName = this.selectedSavedQueryName;
            this.selectedViewType = this.selectedSavedQueryType
        }
        this.$2M_3 = {};
        this.$1d_3 = {};
        window.setTimeout(this.$$d_$5D_3, 1);
        window.setTimeout(this.$$d_syncToGridStatus, 0)
    },
    dispose: function () {
        !IsNull(this.$1_3) && this.$1_3.dispose();
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $1o_3: false,
    get_disabled: function () {
        return this.$1o_3
    },
    set_disabled: function (value) {
        this.$1o_3 = value;
        this.$1o_3 && this.$5_3 && $clearHandlers(this.$5_3);
        return value
    },
    syncToGridStatus: function () {
        if (this.get_isDisposed()) return;
        var $v_0 = this.get_element().attributes.getNamedItem("GridId");
        if (!IsNull($v_0) && !isNullOrEmptyString($v_0.value)) {
            this.$Q_3 = $v_0.value;
            var $v_1 = $find(this.$Q_3);
            if (!IsNull($v_1) && Mscrm.GridControl.isInstanceOfType($v_1)) this.$D_3 = $v_1
        }
        this.$D_3 && this.$D_3.get_disabled() && this.set_disabled(true)
    },
    $5D_3: function () {
        if (this.get_isDisposed()) return;
        if (IsNull(Mscrm.PageManager.get_instance()) || IsNull(this.$f_3) || isNullOrEmptyString(this.viewEntityName)) return;
        var $v_0;
        if (this.showNewVSControl) $v_0 = this.selectOptionsXml;
        else $v_0 = this.$f_3.OptionsXml;
        this.$3W_3($v_0)
    },
    $5P_3: function () {
        if (IsNull(Mscrm.PageManager.get_instance()) || IsNull(this.$f_3) || isNullOrEmptyString(this.viewEntityName)) return;
        if (this.$1P_3) {
            var $v_0 = new RemoteCommand("SavedQuerySelectorWebService", "GetSavedViewSelector", null);
            $v_0.SetParameter("entityName", this.viewEntityName);
            var $v_1 = $v_0.Execute(null);
            if ($v_1.Success) {
                var $v_2 = $v_1.Xml,
                    $v_3 = $v_2.text;
                !IsNull($v_3) && this.$3W_3($v_3)
            }
        }
    },
    $3W_3: function ($p0) {
        this.$2V_3($p0, this.viewEntityName)
    },
    $2V_3: function ($p0, $p1) {
        var $v_0 = {};
        $v_0["timestamp"] = new Date;
        $v_0["queryList"] = $p0;
        var $v_1 = {};
        $v_1["data"] = $v_0;
        if (this.isActivitiesViewSelector) $v_1["key"] = String.format("QueryList_{0}_ActivitySelector", $p1);
        else $v_1["key"] = String.format("QueryList_{0}", $p1);
        Mscrm.PageManager.get_instance().raiseEvent(Mscrm.ScriptEvents.InsertCacheData, $v_1)
    },
    get_viewTitle: function () {
        if (this.showNewVSControl && !this.showOriginalSelectBox) return this.selectedViewName;
        else return this.get_$3S_3().getAttribute("Text")
    },
    get_viewIsUserOwned: function () {
        if (this.showNewVSControl && !this.showOriginalSelectBox) return this.selectedViewId === this.userOwnedView;
        else {
            var $v_0 = this.get_$3S_3().getAttribute("isUserOwned");
            return !IsNull($v_0) && $v_0 === "true"
        }
    },
    get_$3S_3: function () {
        return Mscrm.FormControlInputBehavior.GetElementBehavior(this.$f_3).get_selectedOption()
    },
    get_selectionControl: function () {
        return this.$D_3
    },
    $5N_3: function ($p0) {
        this.$5_3.className = "ms-crm-View-Name-hover"
    },
    $2W_3: function ($p0) {
        this.$5_3.className = "ms-crm-View-Name-select"
    },
    $3X_3: function ($p0) {
        this.$5_3.className = "ms-crm-View-Name";
        if (this.$1j_3) {
            this.$1j_3 = false;
            this.$5_3.focus()
        }
    },
    $4c_3: function ($p0) {
        var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "DIV");
        this.$5N_3($v_0)
    },
    $4i_3: function ($p0) {
        if (!this.$1j_3) {
            var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "DIV");
            this.$3X_3($v_0)
        }
    },
    $4b_3: function ($p0) {
        var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "DIV");
        this.$2W_3($v_0)
    },
    $4d_3: function ($p0) {
        switch ($p0.keyCode) {
            case 13:
            case 32:
            case 38:
            case 40:
                $p0.stopPropagation();
                $p0.preventDefault();
                var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "DIV");
                this.$3Z_3($v_0);
                break
        }
    },
    $4Z_3: function ($p0) {
        $p0.stopPropagation();
        var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "DIV");
        this.$3Z_3($v_0)
    },
    $3Z_3: function ($p0) {
        this.$2W_3($p0);
        var $v_0 = this.$5_3.parentNode.parentNode,
            $v_1 = Mscrm.Utilities.getXYPos($v_0, window.LOCID_UI_DIR === "RTL", $get("crmContentPanel")),
            $v_2 = $v_1["y"] + this.$5_3.offsetHeight,
            $v_3 = $v_1["x"];
        if (window.LOCID_UI_DIR === "RTL") $v_3 = $v_3 + $v_0.offsetWidth;
        this.$5L_3($p0, $v_3, $v_2)
    },
    $5L_3: function ($p0, $p1, $p2) {
        this.$2W_3($p0);
        if (IsNull(this.$1_3)) {
            this.$1_3 = this.$29_3();
            this.$4m_3(this.$1_3)
        }
        var $v_0 = XUI.Html.GetText($p0);
        if (this.get_viewTitle() === window.LOCID_SEARCH_RESULTS || $v_0 === window.LOCID_SEARCH_RESULTS) {
            if (!IsNull(this.$H_3)) {
                this.$H_3.set_isSelected(false);
                this.$1_3.set_focusElementOnShow(null)
            }
            this.$H_3 = null
        } else if (IsNull(this.$H_3)) for (var $v_1 = null, $v_2 = 0; $v_2 < this.$1_3.get_menuItems().length; $v_2++) if (!isNullOrEmptyString($v_0)) {
            $v_1 = this.$1_3.get_menuItems()[$v_2];
            if ($v_1.get_title() === $v_0) {
                this.$H_3 = $v_1;
                this.$H_3.set_isSelected(true);
                this.$1_3.set_focusElementOnShow(this.$H_3.get_itemContents());
                break
            }
        }
        this.$1_3.set_left($p1);
        this.$1_3.set_top($p2);
        this.$1_3.show();
        if (this.$1P_3) {
            this.$1P_3 = false;
            this.$1_3.refresh()
        }
        this.$1j_3 = true
    },
    $29_3: function () {
        var $v_0 = Mscrm.Menu.createMenu();
        $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
        $v_0.set_propagateStyle(false);
        $v_0.set_width(284);
        $v_0.set_reference(this.viewEntityName);
        $v_0.set_hideCallback(this.$$d_viewSelectorHidden);
        $v_0.set_shiftVertical(false);
        return $v_0
    },
    viewSelectorHidden: function (menu) {
        var $v_0 = this.$I_3.parentNode.parentNode;
        this.$3X_3($v_0)
    },
    $4m_3: function ($p0) {
        if (IsNull($p0)) return;
        if (this.isActivitiesViewSelector) for (var $v_0 = 0; $v_0 < this.$W_3.length; $v_0++) {
            var $v_1;
            $v_1 = Mscrm.Menu.createMenu();
            $v_1.set_title(this.$W_3[$v_0].Name);
            $v_1.set_stylePrefix(Mscrm.MenuStyles.activityViewSelectorStylePrefix);
            $v_1.set_isLoading(true);
            $v_1.set_subMenuShowCallback(this.$$d_$3I_3);
            $v_1.set_focusElementOnShow(null);
            $v_1.set_reference(this.$W_3[$v_0].TypeName);
            $v_1.set_menuItemId("ViewSelector_" + this.$W_3[$v_0].TypeName);
            $v_1.set_width(283);
            $v_1.set_propagateStyle(false);
            $v_1.set_iconPath(Mscrm.Utilities.getIconPath(this.$W_3[$v_0].TypeCode));
            $p0.addItem($v_1)
        } else this.$3I_3($p0)
    },
    $3Q_3: function ($p0) {
        var $v_0 = null,
            $v_1 = new RemoteCommand("ActivitiesWebService", "GetQueryList");
        $v_1.SetParameter("entityName", $p0);
        var $v_2 = $v_1.Execute(null);
        if (!IsNull($v_2) && $v_2.Success) $v_0 = XUI.Xml.GetText($v_2.Xml);
        return $v_0
    },
    $2u_3: function ($p0) {
        var $v_0 = {};
        if (this.isActivitiesViewSelector) $v_0["key"] = String.format("QueryList_{0}_ActivitySelector", $p0);
        else $v_0["key"] = String.format("QueryList_{0}", $p0);
        var $v_1 = Mscrm.PageManager.get_instance().get_eventManager().raiseEvent(Mscrm.ScriptEvents.RetrieveCacheData, $v_0, this),
            $v_2 = null;
        if (!IsNull($v_1) && isArray($v_1) && $v_1.length > 0) $v_2 = $v_1[0];
        var $v_3 = null;
        if (!IsNull($v_2)) $v_3 = $v_2["queryList"];
        return $v_3
    },
    $3I_3: function ($p0) {
        var $v_0 = $p0.get_reference();
        if (this.isActivitiesViewSelector) {
            var $v_1 = null,
                $v_2 = this.$2u_3($v_0);
            if (IsNull($v_2)) {
                $v_2 = this.$3Q_3($v_0);
                !IsNull($v_2) && this.$2V_3($v_2, $v_0)
            }
            if (!IsNull($v_2)) {
                $v_1 = XUI.Xml.LoadXml($v_2);
                this.$3P_3($v_1)
            }
            if (IsNull(this.$2M_3[$v_0]) || this.$1d_3[$v_0]) {
                if (!IsNull($v_1)) {
                    this.$24_3 = true;
                    $p0.set_menuId("ViewMenu_" + $v_0);
                    this.$4l_3($p0, $v_1);
                    this.$24_3 = false
                }
                this.$2M_3[$v_0] = true;
                $p0.get_parentMenu().set_focusElementOnShow($p0.get_itemContents());
                this.$1d_3[$v_0] = false
            }
        } else {
            var $v_3 = XUI.Xml.SelectSingleNode(this.$21_3, "savedqueries", null);
            !IsNull($v_3) && $v_3.childNodes.length > 0 && this.$3J_3($p0, $v_0, $v_3, Mscrm.EntityTypeCode.SavedQuery);
            var $v_4 = XUI.Xml.SelectSingleNode(this.$23_3, "userqueries", null);
            if (!IsNull($v_4) && $v_4.childNodes.length > 0) {
                this.$z_3 = true;
                this.$1T_3($p0);
                this.$3J_3($p0, $v_0, $v_4, Mscrm.EntityTypeCode.UserQuery)
            }
            this.$1T_3($p0);
            this.$2P_3($p0)
        }
        $p0.get_isLoading() && $p0.set_isLoading(false)
    },
    $5R_3: function ($p0, $p1) {
        var $v_0 = $p1["viewName"],
            $v_1 = Mscrm.MenuItem.createMenuItem($v_0),
            $v_2 = $p1["viewId"],
            $v_3 = $p1["viewType"],
            $v_4 = $p1["entityName"],
            $v_5 = {};
        $v_5["viewId"] = $v_2;
        $v_5["viewType"] = $v_3;
        $v_5["entityName"] = $v_4;
        $v_5["viewName"] = $v_0;
        $v_1.set_reference($v_5);
        $v_1.set_actionCallback(this.$$d_$3a_3);
        $v_1.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
        $v_1.set_menuItemId($v_2);
        var $v_6 = $p0.get_menuItems().length;
        $p0.insertItem($v_1, $v_6 - 2);
        if (!this.$z_3) {
            $p0.insertItem(this.$3o_3(this.userViewsLabel), $v_6 - 2);
            this.$4T_3($p0, $v_6 - 2);
            this.$z_3 = true
        }
    },
    $3o_3: function ($p0) {
        var $v_0 = Mscrm.MenuItem.createMenuItem($p0);
        $v_0.set_stylePrefix("VS-header");
        return $v_0
    },
    $4T_3: function ($p0, $p1) {
        var $v_0 = Mscrm.MenuItemSeparator.createSeparator(false);
        $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
        $p0.insertItem($v_0, $p1)
    },
    $1T_3: function ($p0) {
        var $v_0 = Mscrm.MenuItemSeparator.createSeparator(false);
        $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
        $p0.addItem($v_0)
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        Mscrm.CrmUIControl.prototype.handleEvent.call(this, eventCode, parameters, sourceComponent);
        switch (eventCode) {
            case Mscrm.ScriptEvents.NewViewCreated:
                this.$4N_3(parameters);
                break;
            case Mscrm.ScriptEvents.WindowResize:
            case Mscrm.ScriptEvents.GridViewChanged:
                this.$4Q_3();
                break
        }
        return null
    },
    $4N_3: function ($p0) {
        if (!IsNull(this.$1_3)) {
            var $v_0 = false,
                $v_1 = false,
                $v_2, $v_3 = $p0["entityTypeCode"];
            if (!IsNull($v_3)) {
                $v_2 = Number.parseInvariant($v_3);
                if (!IsNull($v_2)) $v_0 = Mscrm.EntityPropUtil.isActivityTypeCode($v_2)
            }
            var $v_4, $v_5 = $p0["entityName"];
            if ($v_0) {
                $v_4 = this.$2u_3($v_5);
                if (!IsNull($v_4)) {
                    $v_4 = this.$3Q_3($v_5);
                    if (!IsNull($v_4)) {
                        this.$2V_3($v_4, $v_5);
                        $v_1 = true
                    }
                }
            }
            if (this.isActivitiesViewSelector && $v_0) this.$1d_3[$v_5] = true;
            else {
                var $v_6 = this.$1_3.get_reference();
                if ($v_6 === $v_5) {
                    this.$5R_3(this.$1_3, $p0);
                    this.$1P_3 = true;
                    !$v_1 && this.$5P_3()
                }
            }
        }
    },
    $4Q_3: function () {
        if (IsNull($get(this.get_id())) || IsNull(XUI.Html.DomUtils.GetFirstChild($get(this.get_id())))) return;
        try {
            var $v_0 = $get(this.get_id()),
                $v_1 = XUI.Html.DomUtils.GetFirstChild($v_0);
            $v_1.style.width = $v_1.clientWidth.toString();
            var $v_2 = $v_0.parentNode.offsetWidth,
                $v_3 = $v_1.scrollWidth,
                $v_4 = XUI.Html.DomUtils.GetNextSibling($v_1).offsetWidth;
            if ($v_3 > $v_2 - $v_4) {
                $v_1.style.width = ($v_2 - $v_4 - 30).toString();
                $v_1.style.textOverflow = "ellipsis";
                $v_1.style.overflow = "hidden"
            } else $v_1.style.width = "auto";
            this.$D_3.HandleGridResize()
        } catch ($$e_5) { }
    },
    $3J_3: function ($p0, $p1, $p2, $p3) {
        var $v_0 = $p3 === Mscrm.EntityTypeCode.SavedQuery,
            $v_1 = $v_0 ? this.systemViewsLabel : this.userViewsLabel,
            $v_2 = Mscrm.MenuItem.createMenuItem($v_1);
        $v_2.set_stylePrefix("VS-header");
        $p0.addItem($v_2);
        var $v_3 = $v_0 ? "savedquery" : "userquery",
            $v_4 = $v_0 ? "savedqueryid" : "userqueryid",
            $v_5 = XUI.Xml.SelectNodes($p2, $v_3, null),
            $v_6 = 0;
        while ($v_6 < $v_5.length) {
            if ($v_0 && XUI.Xml.GetText(XUI.Xml.SelectNodes($v_5[$v_6], "isquickfindquery", null)[0]) === "true") {
                this.setQuickFindQuery(XUI.Xml.GetText(XUI.Xml.SelectNodes($v_5[$v_6], $v_4, null)[0]));
                $v_6++;
                continue
            }
            var $v_7 = XUI.Xml.GetText(XUI.Xml.SelectNodes($v_5[$v_6], "name", null)[0]),
                $v_8 = Mscrm.MenuItem.createMenuItem($v_7),
                $v_9 = XUI.Xml.GetText(XUI.Xml.SelectNodes($v_5[$v_6], $v_4, null)[0]),
                $v_A = {};
            $v_A["viewId"] = $v_9;
            $v_A["viewType"] = $p3;
            $v_A["entityName"] = $p1;
            $v_A["viewName"] = $v_7;
            $v_8.set_reference($v_A);
            $v_8.set_actionCallback(this.$$d_$3a_3);
            $v_8.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
            $v_8.set_menuItemId($v_9);
            if ($v_9 === this.selectedSavedQuery) {
                this.selectedViewName = $v_7;
                this.selectedViewId = $v_9;
                this.selectedViewType = $p3.toString();
                $v_8.set_isSelected(true);
                $p0.set_focusElementOnShow($v_8.get_itemContents());
                this.$H_3 = $v_8
            }
            $p0.addItem($v_8);
            $v_6++
        }
    },
    $2P_3: function ($p0) {
        if (this.createPersonalViewEnabled) {
            var $v_0 = Mscrm.MenuItem.createMenuItem(this.createPersonalViewLabel);
            $v_0.set_actionCallback(this.$$d_$4W_3);
            $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
            $p0.addItem($v_0)
        }
    },
    $4l_3: function ($p0, $p1) {
        if (IsNull($p0)) $p0 = this.$29_3();
        else $p0.clear();
        var $v_0 = $p0.get_reference(),
            $v_1 = XUI.Xml.SelectSingleNode($p1, "select/OPTGROUP[@id='AppSystemViews']", null);
        !IsNull($v_1) && $v_1.hasChildNodes() && this.$1c_3($p0, $v_0, $v_1);
        var $v_2 = XUI.Xml.SelectSingleNode($p1, "select/OPTGROUP[@id='AppUserViews']", null);
        if (!IsNull($v_2) && $v_2.hasChildNodes()) {
            this.$z_3 = true;
            this.$1T_3($p0);
            this.$1c_3($p0, $v_0, $v_2)
        }
        this.$1T_3($p0);
        this.$2P_3($p0);
        $p0.get_isVisible() && $p0.refresh()
    },
    populateMenuFromQueryList: function (queryList) {
        if (IsNull(this.$1_3)) this.$1_3 = this.$29_3();
        else this.$1_3.clear();
        var $v_0 = this.$1_3.get_reference(),
            $v_1 = XUI.Xml.LoadXml(queryList);
        this.$3P_3($v_1);
        this.$2P_3(this.$1_3);
        var $v_2 = XUI.Xml.SelectSingleNode($v_1, "select/OPTGROUP[@id='AppSystemViews']", null);
        !IsNull($v_2) && $v_2.childNodes.length > 0 && this.$1c_3(this.$1_3, $v_0, $v_2);
        var $v_3 = XUI.Xml.SelectSingleNode($v_1, "select/OPTGROUP[@id='AppUserViews']", null);
        if (!IsNull($v_3) && $v_3.childNodes.length > 0) {
            this.$z_3 = true;
            this.$1c_3(this.$1_3, $v_0, $v_3)
        }
        this.$1_3.refresh()
    },
    $3P_3: function ($p0) {
        var $v_0 = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($p0, "select", null).attributes.getNamedItem("quickFindQuery"));
        !isNullOrEmptyString($v_0) && this.setQuickFindQuery($v_0)
    },
    $1c_3: function ($p0, $p1, $p2) {
        var $v_0 = Mscrm.MenuItem.createMenuItem(XUI.Xml.GetText($p2.attributes.getNamedItem("LABEL")));
        $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorHeaderStylePrefix);
        $p0.addItem($v_0);
        var $v_1 = XUI.Xml.SelectNodes($p2, "option", null),
            $v_2 = 0;
        while ($v_2 < $v_1.length) {
            var $v_3 = XUI.Xml.GetText($v_1[$v_2]),
                $v_4 = Mscrm.MenuItem.createMenuItem($v_3),
                $v_5 = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("Type")),
                $v_6 = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("value")),
                $v_7 = {};
            $v_7["viewId"] = $v_6;
            $v_7["viewType"] = $v_5;
            $v_7["entityName"] = $p1;
            $v_7["viewName"] = $v_3;
            $v_4.set_reference($v_7);
            $v_4.set_actionCallback(this.$$d_$3a_3);
            $v_4.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
            $v_4.set_menuItemId($v_6);
            if (!this.$24_3 && $v_1[$v_2].attributes.getNamedItem("SELECTED")) {
                this.setViewForNewSavedQuerySelector($v_3, $v_6, $v_5);
                this.selectedSavedQuery = $v_6;
                this.selectedSavedQueryName = $v_3;
                this.selectedSavedQueryType = $v_5;
                this.setDefaultSavedQueryView($v_6);
                $v_4.set_isSelected(true);
                $p0.set_focusElementOnShow($v_4.get_itemContents());
                this.$H_3 = $v_4
            }
            $v_1[$v_2].attributes.getNamedItem("isUserOwned") && this.setUserOwnedView($v_6);
            $v_1[$v_2].attributes.getNamedItem("isdefault") && this.setUserSelectedDefaultView($v_6);
            $p0.addItem($v_4);
            $v_2++
        }
    },
    $4W_3: function ($p0) {
        var $v_0 = "crmGrid";
        if (!IsNull(this.$D_3)) $v_0 = this.$D_3.get_id();
        openAdvFind($v_0, true)
    },
    $3a_3: function ($p0, $p1) {
        if (IsNull($p1)) $p1 = true;
        var $v_0 = $p0.get_reference();
        !IsNull(this.$H_3) && this.$H_3.set_isSelected(false);
        $p0.set_isSelected(true);
        $p0.get_parentMenu().set_focusElementOnShow($p0.get_itemContents());
        this.$H_3 = $p0;
        var $v_1 = $v_0["viewType"],
            $v_2 = $v_0["viewId"],
            $v_3 = $v_0["viewName"],
            $v_4 = $v_0["entityName"];
        if (isNullOrEmptyString($v_1) || isNullOrEmptyString($v_2)) return;
        this.setViewForNewSavedQuerySelector($p0.get_title(), $v_2, $v_1);
        if ($p1) {
            handleView(null, this.$D_3);
            this.isActivitiesViewSelector && updateVisualizationList(this.$D_3, $v_4)
        }
    },
    setSelectedViewItemInMenu: function (viewId, loadView) {
        if (IsNull(loadView)) loadView = true;
        for (var $v_0 = null, $v_1 = 0; $v_1 < this.$1_3.get_menuItems().length; $v_1++) {
            $v_0 = this.$1_3.get_menuItems()[$v_1];
            if (!isNullOrEmptyString($v_0.get_menuItemId())) if ($v_0.get_menuItemId() === viewId) {
                this.$3a_3($v_0, loadView);
                break
            }
        }
    },
    setViewForNewSavedQuerySelector: function (viewName, viewId, viewType) {
        this.selectedViewName = viewName;
        this.selectedViewId = viewId;
        this.selectedViewType = viewType;
        if (this.showNewVSControl) {
            XUI.Html.SetText(this.$I_3, viewName);
            this.$I_3.setAttribute("currentview", viewId);
            this.$I_3.setAttribute("currentviewtype", viewType)
        }
    },
    setOriginalViewForNewSavedQuerySelector: function () {
        this.setViewForNewSavedQuerySelector(this.originalViewName, this.originalViewId, this.originalViewType)
    },
    setUserSelectedDefaultView: function (viewId) {
        this.userSelectedDefaultView = viewId;
        this.showNewVSControl && this.$I_3.setAttribute("userselecteddefaultview", viewId)
    },
    setUserOwnedView: function (viewId) {
        this.userOwnedView = viewId;
        this.showNewVSControl && this.$I_3.setAttribute("userownedview", viewId)
    },
    setQuickFindQuery: function (viewId) {
        this.quickFindQuery = viewId;
        this.showNewVSControl && this.$I_3.setAttribute("quickfindquery", viewId)
    },
    setDefaultSavedQueryView: function (viewId) {
        this.showNewVSControl && this.$I_3.setAttribute("defaultsavedqueryview", viewId)
    }
};
Mscrm.QuickFindControl = function ($p0) {
    this.$$d_clearQuickFind = Function.createDelegate(this, this.clearQuickFind);
    this.$$d_RunQuickFind = Function.createDelegate(this, this.RunQuickFind);
    this.$$d_$2I_3 = Function.createDelegate(this, this.$2I_3);
    this.$$d_$4H_3 = Function.createDelegate(this, this.$4H_3);
    this.$$d_$4O_3 = Function.createDelegate(this, this.$4O_3);
    Mscrm.QuickFindControl.initializeBase(this, [$p0])
};
Mscrm.QuickFindControl.prototype = {
    $U_3: null,
    $X_3: null,
    $F_3: null,
    $a_3: null,
    $1M_3: null,
    $1s_3: null,
    $M_3: null,
    $D_3: null,
    $V_3: null,
    $1L_3: false,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.$M_3 = $get(this.get_$J_3() + "_findCriteria");
        this.$F_3 = $get(this.get_$J_3() + "_SavedQuerySelector");
        this.$U_3 = $get(this.get_$J_3() + "_findCriteriaButton");
        this.$X_3 = $get(this.get_$J_3() + "_clearCriteriaButton");
        $addHandler(this.get_element(), "keypress", this.$$d_$4O_3);
        $addHandler(this.get_element(), "keyup", this.$$d_$4H_3);
        $addHandler(this.get_element(), "click", this.$$d_$2I_3);
        $addHandler(this.$U_3, "click", this.$$d_RunQuickFind);
        $addHandler(this.$X_3, "click", this.$$d_clearQuickFind)
    },
    dispose: function () {
        $removeHandler(this.get_element(), "keypress", this.$$d_$4O_3);
        $removeHandler(this.get_element(), "keyup", this.$$d_$4H_3);
        $removeHandler(this.get_element(), "click", this.$$d_$2I_3);
        $removeHandler(this.$U_3, "click", this.$$d_RunQuickFind);
        $removeHandler(this.$X_3, "click", this.$$d_clearQuickFind);
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    get_$J_3: function () {
        var $v_0 = this.get_element().attributes.getNamedItem("GridId");
        if (!IsNull($v_0)) return $v_0.value;
        return null
    },
    get_selectionControl: function () {
        if (IsNull(this.$D_3)) this.$D_3 = this.$15_3();
        return this.$D_3
    },
    $15_3: function () {
        var $v_0 = this.get_$J_3();
        if (!isNullOrEmptyString($v_0)) {
            var $v_1 = Mscrm.GridControl.findComponent($v_0);
            if (!IsNull($v_1)) return $v_1;
            var $v_2 = $get("frmGanttFrame");
            if (!IsNull($v_2)) return $v_2.contentWindow.$find($v_0)
        }
        return null
    },
    $2I_3: function ($p0) {
        if (!this.$V_3) this.$V_3 = this.$2y_3();
        if (!IsNull(this.$V_3) && this.$V_3.viewEntityName === "kbarticle") {
            var $v_0 = $p0.target;
            if ($v_0.tagName === "INPUT") {
                !Mscrm.ArticleSearchRibbon && Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/CS/ArticleSearchRibbon/ArticleSearchRibbon.js"));
                !Mscrm.ArticleSearchRibbon.isSearchTabEnabled() && Mscrm.ArticleSearchRibbon.enableSearch();
                if (!this.$1L_3) {
                    Mscrm.ArticleSearchRibbon.setFocusToSearchTab();
                    this.$1L_3 = true
                }
            }
        }
    },
    $4O_3: function ($p0) {
        var $v_0 = this.$15_3();
        if ($v_0.GetParameter("ispreviewmode") === "1" || $v_0.GetParameter("InnerGridDisabled") === "1") return;
        if (Mscrm.Utilities.getDomEventKeyCode($p0) === 13) if (this.$U_3.style.display !== "none") this.RunQuickFind();
        else this.clearQuickFind()
    },
    $4H_3: function ($p0) {
        if (!this.$V_3) this.$V_3 = this.$2y_3();
        if (!IsNull(this.$V_3) && this.$V_3.viewEntityName === "kbarticle") {
            !Mscrm.ArticleSearchRibbon && Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/CS/ArticleSearchRibbon/ArticleSearchRibbon.js"));
            !Mscrm.ArticleSearchRibbon.isSearchTabEnabled() && Mscrm.ArticleSearchRibbon.enableSearch();
            if (!this.$1L_3) {
                Mscrm.ArticleSearchRibbon.setFocusToSearchTab();
                this.$1L_3 = true
            }
        }
        var $v_0 = this.$15_3();
        if ($v_0.GetParameter("ispreviewmode") === "1" || $v_0.GetParameter("InnerGridDisabled") === "1") return;
        var $v_1 = Mscrm.Utilities.getDomEventKeyCode($p0);
        if ($v_1 === 13) return;
        else if ($v_1 === 40 && $v_0.$0_3.get_numberOfRecords() > 0) $v_0.$0_3.get_element().focus();
        else if ($v_1 !== 9 && $v_1 !== 18) {
            if (!IsNull(this.$M_3)) {
                var $v_2 = this.$M_3.value.replace(new RegExp("[\\*]+"), "*").trim(),
                    $v_3 = $v_0.GetParameter("quickfind");
                if (!isNullOrEmptyString($v_2) && !isNullOrEmptyString($v_3) && $v_2 === $v_3) {
                    this.$1f_3();
                    return
                }
            }
            this.$2U_3()
        }
    },
    $2y_3: function () {
        var $v_0 = $find(this.get_$J_3() + "_SavedNewQuerySelector");
        if (!IsNull($v_0)) return $v_0;
        else return $find(this.get_$J_3() + "_SavedQuerySelector")
    },
    RunQuickFind: function (domEvent) {
        !IsNull(domEvent) && domEvent.preventDefault();
        var $v_0 = "",
            $v_1 = this.$15_3();
        if ($v_1.GetParameter("ispreviewmode") === "1" || $v_1.GetParameter("InnerGridDisabled") === "1") return;
        var $v_2 = $find(this.get_$J_3() + "_SavedNewQuerySelector");
        if ($v_2 && $v_2.showNewVSControl && !$v_2.showOriginalSelectBox) {
            $v_0 = $v_2.viewEntityName;
            if ($v_2.selectedViewName !== window.LOCID_SEARCH_RESULTS) {
                this.$a_3 = $v_2.selectedViewId;
                this.$1M_3 = $v_2.selectedViewName;
                this.$1s_3 = $v_2.selectedViewType
            }
        } else {
            this.$F_3 = $get(this.get_$J_3() + "_SavedQuerySelector");
            if (!IsNull(this.$F_3)) if (window.LOCID_SEARCH_RESULTS !== this.$F_3.value && this.$F_3.value.length > 0) {
                this.$a_3 = this.$F_3.value;
                this.$1M_3 = this.$F_3.options[this.$F_3.selectedIndex].title
            }
        }
        if ($v_0 === "kbarticle") {
            var $v_3 = this.$M_3.value.replace(new RegExp("[\\*]+"), "*").trim();
            if (isNullOrEmptyString($v_3)) {
                alert(window.LOCID_SEARCH_ALERT_NO_CRITERIA);
                return
            } else if (Mscrm.ArticleSearchRibbon.searchType === "SubjectSearch" && Mscrm.ArticleSearchRibbon.selectedSubjectId === "00000000-0000-0000-0000-000000000000") {
                alert(window.LOCID_SUBJECT_ALERT_NO_CRITERIA);
                return
            }
            Mscrm.ArticleSearchRibbon.findArticles(this.$M_3.value);
            this.$1f_3();
            return
        }
        quickFind($v_1) && this.$1f_3()
    },
    clearQuickFind: function (domEvent) {
        !IsNull(domEvent) && domEvent.preventDefault();
        var $v_0 = "",
            $v_1 = this.$15_3();
        if ($v_1.GetParameter("InnerGridDisabled") === "1") return;
        $v_1.SetParameter("quickfind", "");
        var $v_2 = false,
            $v_3 = $find(this.get_$J_3() + "_SavedNewQuerySelector"),
            $v_4 = !IsNull($v_3) && $v_3.showNewVSControl;
        if ($v_3) $v_0 = $v_3.viewEntityName;
        if ($v_0 === "kbarticle") Mscrm.ArticleSearchRibbon.closeArticleSearch();
        else {
            if ($v_4 && !IsNull(this.$a_3)) {
                $v_3.setViewForNewSavedQuerySelector(this.$1M_3, this.$a_3, this.$1s_3);
                if (!$v_3.showOriginalSelectBox) {
                    $v_2 = true;
                    handleView(null, $v_1)
                }
            }
            this.$F_3 = $get(this.get_$J_3() + "_SavedQuerySelector");
            if (!IsNull(this.$F_3) && !IsNull(this.$a_3)) {
                this.$F_3.value = this.$a_3;
                !$v_2 && XUI.Html.DispatchDomEvent(this.$F_3, XUI.Html.CreateDomEvent("change"))
            } else !$v_2 && clearFind($v_1)
        }
        this.NotifyExitedQuickFind();
        this.$M_3.focus()
    },
    NotifyExitedQuickFind: function () {
        this.$2U_3();
        this.$M_3.value = "";
        var $v_0 = Mscrm.CrmUIBehavior.getBehaviorByName(this.$M_3, "HintText");
        $v_0.notifyTextChanged(null)
    },
    SyncQuickFindButton: function () {
        if (!isNullOrEmptyString(this.$M_3.value)) this.$1f_3();
        else this.$2U_3()
    },
    $2U_3: function () {
        if (!IsNull(this.$U_3)) {
            this.$U_3.style.display = "inline-block";
            var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$U_3);
            if (!IsNull($v_0)) {
                var $v_1 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create($v_0.getAttribute("imgBase") + ".gif"));
                $v_0.src = $v_1.source;
                $v_0.className = Mscrm.ImageStrip.replaceExistingImageStripClass($v_0.className, $v_1.cssClass)
            }
        }
        if (!IsNull(this.$X_3)) this.$X_3.style.display = "none"
    },
    $1f_3: function () {
        this.$X_3.style.display = "inline-block";
        this.$U_3.style.display = "none";
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$X_3);
        $v_0.src = $v_0.getAttribute("imgBase") + ".gif"
    },
    GetSavedViewIds: function () {
        var $v_0 = {};
        $v_0["ViewId"] = this.$a_3;
        $v_0["ViewTitle"] = this.$1M_3;
        $v_0["ViewType"] = this.$1s_3;
        return $v_0
    }
};
Mscrm.SortColumns = function () {
    this.columns = new Array(0)
};
Mscrm.SortColumns.prototype = {
    toggle: function (columnName, append) {
        var $v_0 = new Mscrm.SortColumnInfo;
        $v_0.$N_0 = columnName;
        var $v_1 = this.$39_0(columnName);
        if ($v_1 !== -1) {
            $v_0.$S_0 = !this.columns[$v_1].$S_0;
            if (append) {
                this.columns[$v_1] = $v_0;
                return
            }
        }
        if (!append) this.columns = new Array(0);
        this.columns[this.columns.length] = $v_0
    },
    sort: function (columnName, sortOrder) {
        this.multipleSort(columnName, sortOrder, false)
    },
    multipleSort: function (columnName, sortOrder, append) {
        var $v_0 = new Mscrm.SortColumnInfo;
        $v_0.$N_0 = columnName;
        $v_0.$S_0 = sortOrder;
        if (append) {
            var $v_1 = this.$39_0(columnName);
            if ($v_1 !== -1) {
                this.columns[$v_1] = $v_0;
                return
            }
        } else this.columns = new Array(0);
        this.columns[this.columns.length] = $v_0
    },
    $39_0: function ($p0) {
        for (var $v_0 = this.columns.length, $v_1 = 0; $v_1 < $v_0; $v_1++) if (this.columns[$v_1].$N_0 === $p0) return $v_1;
        return -1
    },
    deserialize: function (gridParameter) {
        if (gridParameter == null)
            return;
        for (var $v_0 = gridParameter.split(";"), $v_1 = $v_0.length, $v_2 = 0; $v_2 < $v_1; $v_2++) {
            var $v_3 = new Mscrm.SortColumnInfo;
            $v_3.deserialize($v_0[$v_2]);
            this.columns[this.columns.length] = $v_3
        }
    },
    serialize: function () {
        for (var $v_0 = "", $v_1 = this.columns.length, $v_2 = 0; $v_2 < $v_1; $v_2++) {
            if ($v_2 > 0) $v_0 += ";";
            $v_0 += this.columns[$v_2].serialize()
        }
        return $v_0
    }
};
Mscrm.SortColumnInfo = function () { };
Mscrm.SortColumnInfo.prototype = {
    $N_0: "",
    $S_0: true,
    get_name: function () {
        return this.$N_0
    },
    set_name: function (value) {
        this.$N_0 = value;
        return value
    },
    get_ascend: function () {
        return this.$S_0
    },
    set_ascend: function (value) {
        this.$S_0 = value;
        return value
    },
    deserialize: function (column) {
        var $v_0 = column.split(":");
        if ($v_0.length === 2) {
            this.$N_0 = $v_0[0];
            this.$S_0 = $v_0[1] === "1"
        }
    },
    serialize: function () {
        return this.$N_0 + ":" + (this.$S_0 ? "1" : "0")
    }
};
Mscrm.BeforeFormLoadEventArgs.registerClass("Mscrm.BeforeFormLoadEventArgs", Sys.EventArgs);
Mscrm.AppGridDefaultDataControl.registerClass("Mscrm.AppGridDefaultDataControl", Mscrm.CrmUIControl);
Mscrm.AppGridFilterContainer.registerClass("Mscrm.AppGridFilterContainer", Mscrm.CrmUIControl);
Mscrm.AppGridFilterSelector.registerClass("Mscrm.AppGridFilterSelector", Mscrm.CrmUIControl);
Mscrm.AppGridJumpBar.registerClass("Mscrm.AppGridJumpBar", Mscrm.CrmUIControl);
Mscrm.ColumnResizeControl.registerClass("Mscrm.ColumnResizeControl", Mscrm.CrmUIControl);
Mscrm.GridControl.registerClass("Mscrm.GridControl", Mscrm.CrmUIControl, Mscrm.IGridControl, Mscrm.IRibbonSelectionControl, Mscrm.IUIControl);
Mscrm.BeforeRefreshEventArgs.registerClass("Mscrm.BeforeRefreshEventArgs", Sys.EventArgs);
Mscrm.ChangePageEventArgs.registerClass("Mscrm.ChangePageEventArgs", Sys.EventArgs);
Mscrm.GridSizeCalculator.registerClass("Mscrm.GridSizeCalculator", Mscrm.CrmUIBehavior);
Mscrm.GridSpanControl.registerClass("Mscrm.GridSpanControl", Mscrm.CrmUIControl, Mscrm.IRibbonSelectionControlProxy);
Mscrm.GridViewSelector.registerClass("Mscrm.GridViewSelector", Mscrm.CrmUIControl, Mscrm.IRibbonSelectionControlProxy);
Mscrm.QuickFindControl.registerClass("Mscrm.QuickFindControl", Mscrm.CrmUIControl, Mscrm.IRibbonSelectionControlProxy);
Mscrm.SortColumns.registerClass("Mscrm.SortColumns");
Mscrm.SortColumnInfo.registerClass("Mscrm.SortColumnInfo");
Mscrm.GridControl.gridTypeNone = 0;
Mscrm.GridControl.hompageGrid = 1;
Mscrm.GridControl.associatedGrid = 2;
Mscrm.GridControl.inlineSubGrid = 3