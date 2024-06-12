import { Router } from "express";

import { TodoRoutes } from "./todos/routes";
import { AlbumRoutes } from "./album/routes";
import { PhotoRoutes } from "./photos/routes";
import { UserRoutes } from "./users/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/todos", TodoRoutes.routes);
    router.use("/externalapi/album", AlbumRoutes.routes);
    router.use("/externalapi/photos", PhotoRoutes.routes);
    router.use("/externalapi/users", UserRoutes.routes);

    return router;
  }
}
