"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = (0, apollo_server_1.gql) `
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
  }

  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(name: String!, position: String!, department: String!): Employee
    updateEmployee(id: ID!, name: String, position: String, department: String): Employee
    deleteEmployee(id: ID!): Boolean
  }
`;
exports.default = typeDefs;
