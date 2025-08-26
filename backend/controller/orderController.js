import orderModel from "../models/orderModel.js";
import { sendEmail } from "../utils/emailService.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function placeCashOrder(req,res) {
    try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newOrder = new orderModel({
      userId: req.user.id, // from middleware
      items,
      amount,
      address,
      status: "Food Processing",
      payment: {
        method: "Cash on Delivery",
        status: "Pending",
      },
    });

    await newOrder.save();

    // Send COD confirmation email
await sendEmail(address.email, "Your Cravez Order Confirmation", `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background-color: #ffffff;">
    <h2 style="text-align: center; color: #e63946;">🍔 Order Confirmation from <span style="color: #e63946; font-weight: bold;">CRAVEZ</span></h2>

    <p style="font-size: 16px; color: #333;">Hi <strong>${address.firstName} ${address.lastName}</strong>,</p>

    <p style="font-size: 15px; color: #333; line-height: 1.6;">
      Thank you for placing your order with <strong style="color: #e63946;">CRAVEZ</strong>!  
      Your order has been successfully received and is now being processed.  
      One of our team members will contact you shortly to confirm the details.
    </p>

    <p style="font-size: 15px; color: #333;">
      <strong>Order Number:</strong> ${newOrder._id} <br/>
      <strong>Payment Method:</strong> Cash on Delivery (COD) <br/>
      <strong>Status:</strong> ${newOrder.status}
    </p>

    <hr style="margin: 24px 0;" />

    <h3 style="color: #e63946;">📋 Order Details</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
      <thead>
        <tr>
          <th align="left" style="border-bottom: 2px solid #ddd; padding: 8px;">Item</th>
          <th align="center" style="border-bottom: 2px solid #ddd; padding: 8px;">Qty</th>
          <th align="right" style="border-bottom: 2px solid #ddd; padding: 8px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${newOrder.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${item.name}</td>
            <td align="center" style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${item.quantity}</td>
            <td align="right" style="padding: 8px; border-bottom: 1px solid #f0f0f0;">$ ${item.price * item.quantity}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <p style="font-size: 16px; font-weight: bold; text-align: right; margin-top: 16px;">
      Total: $ ${newOrder.items.reduce((total, item) => total + (item.price * item.quantity), 0)}
    </p>

    <hr style="margin: 24px 0;" />

    <h3 style="color: #e63946;">📦 Delivery Address</h3>
    <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0;">
      ${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}<br/>
      <strong>Phone:</strong> ${address.phone}
    </p>

    <hr style="margin: 24px 0;" />

    <p style="font-size: 14px; color: #333; line-height: 1.6;">
      If you have any questions or wish to make changes to your order, please contact our support team at  
      <a href="mailto:support@cravez.com" style="color: #e63946;">support@cravez.com</a> or call <strong>+92 373 42 24 244</strong>.
    </p>

    <p style="font-size: 14px; color: #999; margin-top: 32px; text-align: center;">
      Thank you for choosing <strong style="color: #e63946;">CRAVEZ</strong>. We look forward to serving you! <br/>
      — The CRAVEZ Team
    </p>
  </div>
`);



    res.status(201).json({
      success: true,
      message: "Cash on Delivery order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing COD order:", error);
    res.status(500).json({
      success: false,
      message: "Server error while placing COD order",
    });
  }
}
// Stripe order creation
async function placeStripeOrder(req, res) {
  try {
    const { items, amount, address } = req.body;

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const deliveryFee = 5; // Add delivery charges
    const totalAmount = amount + deliveryFee;

    // Prepare line items for Stripe
    const line_items = [
      ...items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.description || "",
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      })),
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Delivery Charges",
            description: "Delivery Fee",
          },
          unit_amount: deliveryFee * 100, // delivery fee in cents
        },
        quantity: 1,
      },
    ];

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/orders?success=true`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout?canceled=true`,
      metadata: {
        userId: req.user.id,
        address: JSON.stringify(address),
      },
    });

    // Save order in DB
    const newOrder = new orderModel({
      userId: req.user.id,
      items,
      amount: totalAmount,
      address,
      status: "Food Processing",
      payment: {
        method: "Stripe",
        status: "Pending",
        sessionId: session.id,
        transactionId: session.payment_intent, // ✅ store PI here
  },
});


    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Stripe order created successfully",
      sessionId: session.id,
      url: session.url,
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing Stripe order:", error);
    res.status(500).json({
      success: false,
      message: "Server error while placing Stripe order",
    });
  }
}
// verify payment via stripe
async function stripeWebhook(req, res) {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body, // raw body
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        // ✅ update order by sessionId
        const order = await orderModel.findOne({
          "payment.sessionId": session.id,
        });

        if (order) {
          order.payment.status = "Paid";
          order.payment.transactionId = session.payment_intent; // save PI
          order.status = "Confirmed";
          await order.save();
        }
        break;
      }

      case "payment_intent.succeeded": {
        const intent = event.data.object;

        // ✅ update order by paymentIntentId
        const order = await orderModel.findOne({
          "payment.transactionId": intent.id,
        });

        if (order) {
          order.payment.status = "Paid";
          order.status = "Confirmed";
          await order.save();
        }
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object;
        await orderModel.findOneAndUpdate(
          { "payment.sessionId": session.id },
          { status: "Cancelled" }
        );
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
// get orders
async function getOrders(req,res) {
    try {
    const userId = req.user.id; 

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}
export {placeCashOrder , getOrders , placeStripeOrder , stripeWebhook}