import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API route for sending notification & confirmation emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { type, data } = req.body;
    const envUser = process.env.SMTP_USER;
    const smtpUser = (envUser && !envUser.includes('your-email') && !envUser.includes('your-gmail')) ? envUser : 'bizyakyan@gmail.com';
    const envPass = process.env.SMTP_PASS;
    const knownRevoked = ['qsgfugyhhvbzszox', 'pcarqitqcayqubjh', 'your-gmail-app-password-here'];
    let activePass = 'zvmiwruwciatidte';
    if (envPass && !knownRevoked.includes(envPass.replace(/\s+/g, '')) && envPass.length >= 12) {
      activePass = envPass;
    }
    const cleanPass = activePass.replace(/\s+/g, '');
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'bizyakyan@gmail.com';

    let subject = '';
    let customerEmail = '';
    let htmlContent = '';

    if (type === 'reservation') {
      customerEmail = data.customer?.email;
      subject = `[Soča Valley E-Bikes] Potrditev rezervacije #${data.bookingRef}`;
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
            <h2 style="color: #059669; margin-top: 0;">Novo Naročilo E-Kolesa / Potrditev</h2>
            <p>Hvala za vašo rezervacijo! Tukaj so podrobnosti:</p>
            <ul>
              <li><strong>Referenca:</strong> #${data.bookingRef}</li>
              <li><strong>Kolo:</strong> ${data.bikeName} (Velikost: ${data.size})</li>
              <li><strong>Začetek:</strong> ${data.startDate} ob ${data.pickupTime}</li>
              <li><strong>Trajanje:</strong> ${data.duration === 'multi-day' ? `${data.numDays} dni` : data.duration}</li>
              <li><strong>Lokacija prevzema:</strong> ${data.pickupLocation}</li>
              <li><strong>Skupni znesek:</strong> €${data.totalAmount}</li>
              <li><strong>Naročnik:</strong> ${data.customer?.fullName} (${data.customer?.email}, ${data.customer?.phone})</li>
            </ul>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">Soča Valley Apartments & E-Bikes Bovec</p>
          </div>
        </div>
      `;
    } else if (type === 'shop_order') {
      customerEmail = data.customerEmail;
      subject = `[Soča Valley Shop] Potrditev naročila #${data.orderRef}`;
      const itemsList = (data.items || []).map(i => `<li>${i.productName} (${i.selectedColor}, ${i.selectedSize}) x${i.quantity} - €${(i.unitPrice * i.quantity).toFixed(2)}</li>`).join('');
      htmlContent = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
            <h2 style="color: #059669; margin-top: 0;">Novo Naročilo v Spletni Trgovini</h2>
            <p>Spoštovani ${data.customerName}, hvala za vaše naročilo!</p>
            <ul>
              <li><strong>Številka naročila:</strong> #${data.orderRef}</li>
              <li><strong>Dostava:</strong> ${data.deliveryMethod === 'postal-delivery' ? `Dostava na naslov (${data.shippingAddress})` : 'Osebni prevzem'}</li>
              <li><strong>Skupaj:</strong> €${data.totalAmount.toFixed(2)}</li>
            </ul>
            <h4>Kupljeni izdelki:</h4>
            <ul>${itemsList}</ul>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">Soča Valley Apartments & E-Bikes Bovec</p>
          </div>
        </div>
      `;
    }

    console.log(`[Email API] Attempting send to customer: ${customerEmail}, host: ${notificationEmail} using ${smtpUser}`);

    const sendWithTransporter = async (transporter) => {
      if (customerEmail) {
        await transporter.sendMail({
          from: `"BZC Soca Valley Hub" <${smtpUser}>`,
          to: customerEmail,
          subject,
          html: htmlContent
        });
      }

      await transporter.sendMail({
        from: `"BZC Soca Valley Hub" <${smtpUser}>`,
        to: notificationEmail,
        subject: `[OBVESTILO LASTNIKU] ${subject}`,
        html: htmlContent
      });
    };

    try {
      const transporterGmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: cleanPass
        }
      });
      await sendWithTransporter(transporterGmail);
      return res.json({ success: true, message: 'Emails sent successfully via Gmail service' });
    } catch (primaryErr) {
      console.log('[Email API] Primary Gmail transport notice:', primaryErr?.message || primaryErr);
      try {
        const transporterFallback = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          requireTLS: true,
          auth: {
            user: smtpUser,
            pass: cleanPass
          }
        });
        await sendWithTransporter(transporterFallback);
        return res.json({ success: true, message: 'Emails sent successfully via SMTP fallback' });
      } catch (fallbackErr) {
        console.log('[Email API] SMTP status info:', fallbackErr?.message || fallbackErr);
        return res.json({ 
          success: false, 
          info: 'Gmail SMTP requires a fresh App Password. Order/Reservation was saved successfully.',
          details: fallbackErr?.message || primaryErr?.message 
        });
      }
    }
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email', details: String(err) });
  }
});

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Explicitly serve favicon.png for better compatibility
app.get('/favicon.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'favicon.png'));
});

// Also serve favicon.ico for browsers that request it by default
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'favicon.png'));
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

