export interface Employee {
  id: number;
  name: string;
  role: string;
  created_at: string;
}

export interface Accomplishment {
  id: number;
  employee_id: number;
  description: string;
  period: string;
  created_at: string;
}

export interface Observation {
  id: number;
  employee_id: number;
  description: string;
  category: 'attitude' | 'performance' | 'teamwork' | 'other';
  created_at: string;
}

export interface EmployeeWithStats extends Employee {
  accomplishment_count: number;
  observation_count: number;
}

export type Framework = 'OKR' | 'BARS' | 'MBO' | 'Competency';

export type ReportPeriod = 'yearly' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
