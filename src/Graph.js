import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import './App.css';
// import Select from 'react-dropdown-select';
import walmartData from './skillsData/WalmartSkills'
import amazonData from './skillsData/AmazonData'
import indeedData from './skillsData/IndeedSkills'
import exxonData from './skillsData/ExxonSkills'
import monsterData from './skillsData/MonsterSkills'

class Graph extends Component {
    constructor(props)
    {
        super(props)
        this.state = {page : 1, step : 20,
                      data : [...walmartData.slice(0,20)] ,masterData : walmartData,
                      value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handlePage = this.handlePage.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleChange = (selectedOption) => 
    // {
    //     console.log(typeof(selectedOption))
    //     var x = [...selectedOption.slice(0,this.state.step)]
    //     console.log(x)
    //     this.setState({ masterData : selectedOption['0']['value'], data : x })
    //     this.drawChart()
    // }

    handleChange(event) {
        // console.log("helo")
        var Data
        switch(event.target.value) {
            case "walmartData":
                Data = walmartData
                break;
            case "amazonData":
                Data = amazonData
                break;
            case "indeedData":
                Data = indeedData
                break;
            case "exxonData":
                Data = exxonData
                break;
            case "monsterData":
                Data = monsterData
                break;
            default:
                return
          }
        var x = [...Data.slice(0,this.state.step)]
        this.setState({value: event.target.value, masterData: Data, data : x});
        // console.log('-->',this.state.masterData,this.state.data)
    }

    // handleSubmit(event) 
    // {
    //     // alert('A name was submitted: ' + this.state.step);
    //     console.log(this.state.step)
    //     event.preventDefault();
    // }

    handlePage(event)
    {
        // console.log(typeof(parseInt(event.target.value)))
        this.setState({step : parseInt(event.target.value)})
    }

    prev = () =>
    {
        var page = this.state.page
        var step = this.state.step
        var x
        if(page === 1)
        {
            x = this.state.data
        }
        else if(page !== 1)
        {
            page = page - 1
            x = [...this.state.masterData.slice((page-1)*step,(page)*step)]
        }
        else if(page === this.state.masterData.length/step)
        {
            x = [...this.state.masterData.slice((page-1)*step)]
        }
        this.setState({ page:page , data : x });
    }
    
    next = () =>
    {
        // console.log(this.state.masterData)
        var page = this.state.page
        var step = this.state.step
        var x
        if(page < this.state.masterData.length/step)
        {
            page = page + 1
            x = [...this.state.masterData.slice((page-1)*step,(page)*step)]
        }
        else if(page === this.state.masterData.length/step)
        {
            x = [...this.state.masterData.slice((page-1)*step)]
        }
        this.setState({ page : page , data : x });   
    }
    
    plot(chart, width, height) {
        // create scales!
        var data  = this.state.data
        // console.log(data)
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.group))
            .range([0, width])
            .paddingInner(0.25);
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([height, 0]);
           
       // const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        chart.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .classed('bar', true)
            .attr('x', d => xScale(d.group))
            .attr('y', d => yScale(d.value))
            .attr('height', d => (height - yScale(d.value)))
            .attr('width', d => xScale.bandwidth())
            .style('fill', ('steelblue'));
            
            

        chart.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .classed('bar-label', true)
            .attr('x', d => xScale(d.group) + xScale.bandwidth()/2)
            .attr('dx', 0)
            .attr('y', d => yScale(d.value))
            .attr('dy', -8)
            .text(d => d.value);
           

        const xAxis = d3.axisBottom() 
            .scale(xScale);
            
        chart.append('g')
            .classed('x axis', true)
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll('text')
            .style('font-size', '15px')
            .style('text-anchor', 'end')
            .attr("dx","-.8em")
            .attr("dy","-.15em")
            .attr("transform","rotate(-40)");

        const yAxis = d3.axisLeft()
            .ticks(5)
            .scale(yScale);
        

        chart.append('g')
            .classed('y axis', true)
            //.attr('transform', 'translate(0,0)')
            .call(yAxis)
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
            .attr('fill', '#000')
            .style('font-size', '20px')
            .style('text-anchor', 'middle')
            .text('Frequency of skills');   

        // chart.select('.x.axis')
        //     .selectAll('text')
        //     .attr('x',  width/2)
        //     .attr('y', 60)
        //     .attr("dx","-.8em")
        //     .attr("dy","-.15em")
        //     .attr("transform","rotate(-90)")
        //     .attr('fill', '#000')
        //     .style('font-size', '20px')
        //     .style('text-anchor', 'end');
            
            //.text('AmazonSkills');    
            
        // chart.select('.y.axis')
        //     .append('text')
        //     .attr('x', 0)
        //     .attr('y', 0)
        //     .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
        //     .attr('fill', '#000')
        //     .style('font-size', '20px')
        //     .style('text-anchor', 'middle')
        //     .text('Frequency of skills');   
            
       
    }

    drawChart() {
        const width = 1400;
        const height = 600;
        // console.log('hi')
        const el = new Element('div');
        const svg = d3.select(el)
            .append('svg')
            .attr('id', 'chart')
            .attr('width', width)
            .attr('height', height);
            

        const margin = {
            top: 120,
            bottom: 50,
            left: 150,
            right: 10
        };

        const chart = svg.append('g')
            .classed('display', true)
            .attr('transform', `translate(${margin.left},${margin.top})`)
         

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom - 100
        this.plot(chart, chartWidth, chartHeight);

        return el.toReact();
    }

    render() {
        return(
            <div>
                <form>
                <label>
                Enter No. of records per page
                <input type="number" onChange ={this.handlePage} placeholder="enter a number" />
                </label>
                </form>
                <form > {/* onSubmit={this.handleSubmit} */}
                <label>
                Select a compamny
                <select value={this.state.value} onChange={this.handleChange}> 
                    <option value = "walmartData" >Walmart</option>
                    <option value="amazonData">Amazon</option>
                    <option value = "indeedData">Indeed</option>
                    <option value= "exxonData">ExxonMobil</option>
                    <option value= "monsterData">Monster</option>
                </select>
                </label>
                </form>
                {/* <input type="submit" value="Submit" /> */}
                {/* <form onSubmit={this.handleSubmit}>
                    <label> Enter No. of records per page
                    <input type="number" onChange ={this.handlePage} placeholder="enter a number"/>
                    <input type="submit" value="Submit" />
                    </label>
                </form> */}
                {/* <form>
                <label>
                Enter No. of records per page
                <input type="number" onChange ={this.handlePage} placeholder="enter a number" />
                </label>
                {/* <input type="submit" value="Submit" /> */}
                {/* </form> */} 
                {this.drawChart()}
                <button className="previous" onClick={this.prev}>Previous</button>
                <button className="next" onClick={this.next}>Next</button>    
            </div>
            );
    }
}
export default Graph;


