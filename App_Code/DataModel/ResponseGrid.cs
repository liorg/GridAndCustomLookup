using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MVSWeb.Grid.Server
{
    public class ResponseGrid
    {
        public string Id { get; set; }
        public bool IsError { get; set; }
        public string ErrDesc { get; set; }
        public CrmGrid CrmGrid { get; set; }
        public SettingGrid SettingGrid { get; set; }
    }
}
