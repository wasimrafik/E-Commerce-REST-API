import categoryModels from "../Models/category.model";
import multer from "multer";
import fs from "fs";
import path from "path";

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
    const { name } = req.body;

    const categoryData = new categoryModels({
      name: name,
    });
    categoryData.save();
    if (categoryData) {
      return res.status(201).json({
        data: categoryData,
        message: "Category Added Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.category_id;
    const { name } = req.body;

    const findUpdateCategory = await categoryModels.findOne({ _id: id });

    const updateCategory = await categoryModels.updateOne(
      { _id: id },
      {
        $set: {
          name: name,
        },
      }
    );
    if (updateCategory.acknowledged) {
      return res.status(200).json({
        Data: updateCategory,
        Message: "Update The Category Sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

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
