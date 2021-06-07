import React, { Component } from 'react'
import './App.css';
import Graph from './Graph';
// import SelectBar from './SelectBar'
// import amazonData from './skillsData/AmazonData'

class App extends Component 
{
    render() 
    {
        return(<Graph height={600} width = {1400}/>);
    }
}
export default App;


