using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace RemoteDesktop
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();

        }

       

        private void lblConnect_Click(object sender, EventArgs e)
        {

            try
            {
                frmScreen screen = new frmScreen(txtIp.Text, txtPort.Text);
                screen.ShowDialog();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Can't connect: " + ex.Message);

            }
        }

        private void btnStart_Click(object sender, EventArgs e)
        {

        }

        private void btnStop_Click(object sender, EventArgs e)
        {
        }

        private void tmrSharing_Tick(object sender, EventArgs e)
        {
            
        }
    }
}
