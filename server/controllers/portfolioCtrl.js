module.exports = {
  addPortfolio: (req, res, next) => {
    let db = req.app.get("db");
    const { image_url, user_id } = req.body;

    db.portfolio
      .addPortfolio([image_url, user_id])
      .then(portfolio => {
        // console.log(freelancer);
        return res.status(200).send(portfolio);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getPortfolio: (req, res, next) => {
    let db = req.app.get("db");

    db.portfolio.getPortfolio([req.params.id]).then(portfolio => {
      return res.status(200).send(portfolio);
    });
  }
};
