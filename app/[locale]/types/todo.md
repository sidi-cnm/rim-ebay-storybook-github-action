
interface AnnoncesVirtualUiTable {
  id: Generated<number>;


  typeAnnonce: string ;

  categorie: string;
  user_id: number;
  title?: string;
  description: string; 

  price: number;
  created_at: ColumnType<Date, string | undefined, never>;


  HaveImage:boolean;
  firstImagePath:string;// for display in list annonces. defaut to no-image.png 
  images:imageObject[]; // for display in caloucel in annonce details
}