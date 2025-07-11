
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  TrendingUp, 
  AlertTriangle, 
  Building, 
  FileText,
  Users,
  Calendar,
  Target
} from 'lucide-react';

interface DashboardStatsProps {
  onParaSelect: (para: any) => void;
}

// Mock data - in production, this would come from Supabase
const mockStats = {
  auditStats: {
    openingBalance: 145,
    addedCases: 89,
    closingBalance: 234
  },
  hqStats: {
    openingBalance: 67,
    addedCases: 34,
    closingBalance: 101
  },
  headWiseStats: [
    { head: 'Finance', total: 45, priority: 'high' },
    { head: 'Operations', total: 32, priority: 'medium' },
    { head: 'HR', total: 28, priority: 'medium' },
    { head: 'IT', total: 19, priority: 'low' },
    { head: 'Marketing', total: 15, priority: 'low' }
  ]
};

const mockParas = [
  {
    id: '1',
    sno: 'AUD-2024-001',
    subject: 'Website Security Compliance Review',
    status: 'in-progress',
    department: 'IT Department',
    dateIssued: '2024-01-15',
    type: 'Security Audit'
  },
  {
    id: '2',
    sno: 'AUD-2024-002',
    subject: 'Financial Data Management Assessment',
    status: 'pending',
    department: 'Finance Department',
    dateIssued: '2024-01-20',
    type: 'Financial Audit'
  }
];

const DashboardStats: React.FC<DashboardStatsProps> = ({ onParaSelect }) => {
  const navigate = useNavigate();

  const handleStatClick = (type: string, metric: string) => {
    navigate(`/audit/${type}/${metric}`);
  };

  const handleParaClick = (para: any) => {
    onParaSelect(para);
  };

  return (
    <div className="space-y-8">
      {/* Block 1: Audit Objection Statistics */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-xl flex items-center space-x-3">
            <BarChart className="h-6 w-6" />
            <span>Audit Objection Statistics (All Units - FY 2024)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('all-units', 'opening-balance')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Opening Balance (OB)</p>
                  <p className="text-3xl font-bold text-green-900">{mockStats.auditStats.openingBalance}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('all-units', 'added-cases')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Added Cases</p>
                  <p className="text-3xl font-bold text-blue-900">{mockStats.auditStats.addedCases}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('all-units', 'closing-balance')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Closing Balance (CB)</p>
                  <p className="text-3xl font-bold text-purple-900">{mockStats.auditStats.closingBalance}</p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 2: Audit Objection (HQ) */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
          <CardTitle className="text-xl flex items-center space-x-3">
            <Building className="h-6 w-6" />
            <span>Audit Objection (HQ)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-lg border border-emerald-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('hq', 'opening-balance')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">Opening Balance (OB)</p>
                  <p className="text-3xl font-bold text-emerald-900">{mockStats.hqStats.openingBalance}</p>
                </div>
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-6 rounded-lg border border-cyan-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('hq', 'added-cases')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-cyan-700">Added Cases</p>
                  <p className="text-3xl font-bold text-cyan-900">{mockStats.hqStats.addedCases}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-cyan-600" />
              </div>
            </div>
            
            <div 
              className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-lg border border-violet-200 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleStatClick('hq', 'closing-balance')}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-violet-700">Closing Balance (CB)</p>
                  <p className="text-3xl font-bold text-violet-900">{mockStats.hqStats.closingBalance}</p>
                </div>
                <Target className="h-8 w-8 text-violet-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block 3: Head Wise Total Audit Cases */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
          <CardTitle className="text-xl flex items-center space-x-3">
            <Users className="h-6 w-6" />
            <span>Head Wise Total Audit Cases</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {mockStats.headWiseStats.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleStatClick('head-wise', item.head.toLowerCase())}
              >
                <div className="flex items-center space-x-4">
                  <div className={`h-3 w-3 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' :
                    item.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <span className="font-medium text-gray-900">{item.head}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-gray-700">{item.total}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {item.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Paras Section */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center space-x-3">
            <FileText className="h-6 w-6" />
            <span>Recent Audit Paras</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {mockParas.map((para) => (
              <div 
                key={para.id}
                className="flex items-center justify-between p-4 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleParaClick(para)}
              >
                <div>
                  <h4 className="font-medium text-gray-900">{para.subject}</h4>
                  <p className="text-sm text-gray-500">{para.sno} • {para.department}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  para.status === 'completed' ? 'bg-green-100 text-green-800' :
                  para.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {para.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
