export interface UserMessages {
  id: string | null;
  senderName: string | null;
  senderImageUrl: string | null;
  recipientName: string | null;
  recipientImageUrl: string | null;
  content: string | null;
  dateRead: Date | null;
  senderDeleted: boolean;
  recipientDeleted: boolean;
  senderId: string | null;
  recipientId: string | null;
}
