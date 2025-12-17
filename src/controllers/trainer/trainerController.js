import { User } from "../../models/userModel.js";

export const allTrainers = async (req, res) => {
  try {
    let user = req.user; // Access the authenticated user from the request object

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "User Not authenticated !!" });
    }

    let trainers = await User.find({ role: "Trainer" });
    res.status(200).json({ success: true, data: trainers });
    // Logic to get all trainers
    res.status(200).json({ message: "List of all trainers" });
  } catch (error) {
    console.error("Error fetching trainers:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addTrainer = async (req, res) => {
  try {
    let user = req.user; // Access the authenticated user from the request object
    const {
      firstName,
      lastName,
      gender,
      email,
      password,
      phone,
      dateOfBirth,
      address,
      specialization,
      experience,
      feesPerSession,
      availability,
      bio,
      emergencyContact,
      certifications,
    } = req.body;

    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "User Not authenticated !!" });
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      specialization?.length === 0 ||
      experience === undefined ||
      feesPerSession === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    if (await User.findOne({ email, phone })) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const trainerRole = await Role.findOne({ name: "trainer" });
    if (!trainerRole) {
      return res.status(500).json({
        success: false,
        message: "Trainer role not found",
      });
    }

    // ✅ Create trainer
    await User.create({
      firstName,
      lastName,
      gender,
      email,
      password,
      phone,
      dateOfBirth,
      address,
      specialization,
      experience,
      feesPerSession,
      availability,
      bio,
      emergencyContact,
      certifications,
      role: trainerRole._id,
    });

    res.status(201).json({
      success: true,
      message: "Trainer added successfully",
    });
  } catch (error) {
    console.error("Error adding trainer:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTrainerById = async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user from the request object
        const trainerId = req.params.id;

        if (user.role !== "admin" && user.role !== "trainer") {
            return res.status(401).json({ success: false, message: "User Not authenticated !!" });
        }
        const trainer = await User.findById(trainerId);

        if (!trainer || trainer.role !== "trainer") {
            return res.status(404).json({ success: false, message: "Trainer not found" });
        }

        res.status(200).json({ success: true, data: trainer });
    } catch (error) {
        console.error("Error fetching trainer by ID:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateTrainer = async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user from the request object
        const trainerId = req.params.id;
        const updateData = req.body;

        if (user.role !== "admin") {
            return res.status(401).json({ success: false, message: "User Not authenticated !!" });
        }

        const trainer = await User.findById(trainerId);

        if (!trainer || trainer.role !== "trainer") {
            return res.status(404).json({ success: false, message: "Trainer not found" });
        }

        Object.assign(trainer, updateData);
        await trainer.save();

        res.status(200).json({ success: true, message: "Trainer updated successfully", data: trainer });
    } catch (error) {
        console.error("Error updating trainer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteTrainer = async (req, res) => {
    try {
        const user = req.user; // Access the authenticated user from the request object
        const trainerId = req.params.id;

        if (user.role !== "admin") {
            return res.status(401).json({ success: false, message: "User Not authenticated !!" });
        }

        const trainer = await User.findById(trainerId);

        if (!trainer || trainer.role !== "trainer") {
            return res.status(404).json({ success: false, message: "Trainer not found" });
        }

        await trainer.remove();

        res.status(200).json({ success: true, message: "Trainer deleted successfully" });
    } catch (error) {
        console.error("Error deleting trainer:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
