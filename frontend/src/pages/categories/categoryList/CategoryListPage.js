import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Stack } from '@mui/system';
import {
  Button,
  Card,
  FormControl,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAdd,
  faDeleteLeft,
  faEdit,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#318CE7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        subCategoryName: 'Laptop',
        vendorName: 'Vendor Name',
        quantity: 3,
        quantityAssigned: 50,
        quantityUnassigned: 50,
        quantityFaulty: 50,
        action: 'view',
      },
      {
        subCategoryName: 'Laptop',
        vendorName: 'Vendor Name',
        quantity: 3,
        quantityAssigned: 50,
        quantityUnassigned: 50,
        quantityFaulty: 50,
        action: 'view',
      },
      {
        subCategoryName: 'Laptop',
        vendorName: 'Vendor Name',
        quantity: 3,
        quantityAssigned: 50,
        quantityUnassigned: 50,
        quantityFaulty: 50,
        action: 'view',
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        <StyledTableCell align="left">{row.calories}</StyledTableCell>
        <StyledTableCell align="left">{row.fat}</StyledTableCell>
        <StyledTableCell align="left">{row.carbs}</StyledTableCell>
        <StyledTableCell align="left">{row.protein}</StyledTableCell>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Sub-Category Name</TableCell>
                    <TableCell>Vendor Name</TableCell>
                    <TableCell align="right">Qunatity</TableCell>
                    <TableCell align="right">Quantity Assigned</TableCell>
                    <TableCell align="right">Quantity Unassigned</TableCell>
                    <TableCell align="right">Quantity Faulty</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>{historyRow.subCategoryName}</TableCell>
                      <TableCell align="right">
                        {historyRow.vendorName}
                      </TableCell>
                      <TableCell align="right">{historyRow.quantity}</TableCell>
                      <TableCell align="right">
                        {historyRow.quantityAssigned}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.quantityUnassigned}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow.quantityFaulty}
                      </TableCell>
                      <TableCell align="right">{historyRow.action}</TableCell>

                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    'Frozen yoghurt',
    159,
    6.0,
    24,
    <>
      {/* <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />{' '}
      <FontAwesomeIcon icon={faEdit} style={{ height: '13px' }} /> */}
      <AddIcon style={{ height: '20px' }} />
      <EditIcon style={{ height: '20px' }} />
      <DeleteOutlineIcon style={{ height: '20px' }} />
    </>,
    // <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />,
  ),
  createData(
    'Ice cream sandwich',
    237,
    9.0,
    37,
    <>
      <AddIcon style={{ height: '20px' }} />
      <EditIcon style={{ height: '20px' }} />
      <DeleteOutlineIcon style={{ height: '20px' }} />
    </>,
  ),
  createData(
    'Eclair',
    262,
    16.0,
    24,
    <>
      <AddIcon style={{ height: '20px' }} />
      <EditIcon style={{ height: '20px' }} />
      <DeleteOutlineIcon style={{ height: '20px' }} />
    </>,
  ),
  createData(
    'Cupcake',
    305,
    3.7,
    67,
    <>
      <AddIcon style={{ height: '20px' }} />
      <EditIcon style={{ height: '20px' }} />
      <DeleteOutlineIcon style={{ height: '20px' }} />
    </>,
  ),
  createData(
    'Gingerbread',
    356,
    16.0,
    49,
    <>
      <AddIcon style={{ height: '20px' }} />
      <EditIcon style={{ height: '20px' }} />
      <DeleteOutlineIcon style={{ height: '20px' }} />
    </>,
  ),
];

export default function CollapsibleTable() {
  return (
    <Container style={{ maxWidth: '1200px', mb: 3 }}>
      <Card sx={{ borderRadius: '15px', boxShadow: 3, my: 5, p: 2 }}>
        <Box display="flex" p={1} sx={{ mb: 4 }}>
          <Box p={1} flexGrow={1}>
            <Stack direction="row" spacing={2}>
              <Typography variant="h5" component="h5">
                Categories
              </Typography>
              <TextField
                label="Search"
                id="outlined-size-small"
                defaultValue=""
                size="small"
                sx={{ width: '200px' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        icon={faSearch}
                        style={{ height: '13px' }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>
          <Box p={1}>
            <Button
              variant="contained"
              startIcon={
                <FontAwesomeIcon icon={faAdd} style={{ height: '13px' }} />
              }
              sx={{ backgroundColor: '#31DE79' }}
            >
              Add Category
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Category Name</StyledTableCell>
                <StyledTableCell align="left">
                  Number of Sub-Categories
                </StyledTableCell>
                <StyledTableCell align="left">
                  Number of Vendors
                </StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
