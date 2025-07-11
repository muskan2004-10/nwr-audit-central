import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Send, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailComposerProps {
  selectedParas: any[];
  onClose: () => void;
  onSent: () => void;
}

const EmailComposer: React.FC<EmailComposerProps> = ({ selectedParas, onClose, onSent }) => {
  const [emailData, setEmailData] = useState({
    to: '',
    cc: '',
    subject: '',
    message: '',
    template: '',
    priority: 'normal'
  });
  const [isPreview, setIsPreview] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const emailTemplates = {
    reminder: {
      subject: 'Reminder: Pending Audit Cases - Action Required',
      message: `Dear Department Head,

This is a gentle reminder regarding the following pending audit cases assigned to your department:

[PARA_LIST]

These cases require your immediate attention and action. Please review and provide the necessary documentation or clarification at your earliest convenience.

The audit timeline is critical, and delays may impact the overall audit process.

For any queries or assistance, please contact the Audit Department.

Best regards,
Audit Department
Railway Audit Office`
    },
    urgent: {
      subject: 'URGENT: Overdue Audit Cases - Immediate Action Required',
      message: `Dear Department Head,

This is an URGENT reminder regarding overdue audit cases from your department:

[PARA_LIST]

These cases are significantly overdue and require IMMEDIATE action. Please prioritize these cases and provide the required documentation/response by [DEADLINE].

Failure to respond may result in escalation to higher authorities.

Please contact us immediately if you need any clarification.

Urgent regards,
Audit Department
Railway Audit Office`
    },
    followup: {
      subject: 'Follow-up: Audit Case Status Update Required',
      message: `Dear Department Head,

We are following up on the status of the following audit cases:

[PARA_LIST]

Please provide an update on the current status and expected timeline for resolution.

If you have already taken action, please share the relevant documentation.

Thank you for your cooperation.

Best regards,
Audit Department
Railway Audit Office`
    }
  };

  const handleTemplateSelect = (template: string) => {
    if (template && emailTemplates[template as keyof typeof emailTemplates]) {
      const selectedTemplate = emailTemplates[template as keyof typeof emailTemplates];
      setEmailData(prev => ({
        ...prev,
        template,
        subject: selectedTemplate.subject,
        message: selectedTemplate.message
      }));
    }
  };

  const generateParaList = () => {
    return selectedParas.map(para => 
      `• Para No: ${para.paraNumber} - ${para.description} (Due: ${para.dueDate})`
    ).join('\n');
  };

  const getProcessedMessage = () => {
    return emailData.message.replace('[PARA_LIST]', generateParaList());
  };

  const handleSend = async () => {
    if (!emailData.to || !emailData.subject || !emailData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Email Sent Successfully",
        description: `Reminder sent to ${emailData.to} for ${selectedParas.length} pending cases.`
      });
      
      onSent();
    } catch (error) {
      toast({
        title: "Failed to Send Email",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Compose Reminder Email
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Selected Paras Summary */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Selected Cases ({selectedParas.length})</h4>
          <div className="flex flex-wrap gap-2">
            {selectedParas.map(para => (
              <Badge key={para.id} variant="secondary">
                {para.paraNumber}
              </Badge>
            ))}
          </div>
        </div>

        {/* Email Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="template">Email Template</Label>
              <Select value={emailData.template} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reminder">Standard Reminder</SelectItem>
                  <SelectItem value="urgent">Urgent Reminder</SelectItem>
                  <SelectItem value="followup">Follow-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={emailData.priority} onValueChange={(value) => setEmailData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="to">To (Required)</Label>
              <Input
                id="to"
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="department.head@railway.gov.in"
              />
            </div>

            <div>
              <Label htmlFor="cc">CC</Label>
              <Input
                id="cc"
                type="email"
                value={emailData.cc}
                onChange={(e) => setEmailData(prev => ({ ...prev, cc: e.target.value }))}
                placeholder="supervisor@railway.gov.in"
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={emailData.subject}
            onChange={(e) => setEmailData(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={emailData.message}
            onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Enter your message"
            rows={12}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Use [PARA_LIST] to automatically insert the list of selected cases.
          </p>
        </div>

        {/* Preview */}
        {isPreview && (
          <div className="border rounded-lg p-4 bg-background">
            <h4 className="font-medium mb-2">Email Preview</h4>
            <div className="space-y-2 text-sm">
              <p><strong>To:</strong> {emailData.to}</p>
              {emailData.cc && <p><strong>CC:</strong> {emailData.cc}</p>}
              <p><strong>Subject:</strong> {emailData.subject}</p>
              <div className="border-t pt-2 mt-2">
                <pre className="whitespace-pre-wrap font-sans">{getProcessedMessage()}</pre>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSend} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Email'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailComposer;