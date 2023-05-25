import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Container, Stack } from '@mui/system';
import { Box, Button, Card, InputAdornment, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { listDetailsCategories } from '../../../redux/actions/category/categoryActions';
import { StyledTableCell } from '../../../components/table/tableStyle/TableStyle';
import NestedRow from '../../../components/table/nestedRow/NestedRow';
import './categoryList.css';
import CardContainer from '../../../components/card/CardContainer';
import Error from '../../../components/error/Error';

export default function CollapsibleTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categoryDetailsList = useSelector((state) => state.categoryDetailsList);
  const { categories, error } = categoryDetailsList;

  useEffect(() => {
    dispatch(listDetailsCategories());
  }, [dispatch]);

  return (
    <CardContainer>
      {error && <Error error={error} />}
      <Box className={'header'}>
        <Box className={'header-left'}>
          <Stack direction="row" spacing={2}>
            <Typography variant="h5" component="h5">
              Categories
            </Typography>
            <TextField
              label="Search"
              id="search"
              size="small"
              classes={{ root: 'icon-box' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FontAwesomeIcon icon={faSearch} className={'icon-size'} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
        <Box className={'header-right'}>
          <Button
            variant="contained"
            startIcon={<FontAwesomeIcon icon={faAdd} className={'icon-size'} />}
            classes={{ root: 'save-btn' }}
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
              <NestedRow key={row.category_id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContainer>
  );
}
