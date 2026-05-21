import type { GroupRead } from "@/types/group";
import type { StudentReadSlim } from "@/types/student";

export type MentorStudentRow = StudentReadSlim & {
  group_number: string;
};

export function flattenMentorStudents(
  groups: GroupRead[] | undefined
): MentorStudentRow[] {
  if (!groups?.length) return [];

  const rows: MentorStudentRow[] = [];
  for (const group of groups) {
    for (const student of group.students ?? []) {
      rows.push({
        user_id: student.user_id,
        student_id: student.student_id,
        group_id: student.group_id ?? group.id,
        is_grant: student.is_grant,
        course_number: student.course_number,
        attendance: student.attendance,
        academic: student.academic,
        assignment: student.assignment,
        group_number: group.group_number,
      });
    }
  }
  return rows;
}

export function countMentorStudents(groups: GroupRead[] | undefined): number {
  return flattenMentorStudents(groups).length;
}

export function filterMentorStudents(
  students: MentorStudentRow[],
  search: string
): MentorStudentRow[] {
  if (!search) return students;
  const q = search.toLowerCase();
  return students.filter(
    (s) =>
      String(s.student_id).includes(q) ||
      String(s.user_id).includes(q) ||
      s.group_number.toLowerCase().includes(q)
  );
}
