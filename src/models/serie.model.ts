import { Saisons } from "./saison.model";
import { Media } from "./media.model";

export type SerieStatus = "En cours" | "Terminée";


export class Serie extends Media {

  public type: string = "serie";  

  constructor(
    id: string,
    titre: string,
    genre: string,
    annee: number,
    note: number,
    plateforme: string,
    public statut: SerieStatus,
    public saisons: Saisons[] = []
  ) {
    super(id, titre, genre, annee, note, plateforme);
  }

  markEpisodeAsWatched(episodeId: string): void {
    for (const saison of this.saisons) {
      const episode = saison.episodes.find(e => e.id === episodeId);
      if (episode) {
        episode.vu = true;
        return;
      }
    }
  }
}
