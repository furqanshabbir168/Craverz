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
// get all reservation
async function getAllReservation(req,res) {
  try{
    const reservations = await reservationModel.find().sort({ createdAt : -1 });

    res.status(200).json({
      success: true,
      reservations,
    });
  }catch(error){
    console.error("Error fetching all reservations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
    });
  }
}
// get single reservation
async function getReservationDetail(req,res) {
  try {
    const reservation = await reservationModel.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ success: false, message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
}
// update status
async function updateReservationStatus(req,res) {
  try {
    const reservationId = req.params.id;
    const { status } = req.body;

    // validate status
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const reservation = await reservationModel.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json({
      success: true,
      message: "Reservation status updated successfully",
    });
  } catch (error) {
    console.error("Update reservation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update reservation status",
      error: error.message,
    });
  }
}
// get todays reservation
async function getTodaysReservation(req,res) {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0); // start of today

    const end = new Date();
    end.setHours(23, 59, 59, 999); // end of today

    // match only today's orders
    const todayReservations = await reservationModel.find({
      createdAt: { $gte: start, $lte: end },
    });

    res.status(200).json({
      success: true,
      todayReservations: todayReservations.length,
    });
  } catch (error) {
    console.error("Error fetching today's reservations:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching today's reservation",
    });
  }
}

export { createReservation, getReservations , getReservationDetail , getAllReservation , updateReservationStatus , getTodaysReservation};
