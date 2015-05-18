Type.registerNamespace("Mscrm");
Mscrm.FormControlType = function () {};
Mscrm.FormControlType.prototype = {
    none: -1,
    standard: 0,
    hidden: 1,
    iFrame: 2,
    lookup: 3,
    optionSet: 4,
    subGrid: 5,
    webResource: 6,
    quickForm: 7,
    notes: 8
};
Mscrm.FormControlType.registerEnum("Mscrm.FormControlType", false);
Mscrm.FormDataAttributePrivileges = function () {};
Mscrm.FormDataAttributePrivileges.prototype = {
    none: 0,
    create: 1,
    read: 2,
    update: 4
};
Mscrm.FormDataAttributePrivileges.registerEnum("Mscrm.FormDataAttributePrivileges", true);
Mscrm.IFormDataControl = function () {};
Mscrm.IFormDataControl.registerInterface("Mscrm.IFormDataControl");
Mscrm.IWebResourceControl = function () {};
Mscrm.IWebResourceControl.registerInterface("Mscrm.IWebResourceControl");
Mscrm.IWebResourceDataControl = function () {};
Mscrm.IWebResourceDataControl.registerInterface("Mscrm.IWebResourceDataControl");
Mscrm.SerializationMode = function () {};
Mscrm.SerializationMode.prototype = {
    onlyNonNullValues: 0,
    onlyDirtyValues: 1,
    everything: 2
};
Mscrm.SerializationMode.registerEnum("Mscrm.SerializationMode", false);
Mscrm.ValidationType = function () {};
Mscrm.ValidationType.prototype = {
    edit: 1,
    save: 2
};
Mscrm.ValidationType.registerEnum("Mscrm.ValidationType", false);
Mscrm.ValueSource = function () {};
Mscrm.ValueSource.prototype = {
    control: 0,
    initialization: 1,
    newApi: 2,
    oldApi: 3
};
Mscrm.ValueSource.registerEnum("Mscrm.ValueSource", false);
Mscrm.ISerializableFormData = function () {};
Mscrm.ISerializableFormData.registerInterface("Mscrm.ISerializableFormData");
Mscrm.OptionSetItem = function (value, text) {
    this.value = value;
    this.text = text
};
Mscrm.RecordSetStringKeys = function () {};
Mscrm.RecordSetStringKeys.prototype = {
    records: 0,
    moreRecords: 1,
    gridXml: 2,
    remoteCommand: 3,
    refreshData: 4
};
Mscrm.RecordSetStringKeys.registerEnum("Mscrm.RecordSetStringKeys", false);
Mscrm.ClientApiConstants = function () {};
Mscrm.ClientApiCollection = function () {
    this.$M_0 = []
};
Mscrm.ClientApiCollection.prototype = {
    $M_0: null,
    $26_0: false,
    forEach: function (actions, filter) {
        var $v_0 = false;
        if (IsNull(filter)) $v_0 = true;
        for (var $v_1 = 0; $v_1 < this.$M_0.length; $v_1++) {
            var $v_2 = this.$28_0($v_1);
            ($v_0 || filter($v_2, $v_1)) && actions($v_2, $v_1)
        }
    },
    "get": function (o) {
        if (IsNull(o)) {
            Mscrm.Utilities.syncInitAllControls();
            return this.$4X_0()
        }
        switch (typeof o) {
            case Mscrm.TypeNames.functionType:
                Mscrm.Utilities.syncInitAllControls();
                return this.$56_0(o);
            case Mscrm.TypeNames.stringType:
                Mscrm.Utilities.tryInitOnDemandControl(o);
                for (var $v_1 = 0; $v_1 < this.$M_0.length; $v_1++) if (this.$M_0[$v_1].getKey() === o) return this.$28_0($v_1);
                return null;
            case Mscrm.TypeNames.numberType:
                var $v_0 = parseInt(o, 10);
                Mscrm.Utilities.syncInitAllControls();
                return this.$28_0($v_0);
            default:
                Mscrm.Utilities.syncInitAllControls();
                return this.$4X_0()
        }
    },
    getFirst: function (filter) {
        for (var $v_0 = 0; $v_0 < this.$M_0.length; $v_0++) {
            var $v_1 = this.$28_0($v_0);
            if (filter($v_1, $v_0)) return $v_1
        }
        return null
    },
    getLength: function () {
        return this.$M_0.length
    },
    add: function (item) {
        Array.add(this.$M_0, item)
    },
    $1e_0: function () {
        var $v_0 = new Mscrm.ClientApiCollection;
        $v_0.$M_0 = this.$M_0;
        $v_0.$26_0 = true;
        return $v_0
    },
    $56_0: function ($p0) {
        for (var $v_0 = [], $v_1 = 0; $v_1 < this.$M_0.length; $v_1++) {
            var $v_2 = this.$28_0($v_1);
            $p0($v_2, $v_1) && Array.add($v_0, $v_2)
        }
        return $v_0
    },
    $28_0: function ($p0) {
        var $v_0 = this.$M_0[$p0];
        if ($v_0) return this.$26_0 ? $v_0.getWrapper() : $v_0;
        return null
    },
    $5N_0: function ($p0) {
        for (var $v_0 = [], $v_1 = 0; $v_1 < $p0.length; $v_1++) Array.add($v_0, $p0[$v_1].getWrapper());
        return $v_0
    },
    $4X_0: function () {
        if (this.$26_0) return this.$5N_0(this.$M_0);
        else return this.$M_0
    }
};
Mscrm.ClientApiEventHandlerList = function ($p0) {
    this.$2O_0 = $p0
};
Mscrm.ClientApiEventHandlerList.prototype = {
    $2O_0: null,
    $23_0: null,
    addHandler: function ($p0, $p1, $p2) {
        if ($p2) this.$2O_0.addHandler($p0, $p1);
        else {
            var $v_0 = this.$3F_0($p0, true);
            Array.add($v_0, $p1)
        }
    },
    getHandler: function ($p0) {
        var $v_0 = this.$2O_0.getHandler($p0),
            $v_1 = this.$3F_0($p0, false);
        if (!$v_1 || !$v_1.length) return $v_0 ? $v_0 : null;
        $v_1 = Array.clone($v_1);
        var $$t_8 = this;
        return function ($p1_0, $p1_1) {
            $v_0 && $v_0($p1_0, $p1_1);
            for (var $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
                var $v_3 = Mscrm.FormUtility.constructExecutionObject($p1_0, 0, $p1_1, null),
                    $v_4 = $v_1[$v_2];
                $v_4($v_3)
            }
        }
    },
    removeHandler: function ($p0, $p1) {
        this.$2O_0.removeHandler($p0, $p1);
        var $v_0 = this.$3F_0($p0, false);
        $v_0 && Array.remove($v_0, $p1)
    },
    $3F_0: function ($p0, $p1) {
        if (!this.$23_0) if ($p1) this.$23_0 = {};
        else return null;
        if (!this.$23_0[$p0] && $p1) this.$23_0[$p0] = [];
        return this.$23_0[$p0]
    }
};
Mscrm.ClientApiUtility = function () {};
Mscrm.ClientApiUtility.$$cctor = function () {
    Xrm.Page.getAttribute = Mscrm.ClientApiUtility.getAttribute;
    Xrm.Page.getControl = Mscrm.ClientApiUtility.getControl
};
Mscrm.ClientApiUtility.getAttribute = function (name) {
    var $v_0 = Xrm.Page.data;
    return !$v_0 ? null : $v_0.entity.attributes.get(name)
};
Mscrm.ClientApiUtility.getControl = function (id) {
    var $v_0 = Xrm.Page.ui;
    return !$v_0 ? null : $v_0.controls.get(id)
};
Mscrm.EntitySaveEventArgs = function ($p0) {
    Mscrm.EntitySaveEventArgs.initializeBase(this);
    this.$3g_2 = $p0
};
Mscrm.EntitySaveEventArgs.prototype = {
    $3g_2: 0,
    getSaveMode: function () {
        return this.$3g_2
    }
};
Mscrm.FormCloseEventArgs = function () {
    Mscrm.FormCloseEventArgs.initializeBase(this)
};
Mscrm.FormEventArgs = function () {
    Mscrm.FormEventArgs.initializeBase(this)
};
Mscrm.FormEventArgs.prototype = {
    $3b_1: false,
    isDefaultPrevented: function () {
        return this.$3b_1
    },
    preventDefault: function () {
        this.$3b_1 = true
    }
};
Mscrm.FormDataManager = function () {
    this.$1p_0 = {}
};
Mscrm.FormDataManager.$6q = function ($p0) {
    var $v_0 = Xrm.Page.data;
    if (!$v_0) Xrm.Page.data = $v_0 = new Mscrm.FormDataManager;
    var $v_1 = $v_0.getEntityById($p0.get_id());
    if (!IsNull($v_1)) {
        $v_1.$4m_0();
        $v_1 = null
    }
    var $v_2 = $p0.$2A_1();
    if ($p0.get_id() === "PrimaryEntity") $v_0.entity = $v_2;
    $v_0.$1p_0[$p0.get_id()] = $v_2
};
Mscrm.FormDataManager.$7K = function ($p0) {
    var $v_0 = Xrm.Page.data;
    if (IsNull($v_0)) return;
    if ($p0 === "PrimaryEntity") $v_0.entity = null;
    $v_0.$1p_0[$p0] = null
};
Mscrm.FormDataManager.prototype = {
    entity: null,
    getEntityById: function (id) {
        if (id in this.$1p_0) return this.$1p_0[id];
        else return null
    },
    $1p_0: null
};
Mscrm.FormDataAttributePrivilege = function (privileges) {
    this.canCreate = !! (privileges & 1);
    this.canRead = !! (privileges & 2);
    this.canUpdate = !! (privileges & 4)
};
Mscrm.FormDataAttributePrivilege.prototype = {
    canCreate: false,
    canRead: false,
    canUpdate: false
};
Mscrm.FormUIControl = function ($p0) {
    this.$$d_$5X_4 = Function.createDelegate(this, this.$5X_4);
    this.$$d_$5S_4 = Function.createDelegate(this, this.$5S_4);
    Mscrm.FormUIControl.initializeBase(this, [$p0])
};
Mscrm.FormUIControl.$49 = function ($p0) {
    var $v_0 = $p0.getAttribute("isAutoExpanding");
    if (!IsNull($v_0) && $v_0.toString() === "TRUE") return true;
    else return false
};
Mscrm.FormUIControl.prototype = {
    $1L_4: 0,
    $2q_4: null,
    $6_4: null,
    $2_4: null,
    $3l_4: true,
    $1S_4: null,
    get_dataFieldName: function () {
        return this.$2q_4
    },
    set_dataFieldName: function (value) {
        this.$2q_4 = value;
        return value
    },
    get_innerControl: function () {
        if (!this.$6_4) {
            Mscrm.Utilities.tryInitOnDemandControl(this.$d_3);
            if (this.$1L_4 === 5) this.$6_4 = Mscrm.GridControl.findComponent(this.$d_3);
            else this.$6_4 = $find(this.$d_3)
        }
        return this.$6_4
    },
    set_innerControl: function (value) {
        this.$6_4 = value;
        return value
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        if (!this.$6_4) {
            var $v_0 = false;
            if (IsNull(window._aControlHeaderList)) $v_0 = true;
            else {
                var $v_1 = window._aControlHeaderList[this.$d_3];
                if (!$v_1 || $v_1.State === "complete") $v_0 = true
            }
            if ($v_0) if (this.$2q_4);
        }
        this.$2_4 = $get(this.$d_3 + "_c");
        this.$3l_4 = !! this.$2_4 && this.$2_4.getAttribute("sl") !== "false";
        this.$4c_4()
    },
    isVisibleInTree: function () {
        var $v_0 = this.get_parent();
        return this.getVisible() && $v_0.getVisible() && $v_0.get_parent().getVisible()
    },
    setFocus: function () {
        !this.getVisible() && this.setVisible(true);
        var $v_0 = this.get_parent();
        !$v_0.getVisible() && $v_0.setVisible(true);
        var $v_1 = $v_0.get_parent();
        !$v_1.getVisible() && $v_1.setVisible(true);
        $v_1.get_displayState() === "collapsed" && $v_1.set_displayState("expanded");
        this.get_innerControl().setFocus()
    },
    setRequiredLevel: function (level) {
        if (this.$2_4) {
            var $v_0 = "";
            switch (level) {
                case "recommended":
                    $v_0 = LOCID_FORM_RECOMMENDED_ALT;
                    break;
                case "required":
                    $v_0 = LOCID_FORM_REQUIRED_ALT;
                    break;
                case "none":
                    break;
                default:
                    return
            }
            Mscrm.Form.setFieldRequiredOrRecommended(this.$2_4, Xrm.RequiredLevel.toLegacyValue(level), $v_0)
        }
        if (this.get_innerControl() && Sys.UI.Control.isInstanceOfType(this.get_innerControl())) {
            var $v_1 = this.get_innerControl().get_element();
            $v_1.setAttribute("req", level)
        }
    },
    setVisible: function (isVisible) {
        this.get_element().style.visibility = isVisible ? "visible" : "hidden";
        this.get_innerControl().setVisible(isVisible);
        if (isVisible && !isNullOrEmptyString(this.get_element().style.display)) this.get_element().style.display = "";
        if (!IsNull(this.$2_4) && this.$3l_4) {
            this.$2_4.style.visibility = isVisible ? "visible" : "hidden";
            if (isVisible && !isNullOrEmptyString(this.$2_4.style.display)) this.$2_4.style.display = ""
        }
        this.$5a_4(isVisible)
    },
    isEditing: function () {
        return false
    },
    $5a_4: function ($p0) {
        var $v_0 = this.get_parent(),
            $v_1 = $v_0.get_element().offsetHeight;
        this.$7C_4(this.get_element());
        this.$7B_4(this.get_element(), $p0);
        this.$4Z_4($p0);
        this.$5T_4($p0, $v_1)
    },
    $7C_4: function ($p0) {
        var $v_0 = true,
            $v_1 = $p0.parentNode;
        if ($v_1.hasChildNodes()) for (var $v_2 = $v_1.childNodes, $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_4 = $v_2[$v_3];
            if ($v_4.style.visibility !== "hidden") {
                $v_0 = false;
                break
            }
        }
        if ($v_0 && this.$3u_4()) $v_1.style.display = "none";
        else $v_1.style.display = ""
    },
    $7B_4: function ($p0, $p1) {
        if (!IsNull($p0)) {
            var $v_0 = XUI.Html.DomUtils.GetNextSibling($p0.parentNode),
                $v_1 = 1,
                $v_2 = $p0.getAttribute("rowspan");
            if (!IsNull($v_2)) $v_1 = parseInt($v_2.toString(), 10);
            if (this.$3u_4()) while (!IsNull($v_0) && $v_1-- > 1) {
                $v_0.style.display = $p1 ? "" : "none";
                $v_0 = XUI.Html.DomUtils.GetNextSibling($v_0)
            }
        }
    },
    $4Z_4: function ($p0) {
        if (this.$47_4()) {
            var $v_0 = this.get_parent(),
                $v_1 = $v_0.get_parent();
            !IsNull($v_1) && $v_1.get_element().setAttribute("IsViewportTab", $p0 ? "1" : "0");
            $v_0.get_element().setAttribute("IsViewportSection", $p0 ? "1" : "0");
            if (!$p0) {
                if (!IsNull($v_1)) {
                    $v_1.get_element().style.height = "";
                    $v_1.get_element().childNodes[1].style.height = ""
                }
                $v_0.get_element().style.height = ""
            }
        }
    },
    $5T_4: function ($p0, $p1) {
        var $v_0 = $find("crmForm");
        if (!IsNull($v_0)) {
            var $v_1 = this.get_parent(),
                $v_2 = $v_1.get_parent();
            if (this.$47_4()) {
                !IsNull($v_2) && $v_0.SetViewportTabSection("tab", $v_2.get_id(), $p0);
                $v_0.SetViewportTabSection("section", $v_1.get_id(), $p0)
            } else !IsNull($v_2) && $v_0.ModifyMinimumTabHeight($v_1.get_element().offsetHeight - $p1, $v_2.get_id());
            $v_0.HandleResize()
        }
    },
    $3u_4: function () {
        var $v_0 = 1,
            $v_1 = this.get_element().getAttribute("formXmlColSpan");
        if (!IsNull($v_1)) $v_0 = parseInt($v_1.toString(), 10);
        var $v_2 = this.$5H_4();
        return $v_0 === $v_2
    },
    $47_4: function () {
        return Mscrm.FormUIControl.$49(this.get_element())
    },
    $5H_4: function () {
        var $v_0 = this.get_parent(),
            $v_1 = $v_0.get_element().getAttribute("columns");
        if (!IsNull($v_1)) return parseInt($v_1.toString(), 10);
        else return XUI.Html.DomUtils.GetFirstChild($v_0.get_element()).childNodes.length / 2
    },
    getWrapperInternal: function () {
        switch (this.$1L_4) {
            case 3:
                return new Mscrm.LookupUIControlWrapper(this);
            case 5:
                return new Mscrm.SubGridUIControlWrapper(this);
            case 6:
                switch (this.get_innerControl().get_element().tagName) {
                    case "IMG":
                        return new Mscrm.WebResourceUIControlWrapper(this);
                    case "OBJECT":
                        return new Mscrm.WebResourceDataUIControlWrapper(this);
                    default:
                        return new Mscrm.WebResourceObjectUIControlWrapper(this)
                }
            case 2:
                return new Mscrm.IFrameUIControlWrapper(this);
            case 4:
                var $v_0 = this.get_innerControl().get_attribute();
                if ($v_0 && $v_0.$F_1 === "boolean") return new Mscrm.BooleanOptionSetUIControlWrapper(this);
                else return new Mscrm.OptionSetUIControlWrapper(this);
            case 8:
            case 0:
                var $v_1 = this.get_innerControl().get_element();
                if (Sys.UI.DomElement.containsCssClass($v_1, "ms-crm-CheckBox") || Sys.UI.DomElement.containsCssClass($v_1, "ms-crm-RadioButton")) return new Mscrm.BooleanUIControlWrapper(this);
                else return new Mscrm.DataUIControlWrapper(this);
            default:
                return null
        }
    },
    get_label: function () {
        return Mscrm.Utilities.getNonHiddenInnerText(this.$2_4)
    },
    set_label: function (value) {
        Mscrm.Utilities.setNonHiddenLabelValue(this.$2_4, value);
        return value
    },
    get_controlType: function () {
        return this.$1L_4
    },
    set_controlType: function (value) {
        this.$1L_4 = value;
        return value
    },
    dispose: function () {
        this.$4k_4();
        Mscrm.FormUIElement.prototype.dispose.call(this)
    },
    $4c_4: function () {
        var $v_0 = this.$5A_4();
        if (IsNull($v_0)) {
            Mscrm.FormUtility.$2S(this.get_element(), this.$$d_$5S_4, true);
            return
        }
        $addHandler($v_0, "load", this.$$d_$5X_4)
    },
    $5X_4: function ($p0) {
        var $v_0 = $p0.target,
            $v_1 = null;
        try {
            $v_1 = $v_0.contentWindow.document.body;
            Mscrm.FormUtility.$2S($v_1, this.$$d_$5S_4, true)
        } catch ($$e_3) {}
    },
    $5S_4: function ($p0) {
        Mscrm.Utilities.tryInitOnDemandControl(this.$d_3);
        Mscrm.FormUIControl.$2e = this
    },
    $5A_4: function () {
        if (this.$1L_4 !== 8) return null;
        if (IsNull(this.$1S_4)) this.$1S_4 = this.get_innerControl().get_element();
        return this.$1S_4
    },
    $4k_4: function () {
        if (IsNull(this.$1S_4)) {
            Mscrm.FormUtility.$2S(this.get_element(), this.$$d_$5S_4, false);
            return
        }
        try {
            $removeHandler(this.$1S_4, "load", this.$$d_$5X_4);
            var $v_0 = this.$1S_4.contentWindow.document.body;
            Mscrm.FormUtility.$2S($v_0, this.$$d_$5S_4, false)
        } catch ($$e_1) {}
    }
};
Mscrm.FormUIElement = function (e) {
    Mscrm.FormUIElement.initializeBase(this, [e])
};
Mscrm.FormUIElement.prototype = {
    $d_3: null,
    $2H_3: null,
    $i_3: null,
    get_elementId: function () {
        return this.$d_3
    },
    set_elementId: function (value) {
        this.$d_3 = value;
        return value
    },
    get_elementName: function () {
        return this.$2H_3
    },
    set_elementName: function (value) {
        this.$2H_3 = value;
        return value
    },
    getKey: function () {
        return this.$2H_3
    },
    getVisible: function () {
        return this.get_visible()
    },
    setVisible: function (isVisible) {
        this.set_visible(isVisible)
    },
    getWrapper: function () {
        if (!this.$i_3) this.$i_3 = this.getWrapperInternal();
        return this.$i_3
    },
    dispose: function () {
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    }
};
Mscrm.FormUIFormSelector = function () {
    Mscrm.FormUIFormSelector.initializeBase(this);
    this.$f_1 = new Mscrm.ClientApiCollection
};
Mscrm.FormUIFormSelector.prototype = {
    $T_1: null,
    $f_1: null,
    get_currentForm: function () {
        var $v_0 = !this.$T_1 ? null : this.$T_1.$n_3;
        return isNullOrEmptyString($v_0) ? null : this.$f_1.get($v_0)
    },
    get_formSelector: function () {
        return this.$T_1
    },
    set_formSelector: function (value) {
        this.$T_1 = value;
        return value
    },
    get_items: function () {
        return this.$f_1
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        if (this.$T_1) {
            var $v_0 = this.$T_1.$1r_3;
            if ($v_0) for (var $v_1 = this.$T_1.$2I_3, $v_2 = 0; $v_2 < $v_0.length; $v_2++) this.$f_1.add(new Mscrm.FormUIRuleForm($v_0[$v_2], $v_1[$v_2]))
        }
    },
    dispose: function () {
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    $2A_1: function () {
        return new Mscrm.FormSelectorWrapper(this)
    }
};
Mscrm.FormUIManager = function () {
    Mscrm.FormUIManager.initializeBase(this);
    this.controls = new Mscrm.ClientApiCollection;
    this.controls.$26_0 = true;
    this.tabs = new Mscrm.ClientApiCollection;
    this.tabs.$26_0 = true;
    this.$5v_1();
    this.$5q_1();
    var $v_0 = Sys.Serialization.JavaScriptSerializer.deserialize(_formHierarchy).children;
    this.$4e_1($v_0);
    this.$1q_1 = $find("crmForm")
};
Mscrm.FormUIManager.$5p = function ($p0, $p1, $p2) {
    var $v_0 = $p0.child;
    if (!IsNull($v_0) && $v_0.isClientApiEnabled) {
        var $v_1 = $get($v_0.id),
            $v_2 = $get($v_0.id + "_d");
        if (($v_1 || $v_0.controlType === 5) && $v_2 && $v_0.controlType !== 1) {
            var $v_3 = {
                controlType: $v_0.controlType,
                dataFieldName: $v_0.name,
                elementId: $v_0.id,
                elementName: $v_0.id,
                parent: $p1
            }, $v_4 = {
                innerControl: $v_0.id
            }, $v_5 = $create(Mscrm.FormUIControl, $v_3, null, $v_4, $v_2);
            $p1.$I_4.add($v_5);
            $p2.controls.add($v_5)
        }
    }
};
Mscrm.FormUIManager.$5x = function ($p0, $p1) {
    var $v_0 = $get($p0.id);
    if ($v_0) {
        var $v_1 = {
            elementId: $p0.id,
            elementName: $p0.name,
            parent: $p1
        }, $v_2 = $create(Mscrm.FormUISection, $v_1, null, null, $v_0);
        $p1.$35_4.add($v_2);
        return $v_2
    } else if (Mscrm.CrmUri.create(window.location.href).get_pageType() === "entityrecord");
    return null
};
Mscrm.FormUIManager.$5z = function ($p0, $p1, $p2) {
    var $v_0 = String.format("tab{0}", $p1),
        $v_1 = $get($v_0);
    if ($v_1) {
        var $v_2 = {
            elementId: $p0.id,
            elementName: $p0.name,
            parent: $p2
        }, $v_3 = "crmEventManager";
        if (!IsNull($find("crmInlinePageManager"))) $v_3 = "__Page_crmEventManager";
        var $v_4 = {
            eventManager: $v_3
        }, $v_5 = $create(Mscrm.FormUITab, $v_2, null, $v_4, $v_1);
        $p2.tabs.add($v_5);
        return $v_5
    } else if (Mscrm.CrmUri.create(window.location.href).get_pageType() === "entityrecord");
    return null
};
Mscrm.FormUIManager.prototype = {
    controls: null,
    navigation: null,
    formSelector: null,
    tabs: null,
    $1q_1: null,
    dispose: function () {
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    getCurrentControl: function () {
        var $v_0 = Mscrm.FormUIControl.$2e;
        if (!IsNull($v_0) && $v_0.get_element().id && $v_0.get_id().endsWith("_d")) {
            var $v_1 = $v_0.get_element().id;
            return this.controls.get($v_1.substring(0, $v_1.length - 2))
        }
        return null
    },
    getFormType: function () {
        return this.$1q_1.get_formType()
    },
    getViewPortHeight: function () {
        return this.$1q_1.GetViewportHeight()
    },
    getViewPortWidth: function () {
        return this.$1q_1.GetViewportWidth()
    },
    refreshRibbon: function () {
        refreshRibbon()
    },
    close: function () {
        this.$1q_1.CloseRecord()
    },
    $4e_1: function ($p0) {
        this.$2T_1($p0, this)
    },
    $2T_1: function ($p0, $p1) {
        if (!IsNull($p0)) for (var $v_0 = 0; $v_0 < $p0.length; $v_0++) {
            var $v_1 = $p0[$v_0];
            switch ($v_1.__type) {
                case "tab":
                    var $v_2 = Mscrm.FormUIManager.$5z($v_1, $v_0, this);
                    $v_2 && this.$2T_1($v_1.children, $v_2);
                    break;
                case "section":
                    var $v_3 = Mscrm.FormUIManager.$5x($v_1, $p1);
                    $v_3 && this.$2T_1($v_1.children, $v_3);
                    break;
                case "cell":
                    Mscrm.FormUIManager.$5p($v_1, $p1, this);
                    break;
                case "column":
                case "row":
                default:
                    this.$2T_1($v_1.children, $p1);
                    break
            }
        }
    },
    $5v_1: function () {
        var $v_0 = {};
        $v_0["formNavControl"] = "crmNavBar";
        var $v_1 = $create(Mscrm.FormUINavigationBar, null, null, $v_0, null);
        this.navigation = $v_1.$2A_1()
    },
    $5q_1: function () {
        var $v_0 = {};
        $v_0["formSelector"] = "crmFormSelector";
        var $v_1 = $create(Mscrm.FormUIFormSelector, null, null, $v_0, null);
        this.formSelector = $v_1.$2A_1()
    }
};
Mscrm.FormUINavigationBar = function () {
    this.$$d_$5s_1 = Function.createDelegate(this, this.$5s_1);
    Mscrm.FormUINavigationBar.initializeBase(this);
    this.$f_1 = new Mscrm.ClientApiCollection
};
Mscrm.FormUINavigationBar.prototype = {
    $17_1: null,
    $f_1: null,
    get_formNavControl: function () {
        return this.$17_1
    },
    set_formNavControl: function (value) {
        this.$17_1 = value;
        return value
    },
    get_items: function () {
        return this.$f_1
    },
    get_visible: function () {
        return !!this.$17_1
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        this.$17_1 && this.$17_1.add_$4a_3(this.$$d_$5s_1)
    },
    dispose: function () {
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    $2A_1: function () {
        return new Mscrm.NavigationBarWrapper(this)
    },
    $5s_1: function ($p0, $p1) {
        for (var $v_0 = this.$17_1.getItemIds(), $v_1 = 0; $v_1 < $v_0.length; $v_1++) this.$f_1.add(new Mscrm.FormUINavigationBarItem(this.$17_1, $v_0[$v_1]))
    }
};
Mscrm.FormUINavigationBarItem = function ($p0, $p1) {
    this.$1t_0 = $p0;
    this.$U_0 = $p1
};
Mscrm.FormUINavigationBarItem.prototype = {
    $1t_0: null,
    $U_0: null,
    getId: function () {
        return this.$U_0
    },
    getKey: function () {
        return this.$U_0
    },
    getLabel: function () {
        return this.$1t_0.getItemText(this.$U_0)
    },
    getVisible: function () {
        return this.$1t_0.getItemVisibility(this.$U_0)
    },
    getWrapper: function () {
        return this
    },
    setFocus: function () {
        this.setVisible(true);
        var $v_0 = $get(this.$U_0);
        XUI.Html.DispatchDomEvent($v_0, XUI.Html.CreateDomEvent("click"))
    },
    setLabel: function (labelText) {
        this.$1t_0.setItemText(this.$U_0, labelText)
    },
    setVisible: function (isVisible) {
        this.$1t_0.setItemVisibility(this.$U_0, isVisible)
    }
};
Mscrm.FormUIRuleForm = function (id, label) {
    this.$$d_navigate = Function.createDelegate(this, this.navigate);
    this.$U_0 = id;
    this.$2_0 = label
};
Mscrm.FormUIRuleForm.prototype = {
    $U_0: null,
    $2_0: null,
    getId: function () {
        return this.$U_0
    },
    getKey: function () {
        return this.$U_0
    },
    getLabel: function () {
        return this.$2_0
    },
    getWrapper: function () {
        return this
    },
    navigate: function () {
        if (isActionQueueActive()) {
            window.setTimeout(this.$$d_navigate, 5);
            return
        }
        var $v_0 = Mscrm.Utilities.getContentUrl(this);
        $v_0.get_query()["formid"] = this.$U_0;
        var $v_1 = {};
        $v_1["uri"] = $v_0.toString();
        $v_1["sameWindow"] = true;
        Mscrm.PageManager.get_instance().raiseEvent(Mscrm.ScriptEvents.NavigateRequest, $v_1)
    }
};
Mscrm.FormUISection = function ($p0) {
    Mscrm.FormUISection.initializeBase(this, [$p0]);
    this.$I_4 = new Mscrm.ClientApiCollection;
    var $v_0 = $p0,
        $v_1 = $v_0.rows[0];
    if ($v_1) {
        var $v_2 = $v_1.cells[0];
        if ($v_2 && Sys.UI.DomElement.containsCssClass($v_2, "ms-crm-Form-Section") && !Sys.UI.DomElement.containsCssClass($v_2, "ms-crm-Form-SectionBar-Spacer")) this.$2_4 = XUI.Html.DomUtils.GetFirstChild($v_2);
        else this.$1T_4 = $v_0.getAttribute("label")
    }
    this.$5o_4()
};
Mscrm.FormUISection.$43 = function ($p0) {
    var $v_0 = $find($p0);
    if (IsNull($v_0)) {
        Mscrm.CrmUIComponent.crmCreate(Mscrm.FormUISection, null, null, null, $get($p0));
        $v_0 = $find($p0)
    }
    return $v_0
};
Mscrm.FormUISection.prototype = {
    $I_4: null,
    $2_4: null,
    $1T_4: null,
    $2F_4: null,
    dispose: function () {
        this.$2F_4 = null;
        this.$I_4 = null;
        this.$2_4 = null;
        Mscrm.FormUIElement.prototype.dispose.call(this)
    },
    get_label: function () {
        return this.$2_4 ? XUI.Html.GetText(this.$2_4) : this.$1T_4
    },
    set_label: function (value) {
        if (this.$2_4) XUI.Html.SetText(this.$2_4, value);
        else this.$1T_4 = value;
        return value
    },
    getWrapperInternal: function () {
        return new Mscrm.SectionWrapper(this)
    },
    $5o_4: function () {
        for (var $v_0 = this.get_element().getElementsByTagName("TD"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            var $v_2 = $v_0[$v_1];
            if (Mscrm.FormUIControl.$49($v_2)) this.$2F_4 = $v_2
        }
    },
    $3M_4: function () {
        this.$4L_4(false)
    },
    $4J_4: function () {
        this.$4L_4(true)
    },
    $4L_4: function ($p0) {
        if (!IsNull(this.$2F_4)) {
            var $v_0 = this.$2F_4;
            if (this.$7G_4($v_0)) return;
            var $v_1 = $v_0.offsetHeight;
            if ($v_1 > 0) if ($p0) $v_0.style.height = "auto";
            else $v_0.style.height = ($v_1 - Mscrm.Utilities.getVerticalBoxPadding($v_0)).toString() + "px"
        }
    },
    $7G_4: function ($p0) {
        var $v_0 = XUI.Html.DomUtils.GetLastChild($p0);
        if (!IsNull($v_0)) {
            if ($v_0.tagName === "IFRAME") return false;
            var $v_1 = $v_0.getAttribute("type");
            if ($v_1 === "subgrid") return true
        }
        return false
    }
};
Mscrm.FormUITab = function ($p0) {
    this.$$d_$6N_4 = Function.createDelegate(this, this.$6N_4);
    Mscrm.FormUITab.initializeBase(this, [$p0]);
    this.$35_4 = new Mscrm.ClientApiCollection
};
Mscrm.FormUITab.get_$4G = function () {
    return $find("crmNavBar")
};
Mscrm.FormUITab.$58 = function ($p0) {
    if (IsNull($p0.style)) return true;
    else return $p0.style.display !== "none" && $p0.style.visibility !== "hidden"
};
Mscrm.FormUITab.$6y = function ($p0, $p1) {
    $p0.style.display = $p1 ? "" : "none"
};
Mscrm.FormUITab.prototype = {
    $1k_4: null,
    $11_4: null,
    $2_4: null,
    $1T_4: null,
    $35_4: null,
    add_tabStateChange: function (value) {
        this.get_events().addHandler("TabStateChange", value)
    },
    remove_tabStateChange: function (value) {
        this.get_events().removeHandler("TabStateChange", value)
    },
    get_displayState: function () {
        return Mscrm.FormUITab.$58(this.$1k_4) ? "expanded" : "collapsed"
    },
    set_displayState: function (value) {
        switch (value) {
            case "collapsed":
            case "expanded":
                break;
            default:
                return value
        }
        var $v_0 = this.get_displayState(),
            $v_1 = value === "expanded";
        Mscrm.FormUITab.$6y(this.$1k_4, $v_1);
        if (this.$11_4) {
            var $v_2 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create($v_1 ? "/_imgs/tab_section_down.png" : "/_imgs/tab_section_right.png"));
            this.$11_4.src = $v_2.source;
            this.$11_4.className = Mscrm.ImageStrip.replaceExistingImageStripClass(this.$11_4.className, $v_2.cssClass);
            this.$11_4.alt = this.$11_4.title = $v_1 ? window.LOCID_FORM_TABHEADER_COLLAPSE : window.LOCID_FORM_TABHEADER_EXPAND
        }
        if (this.get_isInitialized() && $v_0 !== value) {
            if (value === "expanded") for (var $v_3 = this.get_element().getElementsByTagName("IFRAME"), $v_4 = 0; $v_4 < $v_3.length; $v_4++) {
                var $v_5 = $v_3[$v_4].attributes.getNamedItem("gridId");
                if (!IsNull($v_5)) {
                    var $v_6 = {};
                    $v_6["id"] = $v_5.value;
                    Mscrm.PageManager.get_instance().raiseEvent(Mscrm.ScriptEvents.TabExpended, $v_6)
                }
            }
            this.$6S_4()
        }
        return value
    },
    get_label: function () {
        return this.$2_4 ? XUI.Html.GetText(this.$2_4) : this.$1T_4
    },
    set_label: function (value) {
        if (this.$2_4) {
            XUI.Html.SetText(this.$2_4, value);
            var $v_0 = Mscrm.FormUITab.get_$4G();
            $v_0 && $v_0.setItemText(String.format("{0}Tab", this.get_id()), value)
        } else this.$1T_4 = value;
        return value
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        var $v_0 = $get(String.format("{0}_Header", this.$d_3));
        if ($v_0) {
            var $v_1 = $v_0.getElementsByTagName("H2");
            if ($v_1.length > 0) this.$2_4 = $v_1[0];
            this.$1k_4 = XUI.Html.DomUtils.GetNextSibling($v_0);
            var $v_2 = $v_0.getElementsByTagName("IMG");
            if ($v_2.length > 0) {
                this.$11_4 = $v_2[0];
                for (var $v_3 = $v_0.getElementsByTagName("A"), $v_4 = 0; $v_4 < $v_3.length; $v_4++) $addHandler($v_3[$v_4], "click", this.$$d_$6N_4)
            }
        } else {
            this.$1k_4 = XUI.Html.DomUtils.GetFirstChild(this.get_element());
            this.$1T_4 = this.$1k_4.getAttribute("label")
        }
        this.set_displayState(this.get_displayState())
    },
    setFocus: function () {
        var $v_0 = $find("crmForm");
        $v_0 && $v_0.GetTab(this.get_element(), true)
    },
    setVisible: function (isVisible) {
        Mscrm.FormUIElement.prototype.setVisible.call(this, isVisible);
        var $v_0 = Mscrm.FormUITab.get_$4G();
        $v_0 && $v_0.setItemVisibility(String.format("{0}Tab", this.get_id()), isVisible)
    },
    getWrapperInternal: function () {
        return new Mscrm.TabWrapper(this)
    },
    $6N_4: function ($p0) {
        this.set_displayState(this.get_displayState() === "collapsed" ? "expanded" : "collapsed");
        Mscrm.FormUtility.refreshWindowInIE7();
        $p0.preventDefault()
    },
    $6S_4: function () {
        var $v_0 = this.get_events().getHandler("TabStateChange");
        if ($v_0) {
            var $v_1 = new Mscrm.TabStateChangeEventArgs(this.get_displayState());
            $v_0(this.getWrapper(), $v_1)
        }
    }
};
Mscrm.TabStateChangeEventArgs = function ($p0) {
    Mscrm.TabStateChangeEventArgs.initializeBase(this);
    this.$1n_1 = $p0
};
Mscrm.TabStateChangeEventArgs.prototype = {
    $1n_1: null,
    get_displayState: function () {
        return this.$1n_1
    }
};
Mscrm.AttributeWrapper = function ($p0) {
    this._attribute = $p0;
    this.$3o_0 = new Mscrm.FormDataAttributePrivilege($p0.$1D_1);
    this.controls = this._attribute.$I_1.$1e_0()
};
Mscrm.AttributeWrapper.prototype = {
    controls: null,
    _attribute: null,
    $3o_0: null,
    addOnChange: function (handler, system) {
        this._attribute.addOnChange(handler, !! system)
    },
    fireOnChange: function () {
        this._attribute.fireOnChange()
    },
    getAttributeType: function () {
        return this._attribute.$F_1
    },
    getFormat: function () {
        return this._attribute.$e_1
    },
    getIsDirty: function () {
        return this._attribute.get_isDirty()
    },
    getName: function () {
        return this._attribute.$7_1
    },
    getParent: function () {
        return this._attribute.$v_1.$2A_1()
    },
    getRequiredLevel: function () {
        return this._attribute.get_requiredLevelValue()
    },
    getSubmitMode: function () {
        return this._attribute.get_submitModeValue()
    },
    getUserPrivilege: function () {
        return this.$3o_0
    },
    getValue: function () {
        return this._attribute.get_value()
    },
    removeOnChange: function (handler) {
        this._attribute.removeOnChange(handler)
    },
    setRequiredLevel: function (level) {
        this._attribute.set_requiredLevelValue(level)
    },
    setSubmitMode: function (value) {
        this._attribute.set_submitModeValue(value)
    },
    setValue: function (value) {
        this._attribute.set_value(value)
    }
};
Mscrm.BooleanAttributeWrapper = function ($p0) {
    Mscrm.BooleanAttributeWrapper.initializeBase(this, [$p0])
};
Mscrm.BooleanAttributeWrapper.prototype = {
    getInitialValue: function () {
        return this._attribute.$L_1
    }
};
Mscrm.BooleanOptionSetUIControlWrapper = function ($p0) {
    Mscrm.BooleanOptionSetUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.BooleanOptionSetUIControlWrapper.prototype = {
    getFormat: function () {
        return "dropdown"
    }
};
Mscrm.BooleanUIControlWrapper = function ($p0) {
    Mscrm.BooleanUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.BooleanUIControlWrapper.prototype = {
    getFormat: function () {
        return Sys.UI.DomElement.containsCssClass(this._control.get_innerControl().get_element(), "ms-crm-CheckBox") ? "checkbox" : "radiobutton"
    }
};
Mscrm.DataUIControlWrapper = function ($p0) {
    Mscrm.DataUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.DataUIControlWrapper.prototype = {
    getAttribute: function () {
        var $v_0 = this._control.get_innerControl();
        if (Mscrm.IFormDataControl.isInstanceOfType($v_0)) return $v_0.get_attribute().getWrapper();
        return null
    }
};
Mscrm.EntityWrapper = function ($p0) {
    this.$S_0 = $p0;
    this.attributes = $p0.$b_1.$1e_0()
};
Mscrm.EntityWrapper.prototype = {
    attributes: null,
    $S_0: null,
    addOnSave: function (handler, system) {
        this.$S_0.addOnSave(handler, !! system)
    },
    getIsDirty: function () {
        return this.$S_0.get_isDirty()
    },
    getDataXml: function () {
        var $v_0 = this.$S_0.get_isNew() ? 0 : 1;
        return this.$S_0.serialize($v_0)
    },
    getId: function () {
        return this.$S_0.get_recordId()
    },
    getClientId: function () {
        return this.$S_0.get_id()
    },
    getEntityName: function () {
        return this.$S_0.$22_1
    },
    removeOnSave: function (handler) {
        this.$S_0.removeOnSave(handler)
    },
    save: function (action) {
        this.$S_0.save(action)
    },
    $4m_0: function () {
        this.$S_0.dispose();
        this.$S_0 = null
    }
};
Mscrm.FormSelectorWrapper = function ($p0) {
    this.$3a_0 = $p0;
    this.items = $p0.$f_1.$1e_0()
};
Mscrm.FormSelectorWrapper.prototype = {
    items: null,
    $3a_0: null,
    getCurrentItem: function () {
        return this.$3a_0.get_currentForm()
    }
};
Mscrm.FormUIElementWrapper = function (control) {
    this._control = control
};
Mscrm.FormUIElementWrapper.prototype = {
    _control: null,
    getLabel: function () {
        return this._control.get_label()
    },
    getName: function () {
        return this._control.$2H_3
    },
    getParent: function () {
        return this._control.get_parent().getWrapper()
    },
    getVisible: function () {
        return this._control.getVisible()
    },
    setLabel: function (labelText) {
        this._control.set_label(labelText)
    },
    setVisible: function (isVisible) {
        this._control.setVisible(isVisible)
    }
};
Mscrm.IFrameUIControlWrapper = function ($p0) {
    Mscrm.IFrameUIControlWrapper.initializeBase(this, [$p0]);
    this.$6_2 = $p0.get_innerControl()
};
Mscrm.IFrameUIControlWrapper.prototype = {
    $6_2: null,
    add_readyStateComplete: function (value) {
        this.$6_2.add_readyStateComplete(value)
    },
    remove_readyStateComplete: function (value) {
        this.$6_2.remove_readyStateComplete(value)
    },
    getObject: function () {
        return this.$6_2.get_element()
    },
    getSrc: function () {
        return this.$6_2.getSrc()
    },
    setSrc: function (src) {
        this.$6_2.setSrc(src)
    },
    getInitialUrl: function () {
        return this.$6_2.getUrl()
    }
};
Mscrm.LookupUIControlWrapper = function ($p0) {
    Mscrm.LookupUIControlWrapper.initializeBase(this, [$p0]);
    this.$6_3 = $p0.get_innerControl()
};
Mscrm.LookupUIControlWrapper.prototype = {
    $6_3: null,
    addCustomView: function (viewGuid, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
        this.$6_3.addCustomView(viewGuid, entityName, viewDisplayName, fetchXml, layoutXml, isDefault)
    },
    getDefaultView: function () {
        return this.$6_3.getDefaultView()
    },
    setDefaultView: function (viewGuid) {
        this.$6_3.setDefaultView(viewGuid)
    }
};
Mscrm.OptionSetAttributeWrapper = function ($p0) {
    Mscrm.OptionSetAttributeWrapper.initializeBase(this, [$p0])
};
Mscrm.OptionSetAttributeWrapper.prototype = {
    getInitialValue: function () {
        return this._attribute.$L_1
    },
    getOption: function (value) {
        return this._attribute.getOption(value)
    },
    getOptions: function () {
        return this._attribute.get_options()
    },
    getSelectedOption: function () {
        return this._attribute.get_selectedOption()
    },
    getText: function () {
        return this._attribute.get_formattedValue()
    }
};
Mscrm.OptionSetUIControlWrapper = function ($p0) {
    Mscrm.OptionSetUIControlWrapper.initializeBase(this, [$p0]);
    this.$6_3 = $p0.get_innerControl()
};
Mscrm.OptionSetUIControlWrapper.prototype = {
    $6_3: null,
    addOption: function (option, placement) {
        this.$6_3.addOption(option, placement)
    },
    removeOption: function (value) {
        this.$6_3.removeOption(value)
    },
    clearOptions: function () {
        this.$6_3.clearOptions()
    }
};
Mscrm.NavigationBarWrapper = function ($p0) {
    this.items = $p0.$f_1.$1e_0()
};
Mscrm.NavigationBarWrapper.prototype = {
    items: null
};
Mscrm.NumberAttributeWrapper = function ($p0) {
    Mscrm.NumberAttributeWrapper.initializeBase(this, [$p0])
};
Mscrm.NumberAttributeWrapper.prototype = {
    getMax: function () {
        return this._attribute.$s_2
    },
    getMin: function () {
        return this._attribute.$u_2
    },
    getPrecision: function () {
        return this._attribute.$V_2
    }
};
Mscrm.SectionWrapper = function ($p0) {
    Mscrm.SectionWrapper.initializeBase(this, [$p0]);
    this.controls = $p0.$I_4.$1e_0()
};
Mscrm.SectionWrapper.prototype = {
    controls: null
};
Mscrm.SubGridUIControlWrapper = function ($p0) {
    Mscrm.SubGridUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.SubGridUIControlWrapper.prototype = {
    refresh: function () {
        this._control.get_innerControl().Refresh()
    }
};
Mscrm.TabWrapper = function ($p0) {
    Mscrm.TabWrapper.initializeBase(this, [$p0]);
    this.sections = $p0.$35_4.$1e_0()
};
Mscrm.TabWrapper.prototype = {
    sections: null,
    add_tabStateChange: function (value) {
        this._control.add_tabStateChange(value)
    },
    remove_tabStateChange: function (value) {
        this._control.remove_tabStateChange(value)
    },
    getDisplayState: function () {
        return this._control.get_displayState()
    },
    getParent: function () {
        return this._control.get_parent()
    },
    setDisplayState: function (state) {
        this._control.set_displayState(state)
    },
    setFocus: function () {
        this._control.setFocus()
    }
};
Mscrm.TextAttributeWrapper = function ($p0) {
    Mscrm.TextAttributeWrapper.initializeBase(this, [$p0])
};
Mscrm.TextAttributeWrapper.prototype = {
    getMaxLength: function () {
        return this._attribute.$t_2
    }
};
Mscrm.UIControlWrapper = function ($p0) {
    Mscrm.UIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.UIControlWrapper.prototype = {
    setFocus: function () {
        this._control.setFocus()
    },
    getDisabled: function () {
        var $v_0 = this._control.get_innerControl();
        if (!$v_0) return true;
        else return $v_0.get_disabled()
    },
    setDisabled: function (isDisabled) {
        var $v_0 = this._control.get_innerControl();
        !IsNull($v_0) && $v_0.set_disabled(isDisabled)
    },
    getControlType: function () {
        return Xrm.ControlType.$54(this._control.$1L_4)
    }
};
Mscrm.WebResourceDataUIControlWrapper = function ($p0) {
    Mscrm.WebResourceDataUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.WebResourceDataUIControlWrapper.prototype = {
    getData: function () {
        return this._control.get_innerControl().getData()
    },
    setData: function (data) {
        this._control.get_innerControl().setData(data)
    }
};
Mscrm.WebResourceObjectUIControlWrapper = function ($p0) {
    Mscrm.WebResourceObjectUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.WebResourceObjectUIControlWrapper.prototype = {
    getObject: function () {
        return this._control.get_innerControl().get_element()
    }
};
Mscrm.WebResourceUIControlWrapper = function ($p0) {
    Mscrm.WebResourceUIControlWrapper.initializeBase(this, [$p0])
};
Mscrm.WebResourceUIControlWrapper.prototype = {
    getSrc: function () {
        return this._control.get_innerControl().get_source()
    },
    setSrc: function (src) {
        this._control.get_innerControl().set_source(src)
    }
};
Mscrm.DataSlug = function (element) {
    this.$$d_$5O_3 = Function.createDelegate(this, this.$5O_3);
    this.$$d_$5j_3 = Function.createDelegate(this, this.$5j_3);
    this.$$d_$5R_3 = Function.createDelegate(this, this.$5R_3);
    this.$$d_$5P_3 = Function.createDelegate(this, this.$5P_3);
    this.$$d_$5Y_3 = Function.createDelegate(this, this.$5Y_3);
    this.$$d_$5Z_3 = Function.createDelegate(this, this.$5Z_3);
    this.$m_3 = -1;
    this.$c_3 = -1;
    Mscrm.DataSlug.initializeBase(this, [element])
};
Mscrm.DataSlug.prototype = {
    $3_3: null,
    $4_3: null,
    $q_3: true,
    $1i_3: null,
    $Y_3: null,
    $2y_3: false,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        var $v_0 = this.get_element();
        if (!this.$2y_3) {
            $addHandler($v_0, "keyup", this.$$d_$5Z_3);
            $addHandler($v_0, "keydown", this.$$d_$5Y_3)
        }
        $addHandler($v_0, "click", this.$$d_$5P_3);
        $addHandler($v_0, "focus", this.$$d_$5R_3)
    },
    dispose: function () {
        $clearHandlers(this.get_element());
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    add_dataSlugDelete: function (value) {
        this.get_events().addHandler("OnDeleteDataSlugEvent", value)
    },
    remove_dataSlugDelete: function (value) {
        this.get_events().removeHandler("OnDeleteDataSlugEvent", value)
    },
    add_dataSlugChange: function (value) {
        this.get_events().addHandler("OnChangeDataSlugEvent", value)
    },
    remove_dataSlugChange: function (value) {
        this.get_events().removeHandler("OnChangeDataSlugEvent", value)
    },
    add_dataSlugFocus: function (value) {
        this.get_events().addHandler("OnFocusDataSlugEvent", value)
    },
    remove_dataSlugFocus: function (value) {
        this.get_events().removeHandler("OnFocusDataSlugEvent", value)
    },
    get_text: function () {
        return XUI.Html.GetText(this.$4_3)
    },
    set_text: function (value) {
        XUI.Html.SetText(this.$4_3, IsNull(value) ? "" : value);
        return value
    },
    get_value: function () {
        return this.$3_3
    },
    set_value: function (value) {
        this.$3_3 = value;
        return value
    },
    get_isExternallySetKeyHandlers: function () {
        return this.$2y_3
    },
    set_isExternallySetKeyHandlers: function (value) {
        this.$2y_3 = value;
        return value
    },
    GetXml: function () {
        return null
    },
    ParseXml: function () {
        return true
    },
    RaiseOnChange: function () {
        this.$1c_3("OnChangeDataSlugEvent")
    },
    CreateInnerSlug: function (value, text, isMultipleSlug, isReadOnly, isDisabled, isInsertHyperlink) {
        isInsertHyperlink = !IsNull(isInsertHyperlink) ? isInsertHyperlink : false;
        if (!isMultipleSlug && !IsNull(this.$4_3)) {
            var $v_6 = this.get_element().removeChild(this.$4_3);
            $v_6 = null
        }
        var $v_0 = 0,
            $v_1 = this.get_element().parentNode.parentNode,
            $v_2 = XUI.Html.DomUtils.GetFirstChild($v_1),
            $v_3 = Mscrm.FormUtility.getSlugBehavior($v_2);
        if (IsNull($v_3)) {
            $v_2 = XUI.Html.DomUtils.GetChildElementAt($v_1, 1);
            if (!IsNull($v_2)) {
                $v_3 = Mscrm.FormUtility.getSlugBehavior($v_2);
                if (!IsNull($v_3)) $v_0 = $v_3.CalculateDataSlugTabIndex()
            }
        } else $v_0 = $v_3.CalculateDataSlugTabIndex();
        this.$4_3 = window.document.createElement("SPAN");
        this.$4_3.className = "ms-crm-DataSlug";
        this.$4_3.tabIndex = $v_0;
        this.$4_3.setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), false);
        var $v_4 = false;
        if (this.$m_3 >= 0 && this.$c_3 >= 0 && !isInsertHyperlink) {
            if (!IsNull(this.$Y_3) && this.$61_3(this.$Y_3, this.get_element())) {
                if (isNullOrEmptyString(XUI.Html.GetText(this.$Y_3))) {
                    this.$Y_3.parentNode.removeChild(this.$Y_3);
                    this.$Y_3 = null
                } else {
                    this.$Y_3.setAttribute("value", value);
                    XUI.Html.SetText(this.$Y_3, text)
                }
                $v_4 = true
            }
            if (!$v_4) {
                var $v_7 = null,
                    $$t_I = this;
                XUI.Html.DomUtils.ForEachChild(this.get_element(), function ($p1_0) {
                    var $v_8 = $p1_0.tagName;
                    if (IsNull($v_8) || $v_8.toUpperCase() === "#TEXT") return false;
                    var $v_9 = Sys.UI.DomElement.getBounds($p1_0);
                    if ($$t_I.$m_3 >= $v_9.x && $$t_I.$c_3 >= $v_9.y && $$t_I.$m_3 < $v_9.x + $v_9.width && $$t_I.$c_3 < $$t_I.$c_3 + $v_9.height) {
                        $v_7 = $p1_0;
                        return true
                    }
                    return false
                });
                if (!IsNull($v_7)) {
                    this.get_element().insertBefore(this.$4_3, $v_7);
                    $v_4 = true
                }
            }
            if (!$v_4) $v_4 = this.$60_3(this.$4_3)
        }
        if (!$v_4) if (XUI.Html.DomUtils.HasChildElements(this.get_element())) {
            var $v_A = XUI.Html.DomUtils.GetLastChild(this.get_element());
            if (!IsNull($v_A.tagName) && $v_A.tagName.toUpperCase() === "P") $v_A.appendChild(this.$4_3);
            else this.get_element().appendChild(this.$4_3)
        } else this.get_element().appendChild(this.$4_3);
        if (!isDisabled) {
            this.get_element().setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), true);
            Sys.Browser.agent === Sys.Browser.InternetExplorer && this.$4_3.setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), true);
            $addHandler(this.$4_3, "keyup", this.$$d_$5Z_3);
            $addHandler(this.$4_3, "keydown", this.$$d_$5Y_3);
            $addHandler(this.get_element(), "selectstart", this.$$d_$5j_3)
        }
        var $v_5 = {};
        $v_5["IsExternallySetKeyHandlers"] = true;
        $create(Mscrm.DataSlug, $v_5, null, null, this.$4_3);
        this.$4_3.setAttribute("value", value);
        this.$4_3.style.display = "inline";
        XUI.Html.SetText(this.$4_3, IsNull(text) ? "" : text);
        this.$4_3.title = XUI.Html.GetText(this.$4_3);
        $addHandler(this.$4_3, "beforeeditfocus", this.$$d_$5O_3);
        this.get_element().style.display = "inline-block";
        this.get_element().style.width = "99.7%";
        this.get_element().style.height = "auto";
        this.get_element().style.textAlign = Mscrm.Utilities.get_isLeftToRight() ? "left" : "right";
        this.get_element().title = XUI.Html.GetText(this.get_element());
        this.$q_3 = isReadOnly
    },
    $5Z_3: function ($p0) {
        var $v_0 = $p0.target;
        if ($p0.keyCode === 127) {
            while (!IsNull($v_0) && $v_0.className !== "ms-crm-DataSlugBody" && $v_0.className !== "ms-crm-DataSlugBodySingleSlug") $v_0 = $v_0.parentNode;
            !IsNull($v_0) && !this.$4g_3($v_0) && this.$1c_3("OnDeleteDataSlugEvent")
        } else this.$4W_3()
    },
    $5Y_3: function ($p0) {
        if (!this.$q_3 || $p0.keyCode === 127 || $p0.keyCode === 9) return;
        $p0.stopPropagation();
        $p0.preventDefault()
    },
    $5P_3: function ($p0) {
        this.get_element().focus();
        this.$4W_3();
        this.$Y_3 = null
    },
    $5R_3: function ($p0) {
        this.$1c_3("OnFocusDataSlugEvent")
    },
    $5j_3: function ($p0) {
        this.$5Q_3($p0);
        $p0.stopPropagation()
    },
    $5Q_3: function ($p0) {
        var $v_0 = $p0.target;
        if (!IsNull($v_0) && !IsNull($v_0.tagName) && $v_0.tagName.toUpperCase() === "SPAN" && $v_0.className === "ms-crm-DataSlug") this.$Y_3 = $v_0
    },
    $5O_3: function ($p0) {
        $p0.preventDefault()
    },
    $4W_3: function () {
        var $v_0 = null,
            $v_1 = -1;
        if (Sys.Browser.agent === Sys.Browser.InternetExplorer) {
            this.$1i_3 = window.document.selection.createRange();
            $v_0 = this.$1i_3
        } else {
            var $v_2 = window.getSelection();
            $v_1 = $v_2.anchorOffset;
            if ($v_2.rangeCount > 0) {
                this.$1i_3 = $v_2.getRangeAt(0);
                $v_0 = $v_2.anchorNode
            }
        }
        if (!IsNull($v_0)) {
            this.$m_3 = $v_0.offsetLeft;
            this.$c_3 = $v_0.offsetTop
        }
        if (IsNull(this.$m_3)) this.$m_3 = $v_1;
        if (IsNull(this.$c_3)) this.$c_3 = 0
    },
    $60_3: function ($p0) {
        if (this.$m_3 >= 0 && this.$c_3 >= 0 && !IsNull(this.$1i_3)) if (Sys.Browser.agent === Sys.Browser.InternetExplorer) this.$1i_3.select();
        else {
            var $v_2 = window.getSelection();
            $v_2.removeAllRanges();
            $v_2.addRange(this.$1i_3)
        }
        var $v_0 = "df" + Mscrm.DateTimeUtility.localDateTimeNow().getTime();
        window.document.execCommand("InsertButton", false, $v_0);
        var $v_1 = $get($v_0);
        if (IsNull($v_1)) return false;
        $v_1.parentNode.replaceChild($p0, $v_1);
        return true
    },
    $4g_3: function ($p0) {
        var $v_0 = $p0.getElementsByTagName("SPAN");
        return $v_0.length > 0
    },
    $61_3: function ($p0, $p1) {
        return XUI.Html.DomUtils.Contains($p1, $p0)
    },
    $1c_3: function ($p0) {
        var $v_0 = this.get_events().getHandler($p0);
        !IsNull($v_0) && $v_0(this.get_element(), Sys.EventArgs.Empty)
    }
};
Mscrm.EmailBodyControl = function (element) {
    this.$$d_$6H_5 = Function.createDelegate(this, this.$6H_5);
    Mscrm.EmailBodyControl.initializeBase(this, [element])
};
Mscrm.EmailBodyControl.prototype = {
    initialize: function () {
        Mscrm.FormDataControl.prototype.initialize.call(this);
        var $v_0 = this.get_$5_4();
        $v_0.add_contentReady(this.$$d_$6H_5)
    },
    $6H_5: function ($p0, $p1) {
        this.$1K_4.$2D_1(this.get_value(), 1, this);
        this.$7L_5()
    },
    $7L_5: function () {
        var $v_0 = $find("PrimaryEntity");
        if (!IsNull($v_0) && !IsNull(window.initialFormXml)) window.initialFormXml = $v_0.serialize(1)
    }
};
Mscrm.FormDataControl = function (element) {
    this.$$d_handleDataValueChange = Function.createDelegate(this, this.handleDataValueChange);
    this.$$d_$6P_4 = Function.createDelegate(this, this.$6P_4);
    this.$$d_onUIValueChangedByAjax = Function.createDelegate(this, this.onUIValueChangedByAjax);
    Mscrm.FormDataControl.initializeBase(this, [element])
};
Mscrm.FormDataControl.prototype = {
    $1K_4: null,
    $37_4: false,
    $39_4: false,
    $2s_4: null,
    get_attribute: function () {
        return this.$1K_4
    },
    set_attribute: function (value) {
        this.$1K_4 = value;
        return value
    },
    get_disabled: function () {
        return this.$39_4 ? this.get_$5_4().get_disabled() : Mscrm.UIControl.prototype.get_disabled.call(this)
    },
    set_disabled: function (value) {
        if (this.$39_4) this.get_$5_4().set_disabled(value);
        else Mscrm.UIControl.prototype.set_disabled.call(this, value);
        return value
    },
    get_value: function () {
        return this.get_$5_4().get_dataValue()
    },
    set_value: function (value) {
        this.$37_4 = true;
        try {
            this.get_$5_4().set_dataValue(value)
        } finally {
            this.$37_4 = false
        }
        return value
    },
    get_$2c_4: function () {
        var $v_0 = "dirty";
        if (this.get_$5_4().get_forceSubmit()) $v_0 = "always";
        else if (this.get_$5_4().get_doNotSubmit()) $v_0 = "never";
        return $v_0
    },
    set_$2c_4: function ($p0) {
        this.get_$5_4().set_forceSubmit($p0 === "always");
        this.get_$5_4().set_doNotSubmit($p0 === "never");
        return $p0
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.initializeBehaviors();
        if (IsNull(this.$1K_4));
        this.$1K_4.$4I_1(this, this.get_element())
    },
    initializeBehaviors: function () {
        this.$39_4 = true;
        var $v_0 = "add_change" in this.get_$5_4();
        if ($v_0) this.get_$5_4().add_change(this.$$d_onUIValueChangedByAjax);
        else $addHandler(this.get_element(), "change", this.$$d_$6P_4);
        !IsNull(this.get_$5_4()) && this.get_$5_4().add_dataValueChanged(this.$$d_handleDataValueChange)
    },
    handleDataValueChange: function (sender, args) {
        this.setAttributeValue(3)
    },
    $6P_4: function ($p0) {
        !this.setAttributeValue(0) && $p0.preventDefault()
    },
    onUIValueChangedByAjax: function (sender, args) {
        if (!this.setAttributeValue(0)) window.event.returnValue = false
    },
    setAttributeValue: function (source) {
        if (!this.$37_4) return this.$1K_4.$2D_1(this.get_value(), source, this);
        return true
    },
    setAttributeValueFromControl: function () {
        return this.setAttributeValue(0)
    },
    get_$5_4: function () {
        if (IsNull(this.$2s_4)) this.$2s_4 = Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element());
        return this.$2s_4
    },
    dispose: function () {
        if (this.get_isDisposed()) return;
        this.disposeHtmlControl();
        Mscrm.UIControl.prototype.dispose.call(this)
    },
    disposeHtmlControl: function () {
        var $v_0 = this.get_$5_4(),
            $v_1 = "remove_change" in $v_0;
        if ($v_1) $v_0.remove_change(this.$$d_onUIValueChangedByAjax);
        else try {
            $removeHandler(this.get_element(), "change", this.$$d_$6P_4)
        } catch ($v_2) {}!IsNull($v_0) && $v_0.remove_dataValueChanged(this.$$d_handleDataValueChange)
    }
};
Mscrm.HiddenFormDataControl = function (element) {
    Mscrm.HiddenFormDataControl.initializeBase(this, [element])
};
Mscrm.HiddenFormDataControl.prototype = {
    initialize: function () {
        Mscrm.FormDataControl.prototype.initialize.call(this);
        Mscrm.FormDataControl.prototype.get_$5_4.call(this).add_dataValueChanged(this.$$d_handleDataValueChange)
    },
    dispose: function () {
        Mscrm.FormDataControl.prototype.get_$5_4.call(this).remove_dataValueChanged(this.$$d_handleDataValueChange);
        Mscrm.FormDataControl.prototype.dispose.call(this)
    }
};
Mscrm.NotesControl = function (element) {
    Mscrm.NotesControl.initializeBase(this, [element])
};
Mscrm.NotesControl.prototype = {
    get_disabled: function () {
        return Mscrm.UIControl.prototype.get_disabled.call(this)
    },
    set_disabled: function (value) {
        return value
    }
};
Mscrm.SlugSupport = function (element) {
    this.$$d_$6J_3 = Function.createDelegate(this, this.$6J_3);
    this.$$d_$6I_3 = Function.createDelegate(this, this.$6I_3);
    this.$$d_$6L_3 = Function.createDelegate(this, this.$6L_3);
    this.$12_3 = [];
    this.$1Q_3 = [];
    Mscrm.SlugSupport.initializeBase(this, [element])
};
Mscrm.SlugSupport.get_contentEditableAttribute = function () {
    return Sys.Browser.agent === Sys.Browser.InternetExplorer ? "contentEditable" : "contenteditable"
};
Mscrm.SlugSupport.prototype = {
    $a_3: null,
    $14_3: false,
    $3c_3: false,
    $2J_3: false,
    $X_3: false,
    $q_3: true,
    $15_3: false,
    $1_3: null,
    $O_3: null,
    $G_3: null,
    $2K_3: false,
    $30_3: true,
    $r_3: null,
    $13_3: null,
    $2v_3: null,
    initialize: function () {
        var $v_0 = Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element());
        !IsNull($v_0) && !IsNull($v_0.set_trimValue) && $v_0.set_trimValue(false);
        this.$13_3 = this.get_element();
        if (Sys.UI.DomElement.containsCssClass(this.get_element(), "ms-crm-Input")) this.$13_3 = this.$13_3.parentNode;
        Mscrm.CrmUIBehavior.prototype.initialize.call(this)
    },
    add_deleteSlugBody: function (value) {
        this.get_events().addHandler("deleteSlugBodyEvent", value)
    },
    remove_deleteSlugBody: function (value) {
        this.get_events().removeHandler("deleteSlugBodyEvent", value)
    },
    add_changeDataSlug: function (value) {
        this.get_events().addHandler("dataSlugChangeEvent", value)
    },
    remove_changeDataSlug: function (value) {
        this.get_events().removeHandler("dataSlugChangeEvent", value)
    },
    get_isDataSlug: function () {
        if (this.$1I_3()) return this.get_$1f_3().hasDataSlug();
        return this.$14_3
    },
    set_isDataSlug: function (value) {
        if (value) this.$4p_3();
        else this.DeleteDataSlug();
        return value
    },
    get_isMultiSlug: function () {
        return this.$15_3
    },
    set_isMultiSlug: function (value) {
        this.$15_3 = value;
        if (!IsNull(this.$1_3)) if (this.$15_3) this.$1_3.className = "ms-crm-DataSlugBody";
        else this.$1_3.className = "ms-crm-DataSlugBodySingleSlug";
        return value
    },
    get_isTextSlugInTextBox: function () {
        return this.$30_3
    },
    set_isTextSlugInTextBox: function (value) {
        this.$30_3 = value;
        return value
    },
    get_isReadOnly: function () {
        return this.$q_3
    },
    set_isReadOnly: function (value) {
        this.$q_3 = value;
        return value
    },
    get_isDisabled: function () {
        return this.$X_3
    },
    set_isDisabled: function (value) {
        this.$X_3 = value;
        return value
    },
    get_attributeName: function () {
        return this.$a_3
    },
    set_attributeName: function (value) {
        this.$a_3 = value;
        return value
    },
    get_isSlugDirty: function () {
        if (this.$1I_3()) return this.get_$1f_3().get_isDirty();
        return !this.$3c_3
    },
    get_isSlugDeleted: function () {
        return this.$2K_3
    },
    get_slugValue: function () {
        if (this.$1I_3()) return this.$5L_3();
        if (IsNull(this.$1_3)) return "";
        if (!this.$15_3 || this.$1_3.childNodes.length === 1) {
            var $v_5 = XUI.Html.DomUtils.GetFirstChild(this.$1_3);
            if (XUI.Html.GetText($v_5) === XUI.Html.GetText(this.$1_3)) {
                var $v_6 = "<slugbody>" + this.$O_3.getAttribute("value") + $v_5.getAttribute("value") + "</slugbody>",
                    $v_7 = String.format("<{0}>{1}</{0}>", IsNull(this.$a_3) ? "null" : this.$a_3, CrmEncodeDecode.CrmXmlEncode($v_6));
                return $v_7
            }
        }
        var $v_0 = [],
            $v_1 = 0;
        if (this.$q_3) {
            var $$t_E = this;
            XUI.Html.DomUtils.ForEachChild(this.$1_3, function ($p1_0) {
                if (!IsNull($p1_0.attributes)) {
                    $v_0[$v_1] = $p1_0.getAttribute("value");
                    $v_1++
                }
                return false
            })
        } else {
            var $v_8 = 0,
                $v_9 = this.$5I_3(this.$1_3),
                $v_A = this.$42_3(this.$1_3.innerHTML, $v_9, 0, 0);
            while (!IsNull($v_A)) {
                var $v_B = this.$3z_3($v_A),
                    $v_C = $v_B[0];
                if (!IsNull($v_C)) {
                    $v_0[$v_1] = $v_C;
                    $v_1++
                }
                $v_C = $v_B[1];
                if (!IsNull($v_C)) {
                    $v_0[$v_1] = $v_C;
                    $v_1++;
                    $v_8++
                }
                $v_A = $v_B[2]
            }
        }
        var $v_2 = this.$40_3($v_0),
            $v_3 = "<slugbody>" + this.$O_3.getAttribute("value") + $v_2 + "</slugbody>",
            $v_4 = "<" + this.$a_3 + ">" + CrmEncodeDecode.CrmXmlEncode($v_3) + "</" + this.$a_3 + ">";
        return $v_4
    },
    get_firstSlugValue: function () {
        if (IsNull(this.$1_3) || !XUI.Html.DomUtils.HasChildElements(this.$1_3)) return "";
        return XUI.Html.DomUtils.GetFirstChild(this.$1_3).getAttribute("value")
    },
    get_masterControl: function () {
        if (IsNull(this.$r_3)) {
            this.$r_3 = Mscrm.FormControlInputBehavior.GetElementBehavior(this.get_element());
            if (IsNull(this.$r_3)) this.$r_3 = $find(this.get_element().id);
            if (Object.getType(this.$r_3).getName() === "Mscrm.EditableSelectControl") this.$r_3 = Mscrm.FormControlInputBehavior.GetElementBehavior(XUI.Html.DomUtils.GetPrevSibling(this.$r_3.get_element()))
        }
        return this.$r_3
    },
    InsertSlugControl: function (value, text, defaultValueSlug, isInsertHyperlink) {
        isInsertHyperlink = IsNull(isInsertHyperlink) ? false : isInsertHyperlink;
        if (this.$2J_3) this.$2v_3.CreateInnerSlug(value, text, this.$15_3, this.$q_3, this.$X_3, isInsertHyperlink);
        else {
            this.$12_3.push(value);
            this.$1Q_3.push(text)
        }
        this.$2K_3 = false;
        this.$3c_3 = defaultValueSlug
    },
    UpdateOperatorControl: function (value, text, displayText) {
        this.$O_3.setAttribute("value", value);
        XUI.Html.SetText(this.$O_3, displayText + " ");
        (text === "=" || text === "clear") && XUI.Html.SetText(this.$O_3, "")
    },
    UpdateInnerHtml: function (htmlValue) {
        if (this.$2J_3) this.$4P_3(htmlValue);
        else {
            this.$12_3.push(null);
            this.$1Q_3.push(htmlValue)
        }
    },
    DeleteDataSlug: function () {
        if (this.$1I_3()) {
            this.$14_3 = this.get_$1f_3().hasDataSlug();
            this.$1c_3("deleteSlugBodyEvent");
            this.$3K_3();
            return
        }
        if (this.$14_3) {
            this.$14_3 = false;
            if (!IsNull(this.$1_3)) {
                var $v_0 = this.get_masterControl();
                if (!this.$q_3 && this.$15_3) $v_0.set_dataValue(XUI.Html.GetText(this.$1_3));
                else $v_0.set_dataValue(null);
                this.$1c_3("deleteSlugBodyEvent");
                this.$G_3.style.display = "none";
                this.$G_3.removeChild(this.$O_3);
                this.$O_3 = null;
                this.$G_3.removeChild(this.$1_3);
                this.$1_3 = null;
                this.$2v_3 = null;
                this.$13_3.parentNode.removeChild(this.$G_3);
                this.$G_3 = null;
                this.$13_3.style.display = "";
                this.get_element().focus();
                this.$3K_3();
                this.$2K_3 = true;
                this.$2J_3 = false
            }
        }
    },
    CurrentOperatorIsClear: function () {
        if (this.$1I_3()) return this.get_$1f_3().isClearOperator();
        if (!IsNull(this.$O_3) && this.$O_3.getAttribute("value") === '<slugelement type="operator" value="clear"/>') return true;
        return false
    },
    CalculateDataSlugTabIndex: function () {
        var $v_0 = 0,
            $v_1 = this.get_element().getAttribute("tabindex");
        if (!IsNull($v_1)) {
            var $v_3 = $v_1.toString(),
                $v_4 = Number.parseInvariant($v_3);
            if ($v_4 > $v_0) return $v_4
        }
        for (var $v_2 = this.get_element().getElementsByTagName("*"), $v_5 = 0, $v_6 = $v_2.length; $v_5 < $v_6; $v_5++) {
            var $v_7 = $v_2[$v_5],
                $v_8 = $v_7.getAttribute("tabindex");
            if (!IsNull($v_8)) {
                var $v_9 = Number.parseInvariant($v_8.toString());
                if ($v_9 > $v_0) $v_0 = $v_9
            }
        }
        return $v_0
    },
    get_$1f_3: function () {
        return this.get_masterControl()
    },
    $4P_3: function ($p0) {
        var $v_0 = window.document.createElement("span");
        XUI.Html.SetText($v_0, $p0);
        this.$1_3.innerHTML += $v_0.innerHTML
    },
    $4p_3: function () {
        if (this.$1I_3()) {
            this.$14_3 = this.get_$1f_3().hasDataSlug();
            return
        }
        if (!this.$14_3) {
            this.$4h_3();
            this.$13_3.style.display = "none";
            var $v_0 = this.get_masterControl(),
                $v_1 = $v_0.get_dataValue(),
                $v_2;
            if ("get_defaultValue" in $v_0) $v_2 = $v_0.get_defaultValue();
            else $v_2 = null;
            if (this.$67_3() && !IsNull($v_1) && typeof $v_1 === Mscrm.TypeNames.stringType && this.$30_3) {
                XUI.Html.SetText(this.$1_3, $v_1);
                this.$1_3.title = $v_1
            } else XUI.Html.SetText(this.$1_3, "");
            try {
                if (!IsNull($v_2)) $v_0.set_dataValue($v_2);
                else $v_0.set_dataValue(null)
            } catch ($$e_3) {
                $v_0.set_dataValue(null)
            }
            this.$14_3 = true
        }
    },
    $67_3: function () {
        switch (this.get_element().tagName.toLowerCase()) {
            case "body":
            case "textarea":
            case "button":
                return true;
            case "input":
                return IsNull(this.get_element().getAttribute("type")) || this.get_element().getAttribute("type").toString() === "text";
            default:
                return false
        }
    },
    $3K_3: function () {
        this.$1c_3("dataSlugChangeEvent")
    },
    $4h_3: function () {
        if (IsNull(this.$1_3)) {
            if (this.$1I_3()) return;
            this.$G_3 = window.document.createElement("span");
            this.$G_3.setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), false);
            this.$13_3.parentNode.appendChild(this.$G_3);
            this.$G_3.style.display = "";
            var $v_0 = "",
                $v_1 = "",
                $v_2 = "";
            try {
                $v_0 = XUI.Html.GetComputedStyle(this.get_element(), "height");
                if ($v_0.toUpperCase() === "0PX") {
                    $v_2 = this.get_element().style.display;
                    this.get_element().style.display = "inline-block";
                    $v_0 = (this.get_element().offsetHeight - 2).toString() + "px";
                    this.get_element().style.display = $v_2
                }
            } catch ($$e_3) {
                $v_0 = "100%"
            }
            this.$G_3.style.height = $v_0;
            if (this.get_element().className === "ms-crm-CheckBox" || this.get_element().className === "ms-crm-RadioButton") $v_1 = "100%";
            else try {
                $v_1 = XUI.Html.GetComputedStyle(this.get_element(), "width");
                if ($v_1.toUpperCase() === "0PX") {
                    $v_2 = this.get_element().style.display;
                    this.get_element().style.display = "inline-block";
                    $v_1 = (this.get_element().offsetWidth - 2).toString() + "px";
                    this.get_element().style.display = $v_2
                }
            } catch ($$e_4) {
                $v_1 = "100%"
            }
            this.$G_3.style.width = $v_1;
            this.$O_3 = window.document.createElement("span");
            this.$O_3.setAttribute("Id", "operatorSpan");
            this.$O_3.setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), false);
            this.$G_3.appendChild(this.$O_3);
            var $v_3 = null;
            if (this.$X_3) {
                this.$G_3.className = "ms-crm-ReadOnly";
                $v_3 = window.document.createElement("span");
                $v_3.setAttribute("class", "ms-crm-DataSlugBodySingleSlug")
            } else {
                var $v_5 = this.CalculateDataSlugTabIndex();
                $v_3 = window.document.createElement("span");
                $v_3.setAttribute("class", "ms-crm-DataSlugBodySingleSlug");
                $v_3.setAttribute("tabindex", $v_5);
                $v_3.setAttribute(Mscrm.SlugSupport.get_contentEditableAttribute(), true)
            }
            this.$G_3.appendChild($v_3);
            $v_3.style.display = "block";
            $v_3.style.height = $v_0;
            $v_3.style.width = this.$G_3.style.width;
            this.$1_3 = $v_3;
            var $v_4 = $create(Mscrm.DataSlug, null, null, null, this.$1_3);
            this.$2v_3 = $v_4;
            this.$6K_3($v_4);
            this.$2K_3 = false
        }
    },
    $6K_3: function ($p0) {
        if (!this.$X_3) {
            $p0.add_dataSlugDelete(this.$$d_$6L_3);
            $p0.add_dataSlugChange(this.$$d_$6I_3);
            $p0.add_dataSlugFocus(this.$$d_$6J_3)
        }
        if (!IsNull(this.$12_3) && !IsNull(this.$1Q_3)) {
            this.$1Q_3.reverse();
            this.$12_3.reverse();
            while (this.$12_3.length) {
                var $v_0 = this.$12_3.pop(),
                    $v_1 = this.$1Q_3.pop();
                if (IsNull($v_0)) this.$4P_3($v_1);
                else $p0.CreateInnerSlug($v_0, $v_1, this.$15_3, this.$q_3, this.$X_3, false)
            }
        }
        $p0.RaiseOnChange();
        this.$2J_3 = true
    },
    $6L_3: function ($p0, $p1) {
        this.DeleteDataSlug()
    },
    $6I_3: function ($p0, $p1) {
        this.$3K_3()
    },
    $6J_3: function ($p0, $p1) {
        try {
            var $v_0 = null;
            if (this.$66_3()) $v_0 = this.$5B_3();
            if (IsNull($v_0)) $v_0 = this.get_element();
            SetDatatypeAttributeListAtFocus($v_0)
        } catch ($$e_3) {}
    },
    $66_3: function () {
        return Sys.UI.DomElement.containsCssClass(this.get_element(), "ms-crm-Lookup")
    },
    $5B_3: function () {
        var $v_0 = this.get_element().getElementsByTagName("IMG");
        if (!IsNull($v_0) && $v_0.length > 0) return $v_0[0];
        return null
    },
    $5I_3: function ($p0) {
        var $v_0 = "";
        if ($p0.childNodes.length < 1) return XUI.Html.GetText($p0);
        else {
            var $v_1 = XUI.Html.DomUtils.GetFirstChild($p0);
            if (IsNull($v_1.tagName) || $v_1.tagName.toUpperCase() !== "P") return XUI.Html.GetText($p0)
        }
        var $$t_6 = this;
        XUI.Html.DomUtils.ForEachChild($p0, function ($p1_0) {
            if (!IsNull($p1_0.tagName) && $p1_0.tagName.toUpperCase() === "P") $v_0 += XUI.Html.GetText($p1_0) + "\r\n";
            else if (!IsNull(XUI.Html.GetText($p1_0))) $v_0 += XUI.Html.GetText($p1_0);
            var $v_2 = XUI.Html.DomUtils.GetNextSibling($p1_0);
            if (!IsNull($v_2)) {
                var $v_3 = $v_2.nodeValue;
                if (!isNullOrEmptyString($v_3)) $v_0 += $v_3
            }
            return false
        });
        return $v_0
    },
    $5L_3: function () {
        var $v_0 = 0,
            $v_1 = this.get_$1f_3().getHTML(),
            $v_2 = [],
            $v_3 = 0;
        while (!IsNull($v_1)) {
            var $v_6 = this.$3z_3($v_1),
                $v_7 = $v_6[0];
            if (!IsNull($v_7)) {
                $v_2[$v_3] = $v_7;
                $v_3++
            }
            $v_7 = $v_6[1];
            if (!IsNull($v_7)) {
                $v_2[$v_3] = $v_7;
                $v_3++;
                $v_0++
            }
            $v_1 = $v_6[2]
        }
        var $v_4 = this.$40_3($v_2),
            $v_5 = String.format('<slugbody><slugelement type="operator" value="="/>{0}</slugbody>', $v_4);
        if (this.$62_3($v_4)) $v_5 = String.format('<slugbody>{0}<slugelement type="slug">{1}</slugelement></slugbody>', '<slugelement type="operator" value="clear"/>', '<slug type="dynamic" value="null"/>');
        if (isNullOrEmptyString(this.$a_3)) this.$a_3 = this.get_element().id;
        return String.format("<{0}>{1}</{0}>", this.$a_3, CrmEncodeDecode.CrmXmlEncode($v_5))
    },
    $62_3: function ($p0) {
        return $p0.indexOf('<slug type="dynamic" value="null"/>') > 0
    },
    $40_3: function ($p0) {
        for (var $v_0 = null, $v_1 = 0, $v_2 = $p0.length; $v_1 < $v_2; $v_1++) if (IsNull($v_0)) $v_0 = $p0[$v_1];
        else $v_0 += $p0[$v_1];
        return $v_0
    },
    $42_3: function ($p0, $p1, $p2, $p3) {
        var $v_0 = this.$44_3($p0, $p2),
            $v_1 = $p0.toUpperCase().indexOf("</SPAN>", $v_0);
        if ($v_0 < 0 || $v_1 < 0) return $p1;
        var $v_2 = CrmEncodeDecode.CrmHtmlDecode($p0.substr($v_0, $v_1 + 7 - $v_0)),
            $v_3 = $p0.substr($v_0, $v_1 - $v_0),
            $v_4 = $v_0 + $v_3.lastIndexOf(">") + 1,
            $v_5 = $v_1 - $v_4,
            $v_6 = $p0.substr($v_4, $v_5),
            $v_7 = $p1.indexOf(CrmEncodeDecode.CrmHtmlDecode($v_6), $p3),
            $v_8 = $p1.substr(0, $v_7) + $v_2 + $p1.substr($v_7 + $v_6.length);
        $p3 = $v_8.indexOf($v_2, $p3) + $v_2.length;
        return this.$42_3($p0, $v_8, $v_1 + 7, $p3)
    },
    $3z_3: function ($p0) {
        var $v_0 = this.$44_3($p0, 0),
            $v_1 = $p0.toUpperCase().indexOf("</SPAN>", $v_0),
            $v_2 = null,
            $v_3 = null;
        if ($v_0 < 0 || $v_1 < 0) $v_3 = $p0;
        else if ($v_0 > 0) $v_3 = $p0.substr(0, $v_0);
        var $v_4 = null;
        if ($v_0 >= 0 && $v_1 >= 0 && $v_1 + 7 !== $p0.length) $v_4 = $p0.substr($v_1 + 7, $p0.length - $v_1 + 7);
        var $v_5 = null;
        if ($v_0 !== -1 && $v_1 !== -1) {
            var $v_7 = $p0.indexOf("<slugelement", $v_0),
                $v_8 = $p0.indexOf("</slugelement>", $v_0),
                $v_9 = 14,
                $v_A = false;
            if (!Mscrm.Utilities.isIE() && $v_7 === -1 && $v_8 === -1) {
                $v_7 = $p0.indexOf("&lt;slugelement", $v_0);
                $v_8 = $p0.indexOf("&lt;/slugelement&gt;", $v_0);
                $v_9 = 20;
                $v_A = true
            }
            if (Sys.Browser.agent === Sys.Browser.Firefox && Sys.Browser.version >= 15) $v_A = true;
            if ($v_7 > 0 && $v_8 > 0) {
                $v_5 = $p0.substring($v_7, $v_8 + $v_9);
                if ($v_A) $v_5 = CrmEncodeDecode.CrmHtmlDecode($v_5);
                var $v_B = this.$4s_3($p0.substring($v_8 + $v_9, $v_1)),
                    $v_C = $v_B[0];
                if (!IsNull($v_C)) $v_3 = IsNull($v_3) ? $v_C : $v_3 + $v_C;
                $v_C = $v_B[1];
                if (!IsNull($v_C)) $v_4 = IsNull($v_4) ? $v_C : $v_C + $v_4
            }
        }
        if (!IsNull($v_3)) $v_2 = String.format('<slugelement type="primitive" value="{0}"/>', CrmEncodeDecode.CrmXmlEncode($v_3));
        var $v_6 = [];
        $v_6[0] = $v_2;
        $v_6[1] = $v_5;
        $v_6[2] = $v_4;
        return $v_6
    },
    $44_3: function ($p0, $p1) {
        var $v_0 = $p0.toUpperCase(),
            $v_1 = IsNull($p1) ? 0 : $p1,
            $v_2 = $v_0.indexOf("<SPAN ", $v_1),
            $v_3 = this.$57_3($p0, $v_2);
        if ($v_2 < 0 || $v_3 < 0) return -1;
        var $v_4 = $v_2;
        while ($v_4 < $v_3) {
            if ($v_4 < 0) break;
            $v_2 = $v_4;
            $v_4 = $v_0.indexOf("<SPAN ", $v_4 + 1)
        }
        var $v_5 = $v_0.indexOf("</SPAN>", $v_2);
        if ($v_2 < 0 || $v_5 < 0) return -1;
        return $v_2
    },
    $57_3: function ($p0, $p1) {
        var $v_0 = $p0.indexOf(" class=ms-crm-DataSlug", $p1);
        if ($v_0 < 0) $v_0 = $p0.indexOf(" class='ms-crm-DataSlug'", $p1);
        if ($v_0 < 0) $v_0 = $p0.indexOf(' class="ms-crm-DataSlug"', $p1);
        return $v_0
    },
    $4s_3: function ($p0) {
        var $v_0 = [],
            $v_1 = null,
            $v_2 = null;
        if (!IsNull($p0)) {
            var $v_3 = $p0.indexOf(">{"),
                $v_4 = $p0.indexOf("}</", $v_3);
            if ($v_3 >= 0 && $v_4 >= 0) {
                $v_1 = $p0.substring(0, $v_3 + 1);
                $v_2 = $p0.substring($v_4 + 1, $p0.length)
            }
        }
        $v_0[0] = $v_1;
        $v_0[1] = $v_2;
        return $v_0
    },
    $1I_3: function () {
        return !IsNull(this.get_element().className) && this.get_element().className.indexOf("ms-crm-Email-Body") >= 0
    },
    $1c_3: function ($p0) {
        var $v_0 = this.get_events().getHandler($p0);
        !IsNull($v_0) && $v_0(this.get_element(), Sys.EventArgs.Empty)
    }
};
Mscrm.Association = function (relationshipName, relationshipRoleOrdinal, sourceEntityId, sourceEntityLogicalName) {
    this.$3i_0 = relationshipName;
    this.$3j_0 = relationshipRoleOrdinal;
    this.$3m_0 = sourceEntityId;
    this.$3n_0 = sourceEntityLogicalName
};
Mscrm.Association.prototype = {
    $3i_0: null,
    $3j_0: 0,
    $3m_0: null,
    $3n_0: null,
    get_relationshipName: function () {
        return this.$3i_0
    },
    get_isReverse: function () {
        return this.$3j_0
    },
    get_sourceEntityId: function () {
        return this.$3m_0
    },
    get_sourceEntityLogicalName: function () {
        return this.$3n_0
    }
};
Mscrm.BooleanAttribute = function () {
    Mscrm.BooleanAttribute.initializeBase(this);
    this.$F_1 = "boolean";
    this.add_validate(Mscrm.BooleanAttribute.$1J)
};
Mscrm.BooleanAttribute.$1J = function ($p0, $p1) {
    var $v_0 = $p1.$3_1;
    if (IsNull($v_0)) return new Mscrm.ValidationResult(true, null);
    var $v_1 = typeof $v_0;
    if ($v_1 === Mscrm.TypeNames.stringType || $v_1 === Mscrm.TypeNames.numberType) {
        var $v_2 = Mscrm.BooleanAttribute.$32[$v_0];
        if (!IsNull($v_2)) $v_0 = $v_2
    }
    if (typeof $v_0 !== Mscrm.TypeNames.booleanType) return new Mscrm.ValidationResult(false, LOCID_DEVERROR_BADDATATYPE_BOOL);
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.BooleanAttribute.prototype = {
    $3H_2: false,
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element);
        if (Sys.UI.DomElement.containsCssClass(element, "ms-crm-CheckBox")) this.$3H_2 = true
    },
    get_isDirty: function () {
        if (IsNull(this.$L_1) && IsNull(Mscrm.FormDataAttribute.prototype.get_value.call(this))) return false;
        else if (this.$3H_2 && IsNull(this.$L_1) && !IsNull(Mscrm.FormDataAttribute.prototype.get_value.call(this)) && !Mscrm.FormDataAttribute.prototype.get_value.call(this)) return false;
        else if (this.isAttributeForBulkEdit() && !this.$3H_2) if (IsNull(this.getValue())) return false;
        else return true;
        return Mscrm.FormDataAttribute.prototype.get_isDirty.call(this)
    },
    deserialize: function (attributeNode) {
        return this.preProcessValue(Boolean.parse(XUI.Xml.GetText(attributeNode)))
    },
    getWrapperInternal: function () {
        return new Mscrm.BooleanAttributeWrapper(this)
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value);
        if (!IsNull($v_0) && typeof $v_0 !== Mscrm.TypeNames.booleanType) $v_0 = Mscrm.BooleanAttribute.$32[$v_0];
        return $v_0
    },
    pushValueToControl: function (control, value) {
        var $v_0 = value;
        if (!IsNull($v_0) && Mscrm.OptionSetUIControl.isInstanceOfType(control)) $v_0 = $v_0 ? 1 : 0;
        Mscrm.FormDataAttribute.prototype.pushValueToControl.call(this, control, $v_0)
    }
};
Mscrm.DateTimeAttribute = function () {
    Mscrm.DateTimeAttribute.initializeBase(this);
    this.$F_1 = "datetime"
};
Mscrm.DateTimeAttribute.prototype = {
    isEqual: function (value1, value2) {
        var $v_0 = value1,
            $v_1 = value2;
        if (IsNull($v_0) && IsNull($v_1)) return true;
        if (IsNull($v_0) || IsNull($v_1)) return false;
        return $v_0.getTime() === $v_1.getTime()
    },
    deserialize: function (attributeNode) {
        return this.preProcessValue(ParseUtcDate(XUI.Xml.GetText(attributeNode)))
    },
    getValue: function () {
        var $v_0 = Mscrm.FormDataAttribute.prototype.getValue.call(this);
        return !$v_0 ? null : new Date($v_0.getTime())
    },
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element)
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value),
            $v_1 = null;
        if ($v_0) if (Date.isInstanceOfType($v_0) || !isNaN($v_0) && typeof $v_0 === Mscrm.TypeNames.objectType) $v_1 = new Date($v_0.getTime());
        else if (typeof $v_0 === Mscrm.TypeNames.numberType) $v_1 = new Date($v_0);
        return $v_1
    },
    serializeInternal: function (writer) {
        var $v_0 = CrmEncodeDecode.CrmXmlEncode(this.$7_1),
            $v_1 = this.get_value();
        $v_1 = new Date($v_1.getFullYear(), $v_1.getMonth(), $v_1.getDate(), $v_1.getHours(), $v_1.getMinutes());
        writer.append("<");
        writer.append($v_0);
        writer.append(">");
        writer.append(CrmEncodeDecode.CrmXmlEncode($v_1.format("s")));
        writer.append("</");
        writer.append($v_0);
        writer.append(">")
    }
};
Mscrm.EmailAddressAttribute = function () {
    Mscrm.EmailAddressAttribute.initializeBase(this);
    this.add_validate(Mscrm.EmailAddressAttribute.$7Q)
};
Mscrm.EmailAddressAttribute.isValidEmailWithQuotedString = function (emailAddress) {
    var $v_0 = emailAddress.indexOf('"'),
        $v_1 = emailAddress.indexOf('"@', 1);
    if (!$v_0 && $v_1 !== -1 && $v_1 > 1) {
        var $v_2 = emailAddress.substring(1, $v_1),
            $v_3 = emailAddress.replace('"' + $v_2 + '"', "abc"),
            $v_4 = new RegExp('[\\\\"]');
        if ($v_2.search($v_4) === -1 && Mscrm.EmailAddressAttribute.$3A.test($v_3)) return true
    }
    return false
};
Mscrm.EmailAddressAttribute.$7Q = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    var $v_0 = Mscrm.Utilities.trim($p1.$3_1, null);
    if ($v_0.length > 0 && !Mscrm.EmailAddressAttribute.$3A.test($v_0) && !Mscrm.EmailAddressAttribute.isValidEmailWithQuotedString($v_0)) return new Mscrm.ValidationResult(false, LOCID_ENTER_VALID_EMAIL);
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.EmailBodyAttribute = function () {
    Mscrm.EmailBodyAttribute.initializeBase(this);
    this.$F_1 = "memo";
    this.add_validate(Mscrm.EmailBodyAttribute.$1J)
};
Mscrm.EmailBodyAttribute.$1J = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    if (typeof $p1.$3_1 !== Mscrm.TypeNames.stringType) return new Mscrm.ValidationResult(false, LOCID_DEVERROR_BADTYPE_STRING);
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.EmailBodyAttribute.prototype = {
    preProcessValue: function (value) {
        return Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value) || ""
    },
    serializeInternal: function (writer) {
        var $v_0 = CrmEncodeDecode.CrmXmlEncode(this.$7_1),
            $v_1 = window.LOCID_UI_DIR === "RTL";
        writer.append("<");
        writer.append($v_0);
        writer.append(">");
        $v_1 && writer.append(CrmEncodeDecode.CrmXmlEncode('<DIV style="DIRECTION: rtl">'));
        writer.append(CrmEncodeDecode.CrmXmlEncode(this.get_value()));
        $v_1 && writer.append(CrmEncodeDecode.CrmXmlEncode("</DIV>"));
        writer.append("</");
        writer.append($v_0);
        writer.append(">")
    }
};
Mscrm.FormDataAttribute = function () {
    this.$1y_1 = "none";
    this.$1C_1 = "dirty";
    this.$1D_1 = 0;
    Mscrm.FormDataAttribute.initializeBase(this);
    this.$I_1 = new Mscrm.ClientApiCollection;
    this.$10_1 = new Array(0);
    this.$24_1 = [];
    this.add_validate(Mscrm.FormDataAttribute.$7V)
};
Mscrm.FormDataAttribute.$7V = function ($p0, $p1) {
    if ($p1.$2Q_1 === 2 && $p0.get_requiredLevelValue() === "required" && !$p0.get_hasValue()) {
        for (var $v_0 = false, $v_1 = null, $v_2 = $p0.$I_1.get(), $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_4 = $v_2[$v_3];
            if (!IsNull($v_4) && !$v_4.get_innerControl().get_disabled() && $v_4.isVisibleInTree()) {
                if ($v_4.get_label() !== $p0.$7_1) {
                    $v_1 = $v_4.get_label();
                    break
                }
                $v_0 = true
            }
        }
        if ($v_0 && !$v_1) $v_1 = $p0.$7_1;
        if ($v_1) return new Mscrm.ValidationResult(false, String.format(LOCID_FORM_PROIVE_VALUE_MASK, $v_1))
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.FormDataAttribute.prototype = {
    $I_1: null,
    $10_1: null,
    $1P_1: null,
    $e_1: null,
    $L_1: null,
    $2x_1: false,
    $7_1: null,
    $v_1: null,
    $3k_1: 0,
    $F_1: null,
    $24_1: null,
    $3_1: null,
    $3f_1: false,
    $i_1: null,
    $2L_1: false,
    add_validate: function (value) {
        Array.add(this.$24_1, value)
    },
    remove_validate: function (value) {
        Array.remove(this.$24_1, value)
    },
    get_metadataType: function () {
        return this.$F_1
    },
    set_metadataType: function (value) {
        this.$F_1 = value;
        return value
    },
    get_controls: function () {
        return this.$I_1
    },
    get_submitModeValue: function () {
        var $v_0 = this.get_primaryDataControl();
        if ($v_0) if (Mscrm.FormDataControl.isInstanceOfType($v_0)) this.$1C_1 = $v_0.get_$2c_4();
        else if (Mscrm.HiddenFormDataControl.isInstanceOfType($v_0)) this.$1C_1 = $v_0.get_$2c_4();
        return this.$1C_1
    },
    set_submitModeValue: function (value) {
        switch (value) {
            case "always":
            case "dirty":
            case "never":
                break;
            default:
                return value
        }
        this.$1C_1 = value;
        var $v_0 = this.get_primaryDataControl();
        if ($v_0) if (Mscrm.FormDataControl.isInstanceOfType($v_0)) $v_0.set_$2c_4(this.$1C_1);
        else Mscrm.HiddenFormDataControl.isInstanceOfType($v_0) && $v_0.set_$2c_4(this.$1C_1);
        return value
    },
    get_format: function () {
        return this.$e_1
    },
    set_format: function (value) {
        this.$e_1 = value;
        return value
    },
    get_initialValue: function () {
        return this.$L_1
    },
    get_isDirty: function () {
        return this.$2x_1 || !this.isEqual(this.$L_1, this.get_value())
    },
    isEqual: function (value1, value2) {
        return this.$L_1 === this.get_value()
    },
    get_isDirtyOverride: function () {
        return this.$2x_1
    },
    get_name: function () {
        return this.$7_1
    },
    set_name: function (value) {
        this.$7_1 = value;
        return value
    },
    get_parent: function () {
        return this.$v_1
    },
    set_parent: function (value) {
        this.$v_1 = value;
        return value
    },
    get_requiredLevelValue: function () {
        return this.$1y_1
    },
    set_requiredLevelValue: function (value) {
        switch (value) {
            case "none":
            case "recommended":
            case "required":
                break;
            default:
                return value
        }
        this.$1y_1 = value;
        for (var $v_0 = this.$I_1.get(), $v_1 = 0; $v_1 < $v_0.length; $v_1++) $v_0[$v_1].setRequiredLevel(this.$1y_1);
        return value
    },
    get_userPrivilegeMask: function () {
        return this.$1D_1
    },
    set_userPrivilegeMask: function (value) {
        this.$1D_1 = value;
        return value
    },
    get_value: function () {
        return this.getValue()
    },
    set_value: function (value) {
        this.$2D_1(value, 2, null);
        return value
    },
    get_dataControls: function () {
        return this.$10_1
    },
    get_hasValue: function () {
        return !IsNull(this.get_value())
    },
    get_primaryDataControl: function () {
        for (var $v_0 = this.$10_1, $v_1 = null, $v_2 = 0; $v_2 < $v_0.length && !$v_1; $v_2++) {
            var $v_3 = $v_0[$v_2];
            if ($v_3.get_id() === this.$7_1) $v_1 = $v_3
        }
        return $v_1
    },
    get_$j_1: function () {
        if (!this.$1P_1) this.$1P_1 = new Mscrm.ClientApiEventHandlerList(this.get_events());
        return this.$1P_1
    },
    get_isVirtual: function () {
        return this.$2L_1
    },
    set_isVirtual: function (value) {
        this.$2L_1 = value;
        return value
    },
    addOnChange: function (handler, system) {
        this.get_$j_1().addHandler("Change", handler, system)
    },
    fireOnChange: function () {
        var $v_0 = this.get_$j_1().getHandler("Change");
        $v_0 && $v_0(this.getWrapper(), null)
    },
    getKey: function () {
        return this.$7_1
    },
    getWrapper: function () {
        if (!this.$i_1) this.$i_1 = this.getWrapperInternal();
        return this.$i_1
    },
    isAttributeForBulkEdit: function () {
        return typeof FORM_TYPE != "undefined" && FORM_TYPE == "BulkEdit"
    },
    dispose: function () {
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        !IsNull(this.$v_1) && this.$v_1.$6o_1(this);
        this.$3k_1 = !IsNull(this.$v_1) && this.$v_1.get_isNew() ? 1 : 4
    },
    hasDataToSerialize: function (mode) {
        if (this.$2L_1) return false;
        var $v_0 = this.get_submitModeValue();
        switch ($v_0) {
            case "always":
                return this.get_isDirty();
            case "never":
                return false;
            case "dirty":
                switch (mode) {
                    case 2:
                        return true;
                    case 0:
                        return this.get_hasValue();
                    case 1:
                        return this.get_isDirty() && !this.$4b_1();
                    default:
                        break
                }
                break;
            default:
                break
        }
        return false
    },
    removeOnChange: function (handler) {
        this.get_$j_1().removeHandler("Change", handler)
    },
    serialize: function (writer, mode) {
        if (this.$2L_1) return;
        var $v_0 = this.get_submitModeValue();
        if ($v_0 === "never" || $v_0 !== "always" && !this.hasDataToSerialize(mode)) return;
        if (this.get_hasValue()) this.serializeInternal(writer);
        else {
            writer.append("<");
            writer.append(CrmEncodeDecode.CrmXmlEncode(this.$7_1));
            writer.append("/>")
        }
    },
    $3y_1: function ($p0) {
        var $v_0 = XUI.Xml.SelectSingleNode($p0, this.$7_1, null),
            $v_1 = !$v_0 ? this.preProcessValue(null) : this.deserialize($v_0),
            $v_2 = null;
        if ($v_1) $v_2 = $v_1;
        switch (this.$e_1) {
            case "datetime":
            case "date":
                if ($v_2 && $v_2.length > 19) {
                    $v_2 = $v_2.substring(0, 19);
                    $v_1 = $v_2
                }
                break;
            default:
                break
        }
        var $v_3 = IsNull(this.$L_1) || !IsNull($v_1) || !this.$v_1.get_isNew();
        if ($v_3 || window._appFormErrorOnPage) this.$L_1 = $v_1
    },
    get_firstAvailableControl: function () {
        for (var $v_0 = null, $v_1 = this.$I_1.get(), $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            var $v_3 = $v_1[$v_2];
            if (!$v_3.get_innerControl().get_disabled()) {
                if (typeof $v_3.get_doNotSubmit !== "undefined" && $v_3.get_doNotSubmit()) continue;
                if (!$v_0) $v_0 = $v_3;
                if ($v_3.isVisibleInTree()) return $v_3
            }
        }
        return $v_0
    },
    $4I_1: function ($p0, $p1) {
        if (!this.$10_1.length) {
            this.initializeFromDomElement($p1);
            this.$45_1($p0)
        }
        if (Mscrm.UIControl.isInstanceOfType($p0)) {
            var $v_0 = $p0.get_parent();
            $v_0 && Mscrm.FormUIControl.isInstanceOfType($v_0) && this.$I_1.add($v_0)
        }
        Array.add(this.$10_1, $p0)
    },
    resetValue: function (value) {
        var $v_0 = this.get_value();
        if (!this.$63_1()) {
            var $v_2 = this.$2D_1(value, 1, null);
            if (!$v_2) return false
        } else {
            var $v_3 = this.$1J_1(value, 1);
            if (IsNull($v_3) || !$v_3.isValid) return false
        }
        var $v_1 = !this.isEqual($v_0, this.get_value());
        this.$L_1 = this.preProcessValue(this.get_value());
        return $v_1
    },
    $63_1: function () {
        for (var $v_0 = this.$I_1.get(), $v_1 = 0; $v_1 < $v_0.length; $v_1++) if ($v_0[$v_1].isEditing()) return true;
        return false
    },
    $2D_1: function ($p0, $p1, $p2) {
        if ($p1 === 1) this.$3f_1 = true;
        if ($p1 === 2 && !(this.$1D_1 & this.$3k_1)) return false;
        var $v_0 = $p1 !== 1 ? this.$1J_1($p0, 1) : new Mscrm.ValidationResult(true, null);
        if ($v_0.isValid) {
            var $v_1 = this.preProcessValue($p0);
            this.$3_1 = $v_1;
            this.$6R_1($p2);
            !$p1 && this.fireOnChange()
        } else if (!isNullOrEmptyString($v_0.errorText)) {
            alert($v_0.errorText);
            if ($p2 && Mscrm.UIControl.isInstanceOfType($p2)) {
                var $v_2 = $p2.get_parent();
                $v_2.setFocus()
            } else {
                var $v_3 = this.get_firstAvailableControl();
                $v_3 && $v_3.setFocus()
            }
        }
        return $v_0.isValid
    },
    $1J_1: function ($p0, $p1) {
        for (var $v_0 = new Mscrm.ValidationEventArgs($p0, $p1), $v_1 = null, $v_2 = 0; $v_2 < this.$24_1.length && (!$v_1 || $v_1.isValid); $v_2++) {
            var $v_3 = this.$24_1[$v_2];
            $v_1 = $v_3(this, $v_0)
        }
        if (!$v_1) $v_1 = new Mscrm.ValidationResult(true, null);
        return $v_1
    },
    deserialize: function (attributeNode) {
        var $v_0 = XUI.Xml.DomUtils.GetFirstChild(attributeNode);
        return this.preProcessValue($v_0 ? CrmEncodeDecode.CrmXmlDecode(XUI.Xml.XMLSerializer.serializeToString($v_0)) : null)
    },
    getValue: function () {
        !this.$3f_1 && this.$45_1(this.$10_1[0]);
        return this.$3_1
    },
    getWrapperInternal: function () {
        return new Mscrm.AttributeWrapper(this)
    },
    initializeFromDomElement: function (element) {
        if (isNullOrEmptyString(this.$7_1)) this.$7_1 = element.getAttribute("attrName");
        if (isNullOrEmptyString(this.$e_1)) this.$e_1 = element.getAttribute("attrFormat");
        if (!this.$1D_1) {
            var $v_1 = element.getAttribute("attrPriv");
            if (!isNullOrEmptyString($v_1)) this.$1D_1 = parseInt($v_1, 10)
        }
        var $v_0 = element.getAttribute("req");
        if (!isNullOrEmptyString($v_0)) this.$1y_1 = Xrm.RequiredLevel.fromLegacyValue(parseInt($v_0, 10))
    },
    preProcessValue: function (value) {
        return IsNull(value) ? null : value
    },
    pushValueToControl: function (control, value) {
        control.set_value(value)
    },
    serializeInternal: function (writer) {
        var $v_0 = CrmEncodeDecode.CrmXmlEncode(this.$7_1);
        writer.append("<");
        writer.append($v_0);
        writer.append(">");
        writer.append(CrmEncodeDecode.CrmXmlEncode(this.get_value().toString()));
        writer.append("</");
        writer.append($v_0);
        writer.append(">")
    },
    $4b_1: function () {
        for (var $v_0 = false, $v_1 = this.$I_1.get(), $v_2 = 0; $v_2 < $v_1.length && !$v_0; $v_2++) $v_0 = !$v_1[$v_2].get_innerControl().get_disabled();
        return this.$I_1.getLength() > 0 && !$v_0
    },
    $45_1: function ($p0) {
        if (IsNull($p0)) return;
        var $v_0 = $p0.get_value();
        if (typeof $v_0 !== Mscrm.TypeNames.undefinedType) {
            this.$2D_1($v_0, 1, $p0);
            this.$L_1 = this.get_value();
            var $v_1 = window._dirtyProperties;
            this.$2x_1 = !! $v_1 && $v_1[this.$7_1] === this.$7_1
        }
    },
    $6R_1: function ($p0) {
        for (var $v_0 = this.get_value(), $v_1 = this.$10_1, $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            var $v_3 = $v_1[$v_2];
            $v_3 !== $p0 && this.pushValueToControl($v_3, $v_0)
        }
    }
};
Mscrm.FormDataEntity = function () {
    Mscrm.FormDataEntity.initializeBase(this);
    this.$b_1 = new Mscrm.ClientApiCollection;
    this.$1W_1 = new Array(0);
    this.$1B_1 = [];
    this.$5t_1()
};
Mscrm.FormDataEntity.prototype = {
    $b_1: null,
    $1P_1: null,
    $1s_1: null,
    $1W_1: null,
    $1w_1: null,
    $36_1: null,
    $22_1: null,
    $X_1: false,
    $i_1: null,
    $1B_1: null,
    $3U_1: false,
    $2w_1: null,
    add_onIsDisabledChanged: function (value) {
        this.get_$3G_1().addHandler("OnIsDisabledChanged", value)
    },
    remove_onIsDisabledChanged: function (value) {
        this.get_$3G_1().removeHandler("OnIsDisabledChanged", value)
    },
    get_attributes: function () {
        return this.$b_1
    },
    get_isDirty: function () {
        return this.hasDataToSerialize(1)
    },
    get_isCreateMode: function () {
        return IsNull(this.$1w_1) || !this.$1w_1.length
    },
    get_recordId: function () {
        return this.$1w_1
    },
    set_recordId: function (value) {
        this.$1w_1 = value;
        this.$4v_1();
        return value
    },
    get_typeName: function () {
        return this.$22_1
    },
    set_typeName: function (value) {
        this.$22_1 = value;
        return value
    },
    get_isDisabled: function () {
        return this.$X_1
    },
    set_isDisabled: function (value) {
        var $v_0 = this.$X_1;
        this.$X_1 = value;
        this.$X_1 !== $v_0 && this.$4u_1();
        return value
    },
    get_pendingAssociations: function () {
        return this.$1B_1
    },
    set_pendingAssociations: function (value) {
        this.$1B_1 = value;
        return value
    },
    get_deferredAssociation: function () {
        return this.$3U_1
    },
    set_deferredAssociation: function (value) {
        this.$3U_1 = value;
        return value
    },
    get_isNew: function () {
        return isNullOrEmptyString(this.$1w_1)
    },
    get_$j_1: function () {
        if (!this.$1P_1) this.$1P_1 = new Mscrm.ClientApiEventHandlerList(this.get_events());
        return this.$1P_1
    },
    get_$3G_1: function () {
        if (IsNull(this.$2w_1)) this.$2w_1 = new Sys.EventHandlerList;
        return this.$2w_1
    },
    addOnRecordIdChanged: function (handler, system) {
        this.get_$j_1().addHandler("OnRecordIdChanged", handler, system)
    },
    removeOnRecordIdChanged: function (handler) {
        this.get_$j_1().removeHandler("OnRecordIdChanged", handler)
    },
    addOnSave: function (handler, system) {
        this.get_$j_1().addHandler("Save", handler, system)
    },
    fireOnSave: function (args) {
        var $v_0 = this.get_$j_1().getHandler("Save");
        if ($v_0) {
            $v_0(this.$2A_1(), args);
            return !args.isDefaultPrevented()
        }
        return true
    },
    hasDataToSerialize: function (mode) {
        for (var $v_0 = false, $v_1 = this.$b_1.get(), $v_2 = 0; $v_2 < $v_1.length && !$v_0; $v_2++) $v_0 = $v_1[$v_2].hasDataToSerialize(mode);
        if (!$v_0) for (var $v_3 = 0; $v_3 < this.$1W_1.length && !$v_0; $v_3++) $v_0 = this.$1W_1[$v_3].hasDataToSerialize(mode);
        return $v_0
    },
    initialize: function () {
        Sys.Component.prototype.initialize.call(this);
        Mscrm.FormDataManager.$6q(this);
        this.$5y_1()
    },
    dispose: function () {
        Mscrm.FormDataManager.$7K(this.get_id());
        Sys.Component.prototype.dispose.call(this);
        Mscrm.Utilities.destroyObject(this)
    },
    registerOtherData: function (data) {
        Array.add(this.$1W_1, data)
    },
    removeOnSave: function (handler) {
        this.get_$j_1().removeHandler("Save", handler)
    },
    save: function (action) {
        var $v_0 = $find("crmForm");
        switch (action) {
            case "save":
                $v_0.Save();
                break;
            case "saveandclose":
                $v_0.SaveAndClose();
                break;
            case "saveandnew":
                $v_0.SubmitCrmForm(59, true, true, false, false);
                break;
            default:
                IsNull(action) && $v_0.Save();
                break
        }
    },
    serialize: function (mode) {
        var $v_0 = CrmEncodeDecode.CrmXmlEncode(this.$22_1),
            $v_1 = new Sys.StringBuilder;
        $v_1.append("<");
        $v_1.append($v_0);
        $v_1.append(">");
        var $$t_5 = this,
            $v_2 = function ($p1_0) {
                $p1_0.serialize($v_1, mode)
            };
        Array.forEach(this.$b_1.get(), $v_2);
        Array.forEach(this.$1W_1, $v_2);
        $v_1.append("</");
        $v_1.append($v_0);
        $v_1.append(">");
        return $v_1.toString()
    },
    validateForSave: function () {
        for (var $v_0 = null, $v_1 = this.$b_1.get(), $v_2 = 0; $v_2 < $v_1.length && (!$v_0 || $v_0.isValid); $v_2++) {
            var $v_3 = $v_1[$v_2];
            $v_0 = $v_3.$1J_1($v_3.get_value(), 2);
            if (!isNullOrEmptyString($v_0.errorText)) {
                alert($v_0.errorText);
                var $v_4 = $v_3.get_firstAvailableControl();
                $v_4 && $v_4.setFocus()
            }
        }
        return $v_0.isValid
    },
    validateFieldsValue: function (createMode) {
        for (var $v_0 = null, $v_1 = this.$b_1.get(), $v_2 = !IsNull(createMode) && createMode, $v_3 = 0; $v_3 < $v_1.length; $v_3++) {
            var $v_4 = $v_1[$v_3];
            if (!$v_4.get_isDirty() && !$v_2) continue;
            var $v_5 = $v_4.get_firstAvailableControl();
            if (IsNull($v_5)) continue;
            $v_0 = $v_4.$1J_1($v_4.get_value(), 2);
            if (!$v_0 || $v_0.isValid) continue;
            $v_5.setFocus();
            return $v_0.errorText
        }
        return null
    },
    $2A_1: function () {
        if (!this.$i_1) this.$i_1 = new Mscrm.EntityWrapper(this);
        return this.$i_1
    },
    $6o_1: function ($p0) {
        var $v_0 = this.$b_1.get($p0.getKey());
        if (!$v_0) {
            this.$b_1.add($p0);
            if (this.$1s_1[$p0.$7_1]) {
                Array.remove(this.$1W_1, this.$1s_1[$p0.$7_1]);
                delete this.$1s_1[$p0.$7_1]
            }
            this.$36_1 && $p0.$3y_1(this.$36_1)
        }
    },
    $5t_1: function () {
        this.$1s_1 = {};
        var $v_0 = $get("crmFormSubmitMappedDataRemainder");
        if ($v_0 && !isNullOrEmptyString($v_0.value)) for (var $v_1 = XUI.Xml.LoadXml("<mapped>" + $v_0.value + "</mapped>"), $v_2 = XUI.Xml.SelectNodes($v_1, "/mapped/*", null), $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_4 = $v_2[$v_3],
                $v_5 = new Mscrm.RemainderData(XUI.Xml.XMLSerializer.serializeToString($v_4));
            this.registerOtherData($v_5);
            this.$1s_1[$v_4.nodeName] = $v_5
        }
    },
    $5y_1: function () {
        var $v_0 = $get("crmFormOriginalXml");
        if ($v_0 && !isNullOrEmptyString($v_0.value)) {
            var $v_1 = XUI.Xml.LoadXml($v_0.value),
                $v_2 = XUI.Xml.SelectSingleNode($v_1, this.$22_1, null);
            if ($v_2) this.$36_1 = $v_2
        }
    },
    $4v_1: function () {
        var $v_0 = this.get_$j_1().getHandler("OnRecordIdChanged");
        $v_0 && $v_0(this, null)
    },
    $4u_1: function () {
        var $v_0 = this.get_$3G_1().getHandler("OnIsDisabledChanged");
        !IsNull($v_0) && $v_0(this, null)
    },
    clearPendingAssociations: function () {
        if (this.$1B_1.length > 0) {
            for (var $v_0 = 0; $v_0 < this.$1B_1.length; $v_0++) this.$1B_1[$v_0] = null;
            Array.clear(this.$1B_1)
        }
    }
};
Mscrm.HtcProxyFormData = function (control) {
    this.$2G_0 = control
};
Mscrm.HtcProxyFormData.prototype = {
    $2G_0: null,
    hasDataToSerialize: function (mode) {
        switch (mode) {
            case 2:
                return true;
            case 0:
                return !IsNull(this.$2G_0.get_dataValue());
            case 1:
                return this.$2G_0.get_isDirty();
            default:
                break
        }
        return false
    },
    serialize: function (writer, mode) {
        if (!this.hasDataToSerialize(mode)) return;
        writer.append(this.$2G_0.get_dataXml())
    }
};
Mscrm.InlineFormDataLookupAttribute = function () {
    Mscrm.InlineFormDataLookupAttribute.initializeBase(this)
};
Mscrm.InlineFormDataLookupAttribute.prototype = {
    get_isDirty: function () {
        return this.get_isDirtyOverride() || this.$L_1 !== this.get_value()
    }
};
Mscrm.InlineFormDataRelatedCasesLookupAttribute = function () {
    Mscrm.InlineFormDataRelatedCasesLookupAttribute.initializeBase(this)
};
Mscrm.InlineFormDataRelatedCasesLookupAttribute.prototype = {
    resetValue: function (value) {
        return true
    },
    get_isDirty: function () {
        return false
    }
};
Mscrm.LookupAttribute = function () {
    this.$1Z_2 = 1;
    Mscrm.LookupAttribute.initializeBase(this);
    this.$K_2 = new Array(0);
    this.$F_1 = "lookup";
    this.add_validate(Mscrm.LookupAttribute.$7R);
    this.add_validate(Mscrm.LookupAttribute.$7O)
};
Mscrm.LookupAttribute.$7O = function ($p0, $p1) {
    if ($p1.$2Q_1 === 2) {
        for (var $v_0 = true, $v_1 = $p0.$K_2, $v_2 = 0; $v_2 < $v_1.length && $v_0; $v_2++) if (!IsNull($v_1[$v_2])) $v_0 = !! ($v_0 & $v_1[$v_2].IsValid());
        return new Mscrm.ValidationResult($v_0, null)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.LookupAttribute.$7R = function ($p0, $p1) {
    var $v_0 = $p0,
        $v_1 = $p1.$3_1;
    if (IsNull($v_1)) return new Mscrm.ValidationResult(true, null);
    if (!isArray($v_1)) return new Mscrm.ValidationResult(false, null);
    if ($v_0.$1Z_2 === 1 && $v_1.length > 1) return new Mscrm.ValidationResult(false, null);
    for (var $v_2 = $v_0.$K_2[0], $v_3 = 0; $v_3 < $v_1.length; $v_3++) {
        var $v_4 = $v_1[$v_3],
            $v_5 = $v_4.entityType;
        if ($v_5) $v_4.typename = $v_5;
        if (!$v_2.IsPermissibleType($v_4)) return new Mscrm.ValidationResult(false, null)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.LookupAttribute.prototype = {
    $K_2: null,
    get_isDirty: function () {
        for (var $v_0 = false, $v_1 = 0; $v_1 < this.$K_2.length && !$v_0; $v_1++) $v_0 = this.$K_2[$v_1].get_isDirty();
        return $v_0
    },
    isEqual: function (value1, value2) {
        return !Mscrm.FormInputControl.LookupUIBehavior.itemsDifferent(value1, value2)
    },
    get_hasValue: function () {
        for (var $v_0 = false, $v_1 = 0; $v_1 < this.$K_2.length && !$v_0; $v_1++) $v_0 = !IsNull(this.$K_2[$v_1]) && !IsNull(this.$K_2[$v_1].get_dataValue());
        return $v_0
    },
    $3y_1: function ($p0) {
        Mscrm.FormDataAttribute.prototype.$3y_1.call(this, $p0);
        for (var $v_0 = this.$L_1, $v_1 = 0; $v_1 < this.$K_2.length; $v_1++) this.$K_2[$v_1].set_defaultValue($v_0)
    },
    $4I_1: function ($p0, $p1) {
        Mscrm.FormDataAttribute.prototype.$4I_1.call(this, $p0, $p1);
        Array.add(this.$K_2, Mscrm.FormControlInputBehavior.GetBehavior($p1.id))
    },
    deserialize: function (attributeNode) {
        var $v_0 = XUI.Xml.DomUtils.GetFirstChild(attributeNode);
        if (!$v_0) return null;
        else if ($v_0.nodeType === 3) {
            var $v_1 = new LookupControlItem;
            $v_1.id = XUI.Xml.GetText(attributeNode);
            $v_1.name = XUI.Xml.GetText(attributeNode.attributes.getNamedItem("name"));
            $v_1.type = XUI.Xml.GetText(attributeNode.attributes.getNamedItem("type"));
            return [$v_1]
        } else {
            for (var $v_2 = [], $v_3 = attributeNode.childNodes, $v_4 = 0; $v_4 < $v_3.length; $v_4++) {
                var $v_5 = $v_3[$v_4],
                    $v_6 = new LookupControlItem;
                switch ($v_5.nodeName) {
                    case "item":
                        $v_6.id = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_5, "id", null));
                        $v_6.name = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_5, "name", null));
                        $v_6.type = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_5, "type", null));
                        Array.add($v_2, $v_6);
                        break;
                    case "activityparty":
                        var $v_7 = XUI.Xml.SelectSingleNode($v_5, "partyid", null);
                        if ($v_7) {
                            $v_6.id = XUI.Xml.GetText($v_7);
                            $v_6.name = XUI.Xml.GetText($v_7.attributes.getNamedItem("name"));
                            $v_6.type = XUI.Xml.GetText($v_7.attributes.getNamedItem("type"))
                        } else {
                            var $v_A = XUI.Xml.SelectSingleNode($v_5, "addressused", null);
                            if ($v_A) {
                                $v_6.data = XUI.Xml.GetText($v_A);
                                $v_6.name = XUI.Xml.GetText($v_A);
                                $v_6.type = Mscrm.EntityTypeCode.UnresolvedEmailParty.toString()
                            }
                        }
                        var $v_8 = XUI.Xml.SelectSingleNode($v_5, "effort", null);
                        if ($v_8) $v_6.effort = XUI.Xml.GetText($v_8);
                        var $v_9 = XUI.Xml.SelectSingleNode($v_5, "resourcespecid", null);
                        if ($v_9) $v_6.resourceSpecId = XUI.Xml.GetText($v_9);
                        Array.add($v_2, $v_6);
                        break;
                    default:
                        break
                }
            }
            return $v_2.length > 0 ? $v_2 : null
        }
    },
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element);
        var $v_0 = element.getAttribute("lookupstyle");
        if (!isNullOrEmptyString($v_0)) switch ($v_0) {
            case "single":
                this.$1Z_2 = 1;
                break;
            case "multi":
                this.$1Z_2 = 2;
                break;
            case "subject":
                this.$1Z_2 = 3;
                break;
            default:
                break
        }
    },
    dispose: function () {
        this.$K_2 = null;
        Mscrm.FormDataAttribute.prototype.dispose.call(this)
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value);
        if ($v_0) if (!$v_0.length) $v_0 = null;
        else {
            if (this.$1Z_2 === 1 && $v_0.length > 1) $v_0 = [$v_0[0]];
            for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
                var $v_2 = $v_0[$v_1];
                $v_2.entityType = $v_2.typename
            }
        }
        return $v_0
    },
    serializeInternal: function (writer) {
        var $v_0 = this.$K_2[0];
        writer.append($v_0.GetDataXml(this.$7_1))
    }
};
Mscrm.NumberAttribute = function () {
    this.$$d_$5g_2 = Function.createDelegate(this, this.$5g_2);
    Mscrm.NumberAttribute.initializeBase(this)
};
Mscrm.NumberAttribute.$7P = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    var $v_0 = $p1.$3_1,
        $v_1 = $p0;
    if (typeof $v_0 !== Mscrm.TypeNames.numberType || $v_0 < $v_1.$u_2 || $v_1.$s_2 < $v_0) {
        var $v_2 = LOCID_DURATION_BADTYPE,
            $v_3 = String.format($v_2, Mscrm.NumberUtility.addFormatting($v_1.$u_2, $v_1.$V_2), Mscrm.NumberUtility.addFormatting($v_1.$s_2, $v_1.$V_2));
        return new Mscrm.ValidationResult(false, $v_3)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.NumberAttribute.$7S = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    if (typeof $p1.$3_1 !== Mscrm.TypeNames.numberType) {
        var $v_2 = $p0.$e_1 === "duration" ? LOCID_DEVERROR_BADDATATYPE_INT : LOCID_DEVERROR_BADDATATYPE_INT;
        return new Mscrm.ValidationResult(false, LOCID_DEVERROR_BADDATATYPE_INT)
    }
    var $v_0 = $p1.$3_1,
        $v_1 = $p0;
    if ($v_0 < $v_1.$u_2 || $v_1.$s_2 < $v_0) {
        var $v_3 = $v_1.$F_1 === "integer" ? LOCID_NUMBER_RANGE_MASK : LOCID_FLOAT_RANGE_MASK,
            $v_4 = String.format($v_3, Mscrm.NumberUtility.addFormatting($v_1.$u_2, $v_1.$V_2), Mscrm.NumberUtility.addFormatting($v_1.$s_2, $v_1.$V_2));
        return new Mscrm.ValidationResult(false, $v_4)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.NumberAttribute.prototype = {
    $s_2: null,
    $u_2: null,
    $V_2: 0,
    $1u_2: null,
    $g_2: null,
    get_max: function () {
        return this.$s_2
    },
    get_min: function () {
        return this.$u_2
    },
    get_precision: function () {
        return this.$V_2
    },
    getWrapperInternal: function () {
        return new Mscrm.NumberAttributeWrapper(this)
    },
    deserialize: function (attributeNode) {
        return this.preProcessValue(parseFloat(XUI.Xml.GetText(attributeNode)))
    },
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element);
        this.$g_2 = Mscrm.FormControlInputBehavior.GetBehavior(element.id);
        if (Sys.UI.DomElement.containsCssClass(element, "ms-crm-Duration")) {
            this.add_validate(Mscrm.NumberAttribute.$7P);
            this.$u_2 = parseInt(element.getAttribute("MinMinutes"), 10);
            this.$s_2 = parseInt(element.getAttribute("MaxMinutes"), 10);
            this.$V_2 = 0;
            this.$F_1 = "integer"
        } else {
            this.add_validate(Mscrm.NumberAttribute.$7S);
            this.$u_2 = this.$g_2.get_min();
            this.$s_2 = this.$g_2.get_max();
            this.$V_2 = this.$g_2.get_precision();
            var $v_0 = this.$g_2.get_dataType();
            switch ($v_0) {
                case "float":
                    $v_0 = "double";
                    break;
                case "int":
                    $v_0 = "integer";
                    if (IsNull(this.$e_1)) this.$e_1 = "none";
                    break;
                case "decimal":
                case "money":
                    break;
                default:
                    break
            }
            this.$F_1 = $v_0;
            this.$1u_2 = this.$$d_$5g_2;
            this.$g_2.add_precisionChange(this.$1u_2)
        }
    },
    dispose: function () {
        if (!IsNull(this.$g_2) && !IsNull(this.$1u_2)) {
            this.$g_2.remove_precisionChange(this.$1u_2);
            this.$1u_2 = null;
            this.$g_2 = null
        }
        Mscrm.FormDataAttribute.prototype.dispose.call(this)
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value);
        if (!IsNull($v_0)) if (this.$F_1 === "integer") $v_0 = Math.floor($v_0);
        else {
            var $v_1 = 1;
            if (this.$V_2 > 0) for (var $v_2 = 0; $v_2 < this.$V_2; $v_2++) $v_1 *= 10;
            $v_0 = Math.round($v_0 * $v_1) / $v_1
        }
        return $v_0
    },
    $5g_2: function ($p0, $p1) {
        this.$V_2 = $p1.precision
    }
};
Mscrm.OptionSetAttribute = function () {
    Mscrm.OptionSetAttribute.initializeBase(this);
    this.$F_1 = "optionset";
    this.add_validate(Mscrm.OptionSetAttribute.$1J)
};
Mscrm.OptionSetAttribute.$6C = function ($p0, $p1) {
    for (var $v_0 = $p0.getElementsByTagName("INPUT"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
        var $v_2 = $v_0[$v_1],
            $v_3 = XUI.Html.DomUtils.GetNextSibling($v_2);
        $p1[$v_2.value] = XUI.Html.GetText($v_3)
    }
};
Mscrm.OptionSetAttribute.$1J = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    var $v_0 = typeof $p1.$3_1;
    if ($v_0 !== Mscrm.TypeNames.stringType && $v_0 !== Mscrm.TypeNames.numberType) return new Mscrm.ValidationResult(false, LOCID_DEVERROR_BADTYPE_PICKLIST);
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.OptionSetAttribute.prototype = {
    $h_2: null,
    get_formattedValue: function () {
        var $v_0 = this.get_value();
        return IsNull($v_0) ? "" : this.$h_2[$v_0]
    },
    get_isDirty: function () {
        if (this.isAttributeForBulkEdit()) if (IsNull(this.getValue())) return false;
        else return true;
        else return Mscrm.FormDataAttribute.prototype.get_isDirty.call(this)
    },
    get_selectedOption: function () {
        var $v_0 = this.get_value();
        return IsNull($v_0) ? null : new Mscrm.OptionSetItem($v_0, this.$h_2[$v_0])
    },
    get_options: function () {
        var $v_0 = [],
            $$dict_1 = this.$h_2;
        for (var $$key_2 in $$dict_1) {
            var $v_1 = {
                key: $$key_2,
                value: $$dict_1[$$key_2]
            };
            Array.add($v_0, new Mscrm.OptionSetItem($v_1.key, $v_1.value))
        }
        return $v_0
    },
    getOption: function (value) {
        var $v_0 = this.$h_2[value];
        if ($v_0) return new Mscrm.OptionSetItem(value, $v_0);
        return null
    },
    deserialize: function (attributeNode) {
        return this.preProcessValue(parseInt(XUI.Xml.GetText(attributeNode), 10))
    },
    getWrapperInternal: function () {
        return new Mscrm.OptionSetAttributeWrapper(this)
    },
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element);
        this.$h_2 = {};
        if (element.tagName === "SELECT") this.loadOptionsFromSelectControl(element);
        else element.tagName === "DIV" && Mscrm.OptionSetAttribute.$6C(element, this.$h_2)
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value);
        if (!IsNull($v_0)) {
            if (IsNull(this.$h_2[$v_0])) $v_0 = null;
            if (!IsNull($v_0) && typeof $v_0 === Mscrm.TypeNames.stringType) $v_0 = parseInt($v_0, 10)
        }
        return $v_0
    },
    loadOptionsFromSelectControl: function (element) {
        this.$h_2 = {};
        for (var $v_0 = element.options, $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            var $v_2 = $v_0[$v_1],
                $v_3 = isNullOrEmptyString($v_2.value) ? null : $v_2.value;
            this.$h_2[$v_3] = $v_2.text
        }
    }
};
Mscrm.RemainderData = function ($p0) {
    this.$3p_0 = $p0
};
Mscrm.RemainderData.prototype = {
    $3p_0: null,
    hasDataToSerialize: function ($p0) {
        return false
    },
    serialize: function ($p0, $p1) {
        $p0.append(this.$3p_0)
    }
};
Mscrm.TextAttribute = function () {
    Mscrm.TextAttribute.initializeBase(this);
    this.add_validate(Mscrm.TextAttribute.$7T)
};
Mscrm.TextAttribute.$7T = function ($p0, $p1) {
    if (IsNull(window.event) || IsNull(window.event.returnValue) || window.event.returnValue) {
        if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
        if (typeof $p1.$3_1 !== Mscrm.TypeNames.stringType) return new Mscrm.ValidationResult(false, LOCID_DEVERROR_BADTYPE_STRING);
        var $v_0 = $p1.$3_1,
            $v_1 = $p0;
        if (!$v_1.$3e_2) if ($v_0 && Mscrm.Utilities.trim($v_0, null).length > $v_1.$t_2) return new Mscrm.ValidationResult(false, LOCID_DEVERROR_TOO_LONG)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.TextAttribute.prototype = {
    $3Y_2: null,
    $t_2: 0,
    $3e_2: false,
    get_maxLength: function () {
        return this.$t_2
    },
    deserialize: function (attributeNode) {
        if (this.$3Y_2 !== "bit") return Mscrm.FormDataAttribute.prototype.deserialize.call(this, attributeNode);
        return Boolean.parse(XUI.Xml.GetText(attributeNode)) ? "1" : "0"
    },
    getWrapperInternal: function () {
        return new Mscrm.TextAttributeWrapper(this)
    },
    initializeFromDomElement: function (element) {
        Mscrm.FormDataAttribute.prototype.initializeFromDomElement.call(this, element);
        if (element.tagName === "TEXTAREA") {
            this.$F_1 = "memo";
            this.$t_2 = parseInt(element.attributes.getNamedItem("maxlength").value, 10);
            this.$3e_2 = true
        } else {
            this.$F_1 = "string";
            if (element.type === "hidden") {
                var $v_0 = Mscrm.FormControlInputBehavior.GetBehavior(element.id);
                this.$3Y_2 = $v_0.get_attributeType();
                this.$t_2 = Number.MAX_VALUE
            } else this.$t_2 = parseInt(element.attributes.getNamedItem("maxlength").value, 10)
        }
    },
    preProcessValue: function (value) {
        var $v_0 = Mscrm.FormDataAttribute.prototype.preProcessValue.call(this, value);
        if (!IsNull($v_0)) {
            $v_0 = Mscrm.Utilities.trim($v_0, null);
            if (!$v_0.length) $v_0 = null
        }
        return $v_0
    }
};
Mscrm.TickerAttribute = function () {
    Mscrm.TickerAttribute.initializeBase(this)
};
Mscrm.TickerAttribute.prototype = {
    preProcessValue: function (value) {
        var $v_0 = Mscrm.TextAttribute.prototype.preProcessValue.call(this, value);
        if ($v_0) $v_0 = $v_0.toUpperCase();
        return $v_0
    }
};
Mscrm.UrlAttribute = function () {
    Mscrm.UrlAttribute.initializeBase(this);
    this.add_validate(Mscrm.UrlAttribute.$7U)
};
Mscrm.UrlAttribute.$7U = function ($p0, $p1) {
    if (IsNull($p1.$3_1)) return new Mscrm.ValidationResult(true, null);
    var $v_0 = Mscrm.Utilities.trim($p1.$3_1, null);
    if ($v_0.length > 0) {
        var $v_1 = 2;
        if (validateUrlProtocol($v_0) === $v_1) return new Mscrm.ValidationResult(false, LOCID_URLCTRL_INVALID_PROTOCOL)
    }
    return new Mscrm.ValidationResult(true, null)
};
Mscrm.UrlAttribute.prototype = {
    preProcessValue: function (value) {
        var $v_0 = Mscrm.TextAttribute.prototype.preProcessValue.call(this, value);
        if ($v_0) {
            var $v_1 = 0;
            if (validateUrlProtocol($v_0) === $v_1) {
                var $v_2 = $v_0.toLowerCase();
                if (!$v_2.startsWith("http://") && !$v_2.startsWith("https://")) {
                    $v_0 = "http://" + $v_0;
                    if ($v_0.length > this.$t_2) $v_0 = $v_0.substr(0, this.$t_2)
                }
            }
        }
        return $v_0
    }
};
Mscrm.ValidationEventArgs = function (newValue, type) {
    Mscrm.ValidationEventArgs.initializeBase(this);
    this.$3_1 = newValue;
    this.$2Q_1 = type
};
Mscrm.ValidationEventArgs.prototype = {
    $3_1: null,
    $2Q_1: 0,
    get_value: function () {
        return this.$3_1
    },
    get_type: function () {
        return this.$2Q_1
    }
};

function addToQueue(objectType) {
    Mscrm.FormAction.addToQueue(objectType)
}
function assignObject(objectType) {
    Mscrm.FormAction.assignObject(objectType)
}
function changeState(action, objectType, formEventId, objectSubType) {
    Mscrm.FormAction.changeState(action, objectType, formEventId, objectSubType)
}
function onActionMenuClick(action, objectType, objectSubType) {
    return Mscrm.FormAction.onActionMenuClick(action, objectType, objectSubType)
}
function SendFormShortcut(isThroughEmail, entityTitle) {
    Mscrm.FormAction.sendFormShortcut(isThroughEmail, entityTitle)
}
function openRecordInNewWindow(objectType, formControl) {
    Mscrm.FormAction.openRecordInNewWindow(objectType, formControl)
}
Mscrm.FormAction = function () {};
Mscrm.FormAction.addToQueue = function (objectType) {
    var $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_addtoqueue.aspx");
    $v_0.get_query()["iObjType"] = objectType;
    $v_0.get_query()["iTotal"] = "1";
    openStdDlg($v_0, [Mscrm.FormAction.$1G(null)], 400, 200, true, false, null)
};
Mscrm.FormAction.assignObject = function (objectType) {
    if (typeof objectType !== Mscrm.TypeNames.numberType) objectType = parseInt(objectType, 10);
    var $v_0, $v_1 = null,
        $v_2, $v_3 = $get("crmFormSubmit"),
        $v_4 = Mscrm.FormAction.$1G($v_3);
    if (objectType === Mscrm.EntityTypeCode.Incident) {
        $v_2 = 49;
        $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_assignqueue.aspx");
        $v_0.get_query()["iObjType"] = "112";
        $v_0.get_query()["iTotal"] = "1";
        $v_0.get_query()["sQType"] = "1";
        $v_0.get_query()["FromForm"] = "1";
        $v_0.get_query()["uid"] = $v_4;
        var $v_5 = [objectType, $v_2],
            $v_6 = Mscrm.Utilities.createCallbackFunctionObject("assignObjectAction", Mscrm.FormAction, $v_5);
        $v_1 = openStdDlgWithCallback($v_0, [$v_4], 456, 300, $v_6, true, false, null)
    } else if (Mscrm.EntityPropUtil.isActivityTypeCode(objectType)) {
        $v_2 = 47;
        $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_assignqueue.aspx");
        $v_0.get_query()["iObjType"] = objectType;
        $v_0.get_query()["iTotal"] = "1";
        $v_0.get_query()["sQType"] = "1";
        $v_0.get_query()["FromForm"] = "1";
        var $v_7 = [objectType, $v_2],
            $v_8 = Mscrm.Utilities.createCallbackFunctionObject("assignObjectAction", Mscrm.FormAction, $v_7);
        $v_1 = openStdDlgWithCallback($v_0, [$v_4], 500, 310, $v_8, true, false, null)
    } else {
        $v_2 = 47;
        $v_0 = Mscrm.CrmUri.create("/_grid/cmds/dlg_frmassign.aspx");
        $v_0.get_query()["pId"] = $v_4;
        $v_0.get_query()["pType"] = $get("crmFormSubmitObjectType").value;
        $v_0.get_query()["iObjType"] = objectType;
        $v_0.get_query()["iTotal"] = "1";
        var $v_9 = [objectType, $v_2],
            $v_A = Mscrm.Utilities.createCallbackFunctionObject("assignObjectAction", Mscrm.FormAction, $v_9),
            $v_B = objectType !== Mscrm.EntityTypeCode.Workflow ? 260 : 290;
        $v_1 = openStdDlgWithCallback($v_0, window.document, 456, $v_B, $v_A, true, false, null)
    }
    Mscrm.Utilities.isModalDialogSupported() && Mscrm.FormAction.assignObjectAction($v_1, objectType, $v_2)
};
Mscrm.FormAction.assignObjectAction = function (returnValue, objectType, eventCode) {
    if (returnValue) {
        var $v_0 = returnValue["OwnerId"];
        if ($v_0) {
            var $v_1 = returnValue["OwnerType"],
                $v_2 = Mscrm.PostBackUtil.createHiddenInput("assignOwnerId", $v_0),
                $v_3 = Mscrm.PostBackUtil.createHiddenInput("assignOwnerType", $v_1),
                $v_4 = new LookupControlItem;
            $v_4.id = $v_0;
            $v_4.type = $v_1;
            $v_4.name = returnValue["OwnerName"];
            var $v_5 = [$v_4],
                $v_6 = Mscrm.FormUtility.getCrmFormElement(objectType),
                $v_7 = Mscrm.FormControlInputBehavior.GetBehavior("ownerid");
            $v_7.set_dataValue($v_5);
            if (!$v_6.SubmitCrmForm(eventCode, true, true, false, false)) {
                Mscrm.PostBackUtil.deleteInput($v_2);
                Mscrm.PostBackUtil.deleteInput($v_3)
            }
        }
    }
};
Mscrm.FormAction.changeState = function (action, objectType, formEventId, objectSubType) {
    var $v_0 = $find("crmForm");
    if (!$v_0.IsValid(false)) return;
    var $v_1 = [action, formEventId, $v_0],
        $v_2 = Mscrm.Utilities.createCallbackFunctionObject("callbackArgumentFunc", Mscrm.FormAction, $v_1),
        $v_3 = Mscrm.FormAction.onActionMenuClick(action, objectType, objectSubType, $v_2);
    Mscrm.Utilities.isModalDialogSupported() && Mscrm.FormAction.callbackArgumentFunc($v_3, action, formEventId, $v_0)
};
Mscrm.FormAction.callbackArgumentFunc = function (result, action, formEventId, crmForm) {
    if (result) {
        var $v_0 = result["iStateCode"],
            $v_1 = Mscrm.PostBackUtil.createHiddenInput("newStateCode", $v_0 ? $v_0.toString() : "-1"),
            $v_2 = result["iStatusCode"],
            $v_3 = Mscrm.PostBackUtil.createHiddenInput("newStatusCode", $v_2 ? $v_2.toString() : "-1");
        if (action === "deactivatecampactivity") {
            var $v_4 = result["iStartDate"];
            if (IsNull($v_4)) $v_4 = "";
            Mscrm.PostBackUtil.createHiddenInput("acStartDate", $v_4);
            var $v_5 = result["iEndDate"];
            if (IsNull($v_5)) $v_5 = "";
            Mscrm.PostBackUtil.createHiddenInput("acEndDate", $v_5)
        }
        if (!crmForm.SubmitCrmForm(formEventId, true, true, false, false)) {
            Mscrm.PostBackUtil.deleteInput($v_1);
            Mscrm.PostBackUtil.deleteInput($v_3)
        }
    }
};
Mscrm.FormAction.launchOnDemandWorkflowForm = function (objectType, workflowId) {
    var $v_0 = workflowId;
    if (isNullOrEmptyString($v_0)) {
        var $v_1 = [objectType],
            $v_2 = Mscrm.Utilities.createCallbackFunctionObject("setObjectIdAndRunWorkflow", Mscrm.FormAction, $v_1),
            $v_3 = LookupObjectsWithCallback($v_2, null, "single", "4703", 0, null, "membertypecode=" + CrmEncodeDecode.CrmUrlEncode(objectType.toString()), 0, 1, false, "", "", "", "45102185-B1B4-422B-A3BF-F1BA9C6E130A", null, null, null, null, null, null, null, null, "{45102185-B1B4-422B-A3BF-F1BA9C6E130A}");
        Mscrm.Utilities.isModalDialogSupported() && Mscrm.FormAction.setObjectIdAndRunWorkflow($v_3, objectType);
        return
    }
    Mscrm.FormAction.runWorkflow($v_0, objectType)
};
Mscrm.FormAction.setObjectIdAndRunWorkflow = function (lookupItems, objectType) {
    var $v_0;
    if (IsNull(lookupItems) || !lookupItems.items.length) return;
    $v_0 = lookupItems.items[0].id;
    Mscrm.FormAction.runWorkflow($v_0, objectType);
    return
};
Mscrm.FormAction.runWorkflow = function (itemObjectId, objectType) {
    var $v_0 = Mscrm.FormAction.$1G(null),
        $v_1 = Mscrm.CrmUri.create("/_grid/cmds/dlg_runworkflow.aspx");
    $v_1.get_query()["iObjType"] = objectType;
    $v_1.get_query()["iTotal"] = "1";
    $v_1.get_query()["wfId"] = itemObjectId;
    $v_1.get_query()["sIds"] = $v_0 + ";";
    openStdDlg($v_1, [$v_0], 500, 200, true, false, null)
};
Mscrm.FormAction.resolveCase = function (caseId, gridControl) {
    var $v_0 = Mscrm.CrmUri.create("/CS/cases/dlg_closecase.aspx"),
        $v_1 = false;
    $v_0.get_query()["pId"] = caseId;
    $v_0.get_query()["pType"] = Mscrm.EntityTypeCode.Incident;
    var $v_2 = [gridControl],
        $v_3 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterResolveCase", Mscrm.IncidentActions, $v_2),
        $v_4 = openStdDlgWithCallback($v_0, window.document, 400, 365, $v_3);
    if (Mscrm.Utilities.isModalDialogSupported()) $v_1 = Mscrm.FormAction.performActionAfterResolveCase($v_4, gridControl);
    return $v_1
};
Mscrm.FormAction.performActionAfterResolveCase = function (returnValue, gridControl) {
    var $v_0 = false;
    if (returnValue) {
        var $v_1 = new RemoteCommand("CustomerService", "ResolveCase");
        $v_1.SetParameter("activityXml", returnValue.ActivityXml);
        $v_1.SetParameter("newStatus", returnValue.StatusCode);
        var $v_2 = $v_1.Execute();
        $v_0 = $v_2.Success;
        gridControl && gridControl.refresh()
    }
    return $v_0
};
Mscrm.FormAction.runScript = function (objectTypeCode, entityName) {
    var $v_0 = Mscrm.FormAction.$1G(null),
        $v_1 = [$v_0, entityName],
        $v_2 = Mscrm.Utilities.createCallbackFunctionObject("runDialog", Mscrm.FormAction, $v_1),
        $v_3 = LookupObjectsWithCallback($v_2, null, "single", "4703", 0, null, "membertypecode=" + CrmEncodeDecode.CrmUrlEncode(objectTypeCode.toString()), 0, 0, false, "", "", "", "5DC43D17-D871-4470-B9D7-5B64AC2AF436", null, null, null, null, null, null, null, null, "{5DC43D17-D871-4470-B9D7-5B64AC2AF436}");
    Mscrm.Utilities.isModalDialogSupported() && Mscrm.FormAction.runDialog($v_3, $v_0, entityName)
};
Mscrm.FormAction.runDialog = function (lookupItems, objectId, entityName) {
    if (!IsNull(lookupItems)) if (0 !== lookupItems.items.length) {
        var $v_0 = lookupItems.items[0].id,
            $v_1 = Mscrm.CrmUri.create("/cs/dialog/rundialog.aspx");
        $v_1.get_query()["DialogId"] = $v_0;
        $v_1.get_query()["ObjectId"] = objectId;
        $v_1.get_query()["EntityName"] = entityName;
        openStdWin($v_1, buildWinName(null), 615, 480, null)
    }
};
Mscrm.FormAction.onActionMenuClick = function (action, objectType, objectSubtype, callbackArgumentRef) {
    var $v_0 = {};
    $v_0["action"] = action;
    $v_0["objectType"] = objectType;
    $v_0["objectSubtype"] = objectSubtype;
    $v_0["callbackArgumentRef"] = callbackArgumentRef;
    return Mscrm.FormAction.handleActionMenuClick($v_0)
};
Mscrm.FormAction.handleActionMenuClick = function (clickContext) {
    var $v_0 = null,
        $v_1 = null,
        $v_2 = null,
        $v_3 = null,
        $v_4 = null;
    if ("action" in clickContext) $v_0 = clickContext["action"];
    if ("objectType" in clickContext) $v_1 = clickContext["objectType"];
    if ("objectSubtype" in clickContext) $v_2 = clickContext["objectSubtype"];
    if ("callbackArgumentRef" in clickContext) $v_3 = clickContext["callbackArgumentRef"];
    if ("recordId" in clickContext) $v_4 = clickContext["recordId"];
    if (Mscrm.Utilities.isIosDevice() && "webmailmerge" === $v_0) {
        alert(window.LOCID_UNSUPPORTED_RIBBONACTION);
        return null
    }
    if (typeof $v_1 !== Mscrm.TypeNames.numberType) $v_1 = parseInt($v_1, 10);
    var $v_5 = 400,
        $v_6 = 200,
        $v_7 = false,
        $v_8 = false,
        $v_9 = true,
        $v_A = null,
        $v_B = null,
        $v_C = null,
        $v_D = null,
        $v_E = $find("crmForm"),
        $v_F = $get("crmFormSubmit"),
        $v_G = null;
    if (isNullOrEmptyString($v_4)) if ($v_1 !== Mscrm.EntityTypeCode.WebResource) $v_G = Mscrm.FormAction.$1G($v_F);
    else $v_G = $get("crmFormSubmitId").value;
    else $v_G = $v_4;
    var $v_H = [$v_G],
        $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_" + CrmEncodeDecode.CrmUrlEncode($v_0) + ".aspx");
    $v_I.get_query()["iObjType"] = $v_1;
    $v_I.get_query()["iTotal"] = "1";
    $v_I.get_query()["sIds"] = $v_G;
    if (!IsNull($v_2)) $v_I.get_query()["iObjSubType"] = $v_2;
    if (!$v_E && ($v_1 === Mscrm.EntityTypeCode.Report || $v_1 === Mscrm.EntityTypeCode.WebResource)) $v_E = $find("crmFormSubmit");
    switch ($v_0) {
        case "applyrule":
            $v_5 = 400;
            $v_6 = 275;
            break;
        case "approve_user":
        case "reject_user":
        case "approve_queue":
        case "reject_queue":
            $v_8 = true;
            break;
        case "assign":
            $v_5 = 456;
            $v_6 = 260;
            $v_7 = true;
            break;
        case "actsetrespon":
            $v_5 = 456;
            $v_6 = 310;
            break;
        case "changeorg":
            $v_5 = 400;
            $v_6 = 325;
            if ($v_1 === Mscrm.EntityTypeCode.SystemUser || $v_1 === Mscrm.EntityTypeCode.Team) $v_8 = true;
            else $v_7 = true;
            break;
        case "changecaptain":
            $v_5 = 400;
            $v_6 = 225;
            $v_7 = true;
            break;
        case "changeparent":
            $v_5 = 400;
            $v_6 = 225;
            $v_8 = true;
            break;
        case "delete":
            $v_5 = 450;
            $v_6 = 205;
            !IsNull($v_E) && $v_1 !== Mscrm.EntityTypeCode.WebResource && $v_E.detachCloseAlert();
            $v_7 = true;
            switch ($v_1) {
                case Mscrm.EntityTypeCode.Account:
                    $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_delete_account.aspx");
                    $v_I.get_query()["iObjType"] = $v_1;
                    $v_I.get_query()["iTotal"] = "1";
                    $v_I.get_query()["sIds"] = $v_G;
                    $v_C = [$v_0, $v_1, $v_7, $v_8, $v_G, $v_E, $v_3];
                    $v_D = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_C);
                    $v_A = openStdDlgWithCallback($v_I, $v_H, 450, 250, $v_D, true, false, null);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.Calendar:
                    var $v_J = $get("calendarid", $v_E.get_element());
                    $v_I.get_query()["sCalendarId"] = $v_J.value;
                    break;
                case Mscrm.EntityTypeCode.Contact:
                    $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_delete_contact.aspx");
                    $v_I.get_query()["iObjType"] = $v_1;
                    $v_I.get_query()["iTotal"] = "1";
                    $v_I.get_query()["sIds"] = $v_G;
                    $v_C = [$v_0, $v_1, $v_7, $v_8, $v_G, $v_E, $v_3];
                    $v_D = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_C);
                    $v_A = openStdDlgWithCallback($v_I, $v_H, 450, 250, $v_D, true, false, null);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.OpportunityProduct:
                case Mscrm.EntityTypeCode.QuoteDetail:
                case Mscrm.EntityTypeCode.SalesOrderDetail:
                case Mscrm.EntityTypeCode.InvoiceDetail:
                    var $v_K = "",
                        $v_L = [],
                        $v_M = window.opener;
                    if ($v_M && !$v_M.closed) {
                        var $v_P = $v_M.parent;
                        $v_L[0] = $v_P;
                        var $v_Q = $v_P.document.getElementById("crmFormSubmit");
                        $v_K = Mscrm.FormAction.$1G($v_Q)
                    } else $v_L[0] = null;
                    $v_L[1] = $v_H;
                    $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_deleteqoiproduct.aspx");
                    $v_I.get_query()["iObjType"] = $v_1;
                    $v_I.get_query()["iTotal"] = $v_H.length;
                    $v_I.get_query()["sParentId"] = $v_K;
                    $v_C = [$v_0, $v_1, $v_7, $v_8, $v_G, $v_E, $v_3];
                    $v_D = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_C);
                    $v_A = openStdDlgWithCallback($v_I, $v_L, 450, 205, $v_D, true, false, null);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.RecurringAppointmentMaster:
                    $v_I = Mscrm.CrmUri.create("/activities/act_dlgs/dlg_seriesaction.aspx");
                    $v_I.get_query()["actionType"] = "6";
                    $v_I.get_query()["iTotal"] = "1";
                    $v_I.get_query()["insDel"] = _seriesActive;
                    $v_A = openStdDlg($v_I, $v_H, 570, 205, true, false, null);
                    $v_A && Mscrm.Utilities.refreshParentGrid(Mscrm.EntityTypeCode.Appointment, "", $v_G);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.Appointment:
                    var $v_N = $get("instancetypecode");
                    if (!IsNull($v_N) && $v_N.value !== "0" && $v_N.value !== "1") {
                        $v_I = Mscrm.CrmUri.create("/activities/act_dlgs/dlg_seriesaction.aspx");
                        $v_I.get_query()["actionType"] = "5";
                        $v_I.get_query()["iTotal"] = "1";
                        $v_I.get_query()["eId"] = $v_G;
                        $v_A = openStdDlg($v_I, $v_H, 350, 250, true, false, null);
                        $v_A && Mscrm.Utilities.refreshParentGrid(Mscrm.EntityTypeCode.Appointment, "", $v_G);
                        $v_I = null
                    }
                    break;
                case Mscrm.EntityTypeCode.Queue:
                    $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_delete_queue.aspx");
                    $v_I.get_query()["iObjType"] = $v_1;
                    $v_I.get_query()["iTotal"] = "1";
                    $v_I.get_query()["sIds"] = $v_G + ";";
                    $v_C = [$v_0, $v_1, $v_7, $v_8, $v_G, $v_E, $v_3];
                    $v_D = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_C);
                    $v_A = openStdDlgWithCallback($v_I, $v_H, $v_5, $v_6, $v_D, $v_9, false, null);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.SharePointSite:
                    $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_delete_sharepointsite.aspx");
                    $v_I.get_query()["iObjType"] = $v_1;
                    $v_I.get_query()["iTotal"] = "1";
                    $v_A = openStdDlg($v_I, $v_H, $v_5, $v_6, $v_9, false, null);
                    $v_I = null;
                    break;
                case Mscrm.EntityTypeCode.Workflow:
                    $v_I.get_query()["sIds"] = $v_G;
                    break
            }
            break;
        case "addtoqueue":
            delete $v_I.get_query().sIds;
            $v_A = openStdDlg($v_I, $v_H, $v_5, $v_6, true, false, null);
            $v_I = null;
            break;
        case "activate":
        case "deactivate":
            if ($v_1 === Mscrm.EntityTypeCode.Goal && $v_0 === "deactivate") {
                var $v_R = new RemoteCommand("GoalManagement", "GoalHasActiveChildGoals");
                $v_R.SetParameter("goalId", $v_G);
                var $v_S = $v_R.Execute();
                if ($v_S.Success) if ($v_S.ReturnValue) if (!confirm(window.LOCID_ACTIVE_CHILD_MSG)) return null
            }
            if ($v_1 === Mscrm.EntityTypeCode.Workflow) if ($v_I.get_query()["iObjSubType"]) $v_I.get_query()["iObjSubType"] = Mscrm.FormAction.$5M();
            if ($v_1 !== Mscrm.EntityTypeCode.ConnectionRole) $v_I.get_query()["confirmMode"] = "1";
            else $v_8 = true;
            $v_6 = 250;
            $v_5 = 420;
            break;
        case "deactivatecampactivity":
            $v_I.get_query()["confirmMode"] = "1";
            $v_6 = 260;
            $v_5 = 350;
            break;
        case "role":
            $v_5 = 500;
            $v_6 = 335;
            break;
        case "share":
            $v_5 = 800;
            $v_6 = 480;
            break;
        case "grant":
            $v_5 = 900;
            $v_6 = 480;
            break;
        case "status":
            $v_5 = 456;
            $v_6 = 250;
            break;
        case "webmailmerge":
            $v_5 = 600;
            $v_6 = 500;
            var $v_O = {};
            $v_O["TotalRecords"] = 1;
            $v_O["SelectedRecords"] = 1;
            $v_O["Ids"] = $v_G;
            $v_O["GridXml"] = "";
            $v_I = Mscrm.CrmUri.create("/_grid/cmds/dlg_webmailmerge.aspx");
            $v_I.get_query()["objectTypeCode"] = $v_1;
            $v_C = [$v_0, $v_1, $v_7, $v_8, $v_G, $v_E, $v_3];
            $v_D = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_C);
            $v_A = openStdDlgWithCallback($v_I, $v_O, $v_5, $v_6, $v_D, $v_9, false, null);
            $v_I = null;
            break
    }
    if (Mscrm.Utilities.isModalDialogSupported() || !$v_D) $v_B = Mscrm.FormAction.callbackFunction($v_A, $v_I, $v_0, $v_1, $v_H, $v_5, $v_6, $v_7, $v_8, $v_9, $v_G, $v_E, $v_3);
    return $v_B
};
Mscrm.FormAction.callbackFunction = function (result, url, action, objectType, ids, width, height, close, reload, resize, id, crmForm, callbackArgumentRef) {
    if (!IsNull(url)) {
        var $v_0 = null;
        $v_0 = [action, objectType, close, reload, id, crmForm, callbackArgumentRef];
        var $v_1 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSwitch", Mscrm.FormAction, $v_0);
        result = openStdDlgWithCallback(url, ids, width, height, $v_1, resize, false, null)
    }
    if (Mscrm.Utilities.isModalDialogSupported()) return Mscrm.FormAction.performActionAfterSwitch(result, action, objectType, close, reload, id, crmForm, callbackArgumentRef);
    return result
};
Mscrm.FormAction.performActionAfterSwitch = function (result, action, objectType, close, reload, id, crmForm, callbackArgumentRef) {
    if (result && close) {
        !Mscrm.Utilities.isIosDevice() && Mscrm.Utilities.refreshParentGrid(objectType, "", id);
        if (action === "delete") {
            var $v_0 = crmForm;
            !IsNull($v_0) && $v_0.recordDeleted();
            Mscrm.Utilities.isIosDevice() && window.top.focus()
        }
        Mscrm.Utilities.closeCurrentWindow();
        Mscrm.Utilities.isIosDevice() && Mscrm.Utilities.refreshParentGrid(objectType, "", id)
    } else if (result && reload) {
        crmForm.SubmitCrmForm(4, true, true, false, false);
        Mscrm.Utilities.refreshParentGrid(objectType, "", id)
    }
    Mscrm.Utilities.executeFunctionIfModeless(callbackArgumentRef, result);
    return result
};
Mscrm.FormAction.sendFormShortcut = function (isThroughEmail, entityTitle, recordId) {
    var $v_0 = Mscrm.CrmUri.create(window.location.href);
    if (Mscrm.SessionInfo.isOutlookLaptopClient() && !Mscrm.SessionInfo.isOnline()) {
        var $v_2 = window.location.href,
            $v_3 = window.location.pathname;
        $v_0 = Mscrm.CrmUri.create(Mscrm.Help.concatenateUrl(window.WEB_APP_URL, $v_2.substr($v_2.indexOf($v_3))));
        $v_0.set_useOrganizationName(false)
    }
    if (!Mscrm.Utilities.isNewPageModel($v_0)) $v_0 = Mscrm.Utilities.removeExtraQSParameters($v_0, Mscrm.Utilities.getRecordPageQueryStringParams());
    else {
        $v_0 = Mscrm.Utilities.getPageUrl($v_0, "entityrecord");
        delete $v_0.get_query().pagemode;
        if (!IsNull(recordId)) $v_0.get_query()["id"] = recordId;
        delete $v_0.get_query().extraqs;
        var $v_4 = $find("crmFormSelector");
        if ($v_4) $v_0.get_query()["extraqs"] = "formid=" + CrmEncodeDecode.CrmUrlEncode($v_4.$n_3)
    }
    var $v_1 = new Sys.StringBuilder;
    $v_1.append(entityTitle);
    $v_1.append("\r\n" + (Mscrm.Utilities.isIosDevice() ? "[" : "<"));
    $v_1.append($v_0.toString());
    $v_1.append(Mscrm.Utilities.isIosDevice() ? "]" : ">");
    if (!isThroughEmail) Mscrm.Shortcuts.copyTextToClipboard($v_1.toString(), "", window.LOCID_COPY_SHORTCUT_ERROR);
    else Mscrm.Shortcuts.openEmailForm("", entityTitle, $v_1.toString())
};
Mscrm.FormAction.openRecordInNewWindow = function (objectType, formControl) {
    if (typeof objectType !== Mscrm.TypeNames.numberType) objectType = parseInt(objectType, 10);
    var $v_0 = $get("crmFormSubmit"),
        $v_1 = Mscrm.FormAction.$1G($v_0),
        $v_2 = {};
    $v_2["etc"] = objectType;
    $v_2["id"] = $v_1;
    $v_2["pagetype"] = "entityrecord";
    $v_2["newWindow"] = true;
    if (!IsNull($v_1) && $v_1 !== "" && !IsNull(objectType)) {
        var $v_3 = "?_CreateFromType=" + CrmEncodeDecode.CrmUrlEncode(objectType.toString()) + "&_CreateFromId=" + CrmEncodeDecode.CrmUrlEncode($v_1);
        $v_2["queryString"] = $v_3
    }
    formControl.raiseEvent(Mscrm.ScriptEvents.NavigateRequest, $v_2)
};
Mscrm.FormAction.$1G = function ($p0) {
    if (IsNull($p0)) $p0 = $get("crmFormSubmit");
    return $get("crmFormSubmitId", $p0).value
};
Mscrm.FormAction.$5M = function () {
    var $v_0 = 1,
        $v_1 = 3,
        $v_2 = $get("type");
    return $v_2.options[$v_2.selectedIndex].value === "1" ? $v_0 : $v_1
};
Mscrm.FormControl = function (element) {
    this.$$d_$5V_3 = Function.createDelegate(this, this.$5V_3);
    this.$$d_$5W_3 = Function.createDelegate(this, this.$5W_3);
    this.$$d_$6v_3 = Function.createDelegate(this, this.$6v_3);
    this.$$d_$4K_3 = Function.createDelegate(this, this.$4K_3);
    this.$$d_$4w_3 = Function.createDelegate(this, this.$4w_3);
    this.$$d_$5i_3 = Function.createDelegate(this, this.$5i_3);
    this.$$d_$68_3 = Function.createDelegate(this, this.$68_3);
    this.$$d_Close = Function.createDelegate(this, this.Close);
    this.$$d_$6A_3 = Function.createDelegate(this, this.$6A_3);
    this.$$d_$6u_3 = Function.createDelegate(this, this.$6u_3);
    this.$$d_$6s_3 = Function.createDelegate(this, this.$6s_3);
    this.$$d_$7F_3 = Function.createDelegate(this, this.$7F_3);
    this.$$d_$7E_3 = Function.createDelegate(this, this.$7E_3);
    this.$$d_$6k_3 = Function.createDelegate(this, this.$6k_3);
    this.$$d_$6l_3 = Function.createDelegate(this, this.$6l_3);
    this.$$d_$50_3 = Function.createDelegate(this, this.$50_3);
    this.$$d_$6m_3 = Function.createDelegate(this, this.$6m_3);
    this.$$d_$4o_3 = Function.createDelegate(this, this.$4o_3);
    this.$$d_$6j_3 = Function.createDelegate(this, this.$6j_3);
    this.$$d_saveAndNavigate = Function.createDelegate(this, this.saveAndNavigate);
    this.$$d_$6c_3 = Function.createDelegate(this, this.$6c_3);
    this.$$d_$6a_3 = Function.createDelegate(this, this.$6a_3);
    this.$$d_$6Z_3 = Function.createDelegate(this, this.$6Z_3);
    this.$$d_$6b_3 = Function.createDelegate(this, this.$6b_3);
    this.$$d_$6Y_3 = Function.createDelegate(this, this.$6Y_3);
    this.$$d_$6U_3 = Function.createDelegate(this, this.$6U_3);
    this.$$d_$6W_3 = Function.createDelegate(this, this.$6W_3);
    this.$$d_$6V_3 = Function.createDelegate(this, this.$6V_3);
    this.$$d_$6T_3 = Function.createDelegate(this, this.$6T_3);
    this.$$d_$6X_3 = Function.createDelegate(this, this.$6X_3);
    this.$$d_$6i_3 = Function.createDelegate(this, this.$6i_3);
    this.$$d_$6e_3 = Function.createDelegate(this, this.$6e_3);
    this.$$d_$6g_3 = Function.createDelegate(this, this.$6g_3);
    this.$$d_$6f_3 = Function.createDelegate(this, this.$6f_3);
    this.$$d_$6d_3 = Function.createDelegate(this, this.$6d_3);
    this.$$d_$6h_3 = Function.createDelegate(this, this.$6h_3);
    this.$$d_$5w_3 = Function.createDelegate(this, this.$5w_3);
    this.$$d_$5r_3 = Function.createDelegate(this, this.$5r_3);
    this.$$d_setFirstElementFocus = Function.createDelegate(this, this.setFirstElementFocus);
    this.$$d_$6M_3 = Function.createDelegate(this, this.$6M_3);
    this.$1E_3 = [];
    this.$18_3 = [];
    this.$25_3 = [];
    this.$1V_3 = {};
    this.$1U_3 = {};
    this.$1l_3 = Mscrm.FormControl.$1H;
    this.$1m_3 = Mscrm.FormControl.$2d;
    this.$o_3 = Mscrm.FormControl.$2d;
    Mscrm.FormControl.initializeBase(this, [element]);
    this.$1R_3 = this.$$d_$6M_3;
    if (Sys.Browser.agent === Sys.Browser.InternetExplorer) $addHandler(this.get_element(), "focusin", this.$1R_3);
    else this.get_element().addEventListener("focus", this.$1R_3, true);
    this.$4Y_3()
};
Mscrm.FormControl.$59 = function ($p0, $p1, $p2, $p3) {
    var $v_0 = "",
        $v_1 = window.ORG_FULLNAME_FORMAT;
    switch ($v_1) {
        case 0:
            if ($p1.length) $v_0 = String.format("{0}, {1}", $p1, $p0);
            else $v_0 = $p0;
            break;
        case 1:
            $v_0 = String.format("{0} {1}", $p0, $p1);
            break;
        case 2:
            if ($p1.length) $v_0 = String.format("{0}, {1} {2}", $p1, $p0, $p3);
            else $v_0 = String.format("{0} {1}", $p0, $p3);
            break;
        case 3:
            $v_0 = String.format("{0} {1} {2}", $p0, $p3, $p1);
            break;
        case 4:
            if ($p1.length) $v_0 = String.format("{0}, {1} {2}", $p1, $p0, $p2);
            else $v_0 = String.format("{0} {1}", $p0, $p2);
            break;
        case 5:
            $v_0 = String.format("{0} {1} {2}", $p0, $p2, $p1);
            break;
        case 6:
            $v_0 = String.format("{0} {1}", $p1, $p0);
            break;
        case 7:
            $v_0 = String.format("{0}{1}", $p1, $p0);
            break
    }
    $v_0 = Mscrm.Utilities.trimSpaces($v_0);
    return Mscrm.Utilities.trimEnd($v_0, [","])
};
Mscrm.FormControl.$8 = function ($p0, $p1) {
    switch ($p0) {
        case 0:
            return String.format(Mscrm.RecordSetNavigation.RecordsMask, $p1);
        case 1:
            return String.format(Mscrm.RecordSetNavigation.MoreRecordsMask, $p1);
        case 2:
            return String.format(Mscrm.RecordSetNavigation.GridXmlMask, $p1);
        case 3:
            return String.format(Mscrm.RecordSetNavigation.RemoteCommandMask, $p1);
        case 4:
            return String.format(Mscrm.RecordSetNavigation.RefreshDataMask, $p1);
        default:
            break
    }
    return ""
};
Mscrm.FormControl.getHttpPostBody = function (formElement) {
    for (var $v_0 = formElement.getElementsByTagName("input"), $v_1 = Mscrm.CrmUri.create(""), $v_3 = 0; $v_3 < $v_0.length; $v_3++) {
        var $v_4 = $v_0[$v_3].getAttribute("name"),
            $v_5 = $v_0[$v_3].getAttribute("value");
        if (isNullOrEmptyString($v_4)) continue;
        $v_1.setQueryParameter($v_4, $v_5)
    }
    var $v_2 = $v_1.get_queryString();
    return $v_2.substring(1, $v_2.length)
};
Mscrm.FormControl.prototype = {
    $1X_3: false,
    $Z_3: null,
    $38_3: "crmFormSubmit",
    $x_3: false,
    $2f_3: false,
    $1x_3: true,
    $2h_3: true,
    $2R_3: 0,
    $2g_3: false,
    $2r_3: false,
    $2E_3: true,
    $2i_3: null,
    $2o_3: null,
    $2m_3: null,
    $2p_3: null,
    $2l_3: null,
    $2n_3: null,
    $2k_3: null,
    $z_3: null,
    $3R_3: 0,
    $1R_3: null,
    confirmDialogHeight: 0,
    confirmDialogWidth: 0,
    entityTitle: null,
    entityDisplayName: null,
    pageTitle: null,
    openActionTitle: null,
    openInNewWindowActionTitle: null,
    copyShortcutActionTitle: null,
    sendShortcutActionTitle: null,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.$7J_3();
        if (!IsNull(this.get_eventManager())) {
            this.get_eventManager().subscribeEvent(Mscrm.ScriptEvents.NavigateConfirm, this.get_id());
            this.get_eventManager().subscribeEvent(Mscrm.ScriptEvents.GetPageInfo, this.get_id())
        }
        setPageTitle(this.pageTitle);
        if (IsNull(Mscrm.PageManager.get_instance())) window.setTimeout(this.$$d_setFirstElementFocus, 150);
        else {
            !this.get_isNew() && executeFunctionDeferred(this.$$d_$5r_3, false, false);
            executeFunctionDeferred(this.$$d_setFirstElementFocus, false, false)
        }
    },
    openAdvancedFind: function () {
        var $v_0 = Mscrm.CrmUri.create("/AdvancedFind/AdvFind.aspx");
        $v_0.get_query()["EntityCode"] = this.get_entityTypeCode();
        openStdWin($v_0, "_blank", 700, 600, null)
    },
    $5r_3: function () {
        var $v_0 = {}, $v_1 = this.$$d_$5w_3;
        $v_0["cacheInitializedCallback"] = $v_1;
        this.raiseEvent(Mscrm.ScriptEvents.CacheInitializedCallback, $v_0)
    },
    dispose: function () {
        if (this.get_isDisposed()) return;
        if (!IsNull(this.$1R_3)) if (Sys.Browser.agent === Sys.Browser.InternetExplorer) $removeHandler(this.get_element(), "focusin", this.$1R_3);
        else this.get_element().removeEventListener("focus", this.$1R_3, true);
        this.$4n_3();
        this.$7I_3();
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $4n_3: function () {
        !IsNull(this.$D_3) && $clearHandlers(this.$D_3);
        !IsNull(this.$E_3) && $clearHandlers(this.$E_3);
        !IsNull(this.$9_3) && $clearHandlers(this.$9_3)
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        switch (eventCode) {
            case Mscrm.ScriptEvents.NavigateConfirm:
                return this.$5d_3(parameters);
            case Mscrm.ScriptEvents.GetPageInfo:
                return this.$5U_3(parameters)
        }
        return null
    },
    $4Y_3: function () {
        if (this.get_isDisposed()) return;
        this.$3q_3();
        this.$55_3();
        this.$4K_3()
    },
    $6M_3: function ($p0) {
        var $v_0 = $p0;
        if (IsNull($v_0.rawEvent)) $v_0 = Mscrm.Utilities.eventToDomEvent($p0);
        var $v_1 = $p0.target,
            $v_2 = null;
        if ($v_1.className !== "ms-crm-InlineTabContainer") {
            while ($v_1 !== this.get_element() && IsNull($v_2)) {
                var $v_4 = $find($v_1.id);
                if (!IsNull($v_4)) if (Mscrm.IRibbonSelectionControl.isInstanceOfType($v_4)) $v_2 = $v_4;
                else if (Mscrm.IRibbonSelectionControlProxy.isInstanceOfType($v_4)) $v_2 = $v_4.get_selectionControl();
                $v_1 = $v_1.parentNode
            }
            var $v_3 = {};
            $v_3["selectedControl"] = $v_2;
            this.raiseEventWithCheck(Mscrm.ScriptEvents.SetRibbonSelectedControl, $v_3)
        }
    },
    $E_3: null,
    $p_3: null,
    $1o_3: null,
    $31_3: null,
    $9_3: null,
    $D_3: null,
    $77_3: function () {
        this.$74_3();
        this.$73_3();
        this.$72_3()
    },
    $Q_3: function ($p0) {
        var $v_0 = "";
        switch ($p0) {
            case "recnav-dropdown-disabled":
            case "recnav-dropdown-rest":
            case "recnav-down-disabled":
            case "recnav-down-rest":
            case "recnav-up-disabled":
            case "recnav-up-rest":
                $v_0 = "ms-crm-recnav-default";
                break;
            case "recnav-dropdown-hover":
            case "recnav-down-hover":
            case "recnav-up-hover":
                $v_0 = "ms-crm-recnav-hover";
                break;
            case "recnav-dropdown-selected":
            case "recnav-down-selected":
            case "recnav-up-selected":
                $v_0 = "ms-crm-recnav-selected";
                break;
            default:
                return $p0
        }
        return $v_0
    },
    $73_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$9_3);
        this.$9_3.className = "recnav-up " + this.$Q_3("recnav-up-disabled");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Up_Disabled.png")
    },
    $3O_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$9_3);
        this.$9_3.className = "recnav-up " + this.$Q_3("recnav-up-rest");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Up_Enabled.png")
    },
    $4S_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$9_3);
        this.$9_3.className = "recnav-up " + this.$Q_3("recnav-up-hover");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Up_Enabled.png")
    },
    $72_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$D_3);
        this.$D_3.className = "recnav-down " + this.$Q_3("recnav-down-disabled");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Down_Disabled.png")
    },
    $3N_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$D_3);
        this.$D_3.className = "recnav-down " + this.$Q_3("recnav-down-rest");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Down_Enabled.png")
    },
    $4R_3: function () {
        var $v_0 = XUI.Html.DomUtils.GetFirstChild(this.$D_3);
        this.$D_3.className = "recnav-down " + this.$Q_3("recnav-down-hover");
        Mscrm.ImageStrip.changeImage($v_0, "/_imgs/recnav/Down_Enabled.png")
    },
    $74_3: function () {
        this.$E_3.className = "recnav-dropdown " + this.$Q_3("recnav-dropdown-disabled");
        Mscrm.ImageStrip.changeImage(this.$1o_3, "/_imgs/recnav/disabled_arrow.png");
        this.$p_3.className = "recnav-dropdown recnav-dropdown-disabled"
    },
    $3P_3: function () {
        this.$E_3.className = "recnav-dropdown " + this.$Q_3("recnav-dropdown-rest");
        Mscrm.ImageStrip.changeImage(this.$1o_3, "/_imgs/recnav/enabled_arrow.png");
        this.$p_3.className = "recnav-dropdown recnav-dropdown-rest " + this.$Q_3("recnav-dropdown-rest")
    },
    $75_3: function () {
        this.$E_3.className = "recnav-dropdown " + this.$Q_3("recnav-dropdown-hover");
        Mscrm.ImageStrip.changeImage(this.$1o_3, "/_imgs/recnav/enabled_arrow.png");
        this.$p_3.className = "recnav-dropdown recnav-dropdown-hover " + this.$Q_3("recnav-dropdown-hover")
    },
    $76_3: function () {
        this.$E_3.className = "recnav-dropdown " + this.$Q_3("recnav-dropdown-selected");
        Mscrm.ImageStrip.changeImage(this.$1o_3, "/_imgs/recnav/enabled_arrow.png");
        this.$p_3.className = "recnav-dropdown recnav-dropdown-selected " + this.$Q_3("recnav-dropdown-selected")
    },
    $4F_3: 142,
    $5w_3: function () {
        this.$y_3();
        var $v_0 = $get("recordSetToolBar");
        if (IsNull($v_0)) return;
        this.$E_3 = XUI.Html.DomUtils.GetFirstChild($v_0);
        this.$p_3 = XUI.Html.DomUtils.GetFirstChild(this.$E_3);
        this.$1o_3 = XUI.Html.DomUtils.GetNextSibling(this.$p_3);
        this.$9_3 = XUI.Html.DomUtils.GetNextSibling(this.$E_3);
        this.$31_3 = this.$9_3;
        this.$D_3 = XUI.Html.DomUtils.GetNextSibling(this.$9_3);
        this.$77_3();
        var $v_1 = this.$p_3.scrollWidth;
        $v_1 = $v_1 < this.$4F_3 ? $v_1 : this.$4F_3;
        this.$p_3.style.width = $v_1.toString() + "px";
        if (this.$A_3) {
            if (this.get_$5m_3()) {
                this.$9_3.tabIndex = 0;
                this.$3O_3();
                $addHandler(this.$9_3, "mouseover", this.$$d_$6h_3);
                $addHandler(this.$9_3, "mouseout", this.$$d_$6d_3);
                $addHandler(this.$9_3, "focusin", this.$$d_$6f_3);
                $addHandler(this.$9_3, "focusout", this.$$d_$6g_3);
                $addHandler(this.$9_3, "click", this.$$d_$6e_3);
                $addHandler(this.$9_3, "keydown", this.$$d_$6i_3)
            }
            if (this.get_$5l_3()) {
                this.$D_3.tabIndex = 0;
                this.$3N_3();
                $addHandler(this.$D_3, "mouseover", this.$$d_$6X_3);
                $addHandler(this.$D_3, "mouseout", this.$$d_$6T_3);
                $addHandler(this.$D_3, "focusin", this.$$d_$6V_3);
                $addHandler(this.$D_3, "focusout", this.$$d_$6W_3);
                $addHandler(this.$D_3, "click", this.$$d_$6U_3);
                $addHandler(this.$D_3, "keydown", this.$$d_$6Y_3)
            }
            this.$E_3.tabIndex = 0;
            this.$3P_3();
            $addHandler(this.$E_3, "mouseover", this.$$d_$6b_3);
            $addHandler(this.$E_3, "mouseout", this.$$d_$6Z_3);
            $addHandler(this.$E_3, "focusin", this.$$d_$6b_3);
            $addHandler(this.$E_3, "focusout", this.$$d_$6Z_3);
            $addHandler(this.$E_3, "click", this.$$d_$6a_3);
            $addHandler(this.$E_3, "keydown", this.$$d_$6c_3)
        }
    },
    $6b_3: function ($p0) {
        if (!this.$2M_3) {
            $p0.stopPropagation();
            this.$75_3()
        }
    },
    $6Z_3: function ($p0) {
        if (!this.$2M_3) {
            $p0.stopPropagation();
            this.$3P_3()
        }
    },
    $6a_3: function ($p0) {
        if (!$p0.button) {
            $p0.stopPropagation();
            this.$4H_3()
        }
    },
    $6c_3: function ($p0) {
        if ($p0.keyCode === 13 || $p0.keyCode === 32) {
            $p0.stopPropagation();
            this.$4H_3()
        }
    },
    $3E_3: function () {
        var $v_0 = Mscrm.Utilities.getXYPos(this.$31_3, window.LOCID_UI_DIR === "RTL");
        $v_0["y"] = $v_0["y"] + this.$31_3.offsetHeight;
        return $v_0
    },
    $2M_3: false,
    $4H_3: function () {
        this.$2M_3 = true;
        this.$76_3();
        this.showRecordSelector(this.$3E_3())
    },
    $6k_3: function ($p0) {
        this.$2M_3 = false;
        this.$3P_3()
    },
    $6h_3: function ($p0) {
        $p0.stopPropagation();
        this.$4S_3()
    },
    $6d_3: function ($p0) {
        $p0.stopPropagation();
        this.$3O_3()
    },
    $6f_3: function ($p0) {
        $p0.stopPropagation();
        this.$4S_3()
    },
    $6g_3: function ($p0) {
        $p0.stopPropagation();
        this.$3O_3()
    },
    $6e_3: function ($p0) {
        $p0.stopPropagation();
        !$p0.button && this.previousRecord()
    },
    $6i_3: function ($p0) {
        $p0.stopPropagation();
        ($p0.keyCode === 13 || $p0.keyCode === 32) && this.previousRecord()
    },
    $6X_3: function ($p0) {
        $p0.stopPropagation();
        this.$4R_3()
    },
    $6T_3: function ($p0) {
        $p0.stopPropagation();
        this.$3N_3()
    },
    $6V_3: function ($p0) {
        $p0.stopPropagation();
        this.$4R_3()
    },
    $6W_3: function ($p0) {
        $p0.stopPropagation();
        this.$3N_3()
    },
    $6U_3: function ($p0) {
        $p0.stopPropagation();
        !$p0.button && this.nextRecord()
    },
    $6Y_3: function ($p0) {
        $p0.stopPropagation();
        ($p0.keyCode === 13 || $p0.keyCode === 32) && this.nextRecord()
    },
    $5d_3: function ($p0) {
        var $v_0 = true;
        if (this.CheckFormDirty() && this.CloseAlertAttached()) {
            $v_0 = false;
            var $v_1 = [$p0],
                $v_2 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterNavigateConfirm", this, $v_1),
                $v_3 = openStdDlgWithCallback(Mscrm.CrmUri.create("/_forms/dlg_navigateconfirm.aspx"), $p0, this.confirmDialogWidth, this.confirmDialogHeight, $v_2, true, false, null);
            if (Mscrm.Utilities.isModalDialogSupported()) $v_0 = this.performActionAfterNavigateConfirm($v_3, $p0)
        }
        return $v_0
    },
    performActionAfterNavigateConfirm: function (returnValue, parameters) {
        var $v_0 = false;
        switch (returnValue) {
            case 0:
                $v_0 = false;
                this.$z_3 = parameters;
                this.$3R_3 = 0;
                window.setTimeout(this.$$d_saveAndNavigate, 1);
                break;
            case 1:
                this.detachCloseAlert();
                $v_0 = true;
                !IsNull(parameters["callbackForNavigate"]) && Mscrm.Utilities.executeFunctionIfModeless(parameters["callbackForNavigate"], parameters);
                break;
            case 2:
                if (!IsNull(parameters["windowClosing"]) && parameters["windowClosing"]) {
                    $v_0 = false;
                    break
                }
                $v_0 = false;
                var $v_1 = {};
                $v_1["newWindow"] = true;
                var $v_2 = Mscrm.CrmUri.create(parameters["uri"]);
                delete $v_2.get_query().pagemode;
                $v_1["uri"] = $v_2.toString();
                this.raiseEvent(Mscrm.ScriptEvents.NavigateRequest, $v_1);
                break
        }
        return $v_0
    },
    saveAndNavigate: function () {
        if (this.get_eventManager().isEventing()) {
            if (this.$3R_3 >= 1e3) {
                openErrorDlg("0x80700000", null, null, 0, 0);
                this.$z_3 = null;
                return
            }
            this.$3R_3 += 25;
            window.setTimeout(this.$$d_saveAndNavigate, 25);
            return
        }
        this.$z_3["isCommand"] = true;
        if (!IsNull(this.$z_3["windowClosing"]) && this.$z_3["windowClosing"]) this.$z_3["eventCode"] = Mscrm.ScriptEvents.NavigateClose;
        else this.$z_3["eventCode"] = Mscrm.ScriptEvents.NavigateRequest;
        var $v_0 = {};
        $v_0["data"] = this.$z_3;
        var $v_1 = this.raiseEvent(Mscrm.ScriptEvents.InsertCacheData, $v_0);
        this.$1x_3 = false;
        this.SetDeferredCmdId($v_1[0]);
        this.Save()
    },
    pagingMask: null,
    viewPrefix: null,
    firstPageToolTip: null,
    previousPageToolTip: null,
    nextPageToolTip: null,
    $34_3: null,
    get_$1h_3: function () {
        if (IsNull(this.$34_3)) this.$34_3 = this.$$d_$6j_3;
        return this.$34_3
    },
    $5G_3: function () {
        var $v_0 = document.createElement("DIV");
        $v_0.className = "ms-crm-RecordSelector-Header";
        var $v_1 = this.get_$0_3()[Mscrm.RecordSetNavigation.ViewName],
            $v_2 = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldLabel];
        $v_0.innerHTML = String.format("\r\n\t\t<div class='ms-crm-RS-Header-Title'>\r\n\t\t\t\t<nobr class='ms-crm-RS-Header-Title' title='{1}'>{0}&nbsp</nobr><nobr class='ms-crm-RS-Header-Title-Value'>{1}</nobr>\r\n\t\t</div>\r\n\t\t<div class='ms-crm-RS-Column-Title'>\r\n\t\t\t<nobr class='ms-crm-RS-Column-Title' title='{2}'>{2}</nobr>\r\n\t\t</div>\r\n\t\t", this.viewPrefix, CrmEncodeDecode.CrmHtmlAttributeEncode($v_1), CrmEncodeDecode.CrmHtmlAttributeEncode($v_2));
        $addHandler($v_0, "click", this.$$d_$4o_3);
        return $v_0
    },
    $4o_3: function ($p0) {
        $p0.stopPropagation()
    },
    $5F_3: function ($p0) {
        var $v_0 = true,
            $v_1 = true,
            $v_2 = true;
        if (!IsNull($p0)) {
            var $v_B = $p0["firstEnabled"];
            if (!IsNull($v_B)) $v_0 = $v_B;
            $v_B = $p0["previousEnabled"];
            if (!IsNull($v_B)) $v_1 = $v_B;
            $v_B = $p0["nextEnabled"];
            if (!IsNull($v_B)) $v_2 = $v_B
        }
        var $v_3 = $p0[Mscrm.RecordSetNavigation.PageNumber],
            $v_4 = String.format(this.pagingMask, $v_3),
            $v_5 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create($v_0 ? "/_imgs/grid/page_FL1.gif" : "/_imgs/grid/page_FL0.gif")),
            $v_6 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create($v_1 ? "/_imgs/grid/page_L1.gif" : "/_imgs/grid/page_L0.gif")),
            $v_7 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create($v_2 ? "/_imgs/grid/page_R1.gif" : "/_imgs/grid/page_R0.gif")),
            $v_8 = String.format("\r\n\t\t\t<div class='ms-crm-RS-Footer-Container'>\r\n\t\t\t\t<span><a page='f' title='{0}'><img class='bidi {7}' src='{1}' alt='{0}'/></a></span>\r\n\t\t\t\t<span><a page='p' title='{2}'><img class='bidi {8}' src='{3}' alt='{2}'/></a></span>\r\n\t\t\t\t<span class='ms-crm-RS-Footer-PageText'>{4}</span>\r\n\t\t\t\t<span><a page='n' title='{5}'><img class='bidi {9}' src='{6}' alt='{5}'/></a></span>\r\n\t\t\t</div>", CrmEncodeDecode.CrmHtmlAttributeEncode($v_0 ? this.firstPageToolTip : ""), CrmEncodeDecode.CrmHtmlAttributeEncode($v_5.source), CrmEncodeDecode.CrmHtmlAttributeEncode($v_1 ? this.previousPageToolTip : ""), CrmEncodeDecode.CrmHtmlAttributeEncode($v_6.source), CrmEncodeDecode.CrmHtmlAttributeEncode($v_4), CrmEncodeDecode.CrmHtmlAttributeEncode($v_2 ? this.nextPageToolTip : ""), CrmEncodeDecode.CrmHtmlAttributeEncode($v_7.source), CrmEncodeDecode.CrmHtmlAttributeEncode($v_5.cssClass), CrmEncodeDecode.CrmHtmlAttributeEncode($v_6.cssClass), CrmEncodeDecode.CrmHtmlAttributeEncode($v_7.cssClass)),
            $v_9 = document.createElement("DIV");
        $v_9.className = "ms-crm-RecordSelector-Footer";
        $v_9.innerHTML = $v_8;
        var $v_A = $v_9.getElementsByTagName("A");
        if ($v_0) {
            $v_A[0].style.cursor = "hand";
            $v_A[0].tabIndex = 0;
            $addHandler($v_A[0], "click", this.get_$1h_3());
            $addHandler($v_A[0], "keypress", this.get_$1h_3())
        }
        if ($v_1) {
            $v_A[1].style.cursor = "hand";
            $v_A[1].tabIndex = 0;
            $addHandler($v_A[1], "click", this.get_$1h_3());
            $addHandler($v_A[1], "keypress", this.get_$1h_3())
        }
        if ($v_2) {
            $v_A[2].style.cursor = "hand";
            $v_A[2].tabIndex = 0;
            $addHandler($v_A[2], "click", this.get_$1h_3());
            $addHandler($v_A[2], "keypress", this.get_$1h_3())
        }
        $addHandler($v_9, "click", this.$$d_$4o_3);
        return $v_9
    },
    getRecordSelectorContextMenu: function () {
        var $v_0 = document.createElement("div");
        $get("FormCell").appendChild($v_0);
        var $v_1 = Mscrm.Menu.createMenu($v_0);
        $v_1.set_stylePrefix(Mscrm.MenuStyles.contextMenuStylePrefix);
        var $v_2 = Mscrm.MenuItem.createMenuItem(this.openActionTitle);
        $v_2.set_reference(Mscrm.ContextMenuAction.open);
        $v_2.set_actionCallback(this.$$d_$6m_3);
        $v_1.addItem($v_2);
        if (Mscrm.NavigationMode.DefaultNavigationMode === Mscrm.NavigationMode.NavigationModeInline) {
            var $v_5 = Mscrm.MenuItem.createMenuItem(this.openInNewWindowActionTitle);
            $v_5.set_reference(Mscrm.ContextMenuAction.openInNewWindow);
            $v_5.set_actionCallback(this.$$d_$6m_3);
            $v_1.addItem($v_5)
        }
        var $v_3 = Mscrm.MenuItem.createMenuItem(this.copyShortcutActionTitle);
        $v_3.set_reference(Mscrm.ContextMenuAction.copyShortcut);
        $v_3.set_actionCallback(this.$$d_$6m_3);
        $v_3.set_disabled(!Mscrm.Utilities.get_ieBrowserVersion());
        $v_1.addItem($v_3);
        var $v_4 = Mscrm.MenuItem.createMenuItem(this.sendShortcutActionTitle);
        $v_4.set_reference(Mscrm.ContextMenuAction.sendShortcut);
        $v_4.set_actionCallback(this.$$d_$6m_3);
        $v_1.addItem($v_4);
        $v_1.set_width(200);
        return $v_1
    },
    $B_3: null,
    $2Z_3: 0,
    $2a_3: 0,
    $3h_3: false,
    $y_3: function () {
        if (this.$3h_3) return;
        this.$3h_3 = true;
        if (IsNull(Mscrm.PageManager.get_instance())) {
            this.$A_3 = false;
            return
        }
        if (!IsNull(this.get_$0_3()) && this.get_currentRecordPosition() >= 0) {
            this.$B_3 = new Array(1);
            $addHandler(document.documentElement, "keydown", this.$$d_$50_3)
        }
    },
    $50_3: function ($p0) {
        if ($p0.ctrlKey && $p0.keyCode === 190) {
            $p0.stopPropagation();
            $p0.preventDefault();
            this.nextRecord()
        }
        if ($p0.ctrlKey && $p0.keyCode === 188) {
            $p0.stopPropagation();
            $p0.preventDefault();
            this.previousRecord()
        }
        if ($p0.ctrlKey && $p0.shiftKey && $p0.keyCode === 50) {
            $p0.stopPropagation();
            this.showRecordSelector(this.$3E_3())
        }
    },
    showRecordSelector: function (parameters) {
        this.$y_3();
        this.$2Z_3 = parameters["x"];
        this.$2a_3 = parameters["y"];
        var $v_0 = this.get_$0_3()[Mscrm.FormControl.$8(0, this.get_$H_3())],
            $v_1 = this.get_$H_3(),
            $v_2 = this.$B_3[$v_1];
        if (!IsNull(parameters[Mscrm.RecordSetNavigation.PageNumber])) {
            var $v_3 = parameters[Mscrm.RecordSetNavigation.PageNumber],
                $v_4 = parameters[Mscrm.FormControl.$8(0, $v_3)];
            if (!IsNull($v_4) && $v_4.length > 0) {
                $v_1 = $v_3;
                $v_0 = parameters[Mscrm.FormControl.$8(0, $v_3)];
                $v_2 = this.$B_3[$v_1]
            }
        }
        if (IsNull($v_2)) {
            var $v_5 = this.getRecordSelectorContextMenu(),
                $v_6 = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldName],
                $v_7 = document.createElement("div");
            document.body.appendChild($v_7);
            $v_2 = Mscrm.Menu.createMenu($v_7);
            $v_2.set_launchesRight(false);
            $v_2.set_stylePrefix(Mscrm.MenuStyles.recordSelectorStylePrefix);
            $v_2.set_loadingClassName("ms-crm-VS-loadingmenu");
            for (var $v_9 = 0; $v_9 < $v_0.length; $v_9++) {
                var $v_A = $v_0[$v_9],
                    $v_B = Mscrm.MenuItem.createMenuItem($v_A[$v_6]);
                $v_B.set_iconPath(Mscrm.Utilities.getIconPath($v_A["otype"]));
                $v_A["menuitem"] = $v_B;
                var $v_C = {};
                $v_C["index"] = $v_9;
                $v_C[Mscrm.RecordSetNavigation.PageNumber] = $v_1;
                $v_B.set_reference($v_C);
                $v_B.set_actionCallback(this.$$d_$6l_3);
                $v_B.set_contextMenu($v_5);
                $v_2.addItem($v_B);
                if ($v_1 === this.get_$H_3() && $v_9 === this.get_currentRecordPosition()) {
                    $v_B.set_isSelected(true);
                    $v_2.set_activeItem($v_B)
                }
            }
            $v_2.set_hideCallback(this.$$d_$6k_3);
            $v_2.set_shiftVertical(false);
            var $v_8 = {};
            $v_8[Mscrm.RecordSetNavigation.PageNumber] = $v_1;
            if ($v_1 === 1) {
                $v_8["firstEnabled"] = false;
                $v_8["previousEnabled"] = false
            }
            if (!this.$3L_3($v_1)) $v_8["nextEnabled"] = false;
            $v_2.set_footer(this.$5F_3($v_8));
            $v_2.set_header(this.$5G_3());
            this.$B_3[$v_1] = $v_2
        }
        $v_2.set_left(this.$2Z_3);
        $v_2.set_top(this.$2a_3);
        $v_2.set_maxHeight(412);
        $v_2.set_minHeight(412);
        $v_2.set_width(260);
        this.get_$P_3() !== $v_1 && !IsNull(this.$B_3[this.get_$P_3()]) && this.$B_3[this.get_$P_3()].hide();
        this.set_$P_3($v_1);
        $v_2.show()
    },
    $6j_3: function ($p0) {
        var $v_0 = false;
        if ($p0.type === "click" && !$p0.button) $v_0 = true;
        if ($p0.type === "keypress" && ($p0.charCode === 13 || $p0.charCode === 32)) $v_0 = true;
        if (!$v_0) return;
        $p0.stopPropagation();
        $p0.preventDefault();
        var $v_1 = Mscrm.Utilities.getEventElement($p0.rawEvent, "A");
        if (!IsNull($v_1)) {
            var $v_2 = $v_1.attributes.getNamedItem("page");
            if (!IsNull($v_2)) switch ($v_2.value) {
                case "f":
                    this.$78_3();
                    break;
                case "n":
                    this.$7A_3();
                    break;
                case "p":
                    this.$7D_3();
                    break
            }
        }
    },
    $78_3: function () {
        this.$3Q_3(1)
    },
    $7D_3: function () {
        this.$3Q_3(this.get_$P_3() - 1)
    },
    $7A_3: function () {
        this.$3Q_3(this.get_$P_3() + 1)
    },
    $3Q_3: function ($p0) {
        if ($p0 <= 0) return;
        this.$y_3();
        if (!IsNull(this.$B_3[$p0])) {
            this.$B_3[this.get_$P_3()].hide();
            this.set_$P_3($p0);
            var $v_1 = this.$3E_3();
            this.$B_3[$p0].set_left($v_1["x"]);
            this.$B_3[$p0].set_top($v_1["y"]);
            this.$B_3[$p0].show();
            return
        }
        var $v_0 = this.get_$0_3()[Mscrm.FormControl.$8(0, $p0)];
        if (!IsNull($v_0)) {
            var $v_2 = {};
            $v_2["oldPageNumber"] = this.get_$H_3();
            $v_2["newPageNumber"] = $p0;
            $v_2[Mscrm.FormControl.$8(0, $p0)] = $v_0;
            $v_2[Mscrm.RecordSetNavigation.PageNumber] = $p0;
            $v_2["x"] = this.$2Z_3;
            $v_2["y"] = this.$2a_3;
            this.showRecordSelector($v_2);
            return
        }
        this.$B_3[this.get_$P_3()].set_reference($p0);
        this.$B_3[this.get_$P_3()].set_isLoading(true);
        this.$B_3[this.get_$P_3()].show(this.$$d_$7E_3)
    },
    $5U_3: function ($p0) {
        if (!IsNull($p0) && !IsNull($p0["pageType"]) && $p0["pageType"] === "entity") {
            var $v_0 = {};
            $v_0["Id"] = this.get_objectId();
            $v_0["otc"] = this.get_objectTypeCode();
            $v_0["etn"] = this.get_objectTypeName();
            $v_0["title"] = this.entityTitle;
            $v_0["entitydisplayname"] = this.entityDisplayName;
            return $v_0
        }
        return null
    },
    $5h_3: function ($p0, $p1) {
        var $v_0 = this.$5E_3($p0);
        if (!IsNull($v_0)) {
            var $v_1 = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldName];
            $v_0[$v_1] = $p1;
            var $v_2 = $v_0["menuitem"];
            if (!IsNull($v_2)) {
                var $v_3 = this.$B_3[this.get_$H_3()];
                !IsNull($v_3) && $v_3 === $v_2.get_parentMenu() && $v_2.set_title($p1)
            }
        }
    },
    $2t_3: 0,
    get_entityPermissions: function () {
        return this.$2t_3
    },
    set_entityPermissions: function (value) {
        this.$2t_3 = value;
        return value
    },
    $1v_3: null,
    get_primaryFieldName: function () {
        return this.$1v_3
    },
    set_primaryFieldName: function (value) {
        this.$1v_3 = value;
        return value
    },
    get_primaryFieldValue: function () {
        return this.getFieldValue(this.$1v_3)
    },
    get_setInitialFocus: function () {
        var $v_0 = this.get_element().getAttribute("setinitialfocus");
        return IsNull($v_0) || $v_0.toLowerCase() === "true"
    },
    set_setInitialFocus: function (value) {
        this.get_element().setAttribute("setinitialfocus", value.toString().toLowerCase());
        return value
    },
    getFieldValue: function (fieldName) {
        var $v_0 = "";
        if (fieldName === "fullname") {
            var $v_1 = this.getUnformattedValue("firstname"),
                $v_2 = "";
            if (!IsNull($v_1)) $v_2 = $v_1.toString();
            var $v_3 = this.getUnformattedValue("lastname"),
                $v_4 = "";
            if (!IsNull($v_3)) $v_4 = $v_3.toString();
            var $v_5 = this.getUnformattedValue("middlename"),
                $v_6 = "",
                $v_7 = "";
            if (!IsNull($v_5)) {
                $v_6 = $v_5.toString();
                $v_7 = $v_6.substring(0, 1)
            }
            $v_0 = Mscrm.FormControl.$59($v_2, $v_4, $v_6, $v_7)
        } else {
            var $v_8 = this.getUnformattedValue(fieldName);
            if ($v_8) if (Object.getType($v_8) === String) $v_0 = $v_8;
            else if (isArray($v_8)) {
                var $v_9 = $v_8;
                if ($v_9[0].id && $v_9[0].displayClass === "ms-crm-Lookup-Item") $v_0 = $v_9[0].name
            }
        }
        return $v_0
    },
    get_ribbonContextType: function () {
        return Mscrm.RibbonContexts.form
    },
    get_ribbonRelationshipType: function () {
        return 0
    },
    get_entityTypeCode: function () {
        return this.get_objectTypeCode()
    },
    get_entityTypeName: function () {
        return this.get_objectTypeName()
    },
    get_selectedRecordCount: function () {
        return 1
    },
    get_recordCount: function () {
        return 1
    },
    get_selectedIds: function () {
        return [this.get_objectId()]
    },
    get_allRecordIds: function () {
        return this.get_selectedIds()
    },
    get_selectedRecords: function () {
        var $v_0 = new Mscrm.EntityReference;
        $v_0.Id = this.get_objectId();
        $v_0.TypeCode = this.get_objectTypeCode();
        $v_0.TypeName = this.get_objectTypeName();
        $v_0.Name = isNullOrEmptyString(this.$1v_3) ? null : this.getUnformattedValue(this.$1v_3);
        return [$v_0]
    },
    get_allRecords: function () {
        return this.get_selectedRecords()
    },
    get_unselectedIds: function () {
        return []
    },
    get_unselectedRecords: function () {
        return []
    },
    $7E_3: function ($p0) {
        var $v_0 = $p0.get_reference();
        if ($v_0 <= 0) {
            $p0.set_reference(null);
            return
        }
        var $v_1 = {};
        $v_1["oldPageNumber"] = this.get_$H_3();
        $v_1["newPageNumber"] = $v_0;
        this.$4M_3($v_1, this.$$d_$7F_3)
    },
    $7F_3: function ($p0, $p1) {
        var $v_0 = $p1.get_reference(),
            $v_1 = $v_0["data"],
            $v_2 = $v_1["newPageNumber"],
            $v_3 = $v_1["oldPageNumber"],
            $v_4 = this.$4N_3($p0, $v_2, $v_3);
        this.$B_3[this.get_$P_3()].set_isLoading(false);
        if (!this.$B_3[this.get_$P_3()].get_isVisible()) return;
        if (!IsNull($v_4)) {
            $v_1[Mscrm.FormControl.$8(0, $v_2)] = $v_4;
            $v_1[Mscrm.RecordSetNavigation.PageNumber] = $v_2;
            $v_1["x"] = this.$2Z_3;
            $v_1["y"] = this.$2a_3;
            this.showRecordSelector($v_1)
        }
    },
    $6m_3: function ($p0) {
        var $v_0 = $p0.get_parentMenu(),
            $v_1 = $p0.get_reference();
        switch ($v_1) {
            case Mscrm.ContextMenuAction.open:
                this.$3s_3($v_0.get_contextItem(), Mscrm.NavigationMode.NavigationModeInline);
                break;
            case Mscrm.ContextMenuAction.openInNewWindow:
                this.$3s_3($v_0.get_contextItem(), Mscrm.NavigationMode.NavigationModeNewWindow);
                break;
            case Mscrm.ContextMenuAction.copyShortcut:
                this.$3t_3($v_0.get_contextItem(), false);
                break;
            case Mscrm.ContextMenuAction.sendShortcut:
                this.$3t_3($v_0.get_contextItem(), true);
                break
        }
    },
    $3s_3: function ($p0, $p1) {
        var $v_0 = $p0.get_reference(),
            $v_1 = $v_0["index"],
            $v_2 = $v_0[Mscrm.RecordSetNavigation.PageNumber];
        this.moveRecordSetTo($v_1, $v_2, $p1)
    },
    $3t_3: function ($p0, $p1) {
        var $v_0 = $p0.get_reference(),
            $v_1 = $v_0[Mscrm.RecordSetNavigation.PageNumber],
            $v_2 = $v_0["index"],
            $v_3 = this.$1d_3($v_1);
        if (IsNull($v_3) || !$v_3.length || $v_2 < 0 || $v_2 > $v_3.length) return;
        var $v_4 = $v_3[$v_2],
            $v_5 = new Mscrm.RecentlyViewedItem;
        $v_5.TypeCode = $v_4["otype"];
        $v_5.Id = $v_4["oid"];
        var $v_6 = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldName];
        $v_5.Name = $v_4[$v_6];
        Mscrm.Utilities.sendSelectedRecordsUrl($p1, [$v_5], $v_5.TypeCode, false)
    },
    $6l_3: function ($p0) {
        var $v_0 = $p0.get_reference(),
            $v_1 = $v_0["index"],
            $v_2 = $v_0[Mscrm.RecordSetNavigation.PageNumber];
        this.moveRecordSetTo($v_1, $v_2, Mscrm.NavigationMode.DefaultNavigationMode)
    },
    $5E_3: function ($p0) {
        if (isNullOrEmptyString($p0)) return null;
        for (var $v_0 = this.get_$H_3(); $v_0 > 0; $v_0--) {
            var $v_1 = this.$1d_3($v_0);
            if (IsNull($v_1) || !$v_1.length) continue;
            for (var $v_2 = 0; $v_2 < $v_1.length; ++$v_2) {
                var $v_3 = $v_1[$v_2];
                if ($v_3["oid"] === $p0) return $v_3
            }
        }
        for (var $v_4 = this.get_$H_3() + 1; this.$3L_3($v_4); $v_4++) {
            var $v_5 = this.$1d_3($v_4);
            if (IsNull($v_5) || !$v_5.length) continue;
            for (var $v_6 = 0; $v_6 < $v_5.length; ++$v_6) {
                var $v_7 = $v_5[$v_6];
                if ($v_7["oid"] === $p0) return $v_7
            }
        }
        return null
    },
    $5D_3: function ($p0, $p1, $p2) {
        while (true) {
            if ($p1 + $p2 < 0 || $p1 + $p2 >= $p0.length) break;
            var $v_0 = $p0[$p1 + $p2];
            if (!IsNull($v_0["oid"])) return $p1 + $p2;
            $p2 += $p2 > 0 ? 1 : -1
        }
        return -1
    },
    $1z_3: null,
    get_$6n_3: function () {
        if (!IsNull(this.$1z_3)) return this.$1z_3;
        if (!this.$A_3) return null;
        var $v_0 = Mscrm.Utilities.getContentUrl(this);
        this.$1z_3 = $v_0.get_query()["rskey"];
        if (IsNull(this.$1z_3)) this.$A_3 = false;
        return this.$1z_3
    },
    $w_3: null,
    get_$0_3: function () {
        if (!IsNull(this.$w_3)) return this.$w_3;
        if (!this.$A_3) return null;
        var $v_0 = {};
        $v_0["key"] = this.get_$6n_3();
        var $v_1 = this.raiseEvent(Mscrm.ScriptEvents.RetrieveCacheData, $v_0);
        this.$w_3 = $v_1[0];
        if (IsNull(this.$w_3)) this.$A_3 = false;
        else {
            var $v_2 = this.get_$H_3(),
                $v_3 = Mscrm.FormControl.$8(0, $v_2);
            if (typeof this.$w_3[$v_3] === "string") this.$w_3[$v_3] = Sys.Serialization.JavaScriptSerializer.deserialize(this.$w_3[$v_3])
        }
        return this.$w_3
    },
    $33_3: null,
    get_$6Q_3: function () {
        if (IsNull(this.$33_3)) this.$33_3 = new RegExp("<pageNum>[0-9]+</pageNum>");
        return this.$33_3
    },
    get_$H_3: function () {
        if (this.$1l_3 !== Mscrm.FormControl.$1H) return this.$1l_3;
        if (!this.$A_3) return Mscrm.FormControl.$1H;
        var $v_0 = this.get_$0_3()[Mscrm.RecordSetNavigation.PageNumber];
        if (IsNull($v_0)) this.$A_3 = false;
        this.$1l_3 = parseInt($v_0, 10);
        return this.$1l_3
    },
    get_$P_3: function () {
        if (this.$1m_3 === Mscrm.FormControl.$2d) this.$1m_3 = this.get_$H_3();
        return this.$1m_3
    },
    set_$P_3: function ($p0) {
        this.$1m_3 = $p0;
        return $p0
    },
    $1O_3: null,
    get_$1b_3: function () {
        if (!IsNull(this.$1O_3)) return this.$1O_3;
        if (!this.$A_3) return null;
        this.$1O_3 = this.get_$0_3()[Mscrm.FormControl.$8(0, this.get_$H_3())];
        if (IsNull(this.$1O_3) || !this.$1O_3.length) this.$A_3 = false;
        return this.$1O_3
    },
    $A_3: true,
    get_currentRecordPosition: function () {
        if (this.$o_3 >= Mscrm.FormControl.$1H) return this.$o_3;
        if (!this.$A_3) return Mscrm.FormControl.$1H;
        this.$y_3();
        this.$o_3 = Mscrm.FormControl.$1H;
        var $v_0 = this.get_$0_3()[Mscrm.RecordSetNavigation.RecordPosition];
        if ($v_0 >= 0 && $v_0 < this.get_$1b_3().length) {
            var $v_1 = this.get_$1b_3()[$v_0];
            if ($v_1["oid"] === this.get_objectId()) {
                this.$o_3 = $v_0;
                return this.$o_3
            }
        }
        $v_0 = 0;
        while ($v_0 < this.get_$1b_3().length) {
            var $v_2 = this.get_$1b_3()[$v_0];
            if ($v_2["oid"] === this.get_objectId()) {
                this.$o_3 = $v_0;
                break
            }
            $v_0++
        }
        return this.$o_3
    },
    $1d_3: function ($p0) {
        if (!this.$A_3) return null;
        return this.get_$0_3()[Mscrm.FormControl.$8(0, $p0)]
    },
    $3L_3: function ($p0) {
        if (!this.$A_3) return false;
        var $v_0 = false,
            $v_1 = this.get_$0_3()[Mscrm.FormControl.$8(1, $p0)];
        if (!IsNull($v_1)) $v_0 = $v_1;
        return $v_0
    },
    get_$5l_3: function () {
        return this.get_$1b_3().length - 1 > this.get_currentRecordPosition() || this.get_$3J_3()
    },
    get_$5m_3: function () {
        return this.get_currentRecordPosition() > 0 || this.get_$H_3() > 1
    },
    get_$3J_3: function () {
        return this.$3L_3(this.get_$H_3())
    },
    $16_3: null,
    get_$2Y_3: function () {
        if (IsNull(this.$16_3)) {
            var $v_0 = document.createElement("div");
            document.body.appendChild($v_0);
            this.$16_3 = Mscrm.Dialog.createDialog($v_0);
            this.$16_3.set_top(document.body.offsetHeight / 2 - 20);
            this.$16_3.set_left(document.body.offsetWidth / 2 - 30);
            this.$16_3.set_enableShadow(false);
            this.$16_3.set_isLoading(true)
        }
        return this.$16_3
    },
    moveRecordSetTo: function (position, itemPageNumber, mode) {
        if (!this.$A_3) return;
        var $v_0 = this.$1d_3(itemPageNumber);
        if (IsNull($v_0) || !$v_0.length || position < 0 || position > $v_0.length) return;
        var $v_1 = $v_0[position],
            $v_2 = $v_1["otype"],
            $v_3 = $v_1["oid"],
            $v_4 = {};
        $v_4["checkpoint"] = false;
        $v_4["sameWindow"] = true;
        this.get_$0_3()[Mscrm.RecordSetNavigation.PageNumber] = itemPageNumber;
        this.get_$0_3()[Mscrm.RecordSetNavigation.RecordPosition] = position;
        var $v_5 = Mscrm.Utilities.getContentUrl(this);
        delete $v_5.get_query().etc;
        delete $v_5.get_query().etn;
        delete $v_5.get_query().id;
        delete $v_5.get_query().preloadcache;
        var $v_6 = $find("crmFormSelector");
        if ($v_6) $v_5.get_query()["formid"] = $v_6.$n_3;
        openObj($v_2, $v_3, $v_5.get_queryString(), null, Mscrm.NavigationMode.DefaultNavigationMode, $v_4)
    },
    moveRecordSet: function (iPos, itemPageNumber) {
        if (!this.$A_3) return;
        if (this.get_currentRecordPosition() < 0) return;
        var $v_0 = this.$1d_3(itemPageNumber),
            $v_1 = this.$5D_3($v_0, this.get_currentRecordPosition(), iPos);
        if ($v_1 >= 0) {
            this.moveRecordSetTo($v_1, itemPageNumber, Mscrm.NavigationMode.DefaultNavigationMode);
            return
        }
        $v_0 = null;
        if (itemPageNumber === 1 && iPos < 0 || !this.get_$3J_3() && iPos > 0) return;
        var $v_2 = iPos > 0 && this.get_$3J_3(),
            $v_3 = itemPageNumber + ($v_2 ? 1 : -1);
        $v_0 = this.$1d_3($v_3);
        if (!IsNull($v_0) && $v_0.length > 0) {
            $v_1 = $v_2 ? 0 : $v_0.length - 1;
            $v_3 = itemPageNumber + ($v_2 ? 1 : -1);
            this.get_$0_3()[Mscrm.RecordSetNavigation.PageNumber] = $v_3;
            this.moveRecordSetTo($v_1, $v_3, Mscrm.NavigationMode.DefaultNavigationMode);
            return
        }
        var $v_4 = {};
        $v_4["iPos"] = iPos;
        $v_4["oldPageNumber"] = itemPageNumber;
        $v_4["newPageNumber"] = $v_3;
        $v_4["isNextPage"] = $v_2;
        this.$6t_3($v_4, this.$$d_$6s_3);
        return
    },
    $6s_3: function ($p0, $p1) {
        var $v_0 = $p1.get_reference(),
            $v_1 = $v_0["data"],
            $v_2 = $v_1["newPageNumber"],
            $v_3 = $v_1["oldPageNumber"],
            $v_4 = $v_1["isNextPage"],
            $v_5 = this.$4N_3($p0, $v_2, $v_3);
        if (IsNull($v_5)) return;
        if (!this.get_$2Y_3().get_isVisible()) return;
        this.get_$2Y_3().hide();
        var $v_6 = $v_3 + ($v_4 ? 1 : -1);
        this.get_$0_3()[Mscrm.RecordSetNavigation.PageNumber] = $v_3 + ($v_4 ? 1 : -1);
        var $v_7 = $v_4 ? 0 : $v_5.length - 1;
        this.moveRecordSetTo($v_7, $v_6, Mscrm.NavigationMode.DefaultNavigationMode)
    },
    $6t_3: function ($p0, $p1) {
        $p0["loadingCallback"] = $p1;
        this.get_$2Y_3().set_reference($p0);
        this.get_$2Y_3().show(this.$$d_$6u_3)
    },
    $6u_3: function ($p0) {
        var $v_0 = $p0.get_reference(),
            $v_1 = $v_0["loadingCallback"];
        this.$4M_3($v_0, $v_1)
    },
    $4M_3: function ($p0, $p1) {
        var $v_0 = $p0["oldPageNumber"],
            $v_1 = $p0["newPageNumber"],
            $v_2 = this.get_$0_3()[Mscrm.FormControl.$8(3, $v_1)];
        if (!IsNull($v_2) && !$v_2.get_aborted()) return;
        var $v_3 = {};
        $v_3["data"] = $p0;
        $v_3["callback"] = $p1;
        var $v_4 = new Mscrm.RemoteCommandXml("AppGridWebService", "Refresh");
        $v_4.set_reference($v_3);
        var $v_5 = this.get_$0_3()[Mscrm.FormControl.$8(2, $v_1 - 1)];
        if (isNullOrEmptyString($v_5)) $v_5 = this.get_$0_3()[Mscrm.FormControl.$8(2, $v_1 + 1)];
        if (isNullOrEmptyString($v_5)) $v_5 = this.get_$0_3()[Mscrm.FormControl.$8(2, $v_0)];
        $v_5 = $v_5.replace(this.get_$6Q_3(), "<pageNum>" + $v_1 + "</pageNum>");
        $v_4.setContent($v_5);
        this.get_$0_3()[Mscrm.FormControl.$8(3, $v_1)] = $v_4;
        $v_4.execute($p1)
    },
    $4N_3: function ($p0, $p1, $p2) {
        var $v_0 = null;
        if ($p0.get_success() && !IsNull($p0.get_returnValue())) {
            var $v_1 = XUI.Xml.LoadXml($p0.get_returnValue());
            if (Mscrm.NavigationMode.DefaultNavigationMode === Mscrm.NavigationMode.NavigationModeInline) this.get_$0_3()[Mscrm.FormControl.$8(4, $p1)] = $p0.get_returnValue();
            var $v_2 = document.createElement("div");
            $v_2.innerHTML = XUI.Xml.GetText(XUI.Xml.SelectSingleNode($v_1, "gridXml/gridHtml", null));
            var $v_3 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($v_2)).attributes.getNamedItem("morerecords").value === "1";
            this.get_$0_3()[Mscrm.FormControl.$8(1, $p1)] = $v_3;
            var $v_4 = new Array(1);
            $v_4[0] = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldName];
            $v_0 = Mscrm.Grid.getGridRecords(XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($v_2)), $v_4, this.get_$0_3()[Mscrm.RecordSetNavigation.LayoutXml]);
            this.get_$0_3()[Mscrm.FormControl.$8(0, $p1)] = $v_0;
            var $v_5 = XUI.Xml.LoadXml(this.get_$0_3()[Mscrm.FormControl.$8(2, $p2)]),
                $v_6 = XUI.Xml.SelectSingleNode($v_5, "grid/pagingCookie", null),
                $v_7 = XUI.Xml.SelectSingleNode($v_1, "gridXml/pagingCookie", null);
            XUI.Xml.SelectSingleNode($v_5, "grid", null).replaceChild($v_7, $v_6);
            XUI.Xml.SelectSingleNode($v_5, "grid/pageNum", null).text = $p1;
            this.get_$0_3()[Mscrm.FormControl.$8(2, $p1)] = XUI.Xml.XMLSerializer.serializeToString($v_5)
        }
        return $v_0
    },
    previousRecord: function () {
        this.$y_3();
        this.moveRecordSet(-1, this.get_$H_3())
    },
    nextRecord: function () {
        this.$y_3();
        this.moveRecordSet(1, this.get_$H_3())
    },
    recordDeleted: function () {
        if (Mscrm.NavigationMode.DefaultNavigationMode === Mscrm.NavigationMode.NavigationModeInline) {
            this.$y_3();
            if (!this.$A_3) return;
            if (this.get_currentRecordPosition() < 0) return;
            var $v_0 = this.get_$1b_3()[this.get_currentRecordPosition()];
            $v_0["otype"] = null;
            $v_0["oid"] = null
        }
    },
    recordUpdating: function () {
        this.$y_3();
        if (this.$A_3) {
            var $v_0 = this.get_$0_3()[Mscrm.RecordSetNavigation.DisplayFieldName];
            this.$5h_3(this.get_objectId(), this.getFieldValue($v_0))
        }
    },
    getUnformattedValue: function (column) {
        var $v_0 = Mscrm.FormControlInputBehavior.GetBehavior(column);
        if (!IsNull($v_0)) return $v_0.get_dataValue();
        else return null
    },
    verifyRecordPermission: function (permissionMask) {
        return (permissionMask & this.$2t_3) === permissionMask
    },
    $7J_3: function () {
        $addHandler(this.get_element(), "keypress", this.$$d_$6A_3);
        this.$Z_3 = $get(this.$38_3);
        if (IsNull(this.$Z_3)) return;
        if (this.get_formType() === 3 || this.get_formType() === 4) this.$2E_3 = false;
        this.$2h_3 = true;
        attachWindowOnBeforeUnload(this.$$d_Close, null);
        $addHandler(document, "keydown", this.$$d_$68_3);
        $addHandler(window, "resize", this.$$d_$5i_3);
        var $v_0 = this.get_$1F_3();
        if (!IsNull(window.name))!IsNull(window.frameElement) ? (window.name = window.frameElement.getAttribute("name")) : void 0;
        var $v_1 = this.get_$3x_3();
        if (!IsNull($v_1) && !IsNull($v_1.value)) this.$x_3 = $v_1.value === "true";
        if (this.$3I_3() && this.$65_3()) $v_0.value = "";
        this.add_onSave(this.$$d_$4w_3)
    },
    $7I_3: function () {
        if (!IsNull(this.$Z_3)) {
            $removeHandler(this.get_element(), "keypress", this.$$d_$6A_3);
            $removeHandler(document, "keydown", this.$$d_$68_3);
            $removeHandler(window, "resize", this.$$d_$5i_3)
        }
    },
    get_allowFormFocus: function () {
        return this.$2E_3
    },
    set_allowFormFocus: function (value) {
        this.$2E_3 = value;
        return value
    },
    get_saving: function () {
        return this.$1X_3
    },
    set_saving: function (value) {
        this.$1X_3 = value;
        return value
    },
    get_submitFormId: function () {
        return this.$38_3
    },
    set_submitFormId: function (value) {
        this.$38_3 = value;
        return value
    },
    get_noDataValue: function () {
        return 3
    },
    get_isDirty: function () {
        return this.BuildXml(false, false, false, false, true) !== 3
    },
    get_isNew: function () {
        return isNullOrEmptyString(this.get_objectId())
    },
    get_formType: function () {
        if (this.get_isDisposed()) return 0;
        var $v_0 = this.get_element().attributes.getNamedItem("formtype");
        return !IsNull($v_0) && !IsNull($v_0.value) ? parseInt($v_0.value, 10) : 0
    },
    get_objectTypeCode: function () {
        try {
            var $v_0 = this.get_$3w_3();
            if (IsNull($v_0) || isNullOrEmptyString($v_0.value)) return 0;
            else return parseInt($v_0.value, 10)
        } catch ($$e_1) {
            return 0
        }
    },
    get_objectTypeName: function () {
        try {
            var $v_0 = $get("crmFormSubmitObjectTypeName");
            return IsNull($v_0) ? null : $v_0.value
        } catch ($$e_1) {
            return null
        }
    },
    get_objectId: function () {
        try {
            var $v_0 = this.get_$1F_3();
            if (IsNull($v_0) || isNullOrEmptyString($v_0.value)) return null;
            else return $v_0.value
        } catch ($$e_1) {
            return null
        }
    },
    set_objectId: function (value) {
        var $v_0 = this.get_$1F_3();
        $v_0.value = value;
        return value
    },
    get_bypassValidation: function () {
        return this.$2f_3
    },
    set_bypassValidation: function (value) {
        this.$2f_3 = value;
        return value
    },
    get_refreshOnSave: function () {
        return this.$1x_3
    },
    set_refreshOnSave: function (value) {
        this.$1x_3 = value;
        return value
    },
    add_onSave: function (value) {
        this.get_events().addHandler("onSaveEvent", value)
    },
    remove_onSave: function (value) {
        this.get_events().removeHandler("onSaveEvent", value)
    },
    add_onClose: function (value) {
        this.get_events().addHandler("onCloseEvent", value)
    },
    remove_onClose: function (value) {
        this.get_events().removeHandler("onCloseEvent", value)
    },
    add_onFormResized: function (value) {
        this.get_events().addHandler("OnFormResized", value)
    },
    remove_onFormResized: function (value) {
        this.get_events().removeHandler("OnFormResized", value)
    },
    CheckFormDirty: function () {
        return this.BuildXml(false, this.get_isNew(), false, false, true) !== 3
    },
    Save: function () {
        return this.SubmitCrmForm(1, true, false, false, false)
    },
    SaveAndClose: function () {
        return this.SubmitCrmForm(2, true, false, true, false)
    },
    CloseRecord: function (eventCode) {
        if (IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage()) {
            closeWindow();
            return
        }
        if (IsNull(eventCode)) eventCode = Mscrm.NavigationMode.DefaultNavigationMode === Mscrm.NavigationMode.NavigationModeNewWindow ? Mscrm.ScriptEvents.NavigateClose : Mscrm.ScriptEvents.NavigateBackCheckpoint;
        this.raiseEvent(eventCode, null)
    },
    ShowAppNav: function () {
        if (IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage()) return;
        var $v_0 = {};
        $v_0["mode"] = "float";
        $v_0["activeElement"] = window.document.activeElement;
        this.raiseEvent(Mscrm.ScriptEvents.ShowAppNav, $v_0)
    },
    IsValid: function (bypassValidateOwner) {
        if (this.$2f_3) return true;
        var $v_0 = window.document.activeElement;
        if ($v_0.tagName.toUpperCase() === "IFRAME" && Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Email-Body")) {
            while ($v_0.tagName.toUpperCase() !== "TABLE" || !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Email-Body")) {
                $v_0 = $v_0.parentNode;
                if ($v_0 === this.get_element()) {
                    $v_0 = null;
                    break
                }
            }
            if (!IsNull($v_0)) {
                var $v_5 = Mscrm.FormControlInputBehavior.GetBehavior($v_0.id);
                $v_5.updateMessageBody()
            }
        }
        try {
            window.focus()
        } catch ($$e_4) {
            return false
        }
        var $v_2 = this.$3D_3();
        if (!IsNull($v_2)) return $v_2.validateForSave();
        for (var $v_3 = null, $v_4 = this.get_element().getElementsByTagName("*"), $v_6 = 0, $v_7 = $v_4.length; $v_6 < $v_7; $v_6++) {
            $v_3 = $v_4[$v_6];
            switch ($v_3.tagName.toUpperCase()) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                case "TABLE":
                case "DIV":
                case "SPAN":
                case "IMG":
                case "IFRAME":
                    if ($v_3.id === "ownerid" && bypassValidateOwner) continue;
                    if (!this.$4B_3($v_3, false)) return false;
                    break
            }
        }
        return true
    },
    SubmitCrmForm: function (mode, checkValid, forceSubmit, close, buildFullXml) {
        if (this.$1X_3) return false;
        if (IsNull(buildFullXml)) buildFullXml = false;
        this.$6p_3(mode);
        var $v_0;
        if (this.IsValid(false) && this.fireSaveEvent(mode)) {
            var $v_1 = this.get_$1F_3();
            $v_0 = this.BuildXml(false, !isNullOrEmptyString($v_1.value), buildFullXml, false, false);
            if ($v_0 === 1 || $v_0 === 3 && forceSubmit) {
                var $v_2 = this.get_$4i_3();
                $v_2.value = mode;
                var $v_3 = this.get_$3x_3();
                if (!IsNull($v_3)) $v_3.value = this.$x_3 ? "true" : "false";
                var $v_4 = this.get_$3C_3();
                if (forceSubmit || !IsNull($v_4) && !isNullOrEmptyString($v_4.value)) {
                    this.$7H_3();
                    return true
                }
            }
            $v_0 === 3 && close && this.CloseRecord(null);
            if ($v_0 === 2) return false
        } else return false;
        return undefined
    },
    Close: function (eventData) {
        var $v_0 = eventData.rawEvent;
        if (!this.IsReadyToClose()) {
            $v_0.returnValue = window.LOCID_FORMS_SAVE_CONFIRM_TITLE;
            return window.LOCID_FORMS_SAVE_CONFIRM_TITLE
        }
    },
    IsReadyToClose: function () {
        if (!this.$1X_3) {
            try {
                window.focus()
            } catch ($$e_0) {
                return false
            }
            var $v_0 = this.$4t_3();
            if (!IsNull($v_0) && !$v_0 || this.BuildXml(false, true, false, false, true) !== 3) return false
        }
        return true
    },
    detachCloseAlert: function () {
        this.$2h_3 = false;
        detachWindowOnBeforeUnload(this.$$d_Close, null)
    },
    RunReport: function (instance, name, reportType, helpId) {
        var $v_0 = Mscrm.WindowInformation.getWindowInformation(Mscrm.EntityTypeCode.Report);
        if (instance) {
            var $v_1 = Mscrm.CrmUri.create($v_0.Url.toString()),
                $v_2 = $v_1.get_query();
            $v_2["action"] = "run";
            $v_2["id"] = name;
            $v_2["context"] = "records";
            $v_2["recordstype"] = this.get_objectTypeCode();
            $v_2["records"] = this.get_objectId();
            $v_2["helpID"] = helpId;
            openStdWin($v_1, buildWinName(), $v_0.Width, $v_0.Height, null)
        } else Mscrm.ReportUtil.viewReport(reportType, name, helpId, "run", null)
    },
    $4C_3: function ($p0) {
        var $v_0 = $p0.attributes.getNamedItem("disabled");
        return !IsNull($v_0) && (Boolean.parse($v_0.value) || $v_0.value === "disabled")
    },
    $3r_3: function ($p0) {
        if (IsNull($p0)) return false;
        for (var $v_0 = 0, $v_1 = $p0.length; $v_0 < $v_1; $v_0++) {
            var $v_2 = $p0[$v_0],
                $v_3 = $get("_prevPageImg", $v_2),
                $v_4 = $get("_nextPageImg", $v_2);
            if (!IsNull($v_3) && !this.$4C_3($v_3) || !IsNull($v_4) && !this.$4C_3($v_4)) return true
        }
        return false
    },
    Print: function () {
        if (this.get_isDirty()) alert(window.LOCID_FORM_PRINT_DIRTY_MESSAGE);
        else {
            var $v_0 = this.$3r_3(Mscrm.Utilities.getChildElementsByClassName(this.get_element(), "ms-crm-Form-SubGrid-Layout", false));
            if (!$v_0) $v_0 = this.$3r_3(Mscrm.Utilities.getChildElementsByClassName(this.get_element(), "ms-crm-Form-SubGrid-Layout-Selected", false));
            var $v_1 = 0;
            if ($v_0) {
                var $v_8 = Mscrm.CrmUri.create("/_grid/print/print_dlg.aspx");
                $v_8.get_query()["printform"] = "true";
                $v_1 = openStdDlg($v_8, null, parseInt(window.LOCID_PRINT_WINDOW_WIDTH, 10), parseInt(window.LOCID_PRINT_WINDOW_HEIGHT, 10));
                if (IsNull($v_1) || $v_1 === -1) return
            }
            var $v_2 = this.get_$1F_3(),
                $v_3 = $v_2.value,
                $v_4 = Mscrm.CrmUri.create("/_forms/print/print.aspx"),
                $v_5 = this.get_$3w_3(),
                $v_6 = $v_4.get_query();
            $v_6["objectType"] = $v_5.value;
            $v_6["id"] = $v_3;
            $v_6["title"] = window.parent.document.title;
            $v_6["allsubgridspages"] = $v_1 === 1;
            var $v_7 = $find("crmFormSelector");
            if (!IsNull($v_7)) $v_6["formid"] = $v_7.$n_3;
            openStdWin($v_4, "print" + buildWinName($v_3), 0, 0, null)
        }
    },
    BuildXml: function (validate, close, buildFullXml, validateForWorkflow, isDirtyCheck) {
        if (IsNull(this.$Z_3)) return 3;
        Mscrm.Utilities.syncInitAllControls();
        var $v_0 = this.get_$1F_3(),
            $v_1 = isNullOrEmptyString($v_0.value),
            $v_2 = this.$3D_3();
        if (!validateForWorkflow && !IsNull($v_2) && Mscrm.FormDataEntity.isInstanceOfType($v_2)) {
            if (validate && !$v_2.validateForSave()) return 2;
            var $v_9 = $v_1 && !close ? 0 : 1;
            if (!$v_1 && !! buildFullXml) $v_9 = 2;
            if (!this.$x_3 && $v_9 !== 1 && $v_2.hasDataToSerialize(1)) this.$x_3 = true;
            if ($v_2.hasDataToSerialize($v_9)) {
                if (!this.$x_3 && $v_9 === 1) this.$x_3 = true;
                if (!isDirtyCheck) {
                    var $v_A = this.get_$3C_3();
                    $v_A.value = $v_2.serialize($v_9)
                }
                if (!this.$3I_3() && $v_1 && window.initialFormXml === $v_2.serialize($v_9)) return 3;
                return 1
            } else if (isDirtyCheck) return this.$48_3() ? 1 : 3;
            else return 3
        }
        var $v_3, $v_4 = this.get_element().getElementsByTagName("*"),
            $v_5 = "",
            $v_6 = "",
            $v_7 = false,
            $v_8 = false;
        if (!IsNull(validateForWorkflow) && validateForWorkflow) $v_8 = true;
        for (var $v_B = 0, $v_C = $v_4.length; $v_B < $v_C; $v_B++) {
            $v_3 = $v_4[$v_B];
            var $v_D = Mscrm.FormControlInputBehavior.GetBehavior($v_3.id);
            switch ($v_3.tagName.toUpperCase()) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                case "TABLE":
                case "DIV":
                case "SPAN":
                case "IMG":
                case "IFRAME":
                    if (validate && !this.$4B_3($v_3, $v_8)) return 2;
                    var $v_E;
                    if ($v_3.className === "ms-crm-Email-Body" && !IsNull(isDirtyCheck) && isDirtyCheck) {
                        var $v_H = Mscrm.FormControlInputBehavior.GetElementBehavior($v_3);
                        $v_E = IsNull($v_H) ? null : $v_H.get_dataXmlUnEncoded()
                    } else if (!IsNull($v_D)) $v_E = $v_D.get_dataXml();
                    else $v_E = $v_3.DataXml;
                    var $v_F;
                    if (Sys.UI.DomElement.containsCssClass($v_3, "ms-crm-Lookup") && !IsNull($v_D) && !IsNull($v_D.get_dataValue()) && !IsNull(isDirtyCheck) && isDirtyCheck) $v_F = $v_D.get_dataValue();
                    else if (!IsNull($v_D)) $v_F = $v_D.get_dataValue();
                    else $v_F = $v_3.DataValue;
                    var $v_G = IsNull($v_D) ? Mscrm.FormControlInputBehavior.GetBehavior($v_3.id) : $v_D;
                    if ($v_3.tagName.toUpperCase() === "IMG" && ($v_3.IsDirty || !IsNull($v_G) && $v_G.get_isDirty()) && IsNull($v_F)) $v_F = "";
                    if ($v_3.id !== "chkAll" && !IsNull($v_E)) {
                        var $v_I = false,
                            $v_J = false,
                            $v_K = Mscrm.FormUtility.getSlugControl($v_3);
                        if (!IsNull($v_K) && $v_K.get_isDataSlug()) {
                            $v_E = $v_K.get_slugValue();
                            $v_I = true;
                            $v_J = $v_K.get_isSlugDirty()
                        }
                        var $v_L = !IsNull($v_D) ? $v_D.get_isDirty() : $v_3.IsDirty,
                            $v_M = !IsNull($v_D) ? $v_D.get_disabled() : $v_3.Disabled,
                            $v_N = !IsNull($v_D) ? $v_D.get_forceSubmit() : $v_3.ForceSubmit,
                            $v_O = !IsNull($v_D) ? $v_D.get_doNotSubmit() : $v_3.DoNotSubmit;
                        if ($v_L || $v_I && $v_J) this.$x_3 = true;
                        if ($v_N) {
                            if ($v_L || $v_I && $v_J) $v_7 = true;
                            $v_6 += $v_E
                        } else {
                            var $v_P = window._dirtyProperties;
                            if (!$v_O && ($v_1 && (!IsNull($v_F) || $v_I) && !(close && !$v_L && !($v_I && $v_J)) || !$v_1 && ($v_L || !IsNull($v_P) && $v_P[$v_3.id] === $v_3.id || $v_I && $v_J || buildFullXml) && !$v_M)) $v_5 += $v_E;
                            else if (!$v_O && this.$3I_3() && this.$x_3 && !IsNull($v_F) && !$v_M) $v_5 += $v_E
                        }
                    }
                    break
            }
        }
        if (IsNull(isDirtyCheck) || !isDirtyCheck) {
            var $v_Q = this.get_$3v_3(),
                $v_R = $v_Q.value,
                $v_S = this.$5C_3(),
                $v_T = $v_5 + $v_6,
                $v_U = this.get_$3C_3();
            if ($v_T.length > 0 && $v_S.length > 0) {
                for (var $v_V = XUI.Xml.LoadXml("<changes>" + $v_T + "</changes>"), $v_W = XUI.Xml.LoadXml("<mapped>" + $v_S + "</mapped>"), $v_X = XUI.Xml.SelectNodes($v_V.documentElement, "*", null), $v_Z = 0, $v_a = $v_X.length; $v_Z < $v_a; $v_Z++) {
                    var $v_b = $v_X[$v_Z];
                    if ($v_b.nodeType === 1) {
                        var $v_c = XUI.Xml.SelectNodes($v_W.firstChild, $v_b.nodeName, null);
                        !IsNull($v_c) && $v_c.length > 0 && $v_W.firstChild.removeChild($v_c[0])
                    }
                }
                var $v_Y = XUI.Xml.XMLSerializer.serializeToString($v_W).replace("<mapped>", "");
                $v_Y = $v_Y.replace("</mapped>", "");
                $v_U.value = String.format("<{0}>{1}</{0}>", CrmEncodeDecode.CrmXmlEncode($v_R), $v_T + $v_Y)
            } else $v_U.value = String.format("<{0}>{1}</{0}>", CrmEncodeDecode.CrmXmlEncode($v_R), $v_T + $v_S)
        }
        if ($v_5.length > 0 || $v_7) return 1;
        else return 3
    },
    GetControl: function (id) {
        return $get(id)
    },
    GetViewportHeight: function () {
        var $v_0 = this.get_element().parentNode.parentNode.parentNode,
            $v_1;
        $v_1 = $v_0.offsetHeight - 35;
        return $v_1
    },
    GetViewportWidth: function () {
        var $v_0 = this.get_element().parentNode;
        return $v_0.offsetWidth
    },
    SetFieldReqLevel: function (field, required) {
        var $v_0 = $get(field);
        if (IsNull($v_0)) return;
        this.$4O_3($v_0, required)
    },
    SetAllFieldsToNonReqLevel: function () {
        for (var $v_0 = this.get_element().getElementsByTagName("*"), $v_1 = 0, $v_2 = $v_0.length; $v_1 < $v_2; $v_1++) {
            var $v_3 = $v_0[$v_1];
            switch ($v_3.tagName.toUpperCase()) {
                case "INPUT":
                case "SELECT":
                case "TEXTAREA":
                case "TABLE":
                case "DIV":
                case "SPAN":
                case "IMG":
                case "IFRAME":
                    !isNullOrEmptyString($v_3.id) && this.$4O_3($v_3, false);
                    break
            }
        }
    },
    displayMissingValue: function (fieldName) {
        alert(String.format(window.LOCID_FORM_PROIVE_VALUE_MASK, fieldName))
    },
    GetTab: function (control, makeVisible) {
        var $v_0 = control;
        while (!IsNull($v_0) && $v_0.className !== "ms-crm-Tab" && $v_0.className !== "ms-crm-InlineTab" && $v_0 !== this.get_element()) $v_0 = $v_0.parentNode;
        makeVisible && !IsNull($v_0) && $v_0 !== this.get_element() && !this.$2g_3 && this.$6D_3($v_0);
        return $v_0
    },
    GetLabel: function (control) {
        var $v_0 = this.GetLabelControl(control);
        return !IsNull($v_0) ? Mscrm.Utilities.getNonHiddenInnerText($v_0) : control.id
    },
    GetLabelControl: function (control) {
        var $v_0 = $get(control.id + "_c");
        return !IsNull($v_0) ? XUI.Html.DomUtils.GetFirstChild($v_0) : null
    },
    SetLabel: function (control, label) {
        var $v_0 = this.GetLabelControl(control);
        if (!IsNull($v_0)) {
            var $v_1 = XUI.Html.DomUtils.GetFirstChild($v_0);
            if ($v_1.setAttribute) $v_1.setAttribute("data", label);
            else $v_1.data = label;
            return true
        }
        return false
    },
    HideField: function (control) {
        var $v_0 = this.GetLabelControl(control);
        $v_0.parentNode.parentNode.style.display = "none"
    },
    VerifyFieldIsSet: function (field, errorMessage) {
        var $v_0 = this.GetControl(field),
            $v_1 = Mscrm.FormControlInputBehavior.GetBehavior($v_0.id),
            $v_2 = $v_1.get_dataValue();
        if (isNullOrEmptyString($v_2)) {
            !IsNull(errorMessage) && alert(errorMessage);
            return false
        }
        return true
    },
    SetDeferredCmdId: function (cmdId) {
        var $v_0 = this.get_$3B_3();
        $v_0.value = cmdId
    },
    CloseAlertAttached: function () {
        return this.$2h_3
    },
    SetViewportTabSection: function (type, id, isViewport) {
        var $v_0;
        if (type === "tab") $v_0 = this.$25_3;
        else if (type === "section") $v_0 = this.$1E_3;
        else return;
        if (isViewport) {
            for (var $v_1 = $v_0.length, $v_2 = 0; $v_2 < $v_1; $v_2++) if ($v_0[$v_2] === id) return;
            $v_0[$v_1] = id
        } else for (var $v_3 = $v_0.length, $v_4 = 0; $v_4 < $v_3; $v_4++) if ($v_0[$v_4] === id) $v_0[$v_4] = null
    },
    ModifyMinimumTabHeight: function (height, tabId) {
        var $v_0 = this.$1V_3[tabId];
        if (!IsNull($v_0)) {
            var $v_1 = $v_0 + height;
            if ($v_1 >= 0) this.$1V_3[tabId] = $v_1
        }
    },
    HandleResize: function () {
        var $v_0 = window.document.readyState;
        if (!IsNull($v_0) && $v_0 !== "complete") {
            var $v_1 = this,
                $$t_2 = this;
            window.setTimeout(function () {
                $v_1.HandleResize()
            }, 10)
        } else executeFunctionDeferred(this.$$d_$4K_3, false, false)
    },
    $2z_3: false,
    get_isResizeFormComplete: function () {
        return this.$2z_3
    },
    $4K_3: function () {
        if (this.get_isDisposed()) return;
        this.$2z_3 = false;
        this.$4U_3();
        this.$4T_3();
        this.fireControlEvent("OnFormResized", null);
        this.$2z_3 = true
    },
    setFirstElementFocus: function () {
        if (this.$2E_3 && this.get_setInitialFocus() && !this.$48_3()) {
            window.focus();
            if (!IsNull(this.get_$k_3())) {
                var $v_0 = this.$41_3(false);
                if (IsNull($v_0)) $v_0 = this.$41_3(true);
                if (IsNull($v_0)) {
                    var $$t_5 = this;
                    $v_0 = this.get_$k_3().controls.getFirst(function ($p1_0, $p1_1) {
                        return $p1_0.getDisabled && !$p1_0.getDisabled() && $p1_0.getAttribute && $p1_0.getAttribute()
                    })
                }
                if (!IsNull($v_0)) {
                    this.$2r_3 = true;
                    try {
                        $v_0.setFocus()
                    } catch ($$e_1) {}
                    this.$2r_3 = false
                }
            } else {
                var $v_1 = $get("tab0");
                if (!IsNull($v_1) && Sys.UI.DomElement.containsCssClass($v_1, "ms-crm-InlineTab")) {
                    this.$6z_3($v_1);
                    Mscrm.Form.resetFormToVisibleArea()
                }
            }
        }
    },
    get_$k_3: function () {
        return Xrm.Page.ui
    },
    get_$3B_3: function () {
        if (IsNull(this.$2i_3)) this.$2i_3 = $get("crmCmdId");
        return this.$2i_3
    },
    get_$3C_3: function () {
        if (IsNull(this.$2o_3)) this.$2o_3 = $get("crmFormSubmitXml");
        return this.$2o_3
    },
    get_$4i_3: function () {
        if (IsNull(this.$2m_3)) this.$2m_3 = $get("crmFormSubmitMode");
        return this.$2m_3
    },
    get_$3x_3: function () {
        if (IsNull(this.$2p_3)) this.$2p_3 = $get("crmFormUserModified");
        return this.$2p_3
    },
    get_$1F_3: function () {
        if (IsNull(this.$2l_3)) this.$2l_3 = $get("crmFormSubmitId");
        return this.$2l_3
    },
    get_$3w_3: function () {
        if (IsNull(this.$2n_3)) this.$2n_3 = $get("crmFormSubmitObjectType");
        return this.$2n_3
    },
    get_$3v_3: function () {
        if (IsNull(this.$2k_3)) this.$2k_3 = $get("crmFormRootElem");
        return this.$2k_3
    },
    $5i_3: function ($p0) {
        this.HandleResize()
    },
    $6A_3: function ($p0) {
        $p0.keyCode === 13 && $p0.target.tagName.toUpperCase() === "INPUT" && $p0.target.getAttribute("type").toLowerCase() === "text" && $p0.preventDefault()
    },
    $68_3: function ($p0) {
        switch ($p0.keyCode) {
            case 27:
                this.CloseRecord();
                return;
            case 70:
                if ($p0.ctrlKey && $p0.shiftKey) {
                    var $v_0 = $find("RelatedInformationPane");
                    !IsNull($v_0) && $v_0.ToggleInformationPane($p0);
                    return
                }
                break;
            case 123:
                if ($p0.shiftKey) {
                    this.Save();
                    return
                }
                break;
            case 54:
                if ($p0.ctrlKey) {
                    this.ShowAppNav();
                    return
                }
                break;
            case 83:
                if ($p0.ctrlKey) {
                    if ($p0.altKey) return;
                    document.activeElement.blur();
                    document.activeElement.focus();
                    if ($p0.shiftKey) {
                        var $v_1 = window._saveAndNewEnabled;
                        if (!IsNull($v_1)) $v_1 && this.SubmitCrmForm(59, true, true, false, false);
                        else {
                            var $v_2 = this.get_$3v_3(),
                                $v_3 = $v_2.value,
                                $v_4 = "Mscrm.Form." + $v_3 + ".SaveAndNew",
                                $v_5 = $v_3 + "|NoRelationship|Form|Mscrm.SaveAndNewPrimary";
                            isRibbonControlEnabled($v_5, $v_4) && executeRibbonCommand($v_5)
                        }
                    } else {
                        this.Save();
                        $p0.preventDefault()
                    }
                    return
                } else if ($p0.altKey) {
                    document.activeElement.blur();
                    document.activeElement.focus();
                    this.SaveAndClose();
                    $p0.preventDefault();
                    return
                }
                break;
            case 68:
                if ($p0.ctrlKey && window._deleteActionEnabled) {
                    !this.get_isNew() && Mscrm.FormAction.onActionMenuClick("delete", this.get_objectTypeCode());
                    return
                }
                break
        }
    },
    $4w_3: function ($p0, $p1) {
        var $v_0 = this.$3D_3();
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.fireOnSave($p1);
            !$v_1 && $p1.preventDefault()
        }
    },
    $4t_3: function () {
        var $v_0 = this.get_events().getHandler("onCloseEvent"),
            $v_1 = new Mscrm.FormCloseEventArgs;
        !IsNull($v_0) && $v_0(this, $v_1);
        return !$v_1.isDefaultPrevented()
    },
    fireSaveEvent: function (mode) {
        var $v_0 = $get("crmForm");
        if (!IsNull($v_0)) {
            var $v_1 = true;
            $v_1 = $v_0.IsHtc;
            if (!IsNull($v_1)) return this.$4y_3(mode)
        }
        return this.$4x_3(mode)
    },
    $4x_3: function ($p0) {
        var $v_0 = this.get_events().getHandler("onSaveEvent"),
            $v_1 = new Mscrm.EntitySaveEventArgs($p0);
        !IsNull($v_0) && $v_0(this, $v_1);
        return !$v_1.isDefaultPrevented()
    },
    $4y_3: function ($p0) {
        var $v_0 = $get("crmForm"),
            $v_1 = this.$$d_$6v_3;
        $v_0.attachEvent("onsave", $v_1);
        var $v_2 = true;
        $v_2 = $v_0.fireSaveEvent($p0);
        $v_0.detachEvent("onsave", $v_1);
        return $v_2
    },
    $6v_3: function () {
        var $v_0 = this.get_events().getHandler("onSaveEvent"),
            $v_1 = 0;
        $v_1 = window.event.Mode;
        var $v_2 = new Mscrm.EntitySaveEventArgs($v_1);
        !IsNull($v_0) && $v_0(this, $v_2);
        if ($v_2.isDefaultPrevented()) window.event.returnValue = false
    },
    $3D_3: function () {
        var $v_0 = $find("PrimaryEntity");
        return !IsNull($v_0) ? $v_0 : null
    },
    $4U_3: function () {
        this.$4f_3();
        (IsNull(this.$1E_3) || IsNull(this.$1E_3[0]) && IsNull(this.$18_3) || IsNull(this.$18_3[0])) && this.$3q_3();
        for (var $v_0 = 0, $v_1 = this.$1E_3.length; $v_0 < $v_1; $v_0++) {
            var $v_2 = this.$1E_3[$v_0];
            if (IsNull($v_2)) continue;
            var $v_3 = this.GetControl($v_2);
            if (IsNull($v_3)) continue;
            var $v_4 = this.GetTab($v_3, false);
            if (!$v_4.offsetHeight || !$v_3.offsetHeight) {
                var $v_6 = $find($v_4.id);
                if (!IsNull($v_6) && $v_6.getWrapper().getDisplayState() === "collapsed") {
                    $v_6.add_tabStateChange(this.$$d_$5W_3);
                    continue
                }
            }
            var $v_5 = Mscrm.FormUISection.$43($v_3.id);
            if (IsNull(this.$1U_3[$v_2])) {
                this.$1U_3[$v_2] = $v_3.offsetHeight;
                this.$1V_3[$v_4.id] = $v_4.offsetHeight
            }
            if (this.$2R_3 < this.$1V_3[$v_4.id]) {
                if (parseInt($v_3.style.height, 10) !== this.$1U_3[$v_2]) {
                    $v_5.$4J_4();
                    $v_3.style.height = this.$1U_3[$v_2] + "px";
                    $v_5.$3M_4()
                }
                continue
            } else {
                var $v_7 = this.$1U_3[$v_2] + this.$2R_3 - this.$1V_3[$v_4.id];
                $v_5.$4J_4();
                $v_3.style.height = $v_7 + "px";
                $v_5.$3M_4()
            }
        }
        for (var $v_8 = 0, $v_9 = this.$25_3.length; $v_8 < $v_9; $v_8++) {
            var $v_A = this.$25_3[$v_8];
            if (IsNull($v_A)) continue;
            var $v_B = this.GetControl($v_A);
            if (IsNull($v_B)) continue;
            if (!$v_B.offsetHeight) continue;
            var $v_C = XUI.Html.DomUtils.GetChildElementAt($v_B, 1);
            if (!IsNull($v_C)) {
                if (!$v_C.offsetHeight) continue;
                var $v_D = this.$2R_3 - XUI.Html.DomUtils.GetFirstChild($v_B).offsetHeight,
                    $v_E = parseInt($v_C.style.height.replace("px", "").trim(), 10);
                if ($v_E !== $v_D && $v_D > 0) $v_C.style.height = $v_D + "px"
            }
        }
    },
    $4T_3: function ($p0) {
        for (var $v_0 = [], $v_1 = 0; $v_1 < this.$18_3.length; $v_1++) {
            var $v_2 = this.$18_3[$v_1];
            if (IsNull($v_2)) continue;
            var $v_3 = this.GetControl($v_2);
            if (IsNull($v_3)) continue;
            var $v_4 = this.GetTab($v_3, false);
            if (!isNullOrEmptyString($p0) && $p0 !== $v_4.id) continue;
            if (!$v_4.offsetHeight || !$v_3.offsetHeight) {
                if (Array.contains($v_0, $v_4.id)) continue;
                var $v_6 = $find($v_4.id);
                if (!IsNull($v_6) && $v_6.getWrapper().getDisplayState() === "collapsed") {
                    Array.add($v_0, $v_4.id);
                    $v_6.add_tabStateChange(this.$$d_$5V_3);
                    continue
                }
            }
            var $v_5 = Mscrm.FormUISection.$43(this.$18_3[$v_1]);
            !IsNull($v_5) && $v_5.$3M_4()
        }
    },
    $4f_3: function () {
        this.$2R_3 = this.GetViewportHeight()
    },
    $5W_3: function ($p0, $p1) {
        var $v_0 = $p1,
            $v_1 = $p0;
        if ($v_0.$1n_1 === "expanded") {
            this.$4U_3();
            $v_1.remove_tabStateChange(this.$$d_$5W_3)
        }
    },
    $5V_3: function ($p0, $p1) {
        var $v_0 = $p1,
            $v_1 = $p0._control;
        if ($v_0.$1n_1 === "expanded") {
            this.$4T_3($v_1.get_id());
            $p0.remove_tabStateChange(this.$$d_$5V_3)
        }
    },
    $55_3: function () {
        var $v_0 = window.document.getElementById("crmFormTabContainer");
        if (IsNull($v_0)) return;
        var $v_1 = 0,
            $$t_3 = this;
        XUI.Xml.DomUtils.ForEachChild($v_0, function ($p1_0) {
            if ($p1_0.className === "ms-crm-InlineTab") if ($p1_0.getAttribute("IsViewportTab") === "1") $$t_3.$25_3[$v_1++] = $p1_0.id;
            return false
        })
    },
    $3q_3: function () {
        var $v_0 = window.document.documentElement.getElementsByTagName("TABLE"),
            $v_1 = 0,
            $v_2 = 0;
        if (!IsNull($v_0)) for (var $v_3 = 0, $v_4 = $v_0.length; $v_3 < $v_4; $v_3++) {
            var $v_5 = $v_0[$v_3],
                $v_6 = $v_5.getAttribute("IsViewportSection");
            if (IsNull($v_6)) continue;
            if ($v_6 === "1") this.$1E_3[$v_1++] = $v_5.id;
            else this.$18_3[$v_2++] = $v_5.id
        }
    },
    $65_3: function () {
        if (typeof _appFormErrorOnNewPage !== Mscrm.TypeNames.undefinedType) {
            var $v_0 = _appFormErrorOnNewPage;
            return !IsNull($v_0) && $v_0
        } else return false
    },
    $3I_3: function () {
        if (typeof _appFormErrorOnPage !== Mscrm.TypeNames.undefinedType) {
            var $v_0 = _appFormErrorOnPage;
            return !IsNull($v_0) && $v_0
        } else return false
    },
    $41_3: function ($p0) {
        for (var $$t_D = this, $v_0 = function ($p1_0, $p1_1) {
            return $p1_0.getVisible() && $p1_0.getDisabled && !$p1_0.getDisabled() && $p1_0.getAttribute && $p1_0.getAttribute()
        }, $v_1 = null, $v_2 = this.get_$k_3().tabs, $v_3 = $v_2.getLength(), $v_4 = 0; $v_4 < $v_3 && IsNull($v_1); $v_4++) {
            var $v_5 = $v_2.get($v_4);
            if ($v_5.getVisible() && ($p0 || $v_5.getDisplayState() === "expanded")) for (var $v_6 = $v_5.sections, $v_7 = $v_6.getLength(), $v_8 = 0; $v_8 < $v_7 && IsNull($v_1); $v_8++) {
                var $v_9 = $v_6.get($v_8);
                if ($v_9.getVisible()) $v_1 = $v_9.controls.getFirst($v_0)
            }
        }
        return $v_1
    },
    $6z_3: function ($p0) {
        for (var $v_0 = $p0.getElementsByTagName("*"), $v_1 = 0, $v_2 = $v_0.length; $v_1 < $v_2; $v_1++) {
            var $v_3 = $v_0[$v_1],
                $v_4 = Mscrm.FormControlInputBehavior.GetBehavior($v_3.id);
            if (!IsNull($v_4)) $v_4 = null;
            if ($v_3.tagName.toUpperCase() === "INPUT" && $v_3.getAttribute("type") === "hidden") continue;
            var $v_5 = !IsNull($v_4) ? $v_4.get_dataValue() : $v_3.DataValue,
                $v_6 = !IsNull($v_4) ? $v_4.get_disabled() : $v_3.Disabled;
            if (this.get_setInitialFocus() && typeof $v_5 !== Mscrm.TypeNames.undefinedType && !$v_6) {
                try {
                    if (!IsNull($v_4) && !Type.parse("Mscrm.IUIControl").isImplementedBy($v_4)) $v_4.setFocus();
                    else $v_3.SetFocus()
                } catch ($$e_8) {}
                return
            }
        }
        this.set_setInitialFocus(false)
    },
    $2b_3: function ($p0) {
        if (IsNull(Mscrm.PageManager.get_instance()) || !Mscrm.PageManager.isFlatUIPage()) return;
        var $v_0 = {}, $v_1 = null,
            $v_2 = this.get_$3B_3();
        if (!isNullOrEmptyString($v_2.value)) {
            var $v_5 = {};
            $v_5["key"] = $v_2.value;
            var $v_6 = this.raiseEvent(Mscrm.ScriptEvents.RetrieveCacheData, $v_5);
            if (!IsNull($v_6) && $v_6.length === 1) {
                $v_0 = $v_6[0];
                $v_1 = $v_2.value
            }
        }
        $v_0["etc"] = this.get_objectTypeCode();
        var $v_3 = Mscrm.Utilities.getContentUrl(this),
            $v_4 = $v_3.get_query();
        $v_0["_CreateFromId"] = $v_4["_CreateFromId"];
        $v_0["_CreateFromType"] = $v_4["_CreateFromType"];
        $v_0["pId"] = $v_4["pId"];
        $v_0["pName"] = $v_4["pName"];
        $v_0["pType"] = $v_4["pType"];
        $v_0["etn"] = this.get_objectTypeName();
        $v_0["action"] = $p0;
        $v_0["handlerId"] = "RecordUpdated";
        $v_0["isNew"] = this.get_isNew();
        try {
            $v_0["title"] = this.get_primaryFieldValue();
            $v_0["entitydisplayname"] = this.entityDisplayName;
            var $v_7 = this.get_$1F_3();
            $v_0["id"] = $v_7.value
        } catch ($$e_9) {}
        $v_0["refreshOnSave"] = this.$1x_3;
        if (this.$1x_3) {
            var $v_8 = Mscrm.CrmUri.create(window.location.href);
            delete $v_8.get_query().preloadcache;
            this.$Z_3.setAttribute("action", $v_8.toString());
            $v_0["uri"] = $v_8.toString()
        }
        if (IsNull($v_1)) {
            var $v_9 = {};
            $v_9["data"] = $v_0;
            var $v_A = this.raiseEvent(Mscrm.ScriptEvents.InsertCacheData, $v_9),
                $v_B = $v_A[0];
            $v_2.value = $v_B
        }
    },
    $4O_3: function ($p0, $p1) {
        var $v_0 = Xrm.Page.data;
        if (!IsNull($v_0)) {
            var $v_3 = $v_0.entity.attributes.get($p0.id);
            if (!IsNull($v_3)) {
                $v_3.setRequiredLevel($p1 ? "required" : "none");
                return
            }
        }
        var $v_1 = Mscrm.FormControlInputBehavior.GetBehavior($p0.id);
        if (IsNull($v_1)) {
            var $v_4 = $p1 ? 2 : 0;
            $p0.req = $v_4
        } else $v_1.set_requiredLevel($p1 ? 2 : 0);
        var $v_2 = this.GetLabelControl($p0);
        !IsNull($v_2) && Mscrm.Form.setFieldRequiredOrRecommended($v_2.parentNode, $p1 ? 2 : 0, window.LOCID_FORM_REQUIRED_ALT);
        if (!IsNull($p0.className)) {
            if ($p0.className === "ms-crm-Duration") {
                var $v_5 = $get($p0.id + "Select");
                $v_5.setAttribute("defaultbgcolor", $p1 ? window.LOCID_FORM_REQUIRED_BKG_COLOR : "");
                $v_5.className = "ms-crm-SelectBox"
            }
            if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Lookup")) XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0.parentNode.parentNode)).style.backgroundColor = $p1 ? window.LOCID_FORM_REQUIRED_BKG_COLOR : ""
        }
    },
    $7H_3: function () {
        Mscrm && Mscrm.RibbonData && Mscrm.RibbonData.setRibbonEnabledState(false);
        var $v_0 = this.$4l_3();
        this.$1X_3 = true;
        if (XUI.Html.DispatchDomEvent(this.$Z_3, XUI.Html.CreateDomEvent("submit"))) {
            if (!IsNull($find("crmInlinePageManager"))) {
                var $v_1 = Mscrm.FormControl.getHttpPostBody(this.$Z_3),
                    $v_2 = $find("crmContentPanel");
                $v_2.loadContentByPost(Mscrm.CrmUri.create(this.$Z_3.getAttribute("action").toString()), $v_1)
            } else this.$Z_3.submit();
            this.recordUpdating()
        } else {
            this.$1X_3 = false;
            Mscrm && Mscrm.RibbonData && Mscrm.RibbonData.setRibbonEnabledState(true);
            this.$4q_3($v_0)
        }
        if (!IsNull(Mscrm.PageManager.get_instance()) && Mscrm.PageManager.isFlatUIPage() && this.$Z_3.children.length > 0) {
            var $v_3 = this.get_$3B_3();
            $v_3.value = ""
        }
    },
    $4q_3: function ($p0) {
        if (!IsNull(this.get_$k_3()) && !IsNull(this.get_$k_3().controls)) for (var $v_0 = this.get_$k_3().controls, $v_1 = 0, $v_2 = $p0.length; $v_1 < $v_2; $v_1++) $v_0.get($v_1).set_disabled($p0[$v_1])
    },
    $4l_3: function () {
        var $v_0 = [];
        if (!IsNull(this.get_$k_3()) && !IsNull(this.get_$k_3().controls)) {
            var $$t_4 = this;
            this.get_$k_3().controls.forEach(function ($p1_0, $p1_1) {
                try {
                    if ($p1_0.get_disabled) {
                        $v_0[$p1_1] = $p1_0.get_disabled();
                        $p1_0.set_disabled(true)
                    }
                } catch ($v_1) {}
            })
        }
        return $v_0
    },
    $6p_3: function ($p0) {
        switch ($p0) {
            case 1:
                this.$2b_3("save");
                break;
            case 2:
                this.$2b_3("saveandclose");
                break;
            case 59:
                this.$2b_3("saveandnew");
                break;
            case 3:
                this.$2b_3("delete");
                break
        }
    },
    $64_3: function ($p0) {
        var $v_0 = Mscrm.FormUtility.getSlugControl($p0);
        return !IsNull($v_0) && $v_0.get_isDataSlug()
    },
    $4B_3: function ($p0, $p1) {
        var $v_0 = Mscrm.FormControlInputBehavior.GetBehavior($p0.id);
        if ($p1 && $p0.id === "ownerid") {
            if (typeof $p0.IsValid !== Mscrm.TypeNames.undefinedType && !$p0.IsValid()) {
                $p0.SetFocus();
                return false
            } else if (!IsNull($v_0) && typeof $v_0.get_isValid !== Mscrm.TypeNames.undefinedType && !$v_0.get_isValid()) {
                $v_0.setFocus();
                return false
            }
            return true
        }
        var $v_1 = IsNull($v_0) ? $p0.RequiredLevel === FIELD_REQUIRED : $v_0.get_requiredLevel() === FIELD_REQUIRED,
            $v_2 = !IsNull($v_0) ? $v_0.get_disabled() : $p0.disabled,
            $v_3 = !IsNull($v_0) ? $v_0.get_dataValue() : $p0.DataValue;
        if ($p1 && $v_1 && !$v_2 && this.$64_3($p0)) return true;
        else if ($v_1 && IsNull($v_3) && !$v_2) {
            this.displayMissingValue(this.GetLabel($p0));
            if (!IsNull($v_0)) $v_0.setFocus();
            else $p0.SetFocus();
            return false
        } else if (typeof $p0.IsValid !== Mscrm.TypeNames.undefinedType && !$p0.IsValid()) {
            $p0.SetFocus();
            return false
        } else if (!IsNull($v_0) && typeof $v_0.get_isValid !== Mscrm.TypeNames.undefinedType && !$v_0.get_isValid()) {
            $v_0.setFocus();
            return false
        }
        return true
    },
    $48_3: function () {
        var $v_0 = false;
        if (typeof window.document.activeElement !== Mscrm.TypeNames.unknownType) {
            var $v_1 = window.document.activeElement;
            while (!IsNull($v_1) && $v_1 !== this.get_element()) {
                var $v_2 = $v_1.IsDirty;
                if (!IsNull($v_2)) {
                    $v_0 = $v_2;
                    break
                } else {
                    var $v_3 = $v_1.id;
                    if (!isNullOrEmptyString($v_3)) {
                        var $v_4 = Mscrm.FormControlInputBehavior.GetBehavior($v_3);
                        if (!IsNull($v_4)) try {
                            $v_0 = $v_4.get_isDirty();
                            break
                        } catch ($$e_5) {}
                    }
                }
                $v_1 = $v_1.parentNode
            }
        }
        return $v_0
    },
    $5C_3: function () {
        var $v_0 = $get("crmFormSubmitMappedDataRemainder");
        if (!IsNull($v_0)) return $v_0.value;
        return ""
    },
    $6D_3: function ($p0) {
        this.$2g_3 = true;
        var $v_0 = $get("navInfo");
        !IsNull($v_0) && XUI.Html.DispatchDomEvent($v_0, XUI.Html.CreateDomEvent("click"));
        var $v_1 = $find($p0.id);
        !IsNull($v_1) && !$v_1.get_visible() && $v_1.set_visible(true);
        var $v_2 = $get($p0.id + "Tab");
        !IsNull($v_2) && XUI.Html.DispatchDomEvent($v_2, XUI.Html.CreateDomEvent("click"));
        if ($p0.className === "ms-crm-Tab") {
            var $v_3 = $get("crmTabBar"),
                $v_4 = XUI.Html.DomUtils.GetChildElementAt($v_3, parseInt($p0.id.substr(3), 10));
            XUI.Html.DispatchDomEvent($v_4, XUI.Html.CreateDomEvent("click"))
        } else {
            if (!IsNull($v_1) && $v_1.get_displayState() === "collapsed") {
                $v_1.set_displayState("expanded");
                Mscrm.FormUtility.refreshWindowInIE7()
            }!this.$2r_3 && this.$6w_3($p0)
        }
        this.$2g_3 = false
    },
    $6w_3: function ($p0) {
        var $v_0 = $get("formBodyContainer");
        if ($v_0) {
            var $v_1 = $v_0.scrollTop,
                $v_2 = $p0.offsetTop;
            if ($v_2 !== $v_1) $v_0.scrollTop = $v_2
        }
    }
};
Mscrm.FormNavControl = function ($p0) {
    this.$$d_$79_3 = Function.createDelegate(this, this.$79_3);
    this.$$d_$5n_3 = Function.createDelegate(this, this.$5n_3);
    this.$$d_$1j_3 = Function.createDelegate(this, this.$1j_3);
    this.$$d_$6G_3 = Function.createDelegate(this, this.$6G_3);
    this.$$d_$6r_3 = Function.createDelegate(this, this.$6r_3);
    this.$$d_$4z_3 = Function.createDelegate(this, this.$4z_3);
    this.$$d_$6E_3 = Function.createDelegate(this, this.$6E_3);
    this.$$d_$6F_3 = Function.createDelegate(this, this.$6F_3);
    this.$$d_$69_3 = Function.createDelegate(this, this.$69_3);
    this.$$d_$6B_3 = Function.createDelegate(this, this.$6B_3);
    this.$2V_3 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/navup.png"));
    this.$2U_3 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/navdown.png"));
    this.$N_3 = new Array(0);
    Mscrm.FormNavControl.initializeBase(this, [$p0])
};
Mscrm.FormNavControl.isNavLinkEnabled = function (element) {
    return !Sys.UI.DomElement.containsCssClass(element, "ms-crm-Nav-Subarea-Disabled")
};
Mscrm.FormNavControl.enableNavLinks = function () {
    var $v_0 = Mscrm.FormNavControl.$4D();
    if ($v_0) for (var $v_1 = document.getElementsByTagName("a"), $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
        var $v_3 = $v_1[$v_2];
        if ($v_3.className.indexOf("ms-crm-Nav-Subarea-Link") >= 0) $v_3.className = $v_3.className.replace("ms-crm-Nav-Subarea-Disabled", "")
    }
};
Mscrm.FormNavControl.$29 = function ($p0) {
    return Sys.UI.DomElement.getVisible($p0)
};
Mscrm.FormNavControl.$l = function ($p0, $p1) {
    Sys.UI.DomElement.setVisible($p0, $p1)
};
Mscrm.FormNavControl.$2B = function ($p0) {
    return !IsNull($p0) && (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FormSelector-SubItem") || Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Link"))
};
Mscrm.FormNavControl.$4A = function ($p0) {
    return !IsNull($p0) && Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Group-Heading")
};
Mscrm.FormNavControl.$4D = function () {
    return Mscrm.FormNavControl.$4E("_id")
};
Mscrm.FormNavControl.$4E = function ($p0) {
    var $v_0 = window[$p0];
    if (!IsNull($v_0) && !isNullOrEmptyString($v_0)) return false;
    return true
};
Mscrm.FormNavControl.glowPaneStrip = function (on, controlId) {
    var $v_0 = window.document.getElementById(controlId + "_paneStripDiv");
    Mscrm.Utilities.glowBackground(on, $v_0, "ms-crm-control-SideStrip-Hovered", "ms-crm-control-SideStrip")
};
Mscrm.FormNavControl.prototype = {
    $7M_3: "",
    $2X_3: "",
    $52_3: "180",
    $51_3: "40",
    $2P_3: null,
    $W_3: null,
    $2N_3: null,
    $21_3: null,
    $1N_3: null,
    $1M_3: null,
    $T_3: null,
    $3S_3: null,
    add_$4a_3: function ($p0) {
        this.get_events().addHandler("AfterInit", $p0);
        this.get_isInitialized() && $p0(this, Sys.EventArgs.Empty)
    },
    remove_$4a_3: function ($p0) {
        this.get_events().removeHandler("AfterInit", $p0)
    },
    get_tabLinksListId: function () {
        return this.$2P_3
    },
    set_tabLinksListId: function (value) {
        this.$2P_3 = value;
        return value
    },
    get_subAreaLinksListId: function () {
        return this.$2N_3
    },
    set_subAreaLinksListId: function (value) {
        this.$2N_3 = value;
        return value
    },
    get_formSelector: function () {
        return this.$T_3
    },
    set_formSelector: function (value) {
        this.$T_3 = value;
        return value
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        var $v_0 = this.get_element();
        this.$W_3 = isNullOrEmptyString(this.$2P_3) ? null : $get(this.$2P_3);
        this.$21_3 = isNullOrEmptyString(this.$2N_3) ? null : $get(this.$2N_3);
        this.$2X_3 = "ShowLeftNav" + this.$7M_3;
        this.$7N_3();
        for (var $v_1 = this.$W_3 ? this.$W_3.getElementsByTagName("A") : [], $v_2 = this.$21_3 ? this.$21_3.getElementsByTagName("A") : [], $v_3 = 0; $v_3 < $v_1.length; $v_3++) Array.add(this.$N_3, $v_1[$v_3]);
        var $v_4 = !IsNull($find("crmForm")),
            $v_5 = !Mscrm.FormNavControl.$4E("frmReloadId"),
            $v_6 = Mscrm.FormNavControl.$4D();
        for ($v_3 = 0; $v_3 < $v_2.length; $v_3++) {
            var $v_8 = $v_2[$v_3];
            if (Sys.UI.DomElement.containsCssClass($v_8, "ms-crm-Nav-Subarea-Link")) {
                Array.add(this.$N_3, $v_8);
                if (!$v_4 && !$v_5) if ($v_6) Sys.UI.DomElement.addCssClass($v_8, "ms-crm-Nav-Subarea-Disabled");
                else Sys.UI.DomElement.removeCssClass($v_8, "ms-crm-Nav-Subarea-Disabled")
            }
        }
        this.$4Q_3();
        $addHandler($v_0, "keyup", this.$$d_$6B_3);
        $addHandler($v_0, "keydown", this.$$d_$69_3);
        $addHandler($v_0, "mouseover", this.$$d_$6F_3);
        $addHandler($v_0, "mouseout", this.$$d_$6E_3);
        $addHandler($v_0, "focusin", this.$$d_$4z_3);
        $addHandler($v_0, "focusout", this.$$d_$6r_3);
        $addHandler($v_0, "click", this.$$d_$6G_3);
        $addHandler(window, "resize", this.$$d_$1j_3);
        var $v_7 = this.get_events().getHandler("AfterInit");
        !IsNull($v_7) && $v_7(this, Sys.EventArgs.Empty);
        this.$1j_3(null)
    },
    dispose: function () {
        var $v_0 = this.get_element();
        if (!IsNull($v_0)) {
            $removeHandler($v_0, "keyup", this.$$d_$6B_3);
            $removeHandler($v_0, "keydown", this.$$d_$69_3);
            $removeHandler($v_0, "mouseover", this.$$d_$6F_3);
            $removeHandler($v_0, "mouseout", this.$$d_$6E_3);
            $removeHandler($v_0, "focusin", this.$$d_$4z_3);
            $removeHandler($v_0, "focusout", this.$$d_$6r_3);
            $removeHandler($v_0, "click", this.$$d_$6G_3)
        }
        $removeHandler(window, "resize", this.$$d_$1j_3);
        !IsNull(this.$3S_3) && Sys.Application.remove_load(this.$3S_3);
        this.$N_3 = null;
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    getItemIds: function () {
        for (var $v_0 = [], $v_1 = 0; $v_1 < this.$N_3.length; $v_1++) {
            var $v_2 = this.$N_3[$v_1];
            Sys.UI.DomElement.containsCssClass($v_2, "ms-crm-Nav-Subarea-Link") && Array.add($v_0, $v_2.id)
        }
        return $v_0
    },
    getItemText: function (itemId) {
        var $v_0 = $get(itemId, this.get_element());
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.getElementsByTagName("NOBR");
            if ($v_1.length > 0) return XUI.Html.GetText($v_1[0])
        }
        return null
    },
    getItemVisibility: function (itemId) {
        var $v_0 = $get(itemId, this.get_element());
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.parentNode;
            return Mscrm.FormNavControl.$29($v_1)
        }
        return false
    },
    setItemText: function (itemId, text) {
        var $v_0 = $get(itemId, this.get_element());
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.getElementsByTagName("NOBR");
            $v_1.length > 0 && XUI.Html.SetText($v_1[0], text)
        }
    },
    setItemVisibility: function (itemId, visible) {
        var $v_0 = $get(itemId, this.get_element());
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.parentNode;
            if (!visible && this.$1N_3 === $v_0) {
                var $v_2 = Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-FormSelector-SubItem") ? "ms-crm-FormSelector-SubItem" : "ms-crm-Nav-Subarea-Link",
                    $$t_9 = this,
                    $v_3 = function ($p1_0) {
                        return Sys.UI.DomElement.containsCssClass($p1_0, $v_2)
                    }, $v_4 = Array.indexOf(this.$N_3, $v_0),
                    $v_5 = this.$2W_3(this.$N_3, $v_4, true, $v_3);
                if ($v_5 === $v_0) $v_5 = this.$2W_3(this.$N_3, - 1, true, $v_3);
                if ($v_5 === $v_0) $v_5 = this.$2W_3(this.$N_3, - 1, true);
                Mscrm.Utilities.click($v_5)
            }
            Mscrm.FormNavControl.$l($v_1, visible)
        }
    },
    $2W_3: function ($p0, $p1, $p2, $p3) {
        for (var $v_0 = $p2 ? 1 : -1, $v_1 = $p1 + $v_0; $v_1 >= 0 && $v_1 < $p0.length; $v_1 += $v_0) {
            var $v_2 = $p0[$v_1];
            if (!$v_2.disabled && Mscrm.FormNavControl.$29($v_2) && (!$p3 || $p3($v_2))) {
                var $v_3 = $v_2.parentNode,
                    $v_4 = this.get_element();
                while (!IsNull($v_3) && $v_3 !== $v_4 && $v_3.tagName !== "UL") $v_3 = $v_3.parentNode;
                if (!$v_3 || $v_3.tagName !== "UL" || Mscrm.FormNavControl.$29($v_3)) return $v_2
            }
        }
        if ($p1 < 0) $p1 = 0;
        else if ($p1 >= $p0.length) $p1 = $p0.length - 1;
        return $p0[$p1]
    },
    $27_3: function ($p0) {
        var $v_0 = $p0.target,
            $v_1 = this.get_element();
        while (!IsNull($v_0) && $v_0 !== $v_1 && $v_0.tagName !== "A") $v_0 = $v_0.parentNode;
        if (!IsNull($v_0) && $v_0.tagName === "A" && (Mscrm.FormNavControl.$2B($v_0) || Mscrm.FormNavControl.$4A($v_0))) return $v_0;
        else return null
    },
    $6G_3: function ($p0) {
        var $v_0 = this.$27_3($p0),
            $v_1 = IsNull($v_0) ? null : $v_0.getAttribute("disabled");
        if (Mscrm.Utilities.parseBoolean($v_1)) return;
        this.$2C_3(null);
        if (!IsNull($v_0) && !$v_0.disabled) {
            if (Mscrm.FormNavControl.$2B($v_0)) this.$6x_3($v_0);
            else Mscrm.FormNavControl.$4A($v_0) && this.$4r_3($v_0);
            $p0.ctrlKey && $p0.preventDefault()
        }
    },
    $6B_3: function ($p0) {
        var $v_0 = this.$27_3($p0);
        if (!IsNull($v_0)) {
            var $v_1 = Mscrm.Utilities.getDomEventKeyCode($p0);
            if ($v_1 === 32) Mscrm.Utilities.click($v_0);
            else if (Mscrm.FormNavControl.$2B($v_0)) {
                var $v_2 = Array.indexOf(this.$N_3, $v_0),
                    $v_3 = true,
                    $v_4 = true;
                switch ($v_1) {
                    case 38:
                        $v_3 = false;
                        break;
                    case 40:
                        $v_3 = true;
                        break;
                    case 36:
                        $v_2 = -1;
                        $v_3 = true;
                        break;
                    case 35:
                        $v_2 = this.$N_3.length;
                        $v_3 = false;
                        break;
                    default:
                        $v_4 = false;
                        break
                }
                if ($v_4) {
                    var $v_5 = this.$2W_3(this.$N_3, $v_2, $v_3);
                    this.$2C_3($v_5)
                }
            }
        }
    },
    $69_3: function ($p0) {
        switch (Mscrm.Utilities.getDomEventKeyCode($p0)) {
            case 38:
            case 40:
            case 36:
            case 35:
            case 32:
                $p0.preventDefault();
                break
        }
    },
    $6F_3: function ($p0) {
        var $v_0 = this.$27_3($p0);
        if (!IsNull($v_0) && Mscrm.FormNavControl.$2B($v_0) && !$v_0.disabled) if (Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-FormSelector-SubItem") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-FormSelector-SubItem-Selected")) Sys.UI.DomElement.addCssClass($v_0, "ms-crm-FormSelector-SubItem-Hovered");
        else if (Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Nav-Subarea-Link") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Nav-Subarea-Selected")) Sys.UI.DomElement.addCssClass($v_0, "ms-crm-Nav-Subarea-Hovered");
        else if (!(!Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-FormSelector-SubItem") && !Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Nav-Subarea-Link"))) return
    },
    $6E_3: function ($p0) {
        var $v_0 = this.$27_3($p0);
        if (!IsNull($v_0)) {
            Sys.UI.DomElement.removeCssClass($v_0, "ms-crm-FormSelector-SubItem-Hovered");
            Sys.UI.DomElement.removeCssClass($v_0, "ms-crm-Nav-Subarea-Hovered")
        }
    },
    $4z_3: function ($p0) {
        var $v_0 = this.$27_3($p0);
        if (!IsNull($v_0)) if (Mscrm.FormNavControl.$2B($v_0)) this.$2C_3($v_0);
        else this.$2C_3(null)
    },
    $6r_3: function ($p0) {
        this.$2C_3(null)
    },
    $1j_3: function ($p0) {
        if (this.get_element().parentNode.clientHeight <= 0) {
            var $$t_6 = this;
            window.setTimeout(function () {
                $$t_6.$1j_3($p0)
            }, 1);
            return
        }
        this.$4Q_3();
        if (this.$W_3) {
            var $v_0 = this.$W_3.parentNode,
                $v_1 = this.get_element().parentNode.clientHeight - 13 - 5,
                $v_2 = IsNull(this.$T_3) ? 0 : this.$T_3.get_height(),
                $v_3 = $v_2 + this.$W_3.scrollHeight;
            this.$71_3($v_3 > .6 * $v_1, $v_1);
            var $v_4 = $v_1 - ($v_0.offsetHeight + XUI.Html.DomUtils.GetNextSibling($v_0).offsetHeight);
            if ($v_4 > 0) this.$21_3.style.height = $v_4.toString() + "px"
        }
    },
    $71_3: function ($p0, $p1) {
        if ($p0) {
            var $v_0 = Math.round(.6 * $p1 - this.$T_3.get_height());
            if ($v_0 > 0) this.$W_3.style.height = $v_0.toString() + "px";
            this.$W_3.style.overflowY = "auto"
        } else {
            this.$W_3.style.height = "auto";
            this.$W_3.style.overflowY = "visible"
        }
    },
    $6x_3: function ($p0) {
        if (this.$1N_3 !== $p0) {
            this.$4j_3(this.$1N_3);
            this.$1N_3 = $p0;
            if (!IsNull($p0)) if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FormSelector-SubItem")) Sys.UI.DomElement.addCssClass($p0, "ms-crm-FormSelector-SubItem-Selected");
            else if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Link"))!Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Disabled") && Sys.UI.DomElement.addCssClass($p0, "ms-crm-Nav-Subarea-Selected")
        }
    },
    $4j_3: function ($p0) {
        if (!IsNull($p0) && this.$1N_3 === $p0) {
            this.$1N_3 = null;
            Sys.UI.DomElement.removeCssClass($p0, "ms-crm-FormSelector-SubItem-Selected");
            Sys.UI.DomElement.removeCssClass($p0, "ms-crm-Nav-Subarea-Selected")
        }
    },
    $4r_3: function ($p0) {
        var $v_0 = XUI.Html.DomUtils.GetNextSibling($p0),
            $v_1 = $p0.getElementsByTagName("IMG")[0];
        if (Mscrm.FormNavControl.$29($v_0)) {
            Sys.UI.DomElement.removeCssClass($v_1, this.$2V_3.cssClass);
            Sys.UI.DomElement.addCssClass($v_1, this.$2U_3.cssClass);
            $v_1.src = this.$2U_3.source;
            $v_1.alt = window.LOCID_TREE_PLUS;
            Mscrm.FormNavControl.$l($v_0, false)
        } else {
            Sys.UI.DomElement.removeCssClass($v_1, this.$2U_3.cssClass);
            Sys.UI.DomElement.addCssClass($v_1, this.$2V_3.cssClass);
            $v_1.src = this.$2V_3.source;
            $v_1.alt = window.LOCID_TREE_MINUS;
            Mscrm.FormNavControl.$l($v_0, true)
        }
    },
    $2C_3: function ($p0) {
        if (!IsNull(this.$1M_3)) {
            Sys.UI.DomElement.removeCssClass(this.$1M_3, "ms-crm-FormSelector-SubItem-Hovered");
            Sys.UI.DomElement.removeCssClass(this.$1M_3, "ms-crm-Nav-Subarea-Hovered");
            this.$1M_3 = null
        }
        if (!IsNull($p0) && !$p0.disabled) {
            var $v_0 = null;
            if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FormSelector-SubItem") && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FormSelector-SubItem-Selected")) {
                Sys.UI.DomElement.addCssClass($p0, "ms-crm-FormSelector-SubItem-Hovered");
                $v_0 = this.$W_3
            } else if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Link") && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Selected")) {
                Sys.UI.DomElement.addCssClass($p0, "ms-crm-Nav-Subarea-Hovered");
                $v_0 = this.$21_3
            } else if (!(!Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FormSelector-SubItem") && !Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Nav-Subarea-Link"))) return;
            this.$1M_3 = $p0;
            this.$1M_3.focus();
            if (!IsNull($v_0)) {
                var $v_1 = $v_0.scrollTop,
                    $v_2 = $v_1 + $v_0.offsetHeight,
                    $v_3 = $p0.offsetTop,
                    $v_4 = $v_3 + $p0.offsetHeight;
                if ($v_3 < $v_1) $v_0.scrollTop = $v_3;
                else if ($v_4 > $v_2) $v_0.scrollTop = $v_4 - $v_0.offsetHeight
            }
        }
    },
    sideStripOnClick: function () {
        if (Mscrm.FormNavControl.$29($get("crmNavBar_paneTD"))) {
            Mscrm.CrmLocalStorage.setItem(this.$2X_3, "false");
            window.setTimeout(this.$$d_$5n_3, 1)
        } else {
            Mscrm.CrmLocalStorage.setItem(this.$2X_3, "true");
            window.setTimeout(this.$$d_$79_3, 1)
        }
    },
    $79_3: function () {
        Mscrm.FormNavControl.$l($get("crmNavBar_paneTD"), true);
        Mscrm.FormNavControl.$l($get("crmNavBar_VisualizationPaneStripToCollapse"), true);
        Mscrm.FormNavControl.$l($get("crmNavBar_VisualizationPaneStrip"), false);
        $get("crmNavBar").parentNode.style.width = this.$52_3 + "px";
        var $v_0 = $get("mainContainer");
        $v_0.className = $v_0.className.replace("ms-crm-readForm-Container", "");
        $v_0.className += " ms-crm-readForm-Container-showNav";
        this.$1j_3(null)
    },
    $5n_3: function () {
        Mscrm.FormNavControl.$l($get("crmNavBar_paneTD"), false);
        Mscrm.FormNavControl.$l($get("crmNavBar_VisualizationPaneStripToCollapse"), false);
        Mscrm.FormNavControl.$l($get("crmNavBar_VisualizationPaneStrip"), true);
        $get("crmNavBar").parentNode.style.width = this.$51_3 + "px";
        var $v_0 = $get("mainContainer");
        $v_0.className = $v_0.className.replace("ms-crm-readForm-Container-showNav", "");
        $v_0.className += " ms-crm-readForm-Container";
        this.$1j_3(null)
    },
    $7N_3: function () {
        if (IsNull($get("crmNavBar_VisualizationPaneStripToCollapse"))) return;
        this.$1j_3(null);
        if (this.$5K_3()) window.setTimeout(this.$$d_$79_3, 500);
        else window.setTimeout(this.$$d_$5n_3, 500)
    },
    $5K_3: function () {
        var $v_0 = null;
        try {
            $v_0 = Mscrm.CrmLocalStorage.getItem(this.$2X_3)
        } catch ($v_1) {}
        if (isNullOrEmptyString($v_0)) return false;
        else return Boolean.parse($v_0)
    },
    $4Q_3: function () {
        var $v_0 = $get("areaForm"),
            $v_1 = $get("mainContainer"),
            $v_2 = $get("divInformation");
        if (!IsNull($v_1)) this.get_element().style.height = $v_1.clientHeight + "px";
        else if (!IsNull($v_0)) if ($v_0.clientHeight) this.get_element().style.height = $v_0.clientHeight + "px";
        else if (!IsNull($v_2)) this.get_element().style.height = $v_2.clientHeight + "px"
    }
};
Mscrm.FormSelector = function (element) {
    this.$$d_$5b_3 = Function.createDelegate(this, this.$5b_3);
    this.$$d_$5c_3 = Function.createDelegate(this, this.$5c_3);
    this.$$d_$5f_3 = Function.createDelegate(this, this.$5f_3);
    this.$$d_$5e_3 = Function.createDelegate(this, this.$5e_3);
    Mscrm.FormSelector.initializeBase(this, [element])
};
Mscrm.FormSelector.prototype = {
    $1r_3: null,
    $2I_3: null,
    $n_3: null,
    $20_3: null,
    $19_3: null,
    $1A_3: null,
    $C_3: null,
    get_formIds: function () {
        return this.$1r_3
    },
    set_formIds: function (value) {
        this.$1r_3 = value;
        return value
    },
    get_formTitles: function () {
        return this.$2I_3
    },
    set_formTitles: function (value) {
        this.$2I_3 = value;
        return value
    },
    get_currentFormId: function () {
        return this.$n_3
    },
    set_currentFormId: function (value) {
        this.$n_3 = value;
        return value
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        if (this.get_element().tagName.toUpperCase() === "A") {
            this.$19_3 = this.$$d_$5e_3;
            this.$1A_3 = this.$$d_$5f_3;
            $addHandler(this.get_element(), "click", this.$19_3);
            $addHandler(this.get_element(), "keypress", this.$1A_3);
            this.$20_3 = XUI.Html.DomUtils.GetNextSibling(this.get_element());
            $addHandler(this.$20_3, "click", this.$19_3);
            $addHandler(this.$20_3, "keypress", this.$1A_3)
        }
    },
    dispose: function () {
        if (this.$19_3) {
            $removeHandler(this.get_element(), "click", this.$19_3);
            $removeHandler(this.$20_3, "click", this.$19_3);
            this.$19_3 = null
        }
        if (this.$1A_3) {
            $removeHandler(this.get_element(), "keypress", this.$1A_3);
            $removeHandler(this.$20_3, "keypress", this.$1A_3);
            this.$1A_3 = null
        }
        Mscrm.CrmUIControl.prototype.dispose.call(this)
    },
    $1g_3: function ($p0) {
        var $v_0 = Mscrm.Utilities.getContentUrl(this);
        $v_0.get_query()["formid"] = $p0;
        var $v_1 = {};
        $v_1["sameWindow"] = true;
        openUrlByCrmUrl($v_0, $v_1)
    },
    $5e_3: function ($p0) {
        this.$4V_3()
    },
    $5f_3: function ($p0) {
        Mscrm.Utilities.getDomEventKeyCode($p0) === 32 && this.$4V_3()
    },
    $4V_3: function () {
        this.$5u_3();
        var $v_0 = this.get_element(),
            $v_1 = Mscrm.Utilities.getXYPos($v_0, window.LOCID_UI_DIR === "RTL");
        this.$C_3.set_top($v_0.offsetHeight + $v_1["y"]);
        this.$C_3.set_left($v_1["x"]);
        this.$C_3.show();
        Sys.UI.DomElement.removeCssClass($v_0, "ms-crm-FormSelector");
        Sys.UI.DomElement.addCssClass($v_0, "ms-crm-FormSelector-Opened")
    },
    $5u_3: function () {
        if (!this.$C_3) {
            var $v_0 = this.get_element();
            this.$C_3 = Mscrm.Menu.createMenuForParentElement(document.body);
            this.$C_3.set_stylePrefix(Mscrm.MenuStyles.formSelectorStylePrefix);
            this.$C_3.set_propagateStyle(true);
            this.$C_3.set_width($v_0.offsetWidth);
            this.$C_3.set_shiftVertical(false);
            this.$C_3.set_enforceHorizontalOffset(false);
            if (window.LOCID_UI_DIR === "RTL") this.$C_3.set_launchesRight(false);
            else this.$C_3.set_launchesRight(true);
            for (var $v_1 = 0; $v_1 < this.$1r_3.length; $v_1++) {
                var $v_2 = this.$2I_3[$v_1],
                    $v_3 = this.$1r_3[$v_1],
                    $v_4 = Mscrm.MenuItem.createMenuItem($v_2);
                $v_4.set_tooltip($v_2);
                $v_4.set_reference($v_3);
                $v_4.set_menuItemId($v_3);
                $v_4.set_actionCallback(this.$$d_$5c_3);
                this.$C_3.addItem($v_4);
                if ($v_3 === this.$n_3) {
                    $v_4.set_isSelected(true);
                    this.$C_3.set_focusElementOnShow($v_4.get_itemContents())
                }
            }
            this.$C_3.set_hideCallback(this.$$d_$5b_3);
            this.$C_3.set_focusElementOnHide(this.get_element())
        }
    },
    $5c_3: function ($p0) {
        $p0.get_reference() !== this.$n_3 && this.$1g_3($p0.get_reference())
    },
    $5b_3: function ($p0) {
        Sys.UI.DomElement.removeCssClass(this.get_element(), "ms-crm-FormSelector-Opened");
        Sys.UI.DomElement.addCssClass(this.get_element(), "ms-crm-FormSelector")
    }
};
Mscrm.FormUtility = function () {};
Mscrm.FormUtility.isControlDirty = function (control) {
    var $v_0 = false;
    switch (control.tagName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
        case "TABLE":
        case "DIV":
        case "SPAN":
        case "IMG":
        case "IFRAME":
            var $v_1 = false,
                $v_2 = Mscrm.FormUtility.getSlugControl(control);
            if (!IsNull($v_2) && $v_2.get_isDataSlug()) $v_1 = $v_2.get_isSlugDirty();
            if (!isNullOrEmptyString(control.id)) {
                var $v_3 = Mscrm.FormControlInputBehavior.GetBehavior(control.id);
                if (!IsNull($v_3)) $v_0 = $v_3.get_isDirty()
            }
            $v_0 = $v_0 || $v_1;
            break
    }
    return $v_0
};
Mscrm.FormUtility.isControlEditable = function (control) {
    var $v_0 = false;
    if (!IsNull(control.disabled)) $v_0 = control.disabled;
    else if (control.contentEditable === "inherit") $v_0 = control.isContentEditable;
    else $v_0 = control.contentEditable === "true" ? true : false;
    return $v_0
};
Mscrm.FormUtility.setFormPropertyValue = function (name, value) {
    var $v_0 = Sys.Serialization.JavaScriptSerializer.deserialize(value),
        $v_1 = $get("crmForm"),
        $v_2 = $get(name, $v_1),
        $v_3 = Mscrm.FormControlInputBehavior.GetElementBehavior($v_2);
    $v_3.set_dataValue($v_0);
    $v_3.fireOnChange()
};
Mscrm.FormUtility.setEditableState = function (control, isDisabled) {
    if (!IsNull(control.disabled)) control.disabled = isDisabled;
    else control.contentEditable = !isDisabled
};
Mscrm.FormUtility.getSlugControl = function (control) {
    if (control.tagName === "IMG" || control.className === "ms-crm-Money") while (control && IsNull(Mscrm.FormUtility.getSlugBehavior(control))) control = control.parentNode;
    else if (control.className === "ms-crm-Duration" && control.tagName.toUpperCase() === "INPUT") {
        var $v_0 = XUI.Html.DomUtils.GetNextSibling(control);
        if ($v_0.className === "ms-crm-SelectBox") control = $v_0
    }
    return Mscrm.FormUtility.getSlugBehavior(control)
};
Mscrm.FormUtility.getSlugBehavior = function (behaviorOwner) {
    if (IsNull(behaviorOwner)) return null;
    var $v_0 = Sys.UI.Behavior.getBehaviorByName(behaviorOwner, "SlugSupport");
    return IsNull($v_0) ? null : $v_0
};
Mscrm.FormUtility.getFormPropertyXmlValue = function (name, value) {
    var $v_0 = $get("crmForm"),
        $v_1 = $get(name, $v_0);
    return $v_1.DataXml
};
Mscrm.FormUtility.getFormDataXml = function () {
    var $v_0 = $find("crmForm");
    $v_0.BuildXml(false, false, false, false, false);
    var $v_1 = $get("crmFormSubmitXml");
    return $v_1.value
};
Mscrm.FormUtility.constructExecutionObject = function (eventSource, depth, eventArgs, eContext) {
    var $v_0 = new Mscrm.ExecutionContext(eventSource, Xrm.Page.context, depth, eventArgs, eContext);
    return $v_0
};
Mscrm.FormUtility.detachCloseAlert = function () {
    var $v_0 = $find("crmForm");
    $v_0.detachCloseAlert()
};
Mscrm.FormUtility.getCrmFormElement = function (objectTypeCode) {
    var $v_0;
    if (objectTypeCode === Mscrm.EntityTypeCode.Report) $v_0 = $find("crmFormSubmit");
    else $v_0 = $find("crmForm");
    return $v_0
};
Mscrm.FormUtility.$2S = function ($p0, $p1, $p2) {
    if ($p2) if (Sys.Browser.agent === Sys.Browser.InternetExplorer) $addHandler($p0, "focusin", $p1);
    else $p0.addEventListener("focus", $p1, true);
    else if (Sys.Browser.agent === Sys.Browser.InternetExplorer) $removeHandler($p0, "focusin", $p1);
    else $p0.removeEventListener("focus", $p1, true)
};
Mscrm.FormUtility.refreshWindowInIE7 = function () {
    if (Mscrm.Utilities.get_ieBrowserVersion() > 0) if (IsNull(window.document.documentMode) || window.document.documentMode === 7) {
        Sys.UI.DomElement.toggleCssClass(document.body, "IE7DivReset");
        Sys.UI.DomElement.toggleCssClass(document.body, "IE7DivReset")
    }
};

function setFormPropertyValue(name, value) {
    Mscrm.FormUtility.setFormPropertyValue(name, value)
}
function getFormPropertyXmlValue(name, value) {
    return Mscrm.FormUtility.getFormPropertyXmlValue(name, value)
}
function getFormDataXml() {
    return Mscrm.FormUtility.getFormDataXml()
}
function saveAndCloseForm() {
    var $v_0 = $find("crmForm");
    !IsNull($v_0) && $v_0.SaveAndClose()
}
function isFormReadyToClose() {
    var $v_0 = $find("crmForm"),
        $v_1 = !$v_0 ? true : $v_0.IsReadyToClose();
    if ($v_1 && typeof Mscrm.ReadFormUtilities !== "undefined" && typeof Mscrm.ReadFormUtilities.promptOnClose !== "undefined") return false === Mscrm.ReadFormUtilities.promptOnClose();
    return $v_1
}
function isCloseAlertAttached() {
    var $v_0 = $find("crmForm"),
        $v_1 = !$v_0 ? false : $v_0.CloseAlertAttached();
    if (!$v_1 && typeof Mscrm.ReadFormUtilities !== "undefined" && typeof Mscrm.ReadFormUtilities.isRefreshForm !== "undefined") return Mscrm.ReadFormUtilities.isRefreshForm();
    return $v_1
}
function detachCloseAlert() {
    Mscrm.FormUtility.detachCloseAlert()
}
function getCrmFormElement(objectTypeCode) {
    return Mscrm.FormUtility.getCrmFormElement(objectTypeCode)
}
Mscrm.ExecutionContext = function ($p0, $p1, $p2, $p3, $p4) {
    this.$3X_0 = $p0;
    this.$3V_0 = $p2;
    this.$3T_0 = $p1;
    this.$3W_0 = $p3;
    if ($p4 && $p4.$1Y_0) this.$1Y_0 = $p4.$1Y_0;
    else this.$1Y_0 = {}
};
Mscrm.ExecutionContext.prototype = {
    $3W_0: null,
    $3X_0: null,
    $3V_0: 0,
    $3T_0: null,
    $1Y_0: null,
    getEventArgs: function () {
        return this.$3W_0
    },
    getEventSource: function () {
        return this.$3X_0
    },
    getContext: function () {
        return this.$3T_0
    },
    getDepth: function () {
        return this.$3V_0
    },
    setSharedVariable: function (key, variable) {
        this.$1Y_0[key] = variable
    },
    getSharedVariable: function (key) {
        return this.$1Y_0[key]
    }
};
Mscrm.FormIFrameControl = function (element) {
    this.$$d_$5k_4 = Function.createDelegate(this, this.$5k_4);
    this.$$d_$6O_4 = Function.createDelegate(this, this.$6O_4);
    this.$$d_$53_4 = Function.createDelegate(this, this.$53_4);
    Mscrm.FormIFrameControl.initializeBase(this, [element]);
    this.$3Z_4 = element.id;
    this.$J_4 = element
};
Mscrm.FormIFrameControl.prototype = {
    $3Z_4: "",
    $J_4: null,
    $2u_4: "",
    $1a_4: null,
    $3d_4: false,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.$2u_4 = this.$J_4.getAttribute("url");
        this.$1a_4 = this.$5J_4();
        this.$4d_4()
    },
    dispose: function () {
        $removeHandler(this.$J_4, "load", this.$$d_$53_4);
        !IsNull(this.$1a_4) && this.$1a_4.remove_change(this.$$d_$6O_4);
        Mscrm.UIControl.prototype.dispose.call(this)
    },
    setFocus: function () {
        this.$J_4.focus()
    },
    get_disabled: function () {
        return false
    },
    set_disabled: function (value) {
        return value
    },
    handleEvent: function (eventCode, parameters, sourceComponent) {
        Mscrm.CrmUIControl.prototype.handleEvent.call(this, eventCode, parameters, sourceComponent);
        switch (eventCode) {
            case Mscrm.ScriptEvents.OnDashboardRefresh:
                if (!isNullOrEmptyString(this.$3Z_4.trim())) if (!IsNull(this.$J_4)) try {
                    this.$J_4.src = this.$J_4.src
                } catch ($$e_3) {}
                break
        }
        return null
    },
    getSrc: function () {
        return this.$J_4.src
    },
    setSrc: function (src) {
        this.$J_4.src = src
    },
    getUrl: function () {
        return this.$2u_4
    },
    add_readyStateComplete: function (value) {
        this.get_events().addHandler("ReadyStateComplete", value)
    },
    remove_readyStateComplete: function (value) {
        this.get_events().removeHandler("ReadyStateComplete", value)
    },
    $70_4: function () {
        var $v_0 = this.get_element().parentNode.parentNode;
        if (IsNull($v_0)) return;
        var $v_1 = this.get_element().id + "_d";
        if ($v_1 !== $v_0.id) {
            $v_0 = $v_0.parentNode;
            if (IsNull($v_0) || $v_0.id !== $v_1) return
        }
        if (!Sys.UI.DomElement.containsCssClass($v_0, "ms-crm-Field-Data-Print")) return;
        var $v_2 = 25,
            $v_3 = parseInt($v_0.getAttribute("rowspan"), 10);
        if (IsNull($v_3) || $v_3 < 1 || isNaN($v_3)) $v_3 = 1;
        this.get_element().style.height = ($v_2 * $v_3).toString() + "px"
    },
    $5J_4: function () {
        var $v_0 = null,
            $v_1 = $get("crmForm");
        if (!IsNull($v_1)) $v_0 = $find("crmTabBar");
        return $v_0
    },
    $46_4: function ($p0) {
        var $v_0 = this.get_element();
        while (!IsNull($v_0) && $v_0 !== $p0) $v_0 = $v_0.parentNode;
        return IsNull($v_0)
    },
    $5k_4: function ($p0, $p1) {
        if ($p1.$1n_1 === "expanded") {
            $p0.remove_tabStateChange(this.$$d_$5k_4);
            this.$1g_4()
        }
    },
    $1g_4: function () {
        this.$3d_4 = true;
        if (!IsNull(this.$J_4.src) && (this.$J_4.src.toLowerCase().endsWith("/_static/blank.htm") || this.$J_4.src.toLowerCase().endsWith(Mscrm.CrmUri.create("/_static/blank.htm").toString().toLowerCase()))) this.$J_4.src = this.$2u_4
    },
    $6O_4: function ($p0, $p1) {
        !this.$3d_4 && this.$46_4($p1.get_tabContent()) && this.$1g_4()
    },
    $4d_4: function () {
        this.$70_4();
        $addHandler(this.$J_4, "load", this.$$d_$53_4);
        var $v_0 = $find("crmForm");
        if (!IsNull($v_0)) {
            var $v_1 = $v_0.GetTab(this.get_element(), false);
            if (!IsNull($v_1)) {
                var $v_2 = $find($v_1.id);
                if ($v_2.get_displayState() === "expanded") this.$1g_4();
                else $v_2.add_tabStateChange(this.$$d_$5k_4)
            } else this.$1g_4()
        } else if (IsNull(this.$1a_4) || this.$46_4(this.$1a_4.get_currentTabContent()) || parseInt(this.get_element().getAttribute("preload"), 10) === 1) this.$1g_4();
        else this.$1a_4.add_change(this.$$d_$6O_4)
    },
    $53_4: function ($p0) {
        var $v_0 = this.get_events().getHandler("ReadyStateComplete");
        if ($v_0) {
            var $v_1 = this.get_parent();
            !IsNull($v_1) && Mscrm.FormUIControl.isInstanceOfType($v_1) && $v_0(new Mscrm.IFrameUIControlWrapper($v_1), Sys.EventArgs.Empty)
        }
    }
};
Mscrm.LookupUIControl = function (control) {
    Mscrm.LookupUIControl.initializeBase(this, [control])
};
Mscrm.LookupUIControl.prototype = {
    addCustomView: function (viewGuid, entityName, viewDisplayName, fetchXml, layoutXml, isDefault) {
        this.get_$5_4().AddCustomView(viewGuid, entityName, viewDisplayName, fetchXml, layoutXml, isDefault)
    },
    getDefaultView: function () {
        return this.get_$5_4().get_defaultViewId()
    },
    setDefaultView: function (viewGuid) {
        this.get_$5_4().set_defaultViewId(viewGuid)
    }
};
Mscrm.OptionSetUIControl = function (control) {
    Mscrm.OptionSetUIControl.initializeBase(this, [control])
};
Mscrm.OptionSetUIControl.prototype = {
    addOption: function (option, placement) {
        this.get_$5_4().AddOption(option.text, option.value, null, placement)
    },
    clearOptions: function () {
        this.get_element().innerHTML = "";
        this.get_$5_4().AddOption("", "", null, 0)
    },
    removeOption: function (value) {
        this.get_$5_4().RemoveOption(value);
        this.get_$5_4().RemoveOption(value)
    }
};
Mscrm.PostBackUtil = function () {};
Mscrm.PostBackUtil.boolToStr = function (b) {
    return b ? "true" : "false"
};
Mscrm.PostBackUtil.createHiddenInput = function (name, value) {
    var $v_0 = document.createElement("INPUT");
    $v_0.name = name;
    $v_0.id = name;
    $v_0.type = "hidden";
    $v_0.value = value;
    var $v_1 = $get("crmFormSubmit");
    $v_1.appendChild($v_0);
    return $v_0
};
Mscrm.PostBackUtil.deleteInput = function (element) {
    var $v_0 = element.parentNode;
    !IsNull($v_0) && $v_0.removeChild(element)
};

function boolToStr(b) {
    return Mscrm.PostBackUtil.boolToStr(b)
}
function createHiddenInput(name, value) {
    return Mscrm.PostBackUtil.createHiddenInput(name, value)
}
function deleteInput(element) {
    Mscrm.PostBackUtil.deleteInput(element)
}
Mscrm.FormProxyForRibbon = function (element) {
    Mscrm.FormProxyForRibbon.initializeBase(this, [element])
};
Mscrm.FormProxyForRibbon.prototype = {
    get_ribbonContextType: function () {
        return this.get_crmFormControl().get_ribbonContextType()
    },
    get_ribbonRelationshipType: function () {
        return this.get_crmFormControl().get_ribbonRelationshipType()
    },
    get_entityTypeCode: function () {
        return this.get_crmFormControl().get_entityTypeCode()
    },
    get_entityTypeName: function () {
        return this.get_crmFormControl().get_entityTypeName()
    },
    get_selectedRecordCount: function () {
        return this.get_crmFormControl().get_selectedRecordCount()
    },
    get_recordCount: function () {
        return this.get_crmFormControl().get_recordCount()
    },
    get_selectedIds: function () {
        return this.get_crmFormControl().get_selectedIds()
    },
    get_allRecordIds: function () {
        return this.get_crmFormControl().get_allRecordIds()
    },
    get_selectedRecords: function () {
        return this.get_crmFormControl().get_selectedRecords()
    },
    get_allRecords: function () {
        return this.get_crmFormControl().get_allRecords()
    },
    get_unselectedIds: function () {
        return this.get_crmFormControl().get_unselectedIds()
    },
    get_unselectedRecords: function () {
        return this.get_crmFormControl().get_unselectedRecords()
    },
    getUnformattedValue: function (column) {
        return this.get_crmFormControl().getUnformattedValue(column)
    },
    verifyRecordPermission: function (permissionMask) {
        return this.get_crmFormControl().verifyRecordPermission(permissionMask)
    },
    $2j_3: null,
    get_crmFormControl: function () {
        if (!this.$2j_3) this.$2j_3 = window.parent.Sys.Application.findComponent("crmForm");
        return this.$2j_3
    }
};
Type.registerNamespace("Xrm");
Xrm.AttributeFormat = function () {};
Xrm.AttributeType = function () {};
Xrm.BooleanFormat = function () {};
Xrm.ControlType = function () {};
Xrm.ControlType.$54 = function ($p0) {
    switch ($p0) {
        case 1:
            return "hidden";
        case 2:
            return "iframe";
        case 3:
            return "lookup";
        case -1:
            return "none";
        case 4:
            return "optionset";
        case 0:
            return "standard";
        case 5:
            return "subgrid";
        case 6:
            return "webresource";
        case 8:
            return "notes";
        default:
            return null
    }
};
Xrm.FormSaveAction = function () {};
Xrm.RequiredLevel = function () {};
Xrm.RequiredLevel.fromLegacyValue = function (level) {
    switch (level) {
        case 0:
            return "none";
        case 1:
            return "recommended";
        case 2:
            return "required"
    }
    return "none"
};
Xrm.RequiredLevel.toLegacyValue = function (level) {
    switch (level) {
        case "none":
            return 0;
        case "recommended":
            return 1;
        case "required":
            return 2
    }
    return 0
};
Xrm.SubmitMode = function () {};
Xrm.TabDisplayState = function () {};
Mscrm.OptionSetItem.registerClass("Mscrm.OptionSetItem");
Mscrm.ClientApiConstants.registerClass("Mscrm.ClientApiConstants");
Mscrm.ClientApiCollection.registerClass("Mscrm.ClientApiCollection");
Mscrm.ClientApiEventHandlerList.registerClass("Mscrm.ClientApiEventHandlerList");
Mscrm.ClientApiUtility.registerClass("Mscrm.ClientApiUtility");
Mscrm.FormEventArgs.registerClass("Mscrm.FormEventArgs", Sys.EventArgs);
Mscrm.EntitySaveEventArgs.registerClass("Mscrm.EntitySaveEventArgs", Mscrm.FormEventArgs);
Mscrm.FormCloseEventArgs.registerClass("Mscrm.FormCloseEventArgs", Mscrm.FormEventArgs);
Mscrm.FormDataManager.registerClass("Mscrm.FormDataManager");
Mscrm.FormDataAttributePrivilege.registerClass("Mscrm.FormDataAttributePrivilege");
Mscrm.FormUIElement.registerClass("Mscrm.FormUIElement", Mscrm.CrmUIControl, Mscrm.IClientApiCollectionItem);
Mscrm.FormUIControl.registerClass("Mscrm.FormUIControl", Mscrm.FormUIElement, Mscrm.IFormUIControl);
Mscrm.FormUIFormSelector.registerClass("Mscrm.FormUIFormSelector", Sys.Component);
Mscrm.FormUIManager.registerClass("Mscrm.FormUIManager", Sys.Component);
Mscrm.FormUINavigationBar.registerClass("Mscrm.FormUINavigationBar", Sys.Component);
Mscrm.FormUINavigationBarItem.registerClass("Mscrm.FormUINavigationBarItem", null, Mscrm.IClientApiCollectionItem);
Mscrm.FormUIRuleForm.registerClass("Mscrm.FormUIRuleForm", null, Mscrm.IClientApiCollectionItem);
Mscrm.FormUISection.registerClass("Mscrm.FormUISection", Mscrm.FormUIElement);
Mscrm.FormUITab.registerClass("Mscrm.FormUITab", Mscrm.FormUIElement);
Mscrm.TabStateChangeEventArgs.registerClass("Mscrm.TabStateChangeEventArgs", Sys.EventArgs);
Mscrm.AttributeWrapper.registerClass("Mscrm.AttributeWrapper");
Mscrm.BooleanAttributeWrapper.registerClass("Mscrm.BooleanAttributeWrapper", Mscrm.AttributeWrapper);
Mscrm.FormUIElementWrapper.registerClass("Mscrm.FormUIElementWrapper");
Mscrm.UIControlWrapper.registerClass("Mscrm.UIControlWrapper", Mscrm.FormUIElementWrapper);
Mscrm.DataUIControlWrapper.registerClass("Mscrm.DataUIControlWrapper", Mscrm.UIControlWrapper);
Mscrm.OptionSetUIControlWrapper.registerClass("Mscrm.OptionSetUIControlWrapper", Mscrm.DataUIControlWrapper);
Mscrm.BooleanOptionSetUIControlWrapper.registerClass("Mscrm.BooleanOptionSetUIControlWrapper", Mscrm.OptionSetUIControlWrapper);
Mscrm.BooleanUIControlWrapper.registerClass("Mscrm.BooleanUIControlWrapper", Mscrm.DataUIControlWrapper);
Mscrm.EntityWrapper.registerClass("Mscrm.EntityWrapper");
Mscrm.FormSelectorWrapper.registerClass("Mscrm.FormSelectorWrapper");
Mscrm.IFrameUIControlWrapper.registerClass("Mscrm.IFrameUIControlWrapper", Mscrm.UIControlWrapper);
Mscrm.LookupUIControlWrapper.registerClass("Mscrm.LookupUIControlWrapper", Mscrm.DataUIControlWrapper);
Mscrm.OptionSetAttributeWrapper.registerClass("Mscrm.OptionSetAttributeWrapper", Mscrm.AttributeWrapper);
Mscrm.NavigationBarWrapper.registerClass("Mscrm.NavigationBarWrapper");
Mscrm.NumberAttributeWrapper.registerClass("Mscrm.NumberAttributeWrapper", Mscrm.AttributeWrapper);
Mscrm.SectionWrapper.registerClass("Mscrm.SectionWrapper", Mscrm.FormUIElementWrapper);
Mscrm.SubGridUIControlWrapper.registerClass("Mscrm.SubGridUIControlWrapper", Mscrm.UIControlWrapper);
Mscrm.TabWrapper.registerClass("Mscrm.TabWrapper", Mscrm.FormUIElementWrapper);
Mscrm.TextAttributeWrapper.registerClass("Mscrm.TextAttributeWrapper", Mscrm.AttributeWrapper);
Mscrm.WebResourceUIControlWrapper.registerClass("Mscrm.WebResourceUIControlWrapper", Mscrm.UIControlWrapper);
Mscrm.WebResourceObjectUIControlWrapper.registerClass("Mscrm.WebResourceObjectUIControlWrapper", Mscrm.WebResourceUIControlWrapper);
Mscrm.WebResourceDataUIControlWrapper.registerClass("Mscrm.WebResourceDataUIControlWrapper", Mscrm.WebResourceObjectUIControlWrapper);
Mscrm.DataSlug.registerClass("Mscrm.DataSlug", Mscrm.CrmUIControl);
Mscrm.FormDataControl.registerClass("Mscrm.FormDataControl", Mscrm.UIControl, Mscrm.IFormDataControl);
Mscrm.EmailBodyControl.registerClass("Mscrm.EmailBodyControl", Mscrm.FormDataControl);
Mscrm.HiddenFormDataControl.registerClass("Mscrm.HiddenFormDataControl", Mscrm.FormDataControl);
Mscrm.NotesControl.registerClass("Mscrm.NotesControl", Mscrm.UIControl);
Mscrm.SlugSupport.registerClass("Mscrm.SlugSupport", Mscrm.CrmUIBehavior);
Mscrm.Association.registerClass("Mscrm.Association");
Mscrm.FormDataAttribute.registerClass("Mscrm.FormDataAttribute", Sys.Component, Mscrm.IClientApiCollectionItem, Mscrm.ISerializableFormData);
Mscrm.BooleanAttribute.registerClass("Mscrm.BooleanAttribute", Mscrm.FormDataAttribute);
Mscrm.DateTimeAttribute.registerClass("Mscrm.DateTimeAttribute", Mscrm.FormDataAttribute);
Mscrm.TextAttribute.registerClass("Mscrm.TextAttribute", Mscrm.FormDataAttribute);
Mscrm.EmailAddressAttribute.registerClass("Mscrm.EmailAddressAttribute", Mscrm.TextAttribute);
Mscrm.EmailBodyAttribute.registerClass("Mscrm.EmailBodyAttribute", Mscrm.FormDataAttribute);
Mscrm.FormDataEntity.registerClass("Mscrm.FormDataEntity", Sys.Component);
Mscrm.HtcProxyFormData.registerClass("Mscrm.HtcProxyFormData", null, Mscrm.ISerializableFormData);
Mscrm.LookupAttribute.registerClass("Mscrm.LookupAttribute", Mscrm.FormDataAttribute);
Mscrm.InlineFormDataLookupAttribute.registerClass("Mscrm.InlineFormDataLookupAttribute", Mscrm.LookupAttribute);
Mscrm.InlineFormDataRelatedCasesLookupAttribute.registerClass("Mscrm.InlineFormDataRelatedCasesLookupAttribute", Mscrm.InlineFormDataLookupAttribute);
Mscrm.NumberAttribute.registerClass("Mscrm.NumberAttribute", Mscrm.FormDataAttribute);
Mscrm.OptionSetAttribute.registerClass("Mscrm.OptionSetAttribute", Mscrm.FormDataAttribute);
Mscrm.RemainderData.registerClass("Mscrm.RemainderData", null, Mscrm.ISerializableFormData);
Mscrm.TickerAttribute.registerClass("Mscrm.TickerAttribute", Mscrm.TextAttribute);
Mscrm.UrlAttribute.registerClass("Mscrm.UrlAttribute", Mscrm.TextAttribute);
Mscrm.ValidationEventArgs.registerClass("Mscrm.ValidationEventArgs", Sys.EventArgs);
Mscrm.FormAction.registerClass("Mscrm.FormAction");
Mscrm.FormControl.registerClass("Mscrm.FormControl", Mscrm.CrmUIControl, Mscrm.IRibbonSelectionControl, Mscrm.IDataControl);
Mscrm.FormNavControl.registerClass("Mscrm.FormNavControl", Mscrm.CrmUIControl);
Mscrm.FormSelector.registerClass("Mscrm.FormSelector", Mscrm.CrmUIControl);
Mscrm.FormUtility.registerClass("Mscrm.FormUtility");
Mscrm.ExecutionContext.registerClass("Mscrm.ExecutionContext");
Mscrm.FormIFrameControl.registerClass("Mscrm.FormIFrameControl", Mscrm.UIControl);
Mscrm.LookupUIControl.registerClass("Mscrm.LookupUIControl", Mscrm.FormDataControl);
Mscrm.OptionSetUIControl.registerClass("Mscrm.OptionSetUIControl", Mscrm.FormDataControl);
Mscrm.PostBackUtil.registerClass("Mscrm.PostBackUtil");
Mscrm.FormProxyForRibbon.registerClass("Mscrm.FormProxyForRibbon", Mscrm.CrmUIControl, Mscrm.IRibbonSelectionControl, Mscrm.IDataControl);
Xrm.AttributeFormat.registerClass("Xrm.AttributeFormat");
Xrm.AttributeType.registerClass("Xrm.AttributeType");
Xrm.BooleanFormat.registerClass("Xrm.BooleanFormat");
Xrm.ControlType.registerClass("Xrm.ControlType");
Xrm.FormSaveAction.registerClass("Xrm.FormSaveAction");
Xrm.RequiredLevel.registerClass("Xrm.RequiredLevel");
Xrm.SubmitMode.registerClass("Xrm.SubmitMode");
Xrm.TabDisplayState.registerClass("Xrm.TabDisplayState");
Mscrm.ClientApiConstants.attributeIdPrefix = "Attribute_";
Mscrm.ClientApiConstants.primaryEntityId = "PrimaryEntity";
Mscrm.ClientApiUtility.$$cctor();
Mscrm.FormUIControl.$2e = null;
Mscrm.BooleanAttribute.$32 = [false, true];
Mscrm.EmailAddressAttribute.$3A = new RegExp('^[^@\\s\\"<>)(\\[\\]:;,]+@[^@\\s\\"<>)(\\[\\]:;,]+$');
Mscrm.FormDataAttribute.sortableDateTimeLength = 19;
Mscrm.FormControl.$2d = -2;
Mscrm.FormControl.$1H = -1;
Xrm.AttributeFormat.dateFormat = "date";
Xrm.AttributeFormat.dateTimeFormat = "datetime";
Xrm.AttributeFormat.durationFormat = "duration";
Xrm.AttributeFormat.emailFormat = "email";
Xrm.AttributeFormat.languageFormat = "language";
Xrm.AttributeFormat.noneFormat = "none";
Xrm.AttributeFormat.textFormat = "text";
Xrm.AttributeFormat.textAreaFormat = "textarea";
Xrm.AttributeFormat.tickerSymbolFormat = "tickersymbol";
Xrm.AttributeFormat.timeZoneFormat = "timezone";
Xrm.AttributeFormat.urlFormat = "url";
Xrm.AttributeType.booleanType = "boolean";
Xrm.AttributeType.dateTimeType = "datetime";
Xrm.AttributeType.decimalType = "decimal";
Xrm.AttributeType.doubleType = "double";
Xrm.AttributeType.integerType = "integer";
Xrm.AttributeType.lookupType = "lookup";
Xrm.AttributeType.memoType = "memo";
Xrm.AttributeType.moneyType = "money";
Xrm.AttributeType.optionSetType = "optionset";
Xrm.AttributeType.stringType = "string";
Xrm.BooleanFormat.checkBox = "checkbox";
Xrm.BooleanFormat.dropDown = "dropdown";
Xrm.BooleanFormat.radioButton = "radiobutton";
Xrm.ControlType.hidden = "hidden";
Xrm.ControlType.iFrame = "iframe";
Xrm.ControlType.lookup = "lookup";
Xrm.ControlType.none = "none";
Xrm.ControlType.optionSet = "optionset";
Xrm.ControlType.standard = "standard";
Xrm.ControlType.subGrid = "subgrid";
Xrm.ControlType.webResource = "webresource";
Xrm.ControlType.notes = "notes";
Xrm.FormSaveAction.save = "save";
Xrm.FormSaveAction.saveAndClose = "saveandclose";
Xrm.FormSaveAction.saveAndNew = "saveandnew";
Xrm.RequiredLevel.none = "none";
Xrm.RequiredLevel.recommended = "recommended";
Xrm.RequiredLevel.required = "required";
Xrm.SubmitMode.dirty = "dirty";
Xrm.SubmitMode.always = "always";
Xrm.SubmitMode.never = "never";
Xrm.TabDisplayState.collapsed = "collapsed";
Xrm.TabDisplayState.expanded = "expanded"