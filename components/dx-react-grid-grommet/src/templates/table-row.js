import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTableRow = styled.tr`
  height: 100%;
`;

export const TableRow = ({
  children,
  row, tableRow,
  ...rest
}) => (
  <StyledTableRow
    {...rest}
  >
    {children}
  </StyledTableRow>
);

TableRow.propTypes = {
  children: PropTypes.node,
  row: PropTypes.any,
  tableRow: PropTypes.object,
};

TableRow.defaultProps = {
  children: undefined,
  row: undefined,
  tableRow: undefined,
};