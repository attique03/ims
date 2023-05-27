import CircularProgress from '@mui/material/CircularProgress';
import './loader.css';

export default function Loader() {
  return (
    <CircularProgress
      size={100}
      varinat={'indeterminate'}
      classes={{ root: 'loader' }}
      thickness={2.9}
      value={10}
    />
  );
}
