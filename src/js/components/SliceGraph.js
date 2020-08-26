import React from 'react';
import * as d3 from "d3";

const SliceGraph = props => {
  let { pie, radius, innerRadius, margin } = props;
  let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(radius - margin);

  const colors = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c'
  ];
  let colorMap = new Map();

  pie.forEach((slice, index) => {
    colorMap.set(slice.data.key, colors[index]);
  });

  return (
    pie.filter((slice) => {
      return slice.value;
    })
    .map((slice, index) => {
      return <path d={arc(slice)} fill={colorMap.get(slice.data.key)} key={index} />
    })
  );
}

export default SliceGraph;