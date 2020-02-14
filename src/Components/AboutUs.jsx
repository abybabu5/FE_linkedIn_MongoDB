import React from 'react';
import {Col, Jumbotron, Row} from 'reactstrap';

class AboutUs extends React.Component {
    state = {};

    render() {
        return (
            <>
                {this.props.profile &&<>
                    <div className="text-left ml-3 mb-3">
                        <h2>
                            {this.props.profile.name} {this.props.profile.surname}
                        </h2>
                        <h4>{this.props.profile.title}</h4>
                        <h5>{this.props.profile.area}</h5>
                    </div>
                </>}
            </>
        );
    }
}

export default AboutUs;
