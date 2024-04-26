import { useEffect, useState } from "react";
import "./App.css";
import UserData from "./components/UserData";

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
      <input type="text" placeholder="search any name" onChange={debounced} />
      {find && (
        <UserData
          users={users.filter((x) =>
            x.name.toLowerCase().includes(find.toLowerCase())
          )}
        />
      )}
      {!find && <UserData users={users} />}
    </>
  );
}

export default App;
