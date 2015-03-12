using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class DetailItem
    {
        public string Method { get; set; }
        public SettingGrid SettingGrid { get; set; }
        public IEnumerable<ColumnsItem> Schema { get; set; }
        public IEnumerable<FilterFieldItem> FilterFields { get; set; }
    }
}