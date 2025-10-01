import { Media } from "./media.model";

export class Film extends Media {

  public type: string = "film";
    
  constructor(
    id: string,
    titre: string,
    genre: string,
    annee: number,
    note: number,
    public plateforme: string,
    public duree: number,
    public vu: boolean = false
  ) {
    super(id, titre, genre, annee, note,plateforme);
  }
}