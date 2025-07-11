import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, Mail, Search, Eye, Filter } from 'lucide-react';

interface ReminderRecord {
  id: string;
  sentDate: string;
  sentBy: string;
  recipient: string;
  subject: string;
  paraNumbers: string[];
  priority: 'normal' | 'high' | 'urgent';
  status: 'sent' | 'delivered' | 'read' | 'replied';
  template: string;
}

const ReminderHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data
  const mockReminders: ReminderRecord[] = [
    {
      id: '1',
      sentDate: '2024-01-15 10:30',
      sentBy: 'audit.officer@railway.gov.in',
      recipient: 'mechanical.head@railway.gov.in',
      subject: 'Reminder: Pending Audit Cases - Action Required',
      paraNumbers: ['M/2024/001', 'M/2024/003'],
      priority: 'normal',
      status: 'read',
      template: 'reminder'
    },
    {
      id: '2',
      sentDate: '2024-01-14 14:15',
      sentBy: 'audit.officer@railway.gov.in',
      recipient: 'electrical.head@railway.gov.in',
      subject: 'URGENT: Overdue Audit Cases - Immediate Action Required',
      paraNumbers: ['E/2024/007'],
      priority: 'urgent',
      status: 'delivered',
      template: 'urgent'
    },
    {
      id: '3',
      sentDate: '2024-01-13 09:45',
      sentBy: 'audit.officer@railway.gov.in',
      recipient: 'civil.head@railway.gov.in',
      subject: 'Follow-up: Audit Case Status Update Required',
      paraNumbers: ['C/2024/002', 'C/2024/005', 'C/2024/008'],
      priority: 'high',
      status: 'replied',
      template: 'followup'
    }
  ];

  const filteredReminders = mockReminders.filter(reminder => {
    const matchesSearch = reminder.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.paraNumbers.some(para => para.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || reminder.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      sent: 'secondary',
      delivered: 'outline',
      read: 'default',
      replied: 'success'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants] as any}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      normal: 'secondary',
      high: 'warning',
      urgent: 'destructive'
    };
    
    return (
      <Badge variant={variants[priority as keyof typeof variants] as any}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Reminder History
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by recipient, subject, or para number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reminders Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Cases</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell className="text-sm">
                    {reminder.sentDate}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {reminder.recipient}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {reminder.subject}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {reminder.paraNumbers.map(para => (
                        <Badge key={para} variant="outline" className="text-xs">
                          {para}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(reminder.priority)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(reminder.status)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredReminders.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No reminders found matching your criteria.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReminderHistory;