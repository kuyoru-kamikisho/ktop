using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Timers;
using System.Threading.Tasks;
using System.Diagnostics;

namespace ktop.classes
{
    public class DeviceInfo : INotifyPropertyChanged
    {
        private byte _cpuUsageP = 0;
        private byte _memoryUsageP = 0;
        private byte _diskUsageP = 0;
        private Timer _timer;
        public event PropertyChangedEventHandler PropertyChanged;
        private PerformanceCounter cpuCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        private PerformanceCounter memoryCounter = new PerformanceCounter("Memory", "% Committed Bytes In Use");
        private PerformanceCounter diskCounter = new PerformanceCounter("PhysicalDisk", "% Disk Time", "_Total");

        public DeviceInfo()
        {
            _timer = new Timer();
            _timer.Interval = 1000;
            _timer.Elapsed += (s, e) =>
            {
                Random random = new Random();
                var c = (byte)random.Next(0, 101);
                Debug.WriteLine(c);
                CpuUsageP = c;
            };
            _timer.Start();
        }

        private void queryDeviceInfo()
        {
            while (true)
            {
                var c = cpuCounter.NextValue();
                Debug.WriteLine(c);
                CpuUsageP = Convert.ToByte(c);
                System.Threading.Thread.Sleep(1000);
            }
        }

        public byte CpuUsageP
        {
            get { return _cpuUsageP; }
            set
            {
                if (_cpuUsageP != value)
                {
                    _cpuUsageP = value;
                    PropertyHasChanged(nameof(_cpuUsageP));
                }
            }
        }
        public byte MemoryUsageP
        {
            get { return _memoryUsageP; }
            set
            {
                if (_memoryUsageP != value)
                {
                    _memoryUsageP = value;
                    PropertyHasChanged(nameof(_memoryUsageP));
                }
            }
        }

        protected virtual void PropertyHasChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
