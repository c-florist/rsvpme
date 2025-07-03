import { randomBytes } from "node:crypto";
import bcrypt from "bcrypt";
import { ulid } from "ulid";
import { db } from "~/server/db";
import * as schema from "~/server/db/schema";
import type { CreateEvent } from "./schema";

class EventService {
  private generatePassword() {
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

    await db.insert(schema.event).values({
      ...event,
      ulid: eventUlid,
      password: hashedPassword,
    });

    return {
      eventUlid,
      password,
    };
  }
}

export default new EventService();
