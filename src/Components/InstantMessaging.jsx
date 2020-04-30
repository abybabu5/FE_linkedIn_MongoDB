import React, {Component} from 'react';
import io from "socket.io-client";
import {Modal, InputGroup, FormControl, Button} from "react-bootstrap";
import {loadProfile} from "../Actions/loadProfiles";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Api from "../Api";
import moment from "moment";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loadProfiles: (user) => dispatch(loadProfile(user))
});

class InstantMessaging extends Component {
    socket = null;

    constructor(props) {
        super(props);
        this.state = {
            //username: null,
            message: "",
            messages: [],
            showModal: true
        };
    }

    async loadData() {
        let user = Api.USER;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            user = this.props.match.params.id;
        }
        this.props.loadProfiles(user);
        this.setState({
            //  profile: await Api.fetch('/profile/' + user)
        });
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

        setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    }

    componentDidMount() {
        this.loadData();
        const connOpt = {
            transports: ["websocket"]
        };

        this.socket = io("https://striveschool.herokuapp.com/", connOpt);

        this.socket.on("bmsg", msg =>
            this.setState({
                messages: this.state.messages.concat(msg)
            })
        );
    }


    handleMessage = e => {
        this.setState({
            message: e.target.value
        });

    };

    sendMessage = event => {
        event.preventDefault();
        console.log("THE MESSAGE IS", this.state.message);
        console.log("THE MESSAGE IS FROM", this.props.Profile.MyProfile.username);
        if (this.state.message !== "") {
            this.socket.emit("bmsg", {
                user: this.props.Profile.MyProfile.username,
                message: this.state.message,
                image: this.props.Profile.MyProfile.image,
                createdAt: new Date(),
                updatedAt: new Date()

            });
            this.setState({
                message: ""
            });
        }
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    render() {
        return (
            <>
                <div className="container">
                    <div className="chat-app-container">
                        <div>
                            {this.state.messages.map((msg, i) => (
                                <div
                                    className={(this.props.Profile.MyProfile.username === msg.user ? 'user-me' : 'user-other') + " messages"}
                                    key={i}>
                                    <div className="chat-image-container">
                                        <img className="chat-image" src={msg.image} alt=""/>
                                    </div>
                                    <div className="chat-user-container">
                                        <strong>{msg.user}</strong>
                                        <div className="post-age"> {moment(msg.createdAt).fromNow()} {msg.isUpdated &&
                                        <span>- updated {moment(msg.updatedAt).fromNow()}</span>}</div>
                                    </div>
                                    <div className="message-text">{msg.message}</div>
                                </div>
                            ))}
                        </div>
                        <form id="chat" onSubmit={this.sendMessage}>
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <input className="form-control"
                                           autoComplete="off"
                                           onChange={this.handleMessage}
                                           value={this.state.message}
                                    />
                                </div>
                                <div className="ml-2">
                                    <button className="btn btn-success">SEND</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {/*<Modal className ="chat-modal"*/}
                {/*    size="lg"*/}
                {/*    aria-labelledby="contained-modal-title-vcenter"*/}
                {/*    centered*/}
                {/*    show={this.state.showModal}*/}
                {/*    onHide={this.toggleModal}*/}
                {/*>*/}
                {/*    <Modal.Header className="chat-container">*/}
                {/*        <Modal.Title>Set username</Modal.Title>*/}
                {/*    </Modal.Header>*/}
                {/*    <Modal.Body className="chat-container">*/}
                {/*        <InputGroup className="mb-3">*/}
                {/*            <FormControl*/}
                {/*                onChange={e => this.setState({ username: e.target.value })}*/}
                {/*            />*/}
                {/*        </InputGroup>*/}
                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer>*/}
                {/*        <Button onClick={this.toggleModal}>Submit</Button>*/}
                {/*    </Modal.Footer>*/}
                {/*</Modal>*/}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InstantMessaging));
