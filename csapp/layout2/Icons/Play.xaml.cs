using ktop2.KControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

namespace ktop2.Icons
{
    /// <summary>
    /// Play.xaml 的交互逻辑
    /// </summary>
    public partial class Play : UserControl
    {
        public static readonly DependencyProperty FillProperty =
            DependencyProperty.Register("Fill", typeof(Brush), typeof(Play), new PropertyMetadata(new SolidColorBrush(Colors.Black)));
        public Play()
        {
            InitializeComponent();
        }

        public Brush Fill
        {
            get { return (Brush)GetValue(FillProperty); }
            set { SetValue(FillProperty, value); }
        }
    }
}
