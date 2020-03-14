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

  addEvent = (postId, title, date, body, user_id) => {
    var list = this.state.eventList;
    list.push({
      id: postId,
      title: title,
      body: body,
      allDay: true,
      start: date,
      end: date,
      notice_id: postId,
      user_id: user_id,
      modalFlag: false
    });
    this.setState({
      eventList: list
    });
  };

  getAllEvent = async () => {
    await api.getAllPosts("notice").then(res => {
      res.data.results.map(event => {
        if (event.is_recorded) {
          this.addEvent(
            event.id,
            event.event_name,
            event.notice_date,
            event.body,
            event.user_id
          );
        }
      });
    });
  };

  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
    // var backgroundColor = '#' + event.hexColor;
    var backgroundColor = '#FFBB00'; // 기본 이벤트 색상
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return { style: style };
}


  /* modal function */
  
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
    await this.setState({
      modalEvent: event
    });
    this.modalOpen();
    // console.log("모달 이벤트 상태저장! ", this.state.modalEvent);
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
          eventPropGetter={this.eventStyleGetter}
          onSelectEvent={(event, e) => {
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
