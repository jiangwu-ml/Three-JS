import { useEffect, useState } from "react";
import "./App.css";
import logo from "./logo.svg";
import { sayHello } from "./service";
import { Counter } from "./store/features/Counter";

function App() {
  const [helloMes, sethelloMes] = useState("changing...");
  const getHello = async () => {
    const res = await sayHello();
    if (res.status === 200) sethelloMes(res.data);
  };
  useEffect(() => {
    getHello();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter></Counter>
        <h3>{helloMes} </h3>
      </header>
    </div>
  );
}

export default App;
