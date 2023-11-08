using Hardcodet.Wpf.TaskbarNotification;
using ktop.classes;
using ktop.resources;
using ktop.state;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static ktop.classes.WindowStyle;

namespace ktop
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        private double _initX = 0;
        private double _initY = 0;
        private double _deltaX = 0;
        private double _deltaY = 0;
        private bool _isMouseDown = false;
        public MainWindow()
        {
            Store.ReadConfig();

            InitializeComponent();
            Loaded += (o, s) =>
            {
                HideWindowInTaskView(this);
            };

            this.Left = Store.__config__.x;
            this.Top = Store.__config__.y;

            // 数据绑定区域
            var deviceInfo = new DeviceInfo();
            CpuTextor.DataContext = deviceInfo;
            MemoryTextor.DataContext = deviceInfo;

            // 托盘区域图标
            var trayicon = new TaskbarIcon();
            trayicon.Icon = new System.Drawing.Icon("resources/imgs/icon.ico");
            var menu = new System.Windows.Controls.ContextMenu();
            var exitMenuItem = new System.Windows.Controls.MenuItem();
            exitMenuItem.Header = "退出";
            exitMenuItem.Click += (sender, e) =>
            {
                System.Windows.Application.Current.Shutdown();
            };
            menu.Items.Add(exitMenuItem);
            trayicon.ContextMenu = menu;
        }
        private void Grid_MouseDown(object sender, MouseButtonEventArgs e)
        {
            _initX = Mouse.GetPosition(null).X;
            _initY = Mouse.GetPosition(null).Y;
            _isMouseDown = true;
        }

        private void Grid_MouseUp(object sender, MouseButtonEventArgs e)
        {
            _isMouseDown = false;
        }

        private void Window_MouseMove(object sender, MouseEventArgs e)
        {
            if (_isMouseDown)
            {
                var window = Window.GetWindow(this);
                _deltaX = Mouse.GetPosition(null).X - _initX;
                _deltaY = Mouse.GetPosition(null).Y - _initY;
                window.Left = _deltaX + this.Left;
                window.Top = _deltaY + this.Top;

                Store.__config__.x = this.Left;
                Store.__config__.y = this.Top;
                Store.WriteConfig();
            }
        }

        private void Setting_Icon_Hover(object sender, MouseEventArgs e)
        {
            IconPath.Fill = new SolidColorBrush(Colors.Crimson);
        }

        private void Setting_Icon_Leave(object sender, MouseEventArgs e)
        {
            IconPath.Fill = new SolidColorBrush(Colors.White);
        }

        private void OpenRunners(object sender, MouseEventArgs e)
        {
            try
            {

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
