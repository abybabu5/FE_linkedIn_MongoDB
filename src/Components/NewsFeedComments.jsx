import React, {Component} from 'react';
import Api from "../Api";
import moment from "moment";
import NewsFeedAdd from "./NewsFeedAdd";
import {Button, Col, ListGroup, ListGroupItem, Row} from "reactstrap";
import {Link} from "react-router-dom";
import NewsFeedEdit from "./NewsFeedEdit";
import EditComment from "./EditComment";


class NewsFeedComments extends Component {
    state = {
        comments: null,
        selectedComment: {},
        isLoading: true,
        items: [],
        cursor: 5
    };

    constructor() {
        super();
        // bind context to methods
        this.deleteComment = this.deleteComment.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.editComment = this.editComment.bind(this);
    }


    handleFieldChange = event => {
        const {value, name} = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };

    onSubmit(e) {
        // prevent default form submission
        e.preventDefault();
        const data = {
            comment: this.state.comment.message,
            rate: this.state.rating,
            elementId: this.props.comment
        };
    }

    loadData = async () => {
        this.props.loadData();
    };


    resetUpdate() {
        this.setState({selectedComments: {}});
    }

    deleteComment = async (post) => {
        let resp = await Api.fetch("/posts/" + this.props.postId + "/comment/" + post._id, "DELETE");
        this.loadData()
    };
    // updateNewsfeed = (val) => {
    //     let currentNews = this.state.selectedNews;
    //     currentNews[val.target.name] = val.target.value;
    //     this.setState({selectedNews: currentNews})
    // }
    updateComments = (e, comments) => {
        console.log(e.target);
        var formData = new FormData();
        formData.append("post", e.target.files[0]);
        Api.request("/posts/" + comments._id, "POST", formData);
        this.loadData();
    };


    showUpdatedComments = (update) => {
        if (update) {
            const index = this.state.comments.findIndex((exp) => this.state.selectedComments._id === exp._id);
            this.state.comments[index] = {...this.state.selectedExp};
        }
        this.resetUpdate();
    };

    // deleteComment(id) {
    //     console.log(id.currentTarget.name);
    //     this.crud.delete(id.currentTarget.name).then(result => {
    //         console.log(result);
    //         this.refreshData();
    //     });
    //
    // }

    editComment(id) {
        const c = this.state.comments.find((comment) => id.currentTarget.name === comment._id);
        if (c) {
            const editComment = JSON.parse(JSON.stringify(c));
            editComment.message = editComment.comment;
            this.setState({comment: editComment, rating: editComment.rate});
        }

    }

    render() {
        return <div>
            {this.props.comments && this.props.comments
                .map((comment) =>
                    <div style={{margin: '15px'}}>
                        <ListGroup>
                            <ListGroupItem color="success">
                                <div className="comment-detail">
                                    <div>
                                        <img src={comment.postedBy.profile.image} className="comment-image"/>
                                    </div>
                                    <div className="details-container">
                                        <div
                                            className="comment-user-name"><Link
                                            to={'users/' + comment.username}>{comment.postedBy.profile.name} {comment.postedBy.profile.surname}</Link>
                                        </div>
                                        <div
                                            className="comment-user-title">{comment.postedBy.profile.title} in {comment.postedBy.profile.area}</div>
                                        <div
                                            className="comment-post-age">{moment(comment.createdAt).fromNow()} {comment.isUpdated &&
                                        <span>- updated {moment(comment.updatedAt).fromNow()}</span>}</div>
                                    </div>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem color="success">
                                {comment.comment.length !== 2 &&
                                <div className="comment-text">{comment.comment}</div>}
                                {comment.comment.length === 2 &&
                                <div className="comment-emoticon">{comment.comment}</div>}
                                {(Api.USER === comment.postedBy.username) &&
                                <div style={{display: 'flex'}}>
                                    <div className="post-bottom-spacer"/>
                                    <EditComment comment={comment} refresh={this.loadData}/>
                                    <Button className="button-margin" size="sm"
                                            onClick={() => this.deleteComment(comment)}>
                                        <i className='fas fa-trash'/></Button>
                                </div>}
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                )}
        </div>
    }
}

export default NewsFeedComments;