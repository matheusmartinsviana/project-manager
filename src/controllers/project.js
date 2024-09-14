const project = require("../models/project");
const UserController = require("./user");

class ProjectController {
  async create(name, description, userId) {
    if (!name || !description || !userId) {
      throw new Error("Name, description, and userId are required");
    }

    await UserController.findUser(Number(userId));

    const projectValue = await project.create({
      name,
      description,
      userId,
    });

    return projectValue;
  }

  async findProject(id) {
    if (!id) {
      throw new Error("Id is required");
    }

    const projectValue = await project.findByPk(id);

    if (!projectValue) {
      throw new Error("Project not found");
    }

    return projectValue;
  }

  async update(id, name, description) {
    if (!id || !name || !description) {
      throw new Error("Id, name and description are required");
    }

    const projectValue = await this.findProject(id);
    await UserController.findUser(projectValue.userId);

    projectValue.name = name;
    projectValue.description = description;

    await projectValue.save();

    return projectValue;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Id is required");
    }
    const projectValue = await this.findProject(id);
    await projectValue.destroy();

    return;
  }

  async findProjects(userId) {
    return project.findAll({
      where: {
        userId: userId,
      },
    });
  }

  async findProjectByIdAndUser(userId, projectId) {
    const projectValue = await project.findOne({
      where: {
        id: projectId,
        userId: userId,
      },
    });

    if (!projectValue) {
      throw new Error("Project does not belong to the user");
    }

    return projectValue;
  }
}

module.exports = new ProjectController();
