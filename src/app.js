import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import loadSpreadsheetData from "./services/spreadsheet";
import loadBoardData from "./services/board";

import ViewBase from "./views/base/index";
import ViewSchedule from "./views/schedule/index";

import ElementAnchor from "./components/elements/anchor";
import Navbar from "./components/navbar";

import "./style/index.scss";

import {
  version,
  extensionURL, 
  bootcampStartDate,
  bootcampDuration
} from './config';

import { calculateDay } from './util/day';

const AppFooter = () => (
  <footer className="app__footer">
    <div className="container">
      <small>App Version { version }</small>
      <ElementAnchor>About IronBuddy</ElementAnchor>
    </div>
  </footer>
);

const RedirectToExternal = ({ path, to }) => <Route path={ path } component={ () => {
  window.location = to;
  return;
} } />;

export default class AppWrapper extends Component {
  constructor (...args) {
    super(...args);
    this._config = {
      bootcampStartDate,
      bootcampDuration
    };
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
    const { bootcampStartDate: startDate } = this._config;
    if (!startDate) return 1;
    const now = new Date();
    // const now = new Date(2019, 7, 19);
    return calculateDay(startDate, now, { min: 0, max: 50 });
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
    const viewProps = { ...this.state, day: this.day };
    return (
      <div className="shell">
        <Router>
          <Navbar />
          <div className="container">
            <Route
              path="/"
              exact
              render={ props => <ViewBase { ...props } { ...viewProps } />}
            />
            <Route
              path="/schedule/:day"
              render={ props => <ViewSchedule { ...props } { ...viewProps } />}
            />
            <RedirectToExternal path="/extension" to={ extensionURL } />
          </div>
          {/* <AppFooter /> */}
        </Router>
      </div>
    );
  }
};
