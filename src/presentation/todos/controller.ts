import { Request, Response } from "express";
import { PhotoModel } from "../../dtos/get-photos";
import { AlbumModel } from "../../dtos/get-album";

const todos = {
  id: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
  album: {
    id: 1,
    title: "quidem molestiae enim",
    user: {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
  },
};

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const container = [];
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    console.log("fasdf", `https://jsonplaceholder.typicode.com/photos${id}`);
    const photoResponse = await fetch(
      `https://jsonplaceholder.typicode.com/photos${id}`
    );
    if (!photoResponse.ok) {
      throw new Error(
        "Network response was not ok " + photoResponse.statusText
      );
    }
    const photoData: PhotoModel = await photoResponse.json();
    // const albumResponse = await fetch(
    //   `https://jsonplaceholder.typicode.com/albums`
    // );
    // if (!albumResponse.ok) {
    //   throw new Error(
    //     "Network response was not ok " + albumResponse.statusText
    //   );
    // }
    // const albums: PhotoModel[] = await albumResponse.json();
    // const albumsPhotos = albums.find((album) => photoData.id === album.id);
    // if (albumsPhotos === undefined)
    //   return res.status(404).json({ error: "Album not found" });
    // return res.json(albumsPhotos);
    return photoData;
  };
}
