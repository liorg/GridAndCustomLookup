using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class ConfigItem
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public DetailItem Detail { get; set; }
    }
}