import { getAuthSecret, getTrustedOrigins } from "./auth.config"

describe("auth config", () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
  })

  describe("getAuthSecret", () => {
    it("throws when BETTER_AUTH_SECRET is missing", () => {
      delete process.env.BETTER_AUTH_SECRET

      expect(() => getAuthSecret()).toThrow(/BETTER_AUTH_SECRET/)
    })

    it("throws when the secret is too short", () => {
      process.env.BETTER_AUTH_SECRET = "short"

      expect(() => getAuthSecret()).toThrow(/at least 32/)
    })

    it("returns a sufficiently long secret", () => {
      process.env.BETTER_AUTH_SECRET = "x".repeat(32)

      expect(getAuthSecret()).toBe("x".repeat(32))
    })
  })

  describe("getTrustedOrigins", () => {
    it("defaults to the local web origin", () => {
      delete process.env.CORS_ORIGIN

      expect(getTrustedOrigins()).toEqual(["http://localhost:3000"])
    })

    it("splits and trims a comma-separated list", () => {
      process.env.CORS_ORIGIN = "https://a.example.com, https://b.example.com ,"

      expect(getTrustedOrigins()).toEqual([
        "https://a.example.com",
        "https://b.example.com",
      ])
    })
  })
})
