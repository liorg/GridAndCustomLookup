function setParentXrm(k,s) {
   
    if (window.parent != null) {
        debugger;
       // window.parent.document.getElementById(k).value = s;  // for moqing 
        window.parent.Xrm.Page.data.entity.attributes.get(k).setValue(s); // for crm
    }

}