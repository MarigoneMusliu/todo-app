// src/App.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControl,
  Grid,
} from "@mui/material";
import "./App.css"; // Import the CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObject = {
        text: newTask,
        completed: false,
        dueDate,
        notes,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
      setDueDate("");
      setNotes("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (index) => {
    const taskToComplete = tasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);
    handleDeleteTask(index);
  };

  const handleDeleteTask = (index, isCompletedTask = false) => {
    if (isCompletedTask) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
    } else {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
    }
  };

  const handleShowCompleted = () => {
    setShowCompleted(true);
  };

  const handleShowIncomplete = () => {
    setShowCompleted(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography
            variant="h3"
            style={{ fontStyle: "italic", fontWeight: "bold" }}
          >
            To Do List
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        {!showCompleted ? (
          <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="New Task"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <TextField
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleAddTask}>
              Add Task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleShowCompleted}
            >
              Show Completed
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowIncomplete}
            >
              Show Incomplete
            </Button>
            <List>
              {tasks.map((task, index) => (
                <ListItem key={index} disablePadding>
                  <Checkbox
                    edge="start"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(index)}
                  />
                  <ListItemText
                    primary={task.text}
                    secondary={`Due: ${task.dueDate || "Not set"}, Notes: ${
                      task.notes
                    }`}
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  />
                  <Button
                    color="primary"
                    onClick={() => handleCompleteTask(index)}
                    disabled={task.completed}
                  >
                    Complete
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          <>
            <Typography variant="h6">Completed Tasks</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowIncomplete}
              style={{ marginBottom: "20px" }}
            >
              Back
            </Button>
            <List>
              {completedTasks.map((task, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={task.text}
                    secondary={`Due: ${task.dueDate || "Not set"}, Notes: ${
                      task.notes
                    }`}
                  />
                  <Button
                    color="secondary"
                    onClick={() => handleDeleteTask(index, true)}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
