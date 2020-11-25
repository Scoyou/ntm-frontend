import React, { useState } from "react";
import { Grid, Button, Container, Divider, Confirm } from "semantic-ui-react";
import Cookies from "js-cookie";
import ContentEditable from "react-contenteditable";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import moment from 'moment'

import ProjectBreadcrumb from "./ProjectBreadcrumb";
import TaskPriorityDropdown from "./TaskPriorityDropdown";
import TaskStatusDropdown from "./TaskStatusDropdown";
import api from "../services/api";
import CommentsIndex from "./CommentsIndex";

const Task = ({ task, refetch }) => {
  const [title, setTitle] = useState(task.title);
  const [timeout, setTimeout] = useState(0);
  const [editingDescription, setEditingDescription] = useState(false);
  const [newDescription, setnewDescription] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const deleteTask = async (id) => {
    const res = await api.delete(`tasks/${id}`).then(() => {
      refetch();
    });
  };

  const editTitle = async (id, title) => {
    const res = await api
      .patch(`tasks/${id}/title`, { title })
      .then(() => refetch());
  };

  const handleTitleChange = (id) => (evt) => {
    var title = evt.target.value;
    setTitle(title);
    if (timeout) clearTimeout(timeout);
    setTimeout(() => editTitle(id, title), 5000);
  };

  const updateDescription = async (id, description) => {
    const res = await api
      .patch(`tasks/${id}/description`, { description })
      .then(() => {
        setEditingDescription(false);
        refetch();
      });
  };

  const handleSubmit = (id, description) => (e) => {
    e.preventDefault();
    updateDescription(id, description);
  };

  const handleClose = () => {
    setEditingDescription(false);
  };

  return (
    <>
      <ProjectBreadcrumb project={task.projectIdentifier} task={task.title} />
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <Grid style={{ flex: "1" }}>
          <Grid.Row>
            <Grid.Column width={10}>
              <h2 style={{ cursor: "pointer" }}>
                <ContentEditable
                  html={title}
                  disabled={false}
                  onChange={handleTitleChange(task.id)}
                />
              </h2>
              <Divider />
              <p>
                <strong>Description:</strong>
              </p>
              <Container textAlign="justified" style={{ minHeight: "400px" }}>
                {!editingDescription && (
                  <div
                    dangerouslySetInnerHTML={{ __html: task.description }}
                    onClick={() => setEditingDescription(true)}
                    style={{ cursor: "pointer" }}
                  ></div>
                )}
                {editingDescription ? (
                  <div>
                    <SunEditor
                      setContents={task.description}
                      onChange={(content) => setnewDescription(content)}
                      height="300"
                      autoFocus={true}
                    />
                    <Button
                      onClick={handleSubmit(task.id, newDescription)}
                      content="Save"
                      labelPosition="left"
                      icon="edit"
                      primary
                    />

                    <Button
                      onClick={handleClose}
                      content="Cancel"
                      labelPosition="left"
                      icon="trash"
                      negative
                    />
                  </div>
                ) : (
                  <></>
                )}
              </Container>

              <CommentsIndex key={task.id} task={task} />
            </Grid.Column>
            <Grid.Column style={{ backgroundColor: "#add8e6" }} width={4}>
              <p>Project: {task.projectIdentifier}</p>
              <p>Assignee: {task.userId}</p>
              <TaskStatusDropdown task={task} refetch={refetch} />
              <TaskPriorityDropdown task={task} refetch={refetch} />

              <Divider />
              <h3>Danger Zone</h3>
              <Button
                content="Delete Task"
                labelPosition="left"
                icon="trash"
                negative
                onClick={() => setOpenConfirmation(true)}
              />
              <Confirm
                open={openConfirmation}
                onCancel={() => setOpenConfirmation(false)}
                onConfirm={() => {
                  deleteTask(task.id)
                  setOpenConfirmation(false)
                }}
                confirmButton="Delete Task"
                content={`Are you sure you want to delete ${task.title}?`}
              />
              <Divider />
              <div>Created at: {moment(task.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default Task;
