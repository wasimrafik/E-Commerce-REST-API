import sub_CategoryModel from "../Models/sub_categories.model";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageFolder = "./uploads";
    const subImageFolder = "subCategory";

    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
    }

    const mergeFolder = path.join(imageFolder, subImageFolder);

    if (!fs.existsSync(mergeFolder)) {
      fs.mkdirSync(mergeFolder);
    }

    cb(null, mergeFolder);
  },

  filename: function (req, file, cb) {
    const imageName = file.originalname;
    const ext = path.extname(imageName);
    const imageArray = imageName.split(".");
    imageArray.pop();
    const joinImageName = imageArray.join(".");
    const updateImageName = joinImageName + "-" + Date.now() + ext;
    cb(null, updateImageName);
  },
});

const upload = multer({ storage });

export const getSub_category = async (req, res) => {
  try {
    const getSubCategory = await sub_CategoryModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "CategoryID",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
    ]);
    if (getSubCategory) {
      return res.status(200).json({
        Data: getSubCategory,
        Message: "Got the Aggrigate",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const getSingleSub_category = async (req, res) => {
  try {
    const id = req.params.sub_category_id;
    const getSingleSub_category = await sub_CategoryModel.findOne({ _id: id });

    if (getSingleSub_category) {
      return res.status(200).json({
        Data: getSingleSub_category,
        Message: "Single Category Data Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addSub_category = async (req, res) => {
  try {
    const imageUpload = upload.single("image");
    imageUpload(req, res, function (err) {
      if (err) return res.status(500).json({ Message: err.message });
      const { Name, CategoryID } = req.body;

      let image = null;
      console.log(image, "ppp");

      if (req.file !== undefined) {
        image = req.file.filename;
      }
      console.log(image, req.file);
      const createAddSubCategory = new sub_CategoryModel({
        Name,
        CategoryID,
        image,
      });

      createAddSubCategory.save();

      if (createAddSubCategory) {
        return res.status(200).json({
          Data: createAddSubCategory,
          Message: "Data Created Sucessfullty",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const updateSub_category = async (req, res) => {
  try {
    const imageUplaod = upload.single("image");
    imageUplaod(req, res, async function (err) {
      if (err) return res.status(500).json({ Message: err.message });

      const id = req.params.sub_category_id;

      const { Name } = req.body;
      console.log(req.body);

      const subcategoryData = await sub_CategoryModel.findOne({
        _id: id,
      });

      console.log(subcategoryData);
      let image = subcategoryData.image;

      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./uploads/subCategory/" + subcategoryData.image)) {
          fs.unlinkSync("./uploads/subCategory/" + subcategoryData.image);
        }
      }

      console.log(image);

      const updateSubCategory = await sub_CategoryModel.updateOne(
        { _id: id },
        {
          $set: {
            Name,
            image,
          },
        }
      );

      if (updateSubCategory.acknowledged) {
        return res.status(200).json({
          Data: updateSubCategory,
          Message: "Updated SucessFully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteSub_category = async (req, res) => {
  try {
    const id = req.params.sub_category_id;

    const DeleteSubCategoryFindById = await sub_CategoryModel.findOne({
      _id: id,
    });

    if (
      fs.existsSync("./uploads/subCategory/" + DeleteSubCategoryFindById.image)
    ) {
      fs.unlinkSync("./uploads/subCategory/" + DeleteSubCategoryFindById.image);
    }
    const deletesubCategory = await sub_CategoryModel.deleteOne({ _id: id });

    if (deletesubCategory.acknowledged) {
      return res.status(200).json({
        Data: deletesubCategory,
        Message: "Deleted Sucesfull",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
