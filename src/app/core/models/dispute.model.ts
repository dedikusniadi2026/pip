export interface DisputeTicket {
id: string;
bookingId: string;
openedBy: 'Tourist' | 'Driver';
reason: string;
status: 'Open' | 'Resolved';
resolutionNote?: string;
timestamp: string;
}