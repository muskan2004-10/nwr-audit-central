
import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import DashboardStats from './DashboardStats';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

const Dashboard = () => {
  const [selectedPara, setSelectedPara] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Audit Dashboard</h2>
              <p className="text-gray-600">Overview of all audit activities and statistics</p>
            </div>
            
            <DashboardStats onParaSelect={setSelectedPara} />
          </div>
        </div>
        
        <Sidebar selectedPara={selectedPara} />
      </div>
    </div>
  );
};

export default Dashboard;
