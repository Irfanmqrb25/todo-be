import Todo from "../models/TodoModel.js";

export const getTodos = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const todos = await Todo.find({ createdBy, deletedAt: null, isCompleted: false });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTodosSoftDelete = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const todos = await Todo.find({ createdBy, deletedAt: { $ne: null } });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveTodo = async (req, res) => {
  // const todo = new Todo(req.body);
  const { title, date } = req.body;
  try {
    const createdBy = req.user._id;
    // const insertTodo = await todo.save();
    const insertTodo = await Todo.create({ title, date, createdBy });
    res.status(201).json(insertTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.updateOne(
      { _id: req.params.id },
      { deletedAt: Date.now() }
    );
    res.status(200).json(deleteTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const completedTodo = async (req, res) => {
  try {
    const completedTodo = await Todo.updateOne(
      { _id: req.params.id },
      { isCompleted: true }
    )
    res.status(200).json(completedTodo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getCompletedTodo = async (req, res) => {
  try {
    const createdBy = req.user._id;
    const todos = await Todo.find({ createdBy, isCompleted: true });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const activeTodo = async (req, res) => {
  try {
    const activeTodo = await Todo.updateOne(
      { _id: req.params.id },
      { deletedAt: null }
    )
    res.status(200).json({
      message: "Todo has been deleted",
      data: activeTodo
    })
  } catch (error) {
    console.log(error)
  }
}

export const permananentDelete = async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.id })
    res.status(200).json(permananentDelete)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}