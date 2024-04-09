import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid,Tooltip } from '@mui/material';
import {Close as ClosedIcon, Edit as EditIcon, DeleteOutline as DeleteOutlineIcon,CheckCircleOutline as CheckCircleOutlineIcon,ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { useState } from 'react';

const Items = ({ title, content, priority, dueDate, onComplete, onEdit, onDelete,id,complete,onInComplete }) => {
  let priorityColor = '#FFC107'; 
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  switch (priority) {
    case 1:
      priorityColor = '#388E3C'; 
      break;
    case 2:
      priorityColor = '#4CAF50'; 
      break;
    case 3:
      priorityColor = '#FFC107'; 
      break;
    case 4:
      priorityColor = '#FF5722'; 
      break;
    case 5:
      priorityColor = '#D32F2F'; 
      break;
    default:
      break;
  }

  return (
    <Card variant="outlined" style={{border:`5px solid ${priorityColor}`,opacity: complete ? '0.7' : '1',backgroundColor:complete ? '#D3D3D3' : 'white',marginTop:5,marginBottom:5}}>
      <CardContent style={{position:'relative'}}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom style={{textAlign:"right"}}>
          Due Date: {dueDate}
        </Typography>
        <div className={`border rounded-md border-neutral-600 max-h-${expanded?'full':'24'} max-w-[80%] p-2 overflow-hidden`}>
        <Typography variant="body2" component="p">
            {content?content:'*Text Here*'} 
          </Typography>
        </div>
        {
        !expanded &&(
        <div>
        <IconButton color="primary" onClick={handleExpand}>
            <ExpandMoreIcon />
          </IconButton>
          </div>)
          }
        {expanded &&(<div>
          <IconButton color="primary" onClick={handleExpand}>
            <ExpandLessIcon />
          </IconButton>
          </div>)
          }

      </CardContent>
          
        <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
          <Grid item>
            <Tooltip title="Edit">
            <IconButton color="primary" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            {complete?
            <Tooltip title='InComplete'>
            <IconButton color="primary" onClick={()=>onInComplete(id)}>
              <ClosedIcon/>
            </IconButton>
            </Tooltip>
            
            :
            <Tooltip title='Completed'>
            <IconButton color="primary" onClick={()=>onComplete(id)}>
              <CheckCircleOutlineIcon />
            </IconButton>
            </Tooltip>
          }
          </Grid>
          <Grid item>
          <Tooltip title="Delete">
              <IconButton color="secondary" onClick={()=>onDelete(id)}>
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>

          </Grid>
        </Grid>

    </Card>
  );
};

export default Items;
