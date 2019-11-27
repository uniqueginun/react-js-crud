import React, { Component } from "react";
import Person from "./Person";
import { Table } from "reactstrap";

class Persons extends Component {
  state = {};
  render() {
    return (
      <Table>
        <thead>
          <tr className="bg-dark text-white">
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.customers.length === 0 ? (
            <tr>
              <td colSpan={4}>No Customers</td>
            </tr>
          ) : (
            this.props.customers.map(customer => {
              return (
                <Person
                  key={customer.id}
                  customer={customer}
                  handleDelete={this.props.handleDelete}
                  handleUpdate={this.props.handleUpdate}
                />
              );
            })
          )}
        </tbody>
      </Table>
    );
  }
}

export default Persons;
