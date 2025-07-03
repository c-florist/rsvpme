import { describe, expect, it } from "vitest";
import EventService from "./service";

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
