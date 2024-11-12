// authController.js
import bcrypt from "bcryptjs";
import User from "../../model/userSchema.js";
import OTP from "../../model/otpsSchema.js";
import sendmail from "../../utils/services/emailService.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/services/jwtServices.js";
import Request from "../../model/joinRequestSchema.js";
import { OAuth2Client } from "google-auth-library"; 


function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const signup = async (req, res, next) => {
  try {
    const { Username, email, password, role, otp } = req.body;

    if (!Username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (otp) {
      try {
        const otpRecord = await OTP.findOne({ email, otp });

        if (!otpRecord) {
          return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP",
          });
        }

        if (otpRecord.expiresAt < new Date()) {
          await OTP.deleteOne({ email, otp });
          return res.status(400).json({
            success: false,
            message: "OTP has expired",
          });
        }

        const existingUser  = await User.findOne({
          $or: [{ email }, { Username }],
        });

        if (existingUser ) {
          return res.status(400).json({
            success: false,
            message: "Email or Username already exists",
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser  = new User({
          Username,
          email,
          password: hashedPassword,
          role,
        });

        const savedUser  = await newUser .save();

        if (role === 'trainer') {
          const adminUser  = await User.findOne({ role: 'admin' });
          if (adminUser ) {
            const request = new Request({
              requestFrom: 'trainer',
              requesterId: savedUser ._id,
              requestTo: adminUser ._id,
              requestType: 'regRequest',
            });
            await request.save();
          }
        }

        await OTP.deleteOne({ email, otp });

        const accessToken = generateAccessToken(savedUser );
        const refreshToken = generateRefreshToken(savedUser );

        res.cookie("accessToken", accessToken, {
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "strict",
        });

        res.cookie("refreshToken", refreshToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          secure: true,
          sameSite: "strict",
        });

        return res.status(201).json({
          success: true,
          message: "Signup successful",
          user: {
            id: savedUser ._id,
            Username: savedUser .Username,
            email: savedUser .email,
            role: savedUser .role,
          },
        });
      } catch (otpVerificationError) {
        console.log(otpVerificationError);

        return res.status(500).json({
          success: false,
          message: "OTP verification failed",
          error: otpVerificationError.message,
        });
      }
    } else {
      const existingUser  = await User.findOne({
        $or: [{ email }, { Username }],
      });

      if (existingUser ) {
        return res.status(400).json({
          success: false,
          message: "Email or Username already exists",
        });
      }

      const generatedOTP = generateOTP();

      const newOTP = new OTP({
        email,
        otp: generatedOTP,
      });
      console.log(newOTP, "----------------new otp-----------------");
      await newOTP.save();

      try {
        await sendmail(email, generatedOTP);

        const user = new User({
          Username,
          email,
          role,
        });

        return res.status(200).json({
          success: true,
          message: "OTP sent to your email",
          user,
        });
      } catch (emailError) {
        await OTP.deleteOne({ email, otp: generatedOTP });

        return res.status(500).json({
          success: false,
          message: "Failed to send OTP",
          error: emailError.message,
        });
      }
    }
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in signup process",
      error: error.message,
    });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User  not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("accessToken", accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Signin successful",
      user: {
        id: user._id,
        Username: user.Username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in signin process",
      error: error.message,
    });
  }
};

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// export const googleAuth = async (req, res, next) => {
//   console.log((req.body,'llllllllllllllllllllllllllllll'));
//   try {
    
//     const { credential } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: credential,
//       audience: process.env.GOOGLE_CLIENT_ID, 
//     });

//     const payload = ticket.getPayload();
//     console.log(payload,'ooooooooooooooooooooooooooooooooooo');
    
    
//     if (!payload || !payload.email) {
//       return res.status(400).json({ success: false, error: "Invalid token" });
//     }

//     const { email, given_name } = payload;
//     let user = await User.findOne({ email });

//     if (!user) {
//       const randomPassword = Math.random().toString(36).slice(-8);
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);

//       user = new User({
//         Username: given_name || "",
//         email,
//         password: hashedPassword,
//         role: role || "member", 
//       });

//       await user.save();
//     }

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     res.cookie("accessToken", accessToken, {
//       maxAge: 24 * 60 * 60 * 1000,
//       secure: true,
//       sameSite: "strict",
//     });

//     res.cookie("refreshToken", refreshToken, {
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       secure: true,
//       sameSite: "strict",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Google authentication successful",
//       user: {
//         id: user._id,
//         Username: user.Username,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (error) {
//     console.error("Google Auth Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Error in Google authentication process",
//       error: error.message,
//     });
//   }
// };

export default { signup, signin };