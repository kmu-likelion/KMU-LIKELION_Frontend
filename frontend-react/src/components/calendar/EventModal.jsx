import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import api from "../../api/BoardAPI";
import Viewer from "../Viewer";
import AuthButton from "../common/AuthButton";
class EventModal extends React.Component {
  deleteEvent = async (event, id) => {
    event.preventDefault();
    if (window.confirm("이벤트를 삭제하시겠습니까?") === true) {
      await api
        .deletePost("notice", id)
        .then(res => {
          console.log("이벤트가 정상적으로 제거되었음.", res);
          document.location.href = "/";
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return false;
    }
  };

  render() {
    const { eventInfo, open, handlingClose } = this.props;

    return (
      <div>
        <Modal show={open} onHide={handlingClose}>
          <Modal.Header closeButton>
            <Modal.Title>{eventInfo.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Viewer value={String(eventInfo.body)} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handlingClose}>닫기</Button>
            <AuthButton
              authType="isWriter"
              info={eventInfo.notice_id}
              boardName={"notice"}
              button={
                <>
                  <Button
                    onClick={event => {
                      this.deleteEvent(event, eventInfo.id);
                    }}
                  >
                    삭제
                  </Button>
                </>
              }
            />

            <Button
              component={Link}
              to={`/notice/detail/${eventInfo.notice_id}`}
            >
              보러가기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EventModal;
