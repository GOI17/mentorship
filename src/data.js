let db = {};

class UndefinedError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "UndefinedNewTaskError";
  }
}

class NonValidTypeError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "NonValidTypeError";
  }
}

class NonValidValueError extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.name = "NonValidValueError";
  }
}

const TaskStatus = Object.freeze({
  new: "NEW",
  in_process: "IN PROGRESS",
  review: "REVIEW",
  finished: "FINISHED",
});

const createTasks = (newTask) => {
  return new Promise((res, reject) => {
    if (newTask === undefined) {
      reject(new UndefinedError(
        "New task is invalid, please provide a valid object.",
      ));
    }

    let fieldsWithError = ["id", "name", "description"].filter(
      (requiredFieldName) => !newTask.hasOwnProperty(requiredFieldName),
    );
    if (fieldsWithError.length > 0) {
      reject(new UndefinedError(
        `New task is invalid, please provide a ${fieldsWithError.join(", ")}.`,
      ));
    }

    fieldsWithError = [newTask.id, newTask.name, newTask.description].filter(
      (requiredFieldValue) => typeof requiredFieldValue !== "string",
    );
    if (fieldsWithError.length > 0) {
      reject(new NonValidTypeError(
        `New task is invalid, please provide a ${fieldsWithError.join(", ")}.`,
      ));
    }

    // fieldsWithError = [
    //   {
    //     id: {
    //       length: 36,
    //     },
    //   },
    //   {
    //     name: {
    //       minLength: 5,
    //       maxLength: 12,
    //     },
    //   },
    //   {
    //     description: {
    //       minLength: 5,
    //       maxLength: 120,
    //     },
    //   },
    // ].filter((requiredField) => {
    //   const { id: newId, name: newName, description: newDescription } = newTask;
    //   const {
    //     id: ruleForId,
    //     name: ruleForName,
    //     description: ruleForDescription,
    //   } = requiredField;

    //   if (ruleForId) {
    //     return ruleForId.length !== newId.length;
    //   }

    //   if (ruleForName) {
    //     return (
    //       newName.length > ruleForName.maxLength &&
    //       newName.length < ruleForName.minLength
    //     );
    //   }

    //   if (ruleForDescription) {
    //     return (
    //       newDescription.length > ruleForDescription.maxLength &&
    //       newDescription.length < ruleForDescription.minLength
    //     );
    //   }

    //   return null;
    // });
    // if (fieldsWithError.length > 0) {
    //   throw new NonValidValueError(
    //     `New task is invalid, please provide a ${Object.keys(fieldsWithError).join(", ")}.`,
    //   );
    // }

    const entity = {
      ...newTask,
      acceptanceCritera: null,
      discussion: null,
      assignedTo: null,
      estimatedTime: 0,
      burnedTime: 0,
      pendingTime: 0,
      status: TaskStatus.new,
      activityType: null,
      relatedTask: null,
    };

    db[entity.id] = entity;

    res(entity);
  });
};

const getAllTasks = () => {
  return Promise.resolve(Object.values(db));
};

const updateTask = (id, taskToUpdate) => {
  return new Promise((resolve, reject) => {
    let entity = db[id]; //db.find((obj) => obj.id === id);
    if (entity === undefined) {
      reject(new Error(`Task with id: ${id} was not found.`));
    }

    entity = {
      ...entity,
      ...taskToUpdate
    };

    db[id] = entity;

    resolve(entity);
  });
}

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    if (id === undefined) reject(new Error("Please provide a valid id"))

    db = Object
    .values(db)
    .filter((task) => task.id !== id)
    .reduce((prev, task) => ({ [task.id]: task, ...prev }), {});

    resolve()
  });
}

export { createTasks, getAllTasks, updateTask, deleteTask, TaskStatus };
