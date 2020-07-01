import React, {Component} from 'react';
import {Button, Col, Container, Row} from 'reactstrap';
import ExperienceModal from './ExperienceModal';
import Api from '../Api';
import moment from "moment";
import {connect} from "react-redux";
import {loadExperinces} from "../Actions/loadExperinces";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loadExperiences: (user) => dispatch(loadExperinces(user))
});

class Experiences extends Component {
    state = {
        selectedExp: {},
        experiences:[]
    };

    async loadData() {
        let user = Api.USER;
        if (this.props.match) {
            user = this.props.match;
        }
        this.props.loadExperiences(user);
        this.setState({
        });
    }

    componentDidMount = async () => {
        this.loadData();
    };

    resetUpdate() {
        this.setState({selectedExp: {}});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match !== this.props.match) {
            this.loadData();
        }
    }

    deleteExperience = async (exp) => {
        let resp = await Api.fetch("/profile/user13/experiences/" + exp._id, "DELETE");
        var expWithoutCurrent = this.state.experiences.filter(x => x._id !== exp._id);
        this.setState({experiences: expWithoutCurrent})
    };

    updateExperience = (val) => {
        console.log(val.target);
        let currentExp = this.state.selectedExp;
        currentExp[val.target.name] = val.target.value;
        this.setState({selectedExp: currentExp})
    };

    showUpdatedExperience = (update) => {
        if (update) {
            const experiences = [...this.props.Profile.Experiences];
            const index = experiences.findIndex((exp) => this.state.selectedExp._id === exp._id);
            if (index === -1) {
                experiences.push(this.state.selectedExp);
            } else {
                experiences[index] = {...this.state.selectedExp};
            }
            this.props.Profile.Experiences = experiences;


        }
        this.resetUpdate();
    };

    formatDate(date) {
        console.log(date);
        if (!date) return "present time";
        return moment(date).format("MMMM Do YYYY");
    }


    render() {
        if (!Array.isArray(this.props.Profile.Experiences)) return null;
        this.props.Profile.Experiences.map((user) => {
            user.canEdit = Api.USER === user.username
        });
        return (
            <Container className="experience-container">

                <Row className="experience-container-title">
                    <Col md={9} className="text-left">
                        <h5>Experiences</h5>
                    </Col>
                    {(Api.USER === this.props.match || this.props.match === undefined) &&
                    <Col md={3} className="text-right">
                        <ExperienceModal experience={this.state.selectedExp} updateExp={this.updateExperience}
                                         showUpdatedExperience={this.showUpdatedExperience}/>
                    </Col>}
                </Row>

                {this.props.Profile.Experiences.map(exp =>
                    (
                        <>
                            <Row>
                                <Col>
                                    <div classNames='card'>
                                        <div className='card-body' style={{display: 'flex', alignItems: 'center'}}>
                                            <div>
                                                <img src={exp.image} className="exp-image"/>
                                            </div>
                                            <div style={{flex: "1 1 auto"}}>
                                                <div className="experience-role">{exp.role}</div>

                                                <div className='card-text experience-detail'>
                                                    <div
                                                        className="flex-grow-1">{exp.company} in {exp.area} from {this.formatDate(exp.startDate)} to {this.formatDate(exp.endDate)} doing {exp.description}</div>

                                                </div>
                                            </div>
                                            {exp.canEdit && <div>
                                                <Button className="button-margin" size="sm"
                                                        onClick={() => this.setState({selectedExp: {...exp}})}><i
                                                    className='fas fa-pencil-alt'></i></Button>
                                                <Button className="button-margin" size="sm"
                                                        onClick={() => this.deleteExperience(exp)}><i
                                                    className='fas fa-trash'></i></Button>
                                            </div>}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </>
                    ))}
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experiences);
