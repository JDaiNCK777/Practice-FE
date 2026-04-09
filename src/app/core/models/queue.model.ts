export interface User {
  id: string;
  fullName: string;
  studentId: string;
  email: string;
  age?: number;
  sex?: string;
  birthday?: string;
  courseYear?: string;
}

export interface QueueEntry {
  queueNumber: string;
  counter: string;
  timeJoined: string;
  status: 'waiting' | 'serving' | 'served' | 'cancelled' | 'missed';
}

export interface HomeState {
  nowServing: string | null;
  myQueueNumber: string | null;
  peopleAhead: number;
  estimatedWaitMinutes: number;
  queueAvailable: boolean;
}