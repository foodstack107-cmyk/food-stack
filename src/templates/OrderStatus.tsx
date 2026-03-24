import { currencyFormatter } from '@/lib/utils';

interface OrderStatusProps {
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerDetails: {
    name: string;
    email: string;
    address?: string;
  };
  status: 'placed' | 'processing' | 'ready' | 'cancelled';
  createdAt: Date;
}

const statusConfig: Record<
  string,
  { emoji: string; color: string; bg: string; label: string }
> = {
  placed: {
    emoji: '📋',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.12)',
    label: 'Order Placed',
  },
  processing: {
    emoji: '👨‍🍳',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.12)',
    label: 'Preparing',
  },
  ready: {
    emoji: '✅',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.12)',
    label: 'Ready for Pickup',
  },
  cancelled: {
    emoji: '❌',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.12)',
    label: 'Cancelled',
  },
};

export const generateOrderStatusTemplate = ({
  orderId,
  items,
  total,
  customerDetails,
  status,
  createdAt,
}: OrderStatusProps): string => {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const s = statusConfig[status] || statusConfig.placed;

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 12px 0; color: #C5D0E0; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.04);">${item.name}</td>
          <td style="padding: 12px 0; color: #8899B4; font-size: 14px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.04);">x${item.quantity}</td>
          <td style="padding: 12px 0; color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; border-bottom: 1px solid rgba(255,255,255,0.04);">${currencyFormatter.format(item.price)}</td>
        </tr>`,
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Status Update</title>
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
                          <p style="margin: 0 0 4px; font-size: 12px; font-weight: 600; color: #E8552D; text-transform: uppercase; letter-spacing: 1.5px;">Order Update</p>
                          <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">Hi ${customerDetails.name}!</h1>
                          <p style="margin: 8px 0 0; font-size: 14px; color: #8899B4;">Your order status has been updated.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 32px;">

                          <!-- Status Badge -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
                            <tr>
                              <td align="center">
                                <div style="display: inline-block; padding: 16px 32px; background-color: ${s.bg}; border: 1px solid ${s.color}33; border-radius: 12px;">
                                  <span style="font-size: 28px; display: block; margin-bottom: 6px;">${s.emoji}</span>
                                  <span style="font-size: 16px; font-weight: 700; color: ${s.color}; letter-spacing: 0.5px;">${s.label}</span>
                                </div>
                              </td>
                            </tr>
                          </table>

                          <!-- Order Info -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                              <td style="padding: 20px; background-color: rgba(232,85,45,0.06); border-radius: 12px; border: 1px solid rgba(232,85,45,0.1);">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                  <tr>
                                    <td style="padding: 0 0 10px;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Order ID</p>
                                      <p style="margin: 0; font-size: 15px; font-weight: 700; color: #E8552D; font-family: 'Courier New', monospace;">#${orderId}</p>
                                    </td>
                                    <td style="padding: 0 0 10px; text-align: right;">
                                      <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Date</p>
                                      <p style="margin: 0; font-size: 13px; color: #C5D0E0;">${formattedDate}</p>
                                    </td>
                                  </tr>
                                </table>

                                ${
                                  customerDetails.address
                                    ? `
                                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.06);">
                                  <p style="margin: 0 0 1px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Delivery Address</p>
                                  <p style="margin: 0; font-size: 13px; color: #C5D0E0;">${customerDetails.address}</p>
                                </div>
                                `
                                    : ''
                                }
                              </td>
                            </tr>
                          </table>

                          <!-- Divider -->
                          <div style="height: 1px; background: linear-gradient(90deg, transparent, rgba(232,85,45,0.2), transparent); margin: 0 0 24px;"></div>

                          <!-- Order Items -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                              <td>
                                <p style="margin: 0 0 14px; font-size: 11px; font-weight: 600; color: #8899B4; text-transform: uppercase; letter-spacing: 1px;">Order Items</p>
                                <div style="padding: 20px; background-color: rgba(255,255,255,0.03); border-radius: 12px;">
                                  <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                      <td style="padding: 0 0 10px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px;">Item</td>
                                      <td style="padding: 0 0 10px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px; text-align: center;">Qty</td>
                                      <td style="padding: 0 0 10px; font-size: 10px; color: #6B7FA3; text-transform: uppercase; letter-spacing: 0.5px; text-align: right;">Price</td>
                                    </tr>
                                    ${itemRows}
                                  </table>

                                  <!-- Total -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                                    <tr>
                                      <td style="padding: 16px 0 0; border-top: 2px solid rgba(232,85,45,0.2);">
                                        <span style="font-size: 14px; font-weight: 600; color: #8899B4;">Total</span>
                                      </td>
                                      <td style="padding: 16px 0 0; text-align: right; border-top: 2px solid rgba(232,85,45,0.2);">
                                        <span style="font-size: 20px; font-weight: 700; color: #E8552D;">${currencyFormatter.format(total)}</span>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                            </tr>
                          </table>

                          <!-- Thank You Message -->
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td align="center" style="padding: 20px; background: linear-gradient(135deg, rgba(232,85,45,0.08), rgba(249,115,22,0.05)); border-radius: 12px; border: 1px solid rgba(232,85,45,0.1);">
                                <p style="margin: 0; font-size: 14px; color: #C5D0E0; line-height: 1.6;">
                                  Thank you for choosing <strong style="color: #E8552D;">Food Stack</strong>!<br>
                                  We appreciate your order. 🙏
                                </p>
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
                    <p style="margin: 0 0 6px; font-size: 12px; color: #4A5A78;">This is an automated order status notification.</p>
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
