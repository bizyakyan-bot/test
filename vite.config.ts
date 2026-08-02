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

                if (type === 'status_update') {
                  const { itemType, newStatus } = JSON.parse(body);
                  let statusTitle = '';
                  let statusBadgeColor = '#059669';
                  let statusMessage = '';

                  if (newStatus === 'confirmed') {
                    statusTitle = 'ODOBRENO / POTRJENO';
                    statusBadgeColor = '#059669';
                    statusMessage = 'Z veseljem vas obveščamo, da je vaše naročilo / rezervacija odobreno!';
                  } else if (newStatus === 'cancelled') {
                    statusTitle = 'PREKLICANO';
                    statusBadgeColor = '#dc2626';
                    statusMessage = 'Obveščamo vas, da je bilo vaše naročilo / rezervacija preklicano. Če imate vprašanja, nas kontaktirajte.';
                  } else if (newStatus === 'completed') {
                    statusTitle = 'ZAKLJUČENO';
                    statusBadgeColor = '#2563eb';
                    statusMessage = 'Vaše naročilo / rezervacija je označena kot zaključena. Hvala za obisk in zaupanje!';
                  } else {
                    statusTitle = (newStatus || '').toUpperCase();
                    statusBadgeColor = '#d97706';
                    statusMessage = `Status vašega naročila je bil posodobljen na: ${newStatus}.`;
                  }

                  if (itemType === 'reservation') {
                    const resData = data || {};
                    customerEmail = resData.customer?.email;
                    const ref = resData.bookingRef || resData.id || '';
                    subject = `[Soča Valley E-Bikes] Posodobitev statusa rezervacije #${ref}: ${statusTitle}`;
                    htmlContent = `
                      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f9f9f9;">
                        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
                          <h2 style="color: #059669; margin-top: 0;">Soča Valley E-Bikes Bovec</h2>
                          <p>Spoštovani <strong>${resData.customer?.fullName || 'stranka'}</strong>,</p>
                          <div style="background: #f3f4f6; border-left: 4px solid ${statusBadgeColor}; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${statusBadgeColor};">
                              Sprememba statusa: ${statusTitle}
                            </p>
                            <p style="margin: 8px 0 0 0; color: #4b5563;">${statusMessage}</p>
                          </div>
                          <h3>Podrobnosti rezervacije #${ref}:</h3>
                          <ul>
                            <li><strong>Kolo:</strong> ${resData.bikeName || ''} (${resData.size || ''})</li>
                            <li><strong>Začetek:</strong> ${resData.startDate || ''} ob ${resData.pickupTime || ''}</li>
                            <li><strong>Trajanje:</strong> ${resData.duration === 'multi-day' ? `${resData.numDays} dni` : (resData.duration || '')}</li>
                            <li><strong>Prevzem:</strong> ${resData.pickupLocation || ''}</li>
                            <li><strong>Skupni znesek:</strong> €${resData.totalAmount || 0}</li>
                          </ul>
                          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                          <p style="font-size: 12px; color: #777;">Soča Valley Apartments & E-Bikes Bovec</p>
                        </div>
                      </div>
                    `;
                  } else {
                    const orderData = data || {};
                    customerEmail = orderData.customerEmail;
                    const ref = orderData.orderRef || orderData.id || '';
                    subject = `[Soča Valley Shop] Posodobitev statusa naročila #${ref}: ${statusTitle}`;
                    const itemsList = (orderData.items || []).map((i: any) => `<li>${i.productName} (${i.selectedColor}, ${i.selectedSize}) x${i.quantity} - €${(i.unitPrice * i.quantity).toFixed(2)}</li>`).join('');
                    htmlContent = `
                      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background: #f9f9f9;">
                        <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; border: 1px solid #e0e0e0;">
                          <h2 style="color: #059669; margin-top: 0;">Soča Valley Spletna Trgovina</h2>
                          <p>Spoštovani <strong>${orderData.customerName || 'stranka'}</strong>,</p>
                          <div style="background: #f3f4f6; border-left: 4px solid ${statusBadgeColor}; padding: 15px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0; font-size: 16px; font-weight: bold; color: ${statusBadgeColor};">
                              Sprememba statusa: ${statusTitle}
                            </p>
                            <p style="margin: 8px 0 0 0; color: #4b5563;">${statusMessage}</p>
                          </div>
                          <h3>Podrobnosti naročila #${ref}:</h3>
                          <ul>
                            <li><strong>Dostava:</strong> ${orderData.deliveryMethod === 'postal-delivery' ? `Dostava (${orderData.shippingAddress})` : 'Osebni prevzem'}</li>
                            <li><strong>Skupni znesek:</strong> €${Number(orderData.totalAmount || 0).toFixed(2)}</li>
                          </ul>
                          <h4>Kupljeni izdelki:</h4>
                          <ul>${itemsList}</ul>
                          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                          <p style="font-size: 12px; color: #777;">Soča Valley Apartments & E-Bikes Bovec</p>
                        </div>
                      </div>
                    `;
                  }
                } else if (type === 'reservation') {
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

                console.log(`[Email API] Attempting send to customer: ${customerEmail}, host: ${notificationEmail} using ${smtpUser}`);

                const sendWithTransporter = async (transporter: any) => {
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
                  res.end(JSON.stringify({ success: true, message: 'Emails sent successfully via Gmail service' }));
                } catch (primaryErr: any) {
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
                    res.end(JSON.stringify({ success: true, message: 'Emails sent successfully via SMTP fallback' }));
                  } catch (fallbackErr: any) {
                    console.log('[Email API] SMTP status info:', fallbackErr?.message || fallbackErr);
                    res.end(JSON.stringify({ 
                      success: false, 
                      info: 'Gmail SMTP requires a fresh App Password. Order/Reservation was saved successfully.',
                      details: fallbackErr?.message || primaryErr?.message 
                    }));
                  }
                }
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
