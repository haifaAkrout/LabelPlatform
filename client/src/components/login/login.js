import React from 'react';
import {addCompte, loginUser, setCurrentUser} from "../../store/actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import axios from "axios";
import setAuthToken from "../../setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS,SET_CURRENT_USER } from '../../actions/types';


class login extends React.Component{

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
                })
        this.props.history.push("../Dashboard");

    }



    render(){

        return (
            <div id="container">

                <div className="lock-wrapper">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="lock-box">
                                <div className="main">
                                    <h3>Please Log In, or <a href="#">Sign Up</a></h3>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <a href="#" className="btn btn-lg btn-primary btn-block">Facebook</a>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <a href="#" className="btn btn-lg btn-info btn-block">Google</a>
                                        </div>
                                    </div>
                                    <div className="login-or">

                                    </div>
                                    <form className="panel-body form-horizontal" onSubmit={this.handleSubmit }>
                                        <div className="form-group">
                                            <label htmlFor="inputUsernameEmail">Username or email</label>
                                            <input type="text" name="Email" onChange={this.handleEmailChange} className="form-control" placeholder="Email"/>
                                        </div>
                                        <div className="form-group">
                                            <a className="pull-right" href="#">Forgot password?</a>
                                            <label htmlFor="inputPassword">Password</label>
                                            <input type="password" name="Password" onChange={this.handlePasswordChange} className="form-control" placeholder="Password" />
                                        </div>
                                        <div className="pull-left pad-btm">
                                            <div className="checkbox">
                                                <label className="form-checkbox form-icon form-text">

                                                </label>
                                            </div>
                                        </div>
                                        <a href="http://localhost:3000/Dashboard" >  <button type="submit" className="btn btn-block btn-primary">
                                            Sign In
                                        </button></a>
                                    </form>

                                </div>

                            </div>
                        </div>

                    </div>
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
)(login);
