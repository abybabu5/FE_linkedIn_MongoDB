import React, {Component} from 'react';
import io from "socket.io-client";
import {Modal, InputGroup, FormControl, Button} from "react-bootstrap";

class InstantMessaging extends Component {
    socket = null;

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            message: "",
            messages: [],
            showModal: true
        };
    }

    componentDidMount() {
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
        console.log("THE MESSAGE IS FROM", this.state.username);
        if (this.state.message !== "") {
            this.socket.emit("bmsg", {
                user: this.state.username,
                message: this.state.message
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
                <div className="App">
                    <ul id="messages">
                        {this.state.messages.map((msg, i) => (
                            <li key={i}>
                                <strong>{msg.user}</strong> {msg.message}
                            </li>
                        ))}
                    </ul>
                    <form id="chat" onSubmit={this.sendMessage}>
                        <input
                            autoComplete="off"
                            onChange={this.handleMessage}
                            value={this.state.message}
                        />
                        <button>SEND</button>
                    </form>
                </div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showModal}
                    onHide={this.toggleModal}
                >
                    <Modal.Header>
                        <Modal.Title>Set username</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <FormControl
                                onChange={e => this.setState({ username: e.target.value })}
                            />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggleModal}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default InstantMessaging;