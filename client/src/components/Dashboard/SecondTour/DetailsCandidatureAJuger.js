import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'reactstrap';
import ReactDOM from 'react-dom';
import {enregistrerBrouillonJudge,} from "../../../store/actions";
import {refuserCandidature,} from "../../../store/actions";
import {appelerCandidature,} from "../../../store/actions";
import { UncontrolledTooltip } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import moment from 'moment';
import Header from '../../../containers/Header.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

import {connect} from "react-redux";
import ContentContainer from "../../../containers/ContentContainer";
class DetailsCandidatureAJuger extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',

            Projects: [],
            NomSession: '',
            DateEnd: '',
            text: '',
            type: '',
        id3:''}
        ;
        this.handleTextChange = this.handleTextChange.bind(this);
        this.masquer = this.masquer.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleSubmit2= this.handleSubmit2.bind(this);
        this.handleSubmit3= this.handleSubmit3.bind(this);
    };
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleTextChange (evt) {
        this.setState({text: evt.target.value });
    }


    componentDidMount() {
        const {id2}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id2).then(res=>{
            console.log(res.data)
            this.setState({NomSession:res.data.Name});
            this.setState({Projects:res.data.Project});
            this.setState({DateEnd:res.data.EndDate})


        })
    }



    handleSubmit=event=>{

        const Review={
            text: this.state.text,
            type:this.state.type


        }
       const id4=this.state.id3;
        event.preventDefault();
        this.props.enregistrerBrouillonJudge("5cbb04417a5c065a08b76528",id4,Review); }

    handleSubmit2=event=>{



        const id4=this.state.id3;
        event.preventDefault();
        this.props.refuserCandidature(id4)}
    handleSubmit3=event=>{



        event.preventDefault();
        this.props.appelerCandidature(58011658)}


    masquer (text) {
        return event => {
            event.preventDefault()
            this.refs.container.value=text
        }
    }

    render(){
        const formattedDate = moment(this.state.DateEnd).format("LLL");
        const {Projects} = this.state;
        return (

            < div
                id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

<Header/>
                <div className="boxed">

                    <div id="content-container">
                       <ContentContainer/>

                        <div className="panel">
                            <div className="panel-heading">



                                <h2 className="panel-title" style={{float: 'left',width: '34%', textalign:'left'}}>{this.state.NomSession}</h2>
                                <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'center'}}>2eme Tour</p>
                                <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'right'}}>

                                    Deadline:     {formattedDate}

                                </p>
                            </div>


                            <center> <div className="text-center">25%</div>
                                <Progress color="#31b0d5" value="25" />
                            </center>





                        </div>
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Candidatures non traitées
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Candidatures traitées
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                {Projects.map(project=>{
                                    const {id1}=this.props.match.params
                                    if (project._id===id1)
                                    {
                                        this.state.type=project.createdBy.review.type;
                                        this.state.id3=project.createdBy._id;

                                        return (
                                            <div>
                                     <span style={{textDecoration: "underline", color:"blue"}} href="#" id="UncontrolledTooltipExample">Tour2   ></span>
                                    <span>{project.Name}</span>




                                            <ListGroup>

                                                <ListGroupItem><legend>Avis Charge</legend>
                                                    <Button color="success">{project.createdBy.review.type}</Button>{' '}
                                                    <br/>
                                                    {project.createdBy.review.text}</ListGroupItem>
                                            </ListGroup>


                                                {project.createdBy.Questions.map(question => (
                                                    <ListGroup>

                                                        <ListGroupItem>

                                                            {question.text}</ListGroupItem>
                                                        {question.responses.map(response => (
                                                            <ListGroupItem>

                                                                {response.text}</ListGroupItem>


                                                        ))}

                                                    </ListGroup>

                                                ))}




                                            </div> )}})}
                                <ListGroup>

                                    <fieldset border="1">
                                    <legend>Avis Tour2</legend>
                                        {Projects.map(project=>{
                                            const {id1}=this.props.match.params
                                            if (project._id===id1) {
return(
                                                <Link onClick={this.masquer(project.createdBy.review.text).bind(this)}>Reprendre
                                                    la recommendation du chargé</Link>)
                                            }})}
                                        <form onSubmit={this.handleSubmit }>
                                            <div className="col-md-9">
                                                <textarea ref="container" id="a_masquer" type="text" name="text" onChange={this.handleTextChange} className="form-control" placeholder="Commentaire"/>

                                        </div>
<br/>



                                        <h2 className="panel-title" style={{float: 'left',width: '34%', textalign:'left'}}>
                                            <button className="btn btn-info " type="submit">Enregistrer le brouillon</button></h2>



                                    </form>
                                        <form onSubmit={this.handleSubmit2 }>
                                        <p className="panel-title" style={{float: 'left', width: '33%', textalign: 'center'}}>

                                            <button className="btn btn-danger" type="submit">Refuser</button></p>
                                        </form>
                                        <form onSubmit={this.handleSubmit3 }>
                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-success" type="submit">
                                                Appeler pour pitch</button>

                                        </p></form>

                                        <p className="panel-title" style={{float: 'left', width: '15%', textalign: 'right'}}>
                                            <button className="btn btn-info" type="submit">
                                                Suivant</button>

                                        </p>
                                    </fieldset>

                                </ListGroup>

                            </TabPane>
                        </TabContent>
                        <nav id="mainnav-container">

                            <div className="navbar-header">
                                <a href="index.html" className="navbar-brand">
                                    <i className="fa fa-forumbee brand-icon"></i>
                                    <div className="brand-title">
                                        <span className="brand-text">WOW</span>
                                    </div>
                                </a>
                            </div>

                            <div id="mainnav">


                                <div id="mainnav-menu-wrap">
                                    <div className="nano">
                                        <div className="nano-content">
                                            <ul id="mainnav-menu" className="list-group">

                                                <li className="list-header">Navigation</li>

                                                <li><a href="index.html"> <i className="fa fa-home"></i> <span
                                                    className="menu-title"> Dashboard </span> </a></li>

                                                <li className="list-header">Components</li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-th"></i>
                                                        <span className="menu-title">
                                               Layouts
                                            </span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="layout-blank.html"><i className="fa fa-caret-right"></i> Blank
                                                            Page </a></li>
                                                        <li><a href="layout-boxed.html"><i className="fa fa-caret-right"></i> Boxed
                                                            Version </a></li>
                                                        <li><a href="layout-collapsed-sidebar.html"><i
                                                            className="fa fa-caret-right"></i> Collapsed Sidebar </a></li>
                                                        <li><a href="layout-push-menu.html"><i
                                                            className="fa fa-caret-right"></i> Push Menu </a></li>
                                                        <li><a href="layout-slide-menu.html"><i
                                                            className="fa fa-caret-right"></i> Slide Menu </a></li>
                                                        <li><a href="layout-horizontal-menu.html"><i
                                                            className="fa fa-caret-right"></i> Horizontal Menu </a></li>
                                                        <li><a href="layout-horizontal-menu-boxed.html"><i
                                                            className="fa fa-caret-right"></i> Boxed Horizontal </a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-briefcase"></i>
                                                        <span className="menu-title">UI Elements</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="ui-animation.html"><i className="fa fa-caret-right"></i> CSS3
                                                            Animation </a></li>
                                                        <li><a href="ui-panel.html"><i className="fa fa-caret-right"></i> Panel </a>
                                                        </li>
                                                        <li><a href="ui-xeditable.html"><i
                                                            className="fa fa-caret-right"></i> Xeditable </a></li>
                                                        <li><a href="ui-button.html"><i className="fa fa-caret-right"></i> Buttons
                                                        </a></li>
                                                        <li><a href="ui-fontawesome.html"><i
                                                            className="fa fa-caret-right"></i> Fontawesome </a></li>
                                                        <li><a href="ui-icons.html"><i className="fa fa-caret-right"></i> Icons </a>
                                                        </li>
                                                        <li><a href="ui-components.html"><i
                                                            className="fa fa-caret-right"></i> Components </a></li>
                                                        <li><a href="ui-timeline.html"><i
                                                            className="fa fa-caret-right"></i> Timeline </a></li>
                                                        <li><a href="ui-nested-lists.html"><i
                                                            className="fa fa-caret-right"></i> Nested Lists </a></li>
                                                        <li><a href="ui-grids.html"><i className="fa fa-caret-right"></i> Grids </a>
                                                        </li>
                                                        <li><a href="ui-tab.html"><i className="fa fa-caret-right"></i> Tab </a>
                                                        </li>
                                                        <li><a href="ui-accordions.html"><i
                                                            className="fa fa-caret-right"></i> Accordions </a></li>
                                                        <li><a href="ui-dragdrop.html"><i
                                                            className="fa fa-caret-right"></i> Draggable Panel</a></li>
                                                        <li><a href="ui-typography.html"><i
                                                            className="fa fa-caret-right"></i> Typography </a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-file"></i>
                                                        <span className="menu-title">Pages</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="pages-faq.html"><i className="fa fa-caret-right"></i> FAQ </a>
                                                        </li>
                                                        <li><a href="pages-gallery.html"><i
                                                            className="fa fa-caret-right"></i> Gallery </a></li>
                                                        <li><a href="pages-directory.html"><i
                                                            className="fa fa-caret-right"></i> Directory </a></li>
                                                        <li><a href="pages-profile.html"><i className="fa fa-caret-right"></i> User
                                                            Profile </a></li>
                                                        <li><a href="pages-invoice.html"><i
                                                            className="fa fa-caret-right"></i> Invoice </a></li>
                                                        <li><a href="pages-login.html"><i className="fa fa-caret-right"></i> Login
                                                        </a></li>
                                                        <li><a href="pages-register.html"><i
                                                            className="fa fa-caret-right"></i> Register </a></li>
                                                        <li><a href="pages-password-reminder.html"><i
                                                            className="fa fa-caret-right"></i> Password Reminder </a></li>
                                                        <li><a href="pages-lock-screen.html"><i
                                                            className="fa fa-caret-right"></i> Lock Screen </a></li>
                                                        <li><a href="pages-404.html"><i className="fa fa-caret-right"></i> 404 Error
                                                        </a></li>
                                                        <li><a href="pages-500.html"><i className="fa fa-caret-right"></i> 500 Error
                                                        </a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-table"></i>
                                                        <span className="menu-title">Tables</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="table-static.html"><i className="fa fa-caret-right"></i> Static
                                                            Table <span className="label label-info pull-right">New</span></a></li>
                                                        <li><a href="table-datatable.html"><i
                                                            className="fa fa-caret-right"></i> Datatable Table </a></li>
                                                        <li><a href="table-footable.html"><i
                                                            className="fa fa-caret-right"></i> Footable Table </a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-edit"></i>
                                                        <span className="menu-title">Forms</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="forms-layout.html"><i className="fa fa-caret-right"></i> Form
                                                            Layout </a></li>
                                                        <li><a href="forms-switchery.html"><i
                                                            className="fa fa-caret-right"></i> Form Switchery </a></li>
                                                        <li><a href="forms-components.html"><i
                                                            className="fa fa-caret-right"></i> Form Components </a></li>
                                                        <li><a href="forms-validation.html"><i
                                                            className="fa fa-caret-right"></i> Form Validation </a></li>
                                                        <li><a href="forms-wizard.html"><i className="fa fa-caret-right"></i> Form
                                                            Wizard </a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-line-chart"></i>
                                                        <span className="menu-title">Charts</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="charts-flot.html"><i className="fa fa-caret-right"></i> Flot
                                                            Chart </a></li>
                                                        <li><a href="charts-morris.html"><i
                                                            className="fa fa-caret-right"></i> Morris Chart </a></li>
                                                    </ul>
                                                </li>
                                                <li className="list-divider"></li>

                                                <li className="list-header">Extra</li>

                                                <li>
                                                    <a href="calendar.html">
                                                        <i className="fa fa-calendar"></i>
                                                        <span className="menu-title">
                                            Calendar
                                            </span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="ui-widgets.html">
                                                        <i className="fa fa-flask"></i>
                                                        <span className="menu-title">
                                               Widgets
                                            <span className="label label-pink pull-right">New</span>
                                            </span>
                                                    </a>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-envelope-o"></i>
                                                        <span className="menu-title">Mail</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="mail-inbox.html"><i className="fa fa-caret-right"></i> Inbox
                                                        </a></li>
                                                        <li><a href="mail-compose.html"><i
                                                            className="fa fa-caret-right"></i> Compose </a></li>
                                                        <li><a href="mail-mailview.html"><i className="fa fa-caret-right"></i> Mail
                                                            View </a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-map-marker"></i>
                                                        <span className="menu-title">
                                            Maps
                                            <span className="label label-mint pull-right">New</span>
                                            </span>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="maps-gmap.html">Google Maps</a></li>
                                                        <li><a href="maps-vectormap.html">Vector Maps</a></li>
                                                    </ul>
                                                </li>

                                                <li>
                                                    <a href="#">
                                                        <i className="fa fa-plus-square"></i>
                                                        <span className="menu-title">Menu Level</span>
                                                        <i className="arrow"></i>
                                                    </a>

                                                    <ul className="collapse">
                                                        <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                        </li>
                                                        <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                        </li>
                                                        <li><a href="#"><i className="fa fa-caret-right"></i> Second Level Item</a>
                                                        </li>
                                                        <li className="list-divider"></li>
                                                        <li>
                                                            <a href="#">Third Level<i className="arrow"></i></a>

                                                            <ul className="collapse">
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a href="#">Third Level<i className="arrow"></i></a>

                                                            <ul className="collapse">
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li className="list-divider"></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                                <li><a href="#"><i className="fa fa-caret-right"></i> Third Level
                                                                    Item</a></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>

                                            <div className="mainnav-widget">

                                                <div className="show-small">
                                                    <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                                                        <i className="fa fa-desktop"></i>
                                                    </a>
                                                </div>

                                                <div id="demo-wg-server" className="hide-small mainnav-widget-content">
                                                    <ul className="list-group">
                                                        <li className="list-header pad-no pad-ver">Server Status</li>
                                                        <li className="mar-btm">
                                                            <span className="label label-primary pull-right">15%</span>
                                                            <p>CPU Usage</p>
                                                            <div className="progress progress-sm">
                                                                <div className="progress-bar progress-bar-primary"
                                                                     style={{width: 15}}>
                                                                    <span className="sr-only">15%</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="mar-btm">
                                                            <span className="label label-purple pull-right">75%</span>
                                                            <p>Bandwidth</p>
                                                            <div className="progress progress-sm">
                                                                <div className="progress-bar progress-bar-purple"
                                                                     style={{width: 75}}>
                                                                    <span className="sr-only">75%</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </div>
                        </nav>

                    </div>

                </div>

            </div>




        )
    }
}
const mapDispatchToProps = {
    enregistrerBrouillonJudge,
    refuserCandidature,
    appelerCandidature

};

export default connect(
    null,
    mapDispatchToProps
)(DetailsCandidatureAJuger);
