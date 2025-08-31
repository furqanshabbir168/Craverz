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

    const deliveryFee = 5;
    const totalAmount = amount + deliveryFee;

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
          unit_amount: deliveryFee * 100,
        },
        quantity: 1,
      },
    ];

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

    const newOrder = new orderModel({
      userId: req.user.id,
      items,
      amount: totalAmount,
      address,
      status: "Food Processing",
      payment: {
        method: "Stripe",
        status: "Pending",
        transactionId: null,
        sessionId: session.id,
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
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const order = await orderModel.findOne({
          "payment.sessionId": session.id,
        });

        if (order) {
          order.payment.status = "Paid";
          order.payment.transactionId = session.payment_intent;
          await order.save();

          // Send Stripe payment confirmation email
          await sendEmail(order.address.email, "Your Cravez Order Confirmation", `
  <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background-color: #ffffff;">
    <h2 style="text-align: center; color: #e63946;">🍔 Payment Confirmed - <span style="color: #e63946; font-weight: bold;">CRAVEZ</span></h2>

    <p style="font-size: 16px; color: #333;">Hi <strong>${order.address.firstName} ${order.address.lastName}</strong>,</p>

    <p style="font-size: 15px; color: #333; line-height: 1.6;">
      We’re excited to let you know that your payment has been <strong style="color: green;">successfully processed</strong> 
      and your order is now being prepared by our team!
    </p>

    <p style="font-size: 15px; color: #333;">
      <strong>Order Number:</strong> ${order._id} <br/>
      <strong>Payment Method:</strong> Stripe (Paid) <br/>
      <strong>Status:</strong> ${order.status}
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
        ${order.items.map(item => `
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${item.name}</td>
            <td align="center" style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${item.quantity}</td>
            <td align="right" style="padding: 8px; border-bottom: 1px solid #f0f0f0;">$ ${item.price * item.quantity}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <p style="font-size: 16px; font-weight: bold; text-align: right; margin-top: 16px;">
      Total: $ ${order.items.reduce((total, item) => total + (item.price * item.quantity), 0) + 5} 
      <br/><span style="font-size: 13px; color: #666;">(including $5 delivery fee)</span>
    </p>

    <hr style="margin: 24px 0;" />

    <h3 style="color: #e63946;">📦 Delivery Address</h3>
    <p style="font-size: 15px; color: #333; line-height: 1.6; margin: 0;">
      ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}, ${order.address.country}<br/>
      <strong>Phone:</strong> ${order.address.phone}
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
        }
        
        break;
      }

      case "payment_intent.succeeded": {
        const intent = event.data.object;
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
          { 
            status: "Cancelled",
            "payment.status": "Failed" 
          }
        );
        break;
      }

      default:
        break;
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
// get user orders
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
// get all orders
async function getAllOrders(req,res) {
  try{
    const orders = await orderModel.find().sort({ createdAt : -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  }catch(error){
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
}
// get single order
async function getOrderDetail(req,res) {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}
// add manuall order
async function addManualOrder(req,res) {
  try {
    const { orderType, items, amount, paymentMethod, paymentStatus } = req.body;

    // Basic validation
    if (!orderType || !items || !amount || !paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (!["Dine-in", "Takeaway"].includes(orderType)) {
      return res
        .status(400)
        .json({ success: false, message: "Manual order must be Dine-in or Takeaway" });
    }

    const newOrder = new orderModel({
      orderType,
      items,
      amount,
      status: "Completed", // manual orders are completed by default
      payment: {
        method: paymentMethod,
        status: paymentStatus || "Paid", // assume paid if admin enters manually
      },
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    console.error("Error adding manual order:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
}
// update order status
// update order (status or payment or both)
async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.id;
    const updateData = req.body; // can be { status: "Delivered" } OR { "payment.status": "Paid" }

    if (!orderId || !updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order ID and update data are required",
      });
    }


    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
// get today's revenue and orders count
async function getTodayStats(req, res) {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // start of today

    const end = new Date();
    end.setHours(23, 59, 59, 999); // end of today

    // match only today's orders
    const todayOrders = await orderModel.find({
      createdAt: { $gte: start, $lte: end },
    });

    // revenue = sum of amounts
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.amount, 0);

    res.status(200).json({
      success: true,
      todayOrders: todayOrders.length,
      todayRevenue,
    });
  } catch (error) {
    console.error("Error fetching today's stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching today's stats",
    });
  }
}
// Get sold categories
async function getCategorySales(req, res) {
  try {
    const categorySales = await orderModel.aggregate([
      { $unwind: "$items" }, // flatten items array
      {
        $group: {
          _id: "$items.category",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$totalSold"
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: categorySales
    });
  } catch (error) {
    console.error("Get Category Sales Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}
// Get order type distribution
async function getOrderTypeDistribution(req, res) {
  try {
    const orderTypes = await orderModel.aggregate([
      {
        $group: {
          _id: "$orderType",
          count: { $sum: 1 }, // count how many orders per type
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: "$count",
        },
      },
    ]);

    res.status(200).json({ success: true, data: orderTypes });
  } catch (error) {
    console.error("Get Order Type Distribution Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}




export {placeCashOrder , getOrders , placeStripeOrder , stripeWebhook , getAllOrders , getOrderDetail , addManualOrder , updateOrderStatus , getTodayStats , getCategorySales , getOrderTypeDistribution}