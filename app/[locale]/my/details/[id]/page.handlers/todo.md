ype '{ createdAt: Date; id: number; typeAnnonceId: number; typeAnnonceName: string; typeAnnonceNameAr: string; categorieId: number; categorieName: string; categorieNameAr: string; lieuId: number; ... 11 more ...; updatedAt: string; }' 
is not assignable to type 'AnnonceV2'.
  Types of property 'updatedAt' are incompatible.
    Type 'string' is not assignable to type 'Date'.ts(2322)
AnnonceDetailsUI.tsx(10, 31): The expected type comes from property 'annonce' which is declared here on type 'IntrinsicAttributes & { annonceId: number; annonce: AnnonceV2; }'