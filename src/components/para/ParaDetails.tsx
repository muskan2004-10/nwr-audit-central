
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../layout/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { ArrowLeft, Save, Upload, UserPlus } from 'lucide-react';

const ParaDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock para data
  const [paraData, setParaData] = useState({
    sno: 'AUD-2024-001',
    subject: 'Website Security Compliance Review',
    department: 'IT Department',
    type: 'Security Audit',
    status: 'in-progress',
    assignedTo: 'John Doe',
    dateIssued: '2024-01-15',
    priority: 'high',
    description: 'Comprehensive security review of the main website including vulnerability assessment, SSL certificate verification, and data protection compliance.',
    attachments: ['security_report.pdf', 'vulnerability_scan.pdf']
  });

  const canEdit = user?.role === 'audit';

  const handleSave = () => {
    // In production, this would save to Supabase
    console.log('Saving para data:', paraData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            onClick={() => navigate(`/para/${id}`)}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Para Details</h1>
              <p className="text-gray-600">Edit and manage para information</p>
            </div>
            
            {canEdit && (
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Para
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sno">Serial Number</Label>
                  <Input
                    id="sno"
                    value={paraData.sno}
                    onChange={(e) => setParaData({ ...paraData, sno: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={paraData.status}
                    onChange={(e) => setParaData({ ...paraData, status: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={paraData.department}
                    onChange={(e) => setParaData({ ...paraData, department: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={paraData.assignedTo}
                    onChange={(e) => setParaData({ ...paraData, assignedTo: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Para Type</Label>
                  <Input
                    id="type"
                    value={paraData.type}
                    onChange={(e) => setParaData({ ...paraData, type: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <select
                    id="priority"
                    value={paraData.priority}
                    onChange={(e) => setParaData({ ...paraData, priority: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={paraData.subject}
                  onChange={(e) => setParaData({ ...paraData, subject: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={paraData.description}
                  onChange={(e) => setParaData({ ...paraData, description: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {canEdit && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Button className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Document</span>
                  </Button>
                  
                  <Button variant="outline" className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Reassign Para</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {paraData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{file}</span>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParaDetails;
