import React from 'react';
import IdealPortfolioTable from './IdealPortfolioTable';
import IdealPortfolioGraph from './IdealPortfolioGraph';
import IdealPortfolioButton from './IdealPortfolioButton';

class IdealPortfolioOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayAsGraph: true
    }
    this.handleTableModeChange = this.handleTableModeChange.bind(this);
  }

  handleTableModeChange() {
    this.setState({ displayAsGraph: !this.state.displayAsGraph })
  }

  render() {
    return (
      <div className="ideal-overview grid-x">
        <div className="columns small-12 medium-10">
          {this.state.displayAsGraph
            ? <IdealPortfolioGraph />
            : <IdealPortfolioTable />
          }
        </div>
        <div className="columns small-12 medium-2">
          <IdealPortfolioButton onClick={this.handleTableModeChange}/>
        </div>
      </div>
    );
  }
}

export default IdealPortfolioOverview;