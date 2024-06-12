"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const todos = [
    { id: 1, text: "Buy milk", completedAt: new Date() },
    { id: 2, text: "Buy bread", completedAt: null },
    { id: 3, text: "Buy butter", completedAt: new Date() },
];
class TodosController {
    //* DI
    constructor() {
        this.getTodos = (req, res) => {
            return res.json(todos);
        };
        this.getTodoById = (req, res) => {
            const id = +req.params.id;
            if (isNaN(id))
                return res.status(400).json({ error: "ID argument is not a number" });
            const todo = todos.find((todo) => todo.id === id);
            todo
                ? res.json(todo)
                : res.status(404).json({ error: `TODO with id ${id} not found` });
        };
    }
}
exports.TodosController = TodosController;
