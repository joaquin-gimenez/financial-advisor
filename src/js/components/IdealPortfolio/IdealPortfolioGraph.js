import React from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import IdealPortfolioGraphSlice from './IdealPortfolioGraphSlice';
import IdealPortfolioGraphSliceText  from './IdealPortfolioGraphSliceText';

function IdealPortfolioGraph(props) {
  const height = 500;
  const width = 500;
  const margin = 50;
  const innerRadius = 100;

  const data = props.activeRiskLevel;
  let pie = d3.pie()
    .value(function(d) { return d.value });
  let data_ready = pie(d3.entries(data));

  return (
    <svg height={height} width={width}>
      <g transform={`translate(${width / 2},${height / 2})`}>
        <IdealPortfolioGraphSlice 
          pie={data_ready} 
          innerRadius={innerRadius} 
          margin={margin} 
          radius={width / 2} />
        <IdealPortfolioGraphSliceText 
          pie={data_ready} 
          innerRadius={innerRadius} 
          margin={margin} 
          radius={width / 2} />
      </g>
    </svg>
  );
}

const mapStateToProps = state => ({
  activeRiskLevel: state.riskLevels.riskLevels[ state.riskLevels.activeRiskLevel - 1]
})

export default connect(mapStateToProps)(IdealPortfolioGraph);