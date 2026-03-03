ALTER TABLE "reports" ADD COLUMN "search_vector" "tsvector" GENERATED ALWAYS AS (
      setweight(to_tsvector('english', coalesce("reports"."title", '')), 'A') ||
      setweight(to_tsvector('english', coalesce("reports"."description", '')), 'B') ||
      setweight(to_tsvector('english', coalesce("reports"."specific_place_name", '')), 'C')
    ) STORED;--> statement-breakpoint
CREATE INDEX "idx_reports_created_at" ON "reports" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "idx_reports_search_vector" ON "reports" USING gin ("search_vector");