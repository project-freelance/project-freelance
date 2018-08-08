import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Main from './components/Main/Main';
import Splash from './components/Splash/Splash';
import Feed from './components/Main/Feed/Feed';
import Profile from './components/Main/Profile/Profile';
import Setup from './components/Setup/Setup';
import Settings from './components/Main/Settings/Settings';
import Post from './components/Main/Feed/Post/Post';

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
              <Route path="/main/profile/:id" component={Profile} />
              <Route path="/main/settings" component={Settings} />
              <Route path="/main/feed/post" component={Post} />
            </Switch>
          </Main>
        );
      }}
    />
  </Switch>
);
