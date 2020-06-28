import React from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './App.css'
import TopBar from './components/TopBar.js'
import Graph from './components/Graph.js'
import DataDisplay from './components/DataDisplay'


class App extends React.Component {
  // Get location?
  // let location = getLocation()
  constructor() {
    super()
    this.state = {
      data: null,
      stateName: null
    }
    this.setData = this.setData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setData(data) {
    console.log(data)
    this.setState({data: data})
  }

  async fetchDataForState( /** e.g. ca, tx, ny */ stateName) {
    let resp = await fetch('https://covidtracking.com/api/v1/states/' + stateName + '/daily.json')
    let data = await resp.json()
    for (let i = 0; i < data.length; i++) {
      let date = data[i].date.toString()
      // date = 20200627
      data[i].date = {
          year: date.substring(0, 4),
          month: date.substring(4, 6),
          day: date.substr(6, 8)
      }
    }
    this.setState({
      data: data,
      stateName: this.state.stateName
    }) // {[0: {stuff about day 0}, 1: {stuff about day 1}]}
  }


  handleSubmit(event) {
    this.setState({
      data: this.state.data,
      stateName: event.target.children[0].children[0].value
    })
    this.fetchDataForState(event.target.children[0].children[0].value)
    event.preventDefault();
  }

  render() {
    if (this.state.data == null) {
      return (
        <div className="App">
          <TopBar stateName=""/>
          <form onSubmit={this.handleSubmit}>
            <label>
              State:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    } else {
      return (
        <div className="App">
          <TopBar stateName={this.state.stateName.toUpperCase()}/>
          
          <DataDisplay data={this.state.data}/>
          <Graph data={this.state.data}/>
        </div>
      )
    }
  }
}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          State:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default App
