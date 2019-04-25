import React from 'react';
import axios from "axios";


import {connect} from "react-redux";

const AVG = 1;
  class Front extends React.Component{




    constructor(props) {
        super(props);
        this.state = {
            answers: {},
            Questions: [],
            selectedOption: {},
            score: 0


        };

        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);

    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('You have selected:', Object.values(this.state.answers).filter(res => res == true).length);
        if(Object.values(this.state.answers).filter(res => res == true).length>AVG){
            console.log("you are eligible to the startup label")
            console.log("Hello"+this.state.Questions.length/2)
        }
    }

    componentDidMount() {
        axios.get('http://localhost:6003/Questionnaire').then(res => {

            console.log(res.data);
            this.setState({Questions: res.data})

        })
    }

    handleOptionChange(question,questionId, response) {
        this.setState(prevState => ({
            answers: {
                ...prevState.answers,
                [questionId]: response.type == "correcte"
            },
            selectedOption: {
                ...prevState.selectedOption,
                [questionId]: response._id
            },
        }));
        console.log(question,questionId,response)
    }

    render(){
        const {Questions} = this.state;
        return (
           <div>



               <header className="header_area" id="home">
                   <div className="header_top" id="sticker">
                       <div className="container">
                           <div className="row">
                               <div className="col-sm-3 col-xs-4">
                                   <a href="index-2.html" className="logo">Labelling Platform</a>
                               </div>
                               <div className="col-sm-9 menu_col col-xs-8">
                                   <nav className="menu-container">
                                       <ul className="menu" id="nav">
                                           <li className="current"><a href="#home">Home</a>
                                               <ul className="sub-menu">
                                                   <li><a href="index-2.html">Homepage One</a></li>
                                                   <li><a href="index-3.html">Homepage Two</a></li>
                                                   <li><a href="index-4.html">Homepage Three</a></li>
                                               </ul>
                                           </li>
                                           <li><a href="#about">About</a></li>
                                           <li><a href="#features">Apply</a></li>


                                           <li><a href="#contact">Contact</a></li>
                                           <li><a href="#services">Sign in </a></li>
                                       </ul>
                                   </nav>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="header-wrapper">
                       <div className="single-slide">
                           <div className="container">
                               <div className="row">
                                   <div className="col-md-5 col-sm-8">

                                   </div>

                               </div>
                           </div>
                       </div>
                       <div className="single-slide">
                           <div className="container">
                               <div className="row">
                                   <div className="col-md-5 col-sm-8">
                                       <div className="slide-content">
                                           <h1>Gone are the days when design was an after thought.</h1>
                                           <p>Consectetuer adipiscing elit sed diam nonummy nibh euismod tidunt laoreet
                                               dolore magna aliquam erat volutpat wisi enim ad minim.</p>
                                           <span>Watch this video<button className="js-modal-btn"
                                                                         data-video-id="202177974"><i
                                               className="fa fa-play-circle"></i></button></span>
                                       </div>
                                   </div>
                                   <div className="col-md-7">
                                       <div className="slide-images">

                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                   </div>

               </header>

               <form onSubmit={this.handleFormSubmit}>
                   {
                       Questions.map((question) => {
                           if(question.type==="QuestionJury")
                               return (
                                   <div>
                                       {question.text}
                                       {question.responses.map(response => (
                                           <div className="radio" key={response._id}>
                                               <label>
                                                   <input type="radio"
                                                          checked={this.state.selectedOption[question._id] === response._id}
                                                          onChange={() => this.handleOptionChange(question,question._id, response)}/>
                                                   {response.text}
                                               </label>
                                           </div>

                                       ))}

                                   </div>
                               )


                       })}


                   <button className="btn btn-default" type="submit">Save</button>
               </form>






           </div>
        )

    }}
const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(Front);
