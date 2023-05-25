import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { PENDING, REJECTED, RESOLVED } from '../../../utils/constants';
import moment from 'moment';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#318CE7',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function checkValues(val) {
  if (moment(val, moment.ISO_8601, true).isValid()) {
    return <span>{moment(val).format('L')}</span>;
  } else if (String(val)?.startsWith('frontend/public')) {
    return (
      <Avatar
        alt="profile-img"
        src={`/uploads/${val?.split('/')[3]}`}
        classes={{ root: 'img' }}
      />
    );
  } else if (val === PENDING) {
    return (
      <>
        <span className="pending"></span>
        <span>{val}</span>
      </>
    );
  } else if (val === RESOLVED) {
    return (
      <>
        <span className="resolved"></span>
        <span>{val}</span>
      </>
    );
  } else if (val === REJECTED) {
    return (
      <>
        <span className="rejected"></span>
        <span>{val}</span>
      </>
    );
  }
  return val;
}
