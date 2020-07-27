using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Sockets;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace RemoteDesktop
{
    public partial class frmScreen : Form
    {
        private TcpClient client = new TcpClient();
        private NetworkStream mainStream;
        private string ip;
        private int portNumber;

        private Thread GetImage;

        public frmScreen(string ip, string port)
        {
            this.ip = ip;
            this.portNumber = Convert.ToInt32(port);
            client.Connect(ip, portNumber);
            GetImage = new Thread(ReceiveImage);
            GetImage.Start();
            InitializeComponent();
        }

        private void frmScreen_Load(object sender, EventArgs e)
        {

        }

        private void ReceiveImage()
        {
           //lblstatus.Text = client.Connected.ToString();
            BinaryFormatter bitFormatter = new BinaryFormatter();
            try
            {
                while (client.Connected)
                {
                    mainStream = client.GetStream();

                    pctScreen.Image = (Image)bitFormatter.Deserialize(mainStream);

                    pctScreen.SizeMode = PictureBoxSizeMode.StretchImage;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Connection was lost: " + ex.Message, "Connection lost", MessageBoxButtons.OK, MessageBoxIcon.Error);
                client = new TcpClient();
            }

        }
    }
}
