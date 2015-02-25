function setParentXrm(k, s) {
    if (window.parent != null) {
        debugger;
        if (!isCrm) {
            window.parent.document.getElementById(k).value = s;  // for moqing 
        }
        else {
            window.parent.Xrm.Page.data.entity.attributes.get(k).setValue(s); // for crm
        }
    }
}

function getParentXrm(k, t) {
    debugger
    if (window.parent != null) {
        debugger;
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
    if (isCrm)
        callConfigJson(callback);
    else
        callConfigAjax(callback);
}

// for crm
function callConfigJson(callback) {
    $.getJSON(configUri, function (data) {
        callback(data);
    });
}
// for mock
function callConfigAjax(callback) {
    $.ajax({ url: configUri }).done(function (data) {
        data = eval("(" + data + ")");
        callback(data);
    });



}

