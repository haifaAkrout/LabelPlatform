import React, { Component } from "react";
import { Link } from 'react-router';

import { connect } from "react-redux";
import {
    sendemail,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class sendEmail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            To:'',
            Subject:'',
            Content:'',
            LastName:'',
            FirstName:''


        } ;
        this.handleToChange = this.handleToChange.bind(this);
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);

    };




    handleToChange (evt) {
        this.setState({ To: evt.target.value });
    }

    handleSubjectChange (evt) {
        this.setState({ Subject: evt.target.value });
    }
    handleContentChange (evt) {
        this.setState({ Content: evt.target.value });
    }
    handleLastNameChange (evt) {
        this.setState({LastName: evt.target.value });
    }

    handleFirstNameChange (evt) {
        this.setState({ FirstName: evt.target.value });
    }

    handleSubmit=event=>{

        const email={
            To: this.state.To,
            Subject: this.state.Subject,
            Content:this.state.Content,
            LastName:this.state.LastName,
            FirstName:this.state.FirstName

        }
        event.preventDefault();
        this.props.sendemail(email); }
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
                <div className="col-xs-12 col-md-3 col-lg-3">
                    <div className="mail-categories">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-inbox"></i> Inbox <span
                                    className="label label-info pull-right">6</span> </a>
                            </li>
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-envelope-o"></i> Send mail </a>
                            </li>
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-star"></i> Starred <span
                                    className="label label-danger pull-right">3</span> </a>
                            </li>
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-comment-o"></i> Chat <span
                                    className="label label-success pull-right">9</span> </a>
                            </li>
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-pencil"></i> Draft <span
                                    className="label label-warning pull-right">1</span> </a>
                            </li>
                            <li className="list-group-item">
                                <a href="javascript:;"> <i className="fa fa-trash-o"></i> Spam </a>
                            </li>
                        </ul>
                    </div>


                </div>
                <div className="col-xs-12 col-md-9 col-lg-9">
                    <div className="panel">
                        <div className="panel-body">

                            <form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >
                                <div className="form-group nb">
                                    <label className="control-label col-md-1">LastName: </label>
                                    <div className="col-md-11">
                                        <input type="text" name="LastName" onChange={this.handleLastNameChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-1">FirstName: </label>
                                    <div className="col-md-11">
                                        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-1">To: </label>
                                    <div className="col-md-11">
                                        <input type="text" name="To" onChange={this.handleToChange} className="form-control "/>
                                    </div>
                                </div>

                                <div className="form-group nb">
                                    <label className="control-label col-md-1">Subject: </label>
                                    <div className="col-md-11">
                                        <input type="text" name="Subject" onChange={this.handleSubjectChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-1">Subject: </label>
                                    <div className="col-md-11">
                                        <textarea type="text" name="Content" onChange={this.handleContentChange} className="form-control "/>
                                    </div>
                                </div>
                                <button  type="Submit" className="btn btn-danger"><i className="fa fa-send"></i> Send</button>

                            </form>
                        </div>
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
    sendemail

};

export default connect(
    null,
    mapDispatchToProps
)(sendEmail);
