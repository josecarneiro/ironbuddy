import React, { Component } from "react";

import { environmentIsProduction } from './../../config';

import ScheduleList from "./../../components/schedule";
import EventList from "./../../components/event/list";
import ResourceList from "./../../components/resource/list";
import ElementAnchor from "./../../components/elements/anchor";

import "./style.scss";
// const environmentIsProduction = true;

export default class BaseView extends Component {
  get schedule() {
    const { day } = this.props;
    const { schedule = [] } = this.props;
    const index = day - 1;
    return schedule[index] ? schedule[index].items : [];
  }

  get events() {
    const { events = [] } = this.props;
    return events
      .filter(({ date }) => {
        const delta = date - Date.now();
        const MILLISECONDS_IN_ONE_HOUR = 1000 * 60 * 60;
        return delta < MILLISECONDS_IN_ONE_HOUR * 24 * 2 && delta > MILLISECONDS_IN_ONE_HOUR * 2 * -1;
      });
  }

  get student() {
    return {
      id: 'james_dean',
      name: 'James Dean'
    };
  }

  render() {
    const { events, schedule, student } = this;
    const { day } = this.props;
    return (
      <div className="page page--base">
        { !environmentIsProduction && (
          <header className="page__header">
            <h1>Welcome { student.name }</h1>
          </header>
        ) }
        <main className="page__main">
          <section className="page__section page__section--schedule">
            <header className="page__section__header">
              <h2>Today's Schedule</h2>
              <ElementAnchor link={ `/schedule/${ day }` }>See More</ElementAnchor>
            </header>
            <ScheduleList schedule={schedule} />
          </section>
        </main>
        { !environmentIsProduction && (
          <aside className="page__aside">
            { !!events.length && (
              <section className="page__section page__section--event">
                <h2>Campus News</h2>
                <EventList events={events} />
              </section>
            ) }
            { !!events.length && (
              <section className="page__section page__section--event">
                <h2>Events</h2>
                <EventList events={events} />
              </section>
            ) }
            <section className="page__section page__section--things-of-interest">
              <h2>Things of Interest</h2>
              <ResourceList resources={ [] } />
            </section>
            <section className="page__section page__section--resources">
              <h2>Resources</h2>
              <ResourceList resources={ [] } />
            </section>
          </aside>
        ) }
      </div>
    );
  }
}
