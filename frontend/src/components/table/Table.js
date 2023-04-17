import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';
import Stack from '@mui/material/Stack';
import './table.css';
import { Avatar } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#318CE7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DataTable({ columns, data }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function checkValues(val) {
    if (String(val)?.startsWith('frontend/public')) {
      console.log('Value ', val);
      return (
        <img
          alt="profile-img"
          // src={val && val}
          src={`/uploads/${val?.split('/')[3]}`}
          style={{ borderRadius: '0px', height: '40px', width: '40px' }}
        />
        // <img
        //   src={val && val}
        //   alt="icon"
        //   style={{ width: '35px', height: '35px', borderRadius: '5px' }}
        // />
      );
    }
    return val;
  }
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // if (data) {
  //   data.map((row) => {
  //     Object.values(row).forEach((val) => {
  //       if (String(val).startsWith('/')) {
  //         console.log(val);
  //       }
  //     });
  //   });
  // }

  return (
    <TableContainer component={Paper} mb={5}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <StyledTableCell key={index}>{col}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <StyledTableRow key={index}>
                {Object.values(row).map((value, idx) => (
                  <StyledTableCell key={idx} align="left">
                    {checkValues(value)}

                    {/* {String(value)?.startsWith('/') ? (
                      <img
                        src={value && value}
                        alt="log"
                        style={{ width: '25px', height: '25px' }}
                      />
                    ) : (
                      value
                    )} */}
                    {/* {value === true ? 'pending' : 'resolve'} */}
                  </StyledTableCell>
                ))}

                <StyledTableCell
                  align="left"
                  className="view"
                  onClick={() => navigate(`${row.id}`)}
                >
                  View
                </StyledTableCell>
              </StyledTableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
