//
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        getDataParam();
    }
}

var _qparams = [];

function getDataParam() {
    //
    //Get the any query string parameters and load them
    //into the vals array
    var vals = new Array();
    if (location.search != "") {
        vals = location.search.substr(1).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }
        //look for the parameter named 'data'
        var found = false;
        for (var i in vals) {
            if (vals[i][0].toLowerCase() == "data") {
                setDataValue(vals[i][1]);
                found = true;
                break;
            }
        }
        if (!found) {
            // noParams(); 
        }
    }
    else {
        //    noParams();
    }
}
function setDataValue(datavalue) {
    //
    if (datavalue != "") {
        var vals = new Array();
        // alert("These are the data parameters values that were passed to this page:");
        vals = decodeURIComponent(datavalue).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
            _qparams.push({ "key": vals[i][0], "val": vals[i][1] });

        }
    }
}

function qsGetValue(key) {
    getDataParam();
    for (i = 0; i < _qparams.length; i++) {
        if (_qparams[i].key == key)
            return _qparams[i].val;
    }
    return "";
}

function getIdXrmParent() {
    if (window.parent != null && window.parent.Xrm != null && window.parent.Xrm.data != null)
        return window.parent.Xrm.Page.data.entity.getId();

    var vals = new Array();
    if (location.search != "") {
        vals = location.search.substr(1).split("&");
        for (var i in vals) {
            vals[i] = vals[i].replace(/\+/g, " ").split("=");
        }

        for (var i in vals) {
            if (vals[i][0].toLowerCase() == "id")
                return vals[i][1];

        }
    }
    return null;
}




