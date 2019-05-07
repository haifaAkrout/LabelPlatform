
import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import 'react-notifications/lib/notifications.css';

import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    addCompte,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';

import logo from "../../login/logo_label_blanc.png";

import Header2 from "../../Front/front2";
import {Link} from "react-router-dom";
import axios from "axios";

class addCompte1 extends Component{

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {

            LastName:'',
            FirstName:'',
            Email:'',
            Password:'',



        } ;

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);

        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    };


    handleEmailChange (evt) {
        this.setState({ Email: evt.target.value });
    }

    handlePasswordChange (evt) {
        this.setState({ Password: evt.target.value });
    }

    handleLastNameChange (evt) {
        this.setState({LastName: evt.target.value });
    }

    handleFirstNameChange (evt) {
        this.setState({ FirstName: evt.target.value });
    }


    handleSubmit=event=>{

        const charge={
            LastName: this.state.LastName,
            FirstName: this.state.FirstName,
            Email:this.state.Email,
            Password: this.state.Password,


        }
        event.preventDefault();
        axios.post('http://localhost:6003/judges/registerCandidat',charge
        ).then(res=>{console.log(res);
            console.log(res.data)})
       }
    render(){

        return(


            <div className="login-wrap sign_in_wrap">
                <div className="login-html">
                    <a href="/" className="aligncenter">
                        <img className="logo_h_91 signin_html_wrap" src={logo} /><br />
                    </a>

                    <input id="tab-1" type="radio" name="tab" className="sign-in" defaultChecked /><label htmlFor="tab-1" className="tab"></label>
                    <input id="tab-2" type="radio" name="tab" className="for-pwd" /><label htmlFor="tab-2" className="tab" />


                    <div className="login-form">
                        <form  onSubmit={this.handleSubmit} >
                            <div className="sign-in-htm">
                                <div className="group row col-12">
                                    <br/>
                                </div>
                                <br/>
                                <br/>

                                <div className="group">


                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">LastName</label>

                                    <input type="text" name="LastName" onChange={this.handleLastNameChange} className="input" placeholder="LastName"/>



                                </div>
                                <div className="group row col-12">
                                    <div className="col-12">
                                        <label className="col-md-3 control-label" htmlFor="demo-text-input">FirstName</label>

                                        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} className="input"
                                               placeholder="FirstName"/>

                                    </div>
                                </div>
                                <div className="group row col-12">
                                    <div className="col-12">
                                        <label className="col-md-3 control-label" htmlFor="demo-text-input">Email</label>

                                        <input type="text" name="Email" onChange={this.handleEmailChange} className="input" placeholder="Email"/>
                                    </div>
                                </div>
                                <div className="group row col-12">
                                    <div className="col-12">
                                    </div>
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">Password</label>

                                    <input type="password" name="Password" onChange={this.handlePasswordChange} className="input" placeholder="Password" />


                                </div>
                                <div className="group">
                                    <button type="submit"  className="button " name="signup" value="Submit">Save</button></div>
                                </div>

                        </form>
                            </div>



                    </div>
                </div>




        )
    }
}



const mapDispatchToProps = {
    addCompte

};

export default connect(
    null,
    mapDispatchToProps
)(addCompte1);
