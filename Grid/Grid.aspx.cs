using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

public partial class Grid_Grid : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var configid = Request.QueryString["configid"] == null ? "" : Request.QueryString["configid"];
        AddScripts(ScriptPlaceHolder, "scripts/config.ashx?id=" + configid);
    }
    public static void AddScripts(PlaceHolder headPlaceHolder, string urlRelative)//, Page page = null)
    {
        // var sInclude = page != null ? page.ResolveClientUrl(urlRelative) : urlRelative;
        var sInclude = urlRelative;
        var Include = new HtmlGenericControl("script");
        Include.Attributes.Add("type", "text/javascript");
        Include.Attributes.Add("src", sInclude);
        headPlaceHolder.Controls.Add(Include);
    }
}