using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class SettingGrid
    {
        public string SortName { get; set; }
        public bool SortOrder { get; set; }
        public int CurrentPage { get; set; }
        public int MaxPerPage { get; set; }
        public int MaxRows { get; set; }
        public bool IsToggle { get; set; }
    }
}