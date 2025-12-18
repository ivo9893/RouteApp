
import './Login.css';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Mountain, Mail } from 'lucide-react';

function Login() {
  return (
    <div className="Login">

      <Grid container spacing={2} sx={{ width: '100%', minHeight: '100vh' }}>
        <Grid size={5}>
          <LeftSide />
        </Grid>
        <Grid size={7}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
}

function LeftSide() {
  return (
    <div className="LeftSide">
      <div style={{ background: '#7096b7', justifyItems: 'center', height: '100%', paddingTop: '58%' }}></div>
      <div>
      <Mountain size={48} />
      </div>
    </div>
  );
}

function RightSide() {

  return (
    <div className="RightSide">

    </div>
  );
}

export default Login;
