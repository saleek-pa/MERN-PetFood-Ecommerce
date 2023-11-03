const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const storage = multer.diskStorage({
   destination: "Uploads",
   filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage });

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageController = (req, res, next) => {
   upload.single("image")(req, res, async (err) => {
      if (err) {
         return res.status(400).json({ message: "Image upload failed" });
      }

      if (req.file) {
         try {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "products" });
            req.body.image = result.secure_url;

            fs.unlink(req.file.path, (error) => {
               if (error) {
                  console.error("Error deleting file:", error);
               }
            });

            next();
         } catch (err) {
            return res.status(500).json({ message: "Failed to upload image to Cloudinary" });
         }
      } else {
         next();
      }
   });
};

module.exports = imageController;
