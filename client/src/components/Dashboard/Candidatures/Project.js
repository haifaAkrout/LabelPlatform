
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

class Project extends Component{

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

    constructor(props) {
        super(props);
        this.state = {

            Name:'',
            Response1:'',
            Response2:'',
            createdBy:'',



        } ;

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleResponse1Change = this.handleResponse1Change.bind(this);
        this.handleResponse2Change = this.handleResponse2Change.bind(this);

    };

    handleNameChange (evt) {
        this.setState({ Name: evt.target.value });
    }
    handleResponse1Change (evt) {
        this.setState({ Response1: evt.target.value });
    }
    handleResponse2Change (evt) {
        this.setState({ Response2: evt.target.value });
    }

    handleSubmit= (event) => {
        const {id1} =this.props.match.params;

        event.preventDefault()

        axios.post('http://localhost:6003/projects/add/'+id1, {
            Name: this.state.Name,
            Response2: this.state.Response2,
            Response1: this.state.Response1,
            createdBy: "5cd2be6d53a4e101c8942f12",

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
            >

                <div className="boxed">
                    < header
                        id = "navbar" >
                        < div
                            id = "navbar-container"
                            className = "boxed" >

                            < div
                                className = "navbar-content clearfix" >
                                < ul
                                    className = "nav navbar-top-links pull-left" >

                                    < li
                                        className = "tgl-menu-btn" >
                                        < a
                                            className = "mainnav-toggle"
                                            href = "#" > < i
                                            className = "fa fa-navicon fa-lg" > </i>
                                        </a >

                                    </li>
                                </ul>
                                < ul
                                    className = "nav navbar-top-links right" >

                                    <li className="col-sm-3 col-xs-4">
                                        <a href="index-2.html" className="logo">Labelling Platform</a>
                                    </li>

                                    <li className="current"><Link to={'/front'}>Home</Link>

                                    </li>
                                    <li><a href="#about">About</a></li>
                                    <li><Link to={"/Questionnaire"}>Apply</Link></li>
                                    <li><Link to={"/SignInCa"}>Candidatures</Link></li>



                                    <li><Link to={"/SignIN"} >Judges </Link></li>
                                    <li><Link to={"/SignINUSE"} >Charges </Link></li>
                                    <li><Link to={"/register"} >Admin </Link></li>
                                </ul>
                            </div>

                        </div>
                    </header>
                    <div id="content-container">

                        <div id="page-content">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
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
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Give me a short Description of your project: </label>
                                                    <br/>
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Response1: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="from" onChange={this.handleResponse1Change} className="form-control "/>
                                                    </div>
                                                </div>
                                                <div className="form-group nb">
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Add your Vidéo Link: </label>
                                                    <br/>
                                                    <label style={{color:"black",fontSize:"12px"}} className="control-label col-md-2">Response2: </label>
                                                    <div className="col-md-6">
                                                        <input type="text" name="to" onChange={this.handleResponse2Change} className="form-control "/>
                                                    </div>
                                                </div>



                                                <center><button  type="Submit"  className="btn btn-danger"><i className="fa fa-send"></i> Add Project</button></center>

                                            </form>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
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
)(Project);