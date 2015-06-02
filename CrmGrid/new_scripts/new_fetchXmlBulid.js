function fetchXmlBulid() {
    this.GetAggregate = function (xml) {
        var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.loadXML(xml);


    }
}