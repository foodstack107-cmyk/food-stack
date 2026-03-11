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

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Status Update</title>
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
                      Food Stack Food Delivery <br> Order Status Update
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <!-- Order Info -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td>
                          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                            <h2 style="margin: 0 0 15px; color: #1A2744; font-size: 20px;">Order Information</h2>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Order ID:</strong> 
                              <span style="color: #333333;">${orderId}</span>
                            </p>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Status:</strong> 
                              <span style="color: #333333;">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                            </p>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Order Date:</strong> 
                              <span style="color: #333333;">${formattedDate}</span>
                            </p>
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Customer Details -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td>
                          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin-bottom: 30px;">
                            <h2 style="margin: 0 0 15px; color: #1A2744; font-size: 20px;">Customer Details</h2>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Name:</strong> 
                              <span style="color: #333333;">${customerDetails.name}</span>
                            </p>
                            <p style="margin: 0 0 10px; color: #333333;">
                              <strong style="color: #666666;">Email:</strong> 
                              <span style="color: #333333;">${customerDetails.email}</span>
                            </p>
                            ${
                              customerDetails.address
                                ? `
                              <p style="margin: 0 0 10px; color: #333333;">
                                <strong style="color: #666666;">Address:</strong> 
                                <span style="color: #333333;">${customerDetails.address}</span>
                              </p>
                            `
                                : ''
                            }
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- Order Items -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td>
                          <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px;">
                            <h2 style="margin: 0 0 15px; color: #1A2744; font-size: 20px;">Order Items</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                              <tr>
                               
                                <th style="text-align: center; color: #666666; padding: 10px 0;">Quantity</th>
                                <th style="text-align: right; color: #666666; padding: 10px 0;">Price</th>
                              </tr>
                              ${items
                                .map(
                                  (item) => `
                                    <tr>
                                
                                      <td style="padding: 10px 0; text-align: center; color: #333333;">${item.quantity}</td>
                                      <td style="padding: 10px 0; text-align: right; color: #333333;">$${item.price.toFixed(2)}</td>
                                    </tr>
                                  `,
                                )
                                .join('')}
                              <tr>
                                <td colspan="2" style="padding: 10px 0; color: #666666; font-weight: bold;">Total</td>
                                <td style="padding: 10px 0; text-align: right; color: #333333; font-weight: bold;">$${total.toFixed(2)}</td>
                              </tr>
                            </table>
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
                      Thank you for choosing Food Stack Food Delivery! This is an automated order status update.
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
