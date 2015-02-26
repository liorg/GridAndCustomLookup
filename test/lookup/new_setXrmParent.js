function setParentXrm(k, s) {
    if (window.parent != null) {
        //debugger;
        if (!isCrm) {
            window.parent.document.getElementById(k).value = s;  // for moqing 
        }
        else {
            window.parent.Xrm.Page.data.entity.attributes.get(k).setValue(s); // for crm
        }
    }
}
function getParentXrm(k, t) {
    //debugger
    if (window.parent != null) {
        //debugger;
        if (!isCrm) {
            if (window.parent.document.getElementById(k) != null)
                return window.parent.document.getElementById(k).value;  // for moqing 
            return "";
        }
        else {
            var f = window.parent.Xrm.Page.data.entity.attributes.get(k); // for crm
            if (t == "lu") 
                return f != null && f.getValue() != null && f.getValue()[0] != null ? f.getValue()[0].id : "";
            return f != null && f.getValue() != null ? f.getValue() : "";
        }
    }
}
function callConfig(callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', configUri, false);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
               // var data = JSON.parse(xmlhttp.responseText);
                data = eval("(" + xmlhttp.responseText + ")");
                 callback(data);
            }
        }
    }
    xmlhttp.send();
}
