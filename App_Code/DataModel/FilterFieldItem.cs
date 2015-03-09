using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVSWeb.Grid.server
{
    public class FilterFieldItem
    {
        public string Name { get; set; }
    }

    public class FieldItem : FilterFieldItem
    {
        public string Val { get; set; }
    }
}