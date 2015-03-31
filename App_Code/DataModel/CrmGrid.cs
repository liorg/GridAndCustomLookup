using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.Server
{
    [Serializable]
    public class CrmGridItem
    {
        public string Id { get; set; }
        public string subSrc { get; set; } 
        public string openwin { get; set; }
        public List<ParamKeyValuePair> Fields { get; set; }
    }

    [Serializable]
    public class CrmGrid
    {
        public List<CrmGridItem> CrmGridItems { get; set; }
    }
}