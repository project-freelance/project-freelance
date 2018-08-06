module.exports = {
  addEmployer: (req, res, next) => {
    let db = req.app.get("db");
    const { bio, company, position, city, user_id, company_logo } = req.body;

    db.employers
      .addEmployer([bio, company, position, city, user_id, company_logo])
      .then(employer => {
        console.log(employer);
        return res.status(200).send(employer);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getEmployers: (req, res, next) => {
    let db = req.app.get("db");

    db.employers.getEmployers().then(employers => {
      return res.status(200).send(employers);
    });
  },

  getEmployer: (req, res, next) => {
    let db = req.app.get("db");

    db.employers.getEmployer([req.params.id]).then(employer => {
      return res.status(200).send(employer);
    });
  },

  updateEmployer: (req, res, next) => {
    let db = req.app.get("db");
    db.employers
      .updateEmployer(
        req.params.id,
        req.body.bio,
        req.body.company,
        req.body.position,
        req.body.city,
        req.body.company_logo
      )
      .then(() => {
        return res.sendStatus(200);
      });
  }
};
