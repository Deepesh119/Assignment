import {
  ChangeEventHandler,
  EventHandler,
  FC,
  FormEventHandler,
  useState,
} from "react";
import "./App.css";
import { nanoid } from "nanoid";
import { AiFillDelete } from "react-icons/ai";

interface TodoItem {
  id: string;
  todo: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [input, setInput] = useState("");

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (input === "") return;
    setTodos((prevState) => [
      ...prevState,
      { todo: input, completed: false, id: nanoid() },
    ]);
    setInput("");
  };

  const handleTabChange:FormEventHandler = (e) => {
    const {value} = e.target as HTMLInputElement
    setSelectedTab(value);
  };

  return (
    <div className="container">
      <h1>Todo list</h1>

      <form onChange={handleTabChange}>
        <ul className="tabs">
          <li className="tab">
            <input
              type="radio"
              id="all"
              name="selected_tab"
              value="all"
              checked={selectedTab === "all"}
            />
            <label htmlFor="all">All</label>
          </li>

          <li className="tab">
            <input
              type="radio"
              id="pending"
              name="selected_tab"
              value="pending"
              checked={selectedTab === "pending"}
            />
            <label htmlFor="pending">Pending</label>
          </li>

          <li className="tab">
            <input
              type="radio"
              id="completed"
              name="selected_tab"
              value="completed"
              checked={selectedTab === "completed"}
            />

            <label htmlFor="completed">Completed</label>
          </li>
        </ul>
      </form>

      <form onSubmit={handleSubmit} className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <ul className="todos">
        {selectedTab === "all" &&
          todos.map((todo) => (
            <TodoItem todoItem={todo} key={todo.id} setTodos={setTodos} />
          ))}

        {selectedTab === "pending" &&
          todos
            .filter((todo) => todo.completed === false)
            .map((todo) => (
              <TodoItem todoItem={todo} key={todo.id} setTodos={setTodos} />
            ))}

        {selectedTab === "completed" &&
          todos
            .filter((todo) => todo.completed === true)
            .map((todo) => (
              <TodoItem todoItem={todo} key={todo.id} setTodos={setTodos} />
            ))}
      </ul>
    </div>
  );
}

interface TodoItemProps {
  todoItem: TodoItem;
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}

const TodoItem: FC<TodoItemProps> = ({ todoItem, setTodos }) => {
  const { todo, completed, id } = todoItem;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo.completed = e.target.checked;
        }
        return todo;
      })
    );
  };

  const deleteTodo = () => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={handleChange} checked={completed} />
      <span
        className="todo"
        style={completed ? { textDecoration: "line-through" } : {}}>
        {todo}
      </span>

      <div onClick={deleteTodo}>
        <AiFillDelete />
      </div>
    </li>
  );
};

export default App;
