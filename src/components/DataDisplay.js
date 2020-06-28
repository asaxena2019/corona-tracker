import React from 'react'
import rd3 from 'react-d3-library'

export default class DataDisplay extends React.Component {
    constructor(props) {
        super()
        this.state = {
            data: props.data
        }
    }

    render() {
        return (
            <div className="DataDisplay">
                <div className="DataDisplayCell">
                    <h2>New cases today: {`${this.state.data[0].positiveIncrease} (${this.state.data[0].date.month}/${this.state.data[0].date.day}/${this.state.data[0].date.year}`})</h2>
                    <h1>{this.state.data[0].positives}</h1>
                </div>
                <div className="DataDisplayCell">
                    <h2>New deaths today: {`${this.state.data[0].deathIncrease} (${this.state.data[0].date.month}/${this.state.data[0].date.day}/${this.state.data[0].date.year}`})</h2>
                    <h1>{this.state.data[0].positives}</h1>
                </div>
            </div>
        )
    }
}