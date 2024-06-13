"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grpc = __importStar(require("grpc"));
const protoLoader = __importStar(require("@grpc/proto-loader"));
const employee_1 = __importDefault(require("./models/employee"));
const PROTO_PATH = __dirname + '/employee.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const employeeService = protoDescriptor.EmployeeService;
const server = new grpc.Server();
server.addService(employeeService.service, {
    getEmployees: (_, callback) => {
        employee_1.default.findAll().then((employees) => callback(null, { employees }));
    },
    getEmployee: (call, callback) => {
        employee_1.default.findByPk(call.request.id).then((employee) => callback(null, employee));
    },
    addEmployee: (call, callback) => {
        employee_1.default.create(call.request).then((employee) => callback(null, employee));
    },
    updateEmployee: (call, callback) => {
        employee_1.default.findByPk(call.request.id).then((employee) => {
            if (employee) {
                employee.update(call.request).then((updatedEmployee) => callback(null, updatedEmployee));
            }
            else {
                // @ts-ignore
                callback({ code: grpc.status.NOT_FOUND, message: 'Employee not found' }, null);
            }
        });
    },
    deleteEmployee: (call, callback) => {
        employee_1.default.findByPk(call.request.id).then((employee) => {
            if (employee) {
                employee.destroy().then(() => callback(null, { success: true }));
            }
            else {
                // @ts-ignore
                callback({ code: grpc.status.NOT_FOUND, message: 'Employee not found' }, null);
            }
        });
    }
});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Server running at http://0.0.0.0:50051');
    server.start();
});
