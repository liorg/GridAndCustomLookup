using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.ObjectModel;
namespace LU
{
    [Serializable]
    public struct ParamKeyValuePair
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string TypeObj { get; set; }
    }
    [Serializable]
    public class LURequest
    {
        public Guid RecId { get; set; }
        public List<ParamKeyValuePair> Params { get; set; }

    }
    ////[Serializable]
    ////public class LURequest1
    ////{
    ////    public Guid RecId { get; set; }
    ////    public List<ParamKeyValuePair> P { get; set; }

    ////}
}