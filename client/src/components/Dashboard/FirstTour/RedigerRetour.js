import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios'
import {Link} from "react-router-dom";
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";

export default class RedigerRetour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsprojets: [],
            charges:[],
            NomSession:'',
            DateSession:'',
            NomProjet:'',
            idSessionBack:'',

            Avis:'',
            refus:'',
            idProjet:'',
            idCharge:'',
            valuevalide:'',
            valueInvalide:'',
            commentaire:'',
            cause:'',



        };



        this.handleCauseChange = this.handleCauseChange.bind(this);
        this.handleCommentaireChange= this.handleCommentaireChange.bind(this);
    }



    handleCommentaireChange=(e)=>{
        this.setState({commentaire :e.target.value})
    }

    handleCommentaireChange=(e)=>{
        this.setState({commentaire :e.target.value})
    }


    componentDidMount() {
        const {idSessionP} = this.props.match.params
        const {idProjet} = this.props.match.params
        console.log("id session")
        console.log(idSessionP)
        console.log(idProjet)
        axios.get('http://localhost:6003/projects/detailsProjets/'+idSessionP+'/'+idProjet)
            .then(response => {

                this.setState({
                    detailsprojets:response.data.data.questionnaire,
                    idProjet:response.data.data._id,
                    NomSession:response.data.NomSession,
                    DateSession:response.data.StartDate,
                    NomProjet:response.data.data.Name,
                    idCharge:response.data.data.createdBy.charges,
                    idSessionBack: response.data.idSessionBack
                });
                console.log(response.data.data.questionnaire)
                console.log(response.data.NomSession)
                console.log(response.data.idSessionBack)

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    updateAvisCharge=()=>{

        console.log("id projet ")
        console.log(this.state.idProjet)
        console.log("id charge")
        console.log(this.state.idCharge)

        console.log(this.state.commentaire)
        console.log(this.state.dossierValide)
        console.log(this.state.Avis)
        if(this.state.dossierValide)
        {
            const charge={
                text: this.state.commentaire,
                estValide: this.state.dossierValide,
                cause: ''

            }
            axios.put('http://localhost:6003/reviewC/updateAvisCharge/'+this.state.idProjet+'/'+this.state.idCharge,charge
            ).then(res=>{console.log(res);
                console.log(res.data)})

            const candidature={
                Status:this.state.Avis
            }
            axios.put('http://localhost:6003/reviewC//updateCandidature/'+this.state.idProjet,candidature
            ).then(res=>{console.log(res);
                console.log(res.data)})
        }
        else
        {
            const refus = this.state.refus1+''+ this.state.refus2;
            const charge={
                text: this.state.commentaire,
                estValide: this.state.dossierValide,
                cause: refus

            }
            axios.put('http://localhost:6003/reviewC/updateAvisCharge/'+this.state.idProjet+'/'+this.state.idCharge,charge
            ).then(res=>{console.log(res);
                console.log(res.data)})

            const candidature={
                Status:this.state.Avis
            }
            axios.put('http://localhost:6003/reviewC//updateCandidature/'+this.state.idProjet,candidature
            ).then(res=>{console.log(res);
                console.log(res.data)})
        }


    }

    test = e => {
        document.getElementById("button1").setAttribute('disabled','true');
        document.getElementById("button2").removeAttribute('disabled');
    }

    test2 = e => {
        document.getElementById("button2").setAttribute('disabled','true');
        document.getElementById("button1").removeAttribute('disabled');
    }



    render()
    {
        return(


            <div id = "container" className = "effect mainnav-sm navbar-fixed mainnav-fixed" >
                <Header/>
                <div className="boxed">

                    <div id="content-container">
                        <ContentContainer/>

                        <div className="panel">

                            <div className="panel-body">
                                <label>
                                    <Link to={"/sessions/listeProjetsparIdSes/"+ this.state.idSessionBack }params={{ idSessionP: this.state.idSessionBack}}>
                                        { this.state.NomSession}&nbsp;
                                        {Moment(this.state.DateSession).format('YYYY')}
                                    </Link>&nbsp;
                                    &#10132;
                                    &nbsp;
                                    {this.state.NomProjet}
                                </label>

                                <div>
                                    {
                                        this.state.detailsprojets.map(function(proj, idx){
                                            return (

                                                <div key={idx}>
                                                    <h4>{proj.text}</h4>
                                                    <p>{proj.responses[0].text}</p>
                                                </div>

                                            )
                                        }.bind(this))}
                                </div>

                                <form className="form-group" onSubmit={this.updateAvisCharge}>
                                    <fieldset>

                                        <legend>Avis chargé</legend>
                                        {
                                            !this.state.dossierInvalide &&

                                            <div className="form-group">
                                                <input type="checkbox" name="check"
                                                    // checked={this.state.dossierValide}
                                                       onChange={this.dossierValide}/> Dossier Valide
                                                <label>{this.state.valueValide}</label>
                                            </div>
                                        }
                                        {
                                            !this.state.dossierValide &&
                                            <div className="form-group">
                                                <input type="checkbox" name="check" checked={this.state.dossierInvalide}
                                                       onChange={this.dossierInvalide}  /> Dossier Invalide
                                            </div>
                                        }
                                        {
                                            this.state.dossierValide &&
                                            <div className="form-group">
                                                <label> element check{this.state.Avis}</label>
                                                <input type="radio" value="2eme_tour" onChange={this.handleAvis} name="avis"/> Avis positif
                                                <input type="radio" value="refusée_premier_tour"  name="avis" onChange={this.handleAvis} /> Avis neutre
                                                <input type="radio" value="refusée_premier_tour"  name="avis" onChange={this.handleAvis} /> Avis negatif
                                            </div>
                                        }
                                        {
                                            this.state.dossierInvalide &&
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="checkbox"  value="Document manquant" onChange={this.handleRefus1} className="form-check-input"/>
                                                        Document manquant
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <label className="form-check-label">
                                                        <input type="checkbox" value="Entreprise ayant plus que 8 ans" onChange={this.handleRefus2} className="form-check-input"    />
                                                        Entreprise ayant plus que 8 ans
                                                    </label>
                                                </div>
                                                <label>{this.state.refus1}</label>
                                                <label>{this.state.refus2}</label>
                                            </div>
                                        }
                                        <textarea className="form-control" label="Commentaire"
                                                  placeholder="Commentaire" rows="3" style={{width:600}}
                                                  onChange={this.handleCommentaireChange}/>

                                        <button onClick={this.test.bind(this)} id="button1" type="submit"
                                                className="btn btn-info" name="Passer en instance" value="Submit">
                                            Passer en instance
                                        </button>

                                        &nbsp;

                                        <button  type="submit"  onClick={this.test2.bind(this)} disabled={true}
                                                 className="btn btn-info " id="button2" name="Validation de l'avis" value="Submit">
                                            Validation de l'avis
                                        </button>

                                    </fieldset>
                                </form>
                            </div>


                        </div>

                    </div>

                    <Nav1/>

                </div>

            </div>













        );
    }
}
