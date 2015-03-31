using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.Server.Mock
{
    public class MockData
    {
        CrmGrid _crmGrid;
        public CrmGrid CrmGrid
        {
            get
            {
                return _crmGrid;
            }
        }
        public MockData()
        {
            CrmGridItem crmGridItem;
            _crmGrid = new CrmGrid(); _crmGrid.CrmGridItems = new List<CrmGridItem>();
            crmGridItem = new CrmGridItem();

            crmGridItem.Id = Guid.NewGuid().ToString();
            crmGridItem.subSrc = "gr.htm?id=" + crmGridItem.Id; 
            crmGridItem.openwin = "http://www.google.com";

            crmGridItem.Fields = new List<ParamKeyValuePair>();
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "ListName", Val = "ddd" });
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "MemberCount", Val = "xxx" });
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "CampaignName", Val = "ddd" });
            _crmGrid.CrmGridItems.Add(crmGridItem);

            crmGridItem = new CrmGridItem();
            crmGridItem.Id = Guid.NewGuid().ToString();
            crmGridItem.subSrc = "gr.htm?id=" + crmGridItem.Id;
            crmGridItem.openwin = "http://www.ynet.co.il";
            crmGridItem.Fields = new List<ParamKeyValuePair>();
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "ListName", Val = "ש" });
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "MemberCount", Val = "שדגד" });
            crmGridItem.Fields.Add(new ParamKeyValuePair { Key = "CampaignName", Val = "כדגכדג" });
            _crmGrid.CrmGridItems.Add(crmGridItem);
        }
    }
}