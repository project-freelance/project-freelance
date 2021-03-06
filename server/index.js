require("dotenv").config();
const express = require("express");
const axios = require("axios");
const massive = require("massive");
const { json } = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const strategy = require("./strategy");
const path = require("path");
const PORT = process.env.PORT || 3002;

const app = express();

// controllers
const userCtrl = require("./controllers/userCtrl");
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
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "../build")));

//Auth /Sessions

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});

app.get("/login", (req, res, next) => {
  passport.authenticate("auth0", (err, user, info) => {
    const db = req.app.get("db");
    db.users.find({ auth_id: user.id }).then(([dbUser]) => {
      if (!dbUser) {
        db.users
          .insert({
            first_name: user.name.givenName,
            last_name: user.name.familyName,
            email: user.emails[0].value,
            session_id: req.session.id,
            auth_id: user.id,
            profile_image: user.picture
          })
          .then(newUser => {
            req.session.user = newUser;
            // return res.redirect("http://localhost:3000/#/setup");
            return res.redirect(process.env.REACT_APP_SETUP);
          });
      } else {
        req.session.user = dbUser;
        // return res.redirect("http://localhost:3000/#/main/feed");
        return res.redirect(process.env.REACT_APP_FEED);
      }
    });
  })(req, res, next);
});

app.get("/logout", (req, res, next) => {
  req.session = null;
  // res.redirect("http://localhost:3000");
  res.redirect(process.env.REACT_APP_HOMEPAGE);
});

// End Auth
// Amazon S3 Uploader
app.use(
  "/s3",
  require("react-s3-uploader/s3router")({
    bucket: process.env.AWS_S3_URL,
    region: "us-east-1", //optional
    signatureVersion: "v4", //optional (use for some amazon regions: frankfurt and others)
    headers: { "Access-Control-Allow-Origin": "*" }, // optional
    ACL: "private", // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
  })
);

// End of Amazon S3 Uploader

// user
app.get("/api/user", userCtrl.getCurrentUser);
app.get("/api/users", userCtrl.getUsers);
app.put("/api/user/role/:id", userCtrl.updateRole);
app.put("/api/user/specialty/:id", userCtrl.updateSpecialty);
app.put("/api/user", userCtrl.updateUser);
// app.post("/api/user-profile", authCtrl.createUserProfile);

// employer
app.get("/api/employers", employerCtrl.getEmployers);
app.get("/api/employer/:id", employerCtrl.getEmployer);
app.post("/api/employer/:id", employerCtrl.addEmployer);
app.put("/api/employer/:id", employerCtrl.updateEmployer);
// app.post("/api/employers-profile", employerCtrl.createEmployerProfile);

app.post("/api/employerPost", employerCtrl.addEmployerPost);
app.get("/api/employerPosts", employerCtrl.getEmployerPosts);
app.delete("/api/employerPost/:id", employerCtrl.deleteEmployerPost);
app.put("/api/employerPost/:id", employerCtrl.updateEmployerPost);

app.get("/api/employer/appliedJobs/:id", employerCtrl.getAppliedJobs);

// gets all Freelancers who applied to an employers job post id
app.get(
  "/api/employer/appliedJobs/freelancers/:id",
  employerCtrl.getEmployerJobFreelancers
);

// freelancer
app.post("/api/freelancer/:id", freelancerCtrl.addFreelancer);
app.get("/api/freelancers", freelancerCtrl.getFreelancers);
app.get("/api/freelancer/:id", freelancerCtrl.getFreelancer);
app.get("/api/all_freelancers", freelancerCtrl.getAllFreelancerInfo);
app.put("/api/freelancer/:id", freelancerCtrl.updateFreelancer);

app.post("/api/freelancerPost", freelancerCtrl.addFreelancerPost);
app.get("/api/freelancerPosts", freelancerCtrl.getFreelancerPosts);
app.delete("/api/freelancerPost/:id", freelancerCtrl.deleteFreelancerPost);
app.put("/api/freelancerPost/:id", freelancerCtrl.updateFreelancerPost);

app.post("/api/user/jobs", freelancerCtrl.addFaveJob);
app.get("/api/user/jobs", freelancerCtrl.getFaveJobs);
// app.delete("/api/user/job/:id", freelancerCtrl.deleteFaveJob);
app.delete("/api/user/job/:empid/:freeid", freelancerCtrl.deleteFaveJob);

// portfolio
app.get("/api/portfolio/:id", portfolioCtrl.getPortfolio);
app.post("/api/portfolio", portfolioCtrl.addPortfolio);
app.put("/api/portfolio/:id", portfolioCtrl.updatePortfolio);
app.delete("/api/portfolio/:id", portfolioCtrl.deletePortfolio);

// reviews
app.get("/api/reviews/:id", reviewCtrl.getReviews);
app.post("/api/review", reviewCtrl.addReview);
app.delete("/api/review/:id", reviewCtrl.deleteReview);

app.get("/api/rating/:id", reviewCtrl.getAvgRating);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
