/*
import React from 'react';
import { SortingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
} from 'dx-react-grid-grommet';
import { Box } from 'grommet';
import { Spinning } from 'grommet-controls';
*/

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'OrderNumber', title: 'Order Number' },
        { name: 'OrderDate', title: 'Order Date' },
        { name: 'StoreCity', title: 'Store City' },
        { name: 'StoreState', title: 'Store State' },
        { name: 'Employee', title: 'Employee' },
        { name: 'SaleAmount', title: 'Sale Amount' },
      ],
      tableColumnExtensions: [
        { columnName: 'OrderNumber', align: 'right' },
        { columnName: 'SaleAmount', align: 'right' },
      ],
      rows: [],
      sorting: [{ columnName: 'StoreCity', direction: 'asc' }],
      loading: true,
    };

    this.changeSorting = this.changeSorting.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  changeSorting(sorting) {
    this.setState({
      loading: true,
      sorting,
    });
  }

  queryString() {
    let queryString = `${URL}?`;
    const { sorting } = this.state;

    const columnSorting = sorting[0];
    if (columnSorting) {
      const sortDirectionString = columnSorting.direction === 'desc' ? ' desc' : '';
      queryString = `${queryString}orderby=${columnSorting.columnName}${sortDirectionString}`;
    }
    return queryString;
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({ loading: false });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => this.setState({
        rows: data.items,
        loading: false,
      }))
      .catch(() => this.setState({ loading: false }));
    this.lastQuery = queryString;
  }

  render() {
    const {
      rows, columns, tableColumnExtensions, sorting, loading,
    } = this.state;

    return (
      <Box align='center'>
        <Grid
          rows={rows}
          columns={columns}
        >
          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <VirtualTable
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow showSortingControls />
        </Grid>
        {loading && <Spinning />}
      </Box>
    );
  }
}

render(<Demo />);
