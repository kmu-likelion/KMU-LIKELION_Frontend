import React from "react";
// import Grid from "@material-ui/core/Grid";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../api/api_calendar.js";

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
    this.getAllEvent();
  }

  addEvent = (id, title, start, end, body, notice_id) => {
    var list = this.state.eventList;
    list.push({
      id: id,
      title: title,
      body: body,
      allDay: true,
      start: start,
      end: end,
      notice_id: notice_id
    });
    this.setState({
      eventList: list
    });
  };

  getAllEvent = async () => {
    await api.getAllCalendar().then(res => {
      console.log("가져오기 성공!", res);
      res.data.map(event => {
        this.addEvent(
          event.id,
          event.title,
          event.start_date,
          event.end_date,
          event.contents,
          event.notice_id
        );
      });
    });
  };

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
          }}
        />
      </div>
    );
  }
}

export { ClubCalendar };
