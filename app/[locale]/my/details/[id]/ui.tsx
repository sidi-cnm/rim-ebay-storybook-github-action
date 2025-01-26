"use client";
import { Annonce } from "@/app/types";
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useI18n } from "@/locales/client"; 
import { useRouter } from "next/navigation";
import EditForm from "@/app/[locale]/components/EditForm/EditForm";
import { LottieAnimation } from "@/app/[locale]/components/LottieAnimation";


const fallbackImageUrl = "/noimage.jpg";
export default function MyAnnonceDetailsCompo({ lang = "ar",annonceId,annonce}: {lang?: string, annonceId: number; annonce: Annonce[] }) {
  const hostServerForImages = "https://picsum.photos";
  const getImageUrl = (imagePath: string) => `${hostServerForImages}/${imagePath}`;

  //const anonnceById = annonce?.filter(annonce=> annonce.id=annonceId)
  const params = useParams();
  console.log("params : " ,params)
  const router = useRouter();
  const t = useI18n();
  console.log("le lang ::" , t)
  const { id , locale} = params;
  console.log("id::" , id )
  const [annonces, setAnnonce] = useState<Annonce | null>(null); // State to hold the fetched annonce
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [isEditModalOpen, setEditModalOpen] = useState(false); // État pour gérer la visibilité de la pop-up
  const [initialData, setInitialData] = useState({ typeAnnonceId: annonces?.typeAnnonce?.id ?? 0, categorieId: annonces?.categorie?.id ?? 0, subcategorieId: annonces?.subcategorie?.id ?? 0, description: annonces?.description ?? "", price: annonces?.price ?? 0}); // État pour les données initiales

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const data = await axios.get(`/${lang}/api/annonces/${id}`);
         console.log("data " , data)
         setAnnonce(data.data)
      } catch (err) {
        setError("Failed to fetch annonce."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAnnonce(); // Call the fetch function
  }, [annonceId,id,lang]);

  

  const getImage = (imagePath: string, imageDescription: string = "") => {
    const imgUrl = getImageUrl(imagePath);
    return (
      <div className="relative h-40 sm:h-60 w-full">
        <Image
          src={imgUrl}
          alt={imageDescription}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
    );
  };

  const NoImage = () => (
    <div className="relative h-40 sm:h-60 w-full">
      <Image
        src={fallbackImageUrl}
        alt="no image uploaded by user"
        fill
        unoptimized
        style={{ objectFit: "cover" }}
        className="rounded-lg"
      />
    </div>
  );

  const handleDelte = async ()=>{

    const loadingToast = toast.loading(t("notifications.creating"));
  try {
    const res = await axios.delete(`/fr/api/annonces/${id}`)
    if(res.status === 200){
      toast.success(t("notifications.successdelete"), {
        id: loadingToast,
      });
      router.push('/my/list');
      router.refresh()
    }
  } catch (error) {
    
    toast.error(t("notifications.errordelete"), {
      id: loadingToast,
    });
    console.error('Erreur:', error);
    
  }
  }
  const handleEdit = () => {
    // Remplir initialData avec les données de l'annonce actuelle
    if (annonces) {
      setInitialData({
        typeAnnonceId: annonces?.typeAnnonce?.id ?? 0,
        categorieId: annonces?.categorie?.id ?? 0,
        subcategorieId: annonces?.subcategorie?.id ?? 0,
        description: annonces?.description,
        price: annonces.price,
      });
    }
    setEditModalOpen(true); // Ouvrir la pop-up
  };

//   const createdAt = new Date(props.annonce?.createdAt);
//   const formattedDate = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
//   const formattedTime = `${createdAt.getHours()}h : ${createdAt.getMinutes()} min`;
//  console.log("created " , createdAt)
  return (
    <>
      {loading ? (
        <LottieAnimation />
      ) : (
        <article className="flex flex-col gap-4 bg-white shadow-lg rounded-xl p-4 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] mx-auto my-6">
          <Toaster position="bottom-right" reverseOrder={false} />
          <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">{t('annonce')}</h2>
          <div className="space-y-2 h-40 sm:h-60 w-full">
            {annonces?.haveImage ? (
              <Carousel className="rounded-xl" infiniteLoop autoPlay showThumbs={false}>
                {annonces?.images.map((item, index) => (
                  <div className="h-40 sm:h-60" key={index}>
                    {getImage(item.imagePath)}
                  </div>
                ))}
              </Carousel>
            ) : (
              <NoImage />
            )}
          </div>

          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="inline-block bg-green-800 rounded-md px-2 py-1 text-xs sm:text-sm font-semibold text-white">
                {locale === 'ar' ? annonces?.typeAnnonce?.nameAr: annonces?.typeAnnonce?.name} / {locale === 'ar' ? annonces?.categorie?.nameAr : annonces?.categorie?.name}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                {"formattedDate"} | {"formattedTime"}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold my-2">{locale === 'ar' ? "العنوان":annonces?.title}</h1>
            
            <p className="text-gray-600 text-sm sm:text-base mb-4">{annonces?.description}</p>

            <div className="hover:bg-gray-100 rounded-md p-0">
              <div className="border-t border-green-800 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm sm:text-base font-bold">{t("prix")}</span>
                <p className="text-base sm:text-lg text-green-800 font-bold">{annonces?.price} UMR / jour</p>
              </div>
              <div className="border-t border-green-800 my-2"></div>
            </div>

            <div className="hover:bg-gray-100 rounded-md p-0 mt-2">
              <div className="border-t border-green-800 my-2"></div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800 mb-1">{t("Contact")}</h2>
                <p className="text-md font-semibold text-blue-600">{annonces?.contact}</p>
              </div>
              <div className="border-t border-green-800 my-2"></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
              <button onClick={handleDelte} className="bg-red-500 w-full sm:w-44 h-10 hover:bg-red-600 rounded-lg text-white font-bold">
               {locale === "ar" ? "سحب": "Retirer"} 
              </button>
              <button onClick={handleEdit} className="bg-green-500 w-full sm:w-44 h-10 rounded-lg hover:bg-green-600 text-white font-bold">
                {locale === "ar" ? "حرر" : "Edit"}
              </button>
            </div>
          </div>
        </article>
      )}

      {isEditModalOpen && (
        <EditForm
          lang={lang}
          userid={annonceId}
          annonceId={parseInt(id as string)}
          initialData={initialData}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
}
