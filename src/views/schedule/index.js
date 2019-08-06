import React, { Component } from "react";

import ScheduleList from "./../../components/schedule/list";
import DayInput from "./../../components/input/day/index";

// import "./style.scss";

export default class ScheduleView extends Component {
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

  handleOnDayChange(day) {
    this.setState({ day });
  }

  render() {
    const { day } = this.state;
    const { schedule, handleOnDayChange } = this;
    return (
      <div className="page page--schedule">
        <main className="page__main">
          <section className="page__section page__section--schedule">
            <header className="page__section__header">
              <h2>Schedule</h2>
            </header>
            <DayInput day={day} onChange={handleOnDayChange} />
            <ScheduleList schedule={schedule} />
          </section>
        </main>
      </div>
    );
  }
}
