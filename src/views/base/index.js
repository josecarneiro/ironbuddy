import React, { Component } from "react";

import ScheduleList from "./../../components/schedule/list";
import EventList from "./../../components/event/list";
import ResourceList from "./../../components/resource/list";
import DayInput from "./../../components/input/day/index";

import "./style.scss";

export default class BaseView extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      day: props[0].day
    };
    this.handleOnDayChange = this.handleOnDayChange.bind(this);
  }

  get schedule() {
    const { day } = this.state;
    const { schedule = [] } = this.props;
    const index = day - 1;
    return schedule[index] ? schedule[index].items : [];
  }

  get events() {
    const { day } = this.state;
    const { events = [] } = this.props;
    console.log(events);
    return events
      .filter(({ date }) => {
        const delta = date - Date.now();
        const MILLISECONDS_IN_ONE_HOUR = 1000 * 60 * 60;
        return delta < MILLISECONDS_IN_ONE_HOUR * 24 * 2 && delta > MILLISECONDS_IN_ONE_HOUR * 2 * -1;
      });
  }

  handleOnDayChange(day) {
    this.setState({ day });
  }

  render() {
    const { day } = this.state;
    const { events, schedule, handleOnDayChange } = this;
    return (
      <div className="page page--base">
        <header>
          <h1>Welcome James Dean</h1>
        </header>
        <main className="page__main">
          <section className="page__section page__section--schedule">
            <header className="page__section__header">
              <h2>Today's Schedule</h2>
              <a href="#">See More</a>
            </header>
            {/* <DayInput day={day} onChange={handleOnDayChange} /> */}
            <ScheduleList schedule={schedule} />
          </section>
        </main>
        <aside className="page__aside">
          <section className="page__section page__section--event">
            <h2>Events</h2>
            <EventList events={events} />
          </section>
          <section className="page__section page__section--things-of-interest">
            <h2>Things of Interest</h2>
            <ResourceList resources={ [] } />
          </section>
          <section className="page__section page__section--resources">
            <h2>Resources</h2>
            <ResourceList resources={ [] } />
          </section>
        </aside>
      </div>
    );
  }
}
