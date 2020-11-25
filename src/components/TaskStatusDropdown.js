import React, { useState } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import api from "../services/api";

const TaskStatusDropdown = ({ task, refetch }) => {
  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const [status, setStatus] = useState(task.status);

  const options = [
    { key: 1, label: "OPEN", value: "OPEN" },
    { key: 2, label: "IN PROGRESS", value: "IN_PROGRESS" },
    { key: 3, label: "DONE", value: "DONE" },
  ];

  const updateTaskStatus = async (id, status) => {
    const res = await api
      .patch(`tasks/${id}/status`, { status })
      .then((res) => {
        setStatus(res.data.status);
        refetch();
      });
  };

  const handleChange = (taskId) => (e) => {
    updateTaskStatus(taskId, e.value);
  };

  return (
    <div>
      <Select
        value={status}
        placeholder={status}
        options={options}
        onChange={handleChange(task.id)}
      />
    </div>
  );
};

export default TaskStatusDropdown;
