const db = {
  uroqwurioqwue: {
    id: "uroqwurioqwue",
    name: "testing",
    description: "my super very very very long description",
  },
};

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
  if (newTask === undefined) {
    throw new UndefinedError(
      "New task is invalid, please provide a valid object.",
    );
  }

  let fieldsWithError = ["id", "name", "description"].filter(
    (requiredFieldName) => !newTask.hasOwnProperty(requiredFieldName),
  );
  if (fieldsWithError.length > 0) {
    throw new UndefinedError(
      `New task is invalid, please provide a ${fieldsWithError.toString()}.`,
    );
  }

  fieldsWithError = [newTask.id, newTask.name, newTask.description].filter(
    (requiredFieldValue) => typeof requiredFieldValue !== "string",
  );
  if (fieldsWithError.length > 0) {
    throw new NonValidTypeError(
      `New task is invalid, please provide a ${fieldsWithError.toString()}.`,
    );
  }

  fieldsWithError = [
    {
      id: {
        length: 10,
      },
    },
    {
      name: {
        minLength: 5,
        maxLength: 12,
      },
    },
    {
      description: {
        minLength: 5,
        maxLength: 120,
      },
    },
  ].filter((requiredField) => {
    const { id: newId, name: newName, description: newDescription } = newTask;
    const {
      id: ruleForId,
      name: ruleForName,
      description: ruleForDescription,
    } = requiredField;

    if (ruleForId) {
      return ruleForId.length !== newId.length;
    }

    if (ruleForName) {
      return (
        newName.length > ruleForName.maxLength &&
        newName.length < ruleForName.minLength
      );
    }

    if (ruleForDescription) {
      return (
        newDescription.length > ruleForDescription.maxLength &&
        newDescription.length < ruleForDescription.minLength
      );
    }

    return null;
  });
  if (fieldsWithError.length > 0) {
    throw new NonValidValueError(
      `New task is invalid, please provide a ${fieldsWithError.toString()}.`,
    );
  }

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

  return entity;
};

const getAllTasks = () => {
  return Object.values(db);
};

export { createTasks, getAllTasks };
