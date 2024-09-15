const Task = require("../models/task");
const Project = require("../models/project");

Task.belongsTo(Project, { foreignKey: "projectId" });
Project.hasMany(Task, { foreignKey: "projectId" });

module.exports = { Task, Project };
