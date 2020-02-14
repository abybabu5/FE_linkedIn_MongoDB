import React, {Component} from 'react'
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {Redirect} from "react-router-dom";
import Api from "../Api";
import moment from "moment";
import {connect} from "react-redux";

const mapStateToProps = state => state;
class SearchProfile extends Component {
    state = {
        users: this.props.Profile.Profiles,
        redirect: null
    };

    componentDidMount() {
        // Api.fetch('/profile/').then((users) => this.setState({users}));
    }

    onClick = (user) => {
        this.setState({redirect: user});
        setTimeout(() => this.props.clearInput(), 100);
    };

    render() {
        // return <div>{JSON.stringify(this.state)}</div>;
        if (this.props.redirect) {
            return (<Redirect to={'/users/' + this.props.redirect}/>);
        }
        const searchText = this.props.searchText.toLowerCase();
        const users = this.state.users.filter((user) => {
            if (!user.name)
                user.name="";
            if (!user.surname)
                user.surname="";
            if (!user.area)
                user.area="";
            if (!user.title)
                user.title="";
            return user.name.toLowerCase().includes(searchText) || user.surname.toLowerCase().includes(searchText)
                || user.area.toLowerCase().includes(searchText) || user.title.toLowerCase().includes(searchText)
        });
        return (
            <ListGroup>
                {
                    this.state.users.map(user =>
                        <ListGroupItem>
                            <div className="post-detail" onClick={() => this.onClick(user.username)}
                                 style={{cursor: 'pointer'}}>
                                <div>
                                    <img src={user.image} className="user-image"/>
                                </div>
                                <div className="details-container">
                                    <div
                                        className="user-name">{user.name} {user.surname}</div>
                                    <div
                                        className="user-title">{user.title} in {user.area}</div>
                                </div>
                            </div>
                        </ListGroupItem>
                    )}
            </ListGroup>
        )
    }
}


export default connect(mapStateToProps)(SearchProfile);
