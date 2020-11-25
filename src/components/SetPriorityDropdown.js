import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

const SetPriorityDropdown = (props) => {
  const options = [
    { key: 1, label: "CRITICAL", value: "CRITICAL" },
    { key: 2, label: "PRESSING", value: "PRESSING" },
    { key: 3, label: "MAINTENANCE", value: "MAINTENANCE" },
  ];

  const handleChange = (event, data) => {
    props.setPriority(data.value);
  };

  return (
    <>
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
    </>
  );
};

export default SetPriorityDropdown;
