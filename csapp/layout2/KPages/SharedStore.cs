using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ktop2.KPages
{
    static class KStore
    {
        public static SharedStore SST = new SharedStore
        {
            SearchIndex = 0
        };
    }
    internal class SharedStore
    {
        public byte SearchIndex { set; get; }
        public SitePageO SearchMode { set; get; }
        public string? ModuleInfo { set; get; }
    }
    public class SitePageO : INotifyPropertyChanged
    {
        private string _name { get; set; }
        private string _url { get; set; }
        private bool? _outlink { get; set; }
        public event PropertyChangedEventHandler? PropertyChanged;
        public string Name
        {
            get
            {
                return _name;
            }
            set
            {
                if (_name != value)
                {
                    _name = value;
                    OnPropertyChanged(nameof(Name));
                }
            }
        }
        public string Url
        {
            get { return _url; }
            set
            {
                if (_url != value)
                {
                    _url = value;
                    OnPropertyChanged(nameof(Url));
                }
            }
        }
        public bool? outlink
        {
            get
            {
                return _outlink;
            }
        }
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
