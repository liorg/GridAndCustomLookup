function getParentXrm(isCrm,k, t) {
    //debugger
    if (window.parent != null) {
        //debugger;
        if (!isCrm) {
            if (window.parent.document.getElementById(k) != null)
                return window.parent.document.getElementById(k).value;  // for parent is webresource 
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
