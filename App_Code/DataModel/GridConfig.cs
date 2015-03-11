using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class DetailItem
    {
        public string Method { get; set; }
        public IEnumerable<ColumnsItem> Schema { get; set; }
        public IEnumerable<FilterFieldItem> FilterFields { get; set; }
    }

    public class ConfigItem
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public DetailItem Detail { get; set; }
    }

    public class GridConfig
    {
        public string Ver { get; set; }
        public IEnumerable<ConfigItem> Items { get; set; }
    }
}