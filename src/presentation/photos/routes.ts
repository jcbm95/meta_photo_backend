import { Router } from "express";
import { PhotoController } from "./controller";

export class PhotoRoutes {
  static get routes(): Router {
    const router = Router();

    const photoController = new PhotoController();

    router.get("/", photoController.getPhotos);
    router.get("/:id", photoController.getPhotoById);

    return router;
  }
}
