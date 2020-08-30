import React from 'react';
import IdealPortfolioTable from './IdealPortfolioTable';
import IdealPortfolioGraph from './IdealPortfolioGraph';
import IdealPortfolioButton from './IdealPortfolioButton';

class IdealPortfolioOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAsGraph: false
    }
    this.handleTableModeChange = this.handleTableModeChange.bind(this);
  }

  handleTableModeChange() {
    this.setState({ 
      displayAsGraph: !this.state.displayAsGraph 
    })
  }

  render() {
    return (
      <div className="ideal-overview grid-x">
        <div className="cell small-12 medium-10 text-center">
          {this.state.displayAsGraph
            ? <IdealPortfolioGraph />
            : <IdealPortfolioTable />
          }
        </div>
        <div className="cell small-12 medium-2 text-center">
          <IdealPortfolioButton 
            graphMode={this.state.displayAsGraph} 
            onClick={this.handleTableModeChange}/>
        </div>
      </div>
    );
  }
}

export default IdealPortfolioOverview;