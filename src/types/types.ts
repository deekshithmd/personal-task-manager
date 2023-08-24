export interface LoginDataType {
  email: string;
  password: string;
}

export interface SignupDataType {
  email: string;
  password: string;
  confirm: string;
}

export interface AddTaskType {
  taskName: string;
  taskDescription: string;
  uid: string;
}

export interface TaskType {
  id?: string;
  taskName?: string;
  taskDescription?: string;
  isCompleted?: boolean;
}
