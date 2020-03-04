import React, { Component, createRef } from "react";
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import 'scss/my-scss.scss';
import axios from 'axios';
import server from 'utilities.js';


class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      publicityId: '',
      email: '',
      description: ''
    }
    this.my = createRef();
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setState({
      productId: query.get("productId"),
      publicityId: query.get("publicityId"),
      email: query.get("email")
    });
  }
  handleChangeDescription = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleKeyDown(e) {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  onFileChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0]
    });
  };

  writeMode = () => {
    this.my.current.focus();
  }
  submitData = () => {
    const formDataProduct = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    formDataProduct.append('attachment', this.state.selectedFile);
    for (let name in this.state) {
      console.log(name, this.state[name])
      formDataProduct.set(name, this.state[name]);
    }
    console.log(`http://${server.ip}:${server.port}/product/send-mail`);
    axios.post(`http://${server.ip}:${server.port}/product/send-mail`, formDataProduct, config)
      .then(res => alert("File uploaded successfully."))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <><GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4>Send Mail</h4>
            </CardHeader>
            <CardBody>
              <br />
              <Form>
                <FormGroup className="input-box-style">
                  <Label className="label">To : </Label>
                  <Input
                    className="input"
                    type="text"
                    name="text"
                    value={this.state.email}
                  />
                </FormGroup><br />
                <FormGroup className="input-box-style">
                  <Label className="label">File : </Label>
                  <Input
                    className="input"
                    type="file"
                    name="file"
                    id="exampleFile"
                    onChange={this.onFileChangeHandler}
                  />
                </FormGroup><br />
                <FormGroup tag="fieldset" onClick={this.writeMode}>
                  <legend>Description</legend>
                  <Input
                    type="textarea"
                    innerRef={this.my}
                    name="description"
                    className="exampleText"
                    onChange={this.handleChangeDescription}
                    onKeyDown={this.handleKeyDown}
                  />
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={this.submitData}>Add</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
        {/* <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="select" id="exampleSelect">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelectMulti">Select Multiple</Label>
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input type="textarea" name="text" id="exampleText" />
          </FormGroup> 


            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" />{' '}
                Option two can be something else and selecting it will deselect option one
          </Label>
            </FormGroup>
            <FormGroup check disabled>
              <Label check>
                <Input type="radio" name="radio1" disabled />{' '}
                Option three is disabled
          </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />{' '}
              Check me out
        </Label>
          </FormGroup>
          <Button>Submit</Button>
        </Form>*/}
      </>
    );
  }
}

export default Email;