import React, { useRef, useEffect} from 'react';
import * as d3 from "d3";
import { convertToDisplayName } from '../Helpers/Helpers.js'

const PieGraph = (props) => {
  const height = props.height;
  const width = props.width;
  const innerRadius = props.innerRadius;
  const outerRadius = props.outerRadius;
  const colors = props.colors;
  const defaultText = props.defaultText;
  let shouldDisplayDefault = props.shouldDisplayDefault;
  let data = props.data;
  
  let pie = d3.pie()
    .value(function(d) { return d.value });
  let filteredData = d3.entries(
      data
    ).filter(category => {
      return category.value;
    });
  let data_ready = pie(filteredData);
  
  
  const svgRef = useRef();
  let arcGenerator = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)

  useEffect(() => {
    d3.select(".circle-wrapper").remove();
    let svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
        .attr("class","circle-wrapper")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    
    let centeredText = svg.append("text")
        .attr("x", "0")
        .attr("y", "-1.2em")
        .style("text-anchor", "middle")
        .attr("fill", "#000")
    centeredText
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "1.2em")
        .html("INVESTMENT")
    centeredText
      .append("tspan")
        .attr("x", "0")
        .attr("dy", "1.2em")
        .html("PORTFOLIO")

    let g = svg.selectAll("circle")
      .data(data_ready)
      .enter()
      .append('g')
        .attr("class", "arc");
      
    g.append("path")
        .attr("d", arcGenerator)
        .attr("fill", function(d, i){
          return colors[i]
        });
    g
      .on('mouseenter', function(d) {
        d3.select(this).style("opacity", "0.85");
        if (!shouldDisplayDefault ) {
          d3.select(this).select('text')
            .text(function(d){
                return d.data.value + "%";
            })
        }
      })
      .on('mouseleave', function(d) {
        d3.select(this).style("opacity", "1");
        if (!shouldDisplayDefault ) {
          d3.select(this).select('text')
            .text(function(d){
                return convertToDisplayName(d.data.key);
            })
        }
      })
      .append("text")
        .attr("transform", function(d) {
            return "translate(" + arcGenerator.centroid(d) + ")";
        })
        .style("text-anchor", "middle")
        .attr("fill", "#fff")
        .text(function(d,i) { 
          return shouldDisplayDefault 
            ? defaultText 
            : convertToDisplayName(d.data.key); 
        });
        
  }, [props.data, svgRef])

  return (
    <>
      <svg ref={svgRef} ></svg>
    </>
  )
}

export default PieGraph;