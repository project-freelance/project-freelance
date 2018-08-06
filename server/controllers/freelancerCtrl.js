module.exports = {
  addFreelancer: (req, res, next) => {
    let db = req.app.get("db");
    const { bio, skills, experience, city, user_id } = req.body;

    db.freelancers
      .addFreelancer([bio, skills, experience, city, user_id])
      .then(freelancer => {
        console.log(freelancer);
        return res.status(200).send(freelancer);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getFreelancers: (req, res, next) => {
    let db = req.app.get("db");

    db.freelancers.getFreelancers().then(freelancer => {
      return res.status(200).send(freelancer);
    });
  },

  getFreelancer: (req, res, next) => {
    let db = req.app.get("db");

    db.freelancers.getFreelancer([req.params.id]).then(freelancer => {
      return res.status(200).send(freelancer);
    });
  },

  updateFreelancer: (req, res, next) => {
    let db = req.app.get("db");
    db.freelancers
      .updateFreelancer(
        req.params.id,
        req.body.bio,
        req.body.skills,
        req.body.experience,
        req.body.city
      )
      .then(() => {
        return res.sendStatus(200);
      });
  }
};
