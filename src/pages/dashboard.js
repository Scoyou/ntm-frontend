import Cookies from "js-cookie";
import React, { useState, useEffect, useLayoutEffect } from "react";
import api from "../services/api";
import { Grid, Segment, Divider, Loader } from "semantic-ui-react";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import DashboardGraphs from "../components/DashboardGraphs";
import styles from "../styles/Home.module.css";

const Dashboard = () => {
  const jwt = Cookies.get("jwt");
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const fetchTasks = async () => {
    const res = await api
      .get("tasks")
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
        setLoadingTasks(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchProjects = async () => {
    const res = await api
      .get("projects")
      .then((res) => res.data)
      .then((data) => {
        setProjects(data);
        setLoadingProjects(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingProjects(false);
      });
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  useEffect(() => {
    jwt && setUser(parseJwt(jwt).username);
  });

  return (
    <div>
      <main className={styles.main}>
        <div>
          {jwt && <h1 className={styles.title}>Welcome, {user}!</h1>}
          <h2>Recent Tasks</h2>
          <Segment color="green">
            <Grid columns={tasks.length < 4 ? tasks.length : 4} divided>
              {!loadingTasks ? (
                <Grid.Row>
                  {tasks.length <= 4
                    ? tasks.map((task) => (
                        <>
                          <Grid.Column mobile={16} tablet={8} computer={4}>
                            <TaskCard key={task.id} task={task} />
                          </Grid.Column>
                        </>
                      ))
                    : tasks.slice(0, 4).map((task) => (
                        <>
                          <Grid.Column mobile={16} tablet={8} computer={4}>
                            <TaskCard key={task.id} task={task} />
                          </Grid.Column>
                        </>
                      ))}
                </Grid.Row>
              ) : (
                <Grid.Row>
                  <Loader active inline="centered" />
                </Grid.Row>
              )}
            </Grid>
          </Segment>
          {tasks.length > 4 ? (
            <h3 style={{ float: "right" }}>
              <Link to="/tasks">See all tasks</Link>
            </h3>
          ) : (
            <></>
          )}
        </div>
        <h1>
          You have {tasks.filter((t) => t.status === "OPEN").length} open tasks
          and{" "}
          {
            tasks.filter(
              (t) => t.priority === "CRITICAL" && t.status !== "DONE"
            ).length
          }{" "}
          open critical tasks
        </h1>
        <Divider />
        <div>
          <DashboardGraphs tasks={tasks} />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
