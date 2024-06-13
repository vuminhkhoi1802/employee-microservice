import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import Employee from './models/employee';

const PROTO_PATH = __dirname + '/employee.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const employeeService = protoDescriptor.EmployeeService;

const server = new grpc.Server();

server.addService(employeeService.service, {
  getEmployees: (_: any, callback: grpc.sendUnaryData<any>) => {
    Employee.findAll().then((employees) => callback(null, { employees }));
  },
  getEmployee: (call: grpc.ServerUnaryCall<any>, callback: grpc.sendUnaryData<any>) => {
    Employee.findByPk(call.request.id).then((employee) => callback(null, employee));
  },
  addEmployee: (call: grpc.ServerUnaryCall<any>, callback: grpc.sendUnaryData<any>) => {
    Employee.create(call.request).then((employee) => callback(null, employee));
  },
  updateEmployee: (call: grpc.ServerUnaryCall<any>, callback: grpc.sendUnaryData<any>) => {
    Employee.findByPk(call.request.id).then((employee) => {
      if (employee) {
        employee.update(call.request).then((updatedEmployee) => callback(null, updatedEmployee));
      } else {
        // @ts-ignore
        callback({ code: grpc.status.NOT_FOUND, message: 'Employee not found' }, null);
      }
    });
  },
  deleteEmployee: (call: grpc.ServerUnaryCall<any>, callback: grpc.sendUnaryData<any>) => {
    Employee.findByPk(call.request.id).then((employee) => {
      if (employee) {
        employee.destroy().then(() => callback(null, { success: true }));
      } else {
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
