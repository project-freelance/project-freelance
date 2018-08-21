import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./components/Main/Main";
import Splash from "./components/Splash/Splash";
import Feed from "./components/Main/Feed/Feed";
import Profile from "./components/Main/Profile/Profile";
import Setup from "./components/Setup/Setup";
import Settings from "./components/Main/Settings/Settings";
import Post from "./components/Main/Feed/Post/Post";
import Portfolio from "./components/Main/Profile/Portfolio/Portfolio";
import AppliedJobs from "./components/Main/Feed/AppliedJobs/AppliedJobs";
import FreelancersList from "./components/Main/Profile/FreelancersList/FreelancersList";

export default (
  <Switch>
    <Route exact path="/" component={Splash} />
    <Route exact path="/setup" component={Setup} />

    <Route
      path="/main"
      render={() => {
        return (
          <Main>
            <Switch>
              <Route path="/main/feed" component={Feed} />
              <Route path="/main/myprofile/:id" component={Profile} />
              <Route path="/main/profile/:id" component={Profile} />
              <Route path="/main/settings" component={Settings} />
              <Route exact path="/main/post" component={Post} />
              <Route path="/main/portfolio" component={Portfolio} />
              <Route path="/main/appliedjobs" component={AppliedJobs} />
              <Route path="/main/freelancers" component={FreelancersList} />
            </Switch>
          </Main>
        );
      }}
    />
  </Switch>
);
