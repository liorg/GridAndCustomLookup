Type.registerNamespace("Mscrm");
Mscrm.ClickEvent = function () { };
Mscrm.ClickEvent.prototype = {
    processMenuitemClick: 0,
    processOkClick: 1,
    processCancelClick: 2
};
Mscrm.ClickEvent.registerEnum("Mscrm.ClickEvent", false);
Mscrm.BaseFetchXmlProcessor = function (elements, fetchXml) {
    this.$1D_0 = {};
    this.$1E_0 = {};
    this.$c_0 = fetchXml;
    for (var $v_0, $v_1, $v_2, $v_3, $v_4, $v_5 = "", $v_6, $v_7, $v_8 = 0; $v_8 < elements.length; $v_8++) {
        $v_7 = elements[$v_8];
        $v_0 = $v_7.getAttribute("attributename");
        $v_4 = $v_7.getAttribute("attributetype");
        $v_3 = $v_7.getAttribute("entityname");
        $v_1 = $v_7.getAttribute("attributeformat");
        $v_6 = $v_7.getAttribute("isfromrelatedentity").toLowerCase() === "true" ? true : false;
        if ($v_6) {
            $v_2 = $v_7.getAttribute("columnname");
            $v_5 = $v_7.getAttribute("linkedEntityDetails")
        } else $v_2 = $v_0;
        var $v_9 = new Mscrm.FilterConditionCollection($v_0, $v_4, $v_6, $v_3, $v_1);
        $v_9.$i_0 = $v_5;
        this.$1D_0[$v_2] = $v_9;
        this.$1E_0[$v_0] = $v_0;
        var $v_A = this.$2Z_0($v_7);
        if (!IsNull($v_A) && $v_A !== $v_0) this.$1E_0[$v_A] = $v_0
    }
};
Mscrm.BaseFetchXmlProcessor.sanitizeFetchXmlFilters = function (filterNodeXml) {
    if (!IsNull(filterNodeXml)) {
        Mscrm.BaseFetchXmlProcessor.$2A(filterNodeXml, null);
        Mscrm.BaseFetchXmlProcessor.$3D(filterNodeXml)
    }
};
Mscrm.BaseFetchXmlProcessor.$3D = function ($p0) {
    var $v_0 = null,
        $v_1 = true,
        $v_2 = null,
        $v_3, $v_4;
    while ($v_1) {
        $v_1 = false;
        $v_0 = XUI.Xml.SelectNodes($p0, ".//filter", null);
        if (!IsNull($v_0)) for (var $v_5 = $v_0.length, $v_6 = 0; $v_6 < $v_5; $v_6++) if ($v_0[$v_6].childNodes.length === 1) {
            $v_2 = XUI.Xml.SelectNodes($v_0[$v_6], "condition", null);
            if (!IsNull($v_2) && $v_2.length === 1) {
                $v_3 = $v_0[$v_6];
                if ($v_3.parentNode.nodeName === "filter") {
                    $v_4 = $v_2[0];
                    $v_3.parentNode.appendChild($v_4);
                    $v_3.parentNode.removeChild($v_3);
                    $v_1 = true
                }
            }
        } else if (!$v_0[$v_6].childNodes.length) {
            $v_3 = $v_0[$v_6];
            $v_3.parentNode.removeChild($v_3);
            $v_1 = true
        }
    }
};
Mscrm.BaseFetchXmlProcessor.$2A = function ($p0, $p1) {
    for (var $v_0 = XUI.Xml.SelectNodes($p0, "filter", null), $v_1 = 0; $v_1 < $v_0.length; $v_1++) Mscrm.BaseFetchXmlProcessor.$2A($v_0[$v_1], $p0);
    if (!IsNull($p1)) {
        var $v_2 = "and",
            $v_3 = "and";
        if (!IsNull($p0.attributes.getNamedItem("type"))) $v_2 = XUI.Xml.GetText($p0.attributes.getNamedItem("type"));
        if (!IsNull($p1.attributes.getNamedItem("type"))) $v_3 = XUI.Xml.GetText($p1.attributes.getNamedItem("type"));
        if ($v_2.toUpperCase() === $v_3.toUpperCase()) {
            for (var $v_4 = $p0, $v_5 = $p0.childNodes.length - 1; $v_5 >= 0; $v_5--) {
                var $v_6 = $p0.childNodes[$v_5];
                $p1.insertBefore($v_6, $v_4);
                $v_4 = $v_6
            }
            $p0.parentNode.removeChild($p0)
        }
    }
};
Mscrm.BaseFetchXmlProcessor.prototype = {
    $1D_0: null,
    $1E_0: null,
    $M_0: null,
    $c_0: null,
    process: function () {
        var $v_0 = XUI.Xml.SelectSingleNode(this.$c_0, "/fetch/entity", null);
        this.$M_0 = XUI.Xml.GetText($v_0.attributes.getNamedItem("name"));
        var $v_1 = XUI.Xml.SelectSingleNode($v_0, "filter", null);
        Mscrm.BaseFetchXmlProcessor.sanitizeFetchXmlFilters($v_1);
        this.$1j_0($v_1, false, "");
        for (var $v_2 = XUI.Xml.SelectNodes($v_0, "link-entity", null), $v_3 = 0; $v_3 < $v_2.length; $v_3++) this.$3P_0($v_2[$v_3]);
        return this.$1D_0
    },
    $3P_0: function ($p0) {
        var $v_0 = $p0.attributes.getNamedItem("alias");
        if (IsNull($v_0)) return;
        for (var $v_1 = XUI.Xml.SelectNodes($p0, "filter", null), $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            Mscrm.BaseFetchXmlProcessor.sanitizeFetchXmlFilters($v_1[$v_2]);
            this.$1j_0($v_1[$v_2], false, XUI.Xml.GetText($v_0))
        }
    },
    $1j_0: function ($p0, $p1, $p2) {
        if (IsNull($p0)) return;
        var $v_0 = XUI.Xml.SelectNodes($p0, "filter", null),
            $v_1 = XUI.Xml.SelectNodes($p0, "condition", null),
            $v_2 = Mscrm.GridFilterUtil.createUniqueId(),
            $v_3 = $p0.ownerDocument.createAttribute("gridfilterid");
        $v_3.value = $v_2;
        $p0.attributes.setNamedItem($v_3);
        var $v_4 = true,
            $v_5 = XUI.Xml.GetText($p0.attributes.getNamedItem("type"));
        if (!$p1) if ($v_5.toLowerCase() === "or") {
            if (!IsNull(XUI.Xml.SelectSingleNode($p0, ".//filter", null))) $p1 = true;
            else if ($v_1.length > 1) if (this.canAddMultiSelectConditions($v_1, $p2)) {
                var $v_6 = this.$2Y_0($v_1, $p0.ownerDocument);
                $v_2 = this.$3H_0($p0, $v_6, $v_2);
                this.$2V_0($v_6, $v_2, $p2);
                $v_4 = false
            } else if (this.canAddUnaryDateConditions($v_1, $p2)) {
                this.$2U_0($v_1, $v_2, $p2);
                $v_4 = false
            } else if (this.$1q_0($v_1)) {
                this.populateCustomFilters($v_1, $v_2, $p2, 2);
                $v_4 = false
            } else $p1 = true
        } else if ($v_1.length > 1 && this.$1q_0($v_1)) {
            this.populateCustomFilters($v_1, $v_2, $p2, 1);
            $v_4 = false
        }
        for (var $v_7 = 0; $v_7 < $v_0.length; $v_7++) this.$1j_0($v_0[$v_7], $p1, $p2);
        $v_4 && this.$3O_0($p0, $p1, $p2, $v_1, $v_2, $v_5)
    },
    $3O_0: function ($p0, $p1, $p2, $p3, $p4, $p5) {
        for (var $v_0 = null, $v_1 = "", $v_2 = null, $v_3 = 0; $v_3 < $p3.length; $v_3++) {
            $v_2 = $p3[$v_3];
            $v_1 = XUI.Xml.GetText($v_2.attributes.getNamedItem("attribute"));
            $v_0 = this.$f_0($v_1, $p2);
            if (IsNull($v_0)) continue;
            if ($p1) {
                this.$1Q_0($v_0);
                continue
            }
            if ($v_0.$V_0) continue;
            var $v_4 = this.$19_0($v_2, $p1, $p4, $p2),
                $v_5 = this.tryAddConditionsToFilterConditionCollection($v_0, $v_4, $p5, $p0);
            if (!$v_5) {
                this.$1Q_0($v_0);
                $v_2.attributes.removeNamedItem("gridfilterconditionid")
            }
        }
    },
    $19_0: function ($p0, $p1, $p2, $p3) {
        var $v_0 = XUI.Xml.GetText($p0.attributes.getNamedItem("attribute")),
            $v_1 = this.$f_0($v_0, $p3),
            $v_2 = $v_1.$Z_0,
            $v_3 = XUI.Xml.GetText($p0.attributes.getNamedItem("operator")),
            $v_4 = new Sys.StringBuilder,
            $v_5 = null;
        if (isValueBoundOperator($v_3)) if (this.$1f_0($v_2) && isMultiSelectOperator($v_3)) {
            var $v_A = $p0.childNodes;
            if (!IsNull($v_A) && $v_A.length > 0) this.$1v_0($v_A, $v_4);
            else {
                $v_4.append("<values><value");
                if (!IsNull($p0.attributes.getNamedItem("uiname"))) {
                    $v_4.append(' uiname="');
                    $v_4.append(XUI.Xml.GetText($p0.attributes.getNamedItem("uiname")));
                    $v_4.append('"');
                    $v_4.append(' uitype ="');
                    $v_4.append(XUI.Xml.GetText($p0.attributes.getNamedItem("uitype")));
                    $v_4.append('"')
                }
                $v_4.append(">");
                $v_4.append(XUI.Xml.GetText($p0.attributes.getNamedItem("value")));
                $v_4.append("</value>");
                $v_4.append("</values>")
            }
            $v_3 = getMultiSelectOperator($v_3);
            $v_5 = $v_4.toString()
        } else {
            if (isMultiSelectDateOperator($v_3)) {
                var $v_B = $p0.childNodes;
                !IsNull($v_B) && $v_B.length > 0 && this.$1v_0($v_B, $v_4)
            } else {
                var $v_C = $p0.attributes.getNamedItem("value");
                $v_4.append(IsNull($v_C) ? "" : XUI.Xml.GetText($v_C))
            }
            $v_5 = $v_4.toString();
            $v_5 = isNullOrEmptyString($v_5) ? null : $v_5
        }
        var $v_6 = Mscrm.GridFilterUtil.createUniqueId(),
            $v_7 = $p0.ownerDocument.createAttribute("gridfilterconditionid");
        $v_7.value = $v_6;
        $p0.attributes.setNamedItem($v_7);
        var $v_8 = new Sys.StringBuilder;
        $v_8.append('/fetch//filter[@gridfilterid="');
        $v_8.append($p2);
        $v_8.append('"]/condition[@gridfilterconditionid="');
        $v_8.append($v_6);
        $v_8.append('"]');
        var $v_9 = new Mscrm.FilterCondition(isValueBoundOperator($v_3) ? 2 : 1, $v_3, $v_5, true, $v_8.toString());
        if ($v_0 !== this.$1c_0($v_0)) $v_9.$H_0 = $v_0;
        return $v_9
    },
    $1v_0: function ($p0, $p1) {
        $p1.append("<values>");
        for (var $v_0 = 0; $v_0 < $p0.length; $v_0++) $p1.append(XUI.Xml.XMLSerializer.serializeToString($p0[$v_0]));
        $p1.append("</values>")
    },
    populateCustomFilters: function (siblings, parentFilterId, alias, customFiltersOperator) {
        var $v_0 = XUI.Xml.GetText(siblings[0].attributes.getNamedItem("attribute")),
            $v_1 = this.$f_0($v_0, alias);
        if (IsNull($v_1)) return;
        if ($v_1.$V_0) return;
        if (!IsNull($v_1.$0_0) || $v_1.$1_0.length) {
            this.$1Q_0($v_1);
            return
        }
        var $v_2 = this.$19_0(siblings[0], false, parentFilterId, alias),
            $v_3 = this.$19_0(siblings[1], false, parentFilterId, alias);
        $v_1.$0_0 = new Mscrm.CustomFilterConditionGroup($v_2, $v_3, customFiltersOperator)
    },
    tryAddConditionsToFilterConditionCollection: function (fcc, condition, filterType, filterNode) {
        var $v_0 = getAbstractDataType(fcc.$Z_0),
            $v_1 = filterType.toLowerCase() === "or" ? 2 : 1,
            $v_2 = fcc.getCustomFilterConditionsCount(),
            $v_3 = fcc.getOrdinaryFilterConditionsCount();
        if (!$v_2 && !$v_3) if (this.checkForAdditionToOrdinaryFilterGroup(condition, $v_0)) Array.add(fcc.$1_0, condition);
        else fcc.$0_0 = new Mscrm.CustomFilterConditionGroup(condition, null, $v_1);
        else if (!$v_2 && $v_3 === 1 && this.$1g_0(filterNode, fcc.$1_0[0])) {
            fcc.$0_0 = new Mscrm.CustomFilterConditionGroup(condition, fcc.$1_0[0], $v_1);
            Array.removeAt(fcc.$1_0, 0)
        } else if ($v_2 === 1 && !$v_3) if (IsNull(fcc.$0_0.$3_0) && this.$1g_0(filterNode, fcc.$0_0.$4_0)) fcc.$0_0.$3_0 = condition;
        else if (IsNull(fcc.$0_0.$4_0) && this.$1g_0(filterNode, fcc.$0_0.$3_0)) fcc.$0_0.$4_0 = condition;
        else return false;
        else return false;
        return true
    },
    $1g_0: function ($p0, $p1) {
        if (isNullOrEmptyString($p1.$6_0)) return true;
        var $v_0 = $p0.ownerDocument;
        if ($p0 === XUI.Xml.SelectSingleNode($v_0, $p1.$6_0, null).parentNode) return true;
        return false
    },
    $1q_0: function ($p0) {
        return $p0.length === 2 && this.$20_0($p0[0]) === this.$20_0($p0[1])
    },
    canAddMultiSelectConditions: function (conditionNodeList, alias) {
        var $v_0 = conditionNodeList[0],
            $v_1 = [];
        Array.add($v_1, "eq");
        Array.add($v_1, "in");
        if (!Array.contains($v_1, XUI.Xml.GetText($v_0.attributes.getNamedItem("operator")))) return false;
        for (var $v_5 = 1; $v_5 < conditionNodeList.length; $v_5++) if (XUI.Xml.GetText(conditionNodeList[$v_5].attributes.getNamedItem("attribute")) !== XUI.Xml.GetText($v_0.attributes.getNamedItem("attribute")) || !Array.contains($v_1, XUI.Xml.GetText(conditionNodeList[$v_5].attributes.getNamedItem("operator")))) return false;
        var $v_2 = XUI.Xml.GetText(conditionNodeList[0].attributes.getNamedItem("attribute")),
            $v_3 = this.$f_0($v_2, alias);
        if (IsNull($v_3)) return false;
        var $v_4 = getAbstractDataType($v_3.$Z_0);
        if (!this.$1f_0($v_4)) return false;
        return true
    },
    canAddUnaryDateConditions: function (conditionNodeList, alias) {
        var $v_0 = conditionNodeList[0],
            $v_1 = XUI.Xml.GetText($v_0.attributes.getNamedItem("operator"));
        if (!isUnaryDateTypeFilterOperator($v_1)) return false;
        for (var $v_2 = getDateFilterGroup($v_1), $v_6 = 1; $v_6 < conditionNodeList.length; $v_6++) if (XUI.Xml.GetText(conditionNodeList[$v_6].attributes.getNamedItem("attribute")) !== XUI.Xml.GetText($v_0.attributes.getNamedItem("attribute"))) return false;
        else $v_0 = conditionNodeList[$v_6];
        var $v_3 = XUI.Xml.GetText(conditionNodeList[0].attributes.getNamedItem("attribute")),
            $v_4 = this.$f_0($v_3, alias);
        if (IsNull($v_4)) return false;
        var $v_5 = getAbstractDataType($v_4.$Z_0);
        if (!($v_5.toLowerCase() === "date")) return false;
        return true
    },
    $2U_0: function ($p0, $p1, $p2) {
        var $v_0 = XUI.Xml.GetText($p0[0].attributes.getNamedItem("attribute"));
        if (this.$1r_0($v_0, $p2)) for (var $v_1 = this.$f_0($v_0, $p2), $v_2 = 0; $v_2 < $p0.length; $v_2++) {
            var $v_3 = this.$19_0($p0[$v_2], false, $p1, $p2);
            Array.add($v_1.$1_0, $v_3)
        }
    },
    $2V_0: function ($p0, $p1, $p2) {
        var $v_0 = XUI.Xml.GetText($p0.attributes.getNamedItem("attribute"));
        if (this.$1r_0($v_0, $p2)) {
            var $v_1 = this.$f_0($v_0, $p2),
                $v_2 = this.$19_0($p0, false, $p1, $p2);
            Array.add($v_1.$1_0, $v_2)
        }
    },
    $1r_0: function ($p0, $p1) {
        var $v_0 = this.$f_0($p0, $p1);
        if (IsNull($v_0) || $v_0.$V_0) return false;
        var $v_1 = $v_0.getCustomFilterConditionsCount(),
            $v_2 = $v_0.getOrdinaryFilterConditionsCount();
        if ($v_2 + $v_1) {
            this.$1Q_0($v_0);
            return false
        }
        return true
    },
    $f_0: function ($p0, $p1) {
        $p0 = this.$1c_0($p0);
        var $v_0 = (IsNull($p1) || $p1 === "" ? "" : $p1 + ".") + $p0,
            $v_1 = this.$1D_0[$v_0];
        return $v_1
    },
    $2Y_0: function ($p0, $p1) {
        var $v_0 = $p1.createElement("condition"),
            $v_1 = $p1.createAttribute("attribute");
        $v_1.value = XUI.Xml.GetText($p0[0].attributes.getNamedItem("attribute"));
        $v_0.attributes.setNamedItem($v_1);
        var $v_2 = $p1.createAttribute("operator");
        $v_2.value = "in";
        $v_0.attributes.setNamedItem($v_2);
        for (var $v_3 = 0; $v_3 < $p0.length; $v_3++) {
            var $v_4 = $p0[$v_3];
            if ($v_4.hasChildNodes()) for (var $v_5 = 0; $v_5 < $v_4.childNodes.length; $v_5++) $v_0.appendChild($v_4.childNodes[$v_5].cloneNode(true));
            else {
                var $v_6 = $p1.createElement("value");
                if (!IsNull($v_4.attributes.getNamedItem("uiname"))) {
                    $v_6.attributes.setNamedItem($v_4.attributes.getNamedItem("uiname").cloneNode(true));
                    $v_6.attributes.setNamedItem($v_4.attributes.getNamedItem("uitype").cloneNode(true))
                }
                XUI.Xml.SetText($v_6, XUI.Xml.GetText($v_4.attributes.getNamedItem("value")));
                $v_0.appendChild($v_6)
            }
        }
        return $v_0
    },
    $3H_0: function ($p0, $p1, $p2) {
        var $v_0 = null;
        if (Mscrm.GridFilterUtil.hasParentFilterNode($p0)) {
            $p0.parentNode.appendChild($p1);
            $v_0 = XUI.Xml.GetText($p0.parentNode.attributes.getNamedItem("gridfilterid"));
            $p0.parentNode.removeChild($p0)
        } else {
            var $v_1 = XUI.Xml.GetText($p0.attributes.getNamedItem("type"));
            if ($v_1.toLowerCase() === "or") {
                var $v_2 = $p0.ownerDocument.createAttribute("operator");
                $v_2.value = "and";
                $p0.attributes.setNamedItem($v_2)
            }
            $v_0 = $p2
        }
        return $v_0
    },
    $1Q_0: function ($p0) {
        $p0.$V_0 = true;
        Array.clear($p0.$1_0);
        $p0.$0_0 = null
    },
    $1f_0: function ($p0) {
        $p0 = getAbstractDataType($p0).toLowerCase();
        return $p0 === "picklist" || $p0 === "lookup" || $p0 === "owner"
    },
    checkForAdditionToOrdinaryFilterGroup: function (condition, attributeType) {
        var $v_0 = condition.$2_0.toLowerCase();
        return $v_0 === "null" || $v_0 === "not-null" || isUnaryDateTypeFilterOperator($v_0) || ($v_0 === "eq" || $v_0 === "in") && this.$1f_0(attributeType)
    },
    $2Z_0: function ($p0) {
        var $v_0 = Mscrm.GridFilterUtil.getAttributeXml($p0);
        if (!IsNull($v_0)) {
            var $v_1 = XUI.Xml.LoadXml($v_0),
                $v_2 = XUI.Xml.SelectSingleNode($v_1, "/attributeinfo/result", null),
                $v_3 = $v_2.attributes.getNamedItem("nameattr");
            if (!IsNull($v_3)) return $v_3.nodeValue
        }
        return null
    },
    $20_0: function ($p0) {
        var $v_0 = $p0.attributes.getNamedItem("attribute");
        if (IsNull($v_0)) return null;
        else return this.$1c_0(XUI.Xml.GetText($v_0))
    },
    $1c_0: function ($p0) {
        var $v_0 = this.$1E_0[$p0];
        if (isNullOrEmptyString($v_0)) return $p0;
        else return $v_0
    }
};
Mscrm.OutlookFetchXmlProcessor = function (elements, fetchXml) {
    Mscrm.OutlookFetchXmlProcessor.initializeBase(this, [elements, fetchXml])
};
Mscrm.OutlookFetchXmlProcessor.prototype = {
    checkForAdditionToOrdinaryFilterGroup: function (condition, attributeType) {
        return false
    },
    canAddMultiSelectConditions: function (conditionNodeList, alias) {
        return false
    },
    canAddUnaryDateConditions: function (conditionNodeList, alias) {
        return false
    }
};
Mscrm.WebFetchXmlProcessor = function (elements, fetchXml) {
    Mscrm.WebFetchXmlProcessor.initializeBase(this, [elements, fetchXml])
};

function getAbstractDataType(type) {
    switch (type) {
        case "nvarchar":
        case "text":
        case "string":
            return "string";
        case "ntext":
        case "memo":
            return "memo";
        case "bit":
        case "boolean":
        case "state":
        case "status":
        case "language":
        case "picklist":
            return "picklist";
        case "partylist":
        case "primarykey":
        case "lookup":
        case "customer":
            return "lookup";
        case "owner":
            return "owner";
        case "decimal":
        case "integer":
        case "int":
        case "float":
        case "money":
        case "number":
            return "number";
        case "datetime":
        case "date":
        case "time":
            return "date";
        default:
            return type
    }
}
function getLabelForOperator(oper) {
    switch (oper) {
        case "eq":
            return window.LOCID_AF_EQUALS;
        case "ne":
            return window.LOCID_AF_DOESNOTEQUAL;
        case "contains":
            return window.LOCID_AF_CONTAINS;
        case "doesnotcontain":
            return window.LOCID_AF_DOESNOTCONTAIN;
        case "beginswith":
            return window.LOCID_AF_BEGINSWITH;
        case "doesnotbeginwith":
            return window.LOCID_AF_DOESNOTBEGINWITH;
        case "endswith":
            return window.LOCID_AF_ENDSWITH;
        case "doesnotendwith":
            return window.LOCID_AF_DOESNOTENDWITH;
        case "not-null":
            return window.LOCID_AF_CONTAINSDATA;
        case "null":
            return window.LOCID_AF_DOESNOTCONTAINDATA;
        case "gt":
            return window.LOCID_AF_ISGREATERTHAN;
        case "ge":
            return window.LOCID_AF_ISGREATERTHANOREQUALTO;
        case "lt":
            return window.LOCID_AF_ISLESSTHAN;
        case "le":
            return window.LOCID_AF_ISLESSTHANOREQUALTO;
        case "in":
            return window.LOCID_AF_IN;
        case "not-in":
        case "notin":
            return window.LOCID_AF_NOTIN;
        case "on":
            return window.LOCID_AF_ON;
        case "not-on":
            return window.LOCID_AF_NOTON;
        case "after":
            return window.LOCID_AF_AFTER;
        case "on-or-after":
            return window.LOCID_AF_ONORAFTER;
        case "before":
            return window.LOCID_AF_BEFORE;
        case "on-or-before":
            return window.LOCID_AF_ONORBEFORE;
        case "yesterday":
            return window.LOCID_AF_YESTERDAY;
        case "today":
            return window.LOCID_AF_TODAY;
        case "tomorrow":
            return window.LOCID_AF_TOMORROW;
        case "next-seven-days":
            return window.LOCID_AF_INTHENEXT7DAYS;
        case "last-seven-days":
            return window.LOCID_AF_INTHELAST7DAYS;
        case "next-week":
            return window.LOCID_AF_NEXTWEEK;
        case "last-week":
            return window.LOCID_AF_LASTWEEK;
        case "this-week":
            return window.LOCID_AF_THISWEEK;
        case "next-month":
            return window.LOCID_AF_NEXTMONTH;
        case "last-month":
            return window.LOCID_AF_LASTMONTH;
        case "this-month":
            return window.LOCID_AF_THISMONTH;
        case "next-year":
            return window.LOCID_AF_NEXTYEAR;
        case "last-year":
            return window.LOCID_AF_LASTYEAR;
        case "this-year":
            return window.LOCID_AF_THISYEAR;
        case "anytime":
            return window.LOCID_AF_ANYTIME;
        case "eq-userid":
            return window.LOCID_AF_EQUALSCURRENTUSER;
        case "ne-userid":
            return window.LOCID_AF_DOESNOTEQUALCURRENTUSER;
        case "eq-userteams":
            return window.LOCID_AF_EQUALSCURRENTUSERTEAMS;
        case "last-x-hours":
            return window.LOCID_AF_LASTXHOURS;
        case "next-x-hours":
            return window.LOCID_AF_NEXTXHOURS;
        case "last-x-days":
            return window.LOCID_AF_LASTXDAYS;
        case "next-x-days":
            return window.LOCID_AF_NEXTXDAYS;
        case "last-x-weeks":
            return window.LOCID_AF_LASTXWEEKS;
        case "next-x-weeks":
            return window.LOCID_AF_NEXTXWEEKS;
        case "last-x-months":
            return window.LOCID_AF_LASTXMONTHS;
        case "next-x-months":
            return window.LOCID_AF_NEXTXMONTHS;
        case "last-x-years":
            return window.LOCID_AF_LASTXYEARS;
        case "next-x-years":
            return window.LOCID_AF_NEXTXYEARS;
        case "eq-userlanguage":
            return window.LOCID_AF_EQUSERLANGUAGE;
        case "olderthan-x-months":
            return window.LOCID_AF_OLDERTHANXMONTHS;
        case "in-fiscal-year":
            return window.LOCID_AF_INFISCALYEAR;
        case "in-fiscal-period":
            return window.LOCID_AF_INFISCALPERIOD;
        case "in-fiscal-period-and-year":
            return window.LOCID_AF_INFISCALPERIODANDYEAR;
        case "in-or-after-fiscal-period-and-year":
            return window.LOCID_AF_INORAFTERFISCALPERIOD;
        case "in-or-before-fiscal-period-and-year":
            return window.LOCID_AF_INORBEFOREFISCALPERIOD;
        case "last-fiscal-year":
            return window.LOCID_AF_LASTFISCALYEAR;
        case "this-fiscal-year":
            return window.LOCID_AF_THISFISCALYEAR;
        case "next-fiscal-year":
            return window.LOCID_AF_NEXTFISCALYEAR;
        case "last-x-fiscal-years":
            return window.LOCID_AF_LASTXFISCALYEARS;
        case "next-x-fiscal-years":
            return window.LOCID_AF_NEXTXFISCALYEARS;
        case "last-fiscal-period":
            return window.LOCID_AF_LASTFISCALPERIOD;
        case "this-fiscal-period":
            return window.LOCID_AF_THISFISCALPERIOD;
        case "next-fiscal-period":
            return window.LOCID_AF_NEXTFISCALPERIOD;
        case "last-x-fiscal-periods":
            return window.LOCID_AF_LASTXFISCALPERIODS;
        case "next-x-fiscal-periods":
            return window.LOCID_AF_NEXTXFISCALPERIODS;
        case "nop":
            return window.LOCID_GF_SELECTITEM
    }
    return null
}
function getParameterizedLabelForDynamicOperator(oper) {
    switch (oper) {
        case "last-x-hours":
            return window.LOCID_GF_LASTXHOURS;
        case "next-x-hours":
            return window.LOCID_GF_NEXTXHOURS;
        case "last-x-days":
            return window.LOCID_GF_LASTXDAYS;
        case "next-x-days":
            return window.LOCID_GF_NEXTXDAYS;
        case "last-x-weeks":
            return window.LOCID_GF_LASTXWEEKS;
        case "next-x-weeks":
            return window.LOCID_GF_NEXTXWEEKS;
        case "last-x-months":
            return window.LOCID_GF_LASTXMONTHS;
        case "next-x-months":
            return window.LOCID_GF_NEXTXMONTHS;
        case "last-x-years":
            return window.LOCID_GF_LASTXYEARS;
        case "next-x-years":
            return window.LOCID_GF_NEXTXYEARS;
        case "olderthan-x-months":
            return window.LOCID_GF_OLDERTHANXMONTHS;
        case "last-x-fiscal-years":
            return window.LOCID_GF_LASTXFISCALYEARS;
        case "next-x-fiscal-years":
            return window.LOCID_GF_NEXTXFISCALYEARS;
        case "last-x-fiscal-periods":
            return window.LOCID_GF_LASTXFISCALPERIODS;
        case "next-x-fiscal-periods":
            return window.LOCID_GF_NEXTXFISCALPERIODS;
        default:
            return null
    }
}
function isAtributeLookupContainsUser(resultAttributes) {
    var $v_0 = resultAttributes.getNamedItem("lookuptypes");
    if (IsNull($v_0)) return false;
    for (var $v_1 = XUI.Xml.GetText($v_0).split(","), $v_2 = 0; $v_2 < $v_1.length; ++$v_2) if ($v_1[$v_2] === "8") return true;
    return false
}
function getOperatorsForDataType(metadataType, isNameAttrStringPresent, isLookupUserPresent) {
    var $v_0 = null;
    if (metadataTypeHasDedicatedAFOperators(metadataType)) $v_0 = metadataType;
    else $v_0 = getAbstractDataType(metadataType);
    if ($v_0.toUpperCase() === "LOOKUP" && isLookupUserPresent) $v_0 = $v_0 + "withuser";
    if (isNameAttrStringPresent) $v_0 = $v_0 + "withname";
    switch ($v_0) {
        case "number":
            return "eq;ne;gt;ge;lt;le;not-null;null";
        case "string":
            return "eq;ne;contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith;not-null;null";
        case "memo":
            return "contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith;not-null;null";
        case "date":
            return "on;on-or-after;on-or-before;yesterday;today;tomorrow;next-seven-days;last-seven-days;next-week;last-week;this-week;next-month;last-month;this-month;next-year;last-year;this-year;last-x-hours;next-x-hours;last-x-days;next-x-days;last-x-weeks;next-x-weeks;last-x-months;next-x-months;last-x-years;next-x-years;anytime;olderthan-x-months;not-null;null;in-fiscal-year;in-fiscal-period;in-fiscal-period-and-year;in-or-after-fiscal-period-and-year;in-or-before-fiscal-period-and-year;last-fiscal-year;this-fiscal-year;next-fiscal-year;last-x-fiscal-years;next-x-fiscal-years;last-fiscal-period;this-fiscal-period;next-fiscal-period;last-x-fiscal-periods;next-x-fiscal-periods";
        case "picklist":
        case "picklistwithname":
            return "eq;ne;not-null;null;contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith";
        case "language":
            return "eq;ne;not-null;null;eq-userlanguage";
        case "lookup":
        case "lookupwithname":
            return "eq;ne;not-null;null;contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith";
        case "lookupwithuser":
            return "eq-userid;ne-userid;eq;ne;not-null;null";
        case "owner":
            return "eq-userid;ne-userid;eq-userteams;eq;ne;not-null;null";
        case "lookupwithuserwithname":
            return "eq-userid;ne-userid;eq;ne;not-null;null;contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith";
        case "ownerwithname":
            return "eq-userid;ne-userid;eq-userteams;eq;ne;not-null;null;contains;doesnotcontain;beginswith;doesnotbeginwith;endswith;doesnotendwith";
        case "partylist":
            return "eq;ne;not-null;null;contains;doesnotcontain"
    }
    return null
}
function metadataTypeHasDedicatedAFOperators(metadataType) {
    switch (metadataType.toLowerCase()) {
        case "language":
        case "partylist":
            return true;
        default:
            return false
    }
}
function getOptionValue(oper) {
    var $v_0 = oper;
    switch (oper) {
        case "contains":
            $v_0 = ":like:%{0}%";
            break;
        case "beginswith":
            $v_0 = ":like:{0}%";
            break;
        case "endswith":
            $v_0 = ":like:%{0}";
            break;
        case "doesnotcontain":
            $v_0 = ":not-like:%{0}%";
            break;
        case "doesnotbeginwith":
            $v_0 = ":not-like:{0}%";
            break;
        case "doesnotendwith":
            $v_0 = ":not-like:%{0}";
            break
    }
    return $v_0
}
function isValueBoundOperator(op) {
    switch (op) {
        case "null":
        case "not-null":
        case "yesterday":
        case "today":
        case "tomorrow":
        case "next-seven-days":
        case "last-seven-days":
        case "last-week":
        case "this-week":
        case "next-week":
        case "last-month":
        case "this-month":
        case "next-month":
        case "last-year":
        case "this-year":
        case "next-year":
        case "last-fiscal-period":
        case "this-fiscal-period":
        case "next-fiscal-period":
        case "last-fiscal-year":
        case "this-fiscal-year":
        case "next-fiscal-year":
        case "innext7days":
        case "inlast7days":
        case "nextweek":
        case "lastweek":
        case "thisweek":
        case "nextmonth":
        case "lastmonth":
        case "thismonth":
        case "nextyear":
        case "lastyear":
        case "thisyear":
        case "anytime":
        case "eq-userid":
        case "ne-userid":
        case "eq-userteams":
        case "containsdata":
        case "doesnotcontaindata":
        case "eq-userlanguage":
        case "child-of":
        case "dedupe-equals":
        case "dedupe-equalsdateonly":
        case "dedupe-equalsdatetime":
        case "nop":
            return false
    }
    return true
}
function isUnaryDateTypeFilterOperator(dateOperator) {
    switch (dateOperator) {
        case "yesterday":
        case "today":
        case "tomorrow":
        case "last-week":
        case "this-week":
        case "next-week":
        case "last-month":
        case "this-month":
        case "next-month":
        case "last-year":
        case "this-year":
        case "next-year":
        case "last-fiscal-year":
        case "this-fiscal-year":
        case "next-fiscal-year":
        case "last-fiscal-period":
        case "this-fiscal-period":
        case "next-fiscal-period":
        case "anytime":
            return true;
        default:
            return false
    }
}
function getDateFilterGroup(dateOperator) {
    switch (dateOperator) {
        case "yesterday":
        case "today":
        case "tomorrow":
            return 1;
        case "last-week":
        case "this-week":
        case "next-week":
            return 2;
        case "last-month":
        case "this-month":
        case "next-month":
            return 3;
        case "last-year":
        case "this-year":
        case "next-year":
            return 4;
        case "last-fiscal-period":
        case "this-fiscal-period":
        case "next-fiscal-period":
            return 5;
        case "last-fiscal-year":
        case "this-fiscal-year":
        case "next-fiscal-year":
            return 6;
        default:
            return 0
    }
}
function isNameOperator(op) {
    switch (op) {
        case "contains":
        case "doesnotcontain":
        case "beginswith":
        case "doesnotbeginwith":
        case "endswith":
        case "doesnotendwith":
        case "like":
        case "not-like":
            return true
    }
    return false
}
function isDynamicDateOperator(op) {
    switch (op) {
        case "last-x-hours":
        case "next-x-hours":
        case "last-x-days":
        case "next-x-days":
        case "last-x-weeks":
        case "next-x-weeks":
        case "last-x-months":
        case "next-x-months":
        case "last-x-years":
        case "next-x-years":
        case "olderthan-x-months":
        case "last-x-fiscal-years":
        case "next-x-fiscal-years":
        case "last-x-fiscal-periods":
        case "next-x-fiscal-periods":
            return true
    }
    return false
}
function isOperatorExpectsDateTimeOperand(op) {
    switch (op) {
        case "on":
        case "not-on":
        case "after":
        case "on-or-after":
        case "before":
        case "on-or-before":
            return true;
        default:
            return false
    }
}
function isDateTimeOperandPiclklist(op) {
    switch (op) {
        case "in-fiscal-year":
        case "in-fiscal-period":
        case "in-fiscal-period-and-year":
        case "in-or-before-fiscal-period-and-year":
        case "in-or-after-fiscal-period-and-year":
            return true;
        default:
            return false
    }
}
function isMultiSelectDateOperator(op) {
    switch (op) {
        case "in-or-before-fiscal-period-and-year":
        case "in-or-after-fiscal-period-and-year":
            return true;
        default:
            return false
    }
}
function constructOperatorValues(conditionOperator, conditionValue) {
    if (conditionOperator === "like" || conditionOperator === "not-like") {
        var $v_0 = !conditionValue.indexOf("%"),
            $v_1 = conditionValue.lastIndexOf("%") === conditionValue.length - 1;
        if ($v_0 && $v_1) {
            conditionOperator = conditionOperator === "like" ? "contains" : "doesnotcontain";
            conditionValue = convertLikeToUserType(conditionValue.substring(1, conditionValue.length - 1))
        } else if ($v_0) {
            conditionOperator = conditionOperator === "like" ? "endswith" : "doesnotendwith";
            conditionValue = convertLikeToUserType(conditionValue.substring(1, conditionValue.length))
        } else if ($v_1) {
            conditionOperator = conditionOperator === "like" ? "beginswith" : "doesnotbeginwith";
            conditionValue = convertLikeToUserType(conditionValue.substring(0, conditionValue.length - 1))
        } else conditionOperator = conditionOperator === "like" ? "eq" : "ne"
    } else if (conditionOperator === "in" || conditionOperator === "not-in") conditionOperator = conditionOperator === "in" ? "eq" : "ne";
    return [conditionOperator, conditionValue]
}
function constructValues(dataType, conditionOperator, conditionValue) {
    switch (dataType) {
        case "lookup":
        case "owner":
            var $v_0 = conditionOperator === "in" || conditionOperator === "not-in",
                $v_1 = [],
                $v_2;
            if ($v_0) for (var $v_4 = XUI.Xml.SelectNodes(XUI.Xml.LoadXml(conditionValue), "/values/value", null), $v_5 = $v_4.length, $v_6 = null, $v_7 = 0; $v_7 < $v_5; $v_7++) {
                $v_6 = $v_4[$v_7];
                var $v_8 = new LookupControlItem;
                $v_8.id = XUI.Xml.GetText($v_6);
                $v_8.name = XUI.Xml.GetText($v_6.attributes.getNamedItem("uiname"));
                $v_2 = XUI.Xml.GetText($v_6.attributes.getNamedItem("uitype"));
                if (isNaN(parseInt($v_2, 10))) $v_8.typename = $v_2;
                else $v_8.type = $v_2;
                !IsNull($v_8.name) && !IsNull($v_2) && Array.add($v_1, $v_8)
            }
            return $v_1.length ? $v_1 : null;
        case "picklist":
            var $v_3 = conditionOperator === "in" || conditionOperator === "not-in";
            if ($v_3) {
                for (var $v_9 = new Sys.StringBuilder(""), $v_A = XUI.Xml.SelectNodes(XUI.Xml.LoadXml(conditionValue), "/values/value", null), $v_B = $v_A.length, $v_C = 0; $v_C < $v_B; $v_C++) {
                    $v_9.append(XUI.Xml.GetText($v_A[$v_C]));
                    $v_9.append(";")
                }
                var $v_D = $v_9.toString();
                if ($v_C) $v_D = $v_D.substring(0, $v_D.length - 1);
                return $v_D
            }
            break;
        case "date":
            if (isDynamicDateOperator(conditionOperator) || conditionOperator === "in-fiscal-year" || conditionOperator === "in-fiscal-period") return parseInt(conditionValue, 10);
            else if (conditionOperator === "in-fiscal-period-and-year" || conditionOperator === "in-or-before-fiscal-period-and-year" || conditionOperator === "in-or-after-fiscal-period-and-year") {
                var $v_E = XUI.Xml.SelectNodes(XUI.Xml.LoadXml(conditionValue), "/values/value", null),
                    $v_F = parseInt(XUI.Xml.GetText($v_E[0]), 10),
                    $v_G = parseInt(XUI.Xml.GetText($v_E[1]), 10);
                return $v_G.toString() + ($v_F <= 9 ? "-0" : "-") + $v_F.toString()
            } else return !IsNull(conditionValue) && conditionValue.length > 0 ? ParseUtcDate(conditionValue) : null;
        case "number":
            return parseFloat(conditionValue)
    }
    return null
}
function convertLikeToUserType(op) {
    var $v_0 = new RegExp("\\[%\\]", "g");
    op = op.replace($v_0, "[*]");
    $v_0 = new RegExp("%", "g");
    op = op.replace($v_0, "*");
    $v_0 = new RegExp("\\[\\*\\]", "g");
    op = op.replace($v_0, "%");
    $v_0 = new RegExp("\\[\\[\\]", "g");
    op = op.replace($v_0, "[");
    $v_0 = new RegExp("\\[_\\]", "g");
    return op.replace($v_0, "_")
}
function isMultiSelectOperator(op) {
    switch (op.toLowerCase()) {
        case "eq":
        case "in":
        case "ne":
        case "not-in":
            return true;
        default:
            return false
    }
}
function getMultiSelectOperator(op) {
    switch (op.toLowerCase()) {
        case "eq":
        case "in":
            return "in";
        case "ne":
        case "not-in":
            return "not-in";
        default:
            return null
    }
}
Mscrm.QueryData = function () { };
Mscrm.QueryData.prototype = {
    $1n_0: null,
    $b_0: null,
    $M_0: null,
    $c_0: null,
    $13_0: null,
    $l_0: null,
    $R_0: null,
    $u_0: null,
    $v_0: 0,
    $1J_0: 0,
    get_defaultSortColumn: function () {
        return this.$1n_0
    },
    set_defaultSortColumn: function (value) {
        this.$1n_0 = value;
        return value
    },
    get_description: function () {
        return this.$b_0
    },
    set_description: function (value) {
        this.$b_0 = value;
        return value
    },
    get_entityName: function () {
        return this.$M_0
    },
    set_entityName: function (value) {
        this.$M_0 = value;
        return value
    },
    get_fetchXml: function () {
        return this.$c_0
    },
    set_fetchXml: function (value) {
        this.$c_0 = value;
        return value
    },
    get_layoutXml: function () {
        return this.$13_0
    },
    set_layoutXml: function (value) {
        this.$13_0 = value;
        return value
    },
    get_conditionalFormatting: function () {
        return this.$l_0
    },
    set_conditionalFormatting: function (value) {
        this.$l_0 = value;
        return value
    },
    get_name: function () {
        return this.$R_0
    },
    set_name: function (value) {
        this.$R_0 = value;
        return value
    },
    get_queryId: function () {
        return this.$u_0
    },
    set_queryId: function (value) {
        this.$u_0 = value;
        return value
    },
    get_queryType: function () {
        return this.$v_0
    },
    set_queryType: function (value) {
        this.$v_0 = value;
        return value
    },
    get_sourceViewType: function () {
        return this.$1J_0
    },
    set_sourceViewType: function (value) {
        this.$1J_0 = value;
        return value
    }
};
Mscrm.MergedXml = function () { };
Mscrm.MergedXml.prototype = {
    $1M_0: null,
    $1F_0: null,
    get_xmlDoc: function () {
        return this.$1M_0
    },
    set_xmlDoc: function (value) {
        this.$1M_0 = value;
        return value
    },
    get_ids: function () {
        return this.$1F_0
    },
    set_ids: function (value) {
        this.$1F_0 = value;
        return value
    }
};
Mscrm.FilterConditionCollection = function (attribute, type, isFromRelated, entity, attributeFormat) {
    this.$1_0 = [];
    this.$B_0 = attribute;
    this.$r_0 = isFromRelated;
    this.$M_0 = entity;
    this.$Z_0 = type;
    this.$1R_0 = attributeFormat
};
Mscrm.FilterConditionCollection.prototype = {
    $B_0: null,
    $Z_0: null,
    $1R_0: null,
    $0_0: null,
    $M_0: null,
    $1_0: null,
    $r_0: false,
    $V_0: false,
    $i_0: null,
    get_attributeName: function () {
        return this.$B_0
    },
    get_attributeType: function () {
        return this.$Z_0
    },
    get_attributeFormat: function () {
        return this.$1R_0
    },
    get_customFilters: function () {
        return this.$0_0
    },
    set_customFilters: function (value) {
        this.$0_0 = value;
        return value
    },
    get_entityName: function () {
        return this.$M_0
    },
    get_filters: function () {
        return this.$1_0
    },
    get_isDirty: function () {
        for (var $v_0 = 0; $v_0 < this.$1_0.length; $v_0++) if (this.$1_0[$v_0].$7_0) return true;
        if (!IsNull(this.$0_0)) return this.$0_0.get_isDirty();
        return false
    },
    get_isComplex: function () {
        return this.$V_0
    },
    set_isComplex: function (value) {
        this.$V_0 = value;
        return value
    },
    get_isFromRelatedEntity: function () {
        return this.$r_0
    },
    get_relatedEntityDetails: function () {
        return this.$i_0
    },
    set_relatedEntityDetails: function (value) {
        this.$i_0 = value;
        return value
    },
    clearDirtyFlag: function () {
        for (var $v_0 = 0; $v_0 < this.$1_0.length; $v_0++) this.$1_0[$v_0].$7_0 = false;
        this.$0_0 && this.$0_0.clearDirtyFlag()
    },
    getCustomFilterConditionsCount: function () {
        var $v_0 = 0,
            $v_1 = this.$0_0;
        if (!IsNull($v_1)) if (!IsNull($v_1.$3_0)) {
            $v_0++;
            if (!IsNull($v_1.$4_0)) $v_0++
        }
        return $v_0
    },
    getOrdinaryFilterConditionsCount: function () {
        return this.$1_0.length
    }
};
Mscrm.FilterCondition = function (OperatorType, Operator, Operand, isFromFetch, xpath) {
    this.$N_0 = OperatorType;
    this.$2_0 = Operator;
    this.$8_0 = Operand;
    this.$5_0 = isFromFetch;
    this.$6_0 = xpath
};
Mscrm.FilterCondition.prototype = {
    $N_0: 0,
    $G_0: false,
    $7_0: false,
    $5_0: false,
    $8_0: null,
    $2_0: null,
    $6_0: null,
    $H_0: null,
    get_nameAttribute: function () {
        return this.$H_0
    },
    set_nameAttribute: function (value) {
        this.$H_0 = value;
        return value
    },
    get_isDeleted: function () {
        return this.$G_0
    },
    set_isDeleted: function (value) {
        this.$G_0 = value;
        return value
    },
    get_isDirty: function () {
        return this.$7_0
    },
    set_isDirty: function (value) {
        this.$7_0 = value;
        return value
    },
    get_isFromOriginalFetch: function () {
        return this.$5_0
    },
    set_isFromOriginalFetch: function (value) {
        this.$5_0 = value;
        return value
    },
    get_operand: function () {
        return this.$8_0
    },
    set_operand: function (value) {
        this.$8_0 = value;
        return value
    },
    get_operator: function () {
        return this.$2_0
    },
    set_operator: function (value) {
        this.$2_0 = value;
        return value
    },
    get_operatorType: function () {
        return this.$N_0
    },
    set_operatorType: function (value) {
        this.$N_0 = value;
        return value
    },
    get_xPath: function () {
        return this.$6_0
    },
    set_xPath: function (value) {
        this.$6_0 = value;
        return value
    },
    describe: function () {
        var $v_0;
        switch (this.$N_0) {
            case 2:
                var $v_1 = constructOperatorValues(this.$2_0, this.$8_0),
                    $v_2 = $v_1[0],
                    $v_3 = $v_1[1];
                $v_0 = String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, getLabelForOperator($v_2), $v_3);
                break;
            case 1:
                $v_0 = getLabelForOperator(this.$2_0);
                break;
            case 0:
            default:
                $v_0 = "";
                break
        }
        return $v_0
    }
};
Mscrm.CustomFilterConditionGroup = function (primary, secondary, BooleanOperator) {
    this.$3_0 = primary;
    this.$4_0 = secondary;
    this.$A_0 = BooleanOperator
};
Mscrm.CustomFilterConditionGroup.prototype = {
    $A_0: 0,
    $O_0: null,
    $K_0: null,
    $3_0: null,
    $4_0: null,
    get_booleanOperator: function () {
        return this.$A_0
    },
    set_booleanOperator: function (value) {
        this.$A_0 = value;
        return value
    },
    get_isDirty: function () {
        var $v_0 = false;
        if (!IsNull(this.$3_0)) if (!IsNull(this.$4_0)) $v_0 = this.$3_0.$7_0 || this.$4_0.$7_0;
        else $v_0 = this.$3_0.$7_0;
        if (!IsNull(this.$O_0) || !IsNull(this.$K_0)) $v_0 = true;
        return $v_0
    },
    get_oldPrimary: function () {
        return this.$O_0
    },
    set_oldPrimary: function (value) {
        this.$O_0 = value;
        return value
    },
    get_oldSecondary: function () {
        return this.$K_0
    },
    set_oldSecondary: function (value) {
        this.$K_0 = value;
        return value
    },
    get_primary: function () {
        return this.$3_0
    },
    set_primary: function (value) {
        this.$3_0 = value;
        return value
    },
    get_secondary: function () {
        return this.$4_0
    },
    set_secondary: function (value) {
        this.$4_0 = value;
        return value
    },
    clearDirtyFlag: function () {
        if (this.$3_0) this.$3_0.$7_0 = false;
        if (this.$4_0) this.$4_0.$7_0 = false;
        if (this.$O_0) this.$K_0 = null;
        if (this.$K_0) this.$K_0 = null
    }
};
Mscrm.FilterNodeType = function () { };
Mscrm.FilterOperatorType = function () { };
Mscrm.CustomFiltersBooleanOperatorType = function () { };
Mscrm.FilterUIGroupType = function () { };
Mscrm.DateFilterGroup = function () { };
Mscrm.DateFilterGroup.get_getTotalNoOfGroups = function () {
    var $v_0 = 7;
    return $v_0
};
Mscrm.SaveViewParams = function (name, desc, id, objType) {
    this.sName = name;
    this.sDescription = desc;
    this.sQueryId = id;
    this.sQueryOjectType = objType
};
Mscrm.SaveViewParams.prototype = {
    sDescription: null,
    sName: null,
    sQueryId: null,
    sQueryOjectType: null
};
Mscrm.GridFilterUtil = function () { };
Mscrm.GridFilterUtil.addFilterNode = function (filterNode, $sn_document) {
    var $v_0 = $sn_document.createElement("filter"),
        $v_1 = $sn_document.createAttribute("type");
    $v_1.value = "and";
    $v_0.attributes.setNamedItem($v_1);
    var $v_2 = filterNode.parentNode;
    $v_2.replaceChild($v_0, filterNode);
    $v_0.appendChild(filterNode)
};
Mscrm.GridFilterUtil.createMainFilterNode = function ($sn_document, rootNode) {
    var $v_0 = $sn_document.createElement("filter"),
        $v_1 = $sn_document.createAttribute("type");
    $v_1.value = "and";
    $v_0.attributes.setNamedItem($v_1);
    rootNode.appendChild($v_0);
    return $v_0
};
Mscrm.GridFilterUtil.$2P = function ($p0, $p1) {
    var $v_0 = $p1.split(";"),
        $v_1 = $p0.createElement("link-entity"),
        $v_2 = $p0.createAttribute("name");
    $v_2.value = $v_0[0];
    $v_1.attributes.setNamedItem($v_2);
    var $v_3 = $p0.createAttribute("from");
    $v_3.value = $v_0[1];
    $v_1.attributes.setNamedItem($v_3);
    var $v_4 = $p0.createAttribute("to");
    $v_4.value = $v_0[2];
    $v_1.attributes.setNamedItem($v_4);
    var $v_5 = $p0.createAttribute("alias");
    $v_5.value = Mscrm.GridFilterUtil.getUniqueAlias($p0);
    $v_1.attributes.setNamedItem($v_5);
    var $v_6 = $p0.createAttribute(Mscrm.GridFilterUtil.$1A);
    $v_6.value = "true";
    $v_1.attributes.setNamedItem($v_6);
    XUI.Xml.SelectSingleNode($p0, "/fetch/entity", null).appendChild($v_1);
    return $v_1
};
Mscrm.GridFilterUtil.$P = function ($p0, $p1, $p2) {
    var $v_0 = $p2.createElement("condition"),
        $v_1 = $p2.createAttribute("attribute");
    if (IsNull($p0.$H_0)) $v_1.value = $p1;
    else $v_1.value = $p0.$H_0;
    $v_0.attributes.setNamedItem($v_1);
    var $v_2 = $p2.createAttribute("operator");
    $v_2.value = $p0.$2_0;
    $v_0.attributes.setNamedItem($v_2);
    var $v_3 = $p0.$6_0;
    if (!IsNull($v_3)) {
        var $v_4 = $p2.createAttribute("gridfilterconditionid"),
            $v_5 = $v_3.substring($v_3.indexOf("gridfilterconditionid") + 23, $v_3.indexOf("gridfilterconditionid") + 55);
        $v_4.value = $v_5;
        $v_0.attributes.setNamedItem($v_4)
    }
    if ($p0.$N_0 === 2) if ($p0.$8_0.toString().startsWith("<values>")) {
        var $v_6 = Mscrm.GridFilterUtil.$2R($p0.$8_0);
        if (!IsNull($v_6) && $v_6.length) while ($v_6.length > 0) {
            var $v_7 = Mscrm.Utilities.getAdoptedNode($p2, $v_6[0]);
            $v_0.appendChild($v_7)
        }
    } else {
        var $v_8 = $p2.createAttribute("value");
        $v_8.value = $p0.$8_0.toString();
        $v_0.attributes.setNamedItem($v_8)
    }
    return $v_0
};
Mscrm.GridFilterUtil.$2R = function ($p0) {
    var $v_0 = XUI.Xml.LoadXml($p0);
    return XUI.Xml.DomUtils.GetFirstChild($v_0).childNodes
};
Mscrm.GridFilterUtil.createUserQuery = function (queryData) {
    if (queryData.$R_0.length > 0) {
        var $v_0 = new RemoteCommand("AdvancedFind", "CreateAndRetrieveUserQuery", null);
        $v_0.SetParameter("entityName", queryData.$M_0);
        $v_0.SetParameter("queryType", queryData.$v_0.toString());
        $v_0.SetParameter("name", queryData.$R_0);
        $v_0.SetParameter("description", queryData.$b_0);
        $v_0.SetParameter("fetchXml", queryData.$c_0);
        $v_0.SetParameter("layoutXml", queryData.$13_0);
        $v_0.SetParameter("conditionalFormatting", queryData.$l_0);
        var $v_1 = $v_0.Execute(null);
        if ($v_1.Success) {
            var $v_2 = XUI.Xml.LoadXml($v_1.ReturnValue.toString()),
                $v_3 = XUI.Xml.SelectSingleNode($v_2, "//userqueryid", null),
                $v_4 = XUI.Xml.GetText($v_3);
            if (Mscrm.PageManager.isOutlookProxyPage()) {
                getOutlookHostedWindow().activateNewTab(queryData.$M_0, $v_4);
                return true
            }
            if (Mscrm.GridFilterUtil.refreshSavedQuerySelector(queryData.$M_0, $v_4)) return true
        }
    }
    return false
};
Mscrm.GridFilterUtil.refreshSavedQuerySelector = function (entityName, viewIdToSelect) {
    var $v_0 = "crmGrid",
        $v_1 = "crmGrid_SavedNewQuerySelector",
        $v_2 = null,
        $v_3 = null,
        $v_4 = true;
    $v_2 = $find($v_1);
    if (!IsNull($v_2) && $v_2.showNewVSControl && !$v_2.showOriginalSelectBox) $v_4 = true;
    else {
        $v_3 = $get($v_1);
        if (!IsNull($v_3)) $v_4 = false
    }
    if (!IsNull($v_2) || !IsNull($v_3)) {
        var $v_5 = new RemoteCommand("SavedQuerySelectorWebService", "GetSavedViewSelector", null);
        $v_5.SetParameter("entityName", entityName);
        var $v_6 = $v_5.Execute(null);
        if ($v_6.Success) {
            var $v_7 = $v_6.Xml,
                $v_8 = XUI.Xml.GetText($v_7);
            if (!IsNull($v_8)) if ($v_4) {
                $v_2.populateMenuFromQueryList($v_8);
                $v_2.setSelectedViewItemInMenu(viewIdToSelect)
            } else {
                $v_3.parentNode.innerHTML = $v_8;
                $v_3 = $get($v_1);
                for (var $v_9 = 0; $v_9 < $v_3.options.length; $v_9++) {
                    var $v_A = $v_3.options[$v_9],
                        $v_B = $v_A.value;
                    if ($v_B === viewIdToSelect) {
                        $v_3.selectedIndex = $v_9;
                        handleView($v_3, Mscrm.GridControl.findComponent($v_0));
                        return true
                    }
                }
            }
        }
    }
    return false
};
Mscrm.GridFilterUtil.getFilterConditionFromDictionary = function (properties) {
    var $v_0 = IsNull(properties["OperatorType"]) ? 0 : properties["OperatorType"],
        $v_1 = IsNull(properties["Operator"]) ? null : properties["Operator"],
        $v_2 = IsNull(properties["Operand"]) ? null : properties["Operand"],
        $v_3 = IsNull(properties["isFromFetch"]) ? false : properties["isFromFetch"],
        $v_4 = IsNull(properties["xpath"]) ? null : properties["xpath"],
        $v_5 = IsNull(properties["IsDirty"]) ? true : properties["IsDirty"],
        $v_6 = new Mscrm.FilterCondition($v_0, $v_1, $v_2, $v_3, $v_4);
    $v_6.$7_0 = $v_5;
    return $v_6
};
Mscrm.GridFilterUtil.getViewInfo = function (queryData, callbackRef) {
    var $v_0 = {};
    $v_0.sQueryId = queryData.$u_0;
    $v_0.sQueryObjectType = queryData.$v_0;
    $v_0.sName = queryData.$R_0;
    $v_0.sDescription = queryData.$b_0;
    var $v_1 = [callbackRef],
        $v_2 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterGetViewInfo", Mscrm.GridFilterUtil, $v_1),
        $v_3 = openStdDlgWithCallback(Mscrm.CrmUri.create("/AdvancedFind/QueryProperties.aspx?feature=advfind"), $v_0, 500, 310, $v_2, false, false, null);
    if (Mscrm.Utilities.isModalDialogSupported()) return Mscrm.GridFilterUtil.performActionAfterGetViewInfo($v_3, callbackRef);
    return null
};
Mscrm.GridFilterUtil.performActionAfterGetViewInfo = function (viewInfo, callbackRef) {
    var $v_0 = null;
    if (!IsNull(viewInfo)) {
        $v_0 = new Mscrm.QueryData;
        $v_0.$R_0 = viewInfo.sName;
        $v_0.$b_0 = viewInfo.sDescription
    } else $v_0 = null;
    Mscrm.Utilities.executeFunctionIfModeless(callbackRef, $v_0);
    return $v_0
};
Mscrm.GridFilterUtil.mergeFetchXml = function (transientXml, conditionCollection) {
    var $v_0 = [],
        $v_1 = transientXml,
        $v_2 = Mscrm.GridFilterUtil.$2o(conditionCollection, $v_1);
    Mscrm.GridFilterUtil.$3B(conditionCollection, $v_0, $v_1, $v_2);
    Mscrm.GridFilterUtil.$3A(conditionCollection, $v_0, $v_1, $v_2);
    Mscrm.GridFilterUtil.cleanupFetchXmlForRefresh($v_1);
    return Mscrm.GridFilterUtil.$2n($v_0, $v_1)
};
Mscrm.GridFilterUtil.$2o = function ($p0, $p1) {
    var $v_0 = XUI.Xml.SelectSingleNode($p1, "/fetch/entity", null);
    if ($p0.$r_0) {
        $v_0 = Mscrm.GridFilterUtil.$2f($p1, $p0.$i_0);
        if (IsNull($v_0)) $v_0 = Mscrm.GridFilterUtil.$2P($p1, $p0.$i_0)
    }
    return $v_0
};
Mscrm.GridFilterUtil.$3B = function ($p0, $p1, $p2, $p3) {
    for (var $v_0 = [], $v_1 = null, $v_2 = null, $v_3 = null, $v_4 = Mscrm.GridFilterUtil.checkForOrConditions($p0), $v_5 = Mscrm.GridFilterUtil.$2b($p0), $v_6 = $p0.$1_0.length, $v_7 = 0; $v_7 < $v_6; $v_7++) {
        $v_1 = $p0.$1_0[$v_7];
        if ($v_1.$G_0 && $v_1.$7_0) Mscrm.GridFilterUtil.$2S($p2, $v_0, $v_1);
        else if ($v_1.$7_0) {
            var $v_8 = null;
            if ($v_1.$5_0) {
                $v_8 = Mscrm.GridFilterUtil.$27($p2, $v_1);
                if ($v_4 && Mscrm.GridFilterUtil.filterNodeType($v_8) === "and") {
                    $v_3 = Mscrm.GridFilterUtil.$2C(true, $v_3, $p1, $p2, $v_1, $v_8);
                    $v_3.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2))
                } else if ($v_5 === 1 && Mscrm.GridFilterUtil.hasParentFilterNode($v_8)) {
                    Mscrm.GridFilterUtil.$2F($v_1);
                    $v_8.parentNode.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2))
                } else $v_8.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2))
            } else {
                Mscrm.GridFilterUtil.$2H($p2, $p3);
                $v_8 = Mscrm.GridFilterUtil.$1y($p3, $p2);
                Mscrm.GridFilterUtil.setUniqueIdInFilterCondition($v_1, $p1);
                if ($v_4) {
                    if (IsNull($v_2)) $v_2 = Mscrm.GridFilterUtil.$2C(false, $v_2, $p1, $p2, $v_1, $v_8);
                    $v_2.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2))
                } else $v_8.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2))
            }
        }
    }
    for (var $v_9 = 0; $v_9 < $v_0.length; $v_9++) Array.remove($p0.$1_0, $v_0[$v_9])
};
Mscrm.GridFilterUtil.$3A = function ($p0, $p1, $p2, $p3) {
    !IsNull($p0.$0_0) && !IsNull($p0.$0_0.$O_0) && Mscrm.GridFilterUtil.$2T($p0, $p2);
    if (!IsNull($p0.$0_0) && $p0.$0_0.get_isDirty()) {
        var $v_0 = $p0.$0_0.$3_0,
            $v_1 = $p0.$0_0.$4_0;
        if (!IsNull($v_0)) {
            var $v_2 = null;
            if ($v_0.$5_0) {
                $v_2 = Mscrm.GridFilterUtil.$27($p2, $v_0);
                if (IsNull($v_1)) if (Mscrm.GridFilterUtil.hasParentFilterNode($v_2)) {
                    Mscrm.GridFilterUtil.$2F($v_0);
                    $v_2.parentNode.appendChild(Mscrm.GridFilterUtil.$P($v_0, $p0.$B_0, $p2))
                } else $v_2.appendChild(Mscrm.GridFilterUtil.$P($v_0, $p0.$B_0, $p2));
                else {
                    $v_2.appendChild(Mscrm.GridFilterUtil.$P($v_0, $p0.$B_0, $p2));
                    $v_2.appendChild(Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2));
                    Mscrm.GridFilterUtil.$3L($p0, $p2, $v_2)
                }
            } else {
                Mscrm.GridFilterUtil.$2H($p2, $p3);
                $v_2 = Mscrm.GridFilterUtil.$1y($p3, $p2);
                Mscrm.GridFilterUtil.setUniqueIdInFilterCondition($v_0, $p1);
                var $v_3 = Mscrm.GridFilterUtil.$P($v_0, $p0.$B_0, $p2);
                if (!IsNull($v_1)) {
                    Mscrm.GridFilterUtil.setUniqueIdInFilterCondition($v_1, $p1);
                    var $v_4 = Mscrm.GridFilterUtil.$P($v_1, $p0.$B_0, $p2);
                    $v_3 = Mscrm.GridFilterUtil.$32($p0.$0_0.$A_0, $v_3, $v_4, $p2)
                }
                $v_2.appendChild($v_3)
            }
        }
    }
};
Mscrm.GridFilterUtil.$2n = function ($p0, $p1) {
    var $v_0 = new Mscrm.MergedXml;
    $v_0.$1M_0 = $p1;
    $v_0.$1F_0 = $p0;
    return $v_0
};
Mscrm.GridFilterUtil.hasParentFilterNode = function (node) {
    return node.parentNode.nodeName === "filter"
};
Mscrm.GridFilterUtil.$2b = function ($p0) {
    for (var $v_0, $v_1 = 0, $v_2 = 0; $v_2 < $p0.$1_0.length; $v_2++) {
        $v_0 = $p0.$1_0[$v_2];
        if (!$v_0.$G_0 && $v_0.$7_0) $v_1++
    }
    return $v_1
};
Mscrm.GridFilterUtil.$2F = function ($p0) {
    var $v_0 = $p0.$6_0;
    if (!isNullOrEmptyString($v_0) && $v_0.indexOf("gridfilterid") >= 0) {
        var $v_1 = new Sys.StringBuilder;
        $v_1.append('/fetch//condition[@gridfilterconditionid="');
        $v_1.append($v_0.substring($v_0.length - 34, $v_0.length - 2));
        $v_1.append('"]');
        $v_0 = $v_1.toString();
        $p0.$6_0 = $v_0
    }
};
Mscrm.GridFilterUtil.$1y = function ($p0, $p1) {
    var $v_0 = XUI.Xml.SelectSingleNode($p0, "filter", null);
    if (IsNull($v_0)) $v_0 = Mscrm.GridFilterUtil.createMainFilterNode($p1, $p0);
    else if ($v_0.attributes.getNamedItem("type").nodeValue !== "and") {
        Mscrm.GridFilterUtil.addFilterNode($v_0, $p1);
        $v_0 = $v_0.parentNode
    }
    return $v_0
};
Mscrm.GridFilterUtil.filterConditionHasXPath = function (condition) {
    return !IsNull(condition.$6_0) && condition.$6_0 !== ""
};
Mscrm.GridFilterUtil.filterNodeType = function (filterNode) {
    var $v_0 = filterNode.attributes.getNamedItem("type");
    if (IsNull($v_0)) return null;
    else return $v_0.nodeValue
};
Mscrm.GridFilterUtil.$3L = function ($p0, $p1, $p2) {
    var $v_0 = $p1.createAttribute("type");
    $v_0.value = $p0.$0_0.$A_0 === 2 ? "or" : "and";
    $p2.attributes.setNamedItem($v_0)
};
Mscrm.GridFilterUtil.$2S = function ($p0, $p1, $p2) {
    var $v_0 = XUI.Xml.SelectSingleNode($p0, $p2.$6_0, null);
    if (!IsNull($v_0)) {
        var $v_1 = $v_0.parentNode;
        $v_1.removeChild($v_0)
    }
    Array.add($p1, $p2)
};
Mscrm.GridFilterUtil.setUniqueIdInFilterCondition = function (condition, Ids) {
    var $v_0 = Mscrm.GridFilterUtil.createUniqueId();
    Array.add(Ids, $v_0);
    var $v_1 = new Sys.StringBuilder;
    $v_1.append('/fetch//condition[@gridfilterconditionid="');
    $v_1.append($v_0);
    $v_1.append('"]');
    condition.$6_0 = $v_1.toString();
    return $v_0
};
Mscrm.GridFilterUtil.$27 = function ($p0, $p1) {
    var $v_0 = Mscrm.GridFilterUtil.getParentFilterXPathFromConditionXPath($p1.$6_0);
    if (!isNullOrEmptyString($v_0)) return XUI.Xml.SelectSingleNode($p0, $v_0, null);
    else if (!isNullOrEmptyString($p1.$6_0)) {
        var $v_1 = XUI.Xml.SelectSingleNode($p0, $p1.$6_0, null);
        return IsNull($v_1) ? null : $v_1.parentNode
    }
    return null
};
Mscrm.GridFilterUtil.$2C = function ($p0, $p1, $p2, $p3, $p4, $p5) {
    if (IsNull($p1)) {
        $p1 = $p3.createElement("filter");
        var $v_0 = $p3.createAttribute("type");
        $v_0.value = "or";
        $p1.attributes.setNamedItem($v_0);
        $p5.appendChild($p1)
    }
    if ($p0) {
        var $v_1 = $p3.createAttribute("gridfilterid"),
            $v_2 = Mscrm.GridFilterUtil.createUniqueId();
        $v_1.value = $v_2;
        $p1.attributes.setNamedItem($v_1);
        var $v_3 = Mscrm.GridFilterUtil.createUniqueId();
        Array.add($p2, $v_3);
        var $v_4 = new Sys.StringBuilder;
        $v_4.append('/fetch//filter[@gridfilterid="');
        $v_4.append($v_2);
        $v_4.append('"]/condition[@gridfilterconditionid="');
        $v_4.append($v_3);
        $v_4.append('"]');
        $p4.$6_0 = $v_4.toString()
    } else Mscrm.GridFilterUtil.setUniqueIdInFilterCondition($p4, $p2);
    return $p1
};
Mscrm.GridFilterUtil.$2H = function ($p0, $p1) {
    var $v_0 = $p1.attributes.getNamedItem("link-type");
    if (!IsNull($v_0)) {
        var $v_1 = $p0.createAttribute("old-link-type");
        $v_1.value = $v_0.nodeValue;
        $p1.attributes.setNamedItem($v_1);
        $p1.attributes.removeNamedItem("link-type")
    }
};
Mscrm.GridFilterUtil.$2T = function ($p0, $p1) {
    var $v_0 = XUI.Xml.SelectSingleNode($p1, $p0.$0_0.$O_0.$6_0, null);
    $v_0.parentNode.removeChild($v_0);
    $p0.$0_0.$O_0 = null;
    if (!IsNull($p0.$0_0.$K_0)) {
        var $v_1 = XUI.Xml.SelectSingleNode($p1, $p0.$0_0.$K_0.$6_0, null);
        $v_1.parentNode.removeChild($v_1);
        $p0.$0_0.$K_0 = null
    }
};
Mscrm.GridFilterUtil.$2f = function ($p0, $p1) {
    var $v_0 = $p1.split(";"),
        $v_1 = new Sys.StringBuilder;
    $v_1.append('/fetch//link-entity[@name="');
    $v_1.append($v_0[0]);
    $v_1.append('" and @from="');
    $v_1.append($v_0[1]);
    $v_1.append('" and @to="');
    $v_1.append($v_0[2]);
    $v_1.append('"]');
    return XUI.Xml.SelectSingleNode($p0, $v_1.toString(), null)
};
Mscrm.GridFilterUtil.$32 = function ($p0, $p1, $p2, $p3) {
    if (IsNull($p1)) return null;
    var $v_0 = $p3.createElement("filter"),
        $v_1 = $p3.createAttribute("type"),
        $v_2 = $p0 === 2 ? "or" : "and";
    $v_1.value = $v_2;
    $v_0.attributes.setNamedItem($v_1);
    $v_0.appendChild($p1);
    $v_0.appendChild($p2);
    return $v_0
};
Mscrm.GridFilterUtil.parseFetchForAttributes = function (elements, fetchXml) {
    var $v_0 = null;
    if (!Mscrm.PageManager.isOutlookProxyPage()) $v_0 = new Mscrm.WebFetchXmlProcessor(elements, fetchXml);
    else $v_0 = new Mscrm.OutlookFetchXmlProcessor(elements, fetchXml);
    var $v_1 = $v_0.process();
    return $v_1
};
Mscrm.GridFilterUtil.saveQuery = function (saveAs, queryData, transientXml) {
    var $v_0 = XUI.Xml.XMLSerializer.serializeToString(transientXml);
    if (IsNull($v_0) || $v_0 === "") return false;
    if (saveAs) {
        var $v_1 = [queryData, transientXml],
            $v_2 = Mscrm.Utilities.createCallbackFunctionObject("performActionAfterSaveQuery", Mscrm.GridFilterUtil, $v_1),
            $v_3 = Mscrm.GridFilterUtil.getViewInfo(queryData, $v_2);
        Mscrm.Utilities.isModalDialogSupported() && Mscrm.GridFilterUtil.performActionAfterSaveQuery($v_3, queryData, transientXml);
        return false
    } else if (queryData.$v_0 !== Mscrm.EntityTypeCode.UserQuery) {
        Mscrm.GridFilterUtil.cleanupFetchXmlForSave(transientXml);
        queryData.$c_0 = XUI.Xml.XMLSerializer.serializeToString(transientXml);
        return Mscrm.GridFilterUtil.updateQuery(queryData)
    } else return false
};
Mscrm.GridFilterUtil.performActionAfterSaveQuery = function (resultQueryData, queryData, transientXml) {
    if (!IsNull(resultQueryData)) {
        queryData.$R_0 = resultQueryData.$R_0;
        queryData.$b_0 = resultQueryData.$b_0;
        Mscrm.GridFilterUtil.cleanupFetchXmlForSave(transientXml);
        queryData.$c_0 = XUI.Xml.XMLSerializer.serializeToString(transientXml);
        Mscrm.GridFilterUtil.createUserQuery(queryData)
    }
};
Mscrm.GridFilterUtil.updateQuery = function (queryData) {
    var $v_0 = new RemoteCommand("AdvancedFind", "UpdateQuery", null);
    $v_0.SetParameter("id", queryData.$u_0);
    $v_0.SetParameter("fetchXml", queryData.$c_0);
    $v_0.SetParameter("layoutXml", queryData.$13_0);
    $v_0.SetParameter("name", queryData.$R_0);
    $v_0.SetParameter("description", queryData.$b_0);
    $v_0.SetParameter("viewType", queryData.$1J_0);
    $v_0.SetParameter("conditionalFormatting", queryData.$l_0);
    return $v_0.Execute(null).Success
};
Mscrm.GridFilterUtil.getSelectedViewType = function () {
    var $v_0 = "crmGrid_SavedNewQuerySelector",
        $v_1 = null,
        $v_2 = null,
        $v_3 = true;
    $v_1 = $find($v_0);
    if (!IsNull($v_1) && $v_1.showNewVSControl && !$v_1.showOriginalSelectBox) $v_3 = true;
    else {
        $v_2 = $get($v_0);
        if (!IsNull($v_2)) $v_3 = false
    }
    if ($v_3) {
        if ($v_1.selectedViewType === Mscrm.EntityTypeCode.UserQuery.toString()) return Mscrm.EntityTypeCode.UserQuery;
        return Mscrm.EntityTypeCode.SavedQuery
    } else {
        if (!IsNull($v_2)) {
            var $v_4 = $v_2.options[$v_2.selectedIndex],
                $v_5 = $v_4.Type;
            if (!IsNull($v_5) && parseInt($v_5, 10) === Mscrm.EntityTypeCode.UserQuery) return Mscrm.EntityTypeCode.UserQuery
        }
        return Mscrm.EntityTypeCode.SavedQuery
    }
};
Mscrm.GridFilterUtil.createUniqueId = function () {
    for (var $v_0 = "", $v_1 = 0; $v_1 < 32; $v_1++) $v_0 += Math.floor(Math.random() * 15).toString(15);
    return $v_0
};
Mscrm.GridFilterUtil.getParentFilterXPathFromConditionXPath = function (conditionXPath) {
    if (conditionXPath.indexOf("gridfilterid") !== -1) return conditionXPath.substring(0, conditionXPath.indexOf("gridfilterid") + 48);
    else return null
};
Mscrm.GridFilterUtil.checkForOrConditions = function (conditionCollection) {
    for (var $v_0 = 0, $v_1 = 0; $v_1 < conditionCollection.$1_0.length; $v_1++) {
        var $v_2 = conditionCollection.$1_0[$v_1];
        if (!$v_2.$G_0 && $v_2.$7_0 && !IsNull($v_2.$6_0)) $v_0++;
        if ($v_0 === 2) return true
    }
    return false
};
Mscrm.GridFilterUtil.getUniqueAlias = function ($sn_document) {
    for (var $v_0 = [], $v_1, $v_2, $v_3 = XUI.Xml.SelectNodes($sn_document, "/fetch//link-entity", null), $v_4, $v_6 = 0; $v_6 < $v_3.length; $v_6++) {
        $v_1 = $v_3[$v_6];
        $v_2 = $v_1.attributes.getNamedItem("alias");
        if (!IsNull($v_2)) {
            $v_4 = $v_2.nodeValue;
            !isNullOrEmptyString($v_4) && Array.add($v_0, $v_4)
        }
    }
    var $v_5 = "aa";
    while (Array.contains($v_0, $v_5)) $v_5 = Mscrm.GridFilterUtil.$2j($v_5);
    return $v_5
};
Mscrm.GridFilterUtil.$2j = function ($p0) {
    var $v_0 = $p0.charCodeAt(0),
        $v_1 = $p0.charCodeAt(1);
    $v_1++;
    if ($v_1 > 122) {
        $v_1 = 97;
        $v_0++;
        if ($v_0 > 122) return null
    }
    return String.fromCharCode($v_0, $v_1)
};
Mscrm.GridFilterUtil.cleanupFetchXmlForRefresh = function (merged) {
    Mscrm.GridFilterUtil.removeEmptyFilterNodes(merged, false);
    Mscrm.GridFilterUtil.$1s(merged, false)
};
Mscrm.GridFilterUtil.cleanupFetchXmlForSave = function (merged) {
    Mscrm.GridFilterUtil.removeEmptyFilterNodes(merged, true);
    Mscrm.GridFilterUtil.$1s(merged, true);
    Mscrm.GridFilterUtil.$2M(merged);
    Mscrm.GridFilterUtil.cleanupGridFilterIds(merged)
};
Mscrm.GridFilterUtil.$1s = function ($p0, $p1) {
    Mscrm.GridFilterUtil.$3C($p0, false);
    Mscrm.GridFilterUtil.$3M($p0, $p1)
};
Mscrm.GridFilterUtil.$3M = function ($p0, $p1) {
    var $v_0 = XUI.Xml.SelectNodes($p0, "/fetch//link-entity", null),
        $v_1;
    if (!$v_0.length) return;
    for (var $v_2, $v_3, $v_4, $v_5 = 0; $v_5 < $v_0.length; $v_5++) {
        $v_2 = $v_0[$v_5];
        $v_1 = XUI.Xml.SelectNodes($v_2, ".//condition", null).length > 0;
        $v_3 = $v_2.attributes.getNamedItem("old-link-type");
        if (IsNull($v_3)) continue;
        if (!$v_1) {
            $v_4 = $p0.createAttribute("link-type");
            $v_4.value = $v_3.nodeValue;
            $v_2.attributes.setNamedItem($v_4);
            $v_2.attributes.removeNamedItem("old-link-type")
        } else $p1 && $v_2.attributes.removeNamedItem("old-link-type");
        $v_1 && !IsNull($v_2.attributes.getNamedItem("visible")) && $v_2.attributes.removeNamedItem("visible")
    }
};
Mscrm.GridFilterUtil.$3C = function ($p0, $p1) {
    var $v_0 = null;
    if ($p1) $v_0 = XUI.Xml.SelectNodes($p0, "/fetch//link-entity[not(*)]", null);
    else $v_0 = XUI.Xml.SelectNodes($p0, "/fetch//link-entity[not(*)][@" + Mscrm.GridFilterUtil.$1A + "='true']", null);
    for (var $v_1, $v_2 = 0; $v_2 < $v_0.length; $v_2++) {
        $v_1 = $v_0[$v_2];
        $v_1.parentNode.removeChild($v_1)
    }
};
Mscrm.GridFilterUtil.$2M = function ($p0) {
    var $v_0 = XUI.Xml.SelectNodes($p0, "/fetch//link-entity[@" + Mscrm.GridFilterUtil.$1A + "]", null);
    Mscrm.GridFilterUtil.$1h($v_0, Mscrm.GridFilterUtil.$1A)
};
Mscrm.GridFilterUtil.removeEmptyFilterNodes = function (transientFetchXml, hardRemove) {
    var $v_0 = null;
    if (hardRemove) $v_0 = XUI.Xml.SelectNodes(transientFetchXml, "/fetch//filter[not(*)]", null);
    else $v_0 = XUI.Xml.SelectNodes(transientFetchXml, "/fetch//filter[not(*)][not(@gridfilterid)]", null);
    for (var $v_1, $v_2 = 0; $v_2 < $v_0.length; $v_2++) {
        $v_1 = $v_0[$v_2];
        $v_1.parentNode.removeChild($v_1)
    }
};
Mscrm.GridFilterUtil.cleanupGridFilterIds = function (merged) {
    var $v_0 = XUI.Xml.SelectNodes(merged, "/fetch//filter[@gridfilterid]", null);
    Mscrm.GridFilterUtil.$1h($v_0, "gridfilterid");
    var $v_1 = XUI.Xml.SelectNodes(merged, "/fetch//condition[@gridfilterconditionid]", null);
    Mscrm.GridFilterUtil.$1h($v_1, "gridfilterconditionid")
};
Mscrm.GridFilterUtil.$1h = function ($p0, $p1) {
    for (var $v_0 = null, $v_1 = 0; $v_1 < $p0.length; $v_1++) {
        $v_0 = $p0[$v_1];
        if (IsNull($v_0.attributes.getNamedItem($p1))) continue;
        else $v_0.attributes.removeNamedItem($p1)
    }
};
Mscrm.GridFilterUtil.getAttributeXml = function (filterElement) {
    var $v_0 = filterElement.getAttribute("attributeXml");
    if (isNullOrEmptyString($v_0)) return null;
    else return $v_0
};
Mscrm.GridFilterUtil.isEqual = function (lhs, rhs) {
    if (IsNull(lhs) && IsNull(rhs)) return true;
    else if (IsNull(lhs) || IsNull(rhs)) return false;
    else return lhs.$8_0 === rhs.$8_0 && lhs.$2_0 === rhs.$2_0 && lhs.$H_0 === rhs.$H_0
};
Mscrm.GridFilterUtil.isOperatorEqual = function (join, conditionGroup) {
    if (IsNull(join) && IsNull(conditionGroup)) return true;
    else if (IsNull(join) || IsNull(conditionGroup)) return false;
    else return join === conditionGroup.$A_0
};
Mscrm.GridFilterUtil.isToggleableFilterAction = function (action) {
    switch (action) {
        case "IsNotNull":
        case "IsNull":
            return true;
        default:
            return false
    }
};
Mscrm.GridFilterUtil.getFilterPopupSetId = function (filterPopup) {
    var $v_0 = filterPopup.getAttribute("gridid");
    if (!isNullOrEmptyString($v_0)) return $v_0 + "_filterSet";
    else return "crmGrid_filterSet"
};
Mscrm.DateTimeFilterPopup = function (element) {
    this.$S_4 = [];
    this.$X_4 = [];
    this.$W_4 = [];
    this.$Y_4 = [];
    this.$T_4 = [];
    this.$U_4 = [];
    this.$m_4 = [];
    this.$x_4 = [];
    this.$s_4 = [];
    this.$y_4 = [];
    this.$o_4 = [];
    this.$p_4 = [];
    Mscrm.DateTimeFilterPopup.initializeBase(this, [element]);
    this._thisElement = element;
    this._type = "datetime"
};
Mscrm.DateTimeFilterPopup.prototype = {
    $n_4: false,
    initialize: function () {
        Mscrm.FilterPopup.prototype.initialize.call(this);
        Array.add(this.$S_4, this.$E_4("grid-filter-yesterday-checkbox"));
        Array.add(this.$S_4, this.$E_4("grid-filter-today-checkbox"));
        Array.add(this.$S_4, this.$E_4("grid-filter-tomorrow-checkbox"));
        Array.add(this.$X_4, this.$E_4("grid-filter-lastweek-checkbox"));
        Array.add(this.$X_4, this.$E_4("grid-filter-thisweek-checkbox"));
        Array.add(this.$X_4, this.$E_4("grid-filter-nextweek-checkbox"));
        Array.add(this.$W_4, this.$E_4("grid-filter-lastmonth-checkbox"));
        Array.add(this.$W_4, this.$E_4("grid-filter-thismonth-checkbox"));
        Array.add(this.$W_4, this.$E_4("grid-filter-nextmonth-checkbox"));
        Array.add(this.$Y_4, this.$E_4("grid-filter-lastyear-checkbox"));
        Array.add(this.$Y_4, this.$E_4("grid-filter-thisyear-checkbox"));
        Array.add(this.$Y_4, this.$E_4("grid-filter-nextyear-checkbox"));
        Array.add(this.$T_4, this.$E_4("grid-filter-lastfiscalperiod-checkbox"));
        Array.add(this.$T_4, this.$E_4("grid-filter-thisfiscalperiod-checkbox"));
        Array.add(this.$T_4, this.$E_4("grid-filter-nextfiscalperiod-checkbox"));
        Array.add(this.$U_4, this.$E_4("grid-filter-lastfiscalyear-checkbox"));
        Array.add(this.$U_4, this.$E_4("grid-filter-thisfiscalyear-checkbox"));
        Array.add(this.$U_4, this.$E_4("grid-filter-nextfiscalyear-checkbox"));
        Array.add(this.$m_4, "yesterday");
        Array.add(this.$m_4, "today");
        Array.add(this.$m_4, "tomorrow");
        Array.add(this.$x_4, "last-week");
        Array.add(this.$x_4, "this-week");
        Array.add(this.$x_4, "next-week");
        Array.add(this.$s_4, "last-month");
        Array.add(this.$s_4, "this-month");
        Array.add(this.$s_4, "next-month");
        Array.add(this.$y_4, "last-year");
        Array.add(this.$y_4, "this-year");
        Array.add(this.$y_4, "next-year");
        Array.add(this.$o_4, "last-fiscal-period");
        Array.add(this.$o_4, "this-fiscal-period");
        Array.add(this.$o_4, "next-fiscal-period");
        Array.add(this.$p_4, "last-fiscal-year");
        Array.add(this.$p_4, "this-fiscal-year");
        Array.add(this.$p_4, "next-fiscal-year")
    },
    CheckBoxChanged: function (id, popUp) {
        this.$n_4 = true
    },
    FilterChanged: function (item) {
        if (!IsNull(item.get_itemContents().getElementsByTagName("input")[0])) this.$2p_4(item);
        else this.$2t_4(item)
    },
    $2p_4: function ($p0) {
        var $v_0 = $p0.get_menuItemId(),
            $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + $v_0 + "']", null);
        this.$n_4 = true;
        if ($p0.get_isCheckboxChecked()) $v_1 = this.setAttributeUtil($v_1, "ischecked", "true");
        else $v_1 = this.setAttributeUtil($v_1, "ischecked", "false")
    },
    $2t_4: function ($p0) {
        var $v_0 = $p0.get_menuItemId(),
            $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + $v_0 + "']", null);
        $v_0 = XUI.Xml.GetText($v_1.attributes.getNamedItem("type"));
        if (!IsNull($v_1.attributes.getNamedItem("filterconditionxpath")) && XUI.Xml.GetText($v_1.attributes.getNamedItem("type")) === $v_0) if (!Mscrm.GridFilterUtil.isToggleableFilterAction($v_0) && XUI.Xml.GetText($v_1.attributes.getNamedItem("filterconditionxpath"))) return;
        Mscrm.FilterPopup.prototype.FilterChanged.call(this, $p0);
        this.$n_4 = false
    },
    ProcessOkButtonClick: function (menu) {
        var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
        if (this.$n_4 && this.isDateTimeFilterDirty()) {
            this.ClearFilterConditions(true, true);
            this.$2r_4();
            $v_0.ApplyFilters()
        } else {
            this.$n_4 = false;
            return
        }
    },
    $2r_4: function () {
        var $v_0 = this.$2d_4();
        if (IsNull($v_0) || !$v_0.length) this.$1t_4();
        else {
            for (var $v_1 = null, $v_2 = null, $v_3 = 0; $v_3 < this.get_appliedFilters().$1_0.length; $v_3++) {
                $v_2 = this.get_appliedFilters().$1_0[$v_3];
                var $v_4 = $v_2.$2_0;
                if (getDateFilterGroup($v_4) && $v_2.$5_0 && !$v_2.$G_0) {
                    $v_1 = $v_2;
                    break
                }
            }
            if (IsNull($v_1)) for (var $v_5 = 0; $v_5 < $v_0.length; $v_5++) {
                var $v_6 = $v_0[$v_5];
                $v_6.$5_0 = false;
                $v_6.$7_0 = true;
                Array.add(this.get_appliedFilters().$1_0, $v_6)
            } else {
                var $v_7 = $v_1.$6_0,
                    $v_8 = Mscrm.GridFilterUtil.getParentFilterXPathFromConditionXPath($v_7);
                this.$1t_4();
                for (var $v_9 = 0; $v_9 < $v_0.length; $v_9++) {
                    var $v_A = $v_0[$v_9],
                        $v_B = new Sys.StringBuilder;
                    $v_B.append($v_8);
                    $v_B.append('/condition[@gridfilterconditionid="');
                    $v_B.append(Mscrm.GridFilterUtil.createUniqueId());
                    $v_B.append('"]');
                    $v_A.$6_0 = $v_B.toString();
                    $v_A.$5_0 = false;
                    $v_A.$7_0 = true;
                    Array.add(this.get_appliedFilters().$1_0, $v_A)
                }
            }
        }
        this.clearBackup()
    },
    clearUI: function () {
        Mscrm.FilterPopup.prototype.clearUI.call(this);
        this.$z_4(this.$S_4);
        this.$z_4(this.$X_4);
        this.$z_4(this.$W_4);
        this.$z_4(this.$Y_4);
        this.$z_4(this.$T_4);
        this.$z_4(this.$U_4)
    },
    initUI: function () {
        Mscrm.FilterPopup.prototype.initUI.call(this);
        for (var $v_0 = new Array(Mscrm.DateFilterGroup.get_getTotalNoOfGroups()), $v_1 = new Array(Mscrm.DateFilterGroup.get_getTotalNoOfGroups()), $v_4 = 0; $v_4 < $v_0.length; $v_4++) $v_0[$v_4] = false;
        for (var $v_2 = this.$2m_4(), $v_3 = false, $v_5 = 0; $v_5 < this.get_appliedFilters().$1_0.length; $v_5++) {
            var $v_6 = this.get_appliedFilters().$1_0[$v_5],
                $v_7 = $v_6.$2_0,
                $v_8 = this.$2a_4($v_2, $v_6);
            $v_3 = $v_8 !== -1 ? true : false;
            $v_3 && Array.removeAt($v_2, $v_8);
            var $v_9 = getDateFilterGroup($v_7);
            if ($v_9) {
                if (!$v_0[$v_9]) {
                    $v_0[$v_9] = !$v_3;
                    $v_1[$v_9] = $v_6.$6_0
                }
                this._isFilterPopUpDirty = !$v_3 ? true : this._isFilterPopUpDirty
            }
        }
        for (var $v_A = 0; $v_A < $v_2.length; $v_A++) {
            var $v_B = getDateFilterGroup($v_2[$v_A].$2_0);
            $v_0[$v_B] = true;
            $v_1[$v_B] = $v_2[$v_A].$6_0;
            this._isFilterPopUpDirty = true
        }
        for (var $v_C = 0; $v_C < Mscrm.DateFilterGroup.get_getTotalNoOfGroups() ; $v_C++) if ($v_C && !isNullOrEmptyString($v_1[$v_C])) if ($v_C === 1) this.setCheckmark(this.getId("DayFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        else if ($v_C === 2) this.setCheckmark(this.getId("WeekFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        else if ($v_C === 3) this.setCheckmark(this.getId("MonthFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        else if ($v_C === 4) this.setCheckmark(this.getId("YearFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        else if ($v_C === 5) this.setCheckmark(this.getId("FiscalPeriodFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        else $v_C === 6 && this.setCheckmark(this.getId("FiscalYearFilterSubMenu"), !$v_0[$v_C], $v_1[$v_C]);
        if (this._isFilterPopUpDirty) this.setMenuUIDirty(true);
        else this.setMenuUIDirty(false);
        for (var $v_D = 0; $v_D < this.get_appliedFilters().$1_0.length; $v_D++) {
            for (var $v_E = this.get_appliedFilters().$1_0[$v_D], $v_F = $v_E.$2_0, $v_G = false, $v_H = 0; $v_H < 3; $v_H++) if ($v_F === this.$m_4[$v_H]) {
                var $v_I = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$S_4[$v_H] + "']", null);
                $v_I = this.setAttributeUtil($v_I, "ischecked", "true");
                $v_I = this.setAttributeUtil($v_I, "isdummychecked", "true");
                $v_G = true;
                break
            }
            if ($v_G) continue;
            for (var $v_J = 0; $v_J < 3; $v_J++) if ($v_F === this.$x_4[$v_J]) {
                var $v_K = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$X_4[$v_J] + "']", null);
                $v_K = this.setAttributeUtil($v_K, "ischecked", "true");
                $v_K = this.setAttributeUtil($v_K, "isdummychecked", "true");
                $v_G = true;
                break
            }
            if ($v_G) continue;
            for (var $v_L = 0; $v_L < 3; $v_L++) if ($v_F === this.$s_4[$v_L]) {
                var $v_M = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$W_4[$v_L] + "']", null);
                $v_M = this.setAttributeUtil($v_M, "ischecked", "true");
                $v_M = this.setAttributeUtil($v_M, "isdummychecked", "true");
                $v_G = true;
                break
            }
            if ($v_G) continue;
            for (var $v_N = 0; $v_N < 3; $v_N++) if ($v_F === this.$y_4[$v_N]) {
                var $v_O = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$Y_4[$v_N] + "']", null);
                $v_O = this.setAttributeUtil($v_O, "ischecked", "true");
                $v_O = this.setAttributeUtil($v_O, "isdummychecked", "true");
                $v_G = true;
                break
            }
            if ($v_G) continue;
            for (var $v_P = 0; $v_P < 3; $v_P++) if ($v_F === this.$o_4[$v_P]) {
                var $v_Q = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$T_4[$v_P] + "']", null);
                $v_Q = this.setAttributeUtil($v_Q, "ischecked", "true");
                $v_Q = this.setAttributeUtil($v_Q, "isdummychecked", "true");
                $v_G = true;
                break
            }
            if ($v_G) continue;
            for (var $v_R = 0; $v_R < 3; $v_R++) if ($v_F === this.$p_4[$v_R]) {
                var $v_S = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + this.$U_4[$v_R] + "']", null);
                $v_S = this.setAttributeUtil($v_S, "ischecked", "true");
                $v_S = this.setAttributeUtil($v_S, "isdummychecked", "true");
                $v_G = true;
                break
            }
        }
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
    },
    isDateTimeFilterDirty: function () {
        if (this.$10_4(this.$S_4) || this.$10_4(this.$X_4) || this.$10_4(this.$W_4) || this.$10_4(this.$Y_4) || this.$10_4(this.$T_4) || this.$10_4(this.$U_4)) return true;
        return false
    },
    SetUIUndirty: function (menu) {
        this.resetDateTimeCheckBox(this.$S_4);
        this.resetDateTimeCheckBox(this.$X_4);
        this.resetDateTimeCheckBox(this.$W_4);
        this.resetDateTimeCheckBox(this.$Y_4);
        this.resetDateTimeCheckBox(this.$T_4);
        this.resetDateTimeCheckBox(this.$U_4);
        this.$n_4 = false
    },
    resetDateTimeCheckBox: function (checkBoxes) {
        for (var $v_0, $v_1 = 0; $v_1 < checkBoxes.length; $v_1++) {
            var $v_2 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + checkBoxes[$v_1] + "']", null);
            $v_0 = XUI.Xml.GetText($v_2.attributes.getNamedItem("isdummychecked"));
            if (!IsNull($v_0) && Boolean.parse($v_0.toString())) $v_2 = this.setAttributeUtil($v_2, "ischecked", "true");
            else $v_2 = this.setAttributeUtil($v_2, "ischecked", "false")
        }
    },
    $z_4: function ($p0) {
        for (var $v_0 = 0; $v_0 < $p0.length; $v_0++) {
            var $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + $p0[$v_0] + "']", null);
            $v_1 = this.setAttributeUtil($v_1, "ischecked", "false");
            $v_1 = this.setAttributeUtil($v_1, "isdummychecked", "false")
        }
    },
    $1t_4: function () {
        for (var $v_0 = null, $v_1 = [], $v_2 = 0; $v_2 < this.get_appliedFilters().$1_0.length; $v_2++) {
            $v_0 = this.get_appliedFilters().$1_0[$v_2];
            var $v_3 = $v_0.$2_0;
            getDateFilterGroup($v_3) && $v_0.$5_0 && !$v_0.$G_0 && Array.add($v_1, $v_0)
        }
        for (var $v_4 = 0; $v_4 < $v_1.length; $v_4++) Array.remove(this.get_appliedFilters().$1_0, $v_1[$v_4])
    },
    $2d_4: function () {
        var $v_0 = [];
        Array.add($v_0, this.$S_4);
        Array.add($v_0, this.$X_4);
        Array.add($v_0, this.$W_4);
        Array.add($v_0, this.$Y_4);
        Array.add($v_0, this.$T_4);
        Array.add($v_0, this.$U_4);
        var $v_1 = [];
        Array.add($v_1, this.$m_4);
        Array.add($v_1, this.$x_4);
        Array.add($v_1, this.$s_4);
        Array.add($v_1, this.$y_4);
        Array.add($v_1, this.$o_4);
        Array.add($v_1, this.$p_4);
        for (var $v_2 = [], $v_3, $v_4, $v_5 = false, $v_6 = 0; $v_6 < $v_0.length; $v_6++) {
            $v_3 = $v_0[$v_6];
            $v_4 = $v_1[$v_6];
            for (var $v_7 = 0; $v_7 < $v_3.length; $v_7++) {
                var $v_8 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + $v_3[$v_7] + "']", null);
                if (XUI.Xml.GetText($v_8.attributes.getNamedItem("ischecked")) === "true") $v_5 = true;
                else $v_5 = false;
                $v_5 && Array.add($v_2, new Mscrm.FilterCondition(1, $v_4[$v_7], "", false, ""))
            }
        }
        return $v_2
    },
    $E_4: function ($p0) {
        var $v_0 = new Sys.StringBuilder;
        $v_0.append($p0);
        $v_0.append(this._thisElement.getAttribute("gridid"));
        $v_0.append(this._entityName);
        $v_0.append(this._attributeName);
        $v_0.append(this._relationshipName);
        return $v_0.toString()
    },
    $10_4: function ($p0) {
        for (var $v_0, $v_1 = 0; $v_1 < $p0.length; $v_1++) {
            var $v_2 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@buttonId='" + $p0[$v_1] + "']", null);
            $v_0 = XUI.Xml.GetText($v_2.attributes.getNamedItem("isdummychecked"));
            var $v_3;
            if (XUI.Xml.GetText($v_2.attributes.getNamedItem("ischecked")) === "true") $v_3 = true;
            else $v_3 = false;
            if (!IsNull($v_0) && Boolean.parse($v_0.toString()) !== $v_3 || IsNull($v_0) && $v_3) return true
        }
        return false
    },
    describeOrdinaryFilters: function () {
        var $v_0 = this.get_appliedFilters().$1_0;
        if (!$v_0.length) return "";
        for (var $v_1 = new Sys.StringBuilder, $v_2 = new Sys.StringBuilder, $v_3 = String.format(" {0} ", window.LOCID_GF_AND), $v_4 = 0; $v_4 < $v_0.length; $v_4++) {
            var $v_5 = $v_0[$v_4],
                $v_6 = getDateFilterGroup($v_5.$2_0);
            if ($v_6) {
                !$v_1.isEmpty() && $v_1.append(";");
                $v_1.append(this.describeOrdinaryCondition($v_5))
            } else {
                !$v_2.isEmpty() && $v_2.append($v_3);
                $v_2.append(this.describeOrdinaryCondition($v_5))
            }
        }
        if (!$v_1.isEmpty()) {
            var $v_7 = String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, window.LOCID_AF_EQUALS, $v_1.toString());
            if (!$v_2.isEmpty()) {
                $v_2.append($v_3);
                $v_2.append("\r\n");
                $v_2.append($v_7);
                return $v_2.toString()
            } else return $v_7
        } else if (!$v_2.isEmpty()) return $v_2.toString();
        else return ""
    },
    describeCustomFilters: function () {
        var $v_0 = this.get_appliedFilters().getCustomFilterConditionsCount();
        if ($v_0 > 0) {
            var $v_1 = new Sys.StringBuilder,
                $v_2 = this.get_appliedFilters().$0_0;
            $v_1.append(this.$1b_4($v_2.$3_0, false));
            if ($v_0 > 1) {
                $v_1.append(" ");
                $v_1.append($v_2.$A_0 === 1 ? window.LOCID_GF_AND : window.LOCID_GF_OR);
                $v_1.append("\r\n");
                $v_1.append(this.$1b_4($v_2.$4_0, false))
            }
            return $v_1.toString()
        } else return null
    },
    describeOrdinaryCondition: function (condition) {
        return this.$1b_4(condition, true)
    },
    $1b_4: function ($p0, $p1) {
        if ($p0.$2_0 === "containsdata" || $p0.$2_0 === "not-null") return window.LOCID_AF_CONTAINSDATA;
        else if ($p0.$2_0 === "doesnotcontaindata" || $p0.$2_0 === "null") return window.LOCID_AF_DOESNOTCONTAINDATA;
        else if (isDynamicDateOperator($p0.$2_0)) {
            var $v_0 = getParameterizedLabelForDynamicOperator($p0.$2_0),
                $v_1 = String.format($v_0, $p0.$8_0);
            return String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, window.LOCID_AF_EQUALS, $v_1)
        } else if (isOperatorExpectsDateTimeOperand($p0.$2_0)) {
            var $v_2 = getLabelForOperator($p0.$2_0),
                $v_3 = $p0.$8_0;
            if (!isNullOrEmptyString($v_3)) {
                var $v_4 = this.$36_4($p0.$8_0),
                    $v_5 = Mscrm.DateTimeUtility.formatDate($v_4);
                if (!isNullOrEmptyString($v_5)) $v_3 = $v_5
            }
            return String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, $v_2, $v_3)
        } else if (isDateTimeOperandPiclklist($p0.$2_0)) {
            var $v_6 = String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, getLabelForOperator($p0.$2_0), this.$2c_4($p0.$2_0, $p0.$8_0));
            return String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, window.LOCID_AF_EQUALS, $v_6)
        } else {
            var $v_7 = Mscrm.FilterPopup.prototype.describeOrdinaryCondition.call(this, $p0);
            if ($p1) return $v_7;
            else return String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, window.LOCID_AF_EQUALS, $v_7)
        }
    },
    $2a_4: function ($p0, $p1) {
        if (IsNull($p0)) return -1;
        for (var $v_0 = 0; $v_0 < $p0.length; $v_0++) if ($p0[$v_0].$2_0 === $p1.$2_0) return $v_0;
        return -1
    },
    $2m_4: function () {
        for (var $v_0 = [], $v_1 = null, $v_2 = 0; $v_2 < this._originalFilters.length; $v_2++) {
            $v_1 = this._originalFilters[$v_2];
            getDateFilterGroup($v_1.$2_0) && Array.add($v_0, $v_1)
        }
        return $v_0
    },
    $36_4: function ($p0) {
        if ($p0.length > 10) return new Date(parseInt($p0.substr(0, 4), 10), parseInt($p0.substr(5, 2), 10) - 1, parseInt($p0.substr(8, 2), 10), parseInt($p0.substr(11, 2), 10), parseInt($p0.substr(14, 2), 10), parseInt($p0.substr(17, 2), 10));
        else return new Date(parseInt($p0.substr(0, 4), 10), parseInt($p0.substr(5, 2), 10) - 1, parseInt($p0.substr(8, 2), 10))
    },
    $2c_4: function ($p0, $p1) {
        if (isNullOrEmptyString($p1)) return "";
        switch ($p0) {
            case "in-fiscal-year":
                var $v_0 = parseInt($p1, 10);
                return this.$1P_4(window.FiscalYearDisplayName, $v_0);
            case "in-fiscal-period":
                var $v_1 = parseInt($p1, 10);
                return this.$1P_4(window.FiscalPeriodDisplayName, $v_1);
            case "in-fiscal-period-and-year":
            case "in-or-before-fiscal-period-and-year":
            case "in-or-after-fiscal-period-and-year":
                var $v_2 = XUI.Xml.SelectNodes(XUI.Xml.LoadXml($p1), "/values/value", null);
                $v_1 = parseInt(XUI.Xml.GetText($v_2[0]), 10);
                $v_0 = parseInt(XUI.Xml.GetText($v_2[1]), 10);
                return String.format("{0} {1}", this.$1P_4(window.FiscalPeriodDisplayName, $v_1), this.$1P_4(window.FiscalYearDisplayName, $v_0));
            default:
                return $p1
        }
    },
    $1P_4: function ($p0, $p1) {
        var $v_0 = $p1.toString();
        if (IsNull($p0)) return $v_0;
        var $v_1 = $p0[$v_0];
        if (isNullOrEmptyString($v_1)) $v_1 = $v_0;
        return $v_1
    }
};
Mscrm.FilterPopup = function (element) {
    this.$$d_filterMenuHidden = Function.createDelegate(this, this.filterMenuHidden);
    this.$$d_$35_3 = Function.createDelegate(this, this.$35_3);
    this.$$d_$34_3 = Function.createDelegate(this, this.$34_3);
    this.$$d_$33_3 = Function.createDelegate(this, this.$33_3);
    this.$$d_MenuItemClicked = Function.createDelegate(this, this.MenuItemClicked);
    Mscrm.FilterPopup.initializeBase(this, [element]);
    this._thisElement = element
};
Mscrm.FilterPopup.prototype = {
    $9_3: null,
    $q_3: false,
    $12_3: null,
    $a_3: null,
    $1i_3: false,
    xmlString: null,
    menu: null,
    $2I_3: null,
    _newAlink: null,
    _newLilink: null,
    _thisElement: null,
    _type: null,
    _entityName: null,
    _attributeName: null,
    _attributeFormat: null,
    _attributeType: null,
    _relationshipName: "",
    _isFromRelated: false,
    _originalFilters: null,
    _originalCustomFilterConditionGroup: null,
    _isFilterPopUpDirty: false,
    $h_3: null,
    _attribXml: null,
    _attributeXmlDocument: null,
    _resultNode: null,
    _attributeDisplayName: "",
    _appliedFiltersOld: null,
    get_appliedFilters: function () {
        return this.$9_3
    },
    set_appliedFilters: function (value) {
        this.$9_3 = value;
        if (!IsNull(this.$9_3.$1_0)) {
            this._originalFilters = [];
            for (var $v_0 = 0; $v_0 < this.$9_3.$1_0.length; $v_0++) {
                var $v_1 = this.$9_3.$1_0[$v_0];
                Array.add(this._originalFilters, this.cloneFilterCondition($v_1))
            }
        }
        if (!IsNull(this.$9_3.$0_0)) this._originalCustomFilterConditionGroup = new Mscrm.CustomFilterConditionGroup(this.cloneFilterCondition(this.$9_3.$0_0.$3_0), this.cloneFilterCondition(this.$9_3.$0_0.$4_0), this.$9_3.$0_0.$A_0);
        return value
    },
    get_isFilterPopUpDirty: function () {
        return this._isFilterPopUpDirty
    },
    set_isFilterPopUpDirty: function (value) {
        this._isFilterPopUpDirty = value;
        return value
    },
    MenuItemClicked: function (eventCode, parameters) {
        if (eventCode === 0) this.FilterChanged(parameters["menuitem"]);
        else if (eventCode === 1) this.ProcessOkButtonClick(null);
        else eventCode === 2 && this.SetUIUndirty(null)
    },
    FilterChanged: function (item) {
        if (!IsNull(item)) {
            var $v_0 = item.get_menuItemId(),
                $v_1 = false,
                $v_2 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + $v_0 + "']", null);
            $v_0 = XUI.Xml.GetText($v_2.attributes.getNamedItem("type"));
            if (!IsNull($v_2.attributes.getNamedItem("filterconditionxpath")) && XUI.Xml.GetText($v_2.attributes.getNamedItem("type")) === $v_0) {
                if (!Mscrm.GridFilterUtil.isToggleableFilterAction($v_0) && XUI.Xml.GetText($v_2.attributes.getNamedItem("filterconditionxpath"))) return;
                $v_1 = true
            }
            var $v_3 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
            if ($v_0 === "CustomFilters") {
                var $v_4 = Mscrm.Utilities.createCallbackFunctionObject("filterChangedCallback", this, null);
                this.handleCustomFiltersClick($v_4);
                Mscrm.Utilities.isModalDialogSupported() && this.filterChangedCallback();
                return
            } else if ($v_0 === "SortAsc" || $v_0 === "SortDesc") {
                var $v_5 = false,
                    $v_6 = $v_0 === "SortAsc" ? true : false;
                if (!IsNull(window.event) && window.event.shiftKey) $v_5 = true;
                $v_3.sortColumns(this._thisElement, $v_6, $v_5)
            } else {
                this.ClearFilterConditions(true, true);
                switch ($v_0) {
                    case "ResetFilter":
                        break;
                    case "IsNotNull":
                        this.handleNullNotNullItemClick(false, $v_1);
                        break;
                    case "IsNull":
                        this.handleNullNotNullItemClick(true, $v_1);
                        break;
                    default:
                        break
                }
            }
            this.filterChangedCallback()
        }
    },
    filterChangedCallback: function () {
        var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
        $v_0.ApplyFilters()
    },
    initialize: function () {
        if (!IsNull($find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement)))) {
            Mscrm.CrmUIControl.prototype.initialize.call(this);
            var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
            $v_0.RegisterFilterPopup(this._thisElement.id, this._type, "initialize");
            if (IsNull(this.$9_3) || IsNull(this.$9_3.$B_0)) {
                this._attributeName = this._thisElement.getAttribute("attributename");
                this._attributeType = this._thisElement.getAttribute("attributetype");
                this._entityName = this._thisElement.getAttribute("entityname");
                this._isFromRelated = this._thisElement.getAttribute("isfromrelatedentity") === "true" ? true : false;
                if (!IsNull(this._thisElement.getAttribute("relationshipname"))) this._relationshipName = this._thisElement.getAttribute("relationshipname");
                else this._relationshipName = "";
                this._attributeFormat = this._thisElement.getAttribute("attributeformat");
                this.$9_3 = new Mscrm.FilterConditionCollection(this._attributeName, this._attributeType, this._isFromRelated, this._entityName, this._attributeFormat)
            }
            this._attribXml = Mscrm.GridFilterUtil.getAttributeXml(this._thisElement);
            this._attributeXmlDocument = XUI.Xml.LoadXml(this._attribXml);
            this._resultNode = XUI.Xml.SelectSingleNode(this._attributeXmlDocument, "/attributeinfo/result", null);
            this._attributeDisplayName = XUI.Xml.GetText(this._resultNode);
            !Mscrm.PageManager.isOutlookProxyPage() && this.$2X_3()
        }
        this.$2N_3()
    },
    clearBackup: function () {
        if (this.$q_3) {
            this.$12_3 = null;
            this.$a_3 = null;
            this.$q_3 = false
        }
    },
    onEnable: function () {
        this.initUI()
    },
    onDisable: function () {
        this.clearUI();
        !IsNull(this.menu.get_currentMenu()) && this.menu.get_currentMenu().get_isVisible() && this.menu.get_currentMenu().hideAll(true)
    },
    onFilterApplied: function () {
        this.clearUI();
        this.initUI()
    },
    initUI: function () {
        if (!IsNull(this._thisElement) && this.get_appliedFilters().$V_0) if (IsNull(this._thisElement.attributes.getNamedItem("iscomplexfilter")) || !Mscrm.Utilities.parseBoolean(this._thisElement.attributes.getNamedItem("iscomplexfilter").value)) {
            this._thisElement.setAttribute("iscomplexfilter", "true");
            var $v_3 = this.menu.get_menuXml().createElement("MenuItem");
            this.setAttributeUtil($v_3, "type", Mscrm.MenuTypes.SPACER);
            var $v_4 = XUI.Xml.DomUtils.GetFirstChild(this.menu.get_menuXml()),
                $v_5 = XUI.Xml.DomUtils.GetFirstChild($v_4);
            $v_4.insertBefore($v_3, $v_5);
            $v_3 = this.menu.get_menuXml().createElement("MenuItem");
            this.setAttributeUtil($v_3, "type", Mscrm.MenuTypes.NOTIFICATION);
            $v_4.insertBefore($v_3, $v_5)
        }
        var $v_0 = this.get_appliedFilters().getCustomFilterConditionsCount(),
            $v_1 = this.get_appliedFilters().getOrdinaryFilterConditionsCount();
        this._isFilterPopUpDirty = false;
        for (var $v_2 = false, $v_6 = 0; $v_6 < $v_1; $v_6++) {
            var $v_7 = this.get_appliedFilters().$1_0[$v_6],
                $v_8 = $v_7.$2_0,
                $v_9 = $v_7.$5_0;
            if ($v_8 === "null") {
                this.setCheckmark(this.getId("IsNull"), $v_9, $v_7.$6_0);
                $v_2 = true;
                this._isFilterPopUpDirty = !$v_9 ? true : this._isFilterPopUpDirty
            } else if ($v_8 === "not-null") {
                this.setCheckmark(this.getId("IsNotNull"), $v_9, $v_7.$6_0);
                $v_2 = true;
                this._isFilterPopUpDirty = !$v_9 ? true : this._isFilterPopUpDirty
            }
        }
        if (!$v_2) for (var $v_A = 0; $v_A < this._originalFilters.length; $v_A++) {
            var $v_B = this._originalFilters[$v_A],
                $v_C = $v_B.$2_0;
            if ($v_C === "null" || $v_C === "not-null") {
                this._isFilterPopUpDirty = true;
                break
            }
        }
        if ($v_0 > 0) {
            var $v_D = this.get_appliedFilters().$0_0,
                $v_E = true;
            if (!IsNull($v_D.$3_0)) $v_E = $v_D.$3_0.$5_0;
            if (!IsNull($v_D.$4_0)) $v_E = $v_E && $v_D.$4_0.$5_0 && this.$2y_3($v_D, this._originalCustomFilterConditionGroup);
            this.setCheckmark(this.getId("CustomFilters"), $v_E, "");
            if (!$v_E) this._isFilterPopUpDirty = true
        } else if (!IsNull(this._originalCustomFilterConditionGroup)) {
            this._isFilterPopUpDirty = true;
            this.setCheckmark(this.getId("CustomFilters"), false, "")
        }
        if (this._isFilterPopUpDirty) this.setMenuUIDirty(true);
        else this.setMenuUIDirty(false);
        !Mscrm.PageManager.isOutlookProxyPage() && this.$3I_3(this.GetTooltipText())
    },
    GetTooltipText: function () {
        var $v_0, $v_1 = this.describe();
        if (isNullOrEmptyString($v_1)) $v_0 = window.LOCID_GF_NOFILTERAPPLIEDTEXT;
        else $v_0 = String.format("{0}\r\n\r\n{1}", this._attributeDisplayName, $v_1);
        return $v_0
    },
    describe: function () {
        if (this.get_appliedFilters().$V_0) return window.LOCID_GF_COMPLEXCRITERIA;
        var $v_0 = new Sys.StringBuilder,
            $v_1 = this.describeOrdinaryFilters(),
            $v_2 = this.describeCustomFilters();
        $v_0.append($v_1);
        if (!isNullOrEmptyString($v_1) && !isNullOrEmptyString($v_2)) {
            $v_0.append(" ");
            $v_0.append(window.LOCID_GF_AND);
            $v_0.append("\r\n")
        }
        $v_0.append($v_2);
        return $v_0.toString()
    },
    describeOrdinaryFilters: function () {
        for (var $v_0 = String.format(" {0} ", window.LOCID_GF_AND), $v_1 = this.get_appliedFilters().$1_0, $v_2 = new Sys.StringBuilder, $v_3 = 0; $v_3 < $v_1.length; $v_3++) {
            $v_3 > 0 && $v_2.append($v_0);
            var $v_4 = $v_1[$v_3];
            $v_2.append(this.describeOrdinaryCondition($v_4))
        }
        return $v_2.toString()
    },
    describeOrdinaryCondition: function (condition) {
        return condition.describe()
    },
    describeCustomFilters: function () {
        var $v_0 = this.get_appliedFilters().getCustomFilterConditionsCount();
        if ($v_0 > 0) {
            var $v_1 = new Sys.StringBuilder,
                $v_2 = this.get_appliedFilters().$0_0;
            $v_1.append(this.describeOrdinaryCondition($v_2.$3_0));
            if ($v_0 > 1) {
                $v_1.append(" ");
                $v_1.append($v_2.$A_0 === 1 ? window.LOCID_GF_AND : window.LOCID_GF_OR);
                $v_1.append("\r\n");
                $v_1.append(this.describeOrdinaryCondition($v_2.$4_0))
            }
            return $v_1.toString()
        } else return null
    },
    $2y_3: function ($p0, $p1) {
        if (IsNull($p1)) return false;
        var $v_0 = $p1.$A_0;
        if (!IsNull($v_0) && $v_0 === $p0.$A_0) return true;
        return false
    },
    $3I_3: function ($p0) {
        if ($p0.length < 500) {
            this.$h_3.alt = $p0;
            this.$h_3.title = $p0
        } else {
            var $v_0 = $p0.substr(0, 500) + "...";
            this.$h_3.alt = $v_0;
            this.$h_3.title = $v_0
        }
    },
    setMenuUIDirty: function (containsUnsavedConditions) {
        var $v_0;
        if (containsUnsavedConditions) {
            $v_0 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/dropdown_wfilter.png"));
            this.enableResetFiltersOption(true)
        } else {
            $v_0 = Mscrm.ImageStrip.getImageInfo(Mscrm.CrmUri.create("/_imgs/dropdown.png"));
            this.enableResetFiltersOption(false)
        }
        if (!Mscrm.PageManager.isOutlookProxyPage()) {
            this.$h_3.src = $v_0.source;
            this.$h_3.className = "ms-crm-Menu-ButtonFilter " + $v_0.cssClass
        }
    },
    enableResetFiltersOption: function (isEnabled) {
        var $v_0 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + this.getId("ResetFilter") + "']", null);
        if (isEnabled) {
            $v_0 = this.setAttributeUtil($v_0, "isenabled", "True");
            $v_0 = this.setAttributeUtil($v_0, "iconPath", "/_imgs/grid/reset.png")
        } else {
            $v_0 = this.setAttributeUtil($v_0, "isenabled", "False");
            $v_0 = this.setAttributeUtil($v_0, "iconPath", "/_imgs/grid/disablereset.png")
        }
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
    },
    setCheckmark: function (id, isOriginalSavedQueryCheckMark, filterConditionXPath) {
        var $v_0 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + id + "']", null);
        if (!IsNull(filterConditionXPath) && filterConditionXPath !== "") $v_0 = this.setAttributeUtil($v_0, "filterconditionxpath", filterConditionXPath);
        var $v_1 = this.menu.get_menuXml().createAttribute("iconPath");
        if (isOriginalSavedQueryCheckMark) $v_1.value = "/_imgs/selected_nohighlight.png";
        else $v_1.value = "/_imgs/selected_highlight.png";
        $v_0.attributes.setNamedItem($v_1)
    },
    clearUI: function () {
        for (var $v_0 = "mnu" + this._thisElement.id, $v_1 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//MenuItem", null), $v_2 = 0; $v_2 < $v_1.length; $v_2++) {
            !IsNull($v_1[$v_2].attributes.getNamedItem("filterconditionxpath")) && $v_1[$v_2].attributes.removeNamedItem("filterconditionxpath");
            if (!IsNull($v_1[$v_2].attributes.getNamedItem("iconPath"))) if (XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("type")) === "SortAsc" || XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("type")) === "SortDesc" || XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("type")) === "ResetFilter") continue;
            else this.setAttributeUtil($v_1[$v_2], "iconPath", "/_imgs/imagestrips/transparent_spacer.gif")
        }
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
    },
    rollBackDrillDownCondition: function () {
        if (this.$q_3) {
            this.$3F_3();
            this.$q_3 = false;
            this.$2D_3(false)
        }
    },
    setAttributeUtil: function (node, attr, value) {
        if (!isNullOrEmptyString(value)) {
            var $v_0 = node.ownerDocument.createAttribute(attr);
            $v_0.value = value;
            node.attributes.setNamedItem($v_0);
            return node
        }
        return node
    },
    setDrillDownCondition: function (value, lookupParameter, formattedXValue, startDate, endDate, refresh) {
        if (!this.$q_3) {
            this.$2J_3();
            this.ClearFilterConditions(true, false);
            this.$q_3 = true;
            var $v_0 = IsNull(value) ? "" : value,
                $v_1, $v_2 = null;
            if (!isNullOrEmptyString(startDate) && !isNullOrEmptyString(endDate)) {
                $v_1 = this.constructDrillDownEqualsCondition(startDate, lookupParameter, formattedXValue, 2, "on-or-after");
                $v_2 = this.constructDrillDownEqualsCondition(endDate, lookupParameter, formattedXValue, 2, "on-or-before");
                $v_2.$7_0 = true
            } else if ($v_0 !== "") $v_1 = this.constructDrillDownEqualsCondition($v_0, lookupParameter, formattedXValue, 0, null);
            else $v_1 = new Mscrm.FilterCondition(1, "null", $v_0, false, null);
            $v_1.$7_0 = true;
            var $v_3 = new Mscrm.CustomFilterConditionGroup($v_1, $v_2, 1);
            if (!IsNull(this.get_appliedFilters().$0_0)) if (!IsNull(this.get_appliedFilters().$0_0.$O_0)) {
                $v_3.$O_0 = this.get_appliedFilters().$0_0.$O_0;
                if (!IsNull(this.get_appliedFilters().$0_0.$K_0)) $v_3.$K_0 = this.get_appliedFilters().$0_0.$K_0
            }
            this.get_appliedFilters().$0_0 = $v_3;
            this.$2D_3(refresh)
        }
    },
    constructDrillDownEqualsCondition: function ($p0, $p1, $p2, $p3, $p4) {
        var $v_0 = null;
        switch (getAbstractDataType(this.get_appliedFilters().$Z_0)) {
            case "lookup":
            case "owner":
                $v_0 = new Mscrm.FilterCondition(2, "in", '<values><value uiname="' + CrmEncodeDecode.CrmXmlAttributeEncode($p2) + '" uitype="' + CrmEncodeDecode.CrmXmlAttributeEncode($p1) + '" >' + CrmEncodeDecode.CrmXmlEncode($p0) + "</value></values>", false, null);
                break;
            case "picklist":
                $v_0 = new Mscrm.FilterCondition(2, "in", "<values><value>" + CrmEncodeDecode.CrmXmlEncode($p0) + "</value></values>", false, null);
                break;
            case "datetime":
            case "date":
                $v_0 = new Mscrm.FilterCondition($p3, $p4, $p0, false, null);
                break;
            default:
                $v_0 = new Mscrm.FilterCondition(2, "eq", $p0, false, null);
                break
        }
        return $v_0
    },
    $2D_3: function ($p0) {
        var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
        !IsNull($v_0) && $v_0.ApplyFilters($p0)
    },
    $2J_3: function () {
        if (!IsNull(this.$9_3.$1_0)) {
            this.$12_3 = [];
            for (var $v_0 = 0; $v_0 < this.$9_3.$1_0.length; $v_0++) {
                var $v_1 = this.$9_3.$1_0[$v_0];
                Array.add(this.$12_3, this.cloneFilterCondition($v_1))
            }
        }
        if (!IsNull(this.$9_3.$0_0)) this.$a_3 = new Mscrm.CustomFilterConditionGroup(this.cloneFilterCondition(this.$9_3.$0_0.$3_0), this.cloneFilterCondition(this.$9_3.$0_0.$4_0), this.$9_3.$0_0.$A_0)
    },
    $3F_3: function () {
        this.ClearFilterConditions(true, false);
        for (var $v_0 = 0; $v_0 < this.$12_3.length; $v_0++) {
            var $v_1 = this.cloneFilterCondition(this.$12_3[$v_0]);
            $v_1.$7_0 = true;
            Array.add(this.$9_3.$1_0, $v_1)
        }
        if (!IsNull(this.$a_3)) {
            if (!IsNull(this.$a_3.$3_0)) {
                var $v_2 = this.cloneFilterCondition(this.$a_3.$3_0);
                $v_2.$7_0 = true;
                this.get_appliedFilters().$0_0.$3_0 = $v_2
            }
            if (!IsNull(this.$a_3.$4_0)) {
                var $v_3 = this.cloneFilterCondition(this.$a_3.$4_0);
                $v_3.$7_0 = true;
                this.get_appliedFilters().$0_0.$4_0 = $v_3
            }
            this.get_appliedFilters().$0_0.$A_0 = this.$a_3.$A_0
        }
    },
    handleNullNotNullItemClick: function (nullItemClicked, toggleFilter) {
        for (var $v_0 = null, $v_1 = null, $v_2 = 0; $v_2 < this.get_appliedFilters().$1_0.length; $v_2++) {
            $v_1 = this.get_appliedFilters().$1_0[$v_2];
            var $v_3 = $v_1.$2_0;
            if (($v_3 === "not-null" || $v_3 === "null") && $v_1.$5_0 && !$v_1.$G_0) {
                $v_0 = $v_1;
                break
            }
        }
        if (IsNull($v_0)) {
            if (!toggleFilter) {
                var $v_4 = new Mscrm.FilterCondition(1, nullItemClicked ? "null" : "not-null", "", false, "");
                $v_4.$5_0 = false;
                $v_4.$7_0 = true;
                Array.add(this.get_appliedFilters().$1_0, $v_4)
            }
        } else if (toggleFilter) Array.remove(this.get_appliedFilters().$1_0, $v_0);
        else {
            $v_0.$2_0 = nullItemClicked ? "null" : "not-null";
            $v_0.$5_0 = false
        }
        this.clearBackup()
    },
    handleCustomFiltersClick: function (callbackFunc) {
        var $v_0 = {};
        this.initializeDialog($v_0);
        var $v_1 = [callbackFunc],
            $v_2 = Mscrm.Utilities.createCallbackFunctionObject("handleCustomFiltersClickCallback", this, $v_1),
            $v_3 = openStdDlgWithCallback(Mscrm.CrmUri.create("/GridFilters/customfilterdlg.aspx"), $v_0, 380, 220, $v_2, true, false, null);
        if (Mscrm.Utilities.isModalDialogSupported()) return this.handleCustomFiltersClickCallback($v_3, callbackFunc);
        return false
    },
    handleCustomFiltersClickCallback: function (returnValue, callbackFunc) {
        var $v_0 = false;
        if (!IsNull(returnValue)) {
            var $v_1 = returnValue["booleanOperator"],
                $v_2 = returnValue["primary"],
                $v_3 = returnValue["secondary"],
                $v_4 = this.$23_3($v_2),
                $v_5 = this.$23_3($v_3),
                $v_6 = false,
                $v_7 = this.get_appliedFilters().$0_0,
                $v_8 = IsNull($v_7) ? null : $v_7.$3_0,
                $v_9 = IsNull($v_7) ? null : $v_7.$4_0,
                $v_A = !Mscrm.GridFilterUtil.isEqual($v_4, $v_8);
            $v_A = $v_A || !Mscrm.GridFilterUtil.isEqual($v_5, $v_9) || !Mscrm.GridFilterUtil.isOperatorEqual($v_1, $v_7);
            if (IsNull($v_4) && !IsNull($v_5)) {
                $v_4 = $v_5;
                $v_5 = null
            }
            if ($v_A) {
                this.clearBackup();
                this.ClearFilterConditions(true, true);
                if (!IsNull($v_4)) if (!IsNull(this._originalCustomFilterConditionGroup) && !IsNull(this._originalCustomFilterConditionGroup.$3_0)) {
                    var $v_B = this.get_appliedFilters().$0_0.$3_0;
                    $v_B.$8_0 = $v_4.$8_0;
                    $v_B.$2_0 = $v_4.$2_0;
                    $v_B.$N_0 = $v_4.$N_0;
                    $v_B.$H_0 = $v_4.$H_0;
                    $v_B.$5_0 = false;
                    this.get_appliedFilters().$0_0.$A_0 = $v_1
                } else {
                    $v_6 = true;
                    $v_4.$5_0 = false
                } else if (!IsNull(this._originalCustomFilterConditionGroup) && !IsNull(this._originalCustomFilterConditionGroup.$3_0)) this.get_appliedFilters().$0_0.$3_0 = null;
                if (!IsNull($v_5)) if (!IsNull(this._originalCustomFilterConditionGroup) && !IsNull(this._originalCustomFilterConditionGroup.$4_0)) {
                    var $v_C = this.get_appliedFilters().$0_0.$4_0;
                    $v_C.$8_0 = $v_5.$8_0;
                    $v_C.$2_0 = $v_5.$2_0;
                    $v_C.$N_0 = $v_5.$N_0;
                    $v_C.$H_0 = $v_5.$H_0;
                    $v_C.$5_0 = false;
                    this.get_appliedFilters().$0_0.$A_0 = $v_1
                } else {
                    $v_6 = true;
                    $v_5.$5_0 = false
                } else if (!IsNull(this._originalCustomFilterConditionGroup) && !IsNull(this._originalCustomFilterConditionGroup.$4_0)) this.get_appliedFilters().$0_0.$4_0 = null;
                if ($v_6) if (IsNull(this.get_appliedFilters().$0_0)) this.get_appliedFilters().$0_0 = new Mscrm.CustomFilterConditionGroup($v_4, $v_5, $v_1);
                else {
                    this.get_appliedFilters().$0_0.$3_0 = $v_4;
                    this.get_appliedFilters().$0_0.$A_0 = $v_1;
                    if (!IsNull($v_5)) this.get_appliedFilters().$0_0.$4_0 = $v_5
                }
            }
            $v_0 = true
        } else $v_0 = false;
        if (!Mscrm.Utilities.isModalDialogSupported()) {
            Mscrm.Utilities.executeFunctionIfModeless(callbackFunc, $v_0);
            return false
        }
        return $v_0
    },
    $23_3: function ($p0) {
        var $v_0 = null;
        if (!IsNull($p0)) {
            $v_0 = Mscrm.GridFilterUtil.getFilterConditionFromDictionary($p0);
            this.adjustNameAttribute($v_0);
            if (isValueBoundOperator($v_0.$2_0) && IsNull($v_0.$8_0)) $v_0 = null;
            return $v_0
        }
        return null
    },
    initializeDialog: function (diagArg) {
        diagArg.customFilter = this.get_appliedFilters().$0_0;
        if (this.get_appliedFilters().$1R_0 === "language") diagArg.metadataType = "language";
        else diagArg.metadataType = this.get_appliedFilters().$Z_0;
        diagArg.attributeName = this.get_appliedFilters().$B_0;
        diagArg.attributeXml = this._attribXml;
        if (!IsNull(this.get_appliedFilters().$0_0)) {
            diagArg.booleanOperator = this.get_appliedFilters().$0_0.$A_0;
            if (!IsNull(this.get_appliedFilters().$0_0.$3_0)) diagArg.primaryCondition = this.get_appliedFilters().$0_0.$3_0;
            if (!IsNull(this.get_appliedFilters().$0_0.$4_0)) diagArg.secondaryCondition = this.get_appliedFilters().$0_0.$4_0
        }
    },
    adjustNameAttribute: function (condition) { },
    ClearFilterConditions: function (clearUnsavedCustomFilterConditions, restoreOriginalConditions) {
        for (var $v_0 = this.get_appliedFilters().getOrdinaryFilterConditionsCount(), $v_1 = 0; $v_1 < $v_0; $v_1++) {
            var $v_2 = this.get_appliedFilters().$1_0[$v_1];
            $v_2.$G_0 = true;
            $v_2.$7_0 = true
        }
        if (restoreOriginalConditions) for (var $v_3 = 0; $v_3 < this._originalFilters.length; $v_3++) {
            var $v_4 = this.cloneFilterCondition(this._originalFilters[$v_3]);
            $v_4.$7_0 = true;
            $v_4.$5_0 = true;
            Array.add(this.$9_3.$1_0, $v_4)
        }
        if (clearUnsavedCustomFilterConditions) {
            var $v_5 = this.get_appliedFilters().getCustomFilterConditionsCount();
            if ($v_5 >= 1) {
                this.get_appliedFilters().$0_0.$O_0 = this.get_appliedFilters().$0_0.$3_0;
                this.get_appliedFilters().$0_0.$3_0 = null;
                this.get_appliedFilters().$0_0.$A_0 = 1;
                if ($v_5 === 2) {
                    this.get_appliedFilters().$0_0.$K_0 = this.get_appliedFilters().$0_0.$4_0;
                    this.get_appliedFilters().$0_0.$4_0 = null
                }
            }
            if (restoreOriginalConditions) if (!IsNull(this._originalCustomFilterConditionGroup)) {
                if (!IsNull(this._originalCustomFilterConditionGroup.$3_0)) {
                    var $v_6 = this.cloneFilterCondition(this._originalCustomFilterConditionGroup.$3_0);
                    $v_6.$7_0 = true;
                    $v_6.$5_0 = true;
                    this.get_appliedFilters().$0_0.$3_0 = $v_6
                }
                if (!IsNull(this._originalCustomFilterConditionGroup.$4_0)) {
                    var $v_7 = this.cloneFilterCondition(this._originalCustomFilterConditionGroup.$4_0);
                    $v_7.$7_0 = true;
                    $v_7.$5_0 = true;
                    this.get_appliedFilters().$0_0.$4_0 = $v_7
                }
                this.get_appliedFilters().$0_0.$A_0 = this._originalCustomFilterConditionGroup.$A_0
            }
        }
    },
    getId: function (action) {
        var $v_0 = new Sys.StringBuilder;
        $v_0.append("_MI");
        $v_0.append(this._thisElement.getAttribute("gridid"));
        $v_0.append(this._entityName);
        $v_0.append(this._attributeName);
        $v_0.append(this._relationshipName);
        $v_0.append(action);
        return $v_0.toString()
    },
    cloneFilterCondition: function ($p0) {
        var $v_0 = null;
        if (!IsNull($p0)) {
            $v_0 = new Mscrm.FilterCondition($p0.$N_0, $p0.$2_0, $p0.$8_0, $p0.$5_0, $p0.$6_0);
            $v_0.$G_0 = $p0.$G_0;
            $v_0.$7_0 = $p0.$7_0;
            $v_0.$5_0 = $p0.$5_0;
            $v_0.$H_0 = $p0.$H_0
        }
        return $v_0
    },
    $2N_3: function () {
        this.xmlString = this._thisElement.getAttribute("xml_filter");
        this.menu = new Mscrm.Popup(this.$$d_MenuItemClicked);
        this.menu.set_menuXml(XUI.Xml.LoadXml(this.xmlString));
        var $v_0 = this._thisElement.parentNode.parentNode;
        this.$2I_3 = this._thisElement.getElementsByTagName("SPAN")[0];
        this._newAlink = $v_0.getElementsByTagName("A")[0];
        this._newLilink = $v_0.getElementsByTagName("LI")[0];
        if (!Mscrm.PageManager.isOutlookProxyPage()) {
            $addHandler(this._newAlink, "click", this.$$d_$33_3);
            $addHandler(this._newLilink, "mouseover", this.$$d_$34_3);
            $addHandler(this._newLilink, "mouseout", this.$$d_$35_3)
        }
    },
    SetUIUndirty: function (item) { },
    ProcessOkButtonClick: function (item) { },
    $33_3: function ($p0) {
        $p0.stopPropagation();
        $p0.preventDefault();
        var $v_0 = Mscrm.Utilities.getDomEventElement($p0, "UL");
        this.$2W_3($v_0)
    },
    $2W_3: function ($p0) {
        XUI.Xml.DomUtils.GetFirstChild(this._newAlink).className = "ms-crm-Menu-FilterImgWrapper-Open";
        var $v_0 = this._newAlink.parentNode,
            $v_1 = Mscrm.Utilities.getXYPos($v_0, window.LOCID_UI_DIR === "RTL", $get("crmContentPanel")),
            $v_2 = $v_1["y"] + $v_0.offsetHeight,
            $v_3 = $v_1["x"];
        if (window.LOCID_UI_DIR === "RTL") $v_3 = $v_3 + $v_0.offsetWidth;
        this.$3J_3($p0, $v_3, $v_2)
    },
    $3J_3: function ($p0, $p1, $p2) {
        if (IsNull(this.menu.get_currentMenu())) {
            this.menu.set_currentMenu(this.$2Q_3($p1, $p2));
            this.menu.populateFilterMenu(this.xmlString)
        } else {
            this.menu.get_currentMenu().clearDOM();
            this.menu.populateFilterMenu(this.xmlString)
        }
        this.menu.get_currentMenu().set_propagateStyle(false);
        for (var $v_0 = 0; $v_0 < this.menu.get_currentMenu().get_menuItems().length; $v_0++) if (!this.menu.get_currentMenu().get_menuItems()[$v_0].get_itemContents().disabled && this.menu.get_currentMenu().get_menuItems()[$v_0].get_actionCallback()) {
            this.menu.get_currentMenu().set_focusElementOnShow(this.menu.get_currentMenu().get_menuItems()[$v_0].get_itemContents());
            $v_0 = this.menu.get_currentMenu().get_menuItems().length
        }
        this.menu.get_currentMenu().set_left($p1);
        this.menu.get_currentMenu().set_top($p2);
        this.menu.get_currentMenu().show();
        this.$1i_3 = true
    },
    $2Q_3: function ($p0, $p1) {
        var $v_0 = Mscrm.Menu.createMenu();
        !IsNull(this._thisElement.attributes.getNamedItem("menu")) && $v_0.set_menuId(this._thisElement.attributes.getNamedItem("menu").value);
        $v_0.set_stylePrefix(Mscrm.MenuStyles.viewSelectorStylePrefix);
        $v_0.set_propagateStyle(false);
        $v_0.set_left($p0);
        $v_0.set_top($p1);
        $v_0.set_width(284);
        $v_0.set_hideCallback(this.$$d_filterMenuHidden);
        $v_0.set_shiftVertical(false);
        return $v_0
    },
    filterMenuHidden: function (_menu) {
        this.menu.get_currentMenu().clearDOM();
        try {
            this.$1i_3 = false;
            this._newAlink.focus();
            this.$1z_3()
        } catch ($$e_1) { }
    },
    $1z_3: function () {
        XUI.Html.DomUtils.GetFirstChild(this._newAlink).className = "ms-crm-Menu-FilterImgWrapper"
    },
    $2X_3: function () {
        for (var $v_0 = this._thisElement.getElementsByTagName("IMG"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) if ($v_0[$v_1].className.startsWith("ms-crm-Menu-ButtonFilter ")) {
            this.$h_3 = $v_0[$v_1];
            return
        }
    },
    $35_3: function ($p0) {
        !this.$1i_3 && this.$1z_3()
    },
    $34_3: function ($p0) {
        XUI.Html.DomUtils.GetFirstChild(this._newAlink).className = "ms-crm-Menu-FilterImgWrapper-Hover"
    }
};
Mscrm.FilterSet = function (element) {
    this.handleGridReset = this.HandleGridReset;
    this.registerFilterPopup = this.RegisterFilterPopup;
    this.isFilterEnabled = this.IsFilterEnabled;
    this.canEnableFilters = this.CanEnableFilters;
    this.enableFilters = this.EnableFilters;
    this.markFiltersAsDisabled = this.MarkFiltersAsDisabled;
    Mscrm.FilterSet.initializeBase(this, [element]);
    this.$1p_3 = element;
    this.$D_3 = [];
    this.$I_3 = []
};
Mscrm.FilterSet.initializeQueryData = function (crmGrid, layoutXml) {
    var $v_0 = new Mscrm.QueryData;
    $v_0.$u_0 = crmGrid.GetParameter("viewid");
    $v_0.$v_0 = 0;
    $v_0.$M_0 = crmGrid.GetParameter("otn");
    $v_0.$13_0 = layoutXml;
    $v_0.$R_0 = crmGrid.GetParameter("viewTitle");
    if (Mscrm.PageManager.isOutlookProxyPage()) $v_0.$l_0 = crmGrid.GetParameter("conditionalFormatting");
    else $v_0.$l_0 = null;
    $v_0.$1J_0 = parseInt(crmGrid.GetParameter("viewtype"), 10);
    return $v_0
};
Mscrm.FilterSet.prototype = {
    $Q_3: false,
    $11_3: null,
    $1G_3: false,
    $D_3: null,
    $I_3: null,
    $C_3: null,
    $1p_3: null,
    $1Y_3: null,
    $15_3: null,
    $1K_3: null,
    get_currentGrid: function () {
        return this.$C_3
    },
    get_originalFetch: function () {
        return IsNull(this.$15_3) ? null : XUI.Xml.XMLSerializer.serializeToString(this.$15_3)
    },
    set_originalFetch: function (value) {
        if (!IsNull(value)) this.$15_3 = XUI.Xml.LoadXml(value);
        return value
    },
    get_transientFetch: function () {
        return XUI.Xml.XMLSerializer.serializeToString(this.$1K_3)
    },
    set_transientFetch: function (value) {
        if (!IsNull(value)) this.$1K_3 = XUI.Xml.LoadXml(value);
        return value
    },
    get_isFilterOnHiddenCol: function () {
        return this.$1G_3
    },
    set_isFilterOnHiddenCol: function (value) {
        this.$1G_3 = value;
        return value
    },
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this)
    },
    $25_3: function () {
        return $find(this.$1p_3.getAttribute("gridid"))
    },
    $2e_3: function ($p0) {
        for (var $v_0 = XUI.Xml.SelectNodes($p0, "/grid/row/cell[@relatedentityname]", null), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            $v_0[$v_1].attributes.removeNamedItem("relatedentityname");
            $v_0[$v_1].attributes.removeNamedItem("relatedentityattr");
            $v_0[$v_1].attributes.removeNamedItem("primaryentityattr");
            $v_0[$v_1].attributes.removeNamedItem("relationshipid");
            $v_0[$v_1].attributes.removeNamedItem("relationshipname")
        }
        return XUI.Xml.XMLSerializer.serializeToString($p0)
    },
    $2x_3: function () {
        for (var $v_0 = 0; $v_0 < this.$D_3.length; $v_0++) {
            var $v_1 = this.$I_3[$v_0];
            $v_1.onEnable()
        }
    },
    $30_3: function () {
        var $v_0 = this.$C_3.GetParameter("filter");
        if (!IsNull($v_0) && $v_0 !== "") return true;
        return false
    },
    $2E_3: function () {
        if (Mscrm.PageManager.isOutlookProxyPage()) return;
        for (var $v_0 = this.$Q_3 ? "block" : "none", $v_1 = 0, $v_2 = 0; $v_2 < this.$D_3.length; $v_2++) {
            var $v_3 = this.$D_3[$v_2],
                $v_4 = $v_3.parentNode.parentNode,
                $v_5 = $v_4.parentNode.parentNode.parentNode;
            $v_5.style.display = $v_0;
            if (this.$Q_3) {
                $v_1 = $v_5.clientWidth ? $v_5.clientWidth : 20;
                $v_5.parentNode.style.width = $v_1 + 3 + "px"
            } else $v_5.parentNode.style.width = "0px"
        }
    },
    $3G_3: function () {
        var $v_0 = Mscrm.GridFilterUtil.parseFetchForAttributes(this.$D_3, this.$15_3),
            $v_1, $v_2;
        this.$11_3 = "";
        for (var $v_3 = 0; $v_3 < this.$D_3.length; $v_3++) {
            $v_2 = this.$I_3[$v_3];
            $v_1 = this.$D_3[$v_3];
            this.SetMenuFilterConditions($v_2, $v_1, $v_0)
        }
    },
    SetMenuFilterConditions: function (popupMenu, element, menuFilterCollections) {
        var $v_0, $v_1;
        if (IsNull(menuFilterCollections)) {
            var $v_3 = [];
            Array.add($v_3, element);
            menuFilterCollections = Mscrm.GridFilterUtil.parseFetchForAttributes($v_3, this.$15_3)
        }
        $v_0 = element.getAttribute("isfromrelatedentity").toLowerCase() === "true" ? true : false;
        if ($v_0) $v_1 = element.getAttribute("columnname");
        else $v_1 = element.getAttribute("attributename");
        var $v_2 = menuFilterCollections[$v_1];
        if ($v_2.$V_0) {
            var $v_4 = XUI.Xml.LoadXml(element.getAttribute("attributexml")),
                $v_5 = XUI.Xml.SelectSingleNode($v_4, "/attributeinfo/result", null),
                $v_6 = XUI.Xml.GetText($v_5);
            if (isNullOrEmptyString(this.$11_3)) this.$11_3 = $v_6;
            else this.$11_3 = String.format(window.LOCID_GF_COMPLEXFILTERNAMES, this.$11_3, $v_6)
        }
        popupMenu.set_appliedFilters($v_2)
    },
    $2z_3: function () {
        for (var $v_0 = false, $v_1 = this.$D_3.length, $v_2 = 0; $v_2 < $v_1; $v_2++) {
            var $v_3 = this.$I_3[$v_2];
            if ($v_3._isFilterPopUpDirty) {
                $v_0 = true;
                break
            }
        }
        return $v_0
    },
    getRelatedEntityDetails: function (entityName, attributeName) {
        for (var $v_0 = null, $v_1 = null, $v_2 = 0; $v_2 < this.$D_3.length; $v_2++) {
            $v_0 = this.$I_3[$v_2];
            $v_1 = $v_0.get_appliedFilters();
            if (!IsNull($v_1.$r_0) && $v_1.$r_0 && $v_1.$M_0 === entityName && $v_1.$B_0 === attributeName) return $v_1.$i_0
        }
        return null
    },
    addFilterConditions: function (filters, refreshGrid) {
        if (IsNull(refreshGrid)) refreshGrid = true;
        var $v_0 = Mscrm.GridFilterUtil.mergeFetchXml(this.$1K_3, filters);
        this.set_transientFetch(XUI.Xml.XMLSerializer.serializeToString($v_0.$1M_0));
        if (refreshGrid) {
            !Mscrm.PageManager.isOutlookProxyPage() && this.$C_3.ShowLoadingMessage();
            this.RefreshWithFilters()
        }
        return $v_0.$1F_0
    },
    addVisualizationFilter: function (entityName, attributeName, value, lookupParameter, formattedXValue, attributeIsDateTime, startDate, endDate, refreshGrid, isRelatedEntityColumn, relatedEntityDetails) {
        var $v_0 = false,
            $v_1 = this.findPopup(entityName, attributeName, isRelatedEntityColumn, relatedEntityDetails);
        if (!IsNull($v_1)) try {
            if (attributeIsDateTime) $v_1.setDrillDownCondition(value, lookupParameter, formattedXValue, startDate, endDate, refreshGrid);
            else $v_1.setDrillDownCondition(value, lookupParameter, formattedXValue, null, null, refreshGrid)
        } catch ($$e_D) {
            $v_0 = true
        }
        return $v_0
    },
    removeVisualizationFilter: function (entityName, attributeName, isRelatedEntityColumn, relatedEntityDetail) {
        var $v_0 = this.findPopup(entityName, attributeName, isRelatedEntityColumn, relatedEntityDetail),
            $v_1 = false;
        if (!IsNull($v_0)) try {
            $v_0.rollBackDrillDownCondition()
        } catch ($$e_6) {
            $v_1 = true
        }
        return $v_1
    },
    findPopup: function (entityName, attributeName, isRelatedEntityColumn, relatedEntityDetails) {
        if (IsNull(isRelatedEntityColumn)) {
            isRelatedEntityColumn = false;
            relatedEntityDetails = ""
        }
        for (var $v_0 = 0; $v_0 < this.$D_3.length; $v_0++) {
            var $v_1 = this.$I_3[$v_0],
                $v_2 = $v_1.get_appliedFilters();
            if (isRelatedEntityColumn) {
                if (!IsNull($v_2) && $v_2.$M_0 === entityName && $v_2.$B_0 === attributeName && $v_2.$r_0 && relatedEntityDetails === $v_2.$i_0) return $v_1
            } else if (!IsNull($v_2) && $v_2.$M_0 === entityName && $v_2.$B_0 === attributeName) return $v_1
        }
        return null
    },
    ApplyFilters: function (refreshGrid) {
        if (IsNull(refreshGrid)) refreshGrid = true;
        for (var $v_0 = null, $v_1 = 0; $v_1 < this.$D_3.length; $v_1++) {
            $v_0 = this.$I_3[$v_1];
            if ($v_0.get_appliedFilters().get_isDirty()) break;
            if ($v_1 === this.$D_3.length - 1) return
        }
        if ($v_0) {
            this.addFilterConditions($v_0.get_appliedFilters(), refreshGrid);
            !refreshGrid && $v_0.get_appliedFilters().clearDirtyFlag();
            var $$t_3 = this;
            window.setTimeout(function () {
                refreshGrid && $v_0.get_appliedFilters().clearDirtyFlag();
                $v_0.onFilterApplied()
            }, 0)
        }
    },
    CanEnableFilters: function () {
        this.$C_3 = this.$25_3();
        if (!IsNull(this.$C_3)) {
            var $v_0 = this.$C_3.GetParameter("quickfind"),
                $v_1 = this.$C_3.GetParameter("fetchXmlForFilters");
            if (isNullOrEmptyString($v_0) && !isNullOrEmptyString($v_1)) return true
        }
        return false
    },
    clearPopups: function () {
        if (this.$Q_3) for (var $v_0 = 0; $v_0 < this.$D_3.length; $v_0++) {
            var $v_1 = this.$I_3[$v_0];
            Sys.Application.removeComponent($v_1)
        }
        Array.clear(this.$D_3);
        Array.clear(this.$I_3)
    },
    DisableFilters: function () {
        if (this.$Q_3) {
            var $v_0 = this.isFilterSetDirty();
            $v_0 && this.$C_3.ShowLoadingMessage();
            this.$Q_3 = false;
            this.$2E_3();
            for (var $v_1 = 0; $v_1 < this.$D_3.length; $v_1++) {
                var $v_2 = this.$I_3[$v_1];
                $v_2.onDisable()
            }
            if ($v_0) {
                this.set_transientFetch(this.get_originalFetch());
                this.RefreshWithFilters()
            }
            this.$1G_3 = false;
            Mscrm.Utilities.isIosDevice() && this.handleRefreshForIpad(false);
            refreshRibbon()
        }
    },
    EnableFilters: function () {
        var $v_0 = true;
        if (this.CanEnableFilters()) {
            this.$C_3 = this.$25_3();
            this.set_originalFetch(this.$C_3.GetParameter("fetchXmlForFilters"));
            if (!IsNull(this.get_originalFetch())) {
                this.$Q_3 = true;
                this.$2E_3();
                this.$3G_3();
                this.set_transientFetch(this.get_originalFetch());
                this.$2x_3();
                Mscrm.Utilities.isIosDevice() && this.handleRefreshForIpad(true);
                refreshRibbon()
            }
        } else $v_0 = false;
        return $v_0
    },
    handleRefreshForIpad: function (isFiltersEnabled) {
        var $v_0 = $get("refreshButton");
        if (isFiltersEnabled) $v_0.style.display = "none";
        else $v_0.style.display = "inline"
    },
    HandleGridReset: function () {
        this.clearPopups();
        refreshRibbon()
    },
    IsFilterEnabled: function () {
        return this.$Q_3
    },
    isFilterSetDirty: function () {
        return this.IsFilterEnabled() && (this.$2z_3() || this.$1G_3)
    },
    MarkFiltersAsDisabled: function () {
        this.$Q_3 = false;
        refreshRibbon()
    },
    RefreshWithFilters: function () {
        var $$t_1 = this;
        window.setTimeout(function () {
            $$t_1.$C_3.SetParameter("fetchXml", $$t_1.get_transientFetch());
            if (!Mscrm.PageManager.isOutlookProxyPage()) {
                var $v_0 = $$t_1.$C_3;
                $v_0.ResetPageNumber();
                $v_0.set_gridRefreshSourceElement("filter");
                $v_0.Refresh()
            }
            refreshRibbon()
        }, 0)
    },
    RegisterFilterPopup: function (id, type, source) {
        var $v_0 = $get(id);
        if (!Array.contains(this.$D_3, $v_0)) {
            var $v_1 = null;
            if (source !== "initialize") switch (type) {
                case "string":
                    $v_1 = new Mscrm.StringFilterPopup($v_0);
                    break;
                case "number":
                    $v_1 = new Mscrm.NumberFilterPopup($v_0);
                    break;
                case "datetime":
                    $v_1 = new Mscrm.DateTimeFilterPopup($v_0);
                    break;
                default:
                    break
            } else $v_1 = $find(id);
            if (!IsNull($v_1)) {
                Array.add(this.$D_3, $v_0);
                Array.add(this.$I_3, $v_1)
            }
        }
    },
    Save: function (saveAs) {
        if (this.$Q_3) {
            var $v_0 = false,
                $v_1 = this.$30_3();
            if ($v_1) $v_0 = confirm(window.LOCID_GF_JUMPBARMESSAGE);
            if ($v_1 && !$v_0) return;
            this.$1Y_3 = Mscrm.FilterSet.initializeQueryData(this.$C_3, this.$2e_3(XUI.Xml.LoadXml(this.$C_3.GetParameter("layoutXml"))));
            var $v_2 = $find("crmGrid_JumpBar");
            !IsNull($v_2) && $v_2.Reset();
            this.$C_3.SetParameter("filter", "");
            this.$C_3.SetParameter("filterDisplay", "");
            var $v_3;
            if (Mscrm.PageManager.isOutlookProxyPage()) $v_3 = XUI.Xml.LoadXml(this.$C_3.GetParameter("updatedFetchXmlForFilters"));
            else $v_3 = this.$1K_3;
            Mscrm.GridFilterUtil.saveQuery(saveAs, this.$1Y_3, $v_3);
            !saveAs && Mscrm.PageManager.isOutlookProxyPage() && getOutlookHostedWindow().invalidateCacheForView(this.$1Y_3.$u_0);
            if (!saveAs && !Mscrm.PageManager.isOutlookProxyPage()) {
                this.$C_3.Reset();
                alert(window.LOCID_GF_FILTERSAVED)
            }
        }
    },
    sortColumns: function (element, order, append) {
        this.$C_3.SortColumn(element, order, append)
    },
    ToggleFilters: function (showWarning) {
        if (IsNull(showWarning)) showWarning = false;
        if (this.$Q_3) this.DisableFilters();
        else !this.EnableFilters() && showWarning && alert(window.LOCID_GF_NOFILTERSUPPORT)
    },
    DisposeFilterMenu: function () {
        for (var $v_0 = 0; $v_0 < this.$D_3.length; $v_0++) {
            var $v_1 = this.$I_3[$v_0];
            !IsNull($v_1.menu.get_currentMenu()) && $v_1.menu.get_currentMenu().dispose()
        }
    },
    clearAllFiltersBackup: function () {
        for (var $v_0 = this.$D_3.length, $v_1 = 0; $v_1 < $v_0; $v_1++) {
            var $v_2 = this.$I_3[$v_1];
            $v_2.clearBackup()
        }
    }
};
Mscrm.GridFilterCustomControl = function (element) {
    this.$14_3 = 1;
    Mscrm.GridFilterCustomControl.initializeBase(this, [element])
};
Mscrm.GridFilterCustomControl.$2h = function ($p0) {
    var $v_0 = new Sys.StringBuilder,
        $v_1 = $p0.split(":"),
        $v_2 = $v_1.length;
    if ($v_2 >= 2) {
        $v_0.append($v_1[1]);
        if ($v_2 >= 4) for (var $v_3 = 3; $v_3 < $v_2; $v_3 = $v_3 + 2) {
            $v_0.append(":");
            $v_0.append($v_1[$v_3])
        }
    }
    return $v_0.toString()
};
Mscrm.GridFilterCustomControl.prototype = {
    $B_3: null,
    $d_3: null,
    $1U_3: null,
    $1C_3: null,
    $17_3: null,
    $t_3: null,
    $16_3: null,
    $1X_3: null,
    $w_3: null,
    $18_3: null,
    $1Z_3: null,
    $e_3: null,
    $1I_3: null,
    $3_3: null,
    $4_3: null,
    $1l_3: "",
    $1m_3: "",
    displayName: null,
    initialize: function () {
        Mscrm.CrmUIControl.prototype.initialize.call(this);
        this.$e_3 = getDialogArguments();
        this.$B_3 = this.$e_3.attributeName;
        this.$d_3 = this.$e_3.metadataType;
        this.$1U_3 = "";
        this.$3_3 = this.$e_3.primaryCondition;
        this.$4_3 = this.$e_3.secondaryCondition;
        var $v_0 = this.$e_3.booleanOperator;
        if (!IsNull($v_0)) this.$14_3 = $v_0;
        this.$1C_3 = XUI.Xml.LoadXml(this.$e_3.attributeXml);
        this.$17_3 = XUI.Xml.SelectSingleNode(this.$1C_3, "/attributeinfo/result", null);
        this.$1I_3 = this.$17_3.attributes;
        var $v_1 = this.$1I_3.getNamedItem("nameattr");
        if (!IsNull($v_1)) this.$1U_3 = $v_1.nodeValue;
        this.$t_3 = $get("primaryOperator");
        this.$w_3 = $get("secondaryOperator");
        this.$1X_3 = Mscrm.FormControlInputBehavior.GetElementBehavior(this.$t_3);
        this.$1Z_3 = Mscrm.FormControlInputBehavior.GetElementBehavior(this.$w_3);
        this.$16_3 = $get("primaryValue");
        this.$18_3 = $get("secondaryValue");
        this.$38_3();
        this.$1B_3(this.$16_3, this.$t_3);
        this.$1B_3(this.$18_3, this.$w_3);
        if (this.$14_3 === 1) {
            $get("And").checked = true;
            $get("Or").checked = false
        } else {
            $get("Or").checked = true;
            $get("And").checked = false
        }
        this.$2G_3(this.$16_3, this.$t_3, this.$3_3);
        this.$2G_3(this.$18_3, this.$w_3, this.$4_3);
        var $v_2 = XUI.Xml.SelectSingleNode(this.$1C_3, "/attributeinfo/result", null);
        this.displayName = XUI.Xml.GetText($v_2);
        XUI.Html.DomUtils.GetFirstChild($get("tdDialogHeader")).innerHTML = CrmEncodeDecode.CrmHtmlEncode(String.format(window.LOCID_GF_CUSTOMFILTERTITLE, this.displayName))
    },
    $38_3: function () {
        var $v_0 = null,
            $v_1 = !isNullOrEmptyString(this.$1U_3),
            $v_2 = isAtributeLookupContainsUser(this.$1I_3),
            $v_3 = getOperatorsForDataType(this.$d_3, $v_1, $v_2);
        $v_0 = $v_3.split(";");
        this.$1X_3.AddOption(getLabelForOperator("nop"), "nop");
        this.$1Z_3.AddOption(getLabelForOperator("nop"), "nop");
        for (var $v_4 = 0; $v_4 < $v_0.length; $v_4++) {
            var $v_5 = $v_0[$v_4];
            this.$1X_3.AddOption(getLabelForOperator($v_5), $v_5);
            this.$1Z_3.AddOption(getLabelForOperator($v_5), $v_5)
        }
    },
    GetCustomConditionGroup: function () {
        var $v_0 = {}, $v_1 = this.$t_3.value,
            $v_2 = this.$w_3.value;
        if ($v_1 === "nop") $v_1 = null;
        if ($v_2 === "nop") $v_2 = null;
        var $v_3 = this.$29_3(this.$16_3),
            $v_4 = this.$29_3(this.$18_3),
            $v_5 = getAbstractDataType(this.$d_3);
        if ($v_5 === "owner" || $v_5 === "lookup" || $v_5 === "picklist") {
            if (!IsNull($v_3)) if ($v_1 === "eq") $v_1 = "in";
            else if ($v_1 === "ne") $v_1 = "not-in";
            if (!IsNull($v_4)) if ($v_2 === "eq") $v_2 = "in";
            else if ($v_2 === "ne") $v_2 = "not-in"
        }
        if (!IsNull($v_1) && $v_1 !== "") $v_0["primary"] = this.$1x_3($v_1, $v_3);
        if (!IsNull($v_2) && $v_2 !== "") $v_0["secondary"] = this.$1x_3($v_2, $v_4);
        $v_0["booleanOperator"] = this.$14_3;
        return $v_0
    },
    SetOperatorValue: function (value) {
        this.$14_3 = value
    },
    PrimaryChanged: function () {
        this.$1B_3(this.$16_3, this.$t_3)
    },
    SecondaryChanged: function () {
        this.$1B_3(this.$18_3, this.$w_3)
    },
    $29_3: function ($p0) {
        var $v_0 = this.$26_3($p0);
        if (IsNull($v_0)) return null;
        var $v_1 = this.$24_3($v_0),
            $v_2 = false;
        if (getAbstractDataType(this.$d_3) === "picklist") $v_2 = true;
        if (IsNull($v_1)) return null;
        var $v_3 = null,
            $v_4 = !IsNull($v_1) ? $v_1.get_dataValue() : "";
        if (!IsNull($v_4) && $v_4 === "") return null;
        else {
            if ($p0.style.display === "none") $v_3 = null;
            else $v_3 = $v_2 ? $v_1.get_dataXml() : $v_1.get_dataValue();
            if (!IsNull($v_3)) {
                var $v_5 = XUI.Xml.LoadXml($v_3),
                    $v_6 = XUI.Xml.SelectNodes($v_5, "/values/value", null);
                if ($v_6.length < 2) $v_3 = $v_4
            }
        }
        return $v_3
    },
    $24_3: function ($p0) {
        if (Sys.UI.DomElement.containsCssClass($p0, "multipicklist") || Sys.UI.DomElement.containsCssClass($p0, "ms-crm-FiscalPeriodAndYear")) return $find($p0.id);
        else if (Sys.UI.DomElement.containsCssClass($p0, "ms-crm-Lookup")) return Mscrm.FormControlInputBehavior.GetBehavior(XUI.Html.DomUtils.GetFirstChild($p0.rows[0].cells[1]).id);
        else return Mscrm.FormControlInputBehavior.GetElementBehavior($p0)
    },
    $1x_3: function ($p0, $p1) {
        var $v_0 = this.$2k_3($p0, $p1);
        $p0 = this.$2l_3($p0);
        var $v_1 = isValueBoundOperator($p0) ? 2 : 1;
        if ($p0.startsWith(":")) {
            var $v_3 = $p0.split(":");
            $p0 = $v_3[1];
            if (!isNullOrEmptyString($v_0)) $v_0 = $v_3[2].replace("{0}", $v_0)
        }
        var $v_2 = {};
        $v_2["OperatorType"] = $v_1;
        $v_2["Operator"] = $p0;
        $v_2["Operand"] = $v_0;
        $v_2["isFromFetch"] = false;
        $v_2["xpath"] = null;
        $v_2["filterGroup"] = null;
        $v_2["IsDirty"] = true;
        return $v_2
    },
    $1B_3: function ($p0, $p1) {
        var $v_0 = $p1.value;
        if (isValueBoundOperator($v_0)) this.$39_3($p0, $v_0);
        else this.$L_3($p0, "readonly")
    },
    $39_3: function ($p0, $p1) {
        switch (getAbstractDataType(this.$d_3)) {
            case "string":
            case "memo":
                this.$L_3($p0, "string");
                var $v_0 = this.$k_3("maxlength");
                if (!isNullOrEmptyString($v_0)) XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0)).maxLength = $v_0;
                break;
            case "number":
                this.$L_3($p0, "number");
                var $v_1 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0)),
                    $v_2 = Mscrm.FormControlInputBehavior.GetBehavior($v_1.id),
                    $v_3 = this.$k_3("datatype");
                if (!isNullOrEmptyString($v_3)) if ($v_3 === "integer") $v_2.set_dataType("int");
                else $v_2.set_dataType($v_3);
                var $v_4 = this.$k_3("acc");
                !isNullOrEmptyString($v_4) && $v_2.set_precision(parseInt($v_4, 10));
                var $v_5 = this.$k_3("min");
                !isNullOrEmptyString($v_5) && $v_2.set_min(parseInt($v_5, 10));
                var $v_6 = this.$k_3("max");
                !isNullOrEmptyString($v_6) && $v_2.set_max(parseInt($v_6, 10));
                break;
            case "date":
                var $v_7 = {}, $v_8 = {}, $v_9 = "",
                    $v_A = "",
                    $v_B;
                switch ($p1) {
                    case "last-x-hours":
                    case "next-x-hours":
                        $v_7["hours"] = 1;
                        $v_8["hours"] = 2e3;
                        $v_9 = "hours";
                        break;
                    case "last-x-days":
                    case "next-x-days":
                        $v_7["days"] = 1;
                        $v_8["days"] = 500;
                        $v_9 = "days";
                        break;
                    case "last-x-weeks":
                    case "next-x-weeks":
                        $v_7["weeks"] = 1;
                        $v_8["weeks"] = 100;
                        $v_9 = "weeks";
                        break;
                    case "last-x-months":
                    case "next-x-months":
                    case "olderthan-x-months":
                        $v_7["months"] = 1;
                        $v_8["months"] = 100;
                        $v_9 = "months";
                        break;
                    case "last-x-years":
                    case "next-x-years":
                        $v_7["years"] = 1;
                        $v_8["years"] = 100;
                        $v_9 = "years";
                        break;
                    case "last-x-fiscal-periods":
                    case "next-x-fiscal-periods":
                        $v_7["fiscalperiods"] = 1;
                        $v_8["fiscalperiods"] = 100;
                        $v_9 = "fiscalperiods";
                        break;
                    case "last-x-fiscal-years":
                    case "next-x-fiscal-years":
                        $v_7["fiscalyears"] = 1;
                        $v_8["fiscalyears"] = 100;
                        $v_9 = "fiscalyears";
                        break;
                    case "in-fiscal-year":
                        this.$L_3($p0, "fiscalperiodandyear");
                        $v_A = XUI.Html.DomUtils.GetFirstChild($p0).id;
                        $v_B = $find($v_A);
                        $v_B.set_showPeriod(false);
                        $v_B.set_showYear(true);
                        break;
                    case "in-fiscal-period":
                        this.$L_3($p0, "fiscalperiodandyear");
                        $v_A = XUI.Html.DomUtils.GetFirstChild($p0).id;
                        $v_B = $find($v_A);
                        $v_B.set_showPeriod(true);
                        $v_B.set_showYear(false);
                        break;
                    case "in-fiscal-period-and-year":
                    case "in-or-before-fiscal-period-and-year":
                    case "in-or-after-fiscal-period-and-year":
                        this.$L_3($p0, "fiscalperiodandyear");
                        $v_A = XUI.Html.DomUtils.GetFirstChild($p0).id;
                        $v_B = $find($v_A);
                        $v_B.set_showPeriod(true);
                        $v_B.set_showYear(true);
                        break;
                    case "eq":
                    case "ne":
                    case "gt":
                    case "ge":
                    case "lt":
                    case "le":
                        this.$L_3($p0, "datetime");
                        break;
                    default:
                        this.$L_3($p0, "date");
                        break
                }
                if ($v_9 !== "") {
                    this.$L_3($p0, "number");
                    var $v_C = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0)),
                        $v_D = Mscrm.FormControlInputBehavior.GetBehavior($v_C.id);
                    $v_D.set_min(parseInt($v_7[$v_9], 10));
                    $v_D.set_max(parseInt($v_8[$v_9], 10));
                    $v_D.set_precision(0)
                }
                break;
            case "picklist":
                if (isNameOperator($p1)) {
                    this.$L_3($p0, "string");
                    var $v_E = this.$k_3("namemaxlength");
                    if (!isNullOrEmptyString($v_E)) XUI.Html.DomUtils.GetFirstChild($p0).maxLength = $v_E
                } else {
                    this.$L_3($p0, "picklist");
                    var $v_F = XUI.Html.DomUtils.GetFirstChild($p0);
                    $find($v_F.id).LoadOptionsXml(this.$e_3.optionsXml)
                }
                break;
            case "lookup":
            case "owner":
                if (isNameOperator($p1)) {
                    this.$L_3($p0, "string");
                    var $v_G = this.$k_3("namemaxlength");
                    if (!isNullOrEmptyString($v_G)) XUI.Html.DomUtils.GetFirstChild($p0).maxLength = $v_G
                } else {
                    var $v_H = this.$17_3.attributes.getNamedItem("lookuptypes").nodeValue,
                        $v_I = "multi",
                        $v_J = this.$17_3.attributes.getNamedItem("lookuptypenames").nodeValue,
                        $v_K = XUI.Xml.GetText(XUI.Xml.SelectSingleNode(this.$1C_3, "/attributeinfo/lookupicons", null)),
                        $v_L = {};
                    $v_L["lookupStyle"] = $v_I;
                    $v_L["lookupTypes"] = $v_H;
                    $v_L["lookupTypeIcons"] = Mscrm.GridFilterCustomControl.$2h($v_K);
                    $v_L["lookupTypeNames"] = $v_J;
                    this.$L_3($p0, "lookup", $v_L)
                }
                break
        }
    },
    $k_3: function ($p0) {
        var $v_0 = this.$1I_3.getNamedItem($p0);
        if (!IsNull($v_0)) return $v_0.nodeValue;
        else return null
    },
    $26_3: function ($p0) {
        var $v_0 = $p0.getAttribute("innerControlId");
        return isNullOrEmptyString($v_0) ? XUI.Html.DomUtils.GetFirstChild($p0) : $get($v_0)
    },
    $L_3: function ($p0, $p1, $p2) {
        var $v_0 = $p0.id === "primaryValue",
            $v_1 = $v_0 ? this.$1l_3 : this.$1m_3;
        if ($v_1 === $p1) return;
        var $v_2 = XUI.Html.DomUtils.GetFirstChild($p0);
        if (!IsNull($v_2) && !isNullOrEmptyString($v_2.id)) {
            $p0.removeAttribute("innerControlId");
            var $v_9 = Mscrm.FormControlInputBehavior.GetBehavior($v_2.id);
            !IsNull($v_9) && $v_9.dispose()
        }
        switch ($p1) {
            case "string":
                $p0.innerHTML = $get("txt").innerHTML;
                var $v_3 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0));
                $v_3.id = $p0.id + "_txt";
                $p0.setAttribute("innerControlId", $v_3.id);
                $create(Mscrm.FormInputControl.TextBoxInputBehavior, null, null, null, $v_3);
                this.$g_3($v_0, $p1);
                break;
            case "number":
                $p0.innerHTML = $get("num").innerHTML;
                var $v_4 = XUI.Html.DomUtils.GetFirstChild(XUI.Html.DomUtils.GetFirstChild($p0));
                $v_4.id = $p0.id + "_num";
                $p0.setAttribute("innerControlId", $v_4.id);
                $create(Mscrm.FormInputControl.NumberInputBehavior, null, null, null, $v_4);
                this.$g_3($v_0, $p1);
                break;
            case "date":
                if ($v_1 !== $p1) {
                    $p0.innerHTML = $get("date").innerHTML;
                    Mscrm.FormInputControl.DateTimeBehavior.registerDateTimeComponents($p0);
                    this.$g_3($v_0, $p1)
                }
                break;
            case "datetime":
                if ($v_1 !== $p1) {
                    $p0.innerHTML = $get("datetime").innerHTML;
                    Mscrm.FormInputControl.DateTimeBehavior.registerDateTimeComponents($p0);
                    this.$g_3($v_0, $p1)
                }
                break;
            case "picklist":
                $p0.innerHTML = $get("picklist").innerHTML;
                var $v_5 = XUI.Xml.DomUtils.GetFirstChild($p0);
                $v_5.id = $p0.id + "_picklist";
                Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/_controls/multipicklist/multipicklist.js"), true);
                $create(Mscrm.MultiPicklist, null, null, null, $v_5);
                this.$g_3($v_0, $p1);
                break;
            case "fiscalperiodandyear":
                $p0.innerHTML = $get("fiscalperiodandyear").innerHTML;
                var $v_6 = XUI.Xml.DomUtils.GetFirstChild($p0);
                $v_6.id = $p0.id + "_fiscalperiodandyear";
                Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/AdvancedFind/AdvFind.js"), true);
                Mscrm.CrmHeader.setScriptFile(Mscrm.CrmUri.create("/_static/AdvancedFind/AdvancedFindControl.js"), true);
                $create(Mscrm.FiscalPeriodAndYear, null, null, null, $v_6);
                this.$g_3($v_0, $p1);
                break;
            case "lookup":
                $p0.innerHTML = $get("lookup").innerHTML;
                var $v_7 = XUI.Html.DomUtils.GetFirstChild($p0);
                $v_7.id = $p0.id + "_lookupTable";
                var $v_8 = XUI.Html.DomUtils.GetFirstChild($v_7.rows[0].cells[1]);
                $v_8.id = $v_7.id + "_img";
                Mscrm.CrmUIComponent.crmCreate(Mscrm.FormInputControl.PresenceLookupUIBehavior, $p2, null, null, $v_8);
                this.$g_3($v_0, $p1);
                break;
            case "readonly":
                $p0.innerHTML = $get("rotxt").innerHTML;
                this.$g_3($v_0, $p1);
                break
        }
    },
    $g_3: function ($p0, $p1) {
        if ($p0) this.$1l_3 = $p1;
        else this.$1m_3 = $p1
    },
    $2k_3: function ($p0, $p1) {
        if (IsNull($p1)) return null;
        var $v_0 = $p1;
        if (isNameOperator($p0)) return ConvertUserTypeToLike($v_0);
        switch (getAbstractDataType(this.$d_3)) {
            case "date":
                if (isValueBoundOperator($p0)) if (isDynamicDateOperator($p0) || $p0 === "in-fiscal-year" || $p0 === "in-fiscal-period") $v_0 = $p1;
                else if ($p0 === "in-fiscal-period-and-year" || $p0 === "in-or-before-fiscal-period-and-year" || $p0 === "in-or-after-fiscal-period-and-year") {
                    var $v_1 = $p1,
                        $v_2 = $v_1.substr(5, 2),
                        $v_3 = $v_1.substr(0, 4),
                        $v_4 = new Sys.StringBuilder;
                    $v_4.append("<values><value>");
                    $v_4.append(CrmEncodeDecode.CrmXmlEncode($v_2));
                    $v_4.append("</value><value>");
                    $v_4.append(CrmEncodeDecode.CrmXmlEncode($v_3));
                    $v_4.append("</value></values>");
                    $v_0 = $v_4.toString()
                } else if (!IsNull($p1)) {
                    $v_0 = FormatUtcDate($p1);
                    $v_0 = $v_0.substring(0, $v_0.length - 9)
                }
                break;
            case "picklist":
                if (($p0 === "in" || $p0 === "not-in") && !IsNull($p1) && isValueBoundOperator($p0) && !$p1.startsWith("<values>")) {
                    var $v_5 = new Sys.StringBuilder;
                    $v_5.append("<values><value>");
                    $v_5.append(CrmEncodeDecode.CrmXmlEncode($p1));
                    $v_5.append("</value></values>");
                    $v_0 = $v_5.toString()
                }
                break;
            case "lookup":
            case "owner":
                if (isValueBoundOperator($p0)) {
                    var $v_6 = $p1,
                        $v_7 = new Sys.StringBuilder;
                    $v_7.append("<values>");
                    for (var $v_8 = this.$17_3.attributes.getNamedItem("lookuptypenames").nodeValue, $v_9 = $v_8.split(","), $v_A = 0; $v_A < $v_6.length; $v_A++) {
                        for (var $v_B = $v_6[$v_A], $v_C = null, $v_D = 0; $v_D < $v_9.length; $v_D++) if ($v_9[$v_D].indexOf(":" + $v_B.type + ":") > 0) {
                            $v_C = $v_9[$v_D].split(":")[0];
                            break
                        }
                        $v_7.append('<value uiname ="');
                        $v_7.append(CrmEncodeDecode.CrmXmlAttributeEncode($v_B.name));
                        $v_7.append('" uitype="');
                        $v_7.append(CrmEncodeDecode.CrmXmlAttributeEncode($v_C));
                        $v_7.append('">');
                        $v_7.append(CrmEncodeDecode.CrmXmlEncode($v_B.id));
                        $v_7.append("</value>")
                    }
                    $v_7.append("</values>");
                    $v_0 = $v_6.length > 0 ? $v_7.toString() : ""
                }
                break;
            case "number":
                $v_0 = parseFloat($p1).toString();
                break;
            default:
                $v_0 = $p1;
                break
        }
        return $v_0
    },
    $2l_3: function ($p0) {
        $p0 = getOptionValue($p0);
        if ($p0 === "anytime") return "not-null";
        else return $p0
    },
    $2G_3: function ($p0, $p1, $p2) {
        if (!IsNull($p2)) {
            for (var $v_0 = constructOperatorValues($p2.$2_0, $p2.$8_0), $v_1 = $v_0[0], $v_2 = $v_0[1], $v_3, $v_4 = $p1.options.length, $v_5 = false, $v_8 = 0; $v_8 < $v_4; $v_8++) {
                $v_3 = $p1.options[$v_8];
                var $v_9 = $v_3.value;
                if ($v_1 === $v_9) {
                    $p1.selectedIndex = $v_8;
                    $v_5 = true;
                    break
                }
            }
            if (!$v_5) $p1.selectedIndex = 1;
            this.$1B_3($p0, $p1);
            var $v_6 = $p1.value,
                $v_7 = this.$26_3($p0);
            if (isValueBoundOperator($v_6)) if (isNameOperator($v_1)) $v_7.value = $v_2;
            else {
                var $v_A = getAbstractDataType(this.$d_3);
                switch ($v_A) {
                    case "string":
                    case "memo":
                        var $v_B = Mscrm.FormControlInputBehavior.GetBehavior($v_7.id);
                        $v_B.set_dataValue($v_2);
                        break;
                    default:
                        var $v_C = this.$24_3($v_7);
                        if (IsNull($v_2)) if (IsNull($v_C)) $v_7.DataValue = null;
                        else $v_C.set_dataValue(null);
                        else {
                            var $v_D = constructValues(getAbstractDataType(this.$d_3), $p2.$2_0, $v_2);
                            if (IsNull($v_C)) $v_7.DataValue = $v_D;
                            else $v_C.set_dataValue($v_D)
                        }
                        break
                }
            }
        }
    }
};
Mscrm.LookupFilterPopup = function (element) {
    this.$1a_5 = {};
    this.$1L_5 = {};
    Mscrm.LookupFilterPopup.initializeBase(this, [element]);
    this._type = "lookup"
};
Mscrm.LookupFilterPopup.prototype = {
    $F_5: null,
    $J_5: null,
    $1S_5: null,
    $1T_5: null,
    $1e_5: 0,
    $1O_5: null,
    initialize: function () {
        Mscrm.FilterPopup.prototype.initialize.call(this);
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml());
        var $v_0 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + this.getId("Choose") + "']", null),
            $v_1 = XUI.Xml.GetText($v_0.attributes.getNamedItem("display")),
            $v_2 = XUI.Xml.GetText(this._resultNode);
        $v_1 = String.format($v_1, $v_2);
        $v_0 = this.setAttributeUtil($v_0, "display", $v_1);
        this.$1S_5 = CrmEncodeDecode.CrmHtmlDecode(XUI.Xml.GetText(XUI.Xml.SelectSingleNode(this._attributeXmlDocument, "/attributeinfo/lookupicons", null)));
        this.$1T_5 = this._resultNode.attributes.getNamedItem("lookuptypenames").nodeValue;
        for (var $v_3 = this.$1T_5.split(","), $v_4 = 0; $v_4 < $v_3.length; $v_4++) {
            var $v_5 = $v_3[$v_4].split(":");
            this.$1a_5[$v_5[0]] = $v_5[1];
            this.$1L_5[$v_5[1]] = $v_5[0]
        } !Mscrm.PageManager.isOutlookProxyPage() && this.$2w_5()
    },
    onDisable: function () {
        Mscrm.FilterPopup.prototype.onDisable.call(this);
        this.$J_5 = null;
        this.$F_5 = null
    },
    FilterChanged: function (item) {
        if (!IsNull(item)) {
            var $v_0 = item.get_menuItemId(),
                $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + $v_0 + "']", null);
            $v_0 = XUI.Xml.GetText($v_1.attributes.getNamedItem("type"));
            if (!IsNull($v_1.attributes.getNamedItem("filterconditionxpath")) && XUI.Xml.GetText($v_1.attributes.getNamedItem("type")) === $v_0) if (!isNullOrEmptyString($v_0) && !($v_0 === "Choose")) if (!Mscrm.GridFilterUtil.isToggleableFilterAction($v_0) && XUI.Xml.GetText($v_1.attributes.getNamedItem("filterconditionxpath"))) return;
            this.$1O_5 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
            switch ($v_0) {
                case "Choose":
                    this.$2v_5(this.$1O_5);
                    break;
                case "CurrUser":
                    this.ClearFilterConditions(true, true);
                    this.$2q_5();
                    this.$1O_5.ApplyFilters();
                    break;
                case "ResetFilter":
                    this.$J_5 = null;
                    this.$F_5 = null;
                    this.ClearFilterConditions(true, true);
                    if (this.get_appliedFilters().get_isDirty()) this.$1O_5.ApplyFilters();
                    else {
                        this.clearUI();
                        this.initUI()
                    }
                    break;
                default:
                    Mscrm.FilterPopup.prototype.FilterChanged.call(this, item);
                    break
            }
        }
        this._dirtyUI = false
    },
    ProcessOkButtonClick: function (menu) {
        var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
        if (this.isVSAFilterDirty()) {
            this.ClearFilterConditions(true, true);
            this.$2s_5();
            $v_0.ApplyFilters()
        } else this._dirtyUI = false
    },
    clearUI: function () {
        Mscrm.FilterPopup.prototype.clearUI.call(this);
        this.$3E_5()
    },
    initUI: function () {
        Mscrm.FilterPopup.prototype.initUI.call(this);
        for (var $v_0 = false, $v_1 = null, $v_2 = this.get_appliedFilters().$1_0.length, $v_4 = 0; $v_4 < $v_2; $v_4++) {
            var $v_5 = this.get_appliedFilters().$1_0[$v_4],
                $v_6 = $v_5.$2_0,
                $v_7 = $v_5.$5_0;
            if ($v_5.$2_0 === "eq-userid") {
                this.setCheckmark(this.getId("CurrUser"), $v_7, $v_5.$6_0);
                this._isFilterPopUpDirty = !$v_7 ? true : this._isFilterPopUpDirty;
                break
            } else if ($v_5.$2_0 === "in" || $v_5.$2_0 === "eq") {
                this.setCheckmark(this.getId("Choose"), $v_7, $v_5.$6_0);
                $v_0 = true;
                this._isFilterPopUpDirty = !$v_7 ? true : this._isFilterPopUpDirty;
                $v_1 = $v_5;
                break
            }
        }
        this.$3K_5($v_1);
        if (!$v_0) for (var $v_8 = 0; $v_8 < this._originalFilters.length; $v_8++) {
            var $v_9 = this._originalFilters[$v_8],
                $v_A = $v_9.$2_0;
            if ($v_9.$2_0 === "in" || $v_9.$2_0 === "eq") {
                this.setCheckmark(this.getId("Choose"), false, $v_9.$6_0);
                this._isFilterPopUpDirty = true;
                break
            }
        }
        if (this._isFilterPopUpDirty) this.setMenuUIDirty(true);
        else this.setMenuUIDirty(false);
        var $v_3 = this.$2O_5($v_1);
        if (!$v_3) this.menu.set_showOkCancelButtons(false);
        else this.menu.set_showOkCancelButtons(true);
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml());
        this.toggleButtonContainer($v_3)
    },
    $2B_5: function ($p0, $p1, $p2) {
        var $v_0 = this.$1S_5.split(":"),
            $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='SelectionArea']", null);
        if (!IsNull($p0)) {
            for (var $v_2 = 0; $v_2 < $p0.items.length; $v_2++) {
                var $v_3 = this.menu.get_menuXml().createElement("option"),
                    $v_4 = new Sys.StringBuilder;
                $v_4.append(this._thisElement.getAttribute("gridid"));
                $v_4.append(this._entityName);
                $v_4.append(this._attributeName);
                $v_4.append(this._relationshipName);
                $v_4.append("Check");
                $v_4.append(this.$1e_5.toString());
                this.$1e_5++;
                var $v_5 = $v_4.toString();
                this.setAttributeUtil($v_3, "id", $v_5);
                var $v_6 = null;
                $v_6 = $p0.items[$v_2].type;
                $v_3 = this.setAttributeUtil($v_3, "type", $v_6);
                XUI.Xml.SetText($v_3, $p0.items[$v_2].name);
                $v_3 = this.setAttributeUtil($v_3, "display", $p0.items[$v_2].name);
                $v_3 = this.setAttributeUtil($v_3, "value", $p0.items[$v_2].id);
                $v_3 = this.setAttributeUtil($v_3, "ischecked", $p1);
                $v_3 = this.setAttributeUtil($v_3, "isdummychecked", $p1);
                var $v_7 = CrmEncodeDecode.CrmHtmlDecode($p0.items[$v_2].typevalue),
                    $v_8 = this.$1L_5[$v_6].toString();
                $v_3 = this.setAttributeUtil($v_3, "uitype", $v_8);
                $v_1.appendChild($v_3);
                for (var $v_9 = 0; $v_9 < $v_0.length; $v_9++) if ($v_0[$v_9] === $v_6) {
                    var $v_A = $v_0[$v_9 + 1],
                        $v_B = Mscrm.CrmUri.create($v_A).toString();
                    $v_3 = this.setAttributeUtil($v_3, "imagePath", $v_B)
                }
            }
            this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
        }
    },
    $2O_5: function ($p0) {
        if (IsNull(this.$F_5) && IsNull(this.$J_5)) return false;
        var $v_0 = this.$j_5(this.$F_5),
            $v_1 = this.$j_5(this.$J_5),
            $v_2 = $v_0 + $v_1;
        if (!$v_2) return false;
        this.$2B_5(this.$F_5, "true", $p0);
        this.$2B_5(this.$J_5, "false", $p0);
        this.$1e_5 = 0;
        return true
    },
    $2v_5: function ($p0) {
        var $v_0 = this.$2L_5();
        if (!$v_0) return;
        this.ClearFilterConditions(true, true);
        var $v_1 = this.$1w_5(this.$F_5);
        this.handleMultiSelectClicks($v_1);
        $p0.ApplyFilters();
        this.clearBackup()
    },
    $2s_5: function () {
        this.$F_5 = this.$21_5();
        this.$J_5 = this.$28_5();
        var $v_0 = this.$1w_5(this.$F_5);
        this.handleMultiSelectClicks($v_0);
        this.clearBackup()
    },
    $2q_5: function () {
        for (var $v_0 = null, $v_1 = null, $v_2 = 0; $v_2 < this.get_appliedFilters().$1_0.length; $v_2++) {
            $v_1 = this.get_appliedFilters().$1_0[$v_2];
            var $v_3 = $v_1.$2_0;
            if ($v_3 === "eq-userid" && $v_1.$5_0 && !$v_1.$G_0) {
                $v_0 = $v_1;
                break
            }
        }
        if (IsNull($v_0)) {
            var $v_4 = new Mscrm.FilterCondition(1, "eq-userid", "", false, "");
            $v_4.$5_0 = false;
            $v_4.$7_0 = true;
            Array.add(this.get_appliedFilters().$1_0, $v_4)
        } else {
            $v_0.$2_0 = "eq-userid";
            $v_0.$5_0 = false
        }
        this.clearBackup()
    },
    $2L_5: function () {
        var $v_0 = this._resultNode.attributes.getNamedItem("lookuptypes").nodeValue,
            $v_1 = "multi";
        if ($v_0 === Mscrm.EntityTypeCode.Subject.toString()) $v_1 = "subject";
        this.$F_5 = this.$21_5();
        this.$J_5 = this.$28_5();
        this.$37_5(this.$F_5);
        var $v_2 = LookupObjects(this.$2g_5(), $v_1, $v_0, 0, null, null, 0, 1, false, null, null, null, null, null, null, null, null, null, null, null, null, null);
        if (IsNull($v_2)) return false;
        if ($v_2.items.length > window.GF_MAXRECORDS_LOOKUP) {
            var $v_3 = String.format(window.LOCID_GF_LOOKUPMAXLIMIT, $v_2.items.length);
            alert($v_3);
            return false
        }
        this.$F_5 = $v_2;
        this.$1u_5();
        return true
    },
    $3K_5: function ($p0) {
        this.$J_5 = this.$31_5(this.$F_5, this.$J_5);
        this.$F_5 = null;
        if (!IsNull($p0)) {
            for (var $v_0 = XUI.Xml.LoadXml($p0.$8_0), $v_1 = XUI.Xml.SelectNodes($v_0, "/values/value", null), $v_2 = [], $v_3 = 0; $v_3 < $v_1.length; $v_3++) {
                var $v_4 = {};
                $v_4.type = this.$1a_5[$v_1[$v_3].attributes.getNamedItem("uitype").nodeValue];
                $v_4.id = XUI.Xml.GetText($v_1[$v_3]);
                $v_4.name = $v_1[$v_3].attributes.getNamedItem("uiname").nodeValue;
                Array.add($v_2, $v_4)
            }
            this.$F_5 = this.$1N_5($v_2);
            this.$1u_5()
        }
    },
    $1w_5: function ($p0) {
        var $v_0 = this.$j_5($p0);
        if (!$v_0) return null;
        var $v_1 = $p0.items,
            $v_2 = null,
            $v_3 = new Sys.StringBuilder;
        $v_3.append("<values>");
        for (var $v_5 = 0; $v_5 < $v_0; $v_5++) {
            $v_2 = $v_1[$v_5];
            this.$2K_5($v_3, $v_2.id, $v_2.name, this.$1L_5[$v_2.type])
        }
        $v_3.append("</values>");
        var $v_4 = new Mscrm.FilterCondition(2, "in", $v_3.toString(), false, null);
        return $v_4
    },
    $2K_5: function ($p0, $p1, $p2, $p3) {
        $p0.append('<value uiname="');
        $p0.append(CrmEncodeDecode.CrmXmlAttributeEncode($p2));
        $p0.append('" uitype="');
        $p0.append(CrmEncodeDecode.CrmXmlAttributeEncode($p3));
        $p0.append('">');
        $p0.append(CrmEncodeDecode.CrmXmlEncode($p1));
        $p0.append("</value>")
    },
    $3E_5: function () {
        var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null);
        if (!IsNull($v_0)) for (var $v_1 = 0; $v_1 < $v_0.length; $v_1++) $v_0[$v_1].parentNode.removeChild($v_0[$v_1]);
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
    },
    $2g_5: function () {
        return $get(this.$1d_5() + "hiddenlookupfilterfield")
    },
    $37_5: function ($p0) {
        for (var $v_0 = $get(this.$1d_5() + "hiddenlookupfilterfield"), $v_1 = XUI.Html.DomUtils.GetFirstChild($v_0).getElementsByTagName("IMG"), $v_2 = $v_1.length, $v_3 = 0; $v_3 < $v_2; $v_3++) if (Sys.UI.DomElement.containsCssClass($v_1[$v_3], "ms-crm-Lookup")) {
            var $v_4 = Mscrm.FormControlInputBehavior.GetBehavior($v_1[$v_3].id);
            $v_4.set_dataValue($p0.items);
            break
        }
    },
    $1d_5: function () {
        var $v_0 = new Sys.StringBuilder;
        $v_0.append("lookupFilterPopup");
        $v_0.append(this._thisElement.getAttribute("gridid"));
        $v_0.append(this._entityName);
        $v_0.append(this._attributeName);
        $v_0.append(this._relationshipName);
        return $v_0.toString()
    },
    $2w_5: function () {
        var $v_0 = $get(this.$1d_5() + "hiddenlookupfilterfield"),
            $v_1 = this._resultNode.attributes.getNamedItem("lookuptypes").nodeValue,
            $v_2 = "multi";
        if ($v_1 === Mscrm.EntityTypeCode.Subject.toString()) $v_2 = "subject";
        for (var $v_3 = XUI.Html.DomUtils.GetFirstChild($v_0).getElementsByTagName("IMG"), $v_4 = null, $v_5 = $v_3.length, $v_6 = 0; $v_6 < $v_5; $v_6++) if (Sys.UI.DomElement.containsCssClass($v_3[$v_6], "ms-crm-Lookup")) {
            $v_4 = Mscrm.FormControlInputBehavior.GetBehavior($v_3[$v_6].id);
            break
        }
        if (!IsNull($v_4)) {
            $v_4.set_lookupStyle($v_2);
            $v_4.set_lookupTypes($v_1);
            $v_4.set_lookupTypeIcons(this.$1S_5);
            $v_4.set_lookupTypeNames(this.$1T_5)
        }
    },
    $21_5: function () {
        var $v_0 = this.$22_5(true);
        return this.$1N_5($v_0)
    },
    $28_5: function () {
        var $v_0 = this.$22_5(false);
        return this.$1N_5($v_0)
    },
    $22_5: function ($p0) {
        for (var $v_0 = [], $v_1 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null), $v_2 = 0; $v_2 < $v_1.length; $v_2++) if (XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("ischecked")) === "true" && $p0 || XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("ischecked")) === "false" && !$p0) {
            var $v_3 = {};
            $v_3.type = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("type"));
            if (!IsNull($v_1[$v_2].attributes.getNamedItem("uitype"))) $v_3.typename = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("uitype"));
            $v_3.id = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("value"));
            $v_3.name = XUI.Xml.GetText($v_1[$v_2].attributes.getNamedItem("display"));
            Array.add($v_0, $v_3)
        }
        return $v_0
    },
    $1N_5: function ($p0) {
        var $v_0 = {};
        $v_0.items = $p0;
        return $v_0
    },
    $j_5: function ($p0) {
        if (!IsNull($p0) && !IsNull($p0.items)) return $p0.items.length;
        return 0
    },
    $1u_5: function () {
        var $v_0 = this.$j_5(this.$F_5),
            $v_1 = this.$j_5(this.$J_5);
        if (!$v_0 || !$v_1) return;
        for (var $v_2 = [], $v_5 = 0; $v_5 < $v_0; $v_5++) Array.add($v_2, this.$F_5.items[$v_5].id);
        for (var $v_3, $v_4 = [], $v_6 = 0; $v_6 < $v_1; $v_6++) {
            $v_3 = this.$J_5.items[$v_6];
            !Array.contains($v_2, $v_3.id) && Array.add($v_4, $v_3)
        }
        this.$J_5 = this.$1N_5($v_4)
    },
    $31_5: function ($p0, $p1) {
        var $v_0 = this.$j_5(this.$F_5),
            $v_1 = this.$j_5(this.$J_5);
        if (!$v_0 && !$v_1) return null;
        if (!$v_0) return $p1;
        if (!$v_1) return $p0;
        for (var $v_2 = $p1.items, $v_3 = $p0.items, $v_4 = 0; $v_4 < $v_2.length; $v_4++) $v_3[$v_3.length] = $v_2[$v_4];
        return $p0
    },
    describeOperand: function (operand) {
        if (isNullOrEmptyString(operand)) return "";
        else {
            for (var $v_0 = new Sys.StringBuilder, $v_1 = XUI.Xml.LoadXml(operand), $v_2 = [], $v_3 = XUI.Xml.SelectNodes($v_1, "/values/value", null), $v_4 = 0; $v_4 < $v_3.length; $v_4++) {
                $v_4 > 0 && $v_0.append(";");
                var $v_5 = $v_3[$v_4].attributes.getNamedItem("uiname").nodeValue;
                $v_0.append($v_5)
            }
            return $v_0.toString()
        }
    }
};
Mscrm.MultiSelectFilterPopup = function (element) {
    Mscrm.MultiSelectFilterPopup.initializeBase(this, [element])
};
Mscrm.MultiSelectFilterPopup.prototype = {
    _dirtyUI: false,
    _multiSelect: null,
    getMultiSelectElementReference: function () {
        for (var $v_0 = this._thisElement.getElementsByTagName("LI"), $v_1 = 0; $v_1 < $v_0.length; $v_1++) if ($v_0[$v_1].id.endsWith("MultiSelectContainer")) return $v_0[$v_1];
        return null
    },
    getButtonContainerReference: function () {
        return $get(this.getId("ButtonContainer"), this._thisElement)
    },
    handleMultiSelectClicks: function (fc) {
        if (IsNull(fc)) this.clearMultiSelectCondition();
        else {
            for (var $v_0 = null, $v_1 = null, $v_2 = 0; $v_2 < this.get_appliedFilters().$1_0.length; $v_2++) {
                $v_1 = this.get_appliedFilters().$1_0[$v_2];
                var $v_3 = $v_1.$2_0;
                if (($v_3 === "eq" || $v_3 === "in") && $v_1.$5_0 && !$v_1.$G_0) {
                    $v_0 = $v_1;
                    break
                }
            }
            if (IsNull($v_0)) {
                fc.$5_0 = false;
                fc.$7_0 = true;
                Array.add(this.get_appliedFilters().$1_0, fc)
            } else {
                var $v_4 = $v_0.$6_0,
                    $v_5 = Mscrm.GridFilterUtil.getParentFilterXPathFromConditionXPath($v_4);
                this.clearMultiSelectCondition();
                var $v_6 = new Sys.StringBuilder;
                $v_6.append($v_5);
                $v_6.append('/condition[@gridfilterconditionid="');
                $v_6.append(Mscrm.GridFilterUtil.createUniqueId());
                $v_6.append('"]');
                fc.$6_0 = $v_6.toString();
                fc.$5_0 = false;
                fc.$7_0 = true;
                Array.add(this.get_appliedFilters().$1_0, fc)
            }
        }
    },
    MultiCheckBoxChanged: function () {
        this._dirtyUI = true
    },
    SetUIUndirty: function (item) {
        this._multiSelect = this.getMultiSelectElementReference();
        for (var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null), $v_1 = 0; $v_1 < $v_0.length; $v_1++) if (!IsNull($v_0[$v_1].attributes.getNamedItem("isdummychecked")) && Boolean.parse(XUI.Xml.GetText($v_0[$v_1].attributes.getNamedItem("isdummychecked")))) this.setAttributeUtil($v_0[$v_1], "ischecked", "true");
        else this.setAttributeUtil($v_0[$v_1], "ischecked", "false");
        this._dirtyUI = false
    },
    isVSAFilterDirty: function () {
        this._multiSelect = this.getMultiSelectElementReference();
        for (var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null), $v_1 = 0; $v_1 < $v_0.length; $v_1++) if (!IsNull($v_0[$v_1].attributes.getNamedItem("isdummychecked"))) {
            if (XUI.Xml.GetText($v_0[$v_1].attributes.getNamedItem("isdummychecked")) !== XUI.Xml.GetText($v_0[$v_1].attributes.getNamedItem("ischecked"))) return true
        } else if (!IsNull($v_0[$v_1].attributes.getNamedItem("ischecked"))) if (XUI.Xml.GetText($v_0[$v_1].attributes.getNamedItem("ischecked")) === "true") return true;
        return false
    },
    clearMultiSelectCondition: function () {
        for (var $v_0 = null, $v_1 = 0; $v_1 < this.get_appliedFilters().$1_0.length; $v_1++) {
            $v_0 = this.get_appliedFilters().$1_0[$v_1];
            var $v_2 = $v_0.$2_0;
            if (($v_2 === "eq" || $v_2 === "in") && $v_0.$5_0 && !$v_0.$G_0) {
                Array.remove(this.get_appliedFilters().$1_0, $v_0);
                return
            }
        }
    },
    adjustNameAttribute: function (condition) {
        if (isNameOperator(condition.$2_0)) condition.$H_0 = this._resultNode.attributes.getNamedItem("nameattr").nodeValue
    },
    describeOrdinaryCondition: function (condition) {
        if (condition.$2_0 === "like" || condition.$2_0 === "not-like") return condition.describe();
        else {
            var $v_0 = new Sys.StringBuilder,
                $v_1 = condition.$2_0;
            if ($v_1 === "in") $v_1 = "eq";
            else if ($v_1 === "not-in") $v_1 = "ne";
            if (condition.$N_0 === 2) {
                var $v_2 = condition.$8_0;
                $v_0.append(String.format(window.LOCID_GF_BINARYCONDITIONFORMAT, getLabelForOperator($v_1), this.describeOperand($v_2)))
            } else $v_0.append(getLabelForOperator($v_1));
            return $v_0.toString()
        }
    },
    buildVSAMenuContainer: function () {
        var $v_0 = new Sys.StringBuilder;
        $v_0.append('<LI class = "ms-crm-MultiSelect-container" id="');
        $v_0.append(CrmEncodeDecode.CrmHtmlAttributeEncode(this.getId("LIMultiSelectContainer")));
        $v_0.append('"><UL class = "ms-crm-MultiSelect-container" style="height:10px" id = "');
        $v_0.append(CrmEncodeDecode.CrmHtmlAttributeEncode(this.getId("ULMultiSelectContainer")));
        $v_0.append('">{0}</UL></LI>');
        return $v_0.toString()
    },
    toggleButtonContainer: function (show) {
        var $v_0 = this.getButtonContainerReference();
        if (!IsNull($v_0)) $v_0.style.display = show ? "block" : "none"
    }
};
Mscrm.NumberFilterPopup = function (element) {
    Mscrm.NumberFilterPopup.initializeBase(this, [element]);
    this._type = "number"
};
Mscrm.PicklistFilterPopup = function (element) {
    this.$1W_5 = {};
    Mscrm.PicklistFilterPopup.initializeBase(this, [element]);
    this._type = "picklist"
};
Mscrm.PicklistFilterPopup.prototype = {
    $1V_5: null,
    $1o_5: null,
    $1H_5: null,
    FilterChanged: function (item) {
        var $v_0 = item.get_menuItemId(),
            $v_1 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='" + $v_0 + "']", null);
        $v_0 = XUI.Xml.GetText($v_1.attributes.getNamedItem("type"));
        if (!IsNull($v_1.attributes.getNamedItem("filterconditionxpath")) && XUI.Xml.GetText($v_1.attributes.getNamedItem("type")) === $v_0) if (!Mscrm.GridFilterUtil.isToggleableFilterAction($v_0) && XUI.Xml.GetText($v_1.attributes.getNamedItem("filterconditionxpath"))) return;
        Mscrm.FilterPopup.prototype.FilterChanged.call(this, item);
        this._dirtyUI = false
    },
    ProcessOkButtonClick: function (menu) {
        var $v_0 = $find(Mscrm.GridFilterUtil.getFilterPopupSetId(this._thisElement));
        if (this.isVSAFilterDirty()) {
            this.ClearFilterConditions(true, true);
            this.$2u_5();
            $v_0.ApplyFilters()
        } else {
            this._dirtyUI = false;
            return
        }
    },
    initializeDialog: function (diagArg) {
        Mscrm.FilterPopup.prototype.initializeDialog.call(this, diagArg);
        diagArg.optionsXml = this.$1V_5
    },
    $3N_5: function ($p0) {
        for (var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null), $v_1 = XUI.Xml.LoadXml($p0.$8_0), $v_2 = [], $v_3 = XUI.Xml.SelectNodes($v_1, "/values/value", null), $v_6 = 0; $v_6 < $v_3.length; $v_6++) Array.add($v_2, XUI.Xml.GetText($v_3[$v_6]));
        for (var $v_4 = 0, $v_7 = 0; $v_7 < $v_0.length; $v_7++) {
            this.setAttributeUtil($v_0[$v_7], "ischecked", "false");
            this.setAttributeUtil($v_0[$v_7], "isdummychecked", "false");
            for (var $v_8 = 0; $v_8 < $v_2.length; $v_8++) if (XUI.Xml.GetText($v_0[$v_7].attributes.getNamedItem("value")) === $v_2[$v_8].toString()) {
                this.setAttributeUtil($v_0[$v_7], "isdummychecked", "true");
                this.setAttributeUtil($v_0[$v_7], "ischecked", "true");
                $v_4++
            }
        }
        var $v_5 = this.$1H_5.length;
        if ($v_4 === $v_5) {
            this.setAttributeUtil($v_0[0], "ischecked", "true");
            this.setAttributeUtil($v_0[0], "isdummychecked", "true")
        }
    },
    $2i_5: function () {
        var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null);
        if ($v_0.length < 2) return null;
        var $v_1 = new Sys.StringBuilder;
        $v_1.append("<values>");
        for (var $v_2 = 0, $v_4 = 0; $v_4 < $v_0.length; $v_4++) if (!IsNull($v_0[$v_4].attributes.getNamedItem("ischecked"))) if (XUI.Xml.GetText($v_0[$v_4].attributes.getNamedItem("ischecked")) === "true") {
            $v_1.append("<value>");
            $v_1.append(CrmEncodeDecode.CrmXmlEncode(CrmEncodeDecode.CrmHtmlDecode(XUI.Xml.GetText($v_0[$v_4].attributes.getNamedItem("value")))));
            $v_1.append("</value>");
            $v_2++
        }
        $v_1.append("</values>");
        if (!$v_2) return null;
        var $v_3 = new Mscrm.FilterCondition(2, "in", $v_1.toString(), false, null);
        return $v_3
    },
    initialize: function () {
        Mscrm.FilterPopup.prototype.initialize.call(this);
        this.$1V_5 = CrmEncodeDecode.CrmXmlDecode(this._resultNode.attributes.getNamedItem("optionsXML").nodeValue);
        var $v_0 = CrmEncodeDecode.CrmXmlDecode(this._resultNode.attributes.getNamedItem("optionsXML").nodeValue);
        if (!IsNull($v_0)) {
            var $v_4 = XUI.Xml.LoadXml($v_0),
                $v_5 = XUI.Xml.SelectNodes($v_4, "/select/option", null),
                $v_6 = XUI.Xml.SelectSingleNode(this.menu.get_menuXml(), "//MenuItem[@id='SelectionArea']", null),
                $v_7 = $v_5.length;
            if ($v_7 > window.GF_MAXRECORDS_LOOKUP) {
                var $v_8 = String.format(window.LOCID_GF_PICKLISTMAXLIMIT, window.GF_MAXRECORDS_LOOKUP),
                    $v_9 = this.menu.get_menuXml().createElement("MenuItem");
                this.setAttributeUtil($v_9, "display", $v_8);
                this.setAttributeUtil($v_9, "type", Mscrm.MenuTypes.MESSAGEAREA);
                var $v_A = XUI.Xml.DomUtils.GetFirstChild(this.menu.get_menuXml());
                $v_A.insertBefore($v_9, XUI.Xml.DomUtils.GetFirstChild($v_A))
            } else if (!IsNull(!!$v_6)) for (var $v_B = 0; $v_B < $v_5.length; $v_B++) {
                var $v_C = new Sys.StringBuilder;
                $v_C.append(this._thisElement.getAttribute("gridid"));
                $v_C.append(this._entityName);
                $v_C.append(this._attributeName);
                $v_C.append(this._relationshipName);
                $v_C.append("Check");
                $v_C.append($v_B.toString());
                var $v_D = $v_C.toString(),
                    $v_E = Mscrm.Utilities.getAdoptedNode(this.menu.get_menuXml(), $v_5[$v_B]);
                $v_6.appendChild($v_E);
                this.setAttributeUtil($v_E, "id", $v_D)
            }
        }
        this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml());
        this.$1o_5 = XUI.Xml.LoadXml(this.$1V_5);
        this.$1H_5 = XUI.Xml.SelectNodes(this.$1o_5, "/select/option", null);
        for (var $v_1, $v_2, $v_3, $v_F = 0; $v_F < this.$1H_5.length; $v_F++) {
            $v_3 = this.$1H_5[$v_F];
            $v_1 = $v_3.attributes.getNamedItem("value").nodeValue;
            $v_2 = XUI.Xml.GetText($v_3);
            this.$1W_5[$v_1] = $v_2
        }
    },
    $2u_5: function () {
        var $v_0 = this.$2i_5();
        this.handleMultiSelectClicks($v_0);
        this.clearBackup()
    },
    initUI: function () {
        Mscrm.FilterPopup.prototype.initUI.call(this);
        for (var $v_0 = false, $v_1 = 0; $v_1 < this.get_appliedFilters().$1_0.length; $v_1++) {
            var $v_2 = this.get_appliedFilters().$1_0[$v_1],
                $v_3 = $v_2.$2_0,
                $v_4 = $v_2.$5_0;
            if ($v_2.$2_0 === "in" || $v_2.$2_0 === "eq") {
                this.setCheckmark(Mscrm.MenuTypes.SELECTIONAREA, $v_4, $v_2.$6_0);
                $v_0 = true;
                this._isFilterPopUpDirty = !$v_4 ? true : this._isFilterPopUpDirty;
                this.$3N_5($v_2);
                break
            }
        }
        if (!$v_0) for (var $v_5 = 0; $v_5 < this._originalFilters.length; $v_5++) {
            var $v_6 = this._originalFilters[$v_5],
                $v_7 = $v_6.$2_0;
            if ($v_6.$2_0 === "in" || $v_6.$2_0 === "eq") {
                this.setCheckmark(Mscrm.MenuTypes.SELECTIONAREA, false, $v_6.$6_0);
                this._isFilterPopUpDirty = true;
                break
            }
        }
        if (this._isFilterPopUpDirty) this.setMenuUIDirty(true);
        else this.setMenuUIDirty(false);
        if (!IsNull(this.menu.get_menuXml())) this.xmlString = XUI.Xml.XMLSerializer.serializeToString(this.menu.get_menuXml())
    },
    clearUI: function () {
        Mscrm.FilterPopup.prototype.clearUI.call(this);
        for (var $v_0 = XUI.Xml.SelectNodes(this.menu.get_menuXml(), "//option", null), $v_1 = 0; $v_1 < $v_0.length; $v_1++) {
            this.setAttributeUtil($v_0[$v_1], "ischecked", "false");
            this.setAttributeUtil($v_0[$v_1], "isdummychecked", "false")
        }
    },
    describeOperand: function (operand) {
        if (isNullOrEmptyString(operand)) return "";
        else {
            for (var $v_0 = new Sys.StringBuilder, $v_1 = XUI.Xml.LoadXml(operand), $v_2 = XUI.Xml.SelectNodes($v_1, "/values/value", null), $v_3 = 0; $v_3 < $v_2.length; $v_3++) {
                $v_3 > 0 && $v_0.append(";");
                var $v_4 = XUI.Xml.GetText($v_2[$v_3]),
                    $v_5 = this.$1W_5[$v_4];
                $v_0.append($v_5)
            }
            return $v_0.toString()
        }
    }
};
Mscrm.StringFilterPopup = function (element) {
    Mscrm.StringFilterPopup.initializeBase(this, [element]);
    this._thisElement = element;
    this._type = "string"
};
Mscrm.BaseFetchXmlProcessor.registerClass("Mscrm.BaseFetchXmlProcessor");
Mscrm.OutlookFetchXmlProcessor.registerClass("Mscrm.OutlookFetchXmlProcessor", Mscrm.BaseFetchXmlProcessor);
Mscrm.WebFetchXmlProcessor.registerClass("Mscrm.WebFetchXmlProcessor", Mscrm.BaseFetchXmlProcessor);
Mscrm.QueryData.registerClass("Mscrm.QueryData");
Mscrm.MergedXml.registerClass("Mscrm.MergedXml");
Mscrm.FilterConditionCollection.registerClass("Mscrm.FilterConditionCollection");
Mscrm.FilterCondition.registerClass("Mscrm.FilterCondition");
Mscrm.CustomFilterConditionGroup.registerClass("Mscrm.CustomFilterConditionGroup");
Mscrm.FilterNodeType.registerClass("Mscrm.FilterNodeType");
Mscrm.FilterOperatorType.registerClass("Mscrm.FilterOperatorType");
Mscrm.CustomFiltersBooleanOperatorType.registerClass("Mscrm.CustomFiltersBooleanOperatorType");
Mscrm.FilterUIGroupType.registerClass("Mscrm.FilterUIGroupType");
Mscrm.DateFilterGroup.registerClass("Mscrm.DateFilterGroup");
Mscrm.SaveViewParams.registerClass("Mscrm.SaveViewParams");
Mscrm.GridFilterUtil.registerClass("Mscrm.GridFilterUtil");
Mscrm.FilterPopup.registerClass("Mscrm.FilterPopup", Mscrm.CrmUIControl);
Mscrm.DateTimeFilterPopup.registerClass("Mscrm.DateTimeFilterPopup", Mscrm.FilterPopup);
Mscrm.FilterSet.registerClass("Mscrm.FilterSet", Mscrm.CrmUIControl, Mscrm.IFilterSet);
Mscrm.GridFilterCustomControl.registerClass("Mscrm.GridFilterCustomControl", Mscrm.CrmUIControl);
Mscrm.MultiSelectFilterPopup.registerClass("Mscrm.MultiSelectFilterPopup", Mscrm.FilterPopup);
Mscrm.LookupFilterPopup.registerClass("Mscrm.LookupFilterPopup", Mscrm.MultiSelectFilterPopup);
Mscrm.NumberFilterPopup.registerClass("Mscrm.NumberFilterPopup", Mscrm.FilterPopup);
Mscrm.PicklistFilterPopup.registerClass("Mscrm.PicklistFilterPopup", Mscrm.MultiSelectFilterPopup);
Mscrm.StringFilterPopup.registerClass("Mscrm.StringFilterPopup", Mscrm.FilterPopup);
Mscrm.FilterNodeType.and = 1;
Mscrm.FilterNodeType.invalid = 0;
Mscrm.FilterNodeType.or = 2;
Mscrm.FilterOperatorType.invalid = 0;
Mscrm.FilterOperatorType.unary = 1;
Mscrm.FilterOperatorType.binary = 2;
Mscrm.CustomFiltersBooleanOperatorType.AND = 1;
Mscrm.CustomFiltersBooleanOperatorType.OR = 2;
Mscrm.FilterUIGroupType.NULL = 1;
Mscrm.FilterUIGroupType.NOTNULL = 2;
Mscrm.FilterUIGroupType.CUSTOMFILTERS = 3;
Mscrm.FilterUIGroupType.DATEUNARY = 4;
Mscrm.FilterUIGroupType.MULTISELECTAREA = 5;
Mscrm.FilterUIGroupType.COMPLEX = 6;
Mscrm.FilterUIGroupType.CURRENTUSER = 7;
Mscrm.DateFilterGroup.INVALID = 0;
Mscrm.DateFilterGroup.DAYGROUP = 1;
Mscrm.DateFilterGroup.WEEKGROUP = 2;
Mscrm.DateFilterGroup.MONTHGROUP = 3;
Mscrm.DateFilterGroup.YEARGROUP = 4;
Mscrm.DateFilterGroup.FISCALPERIODGROUP = 5;
Mscrm.DateFilterGroup.FISCALYEARGROUP = 6;
Mscrm.GridFilterUtil.$1A = "autoCreated"