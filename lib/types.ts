export type Role = "leader" | "worker";
export type TaskStatus = "pending" | "in_progress" | "completed" | "overdue";
export type TaskPriority = "low" | "medium" | "high";
export type TaskType = "individual" | "group";
export type MessageType = "text" | "image" | "video" | "audio" | "file";
export type CalendarEventType = "holiday" | "deadline" | "plan" | "meeting";

export interface Company {
  id: string;
  name: string;
  inviteCode: string;
  leaderCode: string;
  workerCode: string;
  ownerId: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  division: string;
  avatar: string;
  phone: string;
  joinDate: string;
  companyId?: string;
  isNew?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  type: MessageType;
  url: string;
  size: string;
}

export interface Submission {
  id: string;
  taskId: string;
  workerId: string;
  content: string;
  attachments: Attachment[];
  submittedAt: string;
  status: "submitted" | "reviewed" | "approved" | "rejected";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeIds: string[];
  leaderId: string;
  deadline: string;
  createdAt: string;
  attachments: Attachment[];
  submissions: Submission[];
  division: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  taskId?: string;
  chatId?: string;
  replyTo?: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  color: string;
  tags?: string[];
  pinned?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: CalendarEventType;
  taskId?: string;
  userId?: string;
  description?: string;
  color?: string;
}

export interface ChatContact {
  id: string;
  userId: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  online: boolean;
}
