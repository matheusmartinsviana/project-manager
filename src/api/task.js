const TaskController = require("../controllers/task");
const ProjectController = require("../controllers/project");

class TaskApi {
  async createTask(req, res) {
    const { title, description, projectId } = req.body;
    const { userId } = req;

    try {
      const task = await TaskController.create(
        title,
        description,
        projectId,
        userId
      );
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
    const { userId } = req;

    try {
      const task = await TaskController.update(
        Number(id),
        title,
        description,
        status,
        conclusionDate,
        userId
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
    const { userId } = req;

    try {
      await TaskController.delete(Number(id), userId);
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting task: ${e.message}` });
    }
  }

  async findTasks(req, res) {
    const { userId } = req;
    try {
      const tasks = await TaskController.find(userId);
      return res.status(200).send(tasks);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing tasks: ${e.message}` });
    }
  }

  async findTask(req, res) {
    const { id } = req.params;
    const { userId } = req;

    try {
      const task = await TaskController.findTask(id);
      await ProjectController.findProjectByIdAndUser(userId, task.projectId);

      return res.status(200).send(task);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error getting task: ${e.message}` });
    }
  }

  async findTasksByStatus(req, res) {
    const { status } = req.body;
    const { userId } = req;

    try {
      const tasks = await TaskController.findByStatus(status, userId);
      return res.status(200).send(tasks);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error getting tasks by status: ${e.message}` });
    }
  }
}

module.exports = new TaskApi();
