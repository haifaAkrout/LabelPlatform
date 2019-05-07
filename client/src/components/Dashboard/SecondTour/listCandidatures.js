import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Progress } from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
import ContentContainer from "../../../containers/ContentContainer";
import Header from '../../../containers/Header.js';
import Nav1 from '../../../containers/Nav1.js';
import { Link } from 'react-router-dom';
import {deleteJudge,
} from "../../../store/actions";
import {connect} from "react-redux";
export  default  class listCandidatures extends React.Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            SessionId:0,
            Sessions:[],
            NomSession:'',
            DateEnd:'',
            i:0
        } ;



    };
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    componentDidMount() {
        const {id1}=this.props.match.params
        axios.get('http://localhost:6003/candidatures/'+id1).then(res=>{
            console.log(res.data.Project)
            this.setState({SessionId:res.data._id});
            this.setState({NomSession:res.data.Name});
            this.setState({Sessions:res.data.Project});
            this.setState({DateEnd:res.data.EndDate})


        })
    }




    render(){
        const formattedDate = moment(this.state.DateEnd).format("LLL");
        const {Sessions} = this.state;
        return (



            <div id = "container"   className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
            <Header/>

            <div className="boxed">

            <div className="boxed">

        <div id="content-container">
            <div className="pageheader hidden-xs">
                <br/>
                <div className="breadcrumb-wrapper">
                    <span className="label">You are here:</span>
                    <ol className="breadcrumb">
                        <li> <a href="/"> Home </a> </li>
                        <li className="active"> User Profile </li>
                    </ol>
                </div>
            </div>

            <div id="page-content">
                <div className="row">

                    <div className="col-lg-10 col-md-10 col-sm-10">

                        <div className="panel"  style={{height:"700px",width:"120%"}}>
                            <div className="panel">
                                <div className="panel-heading">



                                    <h2 className="panel-title" style={{float: 'left',width: '34%',color:"black", textalign:'left'}}>{this.state.NomSession}</h2>
                                    <p className="panel-title" style={{float: 'left', width: '33%',color:"black", textalign: 'center'}}>Second Tour</p>
                                    <p className="panel-title" style={{float: 'left', width: '33%', color:"black",textalign: 'right'}}>

                                        Deadline:     {formattedDate}

                                    </p>
                                </div>


                                <center> <div className="text-center" style={{color:"black"}}>25%</div>
                                    <Progress color="#31b0d5" value="25" />
                                </center>





                            </div>
                            <div className="panel-body pad-no" className="td">

                                <div className="tab-base" className="td">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink style={{color:"black"}}
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}
                                            >
                                                Candidatures non traitées
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink    style={{color:"black"}}
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}
                                            >
                                                Candidatures traitées
                                            </NavLink>
                                        </NavItem>
                                    </Nav>

                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink   style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>

                                            <table id="demo-foo-filtering"
                                                   className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                <thead>
                                                <tr>
                                                    <th>Type of candidature </th>
                                                    <th >Project Name </th>
                                                    <th >Lead </th>

                                                    <th >Soumission Date </th>
                                                    <th> Review Charge </th>

                                                    <th>Status</th>
                                                    <th> Action </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {Sessions.map(d=> {

                                                        if (d.createdBy.Status === "non Traité")
                                                            return (

                                                                <tr key={d._id}>


                                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                                    <td>{d.Name}</td>

                                                                    <td>{d.members[0].Email}</td>
                                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                    <td>{d.createdBy.charges.review.text}</td>
                                                                    <td>{d.createdBy.Status}</td>
                                                                    <td>
                                                                        <center>
                                                                            <button className="btn btn-info btn-lg" type="submit"><Link
                                                                                to={"/SecondTour/" + this.state.SessionId + "/Details/" + d._id}
                                                                                params={{
                                                                                    id1: d._id,
                                                                                    id2: '5ca6d387cf19b7956820d8f4'
                                                                                }}>Juger</Link></button>
                                                                        </center>
                                                                    </td>


                                                                </tr>
                                                            )


                                                    }
                                                )}


                                                </tbody>
                                            </table>

                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="2">




                                            <div className="panel-body">

                                                <table id="demo-foo-filtering"
                                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                    <thead>
                                                    <tr>
                                                        <th>Type of candidature</th>
                                                        <th >Project Name </th>
                                                        <th >Lead </th>

                                                        <th >Soumission Date </th>
                                                        <th> Review Charge </th>

                                                        <th>Status</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Sessions.map(d=>{
                                                        if (d.createdBy.Status==="Traité")
                                                            return (

                                                                <tr key={d._id}>
                                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                                    <td>{d.Name }</td>

                                                                    <td>{d.members[0].Email}</td>
                                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                    <td>{d.createdBy.charges.review.type}</td>
                                                                    <td>{d.createdBy.Status}</td>


                                                                </tr>
                                                            )



                                                    })}


                                                    </tbody>
                                                </table>


                                            </div>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="6">

                                            <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink  style={{color:"blue"}}
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"Black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>


                                            <div className="panel-body">

                                                <table id="demo-foo-filtering"
                                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                    <thead>
                                                    <tr>
                                                        <th>Type of candidature</th>
                                                        <th >Project Name </th>
                                                        <th >Lead </th>

                                                        <th >Soumission Date </th>
                                                        <th> Review Charge </th>

                                                        <th>Status</th>
                                                        <th> Action </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Sessions.map(d=> {
                                                        if (d.createdBy.charges.review.type==="negatif" && d.createdBy.Status==="non Traité")
                                                            return (

                                                                <tr key={d._id}>
                                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                                    <td>{d.Name }</td>

                                                                    <td>{d.members[0].Email}</td>
                                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                    <td>{d.createdBy.charges.review.type}</td>
                                                                    <td>{d.createdBy.Status}</td>
                                                                    <center>
                                                                        <button className="btn btn-info btn-lg" type="submit"><Link
                                                                            to={"/SecondTour/" + this.state.SessionId + "/Details/" + d._id}
                                                                            params={{
                                                                                id1: d._id,
                                                                                id2: '5ca6d387cf19b7956820d8f4'
                                                                            }}>Juger</Link></button>
                                                                    </center>


                                                                </tr>
                                                            )



                                                    })}


                                                    </tbody>
                                                </table>


                                            </div>
                                        </TabPane>
                                    </TabContent>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="5">
                                            <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>



                                            <div className="panel-body">

                                                <table id="demo-foo-filtering"
                                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                    <thead>
                                                    <tr>
                                                        <th>Type of candidature</th>
                                                        <th >Project Name </th>
                                                        <th >Lead </th>

                                                        <th >Soumission Date </th>
                                                        <th> Review Charge </th>

                                                        <th>Status</th>
                                                        <th> Action </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.Sessions.map(function(d, idx){
                                                        if (d.createdBy.charges.review.type==="neutre" && d.createdBy.Status==="non Traité")
                                                            return (

                                                                <tr key={d._id}>
                                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                                    <td>{d.Name }</td>

                                                                    <td>{d.members[0].Email}</td>
                                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                    <td>{d.createdBy.charges.review.type}</td>
                                                                    <td>{d.createdBy.Status}</td>
                                                                    <center>
                                                                        <button className="btn btn-info btn-lg" type="submit"><Link
                                                                            to={"/SecondTour/" + this.state.SessionId + "/Details/" + d._id}
                                                                            params={{
                                                                                id1: d._id,
                                                                                id2: '5ca6d387cf19b7956820d8f4'
                                                                            }}>Juger</Link></button>
                                                                    </center>


                                                                </tr>
                                                            )



                                                    }.bind(this))}


                                                    </tbody>
                                                </table>


                                            </div>
                                        </TabPane>

                                    </TabContent>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="4">
                                            <center>

                                                <Nav tabs>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '1' })}
                                                            onClick={() => { this.toggle('3'); }}
                                                        >
                                                            Tous
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('4'); }}
                                                        >
                                                            Avis positif
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('5'); }}
                                                        >
                                                            Avis neutre
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink  style={{color:"black"}}
                                                            className={classnames({ active: this.state.activeTab === '2' })}
                                                            onClick={() => { this.toggle('6'); }}
                                                        >
                                                            Avis négatif
                                                        </NavLink>
                                                    </NavItem>
                                                </Nav></center>




                                            <div className="panel-body">

                                                <table id="demo-foo-filtering"
                                                       className="table table-bordered table-hover toggle-circle" data-page-size="7">

                                                    <thead>
                                                    <tr>
                                                        <th>Type of candidature</th>
                                                        <th >Project Name </th>
                                                        <th >Lead </th>

                                                        <th >Soumission Date </th>
                                                        <th> Review Charge </th>

                                                        <th>Status</th>
                                                        <th> Action </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {Sessions.map(d=> {
                                                        if (d.createdBy.charges.review.type==="positif" && d.createdBy.Status==="non Traité")
                                                            return (

                                                                <tr key={d._id}>
                                                                    <td>{d.createdBy.TypeLabel.type}</td>
                                                                    <td>{d.Name }</td>

                                                                    <td>{d.members[0].Email}</td>
                                                                    <td>{d.createdBy.TypeLabel.SoumissionDate}</td>
                                                                    <td>{d.createdBy.charges.review.type}</td>
                                                                    <td>{d.createdBy.Status}</td>
                                                                    <center>
                                                                        <button className="btn btn-info btn-lg" type="submit"><Link
                                                                            to={"/SecondTour/" + this.state.SessionId + "/Details/" + d._id}
                                                                            params={{
                                                                                id1: d._id,
                                                                                id2: '5ca6d387cf19b7956820d8f4'
                                                                            }}>Juger</Link></button>
                                                                    </center>


                                                                </tr>
                                                            )



                                                    })}


                                                    </tbody>
                                                </table>


                                            </div>
                                        </TabPane>
                                    </TabContent>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <nav id="mainnav-container">

            <div className="navbar-header">
                <a href="index.html" className="navbar-brand">
                    <i className="fa fa-forumbee brand-icon" />
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

                                <li> <a href="index.html"> <i className="fa fa-home" /> <span className="menu-title"> Dashboard </span> </a> </li>

                                <li className="list-header">Components</li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-th" />
                                        <span className="menu-title">
                          Layouts
                        </span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="layout-blank.html"><i className="fa fa-caret-right" /> Blank Page </a></li>
                                        <li><a href="layout-boxed.html"><i className="fa fa-caret-right" /> Boxed Version </a></li>
                                        <li><a href="layout-collapsed-sidebar.html"><i className="fa fa-caret-right" /> Collapsed Sidebar </a></li>
                                        <li><a href="layout-push-menu.html"><i className="fa fa-caret-right" /> Push Menu </a></li>
                                        <li><a href="layout-slide-menu.html"><i className="fa fa-caret-right" /> Slide Menu </a></li>
                                        <li><a href="layout-horizontal-menu.html"><i className="fa fa-caret-right" /> Horizontal Menu </a></li>
                                        <li><a href="layout-horizontal-menu-boxed.html"><i className="fa fa-caret-right" /> Boxed Horizontal </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-briefcase" />
                                        <span className="menu-title">UI Elements</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="ui-animation.html"><i className="fa fa-caret-right" /> CSS3 Animation </a></li>
                                        <li><a href="ui-panel.html"><i className="fa fa-caret-right" /> Panel </a></li>
                                        <li><a href="ui-xeditable.html"><i className="fa fa-caret-right" /> Xeditable </a></li>
                                        <li><a href="ui-button.html"><i className="fa fa-caret-right" /> Buttons </a></li>
                                        <li><a href="ui-fontawesome.html"><i className="fa fa-caret-right" /> Fontawesome </a></li>
                                        <li><a href="ui-icons.html"><i className="fa fa-caret-right" /> Icons </a></li>
                                        <li><a href="ui-components.html"><i className="fa fa-caret-right" /> Components </a></li>
                                        <li><a href="ui-timeline.html"><i className="fa fa-caret-right" /> Timeline </a></li>
                                        <li><a href="ui-nested-lists.html"><i className="fa fa-caret-right" /> Nested Lists </a></li>
                                        <li><a href="ui-grids.html"><i className="fa fa-caret-right" /> Grids </a></li>
                                        <li><a href="ui-tab.html"><i className="fa fa-caret-right" /> Tab </a></li>
                                        <li><a href="ui-accordions.html"><i className="fa fa-caret-right" /> Accordions </a></li>
                                        <li><a href="ui-dragdrop.html"><i className="fa fa-caret-right" /> Draggable Panel</a></li>
                                        <li><a href="ui-typography.html"><i className="fa fa-caret-right" /> Typography </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-file" />
                                        <span className="menu-title">Pages</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="pages-faq.html"><i className="fa fa-caret-right" /> FAQ </a></li>
                                        <li><a href="pages-gallery.html"><i className="fa fa-caret-right" /> Gallery </a></li>
                                        <li><a href="pages-directory.html"><i className="fa fa-caret-right" /> Directory </a></li>
                                        <li><a href="pages-profile.html"><i className="fa fa-caret-right" /> User Profile </a></li>
                                        <li><a href="pages-invoice.html"><i className="fa fa-caret-right" /> Invoice </a></li>
                                        <li><a href="pages-login.html"><i className="fa fa-caret-right" /> Login </a></li>
                                        <li><a href="pages-register.html"><i className="fa fa-caret-right" /> Register </a></li>
                                        <li><a href="pages-password-reminder.html"><i className="fa fa-caret-right" /> Password Reminder </a></li>
                                        <li><a href="pages-lock-screen.html"><i className="fa fa-caret-right" /> Lock Screen </a></li>
                                        <li><a href="pages-404.html"><i className="fa fa-caret-right" /> 404 Error </a></li>
                                        <li><a href="pages-500.html"><i className="fa fa-caret-right" /> 500 Error </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-table" />
                                        <span className="menu-title">Tables</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="table-static.html"><i className="fa fa-caret-right" /> Static Table <span className="label label-info pull-right">New</span></a></li>
                                        <li><a href="table-datatable.html"><i className="fa fa-caret-right" /> Datatable Table </a></li>
                                        <li><a href="table-footable.html"><i className="fa fa-caret-right" /> Footable Table </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-edit" />
                                        <span className="menu-title">Forms</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="forms-layout.html"><i className="fa fa-caret-right" /> Form Layout </a></li>
                                        <li><a href="forms-switchery.html"><i className="fa fa-caret-right" /> Form Switchery </a></li>
                                        <li><a href="forms-components.html"><i className="fa fa-caret-right" /> Form Components </a></li>
                                        <li><a href="forms-validation.html"><i className="fa fa-caret-right" /> Form Validation </a></li>
                                        <li><a href="forms-wizard.html"><i className="fa fa-caret-right" /> Form Wizard </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-line-chart" />
                                        <span className="menu-title">Charts</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="charts-flot.html"><i className="fa fa-caret-right" /> Flot Chart </a></li>
                                        <li><a href="charts-morris.html"><i className="fa fa-caret-right" /> Morris Chart </a></li>
                                    </ul>
                                </li>
                                <li className="list-divider" />

                                <li className="list-header">Extra</li>

                                <li>
                                    <a href="calendar.html">
                                        <i className="fa fa-calendar" />
                                        <span className="menu-title">
                          Calendar
                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="ui-widgets.html">
                                        <i className="fa fa-flask" />
                                        <span className="menu-title">
                          Widgets
                          <span className="label label-pink pull-right">New</span>
                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-envelope-o" />
                                        <span className="menu-title">Mail</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="mail-inbox.html"><i className="fa fa-caret-right" /> Inbox </a></li>
                                        <li><a href="mail-compose.html"><i className="fa fa-caret-right" /> Compose </a></li>
                                        <li><a href="mail-mailview.html"><i className="fa fa-caret-right" /> Mail View </a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="fa fa-map-marker" />
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
                                        <i className="fa fa-plus-square" />
                                        <span className="menu-title">Menu Level</span>
                                        <i className="arrow" />
                                    </a>

                                    <ul className="collapse">
                                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                                        <li><a href="#"><i className="fa fa-caret-right" /> Second Level Item</a></li>
                                        <li className="list-divider" />
                                        <li>
                                            <a href="#">Third Level<i className="arrow" /></a>

                                            <ul className="collapse">
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#">Third Level<i className="arrow" /></a>

                                            <ul className="collapse">
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li className="list-divider" />
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                                <li><a href="#"><i className="fa fa-caret-right" /> Third Level Item</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <div className="mainnav-widget">

                                <div className="show-small">
                                    <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                                        <i className="fa fa-desktop" />
                                    </a>
                                </div>

                                <div id="demo-wg-server" className="hide-small mainnav-widget-content">
                                    <ul className="list-group">
                                        <li className="list-header pad-no pad-ver">Server Status</li>
                                        <li className="mar-btm">
                                            <span className="label label-primary pull-right">15%</span>
                                            <p>CPU Usage</p>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar progress-bar-primary" style={{width: '15%'}}>
                                                    <span className="sr-only">15%</span>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mar-btm">
                                            <span className="label label-purple pull-right">75%</span>
                                            <p>Bandwidth</p>
                                            <div className="progress progress-sm">
                                                <div className="progress-bar progress-bar-purple" style={{width: '75%'}}>
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
    <Nav1/>

        </div>

    </div>


        )
    }
}
