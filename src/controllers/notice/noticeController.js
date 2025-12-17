import { Notice } from "../../models/noticeModel.js";

export const getNotice = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const { role } = req.user;

    const notices = await Notice.find({
      isActive: true,
      targetAudience: { $in: ["ALL", role] },
    })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notices.length,
      data: notices,
    });

  } catch (error) {
    console.error("Error fetching notices:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createNotice = async (req, res) => {
  try {
    const user = req.user;

    if (!user || (user.role !== "admin" )) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const noticeData = req.body;
    noticeData.createdBy = user._id;

    const newNotice = new Notice(noticeData);
    await newNotice.save();

    return res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: newNotice,
    });

  } catch (error) {
    console.error("Error creating notice:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateNotice = async (req, res) => {
  try {
    const user = req.user;
    const noticeId = req.params.id;
    const updateData = req.body;

    if (!user || (user.role !== "admin" )) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const notice = await Notice.findById(noticeId);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    Object.assign(notice, updateData);
    await notice.save();

    return res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      data: notice,
    });

  } catch (error) {
    console.error("Error updating notice:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const user = req.user;
    const {ids} = req.body
    
    if (!user.role=="Admin") {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }


    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "User not authorized to delete this notice",
      });
    }

    await Notice.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting notice:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
