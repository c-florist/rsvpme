import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { ulid } from "ulid";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import { type CreateEvent, InviteeResponses } from "./schema";

class EventService {
  generatePassword() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const bytes = randomBytes(10);
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars[bytes[i] % chars.length];
    }
    return password;
  }

  async create(event: CreateEvent) {
    const eventUlid = ulid();
    const password = this.generatePassword();
    const hashedPassword = await bcrypt.hash(password, 12);
    const invitees = event.invitees.map((invitee) => ({
      ...invitee,
      response: InviteeResponses.PENDING,
    }));

    await db.insert(schema.event).values({
      ...event,
      ulid: eventUlid,
      password: hashedPassword,
      invitees,
    });

    return {
      ulid: eventUlid,
      password,
    };
  }

  async get({ ulid, password }: { ulid: string; password: string }) {
    const event = await db.query.event.findFirst({
      where: eq(schema.event.ulid, ulid),
    });

    if (!event) {
      throw new Error("Event not found");
    }

    const isPasswordValid = await bcrypt.compare(password, event.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return event;
  }
}

export default new EventService();
