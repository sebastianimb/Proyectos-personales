import "./App.css";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import UserForm, { useFormState } from "./form/User";

type User = useFormState & { id: number };

function App() {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: User[] = await response.json();
    setUsers(data);
  }
  function handleSumbit(user: useFormState) {
    setUsers([...users, { ...user, id: Date.now() }]);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div>
        <ul>
          {users.map((usuario) => (
            <li key={usuario.id}>{usuario.name}</li>
          ))}
        </ul>
        <UserForm handleSumbit={handleSumbit} />
      </div>
    </>
  );
}

export default App;
