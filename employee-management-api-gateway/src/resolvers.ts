import employeeService from './grpc-client';

const resolvers = {
  Query: {
    employees: () => {
      return new Promise((resolve, reject) => {
        employeeService.getEmployees({}, (error: any, response: any) => {
          if (error) reject(error);
          else resolve(response.employees);
        });
      });
    },
    employee: (_: any, { id }: any) => {
      return new Promise((resolve, reject) => {
        employeeService.getEmployee({ id }, (error: any, response: any) => {
          if (error) reject(error);
          else resolve(response);
        });
      });
    }
  },
  Mutation: {
    addEmployee: (_: any, { name, position, department }: any) => {
      return new Promise((resolve, reject) => {
        employeeService.addEmployee({ name, position, department }, (error: any, response: any) => {
          if (error) reject(error);
          else resolve(response);
        });
      });
    },
    updateEmployee: (_: any, { id, name, position, department }: any) => {
      return new Promise((resolve, reject) => {
        employeeService.updateEmployee({ id, name, position, department }, (error: any, response: any) => {
          if (error) reject(error);
          else resolve(response);
        });
      });
    },
    deleteEmployee: (_: any, { id }: any) => {
      return new Promise((resolve, reject) => {
        employeeService.deleteEmployee({ id }, (error: any, response: any) => {
          if (error) reject(error);
          else resolve(response.success);
        });
      });
    }
  }
};

export default resolvers;
