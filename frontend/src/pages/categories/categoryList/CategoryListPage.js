import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import {
  listCategoryDetails,
  listDetailsCategories,
} from '../../../redux/actions/category/categoryActions';
import './categoryList.css';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category, error } = categoryDetails;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row" align="center">
          {row.category_id}
        </StyledTableCell>
        <StyledTableCell align="center">{row.category_name}</StyledTableCell>
        <StyledTableCell align="center">
          {row.subcategories_count}
        </StyledTableCell>
        <StyledTableCell align="center">{row.vendors_count}</StyledTableCell>
        <StyledTableCell align="center">
          <AddIcon style={{ height: '20px' }} />
          <EditIcon style={{ height: '20px' }} />
          <DeleteOutlineIcon style={{ height: '20px' }} />
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              console.log('Id ', row.category_id);
              dispatch(listCategoryDetails(row.category_id));
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className={'table-cell'}>
                      Sub-Category Name
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Vendor Name
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Qunatity
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Quantity Assigned
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Quantity Unassigned
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Quantity Faulty
                    </TableCell>
                    <TableCell align="center" className={'table-cell'}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category &&
                    category.length > 0 &&
                    category.map((cat, index) => (
                      <TableRow align="center" key={index}>
                        <TableCell align="center">
                          {cat.subcategoryName}
                        </TableCell>
                        <TableCell align="center">{cat.vendorName}</TableCell>
                        <TableCell align="center">
                          {cat.totalQuantity}
                        </TableCell>
                        <TableCell align="center">
                          {cat.quantityAssigned}
                        </TableCell>
                        <TableCell align="center">
                          {cat.quantityUnassigned}
                        </TableCell>
                        <TableCell align="center">
                          {cat.faultyQuantity}
                        </TableCell>
                        <TableCell
                          align="center"
                          className={'view'}
                          onClick={() =>
                            navigate(
                              `${row.category_id}/sub-category/${cat.subcategoryId}`,
                            )
                          }
                        >
                          View
                        </TableCell>

                        {/* <TableCell align="right">
                        {Math.round(cat.amount * row.price * 100) / 100}
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

export default function CollapsibleTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryDetailsList = useSelector((state) => state.categoryDetailsList);
  const { categories, error } = categoryDetailsList;

  React.useEffect(() => {
    dispatch(listDetailsCategories());
  }, [dispatch]);

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
              onClick={() => navigate('create')}
            >
              Add Category
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">Category Name</StyledTableCell>
                <StyledTableCell align="center">
                  Number of Sub-Categories
                </StyledTableCell>
                <StyledTableCell align="center">
                  Number of Vendors
                </StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                <StyledTableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {categories?.map((row) => (
                <Row key={row.category_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
