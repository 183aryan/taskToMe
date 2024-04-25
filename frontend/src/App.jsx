import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let API = "http://localhost:8000/api";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [find, setFind] = useState("");

  const fetchdata = async (url) => {
    setLoading(true);
    const data = await fetch(url);
    const res = await data.json();
    console.log(res);
    if (res.length > 0) {
      setLoading(false);
      setUsers(res);
    }
  };

  useEffect(() => {
    fetchdata(API);
  }, []);

  const debounce = (fn, delay = 800) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const handleChange = (event) => {
    setFind(event.target.value);
    console.log(event.target.value);
  };

  const debounced = debounce(handleChange, 800);

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <input type="text" placeholder="enter name" onChange={debounced} />
      {users
        .filter((x) => {
          if (find === "") {
            return x;
          } else if (x.name.toLowerCase().includes(find.toLowerCase())) {
            return x.name;
          }
        })
        .map((x) => {
          return (
            <tr key={x.id}>
              <td>{x.id}</td>
              <td>{x.name}</td>
              <td>{x.username}</td>
              <td>{x.email}</td>
            </tr>
          );
        })}
      <table align="center">
        <thead>
          <th>id</th>
          <th>name</th>
          <th>username</th>
          <th>email</th>
        </thead>
        <tbody>
          {!loading &&
            users.map((user) => {
              // const { id, name, username, email } = user;
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default App;
