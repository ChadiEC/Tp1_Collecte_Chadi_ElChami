export class Episode {
  constructor(
    public id: string,
    public titre: string,
    public duree: number,
    public episodeNumber: number,
    public vu: boolean = false
  ) {}
}