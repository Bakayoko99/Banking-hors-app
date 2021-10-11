import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Facturepaye from './components/FacturePaye';
import Paspayer from './components/PasPayer';

const App = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          mt: 7,
          ml: 33,
          width: 750,
          height: 550,
        },
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            width: 500,
            position: 'relative',
            mt: 2,
            mr: 50
          }}
        />
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" textColor="primary" indicatorColor="primary">
                <Tab label="Factures à payer" value="1" />
                <Tab label="Factures payées" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><Paspayer /></TabPanel>
            <TabPanel value="2"><Facturepaye/></TabPanel>
          </TabContext>
        </Box>

      </Paper>
        
    </Box>
  );
}

export default App;
