import React, { useState,useEffect } from 'react';
import {  Grid, Button } from '@mui/material';


const Buttons = ({onButtonClick,selectedButton}) => {
  return (
    <Grid container spacing={1}>
    <Grid item>
      <Button
        variant={selectedButton === 'byDate' ? 'contained' : 'outlined'}
        onClick={()=> onButtonClick('byDate')}
        color="primary"
      >
        By Date
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant={selectedButton === 'priority' ? 'contained' : 'outlined'}
        onClick={() => onButtonClick('priority')}
        color="primary"
      >
        Priority
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant={selectedButton === 'completed' ? 'contained' : 'outlined'}
        onClick={()=> onButtonClick('completed')}
        color="primary"
      >
        Completed
      </Button>
    </Grid>
    <Grid item>
      <Button
        variant={selectedButton === 'remaining' ? 'contained' : 'outlined'}
        onClick={()=> onButtonClick('remaining')}
        color="primary"
      >
        Remaining
      </Button>
    </Grid>
    
  </Grid>
  )
}

export default Buttons