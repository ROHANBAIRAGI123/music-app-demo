import { Router } from "express";
import {
  getAllMusic,
  getMusicByTitle,
  uploadMusic,
} from "../controllers/music.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/").get(getAllMusic);
router.route("/:title").get(getMusicByTitle);
console.log("multer middleware loaded", upload);
router
  .route("/upload")
  .post(upload.fields([{ name: "musicFile" }]), uploadMusic);

export default router;
