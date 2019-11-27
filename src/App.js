import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import SpinnerComponent from "./components/Spinner";
import Persons from "./components/Persons";
import axios from "axios";

class App extends Component {
  state = {
    loading: true,
    customers: [],
    modal: false,
    name: "",
    email: "",
    phone: "",
    id: null
  };

  setModal() {
    this.setState({ modal: !this.state.modal });
  }

  toggle = () => this.setModal();

  style = { padding: ".5rem" };

  componentDidMount() {
    this.fetchCustomers();
  }

  async fetchCustomers() {
    const response = await axios.get("http://customers.test/api/customers");
    this.setState({ loading: !this.state.loading, customers: response.data });
  }

  handleUpdate = (id, name, email, phone) => {
    this.setState({ id, name, phone, email });
    this.toggle();
  };

  renderContent = () => {
    if (this.state.loading) {
      return <SpinnerComponent />;
    }
    return (
      <Persons
        customers={this.state.customers}
        handleDelete={this.handleDelete}
        handleUpdate={this.handleUpdate}
      />
    );
  };

  syncFormData = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = id => {
    axios.delete(`http://customers.test/api/customers/${id}`).then(response => {
      this.setState({
        customers: [...this.state.customers].filter(customer => {
          return customer.id !== id;
        })
      });
    });
  };

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.id) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  async updateCustomer() {
    const editedCustomer = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      website: "http://test.net"
    };
    const response = await axios.put(
      "http://customers.test/api/customers/" + this.state.id,
      editedCustomer
    );
    this.setState({
      id: null,
      name: "",
      email: "",
      phone: "",
      customers: [...this.state.customers].map(customer => {
        if (customer.id === response.data.id) {
          customer = response.data;
        }
        return customer;
      })
    });
    this.toggle();
  }

  async createCustomer() {
    const newCustomer = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      website: "http://test.net"
    };
    const response = await axios.post(
      "http://customers.test/api/customers",
      newCustomer
    );
    this.setState({
      customers: [...this.state.customers, response.data],
      name: "",
      email: "",
      phone: ""
    });
    this.toggle();
  }

  render() {
    const { name, email, phone } = this.state;
    return (
      <div className="container mt-4">
        <div className="bg-info clearfix" style={this.style}>
          <Button className="btn btn-info float-left">
            React Js Student Menagement System
          </Button>
          <Button onClick={this.toggle} className="btn btn-success float-right">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </Button>
          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="customerModal"
            >
              <ModalHeader toggle={this.toggle}>Create Customers</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup>
                    <Label for="Name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="Name"
                      onChange={this.syncFormData}
                      value={name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="Email"
                      onChange={this.syncFormData}
                      value={email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="Phone"
                      onChange={this.syncFormData}
                      value={phone}
                    />
                  </FormGroup>
                  <Button color="primary" type="submit">
                    Sunmit
                  </Button>{" "}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </Form>
              </ModalBody>
            </Modal>
          </div>
        </div>
        <div className="row mt-4 justify-content-start" style={this.style}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default App;
