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
    const user = await userModels.find();
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
    const imageUpload = upload.single("Avatar");
    imageUpload(req, res, function (err) {
      if (err) {
        return res.status(500).json({ Message: err.message });
      }
      console.log(req.body);
      const { First_Name, Last_Name, Email, Password, Mobile } = req.body;

      let Avatar = null;

      if (req.file !== undefined) {
        Avatar = req.file.filename;
      }
      const createUserRecord = new userModels({
        First_Name,
        Last_Name,
        Email,
        Password,
        Mobile,
        Avatar,
      });

      createUserRecord.save();

      if (createUserRecord) {
        return res.status(201).json({
          data: createUserRecord,
          Message: "Data Created Sucessfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const imageUpload = upload.single("Avatar");
    imageUpload(req, res, async function (err) {
      const id = req.params.user_id;
      const { Date_Of_Birth, Gender, About } = req.body;

      const findUser = await userModels.findOne({ _id: id });
      let Avatar = findUser.Avatar;

      if (req.file !== undefined) {
        Avatar = req.file.filename;

        console.log(findUser.Avatar);
        if (fs.existsSync("./uploads/users/" + findUser.Avatar)) {
          fs.unlinkSync("./uploads/users/" + findUser.Avatar);
        }
      }

      const userUpdateRecord = await userModels.updateOne(
        { _id: id },
        {
          $set: {
            Date_Of_Birth: Date_Of_Birth,
            Gender: Gender,
            About: About,
            Avatar: Avatar,
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
    let image = findUser.Avatar;

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
    const { First_Name, Last_Name, Email, Password, Mobile } = req.body;
    console.log(Email);
    const isEmail = validator.isEmail(Email);
    const isPassword = validator.isStrongPassword(Password);

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

    const existingUser = await userModels.findOne({ Email: Email });
    if (existingUser) {
      return res.status(200).json({
        Message: "User Already Exists ",
      });
    }

    const passToString = Password.toString();

    const encrpytPassword = bcrypt.hashSync(passToString, 10);

    // const OTP = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    // });

    const newUser = await userModels({
      First_Name,
      Last_Name,
      Email,
      Password: encrpytPassword,
      Mobile,
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
    const { Email, Password } = req.body;

    const isEmail = validator.isEmail(Email);
    const isPassword = validator.isStrongPassword(Password);

    if (!isEmail && !isPassword) {
      return res.status(400).json({
        Message:
          "Please Check Your Credentials before Login and passsword must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,",
      });
    }

    const checkUser = await userModels.findOne({ Email: Email });
    if (!checkUser) {
      return res.status(400).json({
        Message: "Enter Valid Email Address",
      });
    }

    const passwordCompare = await bcrypt.compare(Password, checkUser.Password);
    if (!passwordCompare) {
      return res.status(400).json({
        Message: "Invlaid credetianls",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser.user_id,
        Email: checkUser.Email,
      },
      "mySecrectKey",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      token: token,
      Message: "Sucessfully Logins",
    });
  } catch (error) {
    return res.stauts(500).json({
      Message: error.message,
    });
  }
};

export const OTPLogin = async (req, res) => {
  try {
    const { Mobile, OTP } = req.body;

    if (!Mobile) {
      return res.status(400).json({
        Message: "Invalid Mobile Number",
      });
    }

    const findUser = await userModels.findOne({ Mobile: Mobile });

    if (!findUser) {
      return res.status(400).json({
        Message: "Contact Do Not Exists Please Create An Account",
      });
    }

    if (findUser.OTP !== OTP) {
      return res.status(400).json({
        Message: "Incorrect OTP",
      });
    }

    const token = jwt.sign(
      {
        id: findUser.id,
        email: findUser.Email,
      },
      "mySecrectKey",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      Message: "Login Sucessfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const generateOTP = async (req, res) => {
  try {
    const { Mobile } = req.body;

    const findUserData = await userModels.findOne({ Mobile: Mobile });

    let OTP;

    if (findUserData.Mobile == Mobile) {
      OTP = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      console.log(OTP);
    }

    if (!findUserData) {
      return res.status(400).json({
        Message: "Invalid Number",
      });
    }

    const getOTP = await userModels.updateOne(
      { Mobile: Mobile },
      {
        $set: {
          OTP: OTP,
        },
      }
    );

    if (getOTP) {
      return res.status(200).json({
        Message: "OTP Generated Sucessufully",
        Data: OTP,
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
