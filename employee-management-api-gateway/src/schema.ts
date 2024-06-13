import { gql } from 'apollo-server';

const typeDefs = gql`
    type Employee {
        id: Int!
        name: String!
        position: String!
        department: String!
    }

    type Query {
        employees: [Employee!]!
        employee(id: Int!): Employee
    }

    type Mutation {
        addEmployee(name: String!, position: String!, department: String!): Employee
        updateEmployee(id: Int!, name: String, position: String, department: String): Employee
        deleteEmployee(id: Int!): Boolean
    }
`;

export default typeDefs;
