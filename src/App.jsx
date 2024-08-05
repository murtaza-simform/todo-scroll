import { useState, useEffect, useRef } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState("");

  const divRef = useRef();

  const getTodos = async () => {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    setTodos(data?.todos);
  };

  const scrollToBottom = () => {
    const lastChild = divRef.current.lastChild;
    lastChild.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (todos?.length > 0) {
      scrollToBottom();
    }
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: todos[todos?.length]?.id + 1,
      todo: inputTodo,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputTodo("");
  };

  const handleClick = (e) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.todo === e.target.innerHTML) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <h4>Todos:</h4>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder={"Enter a todo..."}
          style={{ width: "70%", padding: "10px", marginBottom: "10px" }}
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          style={{ padding: 0, width: "150px", height: "2.5rem" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div
        ref={divRef}
        style={{
          border: "1px solid black",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        <ul
          onClick={(e) => handleClick(e)}
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {todos &&
            todos?.map((todo) => (
              <li
                key={todo?.id}
                style={{
                  padding: "10px",
                  margin: "5px",
                  background: "#eee",
                  textDecoration: todo?.completed ? "line-through" : "",
                  cursor: "pointer",
                }}
              >
                {todo?.todo}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
