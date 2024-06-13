import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
    query GetEmployees {
        employees {
            id
            name
            position
            department
        }
    }
`;

export const GET_EMPLOYEE = gql`
    query GetEmployee($id: Int!) {
        employee(id: $id) {
            id
            name
            position
            department
        }
    }
`;

export const ADD_EMPLOYEE = gql`
    mutation AddEmployee($name: String!, $position: String!, $department: String!) {
        addEmployee(name: $name, position: $position, department: $department) {
            id
            name
            position
            department
        }
    }
`;

export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee($id: Int!, $name: String, $position: String, $department: String) {
        updateEmployee(id: $id, name: $name, position: $position, department: $department) {
            id
            name
            position
            department
        }
    }
`;

export const DELETE_EMPLOYEE = gql`
    mutation DeleteEmployee($id: Int!) {
        deleteEmployee(id: $id)
    }
`;
