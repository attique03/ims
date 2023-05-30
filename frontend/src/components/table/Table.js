import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  checkValues,
  StyledTableCell,
  StyledTableRow,
} from './tableStyle/TableStyle';
import './table.css';
import { useState } from 'react';
import { TableCell, TablePagination, Typography } from '@mui/material';
import Error from '../error/Error';

export default function DataTable({ columns, data, viewType }) {
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data?.length - page * rowsPerPage);

  return (
    <>
      {data?.length > 0 ? (
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
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={index}>
                    {Object.values(row).map((value, idx) => (
                      <StyledTableCell key={idx} align="left">
                        {checkValues(value)}
                      </StyledTableCell>
                    ))}

                    <StyledTableCell
                      align="left"
                      className="view"
                      onClick={() =>
                        viewType
                          ? navigate(`/${viewType}/${row.id}`)
                          : navigate(`${row.id}`)
                      }

                      // onClick={() => navigate(`${row.id}`)}
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
            count={data?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            // onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Error title="Message" error="No Data Available" />
      )}
    </>
  );
}
