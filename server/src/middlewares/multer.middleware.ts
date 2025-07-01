import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Create the 'uploads' directory if it doesn't exist
    // In a real app, you'd use cloud storage (S3, GCS) for actual files
    const uploadDir = path.join(__dirname, "uploads");
    require("fs").mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    // Use the original file name with a timestamp to prevent overwrites
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });
