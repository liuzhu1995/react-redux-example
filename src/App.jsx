import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from "./app/NavBar";
import Counter from './features/counter/Counter';
import Posts, { SinglePostPage, EditPostForm } from './features/posts';

function App() {
  return (
   <Router>
     <div>
       <Navbar/>
       <Switch>
         <Route exact path="/" component={Posts}/>
         <Route path="/counter" component={Counter}/>
         <Route path="/posts/:postId" component={SinglePostPage}/>
         <Route path="/editPost/:postId" component={EditPostForm}/>
         <Redirect to="/" />
       </Switch>
     </div>
   </Router>
  );
}
export default App;
