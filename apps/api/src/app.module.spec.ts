import { APP_GUARD } from '@nestjs/core';
import { AppModule } from './app.module';

type ModuleImport = {
  module?: {
    name?: string;
  };
};

type ProviderDefinition = {
  provide?: unknown;
  useClass?: {
    name?: string;
  };
};

function isModuleImport(value: unknown): value is ModuleImport {
  return typeof value === 'object' && value !== null && 'module' in value;
}

function isProviderDefinition(value: unknown): value is ProviderDefinition {
  return typeof value === 'object' && value !== null && 'provide' in value;
}

describe('AppModule rate limiting', () => {
  const moduleImports = Reflect.getMetadata('imports', AppModule) as
    | unknown[]
    | undefined;
  const providers = Reflect.getMetadata('providers', AppModule) as
    | unknown[]
    | undefined;

  it('configures the Nest throttler module', () => {
    expect(
      (moduleImports ?? []).some(
        (moduleImport) =>
          isModuleImport(moduleImport) &&
          moduleImport.module?.name === 'ThrottlerModule',
      ),
    ).toBe(true);
  });

  it('registers the throttler guard globally', () => {
    expect(
      (providers ?? []).some(
        (provider) =>
          isProviderDefinition(provider) &&
          provider.provide === APP_GUARD &&
          provider.useClass?.name === 'ThrottlerGuard',
      ),
    ).toBe(true);
  });
});
