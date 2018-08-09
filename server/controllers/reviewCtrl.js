module.exports = {
  addReview: (req, res, next) => {
    let db = req.app.get("db");
    const { review, user_id, reviewer_id, moment, rating } = req.body;

    db.reviews
      .addReview([review, user_id, reviewer_id, moment, rating])
      .then(review => {
        // console.log(freelancer);
        return res.status(200).send(review);
      })
      .catch(err => {
        res.status(500).send({
          errorMessage: "error!"
        });
        console.log(err);
      });
  },

  getReviews: (req, res, next) => {
    let db = req.app.get("db");

    db.reviews.getReviews().then(reviews => {
      return res.status(200).send(reviews);
    });
  },

  getAvgRating: (req, res, next) => {
    let db = req.app.get("db");
    db.reviews.getAvgRating(req.params.id).then(rating => {
      // console.log(+rating[0].round);
      return res.status(200).send(rating[0].round);
    });
  },

  deleteReview: (req, res, next) => {
    let db = req.app.get("db");
    db.reviews.deleteReview(req.params.id).then(() => {
      return res.sendStatus(200);
    });
  }
};
