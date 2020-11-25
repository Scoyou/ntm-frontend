import React from "react";
import { Breadcrumb } from "semantic-ui-react";

const ProjectBreadcrumb = (props) => {
  return (
    <Breadcrumb style={{ marginBottom: "5px" }}>
      <Breadcrumb.Section link>{props.project}</Breadcrumb.Section>
      <Breadcrumb.Divider />
      <Breadcrumb.Section active>{props.task}</Breadcrumb.Section>
    </Breadcrumb>
  );
};

export default ProjectBreadcrumb;
