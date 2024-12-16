import { pgTable, serial, varchar, timestamp, boolean, PgArray, text, primaryKey, integer } from "drizzle-orm/pg-core";
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import type { AdapterAccount } from "next-auth/adapters"

const pool = postgres(process.env.DB_URL!, { max: 1 })
 
export const db = drizzle(pool)


export const vocabs = pgTable("vocabs", {
  id: serial("id").primaryKey(),
  language: varchar("language", { length: 255 }),
  vocabs: varchar("vocabs", { length: 255 }),
  created_at: timestamp("created_at", { withTimezone: false }),
});

export const worksheetsTable = pgTable("worksheets", {
  id: serial("id").primaryKey().notNull(),
  language: varchar("language", { length: 255 }).notNull(),
  questions: text("questions").array().default([]).notNull(),
  topics: text("topics").array().default([]).notNull(),
  created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
  name: varchar("name", { length: 255 }).notNull(),
  visibility: boolean("visibility").default(false).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),

});

export const resourceTable = pgTable("resource", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  created_at: timestamp("created_at", { withTimezone: false }).defaultNow(),
  userId: varchar("userId", { length: 255 }).notNull(),
  text: text("text").notNull(),
  chunkStartId: integer("chunkStartId").array().default([]),
  chunkEndId: integer("chunkEndId").array().default([]),
  textArray: text("textArray").array().default([]),
});

export const usersTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
})
 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)
 
export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
})
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)
 
export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  // (authenticator) => ({
  //   compositePK: primaryKey({
  //     columns: [authenticator.userId, authenticator.credentialID],
  //   }),
  // })
)
