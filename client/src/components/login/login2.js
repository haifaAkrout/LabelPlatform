import React from 'react';
import {addCompte, loginUser, setCurrentUser} from "../../store/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS,SET_CURRENT_USER } from '../../actions/types';
import logo from "./logo_label_blanc.png";


class login2 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {


            Email:'',
            Password:'',
            errors: {},


        } ;

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);


        this.handleSubmit = this.handleSubmit.bind(this);

    };

    handleEmailChange (evt) {
        this.setState({ Email: evt.target.value });
    }

    handlePasswordChange (evt) {
        this.setState({ Password: evt.target.value });
    }
    handleSubmit=event=> {
        event.preventDefault()
        const user = {

            Email: this.state.Email,
            Password: this.state.Password,}
        axios.post('http://localhost:6003/judges/login', user)
            .then(res => {
                const {token} = res.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                const decoded = jwt_decode(token);
                const user1 =setCurrentUser(decoded)
                console.log(user1)
                console.log("login in login +++")

            })

        this.props.history.push("/Dashboard");
    }



    render(){

        return (
            <div className="login-wrap">
                <div className="login-html">
                    <a href="/" className="aligncenter">
                        <img className="logo_signin logo_div" src={logo} /><br />
                    </a>
                    <form className="panel-body form-horizontal" onSubmit={this.handleSubmit }>

                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab">Forgot Password</label>
                    <div className="login-form">
                        <div className="sign-in-htm">
                            <div className="text-center social-btn" hidden='true'>
                                <a href="#" className="btn btn-primary btn-block"><i className="fa fa-facebook" /> Sign in with <b>Facebook</b></a>
                                <a href="#" className="btn btn-danger btn-block"><i className="fa fa-google" /> Sign in with <b>Google</b></a>
                            </div>
                            <div className="hr2" />
                            <div className="group">
                                <label htmlFor="username" className="label">Username or Email</label>
                                <input type="text" name="Email" onChange={this.handleEmailChange} className="input" placeholder="Email" />              </div>
                            <div className="group">
                                <label htmlFor="password" className="label">Password</label>
                                <input type="password" name="Password" onChange={this.handlePasswordChange} className="input" placeholder="Password" />

                            </div>
                            <div className="group">
                                <button  className="button" onClick={this.handleClick} >Sign In</button>
                            </div>
                        </div>
                        <div className="for-pwd-htm">

                            <div className="group">
                                <button  className="button" >Reset Password</button>
                            </div>
                            <div className="hr" />
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )

    }}
const mapDispatchToProps = {
    loginUser

};

export default connect(
    null,
    mapDispatchToProps
)(login2);
