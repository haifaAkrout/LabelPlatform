import React from 'react';
import axios from 'axios';
import {Bar,Line,Pie,Doughnut} from "react-chartjs-2";
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
            StartDate:'',
            nomSession :'',
            Project:[],
            nomProjet:[]

        };


    }





    componentDidMount=event=> {
        // const {idSession} = this.props.match.params
        // console.log(idSession)
        var listeProjet=[];
        axios.get(`http://localhost:6003/sessions/charts/5cba2219bb0f481fe0e48b36`)
            .then(response => {
                const projets=response.data;
                let listePValide=[];
                let listePInvalide =[];
                listePValide.push(projets.valide);
                listePInvalide.push(projets.invalide);


                console.log("listePValide")
                console.log(listePValide)
                console.log("listePInvalide")
                console.log(listePInvalide)
                this.setState({
                    StartDate:response.data.data.StartDate,
                    nomSession:response.data.data.Name ,
                    chartData :{
                        labels:  listePValide+listePInvalide ,
                        datasets:[{
                            label:'Project',
                            data:[
                                'valide','invalide'
                            ],
                            backgroundColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                            ],
                            borderColor:'#777',
                            borderWidth: 1,
                            hoverBorderColor:'#000',
                            hoverBorderWidth:3

                        }
                        ]
                    }
                })

            });







    }

    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'right',
        labelsLegend: {
            fontColor:'#000'
        }
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
                                    <Doughnut
                                        data={this.state.chartData}
                                        options={{
                                            title:{
                                                display:this.props.displayTitle,
                                                text: this.state.nomSession +' '+ Moment(this.state.StartDate).format('YYYY'),
                                                fontSize:30
                                            },
                                            legend:{
                                                display:this.props.displayLegend,
                                                position:true,
                                                labels:this.props.labelsLegend
                                            },
                                            layout:{
                                                padding:{
                                                    left:50,
                                                    right:0,
                                                    bottom:0,
                                                    top:0
                                                }
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