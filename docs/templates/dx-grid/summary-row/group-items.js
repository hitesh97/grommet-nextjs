/*
import React from 'react';
import {
  SummaryState,
  GroupingState,
  IntegratedGrouping,
  IntegratedSummary,
  DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSummaryRow,
} from 'dx-react-grid-grommet';

import {
  generateRows,
  globalSalesValues,
} from '../../../data/dx-grid-data/generator';
*/

const CurrencyFormatter = ({ value }) => `$${value}`;

const CurrencyTypeProvider = props => (
  <DataTypeProvider
    formatterComponent={CurrencyFormatter}
    {...props}
  />
);

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      grouping: [{ columnName: 'region' }],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      totalSummaryItems: [
        { columnName: 'region', type: 'count' },
        { columnName: 'amount', type: 'sum' },
      ],
      groupSummaryItems: [
        { columnName: 'region', type: 'count' },
        { columnName: 'amount', type: 'sum' },
      ],
      currencyColumns: ['amount'],
      rows: generateRows({ columnValues: globalSalesValues, length: 8 }),
    };
  }

  render() {
    const {
      rows, columns, tableColumnExtensions, grouping,
      currencyColumns, totalSummaryItems, groupSummaryItems,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <CurrencyTypeProvider
          for={currencyColumns}
        />
        <GroupingState
          grouping={grouping}
        />
        <SummaryState
          totalItems={totalSummaryItems}
          groupItems={groupSummaryItems}
        />
        <IntegratedGrouping />
        <IntegratedSummary />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableGroupRow
          showColumnsWhenGrouped
        />
        <TableSummaryRow />
      </Grid>
    );
  }
}

render(<Demo />);
