import { Request, Response } from "express";
import { AlbumModel } from "../../dtos/get-album";

export class AlbumController {
  //* DI
  constructor() {}

  public getAlbums = async (req: Request, res: Response) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: AlbumModel[] = await response.json();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  public getAlbumById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    return res.json({});
  };
}
