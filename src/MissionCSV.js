import React, { useEffect } from 'react'
import * as d3 from "d3";
import "d3-time-format";

const parseTime = d3.timeParse("%d-%b-%y");

const createGraph = async () => {
  const margin = { top: 20, right: 20, bottom: 50, left: 70 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const x = d3.scaleTime().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const valueLine = d3.line()
    .x((d) => { return x(d.date); })
    .y((d) => { return y(d.close); });

  const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  let data = await d3.csv(require("./data.csv"))

  data.forEach((d) => {
    d.date = parseTime(d.date);
    d.close = +d.close;
  });

  data = data.sort((a, b) => +a.date - +b.date)

  x.domain(d3.extent(data, (d) => { return d.date; }));
  y.domain([0, d3.max(data, (d) => { return d.close; })]);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", valueLine);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));
}

function MissionCSV() {
  useEffect(() => {
    createGraph();
  }, []);

  return (
    <div>
      <style>{
        `
          .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 2px;
          }
      `}
      </style>
    </div>
  );
}

export default MissionCSV






// import React, { useEffect } from "react";

// /**
// * changefill and change stroke with button onClick event
// * @returns 
// */

// import * as d3 from "d3";

// export default function App() {
  // }
  // const changeStroke = () => {
    //     d3.select(".target").style("stroke-width", 15);
    //   };
    // const changefill = () => {
      // d3.select(".target").style("fill","black");
      // }
      
      //   return (
        //     <div className="App">
        //       <button onClick={changeStroke}>change stroke</button>
        //       <button onClick={changefill}>change fill</button>
        //       <svg>
        //         <circle
        //           class="target"
        //           style={{ fill: "red" }}
        //           stroke="green"
        //           cx={70}
        //           cy={70}
        //           r={50}
        //         ></circle>
        //       </svg>
        //     </div>
        // function MissionCSV() {
        
        //         useEffect(() => {
        //           const svg = d3.select("#area");
        //           svg
        //             .append("circle")
        //             .attr("cx", 50)
        //             .attr("cy", 50)
        //             .attr("r", 40)
        //             .style("fill", "blue");
        //           svg
        //             .append("circle")
        //             .attr("cx", 140)
        //             .attr("cy", 70)
        //             .attr("r", 40)
        //             .style("fill", "red");
        //           svg
        //             .append("circle")
        //             .attr("cx", 300)
        //             .attr("cy", 100)
        //             .attr("r", 40)
        //             .style("fill", "green");
        //         }, []);
              
        //         return (
        //           <div className="App">
        //             <svg id="area" height={200} width={450}></svg>
        //           </div>
        //         );
        //       }
            
        
    //   );