import productModel from "../Models/product.model";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const imageFolder = "./uploads";
    const productImageFolder = "productImage";

    if (!fs.existsSync(imageFolder)) {
      fs.mkdirSync(imageFolder);
    }

    const mergeImageFolder = path.join(imageFolder, productImageFolder);

    if (!fs.existsSync(mergeImageFolder)) {
      fs.mkdirSync(mergeImageFolder);
    }

    cb(null, mergeImageFolder);
  },
  filename: function (req, file, cb) {
    const imageName = file.originalname;
    const ext = path.extname(imageName);
    const imageNameArray = imageName.split(".");
    imageNameArray.pop();
    const joinName = imageNameArray.join(".");
    const updatedNameWithDate = joinName + "_" + Date.now() + ext;
    cb(null, updatedNameWithDate);
  },
});

const upload = multer({ storage });

export const getProduct = async (req, res) => {
  try {
    const getProduct = await productModel.find()
    if (getProduct) {
      return res.status(200).json({
        Data: getProduct,
        Message: "Product List Data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.productID;

    const getSingleProduct = await productModel.findOne({ _id: id });
    if (getSingleProduct) {
      return res.status(200).json({
        Data: getSingleProduct,
        Message: "Single Product Data Fetch",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const addProduct = (req, res) => {
  try {
    const uploadImage = upload.fields([
      { name: "imageUrl", maxCount: 1 },
      { name: "Images", maxCount: 4 },
    ]);
    console.log(uploadImage);
    uploadImage(req, res, function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const {
        title,
        discription,
        discountedPrice,
        price,
        discountedPercent,
        quantity,
        brand,
        color,
        size,
        Category,
      } = req.body;

      let imageUrl = null;
      if (req.files && req.files["imageUrl"]) {
        imageUrl = req.files["imageUrl"][0].filename;
      }

      console.log(req.files);
      console.log(req.files["imageUrl"]);
      console.log((imageUrl = req.files["imageUrl"][0].filename));

      let Images = [];

      if (req.files && req.files["Images"]) {
        req.files["Images"].forEach((file) => {
          Images.push(file.filename);
        });
      }

      // const Thumbnails = [];
      // const Images = [];

      // if (req.files && req.files.Thumbnail) {
      //   req.files.Thumbnail.forEach((file) => {
      //     Thumbnails.push(file.originalname);
      //   });
      // }

      // if (req.files && req.files.Images) {
      //   req.files.Images.forEach((file) => {
      //     Images.push(file.originalname);
      //   });
      // }

      console.log("Files:", req.files);

      const productData = new productModel({
        title,
        discription,
        discountedPrice,
        price,
        discountedPercent,
        quantity,
        brand,
        color,
        size,
        Category,
        Thumbnail: imageUrl,
        Images: Images.join(","),
      });

      const validationError = productData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }
      productData.save();

      if (productData) {
        return res.status(201).json({
          Data: productData,
          Message: "Product Data Added Sucessfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const imageUpload = upload.fields([
      { name: "imageUrl", maxCount: 1 },
      { name: "Images", maxCount: 4 },
    ]);

    imageUpload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      const id = req.params.productID;

      const findProductToUpdate = await productModel.findOne({ _id: id });

      const {
        title,
        discription,
        discountedPrice,
        price,
        discountedPercent,
        quantity,
        brand,
        color,
        size,
        Category,
      } = req.body;

      let imageUrl = findProductToUpdate.imageUrl;
      if (req.files && req.files["imageUrl"]) {
        imageUrl = req.files["imageUrl"][0].filename;
        if (
          fs.existsSync(
            "./uploads/productImage/" + findProductToUpdate.imageUrl
          )
        ) {
          fs.unlinkSync(
            "./uploads/productImage/" + findProductToUpdate.imageUrl
          );
        }
      }

      let Images = [];
      if (req.files && req.files["Images"]) {
        req.files["Images"].forEach((file) => {
          Images.push(file.filename);
          for (let i = 0; i < Images.length; i++) {
            if (fs.existsSync("./uploads/productImage/" + Images[i])) {
              fs.unlinkSync("./uploads/productImage/" + Images[i]);
            }
          }
        });
        console.log(Images);
        // if (
        //   fs.existsSync("./uploads/productImage/" + findProductToUpdate.Images)
        // ) {
        //   fs.unlinkSync("./uploads/productImage/" + findProductToUpdate.Images);
        // }
      }

      // console.log("Files:", req.files);

      const updateProduct = await productModel.updateOne(
        { _id: id },
        {
          $set: {
            title,
            discription,
            discountedPrice,
            price,
            discountedPercent,
            quantity,
            brand,
            color,
            size,
            Category,
            Thumbnail: imageUrl,
            Images: Images.join(","),
          },
        }
      );

      // const validationError = updateProduct.validationError();
      // if (validationError) {
      //   return res.status(400).json({
      //     Message: validationError.message,
      //   });
      // }
      if (updateProduct.acknowledged) {
        return res.status(200).json({
          Data: updateProduct,
          Message: "Updated Sucessfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.productID;

    const findProductToDelete = await productModel.findOne({ _id: id });

    // console.log(findProductToDelete);

    if (
      fs.existsSync("./uploads/productImage/" + findProductToDelete.Thumbnail)
    ) {
      fs.unlinkSync("./uploads/productImage/" + findProductToDelete.Thumbnail);
    }

    let Images = findProductToDelete.Images.split(",");
    console.log(Images[0]);
    console.log(Images);
    for (let i = 0; i < Images.length; i++) {
      if (fs.existsSync("./uploads/productImage/" + Images[i])) {
        fs.unlinkSync("./uploads/productImage/" + Images[i]);
      }
    }
    const removeProductData = await productModel.deleteOne({ _id: id });

    if (removeProductData.acknowledged) {
      return res.status(200).json({
        Data: removeProductData,
        Message: "Prodcut Data Deleted Sucessfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
    });
  }
};
