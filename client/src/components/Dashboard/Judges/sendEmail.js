import React, { Component } from "react";
import { Link } from 'react-router';
import 'react-notifications/lib/notifications.css';
import { connect } from "react-redux";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    sendemail,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav from '../../../containers/Nav.js';
class sendEmail extends Component{
    createNotification = (type) => {
        return () => {
            switch (type) {
                case 'info':
                    NotificationManager.info('Votre email a étè envoyée avec succées');
                    break;
                case 'success':
                    NotificationManager.success('Success message', 'Title here');
                    break;
                case 'warning':
                    NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                    break;
                case 'error':
                    NotificationManager.error('Error message', 'Click me!', 5000, () => {
                        alert('callback');
                    });
                    break;
            }
        };
    };
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
            Subject: "Invitation",
            Content:"http://localhost:3000/Judges/addCompte",
            LastName:this.state.LastName,
            FirstName:this.state.FirstName

        }




        event.preventDefault();
        this.props.sendemail(email);
        this.createNotification('success')
     //   window.location.reload()
   }

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
                                <div className="form-group ">
                                    <label className="control-label col-md-2">LastName: </label>
                                    <div className="col-md-6">
                                        <input type="text" name="LastName" onChange={this.handleLastNameChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-2">FirstName: </label>
                                    <div className="col-md-6">
                                        <input type="text" name="FirstName" onChange={this.handleFirstNameChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-2">To: </label>
                                    <div className="col-md-6">
                                        <input type="text" name="To" onChange={this.handleToChange} className="form-control "/>
                                    </div>
                                </div>

                                <div className="form-group nb">
                                    <label className="control-label col-md-2">Subject: </label>
                                    <div className="col-md-6">
                                        <input type="text"  value="Invitation" disabled name="Subject" onChange={this.handleSubjectChange} className="form-control "/>
                                    </div>
                                </div>
                                <div className="form-group nb">
                                    <label className="control-label col-md-2">Content: </label>
                                    <div className="col-md-7">
                                        <textarea type="text" disabled value="http://localhost:3000/Judges/addCompte" name="Content" onChange={this.handleContentChange} className="form-control "/>
                                    </div>
                                </div>
                                <NotificationContainer/>
                             <center><button  type="Submit"   onClick={this.createNotification('info')} className="btn btn-danger"><i className="fa fa-send"></i> Send</button></center>

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
