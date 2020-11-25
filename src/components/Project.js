import React from "react";
import { Card } from "semantic-ui-react";

const Project = ({ project }) => {
  return (
    <Card>
      <h2>{project.title}</h2>
      <h2>{project.identifier}</h2>
      <p>{project.description}</p>
    </Card>
  );
};

export default Project;
