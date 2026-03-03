import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { mediaTypeEnum, processingStatusEnum } from './enums';
import { reports } from './reports';

export const media = pgTable(
  'media',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    reportId: uuid('report_id')
      .references(() => reports.id, { onDelete: 'cascade' })
      .notNull(),
    type: mediaTypeEnum('type').notNull(),
    url: text('url').notNull(),
    thumbnailUrl: text('thumbnail_url'),
    duration: integer('duration'), // Seconds if video
    processingStatus: processingStatusEnum('processing_status')
      .default('pending')
      .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => ({
    reportIdIdx: index('idx_media_report_id').on(t.reportId),
  }),
);

export const mediaRelations = relations(media, ({ one }) => ({
  report: one(reports, {
    fields: [media.reportId],
    references: [reports.id],
  }),
}));
