import jwt from "jsonwebtoken";
import { sendMailLink } from "../../utils/sendMail.js";
import { Role } from "../../models/roleModel.js";

export const sendLink = async (req, res) => {
  try {
    let { email, link } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!link) {
      return res
        .status(400)
        .json({ success: false, message: "Link is required" });
    }

    const token = jwt.sign({ email, mobileNumber }, process.env.JWTKEY, {
      expiresIn: "15m",
    });

    // Append token to the original link
    const secureLink = `${link}?token=${token}`;

    await sendMailLink(email, secureLink);

    res
      .status(200)
      .json({ success: true, message: "Link sent successfully to email" });
  } catch (error) {
    console.error("Error sending link:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
     // ❌ Fields user is NOT allowed to update
    const restrictedFields = [
      "role",
      "password",
      "email",
      "payments",
      "isActive",
    ];

    restrictedFields.forEach((field) => {
      if (field in req.body) {
        delete req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");


    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addRole = async(req,res)=>{
  try {
    let {roleName}=req.body;
    console.log('=====req.body=====',req.body)
    if(!roleName){
      return res.status(400).json({success:false,message:"roleName are required"})
    }

    await Role.create({name:roleName});
    
    res.status(200).json({success:true,message:"Role added successfully"})
  } catch (error) {
  console.log("Error adding role:", error);
  res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
