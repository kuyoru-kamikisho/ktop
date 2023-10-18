using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Timers;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Windows.Threading;
using System.Threading;
using System.Management;
using System.Runtime.InteropServices;

namespace ktop.classes
{
    public class DeviceInfo : INotifyPropertyChanged
    {
        private byte _cpuUsageP = 0;
        private byte _memoryUsageP = 0;
        private float _memoryTotal = 0;
        private byte _diskUsageP = 0;
        private DispatcherTimer _timer;
        private ManagementObjectSearcher cpu_searcher = new ManagementObjectSearcher("SELECT * FROM Win32_PerfFormattedData_PerfOS_Processor WHERE Name='_Total'");
        private ManagementObjectSearcher memory_searcher = new ManagementObjectSearcher("SELECT * FROM Win32_OperatingSystem");
        public event PropertyChangedEventHandler PropertyChanged;
        public DeviceInfo()
        {
            queryDeviceInfo();
        }

        private void queryDeviceInfo()
        {
            _timer = new DispatcherTimer();
            _timer.Interval = TimeSpan.FromSeconds(1);
            _timer.Tick += (o, e) =>
            {
                // cpu(单核)
                UInt64 cpuValue = 0;
                foreach (var queryObj in cpu_searcher.Get())
                {
                    cpuValue = (UInt64)queryObj["PercentProcessorTime"];
                }
                CpuUsageP = Convert.ToByte(cpuValue);


                // 内存
                var memoryValues = memory_searcher.Get().Cast<ManagementObject>().Select(mo => new
                {
                    FreePhysicalMemory = Double.Parse(mo["FreePhysicalMemory"].ToString()),
                    TotalVisibleMemorySize = Double.Parse(mo["TotalVisibleMemorySize"].ToString())
                }).FirstOrDefault();

                if (memoryValues != null)
                {
                    var percent = ((memoryValues.TotalVisibleMemorySize - memoryValues.FreePhysicalMemory) / memoryValues.TotalVisibleMemorySize) * 100;
                    MemoryUsageP = Convert.ToByte(percent);
                }
            };
            _timer.Start();
        }

        public byte CpuUsageP
        {
            get { return _cpuUsageP; }
            set
            {
                if (_cpuUsageP != value)
                {
                    _cpuUsageP = value;
                    PropertyHasChanged(nameof(CpuUsageP));
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
                    PropertyHasChanged(nameof(MemoryUsageP));
                }
            }
        }

        public byte DiskUsageP
        {
            get { return _diskUsageP; }
            set
            {
                if (_diskUsageP != value)
                {
                    _diskUsageP = value;
                    PropertyHasChanged(nameof(DiskUsageP));
                }
            }
        }

        protected virtual void PropertyHasChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
