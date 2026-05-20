export interface LeaderboardRow {
  student_name: string;
  group_name: string | null;
  student_id: number;
  current_status: string;
  academic_percent: number;
  academic_ball: number;
  attendance_percent: number;
  attendance_ball: number;
  assignment_ball: number;
  activity_ball: number;
  tutor_ball: number;
  discipline_ball: number;
  total_kpi: number;
  penalty: number;
  recovery: number;
  employment: number;
  final_score: number;
  next_status: string;
  risk: string;
}
