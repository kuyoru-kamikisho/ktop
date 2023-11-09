﻿using System;
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
    /// Web.xaml 的交互逻辑
    /// </summary>
    public partial class Web : UserControl
    {
        public static readonly DependencyProperty FillProperty =
            DependencyProperty.Register("Fill", typeof(Brush), typeof(Web), new PropertyMetadata(new SolidColorBrush(Colors.Black)));
        public Web()
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