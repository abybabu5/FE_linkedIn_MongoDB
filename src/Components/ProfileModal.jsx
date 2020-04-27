import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';
import {loadProfile} from "../Actions/loadProfiles";
import {connect} from "react-redux";
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  loadProfiles: (user) => dispatch(loadProfile(user))
});

class ProfileModal extends React.Component {
  //const {buttonLabel, className} = props;
  constructor(props) {
    super(props);
    this.state = {modal: false, selectedFile: null, profile: {...this.props.profile, profile: ''}};
  }

  submit = (e) => {
    const props = this.props;
    if (this.state.profile._id) {
      Api.fetch("/profile/" + this.state.profile._id, "PUT", JSON.stringify(this.state.profile)).then(res => {
        console.log("edit", res);
        var formData = new FormData();
        formData.append("profile", this.state.selectedFile);
        Api.request("/profile/" + Api.USER + "/picture", "POST", formData);
        this.props.loadProfiles(this.state.profile.username);
      });

    } else {
      Api.fetch("/profile/" + this.state.profile._id + "/profile", "POST", JSON.stringify(this.state.profile)).then(res => {
        console.log("inserted", res);
        //this.props.refresh()
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
    // return <div>{JSON.stringify(this.state)}</div>
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
                             placeholder='Mario' onChange={this.updateForm} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='surname'>Surname</Label>
                      <Input type='text' name='surname' id='surname'
                             defaultValue={props.profile.surname} placeholder='Smith'  onChange={this.updateForm} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input type='email' name='email' id='email' defaultValue={props.profile.email}
                             placeholder='user@example.com'  onChange={this.updateForm}/>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='area'>Area</Label>
                      <Input type='text' name='area' id='area' defaultValue={props.profile.area}
                             placeholder='Bangalore'  onChange={this.updateForm}/>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for='title'>Title</Label>
                  <Input type='text' name='title' id='title' defaultValue={props.profile.title}
                         placeholder='CTO @ ACME corp'  onChange={this.updateForm}/>
                </FormGroup>
                <FormGroup>
                  <Label for='bio'>Bio</Label>
                  <Input type='textarea' name='bio' id='bio' defaultValue={props.profile.bio}
                         placeholder='Bio' onChange={this.updateForm}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
