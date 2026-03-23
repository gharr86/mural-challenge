let seq = 0;

export function nanoid(): string {
  seq += 1;
  return `mock-${seq}`;
}

export function resetNanoidMock(): void {
  seq = 0;
}
