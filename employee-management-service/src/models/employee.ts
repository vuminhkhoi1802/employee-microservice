import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('postgres://username:password@db:5432/employees_db', {
  retry: {
    match: [
      /ECONNREFUSED/,
    ],
    max: 10, // Maximum retry 10 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5, // Exponential backoff factor. Default: 1.1
  }
});

class Employee extends Model {
  public id!: number;
  public name!: string;
  public position!: string;
  public department!: string;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'employees'
  }
);

sequelize.sync();

export default Employee;
