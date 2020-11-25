import React, { useState } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import api from "../services/api";

const TaskPriorityDropdown = ({ task, refetch }) => {
  const [priority, setPriority] = useState(task.priority);

  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const options = [
    { key: 1, label: "CRITICAL", value: "CRITICAL" },
    { key: 2, label: "PRESSING", value: "PRESSING" },
    { key: 3, label: "MAINTENANCE", value: "MAINTENANCE" },
  ];

  const updateTaskPriority = async (id, priority) => {
    const res = await api
      .patch(`tasks/${id}/priority`, { priority })
      .then((res) => {
        setPriority(res.data.priority);
        refetch();
      });
  };

  const handleChange = (taskId) => (e) => {
    updateTaskPriority(taskId, e.value);
  };

  return (
    <div>
      <Select
        value={priority}
        placeholder={priority}
        options={options}
        onChange={handleChange(task.id)}
      />
    </div>
  );
};

export default TaskPriorityDropdown;
