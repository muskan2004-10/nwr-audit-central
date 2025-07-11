import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Send, Clock, AlertCircle, CheckCircle, Search, Filter } from 'lucide-react';
import EmailComposer from './EmailComposer';
import ReminderHistory from './ReminderHistory';
import { useAuth } from '@/contexts/AuthContext';

interface PendingCase {
  id: string;
  paraNumber: string;
  department: string;
  departmentHead: string;
  email: string;
  description: string;
  dueDate: string;
  daysOverdue: number;
  priority: 'normal' | 'high' | 'urgent';
  lastReminderSent: string | null;
  reminderCount: number;
}

const EmailDashboard = () => {
  const { user } = useAuth();
  const [selectedCases, setSelectedCases] = useState<string[]>([]);
  const [showComposer, setShowComposer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data for pending cases
  const mockPendingCases: PendingCase[] = [
    {
      id: '1',
      paraNumber: 'M/2024/001',
      department: 'Mechanical',
      departmentHead: 'Mr. Kumar',
      email: 'mechanical.head@railway.gov.in',
      description: 'Equipment maintenance irregularities found in coach repair shop',
      dueDate: '2024-01-10',
      daysOverdue: 5,
      priority: 'high',
      lastReminderSent: '2024-01-12',
      reminderCount: 1
    },
    {
      id: '2',
      paraNumber: 'E/2024/007',
      department: 'Electrical',
      departmentHead: 'Ms. Sharma',
      email: 'electrical.head@railway.gov.in',
      description: 'Power consumption audit discrepancies in station lighting',
      dueDate: '2024-01-05',
      daysOverdue: 10,
      priority: 'urgent',
      lastReminderSent: '2024-01-14',
      reminderCount: 2
    },
    {
      id: '3',
      paraNumber: 'C/2024/002',
      department: 'Civil',
      departmentHead: 'Mr. Patel',
      email: 'civil.head@railway.gov.in',
      description: 'Platform construction cost overrun investigation',
      dueDate: '2024-01-08',
      daysOverdue: 7,
      priority: 'high',
      lastReminderSent: null,
      reminderCount: 0
    },
    {
      id: '4',
      paraNumber: 'S/2024/015',
      department: 'Signal & Telecom',
      departmentHead: 'Dr. Singh',
      email: 'signal.head@railway.gov.in',
      description: 'Signal equipment procurement process review',
      dueDate: '2024-01-12',
      daysOverdue: 3,
      priority: 'normal',
      lastReminderSent: null,
      reminderCount: 0
    },
    {
      id: '5',
      paraNumber: 'C/2024/005',
      department: 'Civil',
      departmentHead: 'Mr. Patel',
      email: 'civil.head@railway.gov.in',
      description: 'Bridge inspection report delays',
      dueDate: '2024-01-11',
      daysOverdue: 4,
      priority: 'normal',
      lastReminderSent: '2024-01-13',
      reminderCount: 1
    }
  ];

  const filteredCases = mockPendingCases.filter(case_ => {
    const matchesSearch = case_.paraNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === 'all' || case_.department === departmentFilter;
    const matchesPriority = priorityFilter === 'all' || case_.priority === priorityFilter;
    
    return matchesSearch && matchesDepartment && matchesPriority;
  });

  const selectedCasesData = filteredCases.filter(case_ => selectedCases.includes(case_.id));

  const handleSelectCase = (caseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCases(prev => [...prev, caseId]);
    } else {
      setSelectedCases(prev => prev.filter(id => id !== caseId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCases(filteredCases.map(case_ => case_.id));
    } else {
      setSelectedCases([]);
    }
  };

  const getPriorityBadge = (priority: string, daysOverdue: number) => {
    let variant = 'secondary';
    if (priority === 'urgent' || daysOverdue > 7) variant = 'destructive';
    else if (priority === 'high' || daysOverdue > 3) variant = 'warning';
    
    return (
      <Badge variant={variant as any}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getOverdueStatus = (daysOverdue: number) => {
    if (daysOverdue <= 0) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (daysOverdue <= 3) return <Clock className="h-4 w-4 text-yellow-500" />;
    return <AlertCircle className="h-4 w-4 text-red-500" />;
  };

  if (user?.role !== 'audit') {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Access restricted to Audit Department only.</p>
        </CardContent>
      </Card>
    );
  }

  if (showComposer) {
    return (
      <EmailComposer
        selectedParas={selectedCasesData}
        onClose={() => setShowComposer(false)}
        onSent={() => {
          setShowComposer(false);
          setSelectedCases([]);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Reminder Dashboard
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending Cases</TabsTrigger>
          <TabsTrigger value="history">Reminder History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pending</p>
                    <p className="text-2xl font-bold">{mockPendingCases.length}</p>
                  </div>
                  <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overdue &gt; 7 days</p>
                    <p className="text-2xl font-bold text-red-600">
                      {mockPendingCases.filter(c => c.daysOverdue > 7).length}
                    </p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Never Reminded</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {mockPendingCases.filter(c => c.reminderCount === 0).length}
                    </p>
                  </div>
                  <Mail className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected</p>
                    <p className="text-2xl font-bold text-blue-600">{selectedCases.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Actions */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search cases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Signal & Telecom">Signal & Telecom</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => setShowComposer(true)}
                  disabled={selectedCases.length === 0}
                  className="w-full sm:w-auto"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reminder ({selectedCases.length})
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Cases Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedCases.length === filteredCases.length && filteredCases.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Para Number</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Days Overdue</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Last Reminder</TableHead>
                    <TableHead>Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCases.map((case_) => (
                    <TableRow key={case_.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCases.includes(case_.id)}
                          onCheckedChange={(checked) => handleSelectCase(case_.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        {getOverdueStatus(case_.daysOverdue)}
                      </TableCell>
                      <TableCell className="font-medium">{case_.paraNumber}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{case_.department}</p>
                          <p className="text-sm text-muted-foreground">{case_.departmentHead}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{case_.description}</TableCell>
                      <TableCell>
                        <span className={case_.daysOverdue > 7 ? 'text-red-600 font-semibold' : case_.daysOverdue > 3 ? 'text-yellow-600' : 'text-green-600'}>
                          {case_.daysOverdue} days
                        </span>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(case_.priority, case_.daysOverdue)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {case_.lastReminderSent || 'Never'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{case_.reminderCount}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <ReminderHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailDashboard;