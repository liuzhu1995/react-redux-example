import React from "react";
import {  BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import Navbar from "./app/NavBar";
import Counter from './features/counter/Counter';
import Posts, { SinglePostPage, EditPostForm } from './features/posts';
import { ProvideAuth, RouteWithSubRoutes, BasicLayout } from './components';
import LoginPage from './views/login';
import routeList from './router'

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          {/* <Navbar/> */}
          <Switch>
            <Route path="/posts" component={Posts}/>
            <Route path="/counter" component={Counter}/>
            <Route path="/posts/:postId" component={SinglePostPage}/>
            <Route path="/editPost/:postId" component={EditPostForm}/>
            <Route path="/login" component={LoginPage} />
            <BasicLayout>
              {RouteWithSubRoutes(routeList)}
            </BasicLayout>
            <Redirect exact from="/" to="/dashboard" />
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
export default App;
