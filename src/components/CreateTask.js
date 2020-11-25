import React, { useState } from "react";
import { Button, Modal, Form, TextArea } from "semantic-ui-react";
import Cookies from "js-cookie";

import ProjectDropdown from "./ProjectsDropdown";
import SetPriorityDropdown from "./SetPriorityDropdown";
import api from "../services/api";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const CreateTaskPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const createTask = async (title, project, priority, description) => {
    const res = await api
      .post("tasks", { title, project, priority, description })
      .then(() => {
        setTitle("");
        setProject("");
        setDescription("");
        setPriority("");
        setOpen(false);
        props.refetch();
      })
      .catch((e) => {
        setErrors([e.response.data.message]);
      });
  };

  const handleSubmit = (title, project, priority, description, status) => (
    e
  ) => {
    e.preventDefault();
    createTask(title, project, priority, description, status);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Create Task</Button>}
    >
      <Modal.Header>Create new task</Modal.Header>
      {errors && <p style={{color: 'red'}}>{errors}</p>}
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Project</label>
            <ProjectDropdown setProject={setProject} />
          </Form.Field>
          <Form.Field>
            <label>Priority</label>
            <SetPriorityDropdown setPriority={setPriority} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <SunEditor
              height="300"
              onChange={(content) => setDescription(content)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={handleSubmit(title, project, priority, description)}
          type="submit"
        >
          Submit
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateTaskPage;
