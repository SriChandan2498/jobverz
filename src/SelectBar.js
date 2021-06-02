import React,{ Component } from 'react';
import Select from 'react-dropdown-select';
import walmartData from './skillsData/WalmartSkills'
import amazonData from './skillsData/AmazonData'
import indeedData from './skillsData/IndeedSkills'
import exxonData from './skillsData/ExxonSkills'
import mosnsterData from './skillsData/MonsterSkills'

class SelectBar extends Component
{
    options = [{value : {amazonData}, label: 'Amazon'},
               {value : {walmartData}, label: 'Walmart' },
               {value : {exxonData}, label : 'Exxon Mobil'},
               {value : {indeedData}, label: 'Indeed'},
               {value : {mosnsterData}, label: 'Monster'}]

    constructor(props)
    {
        super(props)
        this.state = {selectedOption: null}
    }
    
    handleChange = (selectedOption) => 
    {
        this.setState({ selectedOption : selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    
    render()
    {
        return(<Select onChange={this.handleChange} options={this.options} autoFocus={true}/>)
    }    
}
export default SelectBar;