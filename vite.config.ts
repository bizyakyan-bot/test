import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import nodemailer from 'nodemailer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'email-api-plugin',
        configureServer(server) {
          server.middlewares.use('/api/send-email', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 455;
              res.end('Method Not Allowed');
              return;
            }
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const { type, data } = JSON.parse(body);
                const smtpUser = process.env.SMTP_USER || 'bizyakyan@gmail.com';
                const smtpPass = process.env.SMTP_PASS || 'qsgfugyhhvbzszox';
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
                  const itemsList = (data.items || []).map((i: any) => `<li>${i.productName} (${i.selectedColor}, ${i.selectedSize}) x${i.quantity} - €${(i.unitPrice * i.quantity).toFixed(2)}</li>`).join('');
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

                res.setHeader('Content-Type', 'application/json');

                if (!smtpPass) {
                  console.log('--- EMAIL SEND SIMULATION (No SMTP_PASS in environment variables) ---');
                  console.log(`To: ${customerEmail}, ${notificationEmail}`);
                  console.log(`Subject: ${subject}`);
                  res.end(JSON.stringify({ success: true, simulated: true, message: 'Simulated email output (set SMTP_PASS in secrets for live sending)' }));
                  return;
                }

                const transporter = nodemailer.createTransport({
                  host: process.env.SMTP_HOST || 'smtp.gmail.com',
                  port: Number(process.env.SMTP_PORT) || 465,
                  secure: Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT,
                  auth: {
                    user: smtpUser,
                    pass: smtpPass
                  }
                });

                if (customerEmail) {
                  await transporter.sendMail({
                    from: `"Soča Valley Bovec" <${smtpUser}>`,
                    to: customerEmail,
                    subject,
                    html: htmlContent
                  });
                }

                await transporter.sendMail({
                  from: `"Soča Valley Bovec" <${smtpUser}>`,
                  to: notificationEmail,
                  subject: `[OBVESTILO LASTNIKU] ${subject}`,
                  html: htmlContent
                });

                res.end(JSON.stringify({ success: true, message: 'Emails sent successfully' }));
              } catch (err) {
                console.error('Vite email dev endpoint error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: String(err) }));
              }
            });
          });
        }
      }
    ],
    css: {
      devSourcemap: false,
    },
    build: {
      target: 'esnext'
    },
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
