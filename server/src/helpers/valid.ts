import validator from 'validator';

export function validEmail(email: string): boolean {
  let valid: boolean = true;
  valid = validator.isEmail(email);
  return valid;
}

export function validPassword(password: string): boolean {
  let valid: boolean = true;
  valid = validator.isLength(password, { min: 8, max: 21 });
  if (!valid) return valid;
  valid = validator.isAlphanumeric(password);
  return valid;
}

export function validPlan(plan: string): boolean {
  let valid: boolean = true;
  valid = validator.isIn(plan, ['pl-1', 'pl-2', 'pl-3']);
  return valid;
}
