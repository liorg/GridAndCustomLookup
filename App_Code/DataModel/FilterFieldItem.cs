using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.Server
{
    public class FilterFieldItem
    {
        public string Name { get; set; }
    }

    public class FieldItem : FilterFieldItem
    {
        public string TypeField { get; set; }
        public string Val { get; set; }
    }
}