import React, {useState} from 'react';
import {Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


const NewsFeedModel = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    /*  state = {
         text: ""
     } */

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    const onFileChange = (e) => {
        props.updateFeed(e.target.name, e.target.files[0])
    };

    const handleOnChange = (e) => {
        props.updateFeed(e.target.name, e.target.value)
    };

    const submit = () => {
        props.save();
        toggle();
    };

    return (
        <>
            <div className="share-box_trigger share-box__open" onClick={toggle}>{buttonLabel}<i
                className="far fa-edit fa-2x" id="newsfeedPencil"></i>Start a post
            </div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader className="modalHeaderNfModal" toggle={toggle}>Create a post</ModalHeader>
                <ModalBody>
                    <textarea onChange={(e) => handleOnChange(e)} className="form-control" rows="3" cols="50"
                              name="text"></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className="modalFooter">
                        <div className="post-icons-container">
                        <i class="fas fa-plus fa-2x"></i>
                        </div>
                        <div className="post-icons-container">
                        <i class="fas fa-camera-retro fa-2x"></i>
                        </div>
                        <div className="post-icons-container">
                        <i class="far fa-sticky-note fa-2x"></i>
                        </div>
                    </div>
                    <div className="post-icons-container-modal">
                    <FormGroup>
                        <Label for='picture'>Upload Photo</Label>
                        <Input type='file' name='selectedFile' id='selectedFile'
                               onChange={(e) => onFileChange(e)} placeholder=''/>
                    </FormGroup>
                    </div>
                    <Button color="primary" onClick={submit}>Post</Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default NewsFeedModel;