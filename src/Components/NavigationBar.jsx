import React, {Component} from 'react';
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import {faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faBell, faBriefcase, faComments, faHome, faSearch, faTh, faUsers, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Api from "../Api";
import {Redirect} from "react-router-dom";
import SearchProfile from "./SearchProfile";
import {connect} from "react-redux";
import {loadProfiles} from "../Actions/loadProfiles";

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    loadProfiles: () => dispatch(loadProfiles())
});

class NavigationBar extends Component {
    state = {user: null, goLogin: false, searchText: ''};

    async loadData() {
        const data = await Api.fetch('/profile/me');
        this.setState({user: data});

    }

    componentDidMount() {
        this.loadData();
        this.props.loadProfiles();
    }

    searchProfileStyle = {
        position: 'absolute',
        marginTop: '5px',
        marginLeft: '28px',
        width: '390px',
        //top: 55,
        //left: 200,
        //display: 'inline-block',
        // overflow: "scroll",
        zIndex: 99
    };
    logout = () => {
        window.sessionStorage.clear();
        this.setState({goLogin: true});
    };

    clearInput = () => {
        this.setState({searchText: ''});
    };

    render() {
        if (this.state.goLogin === true) {
            return <Redirect to='/login'/>
        }
        return (
            <Navbar className='nav-top'>
                <Nav className='mx-auto'>
                    <NavbarBrand href='/'>
                        <svg preserveAspectRatio="xMinYMin meet" focusable="false" xmlns="http://www.w3.org/2000/svg"
                             style={{width: '50px', height: '50px'}}>
                            <g className="scaling-icon" style={{fillOpacity: 1}}>
                                <defs></defs>

                                <g className="bug-40dp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g className="dp-1">
                                        <path
                                            d="M40,3.5 L40,36.5 C40,38.434 38.434,40 36.5,40 L3.5,40 C1.566,40 0,38.434 0,36.5 L0,3.5 C0,1.566 1.566,0 3.5,0 L36.5,0 C38.434,0 40,1.566 40,3.5 L40,3.5 Z"
                                            className="bug-text-color" fill="#FFFFFF"></path>
                                        <path
                                            d="M40,3.5 L40,36.5 C40,38.434 38.434,40 36.5,40 L3.5,40 C1.566,40 0,38.434 0,36.5 L0,3.5 C0,1.566 1.566,0 3.5,0 L36.5,0 C38.434,0 40,1.566 40,3.5 Z M15,15.0000122 L20.875,15.0000122 L20.875,18.3330122 C21.542,17.1460122 23,14.7000122 26.957,14.7000122 C33.137,14.7000122 34,18.6800122 34,23.9670122 L34,34.0000122 L28,34.0000122 L28,25.0180122 C28,22.1830122 27.542,19.8750122 24.922,19.8750122 C21.75,19.8750122 21,21.9560122 21,24.5160122 L21,34.0000122 L15,34.0000122 L15,15.0000122 Z M6,34 L12,34 L12,15 L6,15 L6,34 Z M12.6509756,8.99997559 C12.6509756,11.0159756 11.0169756,12.6499756 9.00097559,12.6499756 C6.98397559,12.6499756 5.34997559,11.0159756 5.34997559,8.99997559 C5.34997559,6.98397559 6.98397559,5.34997559 9.00097559,5.34997559 C11.0169756,5.34997559 12.6509756,6.98397559 12.6509756,8.99997559 Z"
                                            className="background" fill="#0077B5"></path>
                                    </g>
                                    <g className="dpi-gt1" transform="scale(0.8333)">
                                        <rect className="bug-text-color" fill="#FFFFFF" x="1" y="1" width="46"
                                              height="46" rx="4"></rect>
                                        <path
                                            d="M0,4.00989318 C0,1.79529033 1.79405245,0 4.00989318,0 L43.9901068,0 C46.2047097,0 48,1.79405245 48,4.00989318 L48,43.9901068 C48,46.2047097 46.2059475,48 43.9901068,48 L4.00989318,48 C1.79529033,48 0,46.2059475 0,43.9901068 L0,4.00989318 Z M19,18.3 L25.5,18.3 L25.5,21.566 C26.437,19.688 28.838,18 32.445,18 C39.359,18 41,21.738 41,28.597 L41,41.3 L34,41.3 L34,30.159 C34,26.253 33.063,24.05 30.68,24.05 C27.375,24.05 26,26.425 26,30.159 L26,41.3 L19,41.3 L19,18.3 Z M7,41 L14,41 L14,18 L7,18 L7,41 Z M15,10.5 C15,12.985 12.985,15 10.5,15 C8.015,15 6,12.985 6,10.5 C6,8.015 8.015,6 10.5,6 C12.985,6 15,8.015 15,10.5 Z"
                                            className="background" fill="#0077B5"></path>
                                    </g>
                                </g>
                                <g className="bug-48dp" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect className="bug-text-color" fill="#FFFFFF" x="1" y="1" width="46" height="46"
                                          rx="4"></rect>
                                    <path
                                        d="M0,4.00989318 C0,1.79529033 1.79405245,0 4.00989318,0 L43.9901068,0 C46.2047097,0 48,1.79405245 48,4.00989318 L48,43.9901068 C48,46.2047097 46.2059475,48 43.9901068,48 L4.00989318,48 C1.79529033,48 0,46.2059475 0,43.9901068 L0,4.00989318 Z M19,18.3 L25.5,18.3 L25.5,21.566 C26.437,19.688 28.838,18 32.445,18 C39.359,18 41,21.738 41,28.597 L41,41.3 L34,41.3 L34,30.159 C34,26.253 33.063,24.05 30.68,24.05 C27.375,24.05 26,26.425 26,30.159 L26,41.3 L19,41.3 L19,18.3 Z M7,41 L14,41 L14,18 L7,18 L7,41 Z M15,10.5 C15,12.985 12.985,15 10.5,15 C8.015,15 6,12.985 6,10.5 C6,8.015 8.015,6 10.5,6 C12.985,6 15,8.015 15,10.5 Z"
                                        className="background" fill="#0077B5"></path>
                                </g>
                            </g>
                        </svg>
                    </NavbarBrand>
                    <NavItem>
                        <div className='search-div'>
                            <InputGroup className='search-input'>
                                <InputGroupAddon addonType='prepend'>
                                    <InputGroupText>
                                        <FontAwesomeIcon className='icon-search' icon={faSearch}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input className='main-input' placeholder='Search' value={this.state.searchText}
                                       onChange={(e) => this.setState({searchText: e.target.value})}/>
                            </InputGroup>

                        </div>
                        <div style={this.searchProfileStyle}>
                            {this.state.searchText.length > 0 &&
                            <SearchProfile clearInput={this.clearInput} searchText={this.state.searchText}/>}
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='/'>
                                <FontAwesomeIcon className='nav-icon' icon={faHome}/>
                                <div>Home</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='/NewsFeed' active>
                                <FontAwesomeIcon className='nav-icon' icon={faUsers}/>
                                <div>My Network</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>
                            <NavLink href='#'>
                                <FontAwesomeIcon className='nav-icon' icon={faBriefcase}/>
                                <div>Jobs</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>
                            <NavLink href='#'>
                                <FontAwesomeIcon className='nav-icon' icon={faComments}/>
                                <div>Messaging</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='#'>
                                <FontAwesomeIcon className='nav-icon' icon={faBell}/>
                                <div>Notifications</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='/'>
                                <div className='profile-image-div'>
                                    {this.state.user &&
                                    <img className={'nav-user-foto'}  src={this.state.user.image}
                                         alt={'profile'}/>}
                                </div>
                                <div>Me</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <div className='vl'></div>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='#'>
                                <FontAwesomeIcon className='nav-icon' icon={faTh}/>
                                <div>Work</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='#'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20"
                                     data-supported-dps="24x24" fill="currentColor" focusable="false">
                                    <path
                                        d="M22 5v14H2V5h20m1-2H1a1 1 0 00-1 1v16a1 1 0 001 1h22a1 1 0 001-1V4a1 1 0 00-1-1z"></path>
                                    <path d="M2 5v14h10V5H2zm8 12H4v-2h6v2zm0-4H4v-2h6v2zm0-4H4V7h6v2z"
                                          opacity=".25"></path>
                                    <path opacity=".55" d="M14 7h6v2h-6zM14 11h6v2h-6zM14 15h6v2h-6z"></path>
                                    <path
                                        d="M10 7.53v8.93a.28.28 0 00.44.23l6.43-4.44a.33.33 0 000-.52L10.44 7.3a.28.28 0 00-.44.23z"></path>
                                </svg>
                                <div>Learning</div>
                            </NavLink>
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className="menu-flags-container">
                            <ReactFlagsSelect  className='menu-flags'
                                               defaultCountry="US"
                                               searchable={false}
                                               countries={["US", "GB", "FR", "DE", "IT"]}
                                               customLabels={{"US": "EN-US","GB": "EN-GB","FR": "FR","DE": "DE","IT": "IT"}}
                                               showSelectedLabel={false}
                                               showOptionLabel={false}
                                               selectedSize={20}
                                               optionsSize={25}
                            />
                        </div>
                    </NavItem>
                    <NavItem>
                        <div className='nav-item-div'>

                            <NavLink href='#'>
                                <FontAwesomeIcon className='nav-icon' icon={faSignOutAlt}/>
                                {this.state.user &&
                                <div onClick={this.logout}>Log Out </div>
                                }


                            </NavLink>

                        </div>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
