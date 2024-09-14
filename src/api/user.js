const UserController = require("../controllers/user");

class UserApi {
  async createUser(req, res) {
    const { name, email, password } = req.body;

    try {
      const user = await UserController.create(name, email, password);
      return res.status(201).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error creating user: ${e.message}` });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await UserController.update(
        Number(id),
        name,
        email,
        password
      );
      return res.status(200).send(user);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error updating user: ${e.message}` });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await UserController.delete(Number(id));
      return res.status(204).send();
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error deleting user: ${e.message}` });
    }
  }

  async findUsers(req, res) {
    try {
      const users = await UserController.find();
      return res.status(200).send(users);
    } catch (e) {
      return res
        .status(400)
        .send({ error: `Error listing users: ${e.message}` });
    }
  }
  async findUser(req, res) {
    const { id } = req.params;
    try {
      const user = await UserController.findUser(id);
      return res.status(200).send(user);
    } catch (e) {
      return res.status(400).send({ error: `Error to get user: ${e.message}` });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const token = await UserController.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        secure: false,
        sameSite: "None",
      });
      return res.status(200).send({ message: "Login successful" });
    } catch (e) {
      return res.status(400).send({ error: `Error logging in: ${e.message}` });
    }
  }

  async logout(req, res) {
    res.clearCookie("token");
    return res.status(200).send({ message: "Logged out successfully" });
  }
}

module.exports = new UserApi();
