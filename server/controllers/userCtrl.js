module.exports = {
  updateRole: (req, res, next) => {
    let db = req.app.get("db");
    db.user.updateRole(req.params.id, req.body.role).then(() => {
      return res.sendStatus(200);
    });
  },
  updateSpecialty: (req, res, next) => {
    let db = req.app.get("db");
    db.user.updateSpecialty(req.params.id, req.body.specialty).then(() => {
      return res.sendStatus(200);
    });
  },
  getCurrentUser: (req, res, next) => {
    let db = req.app.get("db");
    const { id } = req.session.user;
    db.user
      .getUser([id])
      .then(user => res.status(200).send(user))
      .catch(err => res.status(500).send({ errorMessage: "oops" }));
  }
};
