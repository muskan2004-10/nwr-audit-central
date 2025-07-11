
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Calendar, User, FileText, Activity } from 'lucide-react';

// Mock para history data
const mockParaHistory = {
  para: {
    id: '1',
    sno: 'AUD-2024-001',
    subject: 'Website Security Compliance Review',
    currentStatus: 'in-progress',
    dateIssued: '2024-01-15',
    department: 'IT Department',
    type: 'Security Audit',
    assignedTo: 'John Doe'
  },
  history: [
    {
      id: 1,
      sno: 'H001',
      actionTaken: 'Para created and assigned',
      actionBy: 'audit_admin',
      status: 'assigned',
      remarks: 'Initial security compliance review assigned to IT department',
      assignee: 'John Doe',
      timestamp: '2024-01-15 10:30:00'
    },
    {
      id: 2,
      sno: 'H002',
      actionTaken: 'Document uploaded',
      actionBy: 'john_doe',
      status: 'in-progress',
      remarks: 'Uploaded initial security assessment report',
      assignee: 'John Doe',
      timestamp: '2024-01-18 14:45:00'
    },
    {
      id: 3,
      sno: 'H003',
      actionTaken: 'Status updated',
      actionBy: 'john_doe',
      status: 'in-progress',
      remarks: 'Vulnerability scanning completed, fixing identified issues',
      assignee: 'John Doe',
      timestamp: '2024-01-22 09:15:00'
    },
    {
      id: 4,
      sno: 'H004',
      actionTaken: 'Comment added',
      actionBy: 'audit_reviewer',
      status: 'in-progress',
      remarks: 'Please provide updated SSL certificate details',
      assignee: 'John Doe',
      timestamp: '2024-01-25 16:20:00'
    }
  ]
};

const ParaHistory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/dashboard')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Para History</h1>
          <p className="text-gray-600">Detailed history and current status</p>
        </div>

        <div className="space-y-6">
          {/* Para Details Header */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardTitle className="text-xl">Para Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Serial Number</h4>
                  <p className="text-lg font-semibold text-gray-900">{mockParaHistory.para.sno}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Current Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockParaHistory.para.currentStatus)}`}>
                    {mockParaHistory.para.currentStatus}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Date Issued</h4>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{mockParaHistory.para.dateIssued}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Department</h4>
                  <p className="text-gray-900">{mockParaHistory.para.department}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Subject</h4>
                <p className="text-lg text-gray-900">{mockParaHistory.para.subject}</p>
              </div>
            </CardContent>
          </Card>

          {/* History Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Action History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        S.No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action Taken
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assignee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remarks
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockParaHistory.history.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {entry.sno}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span>{entry.actionTaken}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{entry.actionBy}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {entry.assignee}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                          {entry.remarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {entry.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParaHistory;
