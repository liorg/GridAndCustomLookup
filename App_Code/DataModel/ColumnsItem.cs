using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class ColumnsItem
    {
        public string Name { get; set; }
        public string Desc { get; set; }
        public bool IsSort { get; set; }
        public bool SortDsc { get; set; }
        public string ObjType { get; set; }
    }
}