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
      console.log(freelancer);
      return res.status(200).send(freelancer);
    });
  },

  updateFreelancer: (req, res, next) => {
    let db = req.app.get("db");
    db.freelancers
      .updateFreelancer(
        req.params.id,
        req.body.heading,
        req.body.bio,
        req.body.skills,
        req.body.experience,
        req.body.city,
        req.body.state
      )
      .then(() => {
        return res.sendStatus(200);
      });
  },

  addFreelancerPost: (req, res, next) => {
    let db = req.app.get("db");
    const { title, body, user_id, moment } = req.body;
    db.freelancers
      .addFreelancerPost([title, body, user_id, moment])
      .then(post => {
        return res
          .status(200)
          .send(post)
          .catch(err => {
            res.status(500).send({
              errorMessage: "error!"
            });
            console.log(err);
          });
      });
  },

  getFreelancerPosts: (req, res, next) => {
    let db = req.app.get("db");
    db.freelancers.getFreelancerPosts().then(posts => {
      return res.status(200).send(posts);
    });
  },
  deleteFreelancerPost: (req, res, next) => {
    let db = req.app.get("db");
    db.freelancers.deleteFreelancerPost(req.params.id).then(() => {
      return res.sendStatus(200);
    });
  },
  updateFreelancerPost: (req, res, next) => {
    // console.log("req.body", req.body, "params", req.params);
    let db = req.app.get("db");
    db.freelancers
      .updateFreelancerPost(req.params.id, req.body.title, req.body.body)
      .then(() => {
        return res.sendStatus(200);
      });
  },
  addFaveJob: (req, res, next) => {
    let db = req.app.get("db");
    const { employer_post_id, freelancer_id } = req.body;
    db.freelancers
      .addFaveJob([employer_post_id, freelancer_id])
      .then(fave => {
        res.status(200).send(fave);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getFaveJobs: (req, res, next) => {
    let db = req.app.get("db");
    db.freelancers.getFaveJobs(req.params.id).then(jobs => {
      return res.status(200).send(jobs);
    });
  },

  // deleteFaveJob: (req, res, next) => {
  //   let db = req.app.get("db");
  //   db.freelancers.deleteFaveJob(req.params.id).then(() => {
  //     return res.sendStatus(200);
  //   });
  // }
  deleteFaveJob: (req, res, next) => {
    let db = req.app.get("db");
    console.log(req.params);
    let { empid, freeid } = req.params;
    db.freelancers.deleteFaveJob(empid, freeid).then(() => {
      return res.sendStatus(200);
    });
  }
};
