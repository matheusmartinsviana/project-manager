const Task = require("../models/task");
const ProjectController = require("../controllers/project");

class TaskController {
  async create(title, description, projectId, userId) {
    if (!title || !description || !projectId) {
      throw new Error("Title, description, and projectId are required");
    }

    await ProjectController.findProjectByIdAndUser(userId, Number(projectId));

    const taskValue = await Task.create({
      title,
      description,
      projectId,
    });

    return taskValue;
  }

  async update(id, title, description, status, conclusionDate, userId) {
    if (!id || !title || !description) {
      throw new Error("Id, title, and description are required");
    }

    const taskValue = await this.findTask(id);
    await ProjectController.findProjectByIdAndUser(userId, taskValue.projectId);

    taskValue.title = title;
    taskValue.description = description;
    if (status !== undefined) taskValue.status = status;
    if (conclusionDate !== undefined) taskValue.conclusionDate = conclusionDate;

    await taskValue.save();
    return taskValue;
  }

  async delete(id, userId) {
    if (!id) {
      throw new Error("Id is required");
    }

    const taskValue = await this.findTask(id);
    await ProjectController.findProjectByIdAndUser(userId, taskValue.projectId);

    await taskValue.destroy();
  }

  async findTask(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const taskValue = await Task.findByPk(id);

    if (!taskValue) {
      throw new Error("Task not found");
    }

    return taskValue;
  }

  async find(userId) {
    const projects = await ProjectController.findProjects(userId);
    const projectIds = projects.map((project) => project.id);

    return Task.findAll({
      where: {
        projectId: projectIds,
      },
    });
  }

  async findByStatus(status, userId) {
    if (typeof status !== "string") {
      throw new Error("Status must be a string");
    }

    const projects = await ProjectController.findProjects(userId);
    const projectIds = projects.map((project) => project.id);

    const taskValue = await Task.findAndCountAll({
      where: {
        status: status,
        projectId: projectIds,
      },
    });

    return taskValue;
  }
}

module.exports = new TaskController();
