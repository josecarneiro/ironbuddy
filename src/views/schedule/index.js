import React, { Component } from "react";

import ScheduleList from "./../../components/schedule";
import ScheduleNavigator from "./../../components/schedule/navigator";

export default class ScheduleView extends Component {
  get day () {
    const { match: { params: { day } } } = this.props;
    return day;
  }

  get schedule() {
    const { day } = this;
    const { schedule = [] } = this.props;
    const index = day - 1;
    return schedule[index] ? schedule[index].items : [];
  }

  render() {
    const { schedule, day } = this;
    return (
      <div className="page page--schedule">
        <main className="page__main">
          <section className="page__section page__section--schedule">
            <header className="page__section__header">
              <h2>Schedule</h2>
            </header>
            <ScheduleNavigator day={day}/>
            <ScheduleList schedule={schedule} />
          </section>
        </main>
      </div>
    );
  }
}
