using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MVSWeb.Grid.server;

namespace MVSWeb.Grid.Server
{
    public class RequestGrid
    {
        public string Id { get; set; }

        public IEnumerable<ColumnsItem> Columns { get; set; }
        public IEnumerable<FieldItem> FilterFields { get; set; }

    }
}