import React, { useState } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import api from "../services/api";

const SignUpPage = (props) => {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const signUp = async (username, password) => {
    const res = await api
      .post("auth/signup", { username, password })
      .then(() => {
        setOpen(false);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setErrors("");
      })
      .catch((e) => {
        setErrors([e.response.data.message]);
      });
  };

  const handleSubmit = (username, password) => (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      signUp(username, password);
    }
  };

  return (
    <Modal
      onClose={() => {
        setOpen(false);
      }}
      onOpen={() => setOpen(true)}
      closeOnDimmerClick={false}
      open={open}
      trigger={<Button>Sign Up</Button>}
    >
      <Modal.Header>Sign Up</Modal.Header>
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
          {confirmPassword === password ? (
            <>
              <></>
            </>
          ) : (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <Form.Field type="password">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleSubmit(username, password)} type="submit">
          Submit
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            setUsername("");
            setPassword("");
            setConfirmPassword("");
            setErrors("");
          }}
        >
          Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SignUpPage;
