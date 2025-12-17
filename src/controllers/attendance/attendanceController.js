import { Attendance } from "../../models/attendanceModel.js";

export const getAttendanceByDate = async (req, res) => {
  try {
    let UserId = req.user.id; // Logged in user ID
    let { date } = req.query;
    // Normalize date to 00:00:00 for consistency
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    const attendanceRecord = await Attendance.findOne({
      createdBy: UserId,
      date: normalizedDate,
    });

    if (!attendanceRecord) {
      return res
        .status(404)
        .json({ message: "No attendance record found for this date." });
    }
    return res.status(200).json({
      success: true,
      message: "Attendance record retrieved successfully",
      data: attendanceRecord,
    });
  } catch (err) {
    console.error("Error in getAttendanceByDate:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// export const addAttendance = async (req, res) => {
//   try {
//     let UserId = req.user.id; // Logged in user ID
//     let { date } = req.body;

//     // Normalize date to 00:00:00 for consistency
//     const normalizedDate = new Date(date);
//     normalizedDate.setHours(0, 0, 0, 0);

//     // Check if attendance already exists for this user on the given date
//     const existingAttendance = await Attendance.findOne({
//       createdBy: UserId,
//       date: normalizedDate,
//     });

//     if (existingAttendance) {
//       return res
//         .status(400)
//         .json({ message: "Attendance for this date already recorded." });
//     }

//     // Create new attendance record
//     const newAttendance = new Attendance({
//       createdBy: UserId,
//       date: normalizedDate,
//       status: "present", // Default status
//     });

//     await newAttendance.save();
//     return res.status(201).json({
//       success: true,
//       message: "Attendance marked successfully",
//     });
//   } catch (err) {
//     console.error("Error in addAttendance:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

export const addAttendance = async (req, res) => {
  try {
    const userId = req.user.id;
    const { date, checkInTime } = req.body;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    if (!userId) {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    // Normalize date (00:00:00)
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    // Check if already checked in
    const existingAttendance = await Attendance.findOne({
      createdBy: userId,
      date: normalizedDate,
    });

    

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for this date",
      });
    }

    // Create attendance with ONLY check-in time
    const attendance = await Attendance.create({
      createdBy: userId,
      date: normalizedDate,
      checkInTime: checkInTime ? new Date(checkInTime) : new Date(),
      status: "present",
    });

    return res.status(201).json({
      success: true,
      message: "Check-in recorded successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Error in addAttendance:", err);
    return res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
  }
};

export const updateAttendance = async (req, res) => {
  try {
    const userId = req.user.id; // admin or staff
    const { attendanceId, checkInTime, checkOutTime } = req.body;

    if (!userId && userId.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    if (!attendanceId) {
      return res.status(400).json({ message: "Attendance ID is required" });
    }

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    // Update values if provided
    if (checkInTime) {
      attendance.checkInTime = new Date(checkInTime);
    }

    if (checkOutTime) {
      attendance.checkOutTime = new Date(checkOutTime);
    }

    // Validation: checkout must be after checkin
    if (
      attendance.checkInTime &&
      attendance.checkOutTime &&
      attendance.checkOutTime <= attendance.checkInTime
    ) {
      return res.status(400).json({
        message: "Check-out time must be after check-in time",
      });
    }

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Check-in / Check-out time updated successfully",
      data: attendance,
    });
  } catch (err) {
    console.error("Update attendance error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export const deleteAttendance = async (req, res) => {
  try {
    const userId = req.user.id; // admin or staff
    const { attendanceId } = req.body;
    if (!userId && userId.role !== "Admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }
    if (!attendanceId) {
      return res.status(400).json({ message: "Attendance ID is required" });
    }

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    await Attendance.findByIdAndDelete(attendanceId);
    return res.status(200).json({
      success: true,
      message: "Attendance record deleted successfully",
    });
  } catch (err) {
    console.error("Delete attendance error:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};
