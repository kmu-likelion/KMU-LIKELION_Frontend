import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../api/BoardAPI";
import EventModal from "./EventModal";

const localizer = momentLocalizer(moment);

class ClubCalendar extends React.Component {
  state = {
    eventList: [],
    modalEvent: []
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
          end: new Date("2020/2/12/00:00:00:10"),
          notice_id: 0
        }
      ]
    });
    this.getAllEvent();
  }

  addEvent = (postId, title, date, body) => {
    var list = this.state.eventList;
    list.push({
      id: postId,
      title: title,
      body: body,
      allDay: true,
      start: date,
      end: date,
      notice_id: postId,
      modalFlag: false
    });
    this.setState({
      eventList: list
    });
  };

  getAllEvent = async () => {
    await api.getAllPosts("notice").then(res => {
      console.log("가져오기 성공!", res);
      res.data.map(event => {
        if (event.is_recorded) {
          this.addEvent(
            event.id,
            event.event_name,
            event.notice_date,
            event.body
          );
        }
      });
    });
  };

  modalOpen = () => {
    this.setState({
      modalFlag: true
    });
  };

  modalClose = () => {
    this.setState({
      modalFlag: false
    });
  };

  modalEvent = async event => {
    // event.preventDefault();
    await this.setState({
      modalEvent: event
    });
    this.modalOpen();
    console.log("모달 이벤트 상태저장! ", this.state.modalEvent);
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
            // alert(event.body);
            this.modalEvent(event);
          }}
        />
        <EventModal
          eventInfo={this.state.modalEvent}
          open={this.state.modalFlag}
          handlingOpen={this.modalOpen}
          handlingClose={this.modalClose}
          getAllEvent={this.getAllEvent}
        />
      </div>
    );
  }
}

export { ClubCalendar };
