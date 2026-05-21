export interface MonthlyScoreRead {
  id: number;
  student_id: number;
  month: number;
  year: number;
  academic_percent: number | null;
  attendance_percent: number | null;
  assignment_score: number | null;
  discipline_score: number | null;
  tutor_score: number | null;
  penalty_score: number | null;
  recovery_score: number | null;
  employment_score: number | null;
  created_at: string;
  updated_at: string;
}

export interface MonthlyScoreCreate {
  student_id: number;
  month: number;
  year: number;
  academic_percent?: number | null;
  attendance_percent?: number | null;
  assignment_score?: number | null;
  discipline_score?: number | null;
  tutor_score?: number | null;
  penalty_score?: number | null;
  recovery_score?: number | null;
  employment_score?: number | null;
}

export interface MonthlyScoreUpdate {
  academic_percent?: number | null;
  attendance_percent?: number | null;
  assignment_score?: number | null;
  discipline_score?: number | null;
  tutor_score?: number | null;
  penalty_score?: number | null;
  recovery_score?: number | null;
  employment_score?: number | null;
}
