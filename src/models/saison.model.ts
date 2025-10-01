import { Episode } from "./episode.model";

export class Saisons {
  constructor(public numero: number, public episodes: Episode[] = []) {}
}
