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
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Enquiry Received - Food Stack Food Delivery</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; text-align: center;">New Enquiry Received</h1>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd;">
          <h2 style="color: #333; margin-top: 0;">Customer Details:</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #667eea;">${phone}</a></p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${submittedAt}</p>
          </div>
          
          <h3 style="color: #333;">Message:</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #764ba2;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #e8f4fd; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #666;">
              Please respond to this enquiry promptly to provide excellent customer service.
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>This is an automated notification from Food Stack Food Delivery enquiry system.</p>
        </div>
      </body>
    </html>
  `;
};
