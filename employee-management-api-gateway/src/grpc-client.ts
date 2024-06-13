import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = __dirname + '/employee.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
const employeeService = new protoDescriptor.EmployeeService(
  'management-service:50051', // Ensure this address matches the service name in docker-compose
  grpc.credentials.createInsecure()
);

export default employeeService;
