import React, { Component } from 'react';
import Moment from 'moment';
import axios from 'axios'
import {Link} from "react-router-dom";
import Header from "../../../containers/Header";
import ContentContainer from "../../../containers/ContentContainer";
import Nav1 from "../../../containers/Nav1";
import {Button, Fade} from "reactstrap"
import Input from "reactstrap/es/Input";
export default class DetailsProjetParIdSesIdProjet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active:false,
            detailsprojets: [],
            charges:[],
            NomSession:'',
            DateSession:'',
            NomProjet:'',
            idSessionBack:'',
            check1:true,
            check2:false,

            checked: false, checked2: false,
            dossierValide:null,
            dossierInvalide: false,
            Avis:'',
            refus:'',
            idProjet:'',
            idCharge:'',
            valuevalide:'',
            valueInvalide:'',
            commentaire:'',
            refus1:'',refus2:'',
            buttonValue: 0,
            idCand:'',
            status:''


        };

    }



    handleCommentaireChange=(e)=>{
        this.setState({commentaire :e.target.value})
    }

    toggleDossier = (e)=>{
        const checked = e.currentTarget.checked
        const name = e.currentTarget.name
        const newVal = name==="valide" && checked ? true : name ==='invalide' && checked ? false : null
        this.setState( prevState=>({
            dossierValide : newVal
        }))
    }


    handleAvis=(e)=>{
            this.setState( { Avis:e.target.value});

        }
    handleRefus1=({target})=>{
        this.setState(prevState=>({refus1:prevState.refus1 ? null : target.value}))
    }
    handleRefus2=({target})=>{
        this.setState(prevState=>({refus2:prevState.refus2 ? null : target.value}))
    }

    handleChangeModel(event) {
        this.setState({buttonValue: event.target.value});
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
                    idSessionBack: response.data.idSessionBack,
                    idCand:response.data.createdBy
                    });
                console.log(response.data.data.questionnaire);
                console.log(response.data.NomSession);
                console.log(response.data.idSessionBack)

            })
            .catch(function (error) {
                console.log(error);
            })


    }

    updateAvisChargeEninstance=(e)=>{
       // e.preventDefault();
        var idP=this.state.idProjet;
        var idC=this.state.idCharge;
        console.log("id projet ");
        console.log(idP);
        console.log("id charge");
        console.log(idC);

        console.log(this.state.commentaire);
        console.log(this.state.dossierValide);
        console.log(this.state.Avis);
        if (this.state.dossierValide) {
            console.log("dossier valide");
            const charge = {
                text: this.state.commentaire,
                estValide: this.state.dossierValide,
                cause: ''

            }
            axios.put('http://localhost:6003/reviewC/updateAvisCharge/' + idP + '/' + idC, charge
            ).then(res => {
                console.log(res)
                console.log(res.data)
            })
            const instance='_en_instance';
            const candidature = {
                Status: this.state.Avis+instance
            }
            axios.put('http://localhost:6003/reviewC/updateCandidature/' + idP, candidature
            ).then(res => {
                console.log(res);
                console.log(res.data)
            })
        }
        else {
            const refus = this.state.refus1 + '' + this.state.refus2;
            console.log("commentaire");
            console.log(this.state.commentaire);
            const charge = {
                text: this.state.commentaire,
                estValide: this.state.dossierValide,
                cause: refus
            };
            axios.put('http://localhost:6003/reviewC/updateAvisCharge/' + idP + '/' + idC, charge
            ).then(res => {
                console.log(res);
                console.log(res.data)
            });

            const instance='_en_instance';
            const candidature = {
                Status: this.state.Avis+instance
            };
            axios.put('http://localhost:6003/reviewC/updateCandidature/' + this.state.idProjet, candidature
            ).then(res => {
                console.log(res);
                console.log(res.data)
            })
        }


}

    updateAvisCharge=(e)=>{
        e.preventDefault();
        var idP=this.state.idProjet;
        var idC=this.state.idCharge;
        console.log("id projet ");
        console.log(idP);
        console.log("id charge");
        console.log(idC);

            console.log(this.state.commentaire);
            console.log(this.state.dossierValide);
            console.log(this.state.Avis);
            if (this.state.dossierValide) {
                console.log("dossier valide");
                const charge = {
                    text: this.state.commentaire,
                    estValide: this.state.dossierValide,
                    cause: ''

                }
                axios.put('http://localhost:6003/reviewC/updateAvisCharge/' + idP + '/' + idC, charge
                ).then(res => {
                    console.log(res)
                    console.log(res.data)
                })

                const candidature = {
                    Status: this.state.Avis
                }
                axios.put('http://localhost:6003/reviewC/updateCandidature/' + idP, candidature
                ).then(res => {
                    console.log(res);
                    console.log(res.data)
                })
            }
            else {
                const refus = this.state.refus1 + '' + this.state.refus2;
                console.log("commentaire");
                console.log(this.state.commentaire);
                const charge = {
                    text: this.state.commentaire,
                    estValide: this.state.dossierValide,
                    cause: refus
                };
                axios.put('http://localhost:6003/reviewC/updateAvisCharge/' + idP + '/' + idC, charge
                ).then(res => {
                    console.log(res);
                    console.log(res.data)
                });


                const candidature = {
                    Status: this.state.Avis
                };
                axios.put('http://localhost:6003/reviewC/updateCandidature/' + this.state.idProjet, candidature
                ).then(res => {
                    console.log(res);
                    console.log(res.data)
                })
            }

    }


    submitForm=(e)=>{
        e.preventDefault();
        console("formulaire");
    }
    test = (e) => {

        this.setState(prevState=>({active:!prevState.active}));
        this.updateAvisChargeEninstance();

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

                        <div className="panel-heading" id={"div"}>
                            <Link to={"/sessions/listeProjetsparIdSes/"+ this.state.idSessionBack }params={{ idSessionP: this.state.idSessionBack}}>
                                <label>
                                    { this.state.NomSession}&nbsp;
                                    {Moment(this.state.DateSession).format('YYYY')}
                                </label>
                            </Link>&nbsp;
                            &#10132;
                            &nbsp;
                            <label>
                                {this.state.NomProjet}
                            </label>

                        </div>

                        <div className="panel-heading" id={"questionnaire"}>
                            {
                                this.state.detailsprojets.map(function(proj, idx){
                                return (
                                    <div key={idx} className="panel-heading">
                                        <label>{proj.text}</label>
                                        <p>{proj.responses[0].text}</p>
                                    </div>
                                )
                                }.bind(this))}
                        </div>

                <form className="form-group"  id={"formulaire"}
                      onSubmit={this.submitForm.bind(this)}>
                    <fieldset id="fieldsetD">

                        <legend>Avis chargé</legend>

                          <div className="panel-group" id="divValide">
                              <div className="form-group">
                                  <input id={"dossierValideLab"} type="checkbox" name="valide"
                                         checked={this.state.dossierValide===true}
                                         onChange={this.toggleDossier}/>
                                  <label htmlFor={'dossierValideLab'} id="labValide">Dossier Valide</label>
                              </div>

                              <div className="form-group" id="divValide">
                                  <input id={"dossierInValideLab"} type="checkbox" name="invalide"
                                         checked={this.state.dossierValide===false}
                                         onChange={this.toggleDossier}  />
                                  <label htmlFor={'dossierInValideLab'} id="labValide">Dossier Invalide</label>
                              </div>
                          </div>

                            {
                                this.state.dossierValide === true &&
                                <div className="form-group" id={"divAvis"}>
                                    <input type="radio" value="2eme_tour" id="avis"  onChange={this.handleAvis} name="avis"/>
                                    <label htmlFor={'avis'} id={"avis"}> Avis positif </label>
                                    &nbsp;

                                    &nbsp;
                                    <input type="radio" value="1er_tour" id="avis2"  name="avis" onChange={this.handleAvis} />
                                    <label htmlFor={'avis2'} id={"avis2"}> Avis neutre </label>
                                    &nbsp;

                                    &nbsp;
                                    <input type="radio" value="refusee_premier_tour" id="avis3"  name="avis" onChange={this.handleAvis} />
                                    <label htmlFor={'avis3'} id={"avis3"}> Avis negatif </label>
                                </div>
                            }
                            {
                                this.state.dossierValide === false &&
                                <div className="form-group">
                                    <div className="form-check">
                                        <label className="form-check-label">
                                            <Input type="checkbox"  value="Document manquant" id="cause1"
                                                   onChange={this.handleRefus1} className="form-check-input"/>
                                            <label htmlFor={'cause1'} id="labValide">  Document manquant </label>

                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label">
                                        <Input type="checkbox" value="Entreprise ayant plus que 8 ans" id="cause2"
                                               onChange={this.handleRefus2} className="form-check-input"    />
                                            <label htmlFor={'cause2'} id="labValide">  Entreprise ayant plus que 8 ans </label>
                                        </label>
                                    </div>

                                </div>
                            }
                            <textarea className="form-control" label="Commentaire"
                                  placeholder="Commentaire" rows="3" style={{width:600}}
                                  onChange={this.handleCommentaireChange}/>
                            <div className="panel-heading" id={"divbutton"}>
                                <Button color="primary" size="sm" type="submit"  disabled={this.state.active}
                                        onClick={this.test.bind(this)}
                                        className="btn btn-info " id="button1" name="Validation de l'avis"
                                        value="Submit">
                                    Passer en instance
                                </Button>
                                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                    This content will fade in and out as the button is pressed
                                </Fade>

                                &nbsp;

                                <Button color="primary" size="sm" type="submit"  disabled={!this.state.active}
                                        className="btn btn-info " id="button2" name="Validation de l'avis"
                                        onClick={this.updateAvisCharge.bind(this)}
                                 value="Submit">
                                    Validation de l'avis
                                </Button>
                                <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
                                    This content will fade in and out as the button is pressed
                                </Fade>
                            </div>

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


