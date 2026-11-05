import { index, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const enquiryStatus = pgEnum("enquiry_status", ["new", "contacted", "quoted", "won", "lost", "spam"]);
export const leadEventType = pgEnum("lead_event_type", ["whatsapp_click", "call_click", "email_click", "map_click"]);

/** Every enquiry submitted through the website forms. */
export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    status: enquiryStatus("status").notNull().default("new"),

    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    company: text("company"),

    service: text("service"),
    machine: text("machine"),
    component: text("component"),
    material: text("material"),
    odMm: integer("od_mm"),
    faceWidthMm: integer("face_width_mm"),
    moduleValue: text("module_value"),
    quantity: text("quantity"),
    message: text("message"),

    // Attribution — which page / campaign produced the lead.
    sourcePage: text("source_page"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    referrer: text("referrer"),

    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
  },
  (t) => [index("enquiries_created_idx").on(t.createdAt), index("enquiries_status_idx").on(t.status)],
);

/** Tap-to-call / WhatsApp / email clicks — high-intent leads that never touch the form. */
export const leadEvents = pgTable(
  "lead_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    type: leadEventType("type").notNull(),
    page: text("page").notNull(),
    label: text("label"),
    ipHash: text("ip_hash"),
  },
  (t) => [index("lead_events_created_idx").on(t.createdAt)],
);

/** Customer reviews submitted from the site. Held until approved by the owner. */
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  approved: integer("approved").notNull().default(0),
  name: text("name").notNull(),
  company: text("company"),
  role: text("role"),
  rating: integer("rating"),
  body: text("body").notNull(),
  ipHash: text("ip_hash"),
});

export type NewEnquiry = typeof enquiries.$inferInsert;
