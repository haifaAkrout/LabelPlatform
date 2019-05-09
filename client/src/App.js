 import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import sendEmail from "./components/Dashboard/Judges/sendEmail";
import addQuestion from "./components/Questions/addQuestion";
 import AddCompte from "./components/Dashboard/Judges/AddCompte";
import EditJudge from "./components/Dashboard/Judges/EditJudge";
import JudgeList from "./components/Dashboard/Judges/DemandesJudges";

 import addSession from "./components/Dashboard/Sessions/addSession";
 import showSessions from "./components/Dashboard/Sessions/showSessions";
 import showSessionsBack from "./components/Dashboard/Judges/showSessionsBack";
 import addCompte1 from "./components/Dashboard/Candidatures/addCompte";
 import Project from "./components/Dashboard/Candidatures/Project";
import login from "../src/components/login/login";
 import login2 from "../src/components/login/login2";
 import login3 from "../src/components/login/login3";
 import login4 from "../src/components/login/login4";

import register from "../src/components/login/register";
import NotFoundPage from "../src/components/NotFoundPage/NotFoundPage";
import home from "../src/components/Home/home";
import profile from "../src/components/profile/profile";
import updateprofile from "../src/components/profile/updateprofile";
import disableprofile from "../src/components/profile/disableprofile";
import logout from "../src/components/Home/logout";
import listCandidatures from "./components/Dashboard/SecondTour/listCandidatures";
 import DetailsCandidaturesAJuger from "./components/Dashboard/SecondTour/DetailsCandidatureAJuger";
 import VotesProjet from "./components/Dashboard/SecondTour/VotesProjet";
import Dashboard from "./components/Dashboard/Dashboard";
 import DashboardJudge from "./components/Dashboard/DashboardJudge";
 import DashboardCharges from "./components/Dashboard/DashboardCharge";
import { Redirect, Switch } from 'react-router-dom';
 import listeSessions from "./components/Dashboard/FirstTour/listSessions";
 import listeProjetsparIdSes from"./components/Dashboard/FirstTour/ListeProjetByIDSessions";
 import DetailsProjetParIdSesIdProjet from "./components/Dashboard/FirstTour/DetailsProjetParIdSesIdProjet";
 import ListEquipe from "./components/Dashboard/Members/ListeEquipe";
 import RedactionAvis from "./components/Dashboard/Resultat/RedactionAvis";
 import EditMember from "./components/Dashboard/Members/EditMember";
 import AddMember from "./components/Dashboard/Members/AddMember";
 import Resultat from "./components/Dashboard/Resultat/Resultat";
import Front from "./components/Front/Front";
 import front2 from "./components/Front/front2";
 import Chart from "./components/Dashboard/Resultat/Charts"
//import Questionnaire from "./components/Dashboard/Questionnaire/Questionnaire";
import Question from "./components/Front/Question"
import { Provider } from 'react-redux'
import store from './store';

 // <Redirect to="/error"/>
import './App.css';

var isAuthenticated = false;

 if(localStorage.user_id)
        isAuthenticated = true
      
const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)

class App extends Component {



  render() {

      return ( <Provider store={store}>
          <Router>
            <React.Fragment>
          <Switch>

              <Route path="/addQuestion" exact component={addQuestion} />
              <Route path="/addSession" exact component={addSession} />
              <Route path="/Candidatures" exact component={showSessions} />
              <Route path="/Sessions2" exact component={showSessionsBack} />
                <Route path="/" exact component={home} />
                <Route path="/SignInCa" exact component={login4} />
              <Route path="/login" exact component={login} />
              <Route path="/SignIn" exact component={login2} />
              <Route path="/SignInUse" exact component={login3} />
              <Route path="/registerCandidat" exact component={addCompte1} />
                {/*<PrivateRoute path="/Dashboard" exact component={Dashboard} />*/}
                <PrivateRoute path="/profile" exact component={profile} />
                <PrivateRoute path="/update/profile" exact component={updateprofile} />
                <PrivateRoute path="/disable/profile" exact component={disableprofile} />
              <Route path="/addProject/:id1" exact component={Project} />
                <Route path="/logout" exact component={logout} />
                <Route path="/register" exact component={register} />
              <Route path="/Judges/sendEmail" exact component={sendEmail} />
                <Route path="/Judges/addCompte/" exact component={AddCompte} />
                <Route path="/Judges/demandes" exact component={JudgeList} />
                <Route  path="/Judges/editCompte/:id1" exact component={EditJudge} />
                <Route path="/SecondTour/:id1" exact component={listCandidatures} />
                <Route path="/Front" exact component={Front} />
                <Route path="/Questionnaire" exact component={front2} />
                <Route path="/Dashboard" exact component={Dashboard}/>
              <Route path="/DashboardJudge" exact component={DashboardJudge}/>
              <Route path="/DashboardCharges" exact component={DashboardCharges}/>
                <Route path="/sessions/listeSessions" exact component={listeSessions}/>
                 {/*<PrivateRoute path='/protected' component={Dashboard} />*/}

                <Route path="/Question" exact component={Question} />
                <Route path="/SecondTour/:id2/Details/:id1" exact component={DetailsCandidaturesAJuger} />
                <Route path="/votes/:id2" exact component={VotesProjet } />
                <Route path="/error" exact component={NotFoundPage } />


              <Route path="/sessions/" exact component={listeSessions}/>
              <Route path="/chart/" exact component={Chart} />

              <Route path="/sessions/listeProjetsparIdSes/:idSession" exact component={listeProjetsparIdSes}/>
              <Route path="/projects/detailsProjets/:idSessionP/:idProjet" exact component={DetailsProjetParIdSesIdProjet}/>


              <Route path="/members/addMember/:idSession/:idProjet" exact component={AddMember} />
              <Route path="/projects/ListeMembres/:idSessionP/:idProjet" exact component={ListEquipe} />
              <Route path="/members/editMember/:idSession/:idProjet/:idMembre" exact component={EditMember} />
              <Route path="/resultat/" exact component={Resultat} />
              <Route path="/Candidatures/detailsCandidature/:idCand" exact component={RedactionAvis} />
       
               
            </Switch>
            </React.Fragment>
          </Router>
        </Provider>
    
);


  }
}




export default App;