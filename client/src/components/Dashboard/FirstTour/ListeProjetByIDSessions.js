import React, { Component } from 'react';
import Moment from 'moment';

import axios from 'axios'
import {Link} from "react-router-dom";
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";
import {connect} from "react-redux";
import { Table,TabContent, TabPane, NavItem, NavLink, Nav,Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {
    affecterCharge,

} from "../../../store/actions";

class ListeProjetByIDSessions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            projets: [],
            charges:[],
            NomSession:'',
            DateSession:'',
            idSess:'',
            idCharge:'',
            idProjet:'',
            chargeSelected:''
        };

        this.toggle = this.toggle.bind(this);


    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleChange= (e) => {
        this.setState({ chargeSelected : e.target.value });
    }
     componentDidMount() {
        const {idSession} = this.props.match.params
        console.log(idSession)
        axios.get(`http://localhost:6003/sessions/listeProjetsparIdSes/`+idSession)
            .then(response => {
                this.setState({
                    projets:response.data.Project,
                    idProjet : response.data.Project._id}
                    );
                console.log(response.data.Project)
                console.log(response.data.Name)
                console.log(response.data._id)
                this.setState({
                    NomSession:response.data.Name,
                    DateSession:response.data.StartDate,
                    idSess: response.data._id});
            })
            .catch(function (error) {
                console.log(error);
            })

          //afficher liste de chargees
          axios.get(`http://localhost:6003/sessions/charges/`)
              .then(response => {
                  this.setState({
                      charges: response.data,
                      idCharge:response.data._id
                  });
                  console.log(response.data)

              })
              .catch(function (error) {
                  console.log(error);
              })
    }




    handleClick = (idP,e) => {


        this.setState({ chargeSelected : e.target.value });
        console.log("id charge selected")
        console.log(e.target.value)
        axios.post('http://localhost:6003/projects/affectation/'+idP+'/'+e.target.value
        ).then(res=>{
            console.log(res);
            console.log(res.data);
            console.log("affecter charge")})
    }

    render() {
        return (
            <div  id = "container"
                className = "effect mainnav-sm navbar-fixed mainnav-fixed" >

                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>

                        <div className="panel">

                            <div className="panel-body">

                                <div className="panel-heading" id={"divtitle"}>
                                    <label id={"label1"}>
                                        {this.state.NomSession} &nbsp;
                                        <span>
                                                    {Moment(this.state.DateFinSession).format('YYYY')}
                                                </span>
                                    </label>


                                </div>
                                <Nav tabs id={"nav"}>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Candidature à traiter
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Avis en instance
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            Validation de l'avis
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <div className="panel-body">
                                    <TabContent activeTab={this.state.activeTab}  id={"table"}>
                                        <TabPane tabId="1">
                                            <Row>
                                                <Col sm="12">
                                                    <Table striped >
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Nom projet</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Action</th>
                                                        </tr>

                                                        </thead>
                                                        <tbody>
                                                        {this.state.projets.map(function(projet, idx){
                                                            if(
                                                                projet.createdBy.Status === 'Pas_de_candidature'
                                                                || projet.createdBy.Status === 'Brouillon'
                                                                || projet.createdBy.Status === '1er_tour'
                                                            ) {
                                                            if(projet.length == 0)
                                                            {
                                                                return (<h1>Cette session n'a aucun projet</h1>)
                                                            }else
                                                            if(projet.members.length == 0)
                                                            {
                                                                return (<h1>Ce n'a aucun membre</h1>)
                                                            }else
                                                                if (projet.members[0].Role === 'lead')
                                                                    return (

                                                                        <tr key={idx}>

                                                                            <td>
                                                                                {projet.createdBy.TypeLabel.type}
                                                                            </td>
                                                                            <td>
                                                                                {projet.Name}
                                                                            </td>
                                                                            <td>
                                                                                {projet.members[0].FirsName}&nbsp;{projet.members[0].LastName}
                                                                            </td>
                                                                            <td>
                                                                                {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD-MM-YYYY')}
                                                                            </td>
                                                                            <td>
                                                                                <form
                                                                                    className="panel-body form-horizontal">


                                                                                    <select id="demo-foo-filter-status"
                                                                                            className="form-control"
                                                                                            onChange={this.handleClick.bind(this, projet._id)}>
                                                                                        <option>choisir charge</option>
                                                                                        {this.state.charges.map(function (charge, idc) {
                                                                                            return (

                                                                                                <option
                                                                                                    value={charge._id}
                                                                                                    key={idc}>
                                                                                                    {charge.FirstName}&nbsp;{charge.LastName}
                                                                                                </option>
                                                                                            )
                                                                                        }.bind(this))}

                                                                                    </select>

                                                                                </form>

                                                                            </td>

                                                                            <td>
                                                                                <Link
                                                                                    to={"/projects/detailsProjets/" + this.state.idSess + "/" + projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
                                                                                    }}>
                                                                                    Consulter
                                                                                </Link>
                                                                                &nbsp;
                                                                                &nbsp;
                                                                                <Link
                                                                                    to={"/projects/ListeMembres/"+this.state.idSess+"/"+projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
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
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <Row>
                                                <Col sm="12">
                                                    <Table striped >
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Nom projet</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Action</th>
                                                        </tr>

                                                        </thead>
                                                        <tbody>
                                                        {this.state.projets.map(function(projet, idx){
                                                            if(projet.createdBy.Status === '1er_tour_en_instance'
                                                                || projet.createdBy.Status === 'refusee_premier_tour'
                                                                || projet.createdBy.Status === '2eme_tour_en_instance')
                                                            {
                                                            if(projet.length == 0)
                                                            {
                                                                return (<h1>Cette session n'a aucun projet</h1>)
                                                            }else
                                                            if(projet.members.length == 0)
                                                            {
                                                                return (<h1>Ce n'a aucun membre</h1>)
                                                            }else
                                                                if (projet.members[0].Role === 'lead')
                                                                    return (

                                                                        <tr key={idx}>

                                                                            <td>
                                                                                {projet.createdBy.TypeLabel.type}
                                                                            </td>
                                                                            <td>
                                                                                {projet.Name}
                                                                            </td>
                                                                            <td>
                                                                                {projet.members[0].FirsName}&nbsp;{projet.members[0].LastName}
                                                                            </td>
                                                                            <td>
                                                                                {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD-MM-YYYY')}
                                                                            </td>
                                                                            <td>
                                                                                <form
                                                                                    className="panel-body form-horizontal">


                                                                                    <select id="demo-foo-filter-status"
                                                                                            className="form-control"
                                                                                            onChange={this.handleClick.bind(this, projet._id)}>
                                                                                        <option>choisir charge</option>
                                                                                        {this.state.charges.map(function (charge, idc) {
                                                                                            return (

                                                                                                <option
                                                                                                    value={charge._id}
                                                                                                    key={idc}>
                                                                                                    {charge.FirstName}&nbsp;{charge.LastName}
                                                                                                </option>
                                                                                            )
                                                                                        }.bind(this))}

                                                                                    </select>



                                                                                </form>

                                                                            </td>

                                                                            <td>
                                                                                <Link
                                                                                    to={"/projects/detailsProjets/" + this.state.idSess + "/" + projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
                                                                                    }}>
                                                                                    Consulter
                                                                                </Link>
                                                                                &nbsp;
                                                                                &nbsp;
                                                                                <Link
                                                                                    to={"/projects/ListeMembres/"+this.state.idSess+"/"+projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
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
                                        </TabPane>
                                        <TabPane tabId="3">
                                            <Row>
                                                <Col sm="12">
                                                    <Table striped >
                                                        <thead>
                                                        <tr>
                                                            <th>Type </th>
                                                            <th>Nom projet</th>
                                                            <th>Lead </th>
                                                            <th>Soumis le </th>
                                                            <th>Charge</th>
                                                            <th>Action</th>
                                                        </tr>

                                                        </thead>
                                                        <tbody>
                                                        {this.state.projets.map(function(projet, idx){
                                                            if(projet.createdBy.Status === "1er_tour"
                                                                || projet.createdBy.Status === "2eme_tour")
                                                            {
                                                            if(projet.length == 0)
                                                            {
                                                                return (<h1>Cette session n'a aucun projet</h1>)
                                                            }else
                                                            if(projet.members.length == 0)
                                                            {
                                                                return (<h1 key={idx}>Ce projet n'a aucun membre</h1>)
                                                            }else
                                                            if (projet.members[0].Role === 'lead')
                                                                    return (

                                                                        <tr key={idx}>

                                                                            <td>
                                                                                {projet.createdBy.TypeLabel.type}
                                                                            </td>
                                                                            <td>
                                                                                {projet.Name}
                                                                            </td>
                                                                            <td>
                                                                                {projet.members[0].FirsName}&nbsp;{projet.members[0].LastName}
                                                                            </td>
                                                                            <td>
                                                                                {Moment(projet.createdBy.TypeLabel.SoumissionDate).format('DD-MM-YYYY')}
                                                                            </td>
                                                                            <td>
                                                                                <form
                                                                                    className="panel-body form-horizontal">


                                                                                    <select id="demo-foo-filter-status"
                                                                                            className="form-control"
                                                                                            onChange={this.handleClick.bind(this, projet._id)}>
                                                                                        <option>choisir charge</option>
                                                                                        {this.state.charges.map(function (charge, idc) {
                                                                                            return (

                                                                                                <option
                                                                                                    value={charge._id}
                                                                                                    key={idc}>
                                                                                                    {charge.FirstName}&nbsp;{charge.LastName}
                                                                                                </option>
                                                                                            )
                                                                                        }.bind(this))}

                                                                                    </select>


                                                                                </form>

                                                                            </td>

                                                                            <td>
                                                                                <Link
                                                                                    to={"/projects/detailsProjets/" + this.state.idSess + "/" + projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
                                                                                    }}>
                                                                                    Consulter
                                                                                </Link>

                                                                                &nbsp;
                                                                                &nbsp;
                                                                                <Link
                                                                                    to={"/projects/ListeMembres/"+this.state.idSess+"/"+projet._id}
                                                                                    params={{
                                                                                        idSessionP: this.state.idSess,
                                                                                        idProjet: projet._id
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
                                        </TabPane>
                                    </TabContent>
                                </div>


                            </div>


                        </div>

                    </div>

                    <Nav1/>

                </div>

            </div>

        );
    }
}

const mapDispatchToProps = {
    affecterCharge
};
export default connect(
    null,
    mapDispatchToProps
)(ListeProjetByIDSessions);
