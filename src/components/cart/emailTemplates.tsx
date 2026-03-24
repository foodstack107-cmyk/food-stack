import { currencyFormatter } from '@/lib/utils';

import { CartItem, CustomerDetails, OrderDetails } from '@/types/menu';

export const generateAdminOrderEmailTemplate = (
  cart: CartItem[],
  total: number,
  customerDetails: CustomerDetails,
  orderId: string,
) => {
  const { name, phone, pickupTime } = customerDetails;
  const itemsHtml = cart
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${currencyFormatter.format(
          item.price * item.quantity,
        )}</td>
      </tr>
    `,
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #0B1426;">New Order Notification</h2>
      <p>A new order has been placed. Please review the details below and prepare for pickup.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <h3 style="color: #E8552D;">Customer Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Pickup Time:</strong> ${pickupTime}</p>
      <h3 style="color: #E8552D;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 8px; text-align: left; background-color: #f4f4f4;">Item</th>
            <th style="padding: 8px; text-align: center; background-color: #f4f4f4;">Quantity</th>
            <th style="padding: 8px; text-align: right; background-color: #f4f4f4;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3 style="color: #E8552D; margin-top: 20px;">Total: ${currencyFormatter.format(total)}</h3>
      <p style="margin-top: 20px;">Payment will be collected in cash upon pickup.</p>
    </div>
  `;
};

export const generateCustomerOrderEmailTemplate = (
  cart: CartItem[],
  total: number,
  customerDetails: CustomerDetails,
  orderId: string,
) => {
  const { name, pickupTime } = customerDetails;
  const itemsHtml = cart
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${currencyFormatter.format(
          item.price * item.quantity,
        )}</td>
      </tr>
    `,
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #0B1426;">Your Order Confirmation</h2>
      <p>Hi ${name}, thank you for your order! We've received your request and are preparing it for pickup.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Pickup Time:</strong> ${pickupTime}</p>
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; color: #0B1426;"><strong>Need to cancel?</strong></p>
        <p style="margin-top: 5px;">You can cancel your order within 15 minutes of placing it by visiting your order history or replying to this email.</p>
      </div>
      <h3 style="color: #E8552D;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 8px; text-align: left; background-color: #f4f4f4;">Item</th>
            <th style="padding: 8px; text-align: center; background-color: #f4f4f4;">Quantity</th>
            <th style="padding: 8px; text-align: right; background-color: #f4f4f4;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3 style="color: #E8552D; margin-top: 20px;">Total: ${currencyFormatter.format(total)}</h3>
      <p style="margin-top: 20px;">Payment will be collected in cash upon pickup.</p>
      <p style="margin-top: 30px; font-size: 12px; color: #666;">Thank you for choosing our restaurant. We look forward to serving you!</p>
    </div>
  `;
};

export const generateAdminCancellationEmailTemplate = (
  order: OrderDetails,
  cancellationReason?: string,
) => {
  const { orderId, customerDetails, items, total } = order;
  const { name, phone, pickupTime } = customerDetails;
  const itemsHtml = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">${currencyFormatter.format(
          item.price * item.quantity,
        )}</td>
      </tr>
    `,
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #ff4d4d;">Order Cancellation Notice</h2>
      <p>An order has been cancelled. Please review the details below.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <h3 style="color: #0B1426;">Customer Information</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Original Pickup Time:</strong> ${pickupTime}</p>
      ${cancellationReason ? `<p><strong>Cancellation Reason:</strong> ${cancellationReason}</p>` : ''}
      <h3 style="color: #0B1426;">Cancelled Order Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 8px; text-align: left; background-color: #f4f4f4;">Item</th>
            <th style="padding: 8px; text-align: center; background-color: #f4f4f4;">Quantity</th>
            <th style="padding: 8px; text-align: right; background-color: #f4f4f4;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3 style="color: #0B1426; margin-top: 20px;">Total: ${currencyFormatter.format(total)}</h3>
      <p style="margin-top: 20px;">Please update your inventory and production plans accordingly.</p>
    </div>
  `;
};

export const generateCustomerCancellationEmailTemplate = (
  order: OrderDetails,
) => {
  const { orderId, customerDetails } = order;
  const { name } = customerDetails;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <h2 style="color: #0B1426;">Order Cancellation Confirmation</h2>
      <p>Hi ${name}, your order has been successfully cancelled.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p style="margin-top: 15px;">We're sorry you had to cancel your order. We hope to serve you again soon!</p>
      <p style="margin-top: 30px; font-size: 12px; color: #666;">Thank you for choosing our restaurant.</p>
    </div>
  `;
};
