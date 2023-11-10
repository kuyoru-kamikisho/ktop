using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ktop2.KPages
{
    public partial class KSitesPage : Page
    {

        public KSitesPage()
        {
            InitializeComponent();
            ReadFiles();
        }
        public void ReadFiles()
        {
            var search = File.ReadAllText("./KResources/search.json");
            var webs = File.ReadAllText("./KResources/webs.json");
            var searcherList = JsonConvert.DeserializeObject<List<SitePageO>>(search);
            var webList = JsonConvert.DeserializeObject<List<SitePageO>>(webs);
            KStore.SST.SearchMode = searcherList[KStore.SST.SearchIndex];
            //searchmode.DataContext = KStore.SST.SearchMode;
        }
    }
}
