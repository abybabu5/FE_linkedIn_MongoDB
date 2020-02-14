import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';

class ProfileModal extends React.Component {
  //const {buttonLabel, className} = props;
  constructor(props) {
    super(props);
    this.state = {modal: false, selectedFile: null, profile: {profile: ""}};
  }

  submit = (e) => {
    const props = this.props;
    if (this.state.profile._id) {
      Api.fetch("/profile/" + this.props._id, "PUT", JSON.stringify(this.state.profile)).then(res => {
        console.log("edit", res);
        this.props.refresh();
      });

    } else {
      Api.fetch("/profile/" + this.props._id + "/profile", "POST", JSON.stringify(this.state.profile)).then(res => {
        console.log("inserted", res);
        this.props.refresh()
      });
    }
    this.setState({_id: undefined});
    this.toggle();
  };
  toggle = () => {
    this.setState({modal: !this.state.modal});
  };

  onChangeHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  };

  updateForm = (e) => {
    this.setState({profile: {...this.state.profile, [e.target.id]: e.target.value}});
  };


  render()
  {
    const props = this.props;
    return (
        <div>
          <Button onClick={this.toggle} className={'buttonEdit'} id='buttonEdit'>
            <i className='fas fa-pencil-alt'></i>
            {this.props.buttonLabel}
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
            <ModalBody>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='name'>Name</Label>
                      <Input type='text' name='name' id='name' defaultValue={props.profile.name}
                             placeholder='Mario'/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='surname'>Surname</Label>
                      <Input type='text' name='surname' id='surname'
                             defaultValue={props.profile.surname} placeholder='Smith'/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input type='email' name='email' id='email' defaultValue={props.profile.email}
                             placeholder='user@example.com'/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='area'>Area</Label>
                      <Input type='text' name='area' id='area' defaultValue={props.profile.area}
                             placeholder='Bangalore'/>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for='title'>Title</Label>
                  <Input type='text' name='title' id='title' defaultValue={props.profile.title}
                         placeholder='CTO @ ACME corp'/>
                </FormGroup>
                <FormGroup>
                  <Label for='bio'>Bio</Label>
                  <Input type='textarea' name='bio' id='bio' defaultValue={props.profile.bio}
                         placeholder='Bio'/>
                </FormGroup>
                <FormGroup>
                  <Label for='description'>Upload Photo</Label>
                  <Input type='file' name='picture' id='picture'
                         onChange={this.onChangeHandler} placeholder=''/>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={this.submit}>
                Edit
              </Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default ProfileModal;
