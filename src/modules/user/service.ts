import { db } from "~/db";
import { user as userTable } from "~/db/schema";
import type { User } from "./schema";

class UserService {
  async create(user: User) {
    const [newUser] = await db.insert(userTable).values(user).returning();

    return newUser;
  }

  async getByClerkId(clerkId: User["clerkId"]) {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.clerkId, clerkId),
    });
  }

  async ensureExists(clerkId: User["clerkId"]) {
    try {
      const existingUser = await this.getByClerkId(clerkId);
      if (existingUser) {
        return { user: existingUser, created: false };
      }

      const newUser = await this.create({ clerkId });
      return { user: newUser, created: true };
    } catch (error) {
      console.error(
        `Error ensuring user exists with clerkId: ${clerkId}:`,
        error,
      );
      throw error;
    }
  }
}

export default new UserService();
