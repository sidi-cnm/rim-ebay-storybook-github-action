import { Annonce } from "@/app/types";
import { Filters } from "./handleGetAnnonces";

export interface IPageAnnonce {
  totalPages: number;
  annonces: Annonce[];
}
export interface IHandleGetAnnonces {
  (filters?: Filters): Promise<{
    pageAnnonceData: IPageAnnonce | null;
    errorMessage: string;
  }>;
}
