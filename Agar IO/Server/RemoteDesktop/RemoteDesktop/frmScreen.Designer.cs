namespace RemoteDesktop
{
    partial class frmScreen
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pctScreen = new System.Windows.Forms.PictureBox();
            this.lblstatus = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.pctScreen)).BeginInit();
            this.SuspendLayout();
            // 
            // pctScreen
            // 
            this.pctScreen.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pctScreen.Location = new System.Drawing.Point(0, 0);
            this.pctScreen.Name = "pctScreen";
            this.pctScreen.Size = new System.Drawing.Size(662, 363);
            this.pctScreen.TabIndex = 0;
            this.pctScreen.TabStop = false;
            // 
            // lblstatus
            // 
            this.lblstatus.AutoSize = true;
            this.lblstatus.Location = new System.Drawing.Point(54, 74);
            this.lblstatus.Name = "lblstatus";
            this.lblstatus.Size = new System.Drawing.Size(35, 13);
            this.lblstatus.TabIndex = 1;
            this.lblstatus.Text = "label1";
            // 
            // frmScreen
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(662, 363);
            this.Controls.Add(this.lblstatus);
            this.Controls.Add(this.pctScreen);
            this.Name = "frmScreen";
            this.Text = "frmScreen";
            this.Load += new System.EventHandler(this.frmScreen_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pctScreen)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.PictureBox pctScreen;
        private System.Windows.Forms.Label lblstatus;
    }
}