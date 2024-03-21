import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/todos/1";

// Defines the structure of an object. Inside an interface we can ignore properties.
interface Todo
{
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then(response =>
{
    const todo = response.data as Todo; // Set as a type.

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean) =>
{
    console.log(`
        The Todo with ID: ${id}
        Has a title of: ${title}
        is it finished? ${completed}
    `);
}
