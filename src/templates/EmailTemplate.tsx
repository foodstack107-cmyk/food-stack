interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const generateEmailTemplate = ({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Enquiry</title>
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

                    <!-- Header Banner -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 32px 32px 24px; background: linear-gradient(135deg, #1A2744 0%, #243B65 100%); border-bottom: 1px solid rgba(232,85,45,0.15);">
                          <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; color: #E8552D; text-transform: uppercase; letter-spacing: 1.5px;">New Enquiry</p>
                          <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">You have a new message</h1>
                        </td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 32px;">

                          <!-- Sender Info -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 20px; background-color: rgba(232,85,45,0.06); border-radius: 12px; border: 1px solid rgba(232,85,45,0.1);">
                                <p style="margin: 0 0 4px; font-size: 11px; font-weight: 600; color: #E8552D; text-transform: uppercase; letter-spacing: 1px;">From</p>
                                <p style="margin: 0 0 2px; font-size: 16px; font-weight: 600; color: #ffffff;">${name}</p>
                                <p style="margin: 0; font-size: 13px; color: #8899B4;">
                                  <a href="mailto:${email}" style="color: #E8552D; text-decoration: none;">${email}</a>
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Subject -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #8899B4; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                                <p style="margin: 0; font-size: 15px; font-weight: 600; color: #ffffff;">${subject}</p>
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
                                  <p style="margin: 0; font-size: 14px; color: #C5D0E0; line-height: 1.7;">${message}</p>
                                </div>
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
                    <p style="margin: 0 0 6px; font-size: 12px; color: #4A5A78;">This is an automated notification from your contact form.</p>
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
