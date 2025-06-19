import { db } from "~/db";
import { user as userTable } from "~/db/schema";
import type { User } from "./schema";

class UserService {
  async create(user: User) {
    return await db.insert(userTable).values(user).returning();
  }

  async getByClerkId(clerkId: User["clerkId"]) {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.clerkId, clerkId),
    });
  }
}

export default new UserService();
