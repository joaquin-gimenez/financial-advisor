import React from 'react';
import IdealPortfolioTable from './IdealPortfolioTable';
import IdealPortfolioGraph from './IdealPortfolioGraph';
// import IdealPortfolioButton from './IdealPortfolioButton';

class IdealPortfolioOverview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: "table"
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.state.mode === "table"
            ? <IdealPortfolioTable />
            : <IdealPortfolioGraph />
          }
        </div>
        {/* <IdealPortfolioButton /> */}
      </div>
    );
  }
}

export default IdealPortfolioOverview;