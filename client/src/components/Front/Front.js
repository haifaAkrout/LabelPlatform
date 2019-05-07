import React from 'react';
import axios from "axios";


import {connect} from "react-redux";
import Header2 from "./front2";
import {Link} from "react-router-dom";

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



               <div>

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

                       <div className="single-slide">
                           <div className="container">
                               <div className="row">
                                   <div className="col-md-5 col-sm-8">

                                   </div>
                                   <div className="col-md-7">
                                       <div className="slide-images">
                                           <img src="/Front/assets/images/slide-01.png" alt=""/>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>


                   </div>




                   </div>








               </div>







        )

    }}
const mapDispatchToProps = {};

export default connect(
    null,
    mapDispatchToProps
)(Front);
