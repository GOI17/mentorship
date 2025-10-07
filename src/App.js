import { useEffect, useState } from "react";
import { createTasks, getAllTasks, TaskStatus } from "./data";

function App() {
  let [allTasks, setAllTasks] = useState();
  const [title, setTitle] = useState("My super task");

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    try {
      const formValues = new FormData(form);
      const createdTask = await createTasks({
        id: window.crypto.randomUUID(),
        name: formValues.get("name"),
        description: formValues.get("description")
      });
      form.reset();
      setAllTasks((prev) => [...prev, createdTask])
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const fn = async () => {
      const allTasks = await getAllTasks()
      setAllTasks(allTasks);
    };

    fn();
  }, []);

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <input name="name" type="text" placeholder="Task name" />
        <textarea name="description" placeholder="Task description" />
        <button type="submit">Create task</button>
      </form>
      <div className="App">
        {allTasks?.map((task) => {
          return <Task key={task.id} task={task} />
        })}
      </div>
    </>
  );
}

export default App;

const Task = ({ task }) => {
  const [shouldUpdateTask, setShouldUpdateTask] = useState(false);

  return (
    <>
      <p>{task.name}</p>
      {shouldUpdateTask
        ?
        <form>
          <select>
            {Object.values(TaskStatus).map((status) => {
              return <option key={status}>{status}</option>
            })}
          </select>
        </form>
        :
        <p onClick={() => {
          setShouldUpdateTask(true);
        }}>{task.status}</p>
      }
    </>
  )
}
