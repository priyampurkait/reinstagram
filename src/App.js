import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Error from "./components/error/Error";
import Signup from "./components/signup/Signup";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        {/* <PrivateRoute path="/about" component={About} />
        <PrivateRoute path="/services" component={Services} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route path="*" component={Error} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
