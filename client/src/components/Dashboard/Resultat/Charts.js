import React from 'react';
import axios from 'axios';
import {Bar,Line,Pie} from "react-chartjs-2";
import "../../../App.css"
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
            chartData :{
                labels:['Boston','Worcester', 'Springfield','lowell','cambridge',
                    'new bedford'],
                datasets:[{
                        label:'Population',
                        data:[
                            12563,
                            14523,
                            12563,
                            12563,
                            125365,
                            145231
                            ]
                    }
                ]
            }
        };


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

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right'
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

                                    </label>
                                </div>


                                <div className="panel-body">
                                    <h1>chart</h1>
                                    <Pie
                                        data={this.state.chartData}
                                        options={{
                                            title:{
                                            display:this.props.displayTitle,
                                            text:'Liste des Projets valide',
                                            fontSize:25
                                        },
                                        legend:{
                                            display:this.props.displayLegend,
                                            position:this.props.displayPosition,
                                        }
                                        }}
                                    />
                                </div>

                                {/*<script>*/}
                                {/*    let myChart = document.getElementById('myChart').getContext('2d');*/}

                                {/*    //global options*/}
                                {/*    Chart.defaults.global.defaultFontFamily = 'lato';*/}
                                {/*    Chart.defaults.global.defaultFontSize = 18;*/}
                                {/*    Chart.defaults.global.defaultFontColor = '#777';*/}

                                {/*    let massPopChart = new Chart(myChart,{*/}
                                {/*    type :'bar',//barhorizontalBar,pie,doughnut,radar*/}
                                {/*    data:{*/}
                                {/*    lables:[*/}
                                {/*    'Boston',*/}
                                {/*    'Worcester',*/}
                                {/*    'Springfield',*/}
                                {/*    'lowell',*/}
                                {/*    'cambridge',*/}
                                {/*    'new bedford'*/}
                                {/*    ],*/}
                                {/*    datasets:[*/}
                                {/*    12563,*/}
                                {/*    14523,*/}
                                {/*    12563,*/}
                                {/*    12563,*/}
                                {/*    125365,*/}
                                {/*    145231*/}
                                {/*    ],*/}
                                {/*    backgroundColor:'green'*/}
                                {/*},*/}
                                {/*    options:{*/}
                                {/*    title:{*/}
                                {/*    display:true,*/}
                                {/*    text:'larget chart '*/}
                                {/*    fontSize:25*/}
                                {/*},*/}
                                {/*    legend:{*/}
                                {/*    display:false,*/}
                                {/*    position:'right',*/}
                                {/*    labels:{*/}
                                {/*    fontColor:'#000'*/}
                                {/*}*/}
                                {/*}*/}
                                {/*}*/}
                                {/*});*/}
                                {/*</script>*/}

                            </div>

                        </div>


                    </div>

                    <Nav1/>

                </div>

            </div>
        )
    }}