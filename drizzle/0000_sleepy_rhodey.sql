CREATE TYPE "public"."enquiry_status" AS ENUM('new', 'contacted', 'quoted', 'won', 'lost', 'spam');--> statement-breakpoint
CREATE TYPE "public"."lead_event_type" AS ENUM('whatsapp_click', 'call_click', 'email_click', 'map_click');--> statement-breakpoint
CREATE TABLE "enquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" "enquiry_status" DEFAULT 'new' NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"company" text,
	"service" text,
	"machine" text,
	"component" text,
	"material" text,
	"od_mm" integer,
	"face_width_mm" integer,
	"module_value" text,
	"quantity" text,
	"message" text,
	"source_page" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"referrer" text,
	"ip_hash" text,
	"user_agent" text
);
--> statement-breakpoint
CREATE TABLE "lead_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"type" "lead_event_type" NOT NULL,
	"page" text NOT NULL,
	"label" text,
	"ip_hash" text
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved" integer DEFAULT 0 NOT NULL,
	"name" text NOT NULL,
	"company" text,
	"role" text,
	"rating" integer,
	"body" text NOT NULL,
	"ip_hash" text
);
--> statement-breakpoint
CREATE INDEX "enquiries_created_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "enquiries_status_idx" ON "enquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "lead_events_created_idx" ON "lead_events" USING btree ("created_at");