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

namespace ktop2.KControls
{
    public partial class KSBtn : UserControl
    {
        public event EventHandler Click;

        protected virtual void OnClick(EventArgs e)
        {
            Click?.Invoke(this, e);
        }
        private void RaiseClickEvent()
        {
            OnClick(EventArgs.Empty);
        }


        public bool Active
        {
            get { return (bool)GetValue(ActiveProperty); }
            set { SetValue(ActiveProperty, value); }
        }

        public static readonly DependencyProperty ActiveProperty =
            DependencyProperty.Register("Active", typeof(bool), typeof(KSBtn), new PropertyMetadata(false));


        public String Text
        {
            get { return (String)GetValue(TextProperty); }
            set { SetValue(TextProperty, value); }
        }
        public static readonly DependencyProperty TextProperty =
            DependencyProperty.Register("Text", typeof(String), typeof(KSBtn), new PropertyMetadata(null));
        public Brush TColor
        {
            get { return (Brush)GetValue(ColorProperty); }
            set { SetValue(ColorProperty, value); }
        }
        public static readonly DependencyProperty ColorProperty =
            DependencyProperty.Register("TColor", typeof(Brush), typeof(KSBtn), new PropertyMetadata(new SolidColorBrush(Colors.Black)));
        public Thickness Padding
        {
            get { return (Thickness)GetValue(PaddingProperty); }
            set { SetValue(PaddingProperty, value); }
        }
        public static readonly DependencyProperty PaddingProperty =
            DependencyProperty.Register("Padding", typeof(Thickness), typeof(KSBtn), new PropertyMetadata(new Thickness(1, 1, 1, 1)));


        public Geometry Data
        {
            get { return (Geometry)GetValue(DataProperty); }
            set { SetValue(DataProperty, value); }
        }

        public static readonly DependencyProperty DataProperty =
            DependencyProperty.Register("Data", typeof(Geometry), typeof(KSBtn), new PropertyMetadata(null));
        public KSBtn()
        {
            FontSize = 10;
            InitializeComponent();
        }

        private void InternalMSE(object sender, MouseEventArgs e)
        {
            Background = new SolidColorBrush(Color.FromArgb(56, 40, 37, 46));
        }

        private void InterbalMSL(object sender, MouseEventArgs e)
        {
            if(!Active) {
                Background = new SolidColorBrush(Colors.Transparent);
            }
        }
    }
}
