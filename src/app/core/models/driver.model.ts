export type ContractStatus = 'Active' | 'On Leave' | 'Inactive' | 'Rejected' | 'Suspended';

export interface CurrentVehicle {
  vehicleId: string;
  plateNumber: string;
  vehicleType: string;
  year: number;
  vehicleStatus: string;
  nextServiceSchedule: string;
}

export interface ActiveTask {
  taskId: string | null;
  taskStatus: string;
  destination: string | null;
  notes: string;
}

export interface TaskHistory {
  taskId: string;
  status: string;
  destination: string;
  completionDate: string;
}

export interface Driver {
  driverId: string;
  fullName: string;
  licenseNumber: string;
  birthDate: string;
  joinDate: string;
  contractStatus: ContractStatus;  // <--- pakai type ContractStatus
  dateOfBirth: string;
  joinedDate: string;
  currentVehicle: CurrentVehicle | null;
  activeTask: ActiveTask | null;
  recentTaskHistory: TaskHistory[];
  notes?: string; // untuk reject reason
}
