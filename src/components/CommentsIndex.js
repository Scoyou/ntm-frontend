import React, { useState, useEffect } from "react";
import { usePaginatedQuery } from "react-query";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import TaskComment from "./TaskComment";
import Cookies from "js-cookie";
import api from "../services/api";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const CommentsIndex = ({ task }) => {
  const [addComment, setAddComment] = useState(false);

  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const [newComment, setNewComment] = useState("");

  const fetchComments = async (key, id) => {
    const res = await api.get(`tasks/${id}`);
    return res.data;
  };

  const { resolvedData, status, refetch, latestData } = usePaginatedQuery(
    ["projects", task.id],
    fetchComments
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = newComment;
    createComment(comment, task.id);
    setAddComment(false)
  };

  const createComment = async (body, taskId) => {
    const res = await api
      .post("comments", {
        body,
        taskId,
      })
      .then(() => {
        setNewComment("");
        refetch();
      });
  };

  const deleteComment = async (id) => {
    const jwt = Cookies.get("jwt");
    const res = await api.delete(`comments/${id}`).then(() => {
      refetch();
    });
  };

  return (
    <div>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <div>
            <Comment.Group size="small">
              <Header as="h3" dividing>
                Comments
              </Header>
              <Form size="small" reply>
                {!addComment && (
                  <div
                    style={{
                      cursor: "text",
                      border: "inset",
                      height: '40px',
                      marginBottom: '20px',
                      color: '#b0b0b0'
                    }}
                    onClick={() => setAddComment(true)}
                  >
                    Add a comment...
                  </div>
                )}
                {addComment && (
                  <>
                    <SunEditor 
                    onChange={(content) => setNewComment(content)} 
                    placeholder="Add a comment..."
                    autoFocus={true}
                    />
                    <Button
                      content="Submit"
                      labelPosition="left"
                      icon="edit"
                      primary
                      onClick={handleSubmit}
                    />
                    
                    <Button
                      content="Cancel"
                      labelPosition="left"
                      icon="trash"
                      negative
                      onClick={() => setAddComment(false)}
                    />
                  </>
                )}
              </Form>
              {latestData.comments.map((comment) => (
                <div key={comment.id}>
                  <TaskComment comment={comment} delete={deleteComment} />
                </div>
              ))}
            </Comment.Group>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsIndex;
