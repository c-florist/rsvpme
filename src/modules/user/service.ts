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

  async verifyExists(clerkId: User["clerkId"]) {
    try {
      const user = await this.getByClerkId(clerkId);
      if (user) {
        console.log(`User already exists with clerkId: ${clerkId}`);
        return true;
      }

      await this.create({ clerkId });
      console.log(`User created with clerkId: ${clerkId}`);

      return true;
    } catch (error) {
      console.error(`Error verifying user with clerkId: ${clerkId}`, error);
      return false;
    }
  }
}

export default new UserService();
