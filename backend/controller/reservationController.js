import reservationModel from "../models/reservationModel.js";

// make reservation
async function createReservation(req, res) {
  try {
    const { name, email, date, time, phoneNumber, numberOfGuests, message } = req.body;

    // basic validation
    if (!name || !email || !date || !time || !phoneNumber || !numberOfGuests) {
      return res.status(400).json({
        success: false,
        message: "All required fields (name, email, date, time, phone, guests) must be provided",
      });
    }

    // create new reservation
    const reservation = new reservationModel({
      userId: req.user.id,
      name,
      email,
      date,
      time,
      phoneNumber,
      numberOfGuests,
      message,
    });

    await reservation.save();

    return res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Could not create reservation.",
    });
  }
}

// get reservations request 
async function getReservations(req, res) {
  try {
    const userId = req.user.id;

    // ✅ FIX: should query reservationModel not orderModel
    const reservations = await reservationModel.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error("Error fetching user reservation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
    });
  }
}

export { createReservation, getReservations };
