import { Router } from "express";
import { AlbumController } from "./controller";

export class AlbumRoutes {
  static get routes(): Router {
    const router = Router();

    const albumController = new AlbumController();

    router.get("/", albumController.getAlbums);
    router.get("/:id", albumController.getAlbumById);

    return router;
  }
}
