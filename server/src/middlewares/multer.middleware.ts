import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Create the 'uploads' directory if it doesn't exist
    cb(null, "./public/temp");
  },
  filename: function (_req, file, cb) {
    // Use the original file name with a timestamp to prevent overwrites
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("audio/")) {
    cb(null, true);
  } else {
    cb(new Error("Only audio files are allowed!"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
