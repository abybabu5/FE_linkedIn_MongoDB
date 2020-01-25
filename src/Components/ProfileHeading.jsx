import React from 'react';
import ProfileModal from './ProfileModal';
import {Col, Row, Button, ListGroupItem} from 'reactstrap';
import Api from "../Api";

class ProfileHeading extends React.Component {
    state = {};

    render() {
        return (
            <Row>
                <Col className="col-12">
                    <div className='my-5 profileHeading'>
                        <img className={'profile-foto'} src={this.props.profile.image} alt={'profile'}/>
                        {(Api.USER === this.props.user || this.props.user === undefined) &&
                        <div>
                            <ProfileModal profile={this.props.profile}/>
                            <Button id="buttonPrint" onClick={this.props.printFn}><i
                                className='fas fa-print'></i></Button>
                        </div>}
                    </div>
                </Col>
            </Row>
        );
    }
}

export default ProfileHeading;
