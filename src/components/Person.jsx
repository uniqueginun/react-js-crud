import React from "react";
import { Button } from "reactstrap";

const Person = props => {
  let { id, name, email, phone } = props.customer;

  return (
    <tr className="bg-light">
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <Button
          onClick={() => props.handleUpdate(id, name, email, phone)}
          color="warning"
        >
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </Button>{" "}
        <Button onClick={() => props.handleDelete(id)} color="danger">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </Button>{" "}
      </td>
    </tr>
  );
};

export default Person;
