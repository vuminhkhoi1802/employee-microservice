"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_client_1 = __importDefault(require("./grpc-client"));
const resolvers = {
    Query: {
        employees: () => {
            return new Promise((resolve, reject) => {
                grpc_client_1.default.getEmployees({}, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response.employees);
                });
            });
        },
        employee: (_, { id }) => {
            return new Promise((resolve, reject) => {
                grpc_client_1.default.getEmployee({ id }, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response);
                });
            });
        }
    },
    Mutation: {
        addEmployee: (_, { name, position, department }) => {
            return new Promise((resolve, reject) => {
                grpc_client_1.default.addEmployee({ name, position, department }, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response);
                });
            });
        },
        updateEmployee: (_, { id, name, position, department }) => {
            return new Promise((resolve, reject) => {
                grpc_client_1.default.updateEmployee({ id, name, position, department }, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response);
                });
            });
        },
        deleteEmployee: (_, { id }) => {
            return new Promise((resolve, reject) => {
                grpc_client_1.default.deleteEmployee({ id }, (error, response) => {
                    if (error)
                        reject(error);
                    else
                        resolve(response.success);
                });
            });
        }
    }
};
exports.default = resolvers;
