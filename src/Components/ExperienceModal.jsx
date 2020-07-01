import React from 'react';
import {Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import Api from '../Api';

class ExperienceModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, selectedFile: null, presentWork: false};
    }

    toggle() {
        if (!this.props.experience._id)
            this.setState({modal: !this.state.modal});
        if (this.state.modal === false) {
            this.props.showUpdatedExperience(false);
        }
    }

    onChangeHandler = event => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    submit() {

        let method = "POST";
        if (this.props.experience._id !== undefined) {
            method = "PUT";
        }
        //if props.experience._id has a value => we have to send a PUT! to /expriences/_id
        //else a POST is perfect
        const append = (method === "PUT" ? '/' + this.props.experience._id : '');
        if (this.state.presentWork) {
            this.props.updateExp({target: {name: "endDate", value: null}});
        }
        Api.fetch('/profile/' + Api.USER + '/experiences' + append, method, JSON.stringify(this.props.experience)).then((res) => {
            const expId = this.props.experience._id || res._id;
            if (this.state.selectedFile) {
                var formData = new FormData();
                formData.append("experience", this.state.selectedFile);

                Api.request("/profile/" + Api.USER + "/experiences/" + expId + "/picture", 'POST', formData)
                    .then(p => {
                        Object.keys(p.profile).forEach(k => {
                            this.props.updateExp({
                                target: {value: p.profile[k], name: k}
                            });
                        });
                        this.props.showUpdatedExperience(true);
                    });
            } else {
                this.props.showUpdatedExperience(true);
            }
            this.setState({modal: false});
        });
    }

    render() {
        const props = this.props;
        return (
            <>
                <Button onClick={this.toggle.bind(this)} className={'buttonExpEdit'}>
                    <i className='fas fa-plus'></i>
                </Button>
                <Modal isOpen={this.state.modal || this.props.experience._id} toggle={this.toggle.bind(this)}
                       className={this.props.className}>
                    <ModalHeader toggle={this.toggle.bind(this)}>Edit experience</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='startDate'>Start date *</Label>
                                        <Input
                                            type='date'
                                            name='startDate'
                                            id='startDate'
                                            value={this.props.experience.startDate}
                                            onChange={(val) => this.props.updateExp(val)}

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>
                                            <input
                                                type="checkbox"
                                                defaultChecked={this.props.experience.presentWork}
                                                name="presentWork"
                                                value={this.state.presentWork}
                                                onChange={(val) => this.setState({presentWork: val.target.checked})}
                                            />
                                            <span> I still work here!</span>
                                        </Label>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='endDate'>End date *</Label>
                                        <Input
                                            disabled={this.props.experience.presentWork}
                                            type='date'
                                            name='endDate'
                                            id='endDate'
                                            value={this.props.experience.endDate}
                                            onChange={(val) => this.props.updateExp(val)}

                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='role'>Role</Label>
                                        <Input type='text' name='role' id='role' value={this.props.experience.role}
                                               onChange={(val) => this.props.updateExp(val)} placeholder='-'/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='company'>Company *</Label>
                                        <Input type='company' name='company' id='company'
                                               value={this.props.experience.company}
                                               onChange={(val) => this.props.updateExp(val)}
                                               placeholder='Eg: Google LLC'/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='area'>Area</Label>
                                        <Input type='text' name='area' id='area'
                                               onChange={(val) => this.props.updateExp(val)}
                                               defaultValue={props.experience.location} placeholder='Bangalore'/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='description'>Description</Label>
                                        <Input type='text' name='description' id='description'
                                               onChange={(val) => this.props.updateExp(val)}
                                               defaultValue={props.experience.description} placeholder=''/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for='description'>Upload Photo</Label>
                                        <Input type='file' name='picture' id='picture'
                                               onChange={this.onChangeHandler} placeholder=''/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={this.submit.bind(this)}>
                            Add
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ExperienceModal;
