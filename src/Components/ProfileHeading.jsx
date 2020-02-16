import React from 'react';
import ProfileModal from './ProfileModal';
import {Col, Row, Button, ListGroupItem} from 'reactstrap';
import Api from "../Api";
import AboutUs from "./AboutUs";

class ProfileHeading extends React.Component {
    state = {};

    render() {
        return (
            <>
                <Row>
                    {this.props.profile && <div style={{height: '170px', width: '100%'}}>
                        <div className='profileHeading'>
                            <div>
                                <img className={'profile-foto'} src={this.props.profile.image} alt={'profile'}/>
                            </div>
                            {(Api.USER === this.props.profile.username || this.props.user === undefined) &&
                            <div style={{flexGrow: 1}}>
                                <ProfileModal profile={this.props.profile}/>
                                <Button id="buttonPrint"  onClick={this.props.printFn} ><i
                                    className='fas fa-print'></i></Button>
                            </div>}
                        </div>
                    </div>}
                </Row>
                <Row>
                    {this.props.profile &&  <Col>
                        <div style={{flexGrow: 1}}>
                            <AboutUs profile={this.props.profile}/>
                        </div>
                        <div className="text-left">{this.props.profile.bio}</div>

                    </Col>}
                </Row>
            </>
        );
    }
}

export default ProfileHeading;