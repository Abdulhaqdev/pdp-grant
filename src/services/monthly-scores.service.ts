import type {
  MonthlyScoreCreate,
  MonthlyScoreRead,
  MonthlyScoreUpdate,
} from "@/types/monthly-score";

import { apiClient } from "@/services/api-client";
import { ENDPOINTS } from "@/services/endpoints";
import { studentsService } from "@/services/students.service";

export const monthlyScoresService = {
  async create(payload: MonthlyScoreCreate): Promise<MonthlyScoreRead> {
    const { data } = await apiClient.post<MonthlyScoreRead>(
      ENDPOINTS.monthlyScores.create,
      payload
    );
    return data;
  },

  async update(
    scoreId: number,
    payload: MonthlyScoreUpdate
  ): Promise<MonthlyScoreRead> {
    const { data } = await apiClient.patch<MonthlyScoreRead>(
      ENDPOINTS.monthlyScores.update(scoreId),
      payload
    );
    return data;
  },

  /**
   * Updates tutor score via PATCH /user/monthly-score/{score_id}.
   * Avoids PATCH /user/monthly-score/tutor — the backend matches "tutor" as score_id.
   */
  async updateTutorScore(params: {
    /** Business student_id (MonthlyScoreCreate / tutor query param). */
    student_id: number;
    /** User record id for GET .../student/{id}/performance. */
    user_id: number;
    month: number;
    year: number;
    tutor_score: number;
  }): Promise<MonthlyScoreRead> {
    const scores = await studentsService.getPerformance(params.user_id);
    const existing = scores.find(
      (s) => s.month === params.month && s.year === params.year
    );

    if (existing) {
      return this.update(existing.id, { tutor_score: params.tutor_score });
    }

    return this.create({
      student_id: params.student_id,
      month: params.month,
      year: params.year,
      tutor_score: params.tutor_score,
    });
  },
};
