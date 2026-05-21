export type ApiUserRole = "student" | "admin" | "mentor";

export interface UserRead {
  id: number;
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  father_name: string;
  role: ApiUserRole;
  created_at: string;
  updated_at: string;
}

export interface UserUpdateName {
  first_name?: string | null;
  last_name?: string | null;
  father_name?: string | null;
}

export interface UserUpdateUnique {
  phone?: string | null;
  email?: string | null;
}

export function getUserDisplayName(
  user: Pick<UserRead, "first_name" | "last_name" | "father_name">
): string {
  return [user.last_name, user.first_name, user.father_name]
    .filter(Boolean)
    .join(" ");
}

export function getUserInitials(
  user: Pick<UserRead, "first_name" | "last_name">
): string {
  return `${user.first_name[0] ?? ""}${user.last_name[0] ?? ""}`.toUpperCase();
}
