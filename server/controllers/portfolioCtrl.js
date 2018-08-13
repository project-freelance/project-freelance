module.exports = {
  addPortfolio: (req, res, next) => {
    let db = req.app.get("db");
    const {
      image_url1,
      image_url2,
      image_url3,
      link1,
      link2,
      link3,
      user_id
    } = req.body;

    db.portfolio
      .addPortfolio([
        "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png",
        "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png",
        "https://sanitationsolutions.net/wp-content/uploads/2015/05/empty-image.png",
        "null",
        "null",
        "null",
        user_id
      ])
      .then(portfolio => {
        console.log(portfolio);
        return res.status(200).send(portfolio);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  // addPortfolio: (req, res, next) => {
  //   let db = req.app.get("db");
  //   const { image_url, user_id } = req.body;

  //   db.portfolio
  //     .addPortfolio([image_url, user_id])
  //     .then(portfolio => {
  //       // console.log(freelancer);
  //       return res.status(200).send(portfolio);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         errorMessage: "error!"
  //       });
  //       console.log(err);
  //     });
  // },

  getPortfolio: (req, res, next) => {
    let db = req.app.get("db");

    db.portfolio.getPortfolio([req.params.id]).then(portfolio => {
      return res.status(200).send(portfolio);
    });
  },

  updatePortfolio: (req, res, next) => {
    let db = req.app.get("db");
    db.portfolio
      .updatePortfolio(
        req.params.id,
        req.body.image_url1,
        req.body.image_url2,
        req.body.image_url3,
        req.body.link1,
        req.body.link2,
        req.body.link3
      )
      .then(() => {
        return res.sendStatus(200);
      });
  },

  deletePortfolio: (req, res, next) => {
    let db = req.app.get("db");
    db.portfolio.deletePortfolio(req.params.id).then(() => {
      return res.sendStatus(200);
    });
  }
};
