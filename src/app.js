import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import loadSpreadsheetData from "./services/spreadsheet";
import loadBoardData from "./services/board";

import ViewBase from "./views/base/index";
import ViewSchedule from "./views/schedule/index";

import Navbar from "./components/navbar";

import "./style/index.scss";

import { version } from './config';

const AppFooter = () => (
  <footer className="app__footer">
    <div className="container">
      <small>App Version { version }</small>
    </div>
  </footer>
);

const calculateDay = (start, current, { max = Infinity, min = -Infinity } = {}) => {
  return Math.min(max, Math.max(min, Math.floor((current - start) / 60 / 60 / 24 / 1000) + 1));
};

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
    return calculateDay(startDate, new Date(), { min: 0, max: 50 });
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
              path="/schedule/:day"
              render={ props => <ViewSchedule { ...props } { ...this.state } day={ this.day } />}
            />
            {/* <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} /> */}
          </div>
          {/* <AppFooter /> */}
        </Router>
      </div>
    );
  }
};
