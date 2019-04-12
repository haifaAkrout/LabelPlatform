
import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";

import {
    addCompte,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class AddCompte extends Component{
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {

            LastName:'',
            FirstName:'',
            Email:'',
            Password:'',
            YearsOfExperience:'',
            Spécialité:'',
            Telephone:''


        } ;

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleYearsOfExperienceChange = this.handleYearsOfExperienceChange.bind(this);
        this.handleSpécialitéChange = this.handleSpécialitéChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleTelephoneChange = this.handleTelephoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };


    handleEmailChange (evt) {
        this.setState({ Email: evt.target.value });
    }

    handlePasswordChange (evt) {
        this.setState({ Password: evt.target.value });
    }
    handleSpécialitéChange (evt) {
        this.setState({ Spécialité: evt.target.value });
    }

    handleYearsOfExperienceChange (evt) {
        this.setState({YearsOfExperience: evt.target.value });
    }
    handleLastNameChange (evt) {
        this.setState({LastName: evt.target.value });
    }

    handleFirstNameChange (evt) {
        this.setState({ FirstName: evt.target.value });
    }
    handleTelephoneChange (evt) {
        this.setState({ Telephone: evt.target.value });
    }


    handleSubmit=event=>{

        const judge={
            LastName: this.state.LastName,
            FirstName: this.state.FirstName,
            Email:this.state.Email,
            Password: this.state.Password,
            YearsOfExperience: this.state.YearsOfExperience,
            Spécialité: this.state.Spécialité,
            Telephone:this.state.Telephone

        }
        event.preventDefault();
        this.props. addCompte(judge); }
    render(){
        return (

            < div
        id = "container"
        className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

        <div className="boxed">
            <Header/>
            <div id="content-container">
        <ContentContainer/>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="panel">
                            <div className="panel-heading">
                                <div className="panel-control">
                                    <button className="btn btn-default" data-click="panel-expand"><i
                                        className="fa fa-expand"></i></button>
                                    <button className="btn btn-default" data-click="panel-reload"><i
                                        className="fa fa-refresh"></i></button>
                                    <button className="btn btn-default" data-click="panel-collapse"><i
                                        className="fa fa-chevron-down"></i></button>
                                    <button className="btn btn-default" data-dismiss="panel"><i className="fa fa-times"></i>
                                    </button>
                                </div>
                                <h3 className="panel-title">Add account</h3>
                            </div>

                            <form className="panel-body form-horizontal" onSubmit={this.handleSubmit }>


                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">LastName</label>
                                    <div className="col-md-9">
                                        <input type="text" name="LastName" onChange={this.handleLastNameChange} className="form-control" placeholder="LastName"/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">FirstName</label>
                                    <div className="col-md-9">
                                        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} className="form-control"
                                               placeholder="FirstName"/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">Email</label>
                                    <div className="col-md-9">
                                        <input type="text" name="Email" onChange={this.handleEmailChange} className="form-control" placeholder="Email"/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">Password</label>
                                    <div className="col-md-9">
                                        <input type="password" name="Password" onChange={this.handlePasswordChange} className="form-control" placeholder=""/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">YearsOfExperience</label>
                                    <div className="col-md-9">
                                        <input type="Number" name="YearsOfExperience" onChange={this.handleYearsOfExperienceChange} className="form-control" placeholder=""/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">Speciality</label>
                                    <div className="col-md-9">
                                        <input type="tetx" name="Spécialité" onChange={this.handleSpécialitéChange} className="form-control" placeholder=""/>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label" htmlFor="demo-text-input">phone Number</label>
                                    <div className="col-md-9">
                                        <input type="tetx" name="Telephone" onChange={this.handleTelephoneChange} className="form-control" placeholder=""/>

                                    </div>
                                </div>
                                <button type="submit" className="btn btn-info btn-lg" name="signup" value="Submit">
                                    Submit
                                </button>
                                <header></header>

                            </form>
                        </div>
                    </div>

                </div>

            </div>
<Nav/>

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
)(AddCompte);
