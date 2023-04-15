import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './loader.css';

export default function Loader() {
  return (
    <Box className={''}>
      <CircularProgress
        size={50}
        varinat={'indeterminate'}
        classes={{ root: 'loader' }}
        thickness={2.6}
        value={10}
      />
    </Box>
  );
}
