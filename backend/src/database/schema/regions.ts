import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const cities = pgTable('cities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').unique().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const areas = pgTable(
  'areas',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    cityId: uuid('city_id')
      .references(() => cities.id, { onDelete: 'cascade' })
      .notNull(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    cityIdx: index('idx_areas_city_id').on(t.cityId),
  }),
);

export const citiesRelations = relations(cities, ({ many }) => ({
  areas: many(areas),
}));

export const areasRelations = relations(areas, ({ one }) => ({
  city: one(cities, {
    fields: [areas.cityId],
    references: [cities.id],
  }),
}));
