require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const PORT = process.env.PORT || 3001;

const app = express();

// controllers
const authCtrl = require("./controllers/authCtrl");
const employerCtrl = require("./controllers/employerCtrl");
const freelancerCtrl = require("./controllers/freelancerCtrl");
const portfolioCtrl = require("./controllers/portfolioCtrl");
const reviewCtrl = require("./controllers/reviewCtrl");

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    return app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(json());
app.use(cors());

// user
// app.put("/api/user", authCtrl.updateUser);
// app.post("/api/user-profile", authCtrl.createUserProfile);

// employer
app.get("/api/employers", employerCtrl.getEmployers);
app.get("/api/employer/:id", employerCtrl.getEmployer);
// app.post("/api/employer", employerCtrl.addEmployer);
app.put("/api/employer/:id", employerCtrl.updateEmployer);
// app.post("/api/employers-profile", employerCtrl.createEmployerProfile);

app.post("/api/employerPost", employerCtrl.addEmployerPost);
app.get("/api/employerPosts", employerCtrl.getEmployerPosts);
app.delete("/api/employerPost/:id", employerCtrl.deleteEmployerPost);
app.put("/api/employerPost/:id", employerCtrl.updateEmployerPost);

app.get("/api/employer/");

// freelancer
// app.post("/api/freelancer", freelancerCtrl.addFreelancer);
app.get("/api/freelancers", freelancerCtrl.getFreelancers);
app.get("/api/freelancer/:id", freelancerCtrl.getFreelancer);
app.put("/api/freelancer/:id", freelancerCtrl.updateFreelancer);

app.post("/api/freelancerPost", freelancerCtrl.addFreelancerPost);
app.get("/api/freelancerPosts", freelancerCtrl.getFreelancerPosts);
app.delete("/api/freelancerPost/:id", freelancerCtrl.deleteFreelancerPost);
app.put("/api/freelancerPost/:id", freelancerCtrl.updateFreelancerPost);

app.post("/api/user/jobs", freelancerCtrl.addFaveJob);
app.get("/api/user/jobs/:id", freelancerCtrl.getFaveJobs);

// portfolio
app.get("/api/portfolio/:id", portfolioCtrl.getPortfolio);
app.post("/api/portfolio", portfolioCtrl.addPortfolio);
app.put("/api/portfolio/:id", portfolioCtrl.updatePortfolio);
app.delete("/api/portfolio/:id", portfolioCtrl.deletePortfolio);

// reviews
app.get("/api/reviews", reviewCtrl.getReviews);
app.post("/api/review", reviewCtrl.addReview);
app.delete("/api/review/:id", reviewCtrl.deleteReview);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
