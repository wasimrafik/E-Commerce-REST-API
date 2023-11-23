import userModels from "../Models/user.moduel";
import multer from "multer";
import fs from "fs";
import path from "path";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageFolder = "./uploads";
    const avatar = "users";

    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
    }
    const mergeFolder = path.join(imageFolder, avatar);

    if (!fs.existsSync(mergeFolder)) {
      fs.mkdirSync(mergeFolder);
    }
    cb(null, mergeFolder);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const saveNameInArray = originalName.split(".");
    saveNameInArray.pop();
    const joinNameArray = saveNameInArray.join(".");
    const updatedName = joinNameArray + "-" + Date.now() + ext;
    cb(null, updatedName);
  },
});

const upload = multer({ storage });

export const getUser = async (req, res) => {
  try {

    const id = req.params.userID;
    
    const user = await userModels.findOne({_id: id});
    if (user) {
      return res.status(200).json({
        data: user,
        Message: "User Data Fetched",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  try {

      console.log(req.body);
      const { name, email, password, mobile } = req.body;

      const passToString = password.toString();

    const encrpytPassword = bcrypt.hashSync(passToString, 10);

      const createUserRecord = new userModels({
        name: name,
        email,
        password: encrpytPassword,
        mobile,
      });

      createUserRecord.save();

      if (createUserRecord) {
        return res.status(201).json({
          data: createUserRecord,
          Message: "Data Created Sucessfully",
        });
      }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const imageUpload = upload.single("avatar");
    imageUpload(req, res, async function (err) {
      const id = req.params.user_id;
      const { name, email, password, mobile } = req.body;

      const findUser = await userModels.findOne({ _id: id });
      let avatar = findUser.avatar;

      if (req.file !== undefined) {
        avatar = req.file.filename;

        console.log(findUser.avatar);
        if (fs.existsSync("./uploads/users/" + findUser.avatar)) {
          fs.unlinkSync("./uploads/users/" + findUser.avatar);
        }
      }

      const passToString = password.toString();

    const encrpytPassword = bcrypt.hashSync(passToString, 10);

      const userUpdateRecord = await userModels.updateOne(
        { _id: id },
        {
          $set: {
            name,
            email,
            password: encrpytPassword,
            mobile,
            avatar,
          },
        }
      );

      if (userUpdateRecord.acknowledged) {
        return res.status(201).json({
          data: userUpdateRecord,
          Message: "User Data Updated ",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.user_id;

    const findUser = await userModels.findOne({ _id: id });
    let image = findUser.avatar;

    if (fs.existsSync("./uploads/users/" + image)) {
      fs.unlinkSync("./uploads/users/" + image);
    }

    const deleteUserRecord = await userModels.deleteOne({ _id: id });
    if (deleteUserRecord.acknowledged) {
      return res.status(202).json({
        Data: deleteUserRecord,
        Message: "User Record Deleted Sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const signUP = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    console.log(email);
    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);

    if (!isEmail) {
      return res.status(400).json({
        Message: "Invalid Email",
      });
    } else if (!isPassword) {
      return res.status(400).json({
        Message:
          "passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
      });
    }

    const existingUser = await userModels.findOne({ email: email });
    if (existingUser) {
      return res.status(200).json({
        Message: "User Already Exists ",
      });
    }

    const passToString = password.toString();

    const encrpytPassword = bcrypt.hashSync(passToString, 10);

    // const OTP = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    // });

    const newUser = await userModels({
      name,
      email,
      password: encrpytPassword,
      mobile,
      // OTP,
    });

    newUser.save();

    if (newUser) {
      return res.status(201).json({
        Data: newUser,
        Message: "New User Created Sucessfulyy",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const isEmail = validator.isEmail(email);
    const isPassword = validator.isStrongPassword(password);

    if (!isEmail && !isPassword) {
      return res.status(400).json({
        Message:
          "Please Check Your Credentials before Login and passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
      });
    }

    const checkUser = await userModels.findOne({ email: email });
    if (!checkUser) {
      return res.status(400).json({
        Message: "Enter Valid email",
      });
    }

    const passwordCompare = await bcrypt.compare(password, checkUser.password);
    if (!passwordCompare) {
      return res.status(400).json({
        Message: "Invlaid credetianls password",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.user_id,
        email: checkUser.email,
      },
      "token",
      {
        expiresIn: "1h",
      }
    );
      console.log(checkUser);
    return res.cookie("token", token).json({
      Data: checkUser._id,
      token: token,
      Message: "Sucessfully Login",
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

// export const OTPLogin = async (req, res) => {
//   try {
//     const { mobile  } = req.body;

//     if (!mobile) {
//       return res.status(400).json({
//         Message: "Invalid Mobile Number",
//       });
//     }

//     const findUser = await userModels.findOne({ mobile: mobile });

//     if (!findUser) {
//       return res.status(400).json({
//         Message: "Contact Do Not Exists Please Create An Account",
//       });
//     }

//     if (findUser.OTP !== OTP) {
//       return res.status(400).json({
//         Message: "Incorrect OTP",
//       });
//     }

//     const token = jwt.sign(
//       {
//         id: findUser.id,
//         email: findUser.email,
//       },
//       "mySecrectKey",
//       {
//         expiresIn: "1h",
//       }
//     );

//     return res.status(200).json({
//       Message: "Login Sucessfully",
//       token: token,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };

// export const generateOTP = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     const findUserData = await userModels.findOne({ mobile: mobile });

//     let OTP;

//     if (findUserData.mobile == mobile) {
//       OTP = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         specialChars: false,
//       });
//       console.log(OTP);
//     }

//     if (!findUserData) {
//       return res.status(400).json({
//         Message: "Invalid Number",
//       });
//     }

//     const getOTP = await userModels.updateOne(
//       { mobile: mobile },
//       {
//         $set: {
//           OTP: OTP,
//         },
//       }
//     );

//     if (getOTP) {
//       return res.status(200).json({
//         Message: "OTP Generated Sucessufully",
//         Data: OTP,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       Message: error.message,
//     });
//   }
// };
