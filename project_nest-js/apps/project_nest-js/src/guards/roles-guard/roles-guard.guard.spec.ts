import { RolesGuardGuard } from './roles-guard.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuardGuard', () => {
  let rolesGuardGuard: RolesGuardGuard;

  beforeEach(() => {
    rolesGuardGuard = new RolesGuardGuard( new Reflector());
  });

  it('should be defined', () => {
    expect(rolesGuardGuard).toBeDefined();
  });
});
