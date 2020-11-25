import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import Cookies from "js-cookie";
import api from "../services/api";

const SignInPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const login = async (username, password) => {
    const res = await api
      .post("auth/signin", { username, password })
      .then((res) => {
        Cookies.set("jwt", res.data.accessToken);
        props.setLoggedIn(true);
        setOpen(false);
      }).catch(e => setErrors([e.response.data.message]));
  };

  const handleSubmit = (username, password) => (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Login</Button>}
    >
      <Modal.Header>Login</Modal.Header>
      {errors &&
        errors.map((e) => (
          <ul>
            <li style={{ color: "red" }}>{e}</li>
            <br />
          </ul>
        ))}
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field type="password">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit(username, password)} type="submit">
          Submit
        </Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SignInPage;
