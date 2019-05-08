
import React, { Component, Suspense } from 'react';
import { connect } from "react-redux";
import 'react-notifications/lib/notifications.css';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {
    addCompte,

} from "../../../store/actions";
import Header from '../../../containers/Header.js';
import ContentContainer from '../../../containers/ContentContainer.js';
import Nav1 from '../../../containers/Nav1.js';

import logo from "../../login/logo_label_blanc.png";

import Header2 from "../../Front/front2";
import {Link} from "react-router-dom";

class addSession extends Component{

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {

          nom:'',
            commentaire:'',
            from:undefined,
            to:undefined


        } ;

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handlefromChange = this.handlefromChange.bind(this);
        this.handletoChange = this.handletoChange.bind(this);

    };

    handleNameChange (evt) {
        this.setState({ Name: evt.target.value });
    }
    handlefromChange (evt) {
        this.setState({ from: evt.target.value });
    }
    handletoChange (evt) {
        this.setState({ to: evt.target.value });
    } handleCommentChange (evt) {
        this.setState({ Comment: evt.target.value });
    }
    handleSubmit= (event) => {
        event.preventDefault()
        const data = this.state
        console.log(data)
        axios.post('http://localhost:6003/sessionsWij/addSession', {
            Name: this.state.Name,
            Comment: this.state.Comment,
            StartDate: this.state.from,
            EndDate: this.state.to,
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {

                   // NotificationManager.success('Success message', 'ajouter avec succes');


                }


            })
            .catch(function (error) {
                //NotificationManager.error('erreur', 'erreur');
            });

    }
    render(){

        return(

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <div className="boxed">
                    <Header/>
                    <div id="content-container">
                        <ContentContainer/>
                        <div id="page-content">

                            <div className="row">

                                <div className="col-xs-12 col-md-9 col-lg-9">
                                    <div className="panel">
                                        <div className="panel-body">
                                            <form className="form-horizontal form-bordered" onSubmit={this.handleSubmit} >


                                                <div className="form-group ">
                                                    <label style={{color:"black",fontSize:"13px"}} className="control-label col-md-2">Name: </label>

                                                    <div className="col-md-6">
                                                        <input type="text" name="Name" onChange={this.handleNameChange} className="form-control "/>
                                                    </div>
                                                </div>



                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Start Date: </label>
                                                    <div className="col-md-6">
                                                        <input type="Date" name="from" onChange={this.handlefromChange} className="form-control "/>
                                                    </div>
                                                </div>
                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">EndDate: </label>
                                                    <div className="col-md-6">
                                                        <input type="Date" name="to" onChange={this.handletoChange} className="form-control "/>
                                                    </div>
                                                </div>

                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Comment: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="Comment" onChange={this.handleCommentChange} className="form-control "/>
                                                    </div>
                                                </div>

                                                <center><button  type="Submit"  className="btn btn-danger"><i className="fa fa-send"></i> Add Session</button></center>

                                            </form>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <Nav1/>


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
)(addSession);