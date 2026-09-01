import multer from "multer";
import fs from "fs";
import path from "path";

// =========================
// UPLOAD DIRECTORY
// =========================

const uploadDir = "uploads/profiles";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}


// =========================
// STORAGE
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});


// =========================
// FILE FILTER
// =========================

const fileFilter = (
  req,
  file,
  cb
) => {
  if (
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files are allowed"
      ),
      false
    );
  }
};


// =========================
// MULTER
// =========================

const uploadProfileImage =
  multer({
    storage,
    fileFilter,

    limits: {
      fileSize:
        5 * 1024 * 1024,
    },
  });

export default uploadProfileImage;