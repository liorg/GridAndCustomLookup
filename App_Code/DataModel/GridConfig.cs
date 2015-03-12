using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class GridConfig
    {
        public string Ver { get; set; }
        public IEnumerable<ConfigItem> Items { get; set; }
    }
}