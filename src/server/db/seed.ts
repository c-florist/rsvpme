import bcrypt from "bcrypt";
import { drizzle } from "drizzle-orm/libsql";
import { ulid } from "ulid";
import type { Invitee } from "../services/event/schema";
import { InviteeResponses } from "../services/event/schema";
import * as schema from "./schema";

const db = drizzle({
  schema,
  connection: {
    url: "file:local/local.db",
    authToken: "local",
  },
});

async function seed() {
  console.log("🌱 Seeding database...");

  const sampleInvitees: Invitee[] = [
    { firstName: "John", lastName: "Doe", response: InviteeResponses.YES },
    { firstName: "Jane", lastName: "Smith", response: InviteeResponses.MAYBE },
    { firstName: "Bob", lastName: "Johnson", response: InviteeResponses.NO },
    { firstName: "Alice", lastName: "Brown", response: InviteeResponses.YES },
  ];

  const birthdayInvitees: Invitee[] = [
    { firstName: "Sarah", lastName: "Wilson", response: InviteeResponses.YES },
    { firstName: "Mike", lastName: "Davis", response: InviteeResponses.YES },
    { firstName: "Emma", lastName: "Garcia", response: InviteeResponses.MAYBE },
    { firstName: "Tom", lastName: "Miller", response: InviteeResponses.YES },
    { firstName: "Lisa", lastName: "Anderson", response: InviteeResponses.NO },
  ];

  const events = [
    {
      ulid: ulid(),
      password: await bcrypt.hash("password123", 12),
      title: "Team Building Workshop",
      description:
        "Join us for a fun team building workshop with activities, lunch, and networking opportunities.",
      address: "Conference Center, 123 Business Ave, Downtown",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      rsvpByDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      invitees: sampleInvitees,
    },
    {
      ulid: ulid(),
      password: await bcrypt.hash("birthday456", 12),
      title: "Sarah's 30th Birthday Party",
      description:
        "Come celebrate Sarah's milestone birthday! There will be cake, music, and lots of fun. Dress code: casual.",
      address: "Sarah's House, 456 Party Lane, Celebration City",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks from now
      rsvpByDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
      invitees: birthdayInvitees,
    },
    {
      ulid: ulid(),
      password: await bcrypt.hash("meeting789", 12),
      title: "Q1 Planning Meeting",
      description:
        "Important quarterly planning session for all department heads.",
      address: "Zoom Meeting (link will be sent separately)",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
      rsvpByDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      invitees: null,
    },
    {
      ulid: ulid(),
      password: await bcrypt.hash("wedding2024", 12),
      title: "Emma & Tom's Wedding",
      description:
        "You're invited to celebrate the wedding of Emma and Tom! Ceremony at 4 PM, reception to follow.",
      address: "Sunset Gardens, 789 Romance Road, Love Valley",
      date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months from now
      rsvpByDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month from now
      invitees: [
        {
          firstName: "James",
          lastName: "Wilson",
          response: InviteeResponses.YES,
        },
        {
          firstName: "Mary",
          lastName: "Taylor",
          response: InviteeResponses.YES,
        },
        {
          firstName: "David",
          lastName: "Clark",
          response: InviteeResponses.MAYBE,
        },
      ],
    },
    {
      ulid: ulid(),
      password: await bcrypt.hash("simple123", 12),
      title: "Coffee Chat",
      description: null,
      address: null,
      date: null,
      rsvpByDate: null,
      invitees: null,
    },
  ];

  try {
    await db.delete(schema.event);
    console.log("🗑️ Cleared existing events");

    for (const event of events) {
      await db.insert(schema.event).values(event);
      console.log(`✅ Created event: ${event.title}`);
    }

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
