import mongoose from "mongoose";
import dotenv from "dotenv";
import FAQModel from "../models/faqModel.js";

dotenv.config();

const seedFAQs = async () => {
  try {
    await mongoose.connect(process.env.MONGOODB_URI);

    await FAQModel.deleteMany(); // clear old FAQs

    await FAQModel.insertMany([
      {
        topic: "Orders",
        questions: [
          { question: "How can I place an order?", answer: "You can place an order directly from our website by selecting your food items and adding them to your cart, then proceeding to checkout." },
          { question: "Can I cancel my order after placing it?", answer: "Orders can be cancelled within 10 minutes of placing them from your account dashboard." },
          { question: "Can I modify my order?", answer: "Yes, you can modify your order within 10 minutes of placing it by contacting our support." },
          { question: "Will I get confirmation after placing an order?", answer: "Yes, you will receive an email and SMS confirmation once your order is placed." },
          { question: "What happens if my order fails?", answer: "If your order fails, no payment is deducted. You can retry placing the order." },
          { question: "How do I track my order?", answer: "You can track your order status live from the 'My Orders' section in your account." }
        ]
      },
      {
        topic: "Reservations",
        questions: [
          { question: "How can I reserve a table?", answer: "You can reserve a table through our reservation page by selecting date, time, and number of guests." },
          { question: "Do I get confirmation for my reservation?", answer: "Yes, we send confirmation via email and SMS once the reservation is confirmed." },
          { question: "Can I change my reservation time?", answer: "Yes, you can update your reservation from the 'My Reservations' section before 2 hours of the reserved time." },
          { question: "Can I cancel my reservation?", answer: "Yes, reservations can be cancelled from your account dashboard." },
          { question: "What happens if I miss my reservation?", answer: "If you do not arrive within 20 minutes of your reserved time, the table may be released." },
          { question: "Is advance payment required for reservation?", answer: "No advance payment is required for reservations at the moment." }
        ]
      },
      {
        topic: "Payments",
        questions: [
          { question: "Which payment methods are available?", answer: "We support Cash on Delivery and online payments via Stripe." },
          { question: "Is my payment secure?", answer: "Yes, we use Stripe for online transactions which ensures bank-grade security." },
          { question: "Can I pay in cash?", answer: "Yes, you can choose Cash on Delivery as a payment method." },
          { question: "What happens if my online payment fails?", answer: "If your payment fails, the order will not be placed and no money will be deducted." },
          { question: "Will I get a payment receipt?", answer: "Yes, a payment receipt is sent to your registered email after a successful payment." },
          { question: "Can I change payment method after order?", answer: "No, once an order is placed you cannot change the payment method." }
        ]
      },
      {
        topic: "Account",
        questions: [
          { question: "Do I need an account to order?", answer: "Yes, creating an account helps us track your orders and provide better service." },
          { question: "How do I reset my password?", answer: "You can reset your password from the login page by clicking 'Forgot Password'." },
          { question: "Can I update my profile information?", answer: "Yes, you can update your name, email, and phone number in your account settings." },
          { question: "How do I delete my account?", answer: "You can request account deletion by contacting our support team." },
          { question: "Can I see my past orders?", answer: "Yes, your past orders are listed in the 'My Orders' section." },
          { question: "Do I need to verify my email?", answer: "Yes, we send a verification email to confirm your account." }
        ]
      },
      {
        topic: "Delivery",
        questions: [
          { question: "What is the average delivery time?", answer: "The average delivery time is 30–40 minutes depending on your location." },
          { question: "Can I schedule my delivery?", answer: "Yes, you can choose a preferred delivery time during checkout." },
          { question: "What if my delivery is late?", answer: "If delivery is delayed, we notify you via SMS and email with updated time." },
          { question: "Do you charge delivery fees?", answer: "Delivery fees depend on your location and order amount. Free delivery is available on large orders." },
          { question: "Can I track my delivery?", answer: "Yes, you can track your delivery live in the 'My Orders' section." },
          { question: "Do you deliver to all locations?", answer: "Currently, we deliver to specific areas within our service range shown at checkout." }
        ]
      },
      {
        topic: "General Info",
        questions: [
          { question: "What are your working hours?", answer: "We operate daily from 10 AM to 11 PM." },
          { question: "Do you have vegetarian options?", answer: "Yes, we offer a wide variety of vegetarian dishes." },
          { question: "Do you provide catering services?", answer: "Yes, we offer catering services for events and parties." },
          { question: "Do you have a mobile app?", answer: "Currently, we only have a web app, mobile app is coming soon." },
          { question: "Do you offer discounts?", answer: "Yes, discounts and offers are listed on our promotions page." },
          { question: "How can I contact support?", answer: "You can contact support through the 'Contact Us' page or by calling our helpline." }
        ]
      }
    ]);

    console.log("✅ FAQ Seed Data Inserted Successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting FAQs:", error);
    process.exit(1);
  }
};

seedFAQs();
