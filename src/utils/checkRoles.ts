import { ADMIN, EMPLOYEE, SUPERADMIN } from 'src/constants/constants';

export function checkRole(role: string) {
  if (role === SUPERADMIN) {
    return true;
  } else if (role === ADMIN) {
    return true;
  } else if (role === EMPLOYEE) {
    return true;
  } else {
    return false;
  }
}
