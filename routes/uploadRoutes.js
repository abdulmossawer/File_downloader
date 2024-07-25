const express = require("express");
const router = express.Router();
const File = require("../models/fileSchema");
const multer = require("multer");
// const cloudinary = require('cloudinary').v2;
const cloudinary = require("../utils/cloudinary");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Multer storage configuration
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: async (req, file) => {
//         let folder = 'misc';
//         if (file.mimetype.startsWith('image')) {
//             folder = 'images';
//         } else if (file.mimetype.startsWith('video')) {
//             folder = 'videos';
//         } else if (file.mimetype === 'application/pdf') {
//             folder = 'pdfs';
//         }
//         return {
//             folder: folder,
//             format: async () => file.originalname.split('.').pop(), // keep original file extension
//             public_id: (req, file) => file.originalname,
//         };
//     }
// });

// const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("req here", req.file);
    if (!req.file) {
      console.log("upload file failed");
      return res.status(400).json({ error: "No file uploaded" });
    }

    let resourceType = "auto";

    // Check the file MIME type to determine resource type
    if (req.file.mimetype === "application/pdf") {
      resourceType = "raw";
    }

    cloudinary.uploader
      .upload_stream({ resource_type: resourceType }, async (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        console.log("Data result", result);
        console.log("req ", req.file);
        const file = req.file;
        const newFile = new File({
          url: result.secure_url,
          filename: file.filename,
          type: file.mimetype,
        });
        await newFile.save();
        res.status(200).json({ url: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
