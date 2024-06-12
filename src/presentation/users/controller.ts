import { Request, Response } from "express";
import { UserModel } from "../../dtos/get-users";

export class UserController {
  //* DI
  constructor() {}

  public getUsers = async (req: Request, res: Response) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data: UserModel[] = await response.json();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data: UserModel = await response.json();
    return data;
  };
}
