/*
import React from 'react';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
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
      rows: generateRows({ length: 8 }),
      defaultSorting: [
        { columnName: 'sex', direction: 'desc' },
      ],
      sortingStateColumnExtensions: [
        { columnName: 'sex', sortingEnabled: false },
      ],
    };
  }

  render() {
    const {
      rows,
      columns,
      defaultSorting,
      sortingStateColumnExtensions,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <SortingState
          defaultSorting={defaultSorting}
          columnExtensions={sortingStateColumnExtensions}
        />
        <IntegratedSorting />
        <Table />
        <TableHeaderRow showSortingControls />
      </Grid>
    );
  }
}

render(<Demo />);
