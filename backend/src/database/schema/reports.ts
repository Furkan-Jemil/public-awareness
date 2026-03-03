import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  index,
  customType,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { urgencyLevelEnum, reportStatusEnum } from './enums';
import { users } from './users';
import { cities, areas } from './regions';
import { categories } from './categories';
import { media } from './media';
import { reactions } from './interactions';
import { moderationReports } from './moderation';

// Custom type for tsvector since Drizzle's pg-core doesn't have it natively yet
const tsvector = customType<{ data: string }>({
  dataType() {
    return 'tsvector';
  },
});

export const reports = pgTable(
  'reports',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    categoryId: uuid('category_id')
      .references(() => categories.id)
      .notNull(),
    urgencyLevel: urgencyLevelEnum('urgency_level').notNull(),
    cityId: uuid('city_id')
      .references(() => cities.id)
      .notNull(),
    areaId: uuid('area_id')
      .references(() => areas.id)
      .notNull(),
    specificPlaceName: text('specific_place_name'),
    status: reportStatusEnum('status').default('under_review').notNull(),
    confidenceScore: integer('confidence_score').default(0).notNull(),
    reporterId: uuid('reporter_id')
      .references(() => users.id)
      .notNull(),
    reportsVotes: integer('reports_votes').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    expiresAt: timestamp('expires_at'),
    searchVector: tsvector('search_vector').generatedAlwaysAs(
      (): any => sql`
      setweight(to_tsvector('english', coalesce(${reports.title}, '')), 'A') ||
      setweight(to_tsvector('english', coalesce(${reports.description}, '')), 'B') ||
      setweight(to_tsvector('english', coalesce(${reports.specificPlaceName}, '')), 'C')
    `,
    ),
  },
  (t) => ({
    cityIdx: index('idx_reports_city_id').on(t.cityId),
    areaIdx: index('idx_reports_area_id').on(t.areaId),
    categoryIdx: index('idx_reports_category_id').on(t.categoryId),
    statusIdx: index('idx_reports_status').on(t.status),
    urgencyIdx: index('idx_reports_urgency_level').on(t.urgencyLevel),
    createdAtIdx: index('idx_reports_created_at').on(t.createdAt),
    // Compound indexes for dashboards
    cityStatusCreatedIdx: index('idx_reports_city_status_created').on(
      t.cityId,
      t.status,
      t.createdAt,
    ),
    areaStatusCreatedIdx: index('idx_reports_area_status_created').on(
      t.areaId,
      t.status,
      t.createdAt,
    ),
    searchIdx: index('idx_reports_search_vector').using('gin', t.searchVector),
  }),
);

export const reportsRelations = relations(reports, ({ one, many }) => ({
  reporter: one(users, {
    fields: [reports.reporterId],
    references: [users.id],
  }),
  city: one(cities, {
    fields: [reports.cityId],
    references: [cities.id],
  }),
  area: one(areas, {
    fields: [reports.areaId],
    references: [areas.id],
  }),
  category: one(categories, {
    fields: [reports.categoryId],
    references: [categories.id],
  }),
  media: many(media),
  reactions: many(reactions),
  moderationReports: many(moderationReports),
}));
