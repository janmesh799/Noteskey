import { INote } from "../Model/Note";

export type DashboardData = {
  userId: string;
  name: string;
  email: string;
  numberOfTotalNotes: number;
  numberOfNotesSharedWithMe: number;
  numberOfNotesCreatedByMe: number;
  numberOfFavoriteNotes: number;
  notesWithTags: {
    tagName: string;
    count: number;
  }[];
  recentlyCreated: INote[];
};
