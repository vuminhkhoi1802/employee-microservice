import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EMPLOYEES, DELETE_EMPLOYEE } from '../graphql/queries';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';

interface EmployeeListProps {
  onSelect: (id: number) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onSelect }) => {
  const { loading, error, data } = useQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id: number) => {
    deleteEmployee({ variables: { id }, refetchQueries: [{ query: GET_EMPLOYEES }] });
  };

  return (
    <List>
      {data.employees.map((employee: any) => (
        <ListItem key={employee.id}>
          <ListItemText
            primary={employee.name}
            secondary={`${employee.position} - ${employee.department}`}
          />
          <Button onClick={() => handleDelete(employee.id)}>Delete</Button>
          <Button onClick={() => onSelect(employee.id)}>Update</Button>
        </ListItem>
      ))}
    </List>
  );
};

export default EmployeeList;
