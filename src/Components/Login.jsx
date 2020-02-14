import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import Api from "../Api";
import {useState} from "react"
import {Redirect} from 'react-router-dom';
import RegistrationModal from "./RegistrationModal";
import FacebookLoginWithButton from "react-facebook-login"
import ReactFlagsSelect from "react-flags-select";
import {useTranslation, Trans, withTranslation} from "react-i18next";
import FacebookLogin from 'react-facebook-login';


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    setUserToken: base64 => dispatch({
        type: "SET_USERBASE64",
        payload: base64
    })
});

function Login(props) {

    const [username, setUsername] = useState("");
    const [toDashBoard, setToDashBoard] = useState("");
    const [password, setPassword] = useState("");
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [error, setError] = useState(undefined);
    const {t, i18n} = useTranslation();
// class Login extends Component {
//     state = {
//         toDashboard: false,
//     };


    const login = async () => {
        if (!username || !password) {
            alert("please fill all fields");
            return;
        }

        // Api.checkAuth("/profile/me").then(profile => {
        //     console.log(profile);
        //     if (profile.status === 401) {
        //         //sessionStorage.clear();
        //         alert("invalid username and password");
        //     } else {
        //         this.setState({toDashboard: true});
        //     }
        // });
        await Api.fetch("/login", 'POST', JSON.stringify({
            username: username,
            password: password
        }))
            .then(res => {
                if (res) {
                    setToDashBoard("/users/" + username)
                } else {
                    alert("invalid username and password");
                }
            });
    };

    const handleChange = (e) => {
        if (e.target.name === "username") {
            setUsername(e.target.value)
        }
        if (e.target.name === "password") {
            setPassword(e.target.value)
        }
        sessionStorage.setItem(e.target.name, e.target.value);
    };
    const onSelectFlag = (countryCode) => {
        // const { t, i18n } = this.props;
        i18n.changeLanguage(countryCode.toLowerCase());
        console.log(countryCode)
    };
    const facebookLogin = async (fbData) => {
        console.log(fbData);
        if (fbData.accessToken) {
            console.log(fbData);
            const apiResp = await Api.fetch("/facebookLogin?access_token=" + fbData.accessToken + "&refresh_token=" + fbData.refreshToken, "GET");

            if (apiResp) {
                localStorage.setItem("access_token", fbData.accessToken);
                setToDashBoard("/users/" + apiResp.user.username);
                sessionStorage.setItem("username", apiResp.user.username);
                // props.setUserToken(apiResp.access_token);
                // props.history.push("/profile")
            } else {
                console.log(apiResp);
                setError("Some problem with your token!")
            }
        } else {
            console.log(fbData);
            setError("Cannot login on facebook ")
        }
    };

    if (toDashBoard) {
        return <Redirect to={toDashBoard}/>
    }
    return (
        <div>
            <div className="menu-flags-container-login">
                <ReactFlagsSelect onSelect={onSelectFlag} className='menu-flags'
                                  defaultCountry="US"
                                  searchable={false}
                                  countries={["US", "GB", "FR", "DE", "IT", "IN"]}
                                  showSelectedLabel={false}
                                  showOptionLabel={false}
                                  selectedSize={20}
                                  optionsSize={25}
                />
            </div>
            <main className="app__content" role="main">
                <div id="" className="text-center">
                    <div className="header__logo">
                        <div aria-hidden="true" type="linkedin-logo" alt="LinkedIn" size="21dp" color="brand">
                            <svg style={{width: '100px', marginTop: '50px', height: '70px'}}
                                 preserveAspectRatio="xMinYMin meet"
                                 focusable="false">
                                <g className="scaling-icon" style={{fillOpacity: 1}}>
                                    <defs></defs>
                                    <g className="logo-21dp">
                                        <g className="dpi-1">
                                            <g className="inbug" stroke="none" strokeWidth="1" fill="none"
                                               fillRule="evenodd">
                                                <path
                                                    d="M19.479,0 L1.583,0 C0.727,0 0,0.677 0,1.511 L0,19.488 C0,20.323 0.477,21 1.333,21 L19.229,21 C20.086,21 21,20.323 21,19.488 L21,1.511 C21,0.677 20.336,0 19.479,0"
                                                    className="bug-text-color" fill="#FFFFFF"
                                                    transform="translate(63.000000, 0.000000)"></path>
                                                <path
                                                    d="M82.479,0 L64.583,0 C63.727,0 63,0.677 63,1.511 L63,19.488 C63,20.323 63.477,21 64.333,21 L82.229,21 C83.086,21 84,20.323 84,19.488 L84,1.511 C84,0.677 83.336,0 82.479,0 Z M71,8 L73.827,8 L73.827,9.441 L73.858,9.441 C74.289,8.664 75.562,7.875 77.136,7.875 C80.157,7.875 81,9.479 81,12.45 L81,18 L78,18 L78,12.997 C78,11.667 77.469,10.5 76.227,10.5 C74.719,10.5 74,11.521 74,13.197 L74,18 L71,18 L71,8 Z M66,18 L69,18 L69,8 L66,8 L66,18 Z M69.375,4.5 C69.375,5.536 68.536,6.375 67.5,6.375 C66.464,6.375 65.625,5.536 65.625,4.5 C65.625,3.464 66.464,2.625 67.5,2.625 C68.536,2.625 69.375,3.464 69.375,4.5 Z"
                                                    className="background" fill="#0073B0"></path>
                                            </g>
                                            <g className="linkedin-text">
                                                <path
                                                    d="M60,18 L57.2,18 L57.2,16.809 L57.17,16.809 C56.547,17.531 55.465,18.125 53.631,18.125 C51.131,18.125 48.978,16.244 48.978,13.011 C48.978,9.931 51.1,7.875 53.725,7.875 C55.35,7.875 56.359,8.453 56.97,9.191 L57,9.191 L57,3 L60,3 L60,18 Z M54.479,10.125 C52.764,10.125 51.8,11.348 51.8,12.974 C51.8,14.601 52.764,15.875 54.479,15.875 C56.196,15.875 57.2,14.634 57.2,12.974 C57.2,11.268 56.196,10.125 54.479,10.125 L54.479,10.125 Z"
                                                    fill="#000000"></path>
                                                <path
                                                    d="M47.6611,16.3889 C46.9531,17.3059 45.4951,18.1249 43.1411,18.1249 C40.0001,18.1249 38.0001,16.0459 38.0001,12.7779 C38.0001,9.8749 39.8121,7.8749 43.2291,7.8749 C46.1801,7.8749 48.0001,9.8129 48.0001,13.2219 C48.0001,13.5629 47.9451,13.8999 47.9451,13.8999 L40.8311,13.8999 L40.8481,14.2089 C41.0451,15.0709 41.6961,16.1249 43.1901,16.1249 C44.4941,16.1249 45.3881,15.4239 45.7921,14.8749 L47.6611,16.3889 Z M45.1131,11.9999 C45.1331,10.9449 44.3591,9.8749 43.1391,9.8749 C41.6871,9.8749 40.9121,11.0089 40.8311,11.9999 L45.1131,11.9999 Z"
                                                    fill="#000000"></path>
                                                <polygon fill="#000000"
                                                         points="38 8 34.5 8 31 12 31 3 28 3 28 18 31 18 31 13 34.699 18 38.241 18 34 12.533"></polygon>
                                                <path
                                                    d="M16,8 L18.827,8 L18.827,9.441 L18.858,9.441 C19.289,8.664 20.562,7.875 22.136,7.875 C25.157,7.875 26,9.792 26,12.45 L26,18 L23,18 L23,12.997 C23,11.525 22.469,10.5 21.227,10.5 C19.719,10.5 19,11.694 19,13.197 L19,18 L16,18 L16,8 Z"
                                                    fill="#000000"></path>
                                                <path
                                                    d="M11,18 L14,18 L14,8 L11,8 L11,18 Z M12.501,6.3 C13.495,6.3 14.3,5.494 14.3,4.5 C14.3,3.506 13.495,2.7 12.501,2.7 C11.508,2.7 10.7,3.506 10.7,4.5 C10.7,5.494 11.508,6.3 12.501,6.3 Z"
                                                    fill="#000000"></path>
                                                <polygon fill="#000000"
                                                         points="3 3 0 3 0 18 9 18 9 15 3 15"></polygon>
                                            </g>
                                        </g>
                                        <g className="dpi-gt1" transform="scale(0.4375)">
                                            <g className="inbug" stroke="none" strokeWidth="1" fill="none"
                                               fillRule="evenodd">
                                                <path
                                                    d="M44.5235,0 L3.6185,0 C1.6625,0 0.0005,1.547 0.0005,3.454 L0.0005,44.545 C0.0005,46.452 1.6625,48 3.6185,48 L44.5235,48 C46.4825,48 48.0005,46.452 48.0005,44.545 L48.0005,3.454 C48.0005,1.547 46.4825,0 44.5235,0"
                                                    className="bug-text-color" fill="#FFFFFF"
                                                    transform="translate(143.000000, 0.000000)"></path>
                                                <path
                                                    d="M187.5235,0 L146.6185,0 C144.6625,0 143.0005,1.547 143.0005,3.454 L143.0005,44.545 C143.0005,46.452 144.6625,48 146.6185,48 L187.5235,48 C189.4825,48 191.0005,46.452 191.0005,44.545 L191.0005,3.454 C191.0005,1.547 189.4825,0 187.5235,0 Z M162,18 L168.5,18 L168.5,21.266 C169.437,19.388 171.838,17.7 175.445,17.7 C182.359,17.7 184,21.438 184,28.297 L184,41 L177,41 L177,29.859 C177,25.953 176.063,23.75 173.68,23.75 C170.375,23.75 169,26.125 169,29.859 L169,41 L162,41 L162,18 Z M150,41 L157,41 L157,18 L150,18 L150,41 Z M158,10.5 C158,12.985 155.985,15 153.5,15 C151.015,15 149,12.985 149,10.5 C149,8.015 151.015,6 153.5,6 C155.985,6 158,8.015 158,10.5 Z"
                                                    className="background" fill="#0073B0"></path>
                                            </g>
                                            <g className="linkedin-text">
                                                <path
                                                    d="M136,41 L130,41 L130,37.5 C128.908,39.162 125.727,41.3 122.5,41.3 C115.668,41.3 111.2,36.975 111.2,30 C111.2,23.594 114.951,17.7 121.5,17.7 C124.441,17.7 127.388,18.272 129,20.5 L129,7 L136,7 L136,41 Z M123.25,23.9 C119.691,23.9 117.9,26.037 117.9,29.5 C117.9,32.964 119.691,35.2 123.25,35.2 C126.81,35.2 129.1,32.964 129.1,29.5 C129.1,26.037 126.81,23.9 123.25,23.9 L123.25,23.9 Z"
                                                    fill="#000000"></path>
                                                <path
                                                    d="M108,37.125 C105.722,40.02 101.156,41.3 96.75,41.3 C89.633,41.3 85.2,36.354 85.2,29 C85.2,21.645 90.5,17.7 97.75,17.7 C103.75,17.7 108.8,21.917 108.8,30 C108.8,31.25 108.6,32 108.6,32 L92,32 L92.111,32.67 C92.51,34.873 94.873,36 97.625,36 C99.949,36 101.689,34.988 102.875,33.375 L108,37.125 Z M101.75,27 C101.797,24.627 99.89,22.7 97.328,22.7 C94.195,22.7 92.189,24.77 92,27 L101.75,27 Z"
                                                    fill="#000000"></path>
                                                <polygon fill="#000000"
                                                         points="63 7 70 7 70 27 78 18 86.75 18 77 28.5 86.375 41 78 41 70 30 70 41 63 41"></polygon>
                                                <path
                                                    d="M37,18 L43,18 L43,21.375 C43.947,19.572 47.037,17.7 50.5,17.7 C57.713,17.7 59,21.957 59,28.125 L59,41 L52,41 L52,29.625 C52,26.969 52.152,23.8 48.5,23.8 C44.8,23.8 44,26.636 44,29.625 L44,41 L37,41 L37,18 Z"
                                                    fill="#000000"></path>
                                                <path
                                                    d="M29.5,6.125 C31.813,6.125 33.875,8.189 33.875,10.5 C33.875,12.811 31.813,14.875 29.5,14.875 C27.19,14.875 25.125,12.811 25.125,10.5 C25.125,8.189 27.19,6.125 29.5,6.125 L29.5,6.125 Z M26,41 L33,41 L33,18 L26,18 L26,41 Z"
                                                    fill="#000000"></path>
                                                <polygon fill="#000000"
                                                         points="0 7 7 7 7 34 22 34 22 41 0 41"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>

                    </div>
                    <div className="header__content "><h1 className="header__content__heading"><Trans
                        i18nKey='WELCOME_TEXT'/></h1><p
                        className="header__content__subheading"><Trans i18nKey='WELCOME_TITLE'/></p></div>
                    <div className="justify-content-center">
                        <Form>
                            <Row form>
                                <Col md={4} className="offset-4">
                                    <FormGroup>
                                        <Label for='name'><Trans i18nKey='NAME'/></Label>
                                        <Input type='text' name='username' id='username'
                                               defaultValue={props.username}
                                               placeholder='user' onChange={e => handleChange(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4} className="offset-4">
                                    <FormGroup>
                                        <Label for='password'><Trans i18nKey='PASSWORD'/></Label>
                                        <Input type='password' name='password' id='password'
                                               defaultValue={props.password} onChange={e => handleChange(e)}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                        <button onClick={login} className="btn__primary--large from__button--floating"
                                type="submit"
                                aria-label="Sign in"><Trans i18nKey='SIGN_IN'/>
                        </button>
                    </div>
                    <div className="footer-app-content-actions">
                        <div><a href="/checkpoint/rp/request-password-reset"
                                className="btn__tertiary--medium action__btn"><Trans i18nKey='FORGOT_PASSWORD'/></a>
                        </div>
                        <p><Trans i18nKey='NEW_TO_LINKEDIN'/> <RegistrationModal/></p></div>
                    <div className="footer-app-content-actions">
                        <FacebookLoginWithButton
                            appId="601488443965961"
                            fields="name,email,picture,location"
                            icon="fa-facebook"
                            callback={facebookLogin}/>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default withTranslation()(Login);