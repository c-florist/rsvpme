import bcrypt from "bcrypt";
import { ulid } from "ulid";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EventService from "./service";

vi.mock("bcrypt");
vi.mock("ulid");
vi.mock("~/server/db", () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  },
}));

const mockBcrypt = vi.mocked(bcrypt);
const mockUlid = vi.mocked(ulid);

describe("EventService", () => {
  describe("generatePassword", () => {
    it("should return a string of the correct length", () => {
      expect(EventService.generatePassword()).toHaveLength(10);
    });

    it("should only use base62 characters", () => {
      const pw = EventService.generatePassword();
      expect(pw).toMatch(/^[A-Za-z0-9]+$/);
    });

    it("should produce different passwords each time", () => {
      expect(EventService.generatePassword()).not.toEqual(
        EventService.generatePassword(),
      );
    });
  });

  describe("create", () => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockBcrypt.hash;
      mockUlid.mockReturnValue("test_ulid_123");

      vi.spyOn(EventService, "generatePassword").mockReturnValue(
        "test_password",
      );
    });

    it("should return plain text password for user", async () => {
      const eventData = { title: "Test Event", invitees: [] };

      const result = await EventService.create(eventData);

      expect(result.password).toBe("test_password");
    });
  });
});
