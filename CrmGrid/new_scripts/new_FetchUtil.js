var xrmValue = function (sType, sValue) {
    this.type = sType;
    this.value = sValue;
};

var xrmEntityReference = function (gId, sLogicalName, sName) {
    this.id = gId;
    this.logicalName = sLogicalName;
    this.name = sName;
    this.type = 'EntityReference';
};

var xrmEntityCollection = function (items) {
    this.value = items;
    this.type = 'EntityCollection';
};

var xrmOptionSetValue = function (iValue, sFormattedValue) {
    this.value = iValue;
    this.formattedValue = sFormattedValue;
    this.type = 'OptionSetValue';
};

var stringToDate = function (s) {
    var b = s.split(/\D/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
};

var orgServicePath = function () {
    ///<summary>
    /// Private function to return the path to the organization service.
    ///</summary>
    ///<returns>String</returns>
    //  return getClientUrl() + "/XRMServices/2011/Organization.svc/web";
    return 'http://mvs-crm-i-d2/MivtachSimon' + "/XRMServices/2011/Organization.svc/web";
};

var orgServiceParentPath = function () {
    ///<summary>
    /// Private function to return the path to the organization service.
    ///</summary>
    ///<returns>String</returns>
    //  return getClientUrl() + "/XRMServices/2011/Organization.svc/web";
    //return 'http://mvs-crm-i-d2/MivtachSimon' + "/XRMServices/2011/Organization.svc/web";
    return window.location.protocol + "//" + window.location.host + "/MivtachSimon/XRMServices/2011/Organization.svc/web";
};

var alertMessage = function (message) {
    (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
};

var htmlEncode = function (s) {
    if (s === null || s === "" || s === undefined) return s;
    for (var count = 0, buffer = "", hEncode = "", cnt = 0; cnt < s.length; cnt++) {
        var c = s.charCodeAt(cnt);
        if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
            buffer += String.fromCharCode(c);
        else buffer += "&#" + c + ";";
        if (++count === 500) {
            hEncode += buffer; buffer = ""; count = 0;
        }
    }
    if (buffer.length) hEncode += buffer;
    return hEncode;
};

var innerSurrogateAmpersandWorkaround = function (s) {
    var buffer = '';
    var c0;
    for (var cnt = 0; cnt < s.length; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            if (cnt + 1 < s.length) {
                var c1 = s.charCodeAt(cnt + 1);
                if (c1 >= 56320 && c1 <= 57343) {
                    buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++;
                }
                else
                    buffer += String.fromCharCode(c0);
            }
            else buffer += String.fromCharCode(c0);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    buffer = "";
    for (cnt = 0; cnt < s.length; cnt++) {
        c0 = s.charCodeAt(cnt);
        if (c0 >= 55296 && c0 <= 57343)
            buffer += String.fromCharCode(65533);
        else buffer += String.fromCharCode(c0);
    }
    s = buffer;
    s = htmlEncode(s);
    s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
    s = s.replace(/CRMEntityReferenceClose/g, ";");
    return s;
};

var crmXmlEncode = function (s) {
    // ReSharper restore UnusedLocals
    // ReSharper disable UsageOfPossiblyUnassignedValue
    // ReSharper disable ExpressionIsAlwaysConst
    if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s;
        // ReSharper restore ExpressionIsAlwaysConst
        // ReSharper restore UsageOfPossiblyUnassignedValue
    else if (typeof s != "string") s = s.toString();
    return innerSurrogateAmpersandWorkaround(s);
};

// ReSharper disable UnusedLocals
var crmXmlDecode = function (s) {
    // ReSharper restore UnusedLocals
    if (typeof s != "string") s = s.toString();
    return s;
};

var getXhr = function () {
    ///<summary>
    /// Get an instance of XMLHttpRequest for all browsers
    ///</summary>
    if (XMLHttpRequest) {
        // Chrome, Firefox, IE7+, Opera, Safari
        // ReSharper disable InconsistentNaming
        return new XMLHttpRequest();
        // ReSharper restore InconsistentNaming
    }
    // IE6
    try {
        // The latest stable version. It has the best security, performance,
        // reliability, and W3C conformance. Ships with Vista, and available
        // with other OS's via downloads and updates.
        return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    } catch (e) {
        try {
            // The fallback.
            return new ActiveXObject('MSXML2.XMLHTTP.3.0');
        } catch (e) {
            alertMessage('This browser is not AJAX enabled.');
            return null;
        }
    }
};

var doRequest = function (soapBody, requestType, async, internalCallback) {

    async = async || false;
    var soapXml =
    ["<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>",
        "<soap:Body>",
            "<", requestType, " xmlns='http://schemas.microsoft.com/xrm/2011/Contracts/Services' xmlns:i='http://www.w3.org/2001/XMLSchema-instance'>", soapBody, "</", requestType, ">",
        "</soap:Body>",
        "</soap:Envelope>"
    ].join("");

    var req = getXhr();
    var url = orgServiceParentPath();

    req.open("POST", url, async);
    req.setRequestHeader("Accept", "application/xml, text/xml, */*");
    req.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    req.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/" + requestType);

    req.send(soapXml);

    if (async) {
        req.onreadystatechange = function () {
            if (req.readyState === 4) { // "complete"
                req.onreadystatechange = null; //Addresses potential memory leak issue with IE
                if (req.status === 200) { // "OK"
                    internalCallback(processResponse(req.responseXML, req.responseText));
                }
                else {
                    processResponse(req.responseXML, req.responseText);
                }
            }
        };
    }
    else {
        var result = processResponse(req.responseXML, req.responseText);
        return !!internalCallback ? internalCallback(result) : result;
    }
    // ReSharper disable NotAllPathsReturnValue
};

var businessEntity = function (logicalName, id) {
    ///<summary>
    /// A object represents a business entity for CRM 2011.
    ///</summary>
    ///<param name="logicalName" type="String">
    /// A String represents the name of the entity.
    /// For example, "contact" means the business entity will be a contact entity
    /// </param>
    ///<param name="id" type="String">
    /// A String represents the id of the entity. If not passed, it will be auto populated as a empty guid string
    /// </param>
    this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
    this.logicalName = logicalName;
    this.attributes = new Object();
};

businessEntity.prototype = {
    /**
    * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
    * @return {String} The serialized XML string of CRM entity.
    */
    serialize: function () {
        var xml = ['<entity xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">'];
        xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');

        for (var attributeName in this.attributes) {
            var attribute = this.attributes[attributeName];

            xml.push('<a:KeyValuePairOfstringanyType>');
            xml.push('<b:key>', attributeName, '</b:key>');

            if (attribute === null || attribute.value === null) {
                xml.push('<b:value i:nil="true" />');
            }
            else {
                var sType = (!attribute.type)
                        ? typeof attribute
                        : crmXmlEncode(attribute.type);
                var value;
                var encodedValue;
                var id;
                var encodedId;
                var logicalName;
                var encodedLogicalName;
                switch (sType) {
                    case "OptionSetValue":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push('<b:value i:type="a:OptionSetValue">');
                        xml.push('<a:Value>', encodedValue, '</a:Value>', '</b:value>');
                        break;

                    case "EntityCollection":
                        xml.push('<b:value i:type="a:EntityCollection">');
                        xml.push('<a:Entities>');
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        var collections = isArray(value) ? value : [value];

                        for (var i = 0; i < collections.length; i++) {
                            var item = collections[i];
                            id = (item.hasOwnProperty("id")) ? item["id"] : item;
                            encodedId = encodeValue(id);
                            logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                            encodedLogicalName = encodeValue(logicalName);
                            xml.push('<a:Entity>');
                            xml.push('<a:Attributes>');
                            xml.push('<a:KeyValuePairOfstringanyType>');
                            xml.push('<b:key>partyid</b:key>');
                            xml.push('<b:value i:type="a:EntityReference">');
                            xml.push('<a:Id>', encodedId, '</a:Id>');
                            xml.push('<a:LogicalName>', encodedLogicalName, '</a:LogicalName>');
                            xml.push('<a:Name i:nil="true" />');
                            xml.push('</b:value>');
                            xml.push('</a:KeyValuePairOfstringanyType>');
                            xml.push('</a:Attributes>');
                            xml.push('<a:EntityState i:nil="true" />');
                            xml.push('<a:FormattedValues />');
                            xml.push('<a:Id>00000000-0000-0000-0000-000000000000</a:Id>');
                            xml.push('<a:LogicalName>activityparty</a:LogicalName>');
                            xml.push('<a:RelatedEntities />');
                            xml.push('</a:Entity>');
                        }
                        xml.push('</a:Entities>');
                        xml.push('<a:EntityName i:nil="true" />');
                        xml.push('<a:MinActiveRowVersion i:nil="true" />');
                        xml.push('<a:MoreRecords>false</a:MoreRecords>');
                        xml.push('<a:PagingCookie i:nil="true" />');
                        xml.push('<a:TotalRecordCount>0</a:TotalRecordCount>');
                        xml.push('<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>');
                        xml.push('</b:value>');
                        break;

                    case "EntityReference":
                        id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                        encodedId = encodeValue(id);
                        logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                        encodedLogicalName = encodeValue(logicalName);
                        xml.push('<b:value i:type="a:EntityReference">');
                        xml.push('<a:Id>', encodedId, '</a:Id>');
                        xml.push('<a:LogicalName>', encodedLogicalName, '</a:LogicalName>');
                        xml.push('<a:Name i:nil="true" />', '</b:value>');
                        break;

                    case "Money":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push('<b:value i:type="a:Money">');
                        xml.push('<a:Value>', encodedValue, '</a:Value>', '</b:value>');
                        break;

                    case "guid":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        xml.push('<b:value i:type="c:guid" xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/">');
                        xml.push(encodedValue, '</b:value>');
                        break;

                    case "number":
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        var oType = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:decimal";
                        xml.push('<b:value i:type="', oType, '" xmlns:c="http://www.w3.org/2001/XMLSchema">');
                        xml.push(encodedValue, '</b:value>');
                        break;

                    default:
                        value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                        encodedValue = encodeValue(value);
                        sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                        xml.push('<b:value i:type="c:', sType, '" xmlns:c="http://www.w3.org/2001/XMLSchema">', encodedValue, '</b:value>');
                        break;
                }
            }
            xml.push('</a:KeyValuePairOfstringanyType>');
        }

        xml.push('</a:Attributes><a:EntityState i:nil="true" />');
        xml.push('<a:FormattedValues xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />');
        xml.push('<a:Id>', encodeValue(this.id), '</a:Id>');
        xml.push('<a:LogicalName>', this.logicalName, '</a:LogicalName>');
        xml.push('<a:RelatedEntities xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic" />');
        xml.push('</entity>');
        return xml.join("");
    },

    /**
    * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
    * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
    */
    deserialize: function (resultNode) {
        var obj = new Object();
        var resultNodes = resultNode.childNodes;

        for (var j = 0; j < resultNodes.length; j++) {
            var k;
            var sKey;
            switch (resultNodes[j].nodeName) {
                case "a:Attributes":
                    var attr = resultNodes[j];
                    for (k = 0; k < attr.childNodes.length; k++) {

                        // Establish the Key for the Attribute
                        sKey = jQuery(attr.childNodes[k].firstChild).text();
                        var sType = '';

                        // Determine the Type of Attribute value we should expect
                        for (var l = 0; l < attr.childNodes[k].childNodes[1].attributes.length; l++) {
                            if (attr.childNodes[k].childNodes[1].attributes[l].nodeName === 'i:type') {
                                sType = jQuery(attr.childNodes[k].childNodes[1].attributes[l]).val();
                            }
                        }
                        var entRef;
                        var entCv;
                        switch (sType) {
                            case "a:OptionSetValue":
                                var entOsv = new xrmOptionSetValue();
                                entOsv.type = sType.replace('a:', '');
                                entOsv.value = parseInt(jQuery(attr.childNodes[k].childNodes[1]).text());
                                obj[sKey] = entOsv;
                                break;

                            case "a:EntityReference":
                                entRef = new xrmEntityReference();
                                entRef.type = sType.replace('a:', '');
                                entRef.id = jQuery(attr.childNodes[k].childNodes[1].childNodes[0]).text();
                                entRef.logicalName = jQuery(attr.childNodes[k].childNodes[1].childNodes[1]).text();
                                entRef.name = jQuery(attr.childNodes[k].childNodes[1].childNodes[2]).text();
                                obj[sKey] = entRef;
                                break;

                            case "a:EntityCollection":
                                entRef = new xrmEntityCollection();
                                entRef.type = sType.replace('a:', '');

                                //get all party items....
                                var items = [];
                                for (var y = 0; y < attr.childNodes[k].childNodes[1].childNodes[0].childNodes.length; y++) {
                                    var itemNodes = attr.childNodes[k].childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                    for (var z = 0; z < itemNodes.length; z++) {
                                        if (jQuery(itemNodes[z].childNodes[0]).text() === "partyid") {
                                            var itemRef = new xrmEntityReference();
                                            itemRef.id = jQuery(itemNodes[z].childNodes[1].childNodes[0]).text();
                                            itemRef.logicalName = jQuery(itemNodes[z].childNodes[1].childNodes[1]).text();
                                            itemRef.name = jQuery(itemNodes[z].childNodes[1].childNodes[2]).text();
                                            items[y] = itemRef;
                                        }
                                    }
                                }
                                entRef.value = items;
                                obj[sKey] = entRef;
                                break;

                            case "a:Money":
                                entCv = new xrmValue();
                                entCv.type = sType.replace('a:', '');
                                entCv.value = parseFloat(jQuery(attr.childNodes[k].childNodes[1]).text());
                                obj[sKey] = entCv;
                                break;

                            default:
                                entCv = new xrmValue();
                                entCv.type = sType.replace('c:', '').replace('a:', '');
                                if (entCv.type === "int") {
                                    entCv.value = parseInt(jQuery(attr.childNodes[k].childNodes[1]).text());
                                }
                                else if (entCv.type === "decimal" || entCv.type === "double") {
                                    entCv.value = parseFloat(jQuery(attr.childNodes[k].childNodes[1]).text());
                                }
                                else if (entCv.type === "dateTime") {
                                    entCv.value = stringToDate(jQuery(attr.childNodes[k].childNodes[1]).text());
                                }
                                else if (entCv.type === "boolean") {
                                    entCv.value = (jQuery(attr.childNodes[k].childNodes[1]).text() === 'false') ? false : true;
                                }
                                    //@Credit: Thanks for Tanguy92's code from CodePlex
                                else if (entCv.type === "AliasedValue") {
                                    entCv.value = jQuery(attr).children().eq(k).children().eq(1).children().eq(2).text();
                                    if (jQuery(attr).children().eq(k).children().eq(1).children().eq(2).attr("i:type") === "a:EntityReference") {
                                        entCv = new xrmEntityReference();
                                        entCv.type = "EntityReference";
                                        entCv.id = jQuery(attr).children().eq(k).children().eq(1).children().eq(2).children().eq(0).text();
                                        entCv.logicalName = jQuery(attr).children().eq(k).children().eq(1).children().eq(2).children().eq(1).text();
                                        entCv.name = jQuery(attr).children().eq(k).children().eq(1).children().eq(2).children().eq(2).text();
                                    }
                                }
                                else {
                                    entCv.value = jQuery(attr.childNodes[k].childNodes[1]).text();
                                }
                                obj[sKey] = entCv;
                                break;
                        }
                    }
                    this.attributes = obj;
                    break;

                case "a:Id":
                    this.id = jQuery(resultNodes[j]).text();
                    break;

                case "a:LogicalName":
                    this.logicalName = jQuery(resultNodes[j]).text();
                    break;

                case "a:FormattedValues":
                    var foVal = resultNodes[j];

                    for (k = 0; k < foVal.childNodes.length; k++) {
                        // Establish the Key, we are going to fill in the formatted value of the already found attribute
                        sKey = jQuery(foVal.childNodes[k].firstChild).text();
                        this.attributes[sKey].formattedValue = jQuery(foVal.childNodes[k].childNodes[1]).text();
                        if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
                            this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
                        }
                    }
                    break;
            }
        }
    }
};

var xmlParser = function (txt) {
    ///<summary>
    /// cross browser responseXml to return a XML object
    ///</summary>
    var xmlDoc = null;
    try {
        // code for Mozilla, Firefox, Opera, etc.
        if (window.DOMParser) {
            // ReSharper disable InconsistentNaming
            var parser = new DOMParser();
            // ReSharper restore InconsistentNaming
            xmlDoc = parser.parseFromString(txt, "text/xml");
        }
        else // Internet Explorer
        {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        }
    } catch (e) {
        alertMessage("Cannot convert the XML string to a cross-browser XML object.");
    }

    return xmlDoc;
};

var xmlToString = function (responseXml) {
    var xmlString = '';
    try {
        if (responseXml != null) {
            if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
                // ReSharper disable InconsistentNaming
                xmlString = (new XMLSerializer()).serializeToString(responseXml[0]);
                // ReSharper restore InconsistentNaming
            } else {
                if (typeof responseXml.xml !== "undefined") {
                    xmlString = responseXml.xml;
                }
                else if (typeof responseXml[0].xml !== "undefined") {
                    xmlString = responseXml[0].xml;
                }

            }
        }
    } catch (e) {
        alertMessage("Cannot convert the XML to a string.");
    }
    return xmlString;
};

var processResponse = function (responseXml, responseText) {
    var error;
    var faultString;
    var xmlDoc;
    if (responseXml === null || typeof responseXml === 'undefined' || responseXml.xml === null || responseXml.xml === "") {
        if (responseText !== null && responseText !== "") {
            throw new Error(responseText);
        }
        else
            throw new Error("No response received from the server. ");
    }

    // Report the error if occurred
    // Load responseXML and return as an XML object
    if (typeof responseXml.xml === 'undefined') {
        error = jQuery(responseText).find("error").text();
        faultString = jQuery(responseText).find("faultstring").text();
        if (error != '' || faultString != '') {
            throw new Error(error !== '' ? jQuery(responseText).find('description').text() : faultString);
        }

        xmlDoc = xmlParser(responseText);
    } else {
        error = jQuery(responseXml).find("error").text();
        faultString = jQuery(responseXml).find("faultstring").text();
        if (error != "" || faultString != "") {
            throw new Error(error != "" ? jQuery(responseXml).find('description').text() : faultString);
        }

        xmlDoc = xmlParser(xmlToString(responseXml));
    }

    return xmlDoc;
};

var myFetch = function (fetchXml) {
    debugger;
    var msgBody = "<query i:type='a:FetchExpression' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>" +
                        "<a:Query>" +
                            crmXmlEncode(fetchXml) +
                        "</a:Query>" +
                    "</query>";
    var async = false;

    return doRequest(msgBody, "RetrieveMultiple", async, function (resultXml) {
        var fetchResult;
        var moreRecords;
        if (jQuery(resultXml).find("a\\:Entities").length != 0) {
            fetchResult = jQuery(resultXml).find("a\\:Entities").eq(0)[0];
        } else {
            fetchResult = jQuery(resultXml).find("Entities").eq(0)[0]; //chrome could not load node
        }

        var fetchResults = [];

        for (var ii = 0; ii < fetchResult.childNodes.length; ii++) {
            var entity = new businessEntity();

            entity.deserialize(fetchResult.childNodes[ii]);
            fetchResults.push(entity);
        }
        return fetchResults;

        // ReSharper disable NotAllPathsReturnValue
    });
    // ReSharper restore NotAllPathsReturnValue
}

function FetchUtil() {

}

FetchUtil.prototype.Excute = function (sFetchXml) {
    var result = myFetch(sFetchXml);
    return result;
}


