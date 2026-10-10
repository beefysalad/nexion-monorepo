// Jest cannot load the ESM-only Better Auth packages, and unit tests do not
// exercise auth. Use the e2e setup for real auth behavior.
class AuthModuleStub {}

export const AuthModule = {
  forRootAsync: () => ({ module: AuthModuleStub }),
}

export const AllowAnonymous = () => () => undefined
