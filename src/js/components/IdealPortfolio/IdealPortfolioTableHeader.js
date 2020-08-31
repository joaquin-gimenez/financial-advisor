import React from 'react';
import { categories } from '../../data';

function generateCategoryList() {
  return categories.map(category => {
    return <th key={category.key}>{category.label} %</th>;
  })
}

function IdealPortfolioTableHeader(props) {
  return (
    <thead>
      <tr>
        <th key="risk">Risk</th>
        {generateCategoryList()}
      </tr>
    </thead>
  );
}

export default IdealPortfolioTableHeader;