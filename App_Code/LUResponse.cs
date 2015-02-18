using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
namespace LU
{
    [Serializable]
    public class RecItem
    {
        public Guid Id { get; set; }
        public bool IsSelected { get; set; }
        public string Name { get; set; }
    }
   [Serializable]
    public class LUResponse
    {
        public bool IsError { get; set; }
        public string Desc { get; set; }
        public List<RecItem> Items { get; set; }
    }
}