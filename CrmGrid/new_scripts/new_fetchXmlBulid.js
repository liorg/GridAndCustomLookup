var ParserFetchXml = (function () {
    // Constructor
    function ParserFetchXml(xml) {
        //this._xml = xml;
        this.xmldoc = getXmlDoc(xml);
    }

    ParserFetchXml.prototype.GetCountFetch = function (aggrName) {
        return getCountXml.call(this, aggrName);
    }

    ParserFetchXml.prototype.Conditions = function (id, filters) {
        return parseConditions.call(this, id, filters);
    }

    ParserFetchXml.prototype.Xml = function () {
        var xml = this.xmldoc.xml;
        if (xml == null)
            xml = this.xmldoc.documentElement.outerHTML;
        return xml;
    }

    ParserFetchXml.prototype.Order = function (orderName, descending) {
        return parseOrder.call(this, orderName, descending);
    }

    ParserFetchXml.prototype.GetEntity = function () {
        //const string FormatCrmOpenWin = "http://{0}/{1}/main.aspx?etn={2}&pagetype=entityrecord&id=%7b{3}%7d";
        return getEntity.call(this);
    }

    ParserFetchXml.prototype.Paging = function (page, countPrePage) {
        //const string FormatCrmOpenWin = "http://{0}/{1}/main.aspx?etn={2}&pagetype=entityrecord&id=%7b{3}%7d";
        return setPaging.call(this, page, countPrePage);
    }

    getEntity = function () {
        var isIe = navigator.appName == 'Microsoft Internet Explorer';
        var entity = null;
        if (isIe)
            entity = this.xmldoc.selectSingleNode("//entity");
        else
            entity = this.xmldoc.getElementsByTagName("entity")[0];

        return entity.attributes.getNamedItem("name").value;
    }

    var parseConditions = function (id, filters) {
        var isIe = navigator.appName == 'Microsoft Internet Explorer';
        var conditions = null;
        if (isIe)
            conditions = this.xmldoc.selectNodes("//condition");
        else
            conditions = this.xmldoc.getElementsByTagName("condition");

        for (var i = 0; i < conditions.length; i++) {
            var condition = conditions[i];
            var value = condition.attributes.getNamedItem("value");
            if (value != null) {
                if (value.value == "{id}") {
                    var temp = window.parent.Xrm.Page.data.entity.getId();
                    value.value = (temp == null ? "" : temp); //id; // value.value = "'" + id + "'";
                }
                else {
                    for (var j = 0; j < filters.length; j++) {
                        if (value.value == "{" + filters[j].key.toLowerCase() + "}")
                            // value.value = "'" + filters[j].val + "'";
                            value.value = filters[j].val;
                    }
                }
            }
        }
    }

    var parseOrder = function (ordername, descending) {
        var isIe = navigator.appName == 'Microsoft Internet Explorer';
        if (isIe) {
            var orders = this.xmldoc.selectNodes("//order");
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var parentNode = order.parentNode;
                parentNode.removeChild(order);
            }
        }
        else {
            var orders = this.xmldoc.getElementsByTagName("order");
            for (var J = orders.length - 1; J >= 0; J--) //-- Kill the last, first, to avoid orphan problems.
            {
                var node = orders[J];
                if (node) {
                    node.parentNode.removeChild(node);
                }
            }
        }
        var linkentities;
        if (ordername.indexOf(".") > 0) {
            var aliasAndName = ordername.split(".");
            if (isIe)
                linkentities = this.xmldoc.selectNodes("//link-entity");
            else
                linkentities = this.xmldoc.getElementsByTagName("link-entity");

            for (var l = 0; l < linkentities.length; l++) {
                var linkentity = linkentities[l]
                var alias = linkentity.attributes.getNamedItem("alias");
                if (alias != null && alias.value == aliasAndName[0]) {
                    setOrder(linkentity, aliasAndName[1], descending);
                    break;
                }
            }
        }
        else {
            var entity = null;
            if (isIe)
                entity = this.xmldoc.selectSingleNode("//entity");
            else
                entity = this.xmldoc.getElementsByTagName("entity")[0];

            setOrder(entity, ordername, descending);
        }
    }

    var setOrder = function (parentnode, ordername, descending) {
        var order = this.xmlDoc.createElement("order");
        order.setAttribute("attribute", ordername);
        order.setAttribute("descending", descending);
        parentnode.appendChild(order);
    }

    var setPaging = function (currentPage, countPrePage) {
        var isIe = navigator.appName == 'Microsoft Internet Explorer';
        var fetch = null;
        if (isIe)
            fetch = this.xmldoc.selectSingleNode("//fetch");
        else
            fetch = this.xmldoc.getElementsByTagName("fetch")[0];

        var count = fetch.attributes.getNamedItem("count");
        //var distinct = fetch.attributes.getNamedItem("distinct");
        var page = fetch.attributes.getNamedItem("page");

        //        if (distinct != null) distinct.value = "true";
        //        else fetch.setAttribute("distinct", "true");

        if (count != null) count.value = countPrePage;
        else fetch.setAttribute("count", countPrePage);



        if (page != null) page.value = countPrePage;
        else fetch.setAttribute("page", currentPage);
    }

    var getCountXml = function (aggrName) {
        debugger;
        var isIe = navigator.appName == 'Microsoft Internet Explorer';

        var xml = this.xmldoc.xml;
        if (xml == null)
            xml = this.xmldoc.documentElement.outerHTML;

        var buldXmlCounter = getXmlDoc(xml);
        var fetch = null;
        if (isIe)
            fetch = buldXmlCounter.selectSingleNode("//fetch");
        else
            fetch = buldXmlCounter.getElementsByTagName("fetch")[0];

        var count = fetch.attributes.getNamedItem("count");
        var page = fetch.attributes.getNamedItem("page");
        var aggregate = fetch.attributes.getNamedItem("aggregate");

        if (aggregate != null) aggregate.value = "true";
        else fetch.setAttribute("aggregate", "true");

        if (count != null) fetch.removeAttribute('count');
        if (page != null) fetch.removeAttribute('page');

        //remove orders
        if (isIe) {
            var orders = buldXmlCounter.selectNodes("//order");
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var parentNode = order.parentNode;
                parentNode.removeChild(order);
            }
        }
        else {
            var orders = buldXmlCounter.getElementsByTagName("order");
            for (var J = orders.length - 1; J >= 0; J--) //-- Kill the last, first, to avoid orphan problems.
            {
                var node = orders[J];
                if (node) {
                    node.parentNode.removeChild(node);
                }
            }
        }

        var entity = null;
        if (isIe)
            entity = buldXmlCounter.selectSingleNode("//entity");
        else
            entity = buldXmlCounter.getElementsByTagName("entity")[0];

        //remove attributes
        if (isIe) {
            var attributes = buldXmlCounter.selectNodes("//attribute");
            for (var i = 0; i < attributes.length; i++) {
                var attr = attributes[i];
                var parentNode = attr.parentNode;
                parentNode.removeChild(attr);
            }
        }
        else {
            var attributes = buldXmlCounter.getElementsByTagName('attribute');
            for (var J = attributes.length - 1; J >= 0; J--) //-- Kill the last, first, to avoid orphan problems.
            {
                var node = attributes[J];
                if (node) {
                    node.parentNode.removeChild(node);
                }
            }
        }

        var name = entity.attributes.getNamedItem("name").value;
        var fieldAggr = aggrName == null || aggrName == "" ? name + "id" : aggrName;
        var attrCounter = buldXmlCounter.createElement("attribute");
        attrCounter.setAttribute("name", fieldAggr);
        attrCounter.setAttribute("aggregate", "count");
        attrCounter.setAttribute("alias", "c");

        entity.appendChild(attrCounter);
        return buldXmlCounter.xml != null ? buldXmlCounter.xml : buldXmlCounter.documentElement.outerHTML;
        //return buldXmlCounter.xml;
    }

    var getXmlDoc = function (xml) {
        if (window.DOMParser && navigator.appName != 'Microsoft Internet Explorer') {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(xml, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(xml);
        }
        return xmlDoc;
    }

    return ParserFetchXml;
})();

