import React, { useState,useEffect } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Grid, Button, Typography } from '@mui/material';
import Items from '../components/Items';
import Buttons from '../components/Buttons';
import api from "../api";
import {useNavigate} from 'react-router-dom'

const Mylist = () => {
  const [selectedButton, setSelectedButton] = useState('byDate');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    handleButtonClick(selectedButton)
}, []);
const navigate = useNavigate()

const deleteTask = (id) => {
  api
      .delete(`/api/tasks/delete/${id}/`)
      .then((res) => {
          if (res.status === 204) alert("Note deleted!");
          else alert("Failed to delete note.");
          window.location.reload()
      })
      .catch((error) => alert(error));
};

const today = new Date().toISOString().split('T')[0];

const [isEditing, setIsEditing] = useState(false);
const handleButtonClick = (buttonName) => {
  setSelectedButton(buttonName);

  if (buttonName === 'byDate') {
    api
      .get("/api/tasks/")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        navigate('/login')
        alert(err);
  });
  } else if (buttonName === 'priority') {
    api
      .get("/api/tasks/priority/")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  } else if (buttonName === 'completed') {
    api
      .get("/api/tasks/completed/")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  } else if (buttonName === 'remaining') {
    api
      .get("/api/tasks/remaining/")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => alert(err));
  } else {
    console.log("Invalid buttonName:", buttonName);
  }
};

const priorityLevels = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'Normal' },
  { value: 4, label: 'High' },
  { value: 5, label: 'Very High' }
];

const [formData, setFormData] = useState({
  title: '',
  content: '',
  dueDate: today,
  priority: 3,
  created_at:new Date(),
  user_id: null,
  completed: false,
});


  const [titleError, setTitleError] = useState('');

  const handleComplete = (id) => {
    api
    .patch(`/api/tasks/update/${id}/`, { "completed": true })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error updating task completion status:', error);
    });
  };
  const handleInComplete = (id) => {
    api
    .patch(`/api/tasks/update/${id}/`, { "completed": false })
    .then(response => {
      window.location.reload()
    })
    .catch(error => {
      console.error('Error updating task completion status:', error);
    });
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handlePriorityChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      priority: parseInt(e.target.value)
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }))

    if (id === 'title' && value.trim() === '') {
      setTitleError('Title cannot be empty');
    } else {
      setTitleError('');
    }
  };

  const handleClick = (e) => {
    e.preventDefault()
    if (formData.title.trim() === '') {
      setTitleError('Title cannot be empty');
    } else {
      setTitleError('');
      api
            .post("/api/tasks/", { "content":formData.content, "title":formData.title,"completed":formData.completed,"due_date":formData.dueDate,"priority":formData.priority,created_at:formData.created_at })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                window.location.reload()
                setFormData({
                  content: '',
                  title: '',
                  completed: false,
                  dueDate: today, 
                  priority: 3,
                  created_at: ''
                });
            })
            .catch((err) => alert(err))
    }
  };

  return (
    <div className='bg-slate-100 justify-around min-h-screen md:flex sm:flex-col md:flex-row'>
      <div className='p-2 sm:w-full md:w-1/2'>
        <Typography variant="h4" gutterBottom textAlign={'center'}>Add Task</Typography>
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12}>
            <TextField id="title" label="Title" fullWidth value={formData.title} onChange={handleChange} error={!!titleError} helperText={titleError} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="content"
              label="Content"
              multiline
              rows={4}
              fullWidth
              value={formData.content}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="dueDate"
              label="Due Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              inputProps={{
                min: today 
              }}
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                label="Priority"
                value={formData.priority}
                onChange={handlePriorityChange}
                defaultValue={3} 
                sx={{ minWidth: 120 }}
              >
                {priorityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className='bg-slate-300 h-full w-full'>
      <Buttons onButtonClick={handleButtonClick} selectedButton={selectedButton}/>
       {tasks.map((task,index)=>(<Items key={index} id={task.id} title={task.title} content={task.content} priority={task.priority} dueDate={task.due_date} onComplete={handleComplete} onEdit={handleEdit} onDelete={deleteTask} complete={task.completed} onInComplete={handleInComplete}/>))} 
      </div>
    </div>
  )
}

export default Mylist;
