import type { MonthlyScoreCreate, MonthlyScoreRead } from "@/types/monthly-score";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";

export const monthlyScoresService = {
  async create(payload: MonthlyScoreCreate): Promise<MonthlyScoreRead> {
    const { data } = await apiClient.post<MonthlyScoreRead>(
      ENDPOINTS.monthlyScores.create,
      payload
    );
    return data;
  },

  async updateTutorScore(params: {
    student_id: number;
    month: number;
    year: number;
    tutor_score: number;
  }): Promise<MonthlyScoreRead> {
    const { data } = await apiClient.patch<MonthlyScoreRead>(
      ENDPOINTS.monthlyScores.updateTutor,
      null,
      { params }
    );
    return data;
  },
};
