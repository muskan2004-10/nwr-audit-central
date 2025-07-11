
import React, { useState } from 'react';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import DashboardStats from './DashboardStats';
import EmailDashboard from '../email/EmailDashboard';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { BarChart3, Mail } from 'lucide-react';
import { Toaster } from '../ui/toaster';

const Dashboard = () => {
  const [selectedPara, setSelectedPara] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster />
      
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Audit Dashboard</h2>
              <p className="text-gray-600">Overview of all audit activities and email communications</p>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="emails" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Reminders
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <DashboardStats onParaSelect={setSelectedPara} />
              </TabsContent>
              
              <TabsContent value="emails" className="mt-6">
                <EmailDashboard />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Sidebar selectedPara={selectedPara} />
      </div>
    </div>
  );
};

export default Dashboard;
