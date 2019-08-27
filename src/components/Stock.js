import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';

function toTwoDecimalPlaces(val) {
  return parseFloat(val).toFixed(2);
}

function stringifyPercent(percent) {
  return '(' + Math.abs(Math.round(percent * 100) / 100).toFixed(2).toString() + '%)';
}

function changeToString(change, percent) {
  var changeVal = '';
  if (change === 0) {
    return '0.00';
  }
  else if (change > 0) {
    changeVal += '+';
  }
  changeVal += toTwoDecimalPlaces(change) + ' ' + stringifyPercent(percent);
  return changeVal;
}

export default function Stock({stock, remove}) {
  return (
      <TableRow>
        <TableCell component="th" scope="row">
          {stock.companyName}
        </TableCell>
        <TableCell>{stock.symbol}</TableCell>
        <TableCell align="right">{
            stock.open ? toTwoDecimalPlaces(stock.open) : '–' 
          }
        </TableCell>
        <TableCell align="right">{
            stock.close ? toTwoDecimalPlaces(stock.close) : '–'
          }
        </TableCell>
        <TableCell align="right">{
            stock.latestPrice ? toTwoDecimalPlaces(stock.latestPrice) : '–'
          }
        </TableCell>
        <TableCell align="right" style={{ 
              'color': stock.change === 0 ? 'inherit' : 
              stock.change > 0 ? 'green' : 'red' 
            }
          } 
        >
          {changeToString(stock.change, stock.changePercent)}
        </TableCell>
        <TableCell align="right">{
            stock.high ? toTwoDecimalPlaces(stock.high) : '–'
          }
        </TableCell>
        <TableCell align="right">{
            stock.low ? toTwoDecimalPlaces(stock.low) : '–'
          }
        </TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={() => remove(stock)}>
            <Delete></Delete>
          </IconButton>
        </TableCell>
      </TableRow>
  );
}
