import categoryModels from "../Models/category.model";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageFolder = "./uploads";
    const subFolder = "category";

    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
    }
    const subFolderPath = path.join(imageFolder, subFolder);
    if (!fs.existsSync(subFolderPath)) {
      fs.mkdirSync(subFolderPath);
    }
    cb(null, subFolderPath);
  },

  filename: function (req, file, cb) {
    const name = file.originalname; // abc.png
    const ext = path.extname(name); // .png
    const nameArr = name.split("."); // [abc,png]
    nameArr.pop();
    const fname = nameArr.join("."); //abc
    const fullname = fname + "-" + Date.now() + ext; // abc-12345.png
    cb(null, fullname);
  },
});

const upload = multer({ storage });

export const getCategory = async (req, res) => {
  try {
    const getCategoryData = await categoryModels.find();

    if (getCategoryData) {
      return res.status(200).json({
        Data: getCategoryData,
        Message: "Category Data Fetch Sucessful",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addCategory = (req, res) => {
  try {
    const uploadImage = upload.single("image");
    uploadImage(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const { name } = req.body;
      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
      }

      const categoryData = new categoryModels({
        name: name,
        image: image,
      });
      categoryData.save();
      if (categoryData) {
        return res.status(201).json({
          data: categoryData,
          message: "Category Added Successfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const updateImage = upload.single("image");
    updateImage(req, res, async function (err) {
      if (err) return res.status(400).json({ Message: err.message });
      const id = req.params.category_id;
      const { name } = req.body;

      const findUpdateCategory = await categoryModels.findOne({ _id: id });
      let image = findUpdateCategory.image;

      if (req.file !== undefined) {
        image = req.file.filename;

        if (fs.existsSync("./uploads/category/" + findUpdateCategory.image)) {
          fs.unlinkSync("./uploads/category/" + findUpdateCategory.image);
        }
      }

      const updateCategory = await categoryModels.updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            image: image,
          },
        }
      );
      if (updateCategory.acknowledged) {
        return res.status(200).json({
          Data: updateCategory,
          Message: "Update The Category Sucessfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;
    const findCategory = await categoryModels.findOne({ _id: category_id });

      if (fs.existsSync("./uploads/category/" + findCategory.image)) {
          console.log("Deleted Image");
        fs.unlinkSync("./uploads/category/" + findCategory.image);
      }

    const deleteCategory = await categoryModels.deleteOne({ _id: category_id });

    if (deleteCategory.acknowledged) {
      return res.status(200).json({
        Data: deleteCategory,
        Message: "Delete Scuessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
