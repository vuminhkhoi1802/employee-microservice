import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMPLOYEE, GET_EMPLOYEES } from '../graphql/queries';
import { Container, TextField, Button, Grid } from '@material-ui/core';

const AddEmployee: React.FC = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const [addEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployee({ variables: { name, position, department } });
    setName('');
    setPosition('');
    setDepartment('');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddEmployee;
