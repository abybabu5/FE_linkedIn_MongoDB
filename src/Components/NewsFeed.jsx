import React, {Component} from 'react';
import {Button, Col, ListGroup, ListGroupItem, Row, Badge, Popover, PopoverBody, PopoverHeader} from 'reactstrap';
import Api from '../Api';
import NewsFeedAdd from './NewsFeedAdd';
import NewsFeedEdit from './NewsFeedEdit'
import {Link} from "react-router-dom";
import moment from "moment";
import {InfiniteScroll} from 'react-simple-infinite-scroll'
import SearchProfile from "./SearchProfile";
import LoadingBar from "./LoadingBar";
import NewsFeedComments from "./NewsFeedComments";
import CommentModal from "./CommentModal";
import {connect} from "react-redux";
import {loadPosts} from "../Actions/loadPosts";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loadPost: () => dispatch(loadPosts())
});

class NewsFeed extends Component {
    state = {
        //  newsfeed: null,
        selectedNews: {},
        isLoading: true,
        items: [],
        cursor: 5,
        popoverOpen: {}
    };

    loadData = async () => {
        // load posts and users
        // const newsfeed = await Api.fetch('/posts');
        // const users = await Api.fetch('/profile');
        // map the user object to his post
        // newsfeed.map(post => {
        //     post.user = users.find(user => user.username === post.username);
        //     return post;
        // });
        // newsfeed.reverse();
        this.props.loadPost();
        // this.setState({
        //     // newsfeed: newsfeed,
        //     items: newsfeed.slice(0, 5),
        //     isLoading: false
        // });
    };

    feedData = () => {
        console.log("feed", this.state.cursor);
        if (!this.state.isLoading) {
            this.setState({isLoading: true, error: undefined, cursor: this.state.cursor});
            setTimeout(() => this.setState(state => ({
                items: [...state.items, ...(this.props.NewsFeed.slice(this.state.cursor, this.state.cursor + 5))],
                cursor: this.state.cursor + 5,
                isLoading: false
            })), 2000);
        }
    };

    componentDidMount = async () => {
        // setInterval(() => this.loadData(), 10000);
        this.loadData();
    };

    resetUpdate() {
        this.setState({selectedNews: {}});
    }

    deleteNewsfeed = async (post) => {
        let resp = await Api.fetch("/posts/" + post._id, "DELETE");
        var newsWithoutCurrent = this.state.newsfeed.filter(x => x._id !== post._id);
        this.setState({newsfeed: newsWithoutCurrent});
        this.loadData();
    };
    updateNewsfeed = (val) => {
        let currentNews = this.state.selectedNews;
        currentNews[val.target.name] = val.target.value;
        this.setState({selectedNews: currentNews})
    };


    /***
     * do the request when the like button is pressed
     * @param post
     */
    onLike = (post) => {
        let resp = Api.fetch("/posts/" + post._id + "/like", "GET").then(() => {
            this.loadData();
        });
    };
    /***
     * check if the logged user (Api.USER) is in the likes array to change the color of the icon
     * @param news
     * @returns {boolean}
     */
    checkLike = (news) => {
        return news.likes.find(u => u.username === Api.USER) === undefined;
    };
    toggle = (id) => {
        console.log(id);
        const popoverOpen = {...this.state.popoverOpen};
        popoverOpen[id] = !popoverOpen[id];
        console.log(popoverOpen);
        this.setState({popoverOpen});
    };

    render() {
        console.log(this.props);
        //return JSON.stringify(this.props)
        if (!this.props.NewsFeed)
            return null;
        const allnews = this.props.NewsFeed;
        allnews.map((news) => {
            news.isUpdated = news.updatedAt && (moment(news.createdAt).format("HH:mm") !== moment(news.updatedAt).format("HH:mm"))
        });
        return (
            <>
                <div className="news-feed-box">
                    <NewsFeedAdd refresh={this.loadData}/>
                    <Row>
                        <Col>
                            <div className="new-post-container">
                                <h4>NEWS FEED</h4>
                            </div>
                            <div>
                                <InfiniteScroll
                                    throttle={100}
                                    threshold={300}
                                    isLoading={this.state.isLoading}
                                    hasMore={!!this.state.cursor}
                                    onLoadMore={this.feedData}
                                >
                                    {this.props.NewsFeed.length > 0
                                        ? this.props.NewsFeed.map(news => (

                                            <div className="new-post-container" key={news._id}>
                                                <ListGroup>
                                                    <ListGroupItem>
                                                        <div className="post-detail">
                                                            <div>
                                                                <img src={news.user.image} className="user-image"/>
                                                            </div>
                                                            <div className="details-container">
                                                                <div
                                                                    className="user-name"><Link
                                                                    to={'users/' + news.username}>{news.user.name} {news.user.surname}</Link>
                                                                </div>
                                                                <div
                                                                    className="user-title">{news.user.title} in {news.user.area}</div>
                                                                <div
                                                                    className="post-age">{moment(news.createdAt).fromNow()} {news.isUpdated &&
                                                                <span>- updated {moment(news.updatedAt).fromNow()}</span>}</div>
                                                            </div>
                                                        </div>
                                                    </ListGroupItem>
                                                    <ListGroupItem>{news.text}</ListGroupItem>
                                                    {news.image && <ListGroupItem className="post-images">
                                                        <img src={news.image} className="posts-random-image"
                                                             alt={'image'}/>
                                                    </ListGroupItem>}
                                                    <ListGroupItem key={news._id}>
                                                        <div className="post-age">
                                                            <div className="post-bottom-icons">
                                                                <div className="post-bottom-icons">
                                                                    <div className="post-bottom-icon cursor"
                                                                         onClick={(e) => this.onLike(news)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="24"
                                                                             height="24" data-supported-dps="24x24"
                                                                             style={{fill: this.checkLike(news) ? 'black' : 'red'}}
                                                                             focusable="false">
                                                                            <path
                                                                                d="M17.51 11l-2.15-3a14.81 14.81 0 01-2.25-5.29L12.74 1H10.5A2.5 2.5 0 008 3.5v.58a9 9 0 00.32 2.39L9 9H4.66A2.61 2.61 0 002 11.4a2.48 2.48 0 00.39 1.43 2.48 2.48 0 00.69 3.39 2.46 2.46 0 001.45 2.92 2.47 2.47 0 000 .36A2.5 2.5 0 007 22h4.52a8 8 0 001.94-.24l3-.76H21V11h-3.49zM19 19h-2.12l-3.41.82A6 6 0 0112 20H7a.9.9 0 01-.9-.89v-.14l.15-1-1-.4a.9.9 0 01-.55-.83.93.93 0 010-.22l.3-.95-.73-.57a.9.9 0 01-.39-.74.88.88 0 01.12-.44l.46-.72-.46-.72a.88.88 0 01-.14-.51 1 1 0 011-.87h6.64l-1.3-4.7a9 9 0 01-.33-2.37v-.55a.5.5 0 01.5-.5h.95a17.82 17.82 0 002.52 6.22L16.6 13H19v6z"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div className="cursor"
                                                                         onClick={(e) => this.onLike(news)}>Like &nbsp; </div>
                                                                    {news.likes && news.likes.length > 0 &&
                                                                    <div>
                                                                        <Badge id={'Popover' + news._id} pill
                                                                               onMouseEnter={() => this.toggle(news._id)}
                                                                               onMouseLeave={() => this.toggle(news._id)}
                                                                               color={'primary'}>{news.likes.length}</Badge>
                                                                        <Popover placement="right"
                                                                                 isOpen={this.state.popoverOpen[news._id]}
                                                                                 target={'Popover' + news._id}
                                                                                 toggle={() => this.toggle(news._id)}>
                                                                            <PopoverHeader>Likes</PopoverHeader>
                                                                            <PopoverBody>
                                                                                {news.likes.map(user => (
                                                                                    <div style={{
                                                                                        display: 'flex',
                                                                                        alignItems: 'center'
                                                                                    }}>
                                                                                        <div>
                                                                                            <img
                                                                                                src={user.profile.image}
                                                                                                className="user-image-small"/>
                                                                                        </div>
                                                                                        <div
                                                                                            className="user-name-small">{user.profile.name} {user.profile.surname}</div>
                                                                                    </div>
                                                                                ))}
                                                                            </PopoverBody>
                                                                        </Popover>
                                                                    </div>}
                                                                </div>
                                                                <div className="post-bottom-icons">

                                                                </div>
                                                                <CommentModal postId={news._id}
                                                                              refresh={this.loadData}/>
                                                                <div className="post-bottom-icons">
                                                                    <div className="post-bottom-icon">
                                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                                             width="24"
                                                                             height="24" data-supported-dps="24x24"
                                                                             fill="currentColor" focusable="false">
                                                                            <path
                                                                                d="M24 12a1.18 1.18 0 00-.36-.84L14 2v6h-3A10 10 0 001 18v4h1.87A6.11 6.11 0 019 16h5v6l9.63-9.14A1.18 1.18 0 0024 12zm-8 5.54V14H9a8.15 8.15 0 00-6 2.84A8 8 0 0111 10h5V6.48L21.81 12z"></path>
                                                                        </svg>
                                                                    </div>
                                                                    <div>Share</div>
                                                                </div>
                                                                <div className="post-bottom-spacer"/>

                                                                {(Api.USER === news.username) &&
                                                                <div style={{display: 'flex'}}>
                                                                    <NewsFeedEdit news={news} refresh={this.loadData}/>
                                                                    <Button className="button-margin" size="sm"
                                                                            onClick={() => this.deleteNewsfeed(news)}>
                                                                        <i
                                                                            className='fas fa-trash'></i></Button>
                                                                </div>}


                                                            </div>
                                                        </div>
                                                    </ListGroupItem>
                                                </ListGroup>
                                                <NewsFeedComments loadData={this.loadData} postId={news._id}
                                                                  comments={news.comments}/>
                                            </div>


                                        ))
                                        : null}
                                </InfiniteScroll>
                                <div style={{marginBottom: '20px'}}>
                                    {this.state.isLoading && <LoadingBar/>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeed);