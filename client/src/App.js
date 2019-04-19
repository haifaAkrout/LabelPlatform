 import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import sendEmail from "./components/Dashboard/Judges/sendEmail";
import AddCompte from "./components/Dashboard/Judges/AddCompte";
import EditJudge from "./components/Dashboard/Judges/EditJudge";
import JudgeList from "./components/Dashboard/Judges/DemandesJudges";
import login from "../src/components/login/login";
import register from "../src/components/login/register";
import listCandidatures from "./components/Dashboard/SecondTour/listCandidatures";
import Dashboard from "./components/Dashboard/Dashboard"

 import listeSessions from "./components/Dashboard/FirstTour/listSessions"

import Front from "./components/Front/Front";
import Questionnaire from "./components/Dashboard/Questionnaire/Questionnaire";
import Question from "./components/Dashboard/Questionnaire/Question"
import { Provider } from 'react-redux'
import store from './store';


import './App.css';

class App extends Component {
  render() {
    return ( <Provider store={store}>
          <Router>
            <React.Fragment>
                <Route path="/login" exact component={login} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/register" exact component={register} />
              <Route path="/Judges/sendEmail" exact component={sendEmail} />
                <Route path="/Judges/addCompte/" exact component={AddCompte} />
                <Route path="/Judges/demandes" exact component={JudgeList} />
                <Route  path="/Judges/editCompte/:id1" exact component={EditJudge} />
                <Route path="/SecondTour/:id1" exact component={listCandidatures} />
                <Route path="/Front" exact component={Front} />

                <Route path="/sessions/listeSessions" exact component={listeSessions}/>

                <Route path="/Questionnaire" exact component={Questionnaire} />
                <Route path="/Question" exact component={Question} />

            </React.Fragment>
          </Router>
        </Provider>
    );

  }
}




export default App;