import styles from './styles'
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { transactions } from "../../data/data";


const descendingComparator = (a:any, b:any, orderBy:any) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  const getComparator = (order:any, orderBy:any) => {
    return order === 'desc'
      ? (a:any, b:any) => descendingComparator(a, b, orderBy)
      : (a:any, b:any) => -descendingComparator(a, b, orderBy);
  }

  const stableSort = (array:any, comparator:any) => {
    const stabilizedThis = array.map((el:any, index:number) => [el, index]);
    stabilizedThis.sort((a:any, b:any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el:any) => el[0]);
  }

  const headCells = [
    {
      id: 'occupation',
      numeric: false,
      disablePadding: true,
      label: 'Occupation',
    },
    {
      id: 'amount',
      numeric: true,
      disablePadding: false,
      label: 'Amount',
    },
    {
      id: 'card',
      numeric: true,
      disablePadding: false,
      label: 'Card',
    }
  ];

  function EnhancedTableHead(props:any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property:any) => (event:any) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props:any) => {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
        
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  export default function EnhancedTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('amount');
    const [selected, setSelected] = React.useState<any>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleRequestSort = (event:any, property:any) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event:any) => {
      if (event.target.checked) {
        const newSelecteds = transactions.map((n:any) => n.name);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event:any, name:any) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected:any[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event:any, newPage:any) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event:any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event:any) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (name:any) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={transactions.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                   rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(transactions, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row:any, index:number) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
            
                        <TableCell align="left">{row.occupation}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="right">{row.card}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    );
  }
  