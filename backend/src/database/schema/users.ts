import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userRoleEnum } from './enums';
import { reports } from './reports';
import { reactions } from './interactions';
import { subscriptions } from './interactions';
import { moderationReports, auditLogs } from './moderation';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  displayName: text('display_name').notNull(),
  passwordHash: text('password_hash').notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  trustScore: integer('trust_score').default(50).notNull(),
  isBanned: boolean('is_banned').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  reports: many(reports),
  reactions: many(reactions),
  subscriptions: many(subscriptions),
  moderationReports: many(moderationReports),
  auditLogs: many(auditLogs),
}));
