import {
  pgTable,
  uuid,
  boolean,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users';
import { reports } from './reports';
import { cities, areas } from './regions';
import { categories } from './categories';

export const reactions = pgTable(
  'reactions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    reportId: uuid('report_id')
      .references(() => reports.id, { onDelete: 'cascade' })
      .notNull(),
    userId: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    isFake: boolean('is_fake').default(false).notNull(), // true = "Fake", false = "Real"
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    userReportUniqueIdx: uniqueIndex('idx_reactions_user_report').on(
      t.userId,
      t.reportId,
    ),
  }),
);

export const reactionsRelations = relations(reactions, ({ one }) => ({
  user: one(users, {
    fields: [reactions.userId],
    references: [users.id],
  }),
  report: one(reports, {
    fields: [reactions.reportId],
    references: [reports.id],
  }),
}));

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  cityId: uuid('city_id').references(() => cities.id, { onDelete: 'cascade' }),
  areaId: uuid('area_id').references(() => areas.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  city: one(cities, {
    fields: [subscriptions.cityId],
    references: [cities.id],
  }),
  area: one(areas, {
    fields: [subscriptions.areaId],
    references: [areas.id],
  }),
  category: one(categories, {
    fields: [subscriptions.categoryId],
    references: [categories.id],
  }),
}));
