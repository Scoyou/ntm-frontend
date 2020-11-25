import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";
import { usePaginatedQuery } from "react-query";
import Cookies from "js-cookie";
import api from "../services/api";

const ProjectsDropdown = (props) => {
  const jwt = Cookies.get("jwt");
  api.defaults.headers.Authorization = `Bearer ${jwt}`;

  const fetchProjects = async (key) => {
    const res = await api.get("projects");
    return res.data;
  };

  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["projects"],
    fetchProjects
  );

  const handleChange = (event, data) => {
    props.setProject(data.value);
  };

  const options =
    resolvedData &&
    resolvedData.map((project) => ({
      key: project.id,
      text: project.identifier,
      value: project.identifier,
    }));

  return (
    <>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <Menu compact>
          <Dropdown
            text={options.value}
            options={options}
            onChange={handleChange}
            simple
            value={options.value}
            item
          />
        </Menu>
      )}
    </>
  );
};

export default ProjectsDropdown;
