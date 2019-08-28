import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Stock from './Stock';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import _ from 'lodash'; // unique array (uniqBy), stable sort (orderBy)
import './Portfolio.css';

const headerRows = [
  { id: 'companyName', numeric: false, label: 'Name' },
  { id: 'symbol', numeric: false, label: 'Symbol' },
  { id: 'open', numeric: true, label: 'Open' },
  { id: 'close', numeric: true, label: 'Close' },
  { id: 'latestPrice', numeric: true, label: 'Current' },
  { id: 'change', numeric: true, label: 'Change' },
  { id: 'high', numeric: true, label: 'High' },
  { id: 'low', numeric: true, label: 'Low' },
  { id: 'delete', numeric: false, label: '' },
];

function AdjustedTableHead(props) {
  const { hasBody, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(property);
  };
  if (!hasBody)
    return null;
  return (
    <TableHead>
      <TableRow>
        {
          headerRows.map(row => (
            <TableCell
              key={row.id}
              align={row.numeric ? 'right' : 'left'}
            >
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={createSortHandler(row.id)}
              >
              {row.label}
              </TableSortLabel>
            </TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  );
}

AdjustedTableHead.propTypes = {
  hasBody: PropTypes.bool.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

function AdjustedTableBody(props) {
  const { stocks, order, orderBy, remove } = props;
  var stocksCopy = [...stocks];
  stocksCopy = _.orderBy(stocksCopy, orderBy, order)
  return (
    <TableBody>
      {
        stocksCopy.map(
          stock => <Stock key={stock.symbol} stock={stock} remove={remove} />
        )
      }
    </TableBody>
  );
}

AdjustedTableBody.propTypes = {
  stocks: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
}

export default function Portfolio({exchanges}) {
  const [stocks, setStocks] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('symbol');

  const add = (stock) => {
    var result = _.uniqBy([...stocks, stock], 'symbol');
    setStocks(result);
  }

  // TODO: test
  const remove = (stock) => {
    var stocksCopy = [...stocks];
    for (var i = stocksCopy.length - 1; i >= 0; i--) {
      var st = stocksCopy[i];
      if (st.symbol === stock.symbol) {
        stocksCopy.splice(i, 1);
        break;
      }
    }
    setStocks(stocksCopy);
  }

  const handleRequestSort = (property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  return (
    <div className="Portfolio">
      <Typography variant="h1">Portfolio</Typography>
      <Search add={add} exchanges={exchanges} />
      <Table>
          <AdjustedTableHead
            hasBody={stocks.length ? true : false}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <AdjustedTableBody
            stocks={stocks}
            order={order}
            orderBy={orderBy}
            remove={remove}
          />
      </Table>
    </div>
  );
}
