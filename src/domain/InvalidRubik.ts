export class InvalidRubikError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRubikError';
  }
}
