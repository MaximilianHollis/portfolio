import React from 'react';
import GlobalStyle from './globalStyles';
import Navbar from './Elements/Navbar/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';


import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Theme from './theme.js';


function App() {
  return (
    <Router>
      <Theme >
        <Navbar />
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <UnPrivateRoute path="/login" component={Login} />
          <UnPrivateRoute path="/register" component={Register} />
         {/*  <PrivateRoute path="/dashboard" roles={["user", "admin"]} component={Dashboard} />
          <PrivateRoute path="/admin" roles={["admin"]} component={Admin} /> */}
        </Switch>
        <Footer />
      </Theme>
    </Router>
  );
}

export default App;
