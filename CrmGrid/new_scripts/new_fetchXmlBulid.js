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
        return this.xmldoc.xml;
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
        var entity = this.xmldoc.selectSingleNode("//entity");
        return entity.attributes.getNamedItem("name").value;
    }
    var parseConditions = function (id, filters) {
        // debugger;
        var conditions = this.xmldoc.selectNodes("//condition");
        for (var i = 0; i < conditions.length; i++) {
            var condition = conditions[i];
            var value = condition.attributes.getNamedItem("value");
            if (value != null) {
                if (value.value == "{id}")
                    value.value = id; // value.value = "'" + id + "'";
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
        // debugger;
        var orders = this.xmldoc.selectNodes("//order");
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            var parentNode = order.parentNode;
            parentNode.removeChild(order);
        }
        if (ordername.indexOf(".") > 0) {
            var aliasAndName = ordername.split(".");
            var linkentities = this.xmldoc.selectNodes("//link-entity");
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
            var entity = this.xmldoc.selectSingleNode("//entity");
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
        var fetch = this.xmldoc.selectSingleNode("//fetch");
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
        //debugger;
        var xml = this.xmldoc.xml;
        var buldXmlCounter = getXmlDoc(xml);
        var fetch = buldXmlCounter.selectSingleNode("//fetch");
        var count = fetch.attributes.getNamedItem("count");
       // var distinct = fetch.attributes.getNamedItem("distinct");
        var page = fetch.attributes.getNamedItem("page");
        var aggregate = fetch.attributes.getNamedItem("aggregate");

//        if (distinct != null) distinct.value = "false";
//        else fetch.setAttribute("distinct", "false");

        if (aggregate != null) aggregate.value = "true";
        else fetch.setAttribute("aggregate", "true");

        if (count != null) fetch.removeAttribute('count');
        if (page != null) fetch.removeAttribute('page');

        //remove orders
        var orders = buldXmlCounter.selectNodes("//order");
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            var parentNode = order.parentNode;
            parentNode.removeChild(order);
        }

        //remove attributes
        var attributes = buldXmlCounter.selectNodes("//attribute");
        for (var i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            var parentNode = attr.parentNode;
            parentNode.removeChild(attr);
        }

        var entity = buldXmlCounter.selectSingleNode("//entity");
        var name = entity.attributes.getNamedItem("name").value;
        var fieldAggr = aggrName == "" ? name + "id" : aggrName;
        var attrCounter = buldXmlCounter.createElement("attribute");
        attrCounter.setAttribute("name", fieldAggr);
        attrCounter.setAttribute("aggregate", "count");
        attrCounter.setAttribute("alias", "c");

        entity.appendChild(attrCounter);
        return buldXmlCounter.xml;
    }


    var getXmlDoc = function (xml) {
        if (window.DOMParser) {
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

