const TaskController = require("../controllers/task");

class TaskApi {
  async createTask(req, res) {
    const { title, description, projectId } = req.body;

    try {
      const task = await TaskController.create(title, description, projectId);
      return res.status(201).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating task: ${e.message}` });
    }
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const { title, description, status, conclusionDate } = req.body;

    try {
      const task = await TaskController.update(
        Number(id),
        title,
        description,
        status,
        conclusionDate
      );
      return res.status(200).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating task: ${e.message}` });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;

    try {
      await TaskController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting task: ${e.message}` });
    }
  }

  async findTasks(req, res) {
    try {
      const tasks = await TaskController.find();
      return res.status(200).send(tasks);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing tasks: ${e.message}` });
    }
  }
  async findTask(req, res) {
    const { id } = req.params;
    try {
      const task = await TaskController.findTask(id);
      return res.status(200).send(task);
    } catch (e) {
      return res.status(400).send({ error: `Error to get task: ${e.message}` });
    }
  }

  async findTasksByStatus(req, res) {
    const { status } = req.body;

    try {
      const tasks = await TaskController.findByStatus(status);
      return res.status(200).send(tasks);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing tasks: ${e.message}` });
    }
  }
}

module.exports = new TaskApi();
