import { describe, expect, it } from "vitest";
import { isAllowedLogin } from "./auth-callbacks";

describe("isAllowedLogin", () => {
  it("allows the configured admin login (case-insensitive)", () => {
    expect(isAllowedLogin("lodhiPlayBits", "lodhiPlayBits")).toBe(true);
    expect(isAllowedLogin("lodhiPlayBits", "lodhiPlayBits")).toBe(true);
  });
  it("rejects any other login", () => {
    expect(isAllowedLogin("someone-else", "lodhiPlayBits")).toBe(false);
  });
  it("rejects null/undefined login", () => {
    expect(isAllowedLogin(null, "lodhiPlayBits")).toBe(false);
    expect(isAllowedLogin(undefined, "lodhiPlayBits")).toBe(false);
  });
  it("rejects everyone when admin login is unset", () => {
    expect(isAllowedLogin("lodhiPlayBits", undefined)).toBe(false);
  });
});
