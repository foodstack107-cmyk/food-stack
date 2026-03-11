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
      <body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Arial, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 30px; background: linear-gradient(135deg, #1A2744 0%, #2D4A7A 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-align: center;">
                     Shiv Shakti Food Delivery <br> New Enquiry Received
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <!-- Sender Info -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td>
                          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                            <h2 style="margin: 0 0 15px; color: #1A2744; font-size: 20px;">Sender Information</h2>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Name:</strong> 
                              <span style="color: #333333;">${name}</span>
                            </p>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Email:</strong> 
                              <span style="color: #333333;">${email}</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Message Content -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td>
                          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                            <h2 style="margin: 0 0 15px; color: #1A2744; font-size: 20px;">Message Details</h2>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Subject:</strong> 
                              <span style="color: #333333;">${subject}</span>
                            </p>
                            <div style="margin-top: 20px; padding: 20px; background-color: #ffffff; border-radius: 4px; border-left: 4px solid #1A2744;">
                              <p style="margin: 0; color: #333333; line-height: 1.6;">
                                ${message}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                    <p style="margin: 0; color: #666666; font-size: 14px;">
                      This is an automated message from your contact form.
                    </p>
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
