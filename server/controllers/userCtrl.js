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
  }
};
