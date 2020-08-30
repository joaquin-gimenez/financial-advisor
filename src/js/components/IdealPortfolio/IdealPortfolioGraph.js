import React from 'react';
import { connect } from 'react-redux';
import PieGraphHook from './PieGraphHook';

function IdealPortfolioGraph(props) {
  const height = 500;
  const width = 500;
  const margin = 50;
  const innerRadius = 100;
  const outerRadius = (width / 2) - margin;
  const colors = [
    '#1f77b4',
    '#aec7e8',
    '#ff7f0e',
    '#ffbb78',
    '#2ca02c'
  ];
  const defaultValues = [20, 20, 20, 20, 20];
  const defaultText = "Select Level";
  let shouldDisplayDefault = !props.activeRiskLevel;

  return (
    <PieGraphHook
      data={shouldDisplayDefault 
        ? defaultValues 
        : props.activeRiskLevel
      }
      width={width}
      height={height}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      colors={colors}
      shouldDisplayDefault={shouldDisplayDefault}
      defaultText={defaultText}
    />
  )
}

const mapStateToProps = state => ({
  activeRiskLevel: state.riskLevels.riskLevels[ state.riskLevels.activeRiskLevel - 1]
})

export default connect(mapStateToProps)(IdealPortfolioGraph);