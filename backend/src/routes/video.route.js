import { Router } from "express";
import {
  getVideos,
  getVideo,
  getUserVideos,
  createVideo,
  updateVideoThumbnail,
  incrementViewCount,
  updateVideoTitledescription,
  deleteVideo,
  toggleVideoStatus,
} from "../controllers/video.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getVideos);
router.get("/:videoId/:userId", getVideo);

router.use(verifyUser);
router.get("/user-all-video", getUserVideos);
router.route("/").post(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createVideo
);

router
  .route("/:videoId")
  .delete(deleteVideo)
  .patch(upload.single("thumbnail"), updateVideoThumbnail);

router
  .route("/update-title-description/:videoId")
  .patch(updateVideoTitledescription);
router.route("/:videoId/toggle-status").patch(toggleVideoStatus);
router.route("/:videoId/increment-views").patch(incrementViewCount);

export default router;
