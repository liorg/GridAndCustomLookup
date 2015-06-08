var XMLHTTPSUCCESS = 200;
var XMLHTTPREADY = 4;
function FetchUtil(sOrg, sServer) {
    this.org = sOrg;
    this.server = sServer;
    if (sOrg == null) {
        if (typeof (ORG_UNIQUE_NAME) != "undefined") {
            this.org = ORG_UNIQUE_NAME;
        }
    }
    if (sServer == null) {
        this.server = window.location.protocol + "//" + window.location.host;
    }
}
FetchUtil.prototype._ExecuteRequest = function (sXml, sMessage, fInternalCallback, fUserCallback) {
//debugger;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", this.server + "/XRMServices/2011/Organization.svc/web", (fUserCallback != null));
    xmlhttp.setRequestHeader("Accept", "application/xml, text/xml, */*");
    xmlhttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
    xmlhttp.setRequestHeader("SOAPAction", "http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
    if (fUserCallback != null) {
        //asynchronous: register callback function, then send the request.
        var crmServiceObject = this;
        xmlhttp.onreadystatechange = function () {
            fInternalCallback.call(crmServiceObject, xmlhttp, fUserCallback)
        };
        xmlhttp.send(sXml);
    } else {
        //synchronous: send request, then call the callback function directly
        xmlhttp.send(sXml);
        return fInternalCallback.call(this, xmlhttp, null);
    }
}
FetchUtil.prototype._HandleErrors = function (xmlhttp) {
    /// <summary>(private) Handles xmlhttp errors</summary>
    if (xmlhttp.status != XMLHTTPSUCCESS) {
        var sError = "Error: " + xmlhttp.responseText + " " + xmlhttp.statusText;
        alert(sError);
        return true;
    } else {
        return false;
    }
}
FetchUtil.prototype.Fetch = function (sFetchXml, fCallback) {
    /// <summary>Execute a FetchXml request. (result is the response XML)</summary>
    /// <param name="sFetchXml">fetchxml string</param>
    /// <param name="fCallback" optional="true" type="function">(Optional) Async callback function if specified. If left null, function is synchronous </param>
    var request = "<s:Envelope xmlns:s=\"http://schemas.xmlsoap.org/soap/envelope/\">";
    request += "<s:Body>";
    request += '<Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">' + '<request i:type="b:RetrieveMultipleRequest" ' + ' xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" ' + ' xmlns:i="http://www.w3.org/2001/XMLSchema-instance">' + '<b:Parameters xmlns:c="http://schemas.datacontract.org/2004/07/System.Collections.Generic">' + '<b:KeyValuePairOfstringanyType>' + '<c:key>Query</c:key>' + '<c:value i:type="b:FetchExpression">' + '<b:Query>';
    request += CrmEncodeDecode.CrmXmlEncode(sFetchXml);
    request += '</b:Query>' + '</c:value>' + '</b:KeyValuePairOfstringanyType>' + '</b:Parameters>' + '<b:RequestId i:nil="true"/>' + '<b:RequestName>RetrieveMultiple</b:RequestName>' + '</request>' + '</Execute>';
    request += '</s:Body></s:Envelope>';
    return this._ExecuteRequest(request, "Fetch", this._FetchCallback, fCallback);
}
FetchUtil.prototype._FetchCallback = function (xmlhttp, callback) {
    ///<summary>(private) Fetch message callback.</summary>
    //xmlhttp must be completed
    if (xmlhttp.readyState != XMLHTTPREADY) {
        return;
    }
    //check for server errors
    if (this._HandleErrors(xmlhttp)) {
        return;
    }
    var sFetchResult = xmlhttp.responseXML.selectSingleNode("//a:Entities").xml;
    var resultDoc = new ActiveXObject("Microsoft.XMLDOM");
    resultDoc.async = false;
    resultDoc.loadXML(sFetchResult);
    //parse result xml into array of jsDynamicEntity objects
    var results = new Array(resultDoc.firstChild.childNodes.length);
    for (var i = 0; i < resultDoc.firstChild.childNodes.length; i++) {
        var oResultNode = resultDoc.firstChild.childNodes[i];
        var jDE = new jsDynamicEntity();
        var obj = new Object();
        for (var j = 0; j < oResultNode.childNodes.length; j++) {
            switch (oResultNode.childNodes[j].baseName) {
                case "Attributes":
                    var attr = oResultNode.childNodes[j];
                    for (var k = 0; k < attr.childNodes.length; k++) {
                        // Establish the Key for the Attribute
                        var sKey = attr.childNodes[k].firstChild.text;
                        var sType = '';
                        // Determine the Type of Attribute value we should expect
                        for (var l = 0; l < attr.childNodes[k].childNodes[1].attributes.length; l++) {
                            if (attr.childNodes[k].childNodes[1].attributes[l].baseName == 'type') {
                                sType = attr.childNodes[k].childNodes[1].attributes[l].text;
                            }
                        }
                        switch (sType) {
                            case "a:OptionSetValue":
                                var entOSV = new jsOptionSetValue();
                                entOSV.type = sType;
                                entOSV.value = attr.childNodes[k].childNodes[1].text;
                                obj[sKey] = entOSV;
                                break;
                            case "a:EntityReference":
                                var entRef = new jsEntityReference();
                                entRef.type = sType;
                                entRef.guid = attr.childNodes[k].childNodes[1].childNodes[0].text;
                                entRef.logicalName = attr.childNodes[k].childNodes[1].childNodes[1].text;
                                entRef.name = attr.childNodes[k].childNodes[1].childNodes[2].text;
                                obj[sKey] = entRef;
                                break;
                            case "a:AliasedValue": //l.g fixed
                               // debugger;
                                var entCVA = new jsCrmValue();
                                entCVA.type = sType;
                                entCVA.value = attr.childNodes[k].childNodes[1].childNodes[2].text;
                                obj[sKey] = entCVA;
                                break;
                            default:
                                var entCV = new jsCrmValue();
                                entCV.type = sType;
                                entCV.value = attr.childNodes[k].childNodes[1].text;
                                obj[sKey] = entCV;
                                break;
                        }
                    }
                    jDE.attributes = obj;
                    break;
                case "Id":
                    jDE.guid = oResultNode.childNodes[j].text;
                    break;
                case "LogicalName":
                    jDE.logicalName = oResultNode.childNodes[j].text;
                    break;
                case "FormattedValues":
                    var foVal = oResultNode.childNodes[j];
                    for (var k = 0; k < foVal.childNodes.length; k++) {
                        // Establish the Key, we are going to fill in the formatted value of the already found attribute
                        var sKey = foVal.childNodes[k].firstChild.text;
                        jDE.attributes[sKey].formattedValue = foVal.childNodes[k].childNodes[1].text;
                    }
                    break;
            }
        }
        results[i] = jDE;
    }
    //return entities
    if (callback != null) callback(results);
    else return results;
}

function jsDynamicEntity(gID, sLogicalName) {
    this.guid = gID;
    this.logicalName = sLogicalName;
    this.attributes = new Object();
}
function jsCrmValue(sType, sValue) {
    this.type = sType;
    this.value = sValue;
}
function jsEntityReference(gID, sLogicalName, sName) {
    this.guid = gID;
    this.logicalName = sLogicalName;
    this.name = sName;
    this.type = 'EntityReference';
}
function jsOptionSetValue(iValue, sFormattedValue) {
    this.value = iValue;
    this.formattedValue = sFormattedValue;
    this.type = 'OptionSetValue';
}
/*
showMainPhone.js
var _oService;
var _sOrgName = "";
var _sServerUrl = Xrm.Page.context.getServerUrl();
function fetchOnLoad() {
    // Get the ID of the Customer
    var sCustGUID = Xrm.Page.getAttribute(' customerid ').getValue()[0].id;
    var sFetch = "<fetch mapping='logical' count='10'>" +
"<entity name='account'>" +
"<attribute name='telephone1' />" +
"<filter type='and'>" +
"<condition attribute = 'accountid' operator='eq' value='" + sCustGUID + "'/>" +
"</filter>" +
"</entity>" +
"</fetch>";
    _oService = new FetchUtil(_sOrgName, _sServerUrl);
    _oService.Fetch(sFetch, myCallBack);
}
function myCallBack(results) {
    alert(results[0].attributes["telephone1"].value);
}
*/