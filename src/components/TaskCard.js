import React from "react";
import { Card } from "semantic-ui-react";

const TaskCard = ({ task }) => {
  return (
    <Card key={task.id}>
      <div style={{ backgroundColor: "#F0F0F0" }}>
        <h3>{task.title}</h3>
      </div>
      <h3 style={{ color: task.priority === "CRITICAL" ? "red" : "black" }}>
        {task.priority}
      </h3>
      <h3>{task.status}</h3>
    </Card>
  );
};

export default TaskCard;
