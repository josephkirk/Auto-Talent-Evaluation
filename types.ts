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

export interface AwardType {
  id: number;
  name: string;
  created_at: string;
}

export interface Award {
  id: number;
  employee_id: number;
  award_type_id: number;
  award_date: string;
  created_at: string;
  // Joined field from award_types
  award_type_name?: string;
}

export interface EmployeeWithStats extends Employee {
  accomplishment_count: number;
  observation_count: number;
  award_count: number;
}

export type Framework = 'OKR' | 'BARS' | 'MBO' | 'Competency';

export type ReportPeriod = 'yearly' | 'Q1' | 'Q2' | 'Q3' | 'Q4';
