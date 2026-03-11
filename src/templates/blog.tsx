import crypto from 'crypto';

interface BlogEmailTemplateProps {
  recipientName: string;
  blogTitle: string;
  blogDescription: string;
  blogImage: string;
  blogType: string;
  blogLink: string;
  ctaText?: string;
}

const generateUnsubscribeHash = (email: string): string => {
  const secret = process.env.UNSUBSCRIBE_SECRET_KEY as string;
  return crypto.createHmac('sha256', secret).update(email).digest('hex');
};

export const generateBlogEmailTemplate = ({
  recipientName,
  blogTitle,
  blogDescription,
  blogImage,
  blogType,
  blogLink,
  ctaText = 'Read More',
}: BlogEmailTemplateProps): string => {
  const baseUrl = process.env.HOSTED_URL as string;
  const unsubscribeHash = generateUnsubscribeHash(recipientName);
  const unsubscribeLink = `${baseUrl}/unsubscribe?hash=${unsubscribeHash}&email=${encodeURIComponent(recipientName)}`;

  // Truncate description to maintain clean layout
  const shortDescription =
    blogDescription.length > 120
      ? `${blogDescription.substring(0, 120)}...`
      : blogDescription;

  // Set badge color based on blog type
  const badgeColor = blogType === 'Food' ? '#B91C1C' : '#1E40AF';

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${blogTitle}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; background-color: #F3F4F6; font-family: 'Inter', Arial, sans-serif; }
          a { text-decoration: none; }
          .container { max-width: 640px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(90deg, #B91C1C 0%, #DC2626 100%); padding: 32px; text-align: center; }
          .header h1 { color: #FFFFFF; font-size: 24px; font-weight: 700; margin: 0; }
          .header p { color: #FECACA; font-size: 14px; margin: 8px 0 0; }
          .content { padding: 32px; }
          .greeting { color: #1F2A44; font-size: 16px; line-height: 24px; margin: 0 0 24px; }
          .blog-image { width: 100%; height: auto; border-radius: 8px; margin-bottom: 24px; }
          .blog-title { color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 12px; }
          .blog-description { color: #4B5563; font-size: 15px; line-height: 22px; margin: 0 0 20px; }
          .badge { display: inline-block; background-color: ${badgeColor}; color: #FFFFFF; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px; margin-bottom: 16px; }
          .cta-button { display: inline-block; background-color: #B91C1C; color: #FFFFFF; font-size: 14px; font-weight: 600; padding: 12px 24px; border-radius: 8px; transition: background-color 0.2s; }
          .cta-button:hover { background-color: #991B1B; }
          .footer { background-color: #F9FAFB; padding: 24px; text-align: center; }
          .footer p { color: #6B7280; font-size: 13px; margin: 0; line-height: 20px; }
          .footer a { color: #B91C1C; text-decoration: underline; }
          @media (max-width: 600px) {
            .container { margin: 16px; }
            .content { padding: 24px; }
            .header { padding: 24px; }
          }
        </style>
      </head>
      <body>
        <table role="presentation" class="container">
          <!-- Header -->
          <tr>
            <td class="header">
              <h1>Food Stack Food Delivery</h1>
              <p>New Blog Post</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td class="content">
              <p class="greeting">
                Hi${recipientName ? ` ${recipientName}` : ''},<br>
                Check out our latest blog post:
              </p>
              <img src="${blogImage}" alt="${blogTitle}" class="blog-image">
              <span class="badge">${blogType}</span>
              <h2 class="blog-title">${blogTitle}</h2>
              <p class="blog-description">${shortDescription}</p>
              <a href="${blogLink}" target="_blank" class="cta-button">${ctaText}</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer">
              <p>© 2025 Food Stack Food Delivery. All rights reserved.</p>
              <p>Don't want these emails? <a href="${unsubscribeLink}">Unsubscribe</a></p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
