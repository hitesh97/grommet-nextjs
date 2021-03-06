/*
import React from 'react';
import {
  Grid,
  DragDropProvider,
  Table,
  TableHeaderRow,
  TableColumnReordering,
} from 'dx-react-grid-grommet';

import { generateRows } from '../../../data/dx-grid-data/generator';
*/

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      tableColumnExtensions: [
        { columnName: 'sex', width: 100 },
      ],
      rows: generateRows({ length: 6 }),
      columnOrder: ['city', 'sex', 'car', 'name'],
    };

    this.changeColumnOrder = this.changeColumnOrder.bind(this);
  }

  changeColumnOrder(newOrder) {
    this.setState({ columnOrder: newOrder });
  }

  render() {
    const {
      rows, columns, tableColumnExtensions, columnOrder,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropProvider />
        <Table
          columnExtensions={tableColumnExtensions}
        />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={this.changeColumnOrder}
        />
        <TableHeaderRow />
      </Grid>
    );
  }
}

render(<Demo />);
