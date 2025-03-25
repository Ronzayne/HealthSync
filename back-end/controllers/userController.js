import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import axios from "axios";
//Api to user sign up /register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }
    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ succes: false, message: "Enter a valid email" });
    }

    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save(); // user will be saved in the database

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ succes: false, message: error.message });
  }
};

//Api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }); // query method to find a single documents that match
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user profile data

const getProfile = async (req, res) => {
  try {
    const token = req.headers.token; // Extract token from headers

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token is required" });
    }

    // Verify the token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Fetch user data
    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

//Api to update user profile
const updateProfile = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    // Extract userId from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    console.log("Updating user:", userId); // Debug log

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: JSON.parse(address),
        dob,
        gender,
      },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updatedUser.image = imageUpload.secure_url;
      await updatedUser.save();
    }

    console.log("Updated user data:", updatedUser); // Debug log

    res.json({
      success: true,
      message: "Profile Updated",
      userData: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token required" });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { docId, slotDate, slotTime } = req.body;

    // Fetch doctor and user data
    const docData = await doctorModel.findById(docId).select("-password");
    const userData = await userModel.findById(userId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    // Rest of your existing slot booking logic...
    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    // Create/save appointment
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update doctor's slots
    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//Api the user's list of appointments in my-appointment pagae
const listAppointment = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token required" });
    }

    // Verify token and get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//Api to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Token required" });
    }

    // Extract userId from token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify ownership
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    // Rest of your existing logic...
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Release doctor's slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//api to make payment of appointment using paystack
const paymentPayStack = async (req, res) => {
  try {
    console.log("Received request at /payment-paystack", req.body);

    const { appointmentId, email } = req.body;
    if (!appointmentId || !email) {
      console.log("Missing required fields:", { appointmentId, email });
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Fetch appointment details
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }
    console.log("Appointment found:", appointmentData);

    // Creating options for Paystack payment
    const options = {
      amount: appointmentData.amount * 100, // Convert amount
      email: email,
      currency: process.env.CURRENCY || "NGN",
      reference: `APPT_${appointmentId}_${Date.now()}`, // Unique reference
      callback_url: `${process.env.FRONTEND_URL}/my-appointments`, // Redirect after payment
    };
    console.log("Sending data to Paystack:", options);
    // Make request to Paystack API
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      options,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Paystack Response:", response.data);

    // Return authorization URL to frontend
    if (response.data.status) {
      return res.json({
        success: true,
        paymentUrl: response.data.data.authorization_url,
      });
    } else {
      return res.json({
        success: false,
        message: "Paystack initialization failed",
      });
    }
  } catch (error) {
    console.error(
      "Error making Paystack request:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      success: false,
      message: error.response ? error.response.data.message : error.message,
    });
  }
};

//Api to verify payment of paystack
const verifyPaystackPayment = async (req, res) => {
  try {
    const { reference } = req.body;

    // Validate reference format
    if (!reference || !reference.includes("_")) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment reference",
      });
    }

    // Verify with PayStack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paymentData = response.data;

    // Check if appointment exists
    const appointmentId = reference.split("_")[1];
    const existingAppointment = await appointmentModel.findById(appointmentId);
    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // Check if already paid
    if (existingAppointment.payment) {
      return res.json({
        success: false,
        message: "Payment already processed for this appointment",
      });
    }

    // Process successful payment
    if (paymentData.status && paymentData.data.status === "success") {
      const paymentInfo = {
        amount: paymentData.data.amount / 100,
        currency: paymentData.data.currency,
        transactionReference: paymentData.data.reference,
        status: paymentData.data.status,
        paidAt: new Date(paymentData.data.paid_at),
        paymentMethod: paymentData.data.channel,
        customerEmail: paymentData.data.customer.email,
        metadata: paymentData.data.metadata || {},
      };

      const updatedAppointment = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        {
          $set: {
            payment: true,
            paymentReference: paymentInfo.transactionReference,
            paymentInfo,
            paidAt: paymentInfo.paidAt,
          },
        },
        { new: true }
      );

      return res.json({
        success: true,
        message: "Payment verified and recorded",
        appointment: updatedAppointment,
      });
    }

    // Handle failed/abandoned payments
    return res.json({
      success: false,
      message: "Payment not completed",
      data: paymentData.data,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentPayStack,
  verifyPaystackPayment,
};
