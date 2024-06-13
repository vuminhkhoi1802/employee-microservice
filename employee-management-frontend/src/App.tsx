import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import UpdateEmployee from './components/UpdateEmployee';

const App: React.FC = () => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

  const handleEmployeeSelect = (id: number) => {
    setSelectedEmployeeId(id);
  };

  const handleUpdateCompleted = () => {
    setSelectedEmployeeId(null);
  };

  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Employee Management</h1>
        <AddEmployee />
        <EmployeeList onSelect={handleEmployeeSelect} />
        {selectedEmployeeId && (
          <UpdateEmployee
            employeeId={selectedEmployeeId}
            onUpdateCompleted={handleUpdateCompleted}
          />
        )}
      </div>
    </ApolloProvider>
  );
};

export default App;
