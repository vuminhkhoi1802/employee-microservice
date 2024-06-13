import * as grpc from "grpc";

export interface IEmployee {
  id: number;
  name: string;
  position: string;
  department: string;
}

export interface IEmployeeService {
  getEmployees: grpc.handleUnaryCall<{}, { employees: IEmployee[] }>;
  getEmployee: grpc.handleUnaryCall<{ id: number }, IEmployee>;
  addEmployee: grpc.handleUnaryCall<IEmployee, IEmployee>;
  updateEmployee: grpc.handleUnaryCall<IEmployee, IEmployee>;
  deleteEmployee: grpc.handleUnaryCall<{ id: number }, { success: boolean }>;
}
