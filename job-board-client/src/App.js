import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJob from "./components/AddJob";
import Job from "./components/Job";
import JobsList from "./components/JobsList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/jobs" className="navbar-brand">
          TaylorJobs
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/jobs"} className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/jobs"]} component={JobsList} />
          <Route exact path="/add" component={AddJob} />
          <Route path="/jobs/:id" component={Job} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
