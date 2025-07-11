
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Upload, Edit, UserPlus, FileText, Clock, AlertCircle } from 'lucide-react';

interface SidebarProps {
  selectedPara?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedPara }) => {
  const { user } = useAuth();
  const isAuditRole = user?.role === 'audit';

  if (!selectedPara) {
    return (
      <div className="w-80 bg-white shadow-lg border-l border-gray-200 p-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Para Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center mt-8">
              Select a para to view details
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white shadow-lg border-l border-gray-200 p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Para Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Subject</h4>
            <p className="text-sm text-gray-900">{selectedPara.subject}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Serial Number</h4>
            <p className="text-sm text-gray-900">{selectedPara.sno}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Current Status</h4>
            <div className="flex items-center space-x-2">
              <div className={`h-2 w-2 rounded-full ${
                selectedPara.status === 'completed' ? 'bg-green-500' :
                selectedPara.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className="text-sm capitalize">{selectedPara.status}</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Department</h4>
            <p className="text-sm text-gray-900">{selectedPara.department}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-1">Date Issued</h4>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{selectedPara.dateIssued}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {isAuditRole && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full flex items-center space-x-2" size="sm">
              <Upload className="h-4 w-4" />
              <span>Upload Document</span>
            </Button>
            
            <Button variant="outline" className="w-full flex items-center space-x-2" size="sm">
              <Edit className="h-4 w-4" />
              <span>Edit Para</span>
            </Button>
            
            <Button variant="outline" className="w-full flex items-center space-x-2" size="sm">
              <UserPlus className="h-4 w-4" />
              <span>Assign User</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sidebar;
