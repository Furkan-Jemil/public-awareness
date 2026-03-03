import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', [
  'user',
  'admin',
  'super_admin',
]);
export const urgencyLevelEnum = pgEnum('urgency_level', [
  'info',
  'warning',
  'critical',
]);
export const reportStatusEnum = pgEnum('report_status', [
  'published',
  'under_review',
  'removed',
  'verified',
]);
export const mediaTypeEnum = pgEnum('media_type', ['image', 'video']);
export const processingStatusEnum = pgEnum('processing_status', [
  'pending',
  'processing',
  'completed',
  'failed',
]);
export const moderationStatusEnum = pgEnum('moderation_status', [
  'pending',
  'resolved',
]);
