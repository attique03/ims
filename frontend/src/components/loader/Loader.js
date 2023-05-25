import CircularProgress from '@mui/material/CircularProgress';
import './loader.css';

export default function Loader() {
  return (
    <CircularProgress
      size={50}
      varinat={'indeterminate'}
      classes={{ root: 'loader' }}
      thickness={2.6}
      value={10}
    />
  );
}
