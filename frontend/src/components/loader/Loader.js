import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import './loader.css';

export default function Loader() {
  return (
    <Box sx={{ m: 4 }}>
      <CircularProgress
        size={80}
        varinat={'indeterminate'}
        classes={{ root: 'loader' }}
        thickness={2.9}
        value={10}
      />
    </Box>
  );
}
