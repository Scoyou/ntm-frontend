import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";

const TaskComment = (props) => (
  <Comment>
    <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
    <Comment.Content styles={{ float: "left" }}>
      <Comment.Author as="a">{props.comment.userName}</Comment.Author>
      <Comment.Metadata>
        <div>
          {moment(props.comment.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </div>
      </Comment.Metadata>
      <Comment.Text
        dangerouslySetInnerHTML={{ __html: props.comment.body }}
      ></Comment.Text>
    </Comment.Content>
    <button onClick={() => props.delete(props.comment.id)}>Delete</button>
  </Comment>
);

export default TaskComment;
