using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class DetailItem
    {
        public string method { get; set; }
        public IEnumerable<ColumnsItem> columns { get; set; }
        public IEnumerable<FilterFieldItem> filterFields { get; set; }
    }

    public class ConfigItem
    {
        public string name { get; set; }
        public string url { get; set; }
        public DetailItem detail { get; set; }
    }

    //public class FilterFieldItem
    //{
    //    public string name { get; set; }
    //}

    public class GridConfig
    {
        public string ver { get; set; }
        public IEnumerable<ConfigItem> items { get; set; }
    }
}