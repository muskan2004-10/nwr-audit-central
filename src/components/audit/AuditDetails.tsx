
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, FileText, Calendar, Building, AlertTriangle } from 'lucide-react';

// Mock detailed audit data
const mockAuditDetails = {
  'all-units': {
    'opening-balance': [
      { id: 1, sno: 'AUD-2024-001', subject: 'Website Security Assessment', type: 'Security', status: 'pending', department: 'IT' },
      { id: 2, sno: 'AUD-2024-002', subject: 'Data Privacy Compliance', type: 'Compliance', status: 'in-progress', department: 'Legal' },
      { id: 3, sno: 'AUD-2024-003', subject: 'Performance Optimization Review', type: 'Performance', status: 'completed', department: 'IT' },
    ],
    'added-cases': [
      { id: 4, sno: 'AUD-2024-004', subject: 'User Authentication Audit', type: 'Security', status: 'pending', department: 'IT' },
      { id: 5, sno: 'AUD-2024-005', subject: 'Database Integrity Check', type: 'Technical', status: 'in-progress', department: 'IT' },
    ],
    'closing-balance': [
      { id: 6, sno: 'AUD-2024-006', subject: 'Accessibility Standards Review', type: 'Compliance', status: 'pending', department: 'Design' },
      { id: 7, sno: 'AUD-2024-007', subject: 'Mobile Responsiveness Audit', type: 'Technical', status: 'in-progress', department: 'Development' },
    ]
  },
  'hq': {
    'opening-balance': [
      { id: 8, sno: 'HQ-2024-001', subject: 'Headquarters Network Security', type: 'Security', status: 'completed', department: 'IT' },
      { id: 9, sno: 'HQ-2024-002', subject: 'Central Database Audit', type: 'Technical', status: 'in-progress', department: 'IT' },
    ],
    'added-cases': [
      { id: 10, sno: 'HQ-2024-003', subject: 'HQ Staff Portal Review', type: 'Functional', status: 'pending', department: 'HR' },
    ],
    'closing-balance': [
      { id: 11, sno: 'HQ-2024-004', subject: 'Communication System Audit', type: 'Technical', status: 'in-progress', department: 'IT' },
    ]
  }
};

const AuditDetails = () => {
  const { type, metric } = useParams();
  const navigate = useNavigate();
  
  const auditData = mockAuditDetails[type as keyof typeof mockAuditDetails]?.[metric as string] || [];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Security': return <AlertTriangle className="h-4 w-4" />;
      case 'Technical': return <FileText className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
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
          
          <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">
            {type?.replace('-', ' ')} - {metric?.replace('-', ' ')}
          </h1>
          <p className="text-gray-600">Detailed audit para listing</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Audit Paras ({auditData.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serial No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Para Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auditData.map((para) => (
                    <tr key={para.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {para.sno}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {para.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(para.type)}
                          <span>{para.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {para.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(para.status)}`}>
                          {para.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => navigate(`/para/${para.id}`)}
                        >
                          View Details
                        </Button>
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
  );
};

export default AuditDetails;
