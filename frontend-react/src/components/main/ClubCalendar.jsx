import React from "react";
// import Grid from "@material-ui/core/Grid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class ClubCalendar extends React.Component {
  state = {
    eventList: []
  };

  componentDidMount() {
    this.setState({
      eventList: [
        {
          id: 0,
          title: "Test!!!",
          body: "이날은 무엇을할까요~~",
          allDay: true,
          start: new Date("2020/2/10/00:00:00:10"),
          end: new Date("2020/2/12/00:00:00:10")
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={this.state.eventList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          views={["month"]}
          onSelectEvent={(event, e) => {
            alert(event.body);
            // console.log("event:", event.body, " === ", e);
          }}
        />
      </div>
    );
  }
}

export { ClubCalendar };
