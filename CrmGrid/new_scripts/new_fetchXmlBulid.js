var ParserFetchXml = (function () {
    // Constructor
    function ParserFetchXml(xml) {
        //this._xml = xml;
        this.xmldoc = getXmlDoc(xml);
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
                    value.value = id ; // value.value = "'" + id + "'";
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

