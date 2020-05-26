const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../model/task");

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// GET /tasks/completed=true
// GET /tasks/limit=10&skip=0
// GET /tasks/sortBy=createdAt:desc
// createdAt: -1 (-1 means descending order)
router.get("/tasks", auth, async (req, res) => {
  try {
    // const task = await Task.find({});
    // const task = await Task.findOne({ owner: req.user._id });
    // await req.user.populate("tasks").execPopulate();
    const match = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
      console.log(match.completed);
    }

    const sort = {};

    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "invalid updates!" });
  }
  try {
    const task = await Task.findByOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // in order to execute the middleware we have to avoid using findByIdAndUpdate, because it
    // bypasses the middleware
    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    if (!task) {
      return res.status(404).send("not updated");
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const user = await Task.findByIdAndDelete(req.params.id);
    const user = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!user) {
      return res.status(404).send("Task not found with id: " + req.params.id);
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
