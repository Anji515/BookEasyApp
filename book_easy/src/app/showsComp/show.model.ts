// show.model.ts
export interface Show {
  _id?: string;
  movie_id: string;
  theater_id: string;
  show_timing: string[]; // Array of show timings
  category: string[]; // Array of categories (e.g., Matinee, Evening)
  dates:string[]
}