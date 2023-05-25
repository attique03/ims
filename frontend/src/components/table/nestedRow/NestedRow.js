import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledTableCell } from '../tableStyle/TableStyle';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { listCategoryDetails } from '../../../redux/actions/category/categoryActions';
import './nestedRow.css';
import Error from '../../error/Error';

export default function NestedRow({ row }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category, error } = categoryDetails;

  return (
    <>
      {error && <Error error={error} />}
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
          <AddIcon classes={{ root: 'icon-height' }} />
          <EditIcon classes={{ root: 'icon-height' }} />
          <DeleteOutlineIcon classes={{ root: 'icon-height' }} />
        </StyledTableCell>
        <StyledTableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              dispatch(listCategoryDetails(row.category_id));
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ my: 1 }}>
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
