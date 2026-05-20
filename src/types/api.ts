export interface ValidationErrorItem {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationErrorItem[];
}

export interface PaginatedParams {
  page?: number;
  limit?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}
