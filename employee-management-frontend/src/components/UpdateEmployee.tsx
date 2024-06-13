import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_EMPLOYEE, UPDATE_EMPLOYEE, GET_EMPLOYEES } from '../graphql/queries';
import { Container, TextField, Button, Grid } from '@material-ui/core';

interface UpdateEmployeeProps {
  employeeId: number;
  onUpdateCompleted: () => void;
}

const UpdateEmployee: React.FC<UpdateEmployeeProps> = ({ employeeId, onUpdateCompleted }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  const { data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeId },
    skip: !employeeId,
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_EMPLOYEES }],
  });

  useEffect(() => {
    if (data && data.employee) {
      setName(data.employee.name);
      setPosition(data.employee.position);
      setDepartment(data.employee.department);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployee({ variables: { id: employeeId, name, position, department } });
    onUpdateCompleted();
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
              Update Employee
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateEmployee;
