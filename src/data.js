const db = {}
// id
// name
// description
// acceptanceCritera
// discussion
// assignedTo
// estimatedTime
// burnedTime
// pendingTime
// status
// activityType
// relatedTask

class UndefinedError extends Error {
  constructor(message) {
    this.message = this._messge;
    this.name = "UndefinedNewTaskError";
    super();
  }
}

class NonValidTypeError extends Error {
  constructor(message) {
    this.message = this._messge;
    this.name = "NonValidTypeError";
    super();
  }
}

class NonValidValueError extends Error {
  constructor(message) {
    this.message = this._messge;
    this.name = "NonValidValueError";
    super();
  }
}

/**
 *
 * @param {{
 * id: string;
 * name: string;
 * }} newTask
 * @returns
 */
const createTasks = (newTask) => {
  if (newTask === undefined) {
    throw new UndefinedError("New task is invalid, please provide a valid object.");
  }

  if (!newTask.hasOwnProperty("id") &&
  !newTask.hasOwnProperty("name") &&
  !newTask.hasOwnProperty("description")
  ) {
    throw new UndefinedError("New task is invalid, please provide a task with required properties.");
  }

  if (typeof newTask.id !== "string") {
    throw new NonValidTypeError("New task is invalid, please provide a task with a correct id type.");
  }

  if (newTask.id.length === 10) {
    throw new NonValidValueError("New task is invalid, please provide a task with a correct id type.");
  }

  return {
    ...newTask,
    status: "NEW"
  }

}

createTasks()