import React, { Component } from 'react';
import { Element } from 'react-faux-dom';
import * as d3 from 'd3';
import './App.css';

class Graph extends Component {
    constructor(props)
    {
        super(props)
        this.state = {height: this.props.height ,width: this.props.width ,
                    page : 1, step : 20,
                      data :[],masterData : [],
                      value: 'Apple'}
        this.handleChange = this.handleChange.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        var company = event.target.value
        var url = "http://192.168.0.5:5000/"+company
        fetch(url)
        .then((response) => response.json())
        .then( (result) => 
                {
                    var Data = JSON.parse(result.data.replace(/'/g, '"'))
                    var x = [...Data.slice(0,this.state.step)]
                    this.setState({value: company, masterData:Data, data : x })
                // console.log(typeof(JSON.parse(result.data.replace(/'/g, '"'))))
                })
    }

    handlePage(event)
    {
        // // console.log(typeof(parseInt(event.target.value)))
        // var x = [...this.state.masterData.slice(0,parseInt(event.target.value))]
        // this.setState({step : parseInt(event.target.value),page:1,data:x})
        var step
        if(event.target.value === '')
        {
            step = 20
        }
        else
        {
            step = parseInt(event.target.value)
        }
        this.setState({step : step })
    }

    handleSubmit=(event)=>
    {
        // alert('A name was submitted: ' + this.state.value);
        var x = [...this.state.masterData.slice(0,parseInt(this.state.step))]
        this.setState({page:1,data:x})
        event.preventDefault();
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
    }

    drawChart() {
        const width = this.state.width;
        const height = this.state.height;
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
                <center>
                <h1 style={{color: "blue"}}>Skill Frequency Distribution of {this.state.value}</h1>
                {/* <form>
                
                </form> */}
                <form onSubmit={this.handleSubmit}>
                <label>
                &nbsp; &nbsp; &nbsp;Select a company &nbsp;
                <select id="dropdown" value = {this.state.value} onChange={this.handleChange}>
                    <option value = "Apple" >Apple</option>
                    <option value = "AmeriSourceBergen" >AmeriSourceBergen</option>
                    <option value = "Berkshire Hathaway" >Berkshire Hathaway</option>
                    <option value = "AT&T" >AT&T</option>
                    <option value = "McKesson" >McKesson</option>
                    <option value = "Exxon Mobil" >Exxon Mobil</option>
                    <option value = "General Motors" >General Motors</option>
                    <option value = "UnitedHealth Group" >UnitedHealth Group</option>
                    <option value = "Walgreens" >Walgreens</option>
                    <option value = "Verizon" >Verizon</option>
                    <option value = "Amazon" >Amazon</option>
                    <option value = "Walmart" >Walmart</option>
                    <option value = "CVS Health" >CVS Health</option>
                </select>
                </label> 
                <label>
                &nbsp; &nbsp; &nbsp; Enter No. of records per page &nbsp;
                <input type="number" onChange ={this.handlePage} placeholder="enter a number" />
                </label>
                <input type="submit" value="Submit" />
                </form>
                
                {/* {this.getData('Amazon')} */}
                {this.drawChart()}
                <button className="previous" onClick={this.prev}>Previous</button>
                <button className="next" onClick={this.next}>Next</button>
                </center>    
            </div>
            );
    }
}
export default Graph;


