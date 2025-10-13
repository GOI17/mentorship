import { useEffect, useRef, useState } from "react";
import { createTasks, getAllTasks, updateTask, TaskStatus, deleteTask } from "./data";
import "./App.css";

const useFormTaskCreator = () => {
  const onSubmit = async (form) => {
    try {
      const formValues = new FormData(form);
      const createdTask = await createTasks({
        id: window.crypto.randomUUID(),
        name: formValues.get("name"),
        description: formValues.get("description")
      });
      form.reset();

      return createdTask;
    } catch (e) {
      console.log(e)
    }
  }

  return { onSubmit };
}

function App() {
  let [allTasks, setAllTasks] = useState();
  const { onSubmit } = useFormTaskCreator();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const taskEntity = await onSubmit(form);
    setAllTasks((prev) => [...prev, taskEntity]);
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
      <form style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginBottom: "16px",
        padding: "16px",
      }}
        onSubmit={handleOnSubmit}>
        <input required name="name" type="text" placeholder="Task name" />
        <textarea required name="description" placeholder="Task description" />
        <button type="submit">Create task</button>
      </form>
      <div className="App">
        {allTasks?.map((task) => {
          return (
            <div style={{
              display: "flex",
              gap: "16px",
              justifyContent: "space-between"
            }}
              key={task.id}
            >
              <Task
                task={task}
                onUpdateTask={(updatedTask) => {
                  setAllTasks((prev) => [
                    ...prev.filter((task) => task.id !== updatedTask.id),
                    updatedTask
                  ])
                }}
                onDeleteTask={(taskId) => {
                  setAllTasks((prev) =>
                    prev.filter((task) => task.id !== taskId)
                  );
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

const Task = ({ task, onUpdateTask, onDeleteTask }) => {
  const [shouldUpdateTask, setShouldUpdateTask] = useState(false);
  const formRef = useRef();

  const handleOnSubmitTask = async (form) => {
    const formValues = new FormData(form);
    const updatedTask = await updateTask(task.id, {
      status: formValues.get("task-status")
    });
    onUpdateTask(updatedTask);
    setShouldUpdateTask(false);
  }

  const handleOnChangeTaskStatus = () => {
    handleOnSubmitTask(formRef.current);
  }

  const handleOnClickRemoveTask = async (taskId) => {
    await deleteTask(taskId);
    onDeleteTask(taskId);
  }

  return (
    <>
      <p>{task.name}</p>
      {shouldUpdateTask
        ?
        <form ref={formRef} onSubmit={handleOnSubmitTask}>
          <select name="task-status" onChange={handleOnChangeTaskStatus}>
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
      <button onClick={() => handleOnClickRemoveTask(task.id)}>Remove task</button>
    </>
  )
}
