export abstract class Media {
  constructor(
    public id: string,
    public titre: string,
    public genre: string,
    public annee: number,
    public note: number,
    public plateforme: string
  ) {}


  getSummary(): string {
    return `${this.titre} (${this.annee}) - ${this.genre}, Rating: ${this.note}`;
  }
}
