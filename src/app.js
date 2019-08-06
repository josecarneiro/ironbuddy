import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import loadSpreadsheetData from "./services/spreadsheet";
import loadBoardData from "./services/board";

import ViewBase from "./views/base/index";
import ViewSchedule from "./views/schedule/index";

import Navbar from "./components/navbar";

import "./style/index.scss";

export default class AppWrapper extends Component {
  constructor (...args) {
    super(...args);
    this.state = {
      configuration: {},
      schedule: [],
      students: [],
      resources: [],
      events: [],
      loaded: false
    };
  }

  get day () {
    const { configuration: { start_date: startDate } } = this.state;
    if (!startDate) return 1;
    return Math.floor((new Date() - startDate) / 60 / 60 / 24 / 1000);
  }

  async componentDidMount() {
    try {
      const [
        { configuration, students },
        { schedule, resources, events }
      ] = await Promise.all([
        loadSpreadsheetData(),
        loadBoardData()
      ]);
      this.setState({
        configuration,
        schedule,
        students,
        resources,
        events,
        loaded: true
      });
    } catch (error) {
      console.log('There was an error loading config and schedule');
    }
  }

  render () {
    return (
      <div className="shell">
        <Router>
          <Navbar />
          <div className="container">
            <Route
              path="/"
              exact
              render={ props => <ViewBase { ...props } { ...this.state } day={ this.day } />}
            />
            <Route
              path="/schedule"
              exact
              render={ props => <ViewSchedule { ...props } { ...this.state } day={ this.day } />}
            />
            {/* <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} /> */}
          </div>
        </Router>
      </div>
    );
  }
};
