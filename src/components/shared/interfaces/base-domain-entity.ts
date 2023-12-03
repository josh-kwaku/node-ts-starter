export abstract class DomainEntity {
  private readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
}
