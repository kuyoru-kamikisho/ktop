using ktop.classes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace ktop.state
{
    public static class Store
    {
        public static string configPath = "./resources/config/default.json";
        public static Config? __config__;

        public static void ReadConfig()
        {
            var jsonStr = File.ReadAllText(configPath);
            __config__ = JsonConvert.DeserializeObject<Config>(jsonStr);
        }

        public static void WriteConfig()
        {
            var json=JsonConvert.SerializeObject(__config__,Formatting.Indented);
            File.WriteAllText(configPath, json);
        }
    }
}
