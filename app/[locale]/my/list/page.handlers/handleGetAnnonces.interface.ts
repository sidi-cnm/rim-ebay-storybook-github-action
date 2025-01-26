import { Annonce } from "@/app/types";

export interface IPageAnnonce {
  totalPages: number;
  annonces: Annonce[];
}
export interface IHandleGetAnnonces {
  (): Promise<{
    pageAnnonceData: IPageAnnonce | null;
    errorMessage: string;
  }>;
}

