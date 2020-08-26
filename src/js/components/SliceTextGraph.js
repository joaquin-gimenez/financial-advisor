import React from 'react';
import * as d3 from "d3";
import { convertToDisplayName } from './Helpers/Helpers.js'

const SliceTextGraph = props => {
  let { pie, radius, innerRadius, margin } = props;
  let arc = d3.arc()
  .innerRadius(innerRadius)
  .outerRadius(radius - margin);

  return pie.filter((slice) => {
      return slice.value > 0;
    })
    .map((slice, index) => {
      return <text textAnchor="middle" transform={`translate(${arc.centroid(slice)})`} fill="#fff" fontWeight="bold" key={index} >
        {convertToDisplayName(slice.data.key)}  
      </text>
    })
}

export default SliceTextGraph;