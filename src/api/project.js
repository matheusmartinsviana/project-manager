const ProjectController = require("../controllers/project");

class ProjectApi {
  async createProject(req, res) {
    const { name, description } = req.body;
    const { userId } = req;

    try {
      const project = await ProjectController.create(name, description, userId);
      return res.status(201).send(project);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating project: ${e.message}` });
    }
  }

  async updateProject(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const project = await ProjectController.update(
        Number(id),
        name,
        description
      );
      return res.status(200).send(project);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating project: ${e.message}` });
    }
  }

  async deleteProject(req, res) {
    const { id } = req.params;

    try {
      await ProjectController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting project: ${e.message}` });
    }
  }

  async findProjects(req, res) {
    const { userId } = req;

    try {
      const projects = await ProjectController.findProjects(userId);
      return res.status(200).send(projects);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing projects: ${e.message}` });
    }
  }

  async findProject(req, res) {
    const { id } = req.params;

    try {
      const project = await ProjectController.findProject(id);
      return res.status(200).send(project);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error getting project: ${e.message}` });
    }
  }
}

module.exports = new ProjectApi();
