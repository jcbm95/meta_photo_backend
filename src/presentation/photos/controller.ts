import { Request, Response } from "express";
import { PhotoModel } from "../../dtos/get-photos";
import { AlbumModel } from "../../dtos/get-album";
import { UserModel } from "../../dtos/get-users";
export class PhotoController {
  constructor() {}

  public getPhotos = async (req: Request, res: Response) => {
    const title = req.query.title as string;
    const titleCases = title ? title.split(" ") : [];
    let principalContainer = [];
    const albumTitle = req.query["album.title"] as string;
    const albumUserEmail = req.query["album.user.email"] as string;
    const limit = req.query["limit"] as string;
    const offset = req.query["offset"] as string;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      let data: PhotoModel[] = await response.json();
      if (titleCases.length > 0) {
        const container = [];
        const dataFiltered = data.filter((photo) => {
          return titleCases.every((word) => photo.title.includes(word));
        });
        for (const photo of dataFiltered) {
          const albumData = await this.getAlbumById(photo.albumId);
          const resObjt = {
            ...photo,
            album: albumData,
          };
          container.push(resObjt);
          principalContainer.push(container);
        }
        data = dataFiltered;
        // return res.json(container);
      }
      if (albumTitle) {
        const container = [];
        const albumData = await this.getAlbumByName(albumTitle);
        if (
          albumData.length === 0 ||
          albumData === "error al obtener los albums"
        )
          return res.status(404).json({ error: "Album not found" });
        const photosFiltered = data.filter((photo) => {
          return albumData.some((album) => {
            return photo.id === album.id;
          });
        });
        console.log("photosFiltered", photosFiltered.length);
        for (const photo of photosFiltered) {
          const resObjt = {
            ...photo,
            album: await this.assignAlbumToPhoto(photo, albumData),
          };
          container.push(resObjt);
          principalContainer.push(container);
        }
        data = photosFiltered;
        // return res.json(container);
      }
      if (albumUserEmail) {
        const container = [];
        const albumsByUser = [];
        const userData = await this.getUserByMail(albumUserEmail);
        if (userData === "error al obtener los albums")
          return res.status(404).json({ error: "User not found" });
        for (const user of userData) {
          const albums = await this.getAllAlbumsByUser(user.id);
          if (albums === "error al obtener los albums")
            return res.status(404).json({ error: "Album not found" });
          albumsByUser.push(albums);
        }
        const albums = albumsByUser.flat();
        const photosFiltered = data.filter((photo) => {
          return albums.some((album) => {
            return photo.albumId === album.id;
          });
        });
        for (const photo of photosFiltered) {
          const resObjt = {
            ...photo,
            album: await this.assignAlbumToPhoto(photo, albums),
          };
          container.push(resObjt);
          principalContainer.push(container);
        }
        data = photosFiltered;
        // return res.json(container);
      } else {
        principalContainer = data;
      }
      if (limit) {
        principalContainer = principalContainer.slice(0, +limit);
      }
      if (limit && offset) {
        data = data.slice(+offset, +limit);
        principalContainer = data.slice(+offset, +limit);
      } else {
        data = data.slice(0, 25);
        principalContainer = data.slice(0, 25);
      }
      return res.json(principalContainer);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  public assignAlbumToPhoto = async (
    photo: PhotoModel,
    albumBucket: AlbumModel[]
  ) => {
    const albumData = albumBucket.find((album) => {
      return album.id === photo.id;
    });
    console.log("albumdata", albumData);
    if (!albumData) return "error al obtener los albums";
    const resObjt = {
      ...albumData,
      user: await this.getAlbumById(albumData.userId),
    };
    return resObjt;
  };
  public getPhotoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const photoData: PhotoModel = await response.json();
    const albumData = await this.getAlbumById(photoData.albumId);

    const resObjt = {
      ...photoData,
      album: albumData,
    };
    return res.json(resObjt);
  };

  getAlbumById = async (id: number) => {
    try {
      console.log("getAlbums", id);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: AlbumModel = await response.json();
      const resObjt = {
        ...data,
        user: await this.getUserById(data.userId),
      };
      console.log(data);
      return resObjt;
    } catch (error) {
      return "error al obtener los albums";
    }
  };
  getAlbumByName = async (name: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: AlbumModel[] = await response.json();
      const dataFiltered = data.filter((album) => {
        return album.title.includes(name);
      });
      return dataFiltered;
    } catch (error) {
      return "error al obtener los albums";
    }
  };
  getUserById = async (id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: UserModel = await response.json();
      return data;
    } catch (error) {
      return "error al obtener los albums";
    }
  };

  getPhotosByTitle = async (req: Request, res: Response) => {
    try {
      const title = req.params.title;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: PhotoModel[] = await response.json();
      const container = [];
      for (const photo of data) {
        const albumData = await this.getAlbumById(photo.albumId);
        if (albumData === "error al obtener los albums")
          return res.status(404).json({ error: "Album not found" });
        const albumComplete = {
          ...albumData,
          user: await this.getUserById(albumData.userId),
        };
        const resObjt = {
          ...photo,
          album: albumComplete,
        };
        container.push(resObjt);
      }
      return container;
    } catch (error) {
      return "error al obtener los albums";
    }
  };
  getUserByMail = async (mail: string) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?email=${mail}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: UserModel[] = await response.json();
      return data;
    } catch (error) {
      return "error al obtener los albums";
    }
  };
  getAllAlbumsByUser = async (id: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: AlbumModel[] = await response.json();
      return data;
    } catch (error) {
      return "error al obtener los albums";
    }
  };
}
