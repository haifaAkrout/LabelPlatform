import React from 'react';
import axios from 'axios';
import {Button} from "reactstrap";
import { CSVLink } from "react-csv";

import {
    Col,
    Nav,
    NavItem,
    NavLink,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    TabContent,
    TabPane
} from 'reactstrap';
import "../../../App.css"
import { Table } from 'reactstrap';
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";
import Moment from 'moment';

import {Link} from "react-router-dom";
import classnames from 'classnames';

export  default  class Resultat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            resultats:[],
            charges:[],
            idCharge:'',
            NomSession:'',
            DateSession:'',
            membres:''
        };

        this.toggle = this.toggle.bind(this);
        this.handleChargeChange = this.handleChargeChange.bind(this)

    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    componentDidMount=event=> {
        // const {idSession} = this.props.match.params
        // console.log(idSession)
        axios.get(`http://localhost:6003/sessions/resultat/5cba2219bb0f481fe0e48b36`)
            .then(response => {
                this.setState({
                        resultats: response.data.Project,
                        membres: response.data.Project.members,
                        idCharge: response.data.Project,
                        NomSession: response.data.Name,
                        DateSession: response.data.EndDate
                    },
                    console.log(response.data.Project)
                );

            })
            .catch(function (error) {
                console.log(error);
            });



    }



    handleChargeChange (evt) {
        this.setState({ idCharge: evt.target.value });
    }

    sendMail (idCand) {
        axios.get(`http://localhost:6003/avis/sendEmailToMember/`+idCand)
            .then(response => {
                this.setState({
                        resultats: response.data.Project,
                        membres: response.data.Project.members,
                        idCharge: response.data.Project,
                        NomSession: response.data.Name,
                        DateSession: response.data.EndDate
                    },
                    console.log(response.data.Project)
                );

            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        return (

            <div id = "container" className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>

                        <div className="panel">
                            <div className="panel-body">
                                <div className="panel-heading" id={"divtitle"}>
                                    <label>
                                        {this.state.NomSession} &nbsp;
                                        <span>
                                            {Moment(this.state.DateSession).format('YYYY')}
                                        </span>
                                    </label>
                                </div>
                                <Nav tabs id={"nav"}>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Resultat à traiter
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Resultat en instance
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            Resultat envoyé
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                                <div className="panel-body">
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <Table striped id={"table"}>
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Candidature</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Resultat</th>
                                                            <th>Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.resultats.map(function(projet, idx) {
                                                            if(
                                                                projet.createdBy.Status === 'Pas_de_candidature'
                                                                || projet.createdBy.Status === 'Brouillon'
                                                                || projet.createdBy.Status === '1er_tour'|| projet.createdBy.Status =='refusee_premier_tour'
                                                            ) {
                                                                return (

                                                                    <tr key={idx}>
                                                                        <td>

                                                                            {projet.createdBy.TypeLabel.type}
                                                                        </td>

                                                                        <td>
                                                                            {projet.Name}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                projet.members.map(function (membre, m) {
                                                                                    if (membre.Role === 'lead')
                                                                                        return (

                                                                                            <span key={m}>
                                                                                    {membre.LastName} {membre.FirstName}
                                                                                                {membre.Email}
                                                                                </span>
                                                                                        )

                                                                                }.bind(this))}
                                                                        </td>

                                                                        <td>
                                                                            {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD/MM/YYYY')}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.charges.Email}
                                                                            <br/>
                                                                            {projet.createdBy.charges.LastName}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.Status}
                                                                        </td>
                                                                        <td>
                                                                            <Link
                                                                                to={"/Candidatures/detailsCandidature/"+projet.createdBy._id}
                                                                                params={{
                                                                                    idCand: projet.createdBy._id,
                                                                                    idCharge:projet.createdBy.charges._id
                                                                                }}>
                                                                                Rédiger retour
                                                                            </Link>

                                                                        </td>


                                                                    </tr>

                                                                )
                                                            }
                                                        }.bind(this))}


                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>

                                                <Col sm="12">
                                                    <Table striped id={"table"}>
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Candidature</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Resultat</th>
                                                            <th>Envoi du retour </th>
                                                        </tr>

                                                        </thead>
                                                        <tbody>
                                                        {this.state.resultats.map(function(projet, idx) {

                                                            if(projet.createdBy.Status === '1er_tour_en_instance'
                                                                || projet.createdBy.Status === '2eme_tour_en_instance')
                                                            {
                                                                return (

                                                                    <tr key={idx}>
                                                                        <td>

                                                                            {projet.createdBy.TypeLabel.type}
                                                                        </td>

                                                                        <td>
                                                                            {projet.Name}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                projet.members.map(function (membre, m) {
                                                                                    if (membre.Role === 'lead')
                                                                                        return (

                                                                                            <span key={m}>
                                                                                    {membre.LastName} {membre.FirstName}
                                                                                                {membre.Email}
                                                                                </span>


                                                                                        )

                                                                                }.bind(this))}
                                                                        </td>

                                                                        <td>
                                                                            {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD/MM/YYYY')}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.charges.FirstName} {projet.createdBy.charges.LastName}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.Status}
                                                                        </td>
                                                                        <td>
                                                                            {/*<Link*/}
                                                                            {/*    to={"/projects/detailsProjets/" + this.state.idSess + "/" + projet._id}*/}
                                                                            {/*    params={{*/}
                                                                            {/*        idSessionP: this.state.idSess,*/}
                                                                            {/*        idProjet: projet._id*/}
                                                                            {/*    }}>*/}
                                                                            {/*    Envoyer*/}
                                                                            {/*</Link>*/}
                                                                            <Button color="primary" id={"btn"} type="submit"
                                                                                    onClick={this.sendMail.bind(this, projet.createdBy._id)}>Enoyer retour</Button>

                                                                        </td>

                                                                    </tr>

                                                                )
                                                            }
                                                        }.bind(this))}


                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Row>

                                                {this.state.resultats.map(function(projet, idx) {
                                                    const csvData = [
                                                        [   projet.Name,
                                                            projet.createdBy.TypeLabel.type,
                                                            projet.createdBy.Status,
                                                        ]
                                                    ];
                                                    const headers = [
                                                        { label: "Project Name", key: "nomprojet" },
                                                        { label: "Activite", key: "activite" },
                                                        { label: "cause", key: "cause" }
                                                    ];
                                                    if(projet.length != 0){
                                                        if(projet.createdBy.Status === "1er_tour"
                                                            || projet.createdBy.Status === "2eme_tour"){
                                                            return(
                                                                <CSVLink key={idx} id="linkCSV"
                                                                         data={csvData}
                                                                         headers={headers}
                                                                         filename={"my-file.csv"}>
                                                                    Exporté tous les resultats vers excel
                                                                </CSVLink>
                                                            )
                                                        }
                                                    }
                                                })
                                                }
                                                <Col sm="12">
                                                    <Table striped id={"table"}>
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Candidature</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Resultat</th>
                                                            <th>Envoi du retour</th>
                                                        </tr>

                                                        </thead>
                                                        <tbody>
                                                        {this.state.resultats.map(function(projet, idx) {
                                                            if(projet.createdBy.Status === "1er_tour"
                                                                || projet.createdBy.Status === "2eme_tour")
                                                            {
                                                                return (

                                                                    <tr key={idx}>
                                                                        <td>

                                                                            {projet.createdBy.TypeLabel.type}
                                                                        </td>

                                                                        <td>
                                                                            {projet.Name}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                projet.members.map(function (membre, m) {
                                                                                    if (membre.Role === 'lead')
                                                                                        return (

                                                                                            <span key={m}>
                                                                                    {membre.LastName} {membre.FirstName}{membre.Email}
                                                                                </span>


                                                                                        )

                                                                                }.bind(this))}
                                                                        </td>

                                                                        <td>
                                                                            {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD/MM/YYYY')}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.charges.FirstName} {projet.createdBy.charges.LastName}
                                                                        </td>
                                                                        <td>
                                                                            {projet.createdBy.Status}
                                                                        </td>
                                                                        <td>
                                                                            <Link
                                                                                to={"/Candidatures/detailsCandidature/"+projet.createdBy._id}
                                                                                params={{
                                                                                    idCand:projet.createdBy._id
                                                                                }}
                                                                            >
                                                                                Equipe
                                                                            </Link>

                                                                        </td>



                                                                    </tr>

                                                                )
                                                            }
                                                        }.bind(this))}


                                                        </tbody>
                                                    </Table>
                                                </Col>
                                            </Row>
                                        </TabPane></TabContent>
                                </div>

                            </div>

                        </div>


                    </div>

                    <Nav1/>

                </div>

            </div>
        )
    }}