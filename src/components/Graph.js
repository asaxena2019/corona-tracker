import React from 'react'
import './Graph.css'
import {Line} from 'react-chartjs-2';

class Graph extends React.Component {
    constructor(props) {
        super()
        let data = props.data,
        labelsCases = [],
        dataPointsCases = [],
        labelsDeaths = [],
        dataPointsDeaths = [],
        t = []
        for (let i = 0; i < data.length; i++) {
            labelsCases.push(`${data[data.length - 1 - i].date.month}/${data[data.length - 1 - i].date.day}`)
            dataPointsCases.push(data[data.length - 1 - i].total)
            labelsDeaths.push(`${data[data.length - 1 - i].date.month}/${data[data.length - 1 - i].date.day}`)
            dataPointsDeaths.push(data[data.length - 1 - i].death)
            t.push(data[i].total)
        }
        let message
        let threshSimilarQuotient = 0
        let threshProportionSimilarQuotient = 0.45
        let totalSimilarQuotient = 0
        let numSteps = 20
        let prevQuotient = t[0] / t[1]
        for (let i = 1; i < numSteps; i++) {
            let newQuotient = t[i] / t[i+1]
            if (prevQuotient > (newQuotient + threshSimilarQuotient)) totalSimilarQuotient++
            prevQuotient = (t[i] / t[i+1])
        }
        if (totalSimilarQuotient / numSteps > threshProportionSimilarQuotient) {
            message = 'STAY INSIDE - PROTECT YOUR FAMILY AND COMMUNITY. CASES ARE GROWING EXPONENTIALLY.'
        } else {
            message = 'CASES ARE NOT GROWING EXPONENTIALLY. IT MAY BE SAFE TO GO OUTSIDE FOR NECESSARY ACTIVITIES.'
        }
        this.state = {
            message: message,
            graphData: {
                labels: labelsCases,
                datasets: [
                    {
                        label: 'Cases over time',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0, 0, 0, 1)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dataPointsCases
                    },
                    {
                        label: 'Deaths over time',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'red',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderColor: 'dark-red',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dataPointsDeaths
                    }
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [{
                            display: true,
                            gridLines: {
                                display: false ,
                                color: "#ff0000"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            display: true,
                            gridLines: {
                                color: "#FFFFFF"
                            }
                        }]
                    }
                }
            }
        }
    }

    render() {
        return (
            <div class={{
                height: '50%',
                textAlign: 'center',
                width: '50%'
            }}>
                <p>{this.state.message}</p>
                <div class="Graph"><Line data={this.state.graphData} /></div>
            </div>
        )
    }
}

export default Graph