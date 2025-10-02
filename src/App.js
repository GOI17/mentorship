import { useEffect, useState } from "react";
import { getAllTasks } from "./data";

function App() {
  let [allTasks, setAllTasks] = useState();

  useEffect(() => {
    setAllTasks(getAllTasks());
  }, [])

  return (
    <div className="App">
      <p>{JSON.stringify(allTasks)}</p>
    </div>
  );
}

export default App;
