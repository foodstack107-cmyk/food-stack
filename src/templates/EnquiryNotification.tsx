interface EnquiryNotificationProps {
  name: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
}

export const EnquiryNotificationTemplate = ({
  name,
  email,
  phone,
  message,
  submittedAt,
}: EnquiryNotificationProps) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enquiry - Food Stack</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0B1426; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 16px;">
              <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">

                <!-- Logo & Brand -->
                <tr>
                  <td align="center" style="padding: 0 0 32px;">
                    <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #E8552D, #F97316); border-radius: 50%; text-align: center; line-height: 56px; font-size: 24px; color: #fff; font-weight: bold; display: inline-block;">🍽</div>
                    <p style="margin: 12px 0 0; font-size: 20px; font-weight: 700; color: #E8552D; letter-spacing: 0.5px;">Food Stack</p>
                  </td>
                </tr>

                <!-- Main Card -->
                <tr>
                  <td style="background-color: #111D32; border-radius: 16px; border: 1px solid rgba(232,85,45,0.15); overflow: hidden;">

                    <!-- Header -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #1A2744 0%, #243B65 100%); border-bottom: 1px solid rgba(232,85,45,0.15);">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; color: #E8552D; text-transform: uppercase; letter-spacing: 1.5px;">Customer Enquiry</p>
                                <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">New enquiry received</h1>
                              </td>
                              <td align="right" style="vertical-align: top;">
                                <div style="display: inline-block; padding: 6px 14px; background-color: rgba(232,85,45,0.12); border: 1px solid rgba(232,85,45,0.25); border-radius: 20px;">
                                  <span style="font-size: 11px; font-weight: 600; color: #E8552D;">NEW</span>
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 32px;">

                          <!-- Customer Card -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 20px; background-color: rgba(232,85,45,0.06); border-radius: 12px; border: 1px solid rgba(232,85,45,0.1);">
                                <p style="margin: 0 0 16px; font-size: 11px; font-weight: 600; color: #E8552D; text-transform: uppercase; letter-spacing: 1px;">Customer Details</p>

                                <!-- Name -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                                  <tr>
                                    <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                                      <span style="font-size: 14px;">👤</span>
                                    </td>
                                    <td style="padding-left: 8px;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                                      <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">${name}</p>
                                    </td>
                                  </tr>
                                </table>

                                <!-- Email -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                                  <tr>
                                    <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                                      <span style="font-size: 14px;">✉️</span>
                                    </td>
                                    <td style="padding-left: 8px;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                                      <p style="margin: 0; font-size: 14px;"><a href="mailto:${email}" style="color: #E8552D; text-decoration: none; font-weight: 500;">${email}</a></p>
                                    </td>
                                  </tr>
                                </table>

                                <!-- Phone -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                                  <tr>
                                    <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                                      <span style="font-size: 14px;">📞</span>
                                    </td>
                                    <td style="padding-left: 8px;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Phone</p>
                                      <p style="margin: 0; font-size: 14px;"><a href="tel:${phone}" style="color: #E8552D; text-decoration: none; font-weight: 500;">${phone}</a></p>
                                    </td>
                                  </tr>
                                </table>

                                <!-- Submitted At -->
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                  <tr>
                                    <td style="width: 24px; vertical-align: top; padding-top: 2px;">
                                      <span style="font-size: 14px;">🕐</span>
                                    </td>
                                    <td style="padding-left: 8px;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Submitted</p>
                                      <p style="margin: 0; font-size: 14px; color: #C5D0E0;">${submittedAt}</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <!-- Divider -->
                          <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(232,85,45,0.2), transparent); margin: 0 0 24px;"></div>

                          <!-- Message -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 10px; font-size: 11px; font-weight: 600; color: #8899B4; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                                <div style="padding: 20px; background-color: rgba(255,255,255,0.03); border-radius: 12px; border-left: 3px solid #E8552D;">
                                  <p style="margin: 0; font-size: 14px; color: #C5D0E0; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                                </div>
                              </td>
                            </tr>
                          </table>

                          <!-- CTA -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 28px;">
                            <tr>
                              <td align="center">
                                <a href="mailto:${email}" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #E8552D, #F97316); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">Reply to Customer</a>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding: 28px 16px 0;">
                    <p style="margin: 0 0 6px; font-size: 12px; color: #4A5A78;">Please respond promptly to provide excellent customer service.</p>
                    <p style="margin: 0; font-size: 11px; color: #3A4A68;">&copy; ${new Date().getFullYear()} Food Stack Food Delivery. All rights reserved.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
