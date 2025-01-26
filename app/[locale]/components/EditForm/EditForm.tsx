"use client";
import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { Category, SubCategory } from '../../my/add/data'; // Assurez-vous que ces types sont importés correctement
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useI18n } from "@/locales/client"; 
import { useRouter } from "next/navigation";

export interface EditFormProps {
  lang: string;
  annonceId: number;
  userid:number
  initialData: {
    typeAnnonceId: number;
    categorieId: number;
    subcategorieId: number;
    description: string;
    price: number;
  };
  onClose: () => void; // Fonction pour fermer le formulaire
}

const EditForm: React.FC<EditFormProps> = ({ lang, userid, annonceId, initialData, onClose }) => {
  const t = useI18n();
  const [typeAnnonces, setTypeAnnonces] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<number>(initialData.typeAnnonceId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(initialData.categorieId);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>(initialData.subcategorieId);
  const [description, setDescription] = useState(initialData.description);
  const [price, setPrice] = useState(initialData.price.toString());
  const router = useRouter();

  useEffect(() => {
    const fetchTypeAnnonces = async () => {
      try {
        const response = await axios.get(`/${lang}/api/typeAnnonce`);
        setTypeAnnonces(response.data);
      } catch (error) {
        toast.error(t("errors.fetchTypeAnnonces"));
      }
    };

    fetchTypeAnnonces();
  }, [lang,t]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedTypeId) {
        try {
          const response = await axios.get(`/${lang}/api/categories?typeAnnonceId=${selectedTypeId}`);
          setCategories(response.data);
        } catch (error) {
          toast.error(t("errors.fetchCategories"));
        }
      } else {
        setCategories([]);
      }
    };

    fetchCategories();
  }, [selectedTypeId, lang,t]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (selectedCategoryId) {
        try {
          const response = await axios.get(`/${lang}/api/subCategories?CategoryId=${selectedCategoryId}`);
          setFilteredSubCategories(response.data);
        } catch (error) {
          toast.error(t("errors.fetchSubCategories"));
        }
      } else {
        setFilteredSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId, lang,t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(t("notifications.updating"));
    
    try {
      const annonceData = {
        typeAnnonceId: selectedTypeId,
        categorieId: selectedCategoryId,
        subcategorieId: selectedSubCategoryId,
        lieuId: 1,
        userId:userid,
        description,
        price: Number(price),
        title: "Titre",
        contact: "contact",
        haveImage: false,
        firstImagePath: "",
        images: [],
        status: "active"
      };

      const response = await axios.put(`/${lang}/api/annonces/${annonceId}`, annonceData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Erreur lors de la mise à jour de l\'annonce');
      }

      toast.success(t("notifications.success"), {
        id: loadingToast,
      });
      router.refresh()
      onClose(); // Fermer le formulaire après la mise à jour
    } catch (error) {
      toast.error(t("notifications.error"), {
        id: loadingToast,
      });
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{t("editAnnonce.edit")}</h2>
        <form onSubmit={handleSubmit}>
          {/* Type Annonce */}
          <div className="mb-4">
            <label className="block mb-1">{t("addAnnonce.annonceType")}</label>
            <select
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(Number(e.target.value))}
              className="border rounded w-full p-2"
            >
             
              {typeAnnonces.map(type => (
                <option key={type.id} value={type.id}>
                  {lang === 'ar' ? type.nameAr : type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Catégorie */}
          <div className="mb-4">
            <label className="block mb-1">{t("addAnnonce.category")}</label>
            <select
              value={selectedCategoryId || ''}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              disabled={!selectedTypeId}
              className="border rounded w-full p-2"
            >
              <option value="">{t("addAnnonce.selectCategory")}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sous-catégorie */}
          <div className="mb-4">
            <label className="block mb-1">{t("addAnnonce.subCategory")}</label>
            <select
              value={selectedSubCategoryId || ''}
              onChange={(e) => setSelectedSubCategoryId(Number(e.target.value))}
              disabled={!selectedCategoryId}
              className="border rounded w-full p-2"
            >
              <option value="">{t("addAnnonce.selectSubCategory")}</option>
              {filteredSubCategories.map(subCategory => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1">{t("addAnnonce.description")}</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded w-full p-2"
              rows={4}
              required
            />
          </div>

          {/* Prix */}
          <div className="mb-4">
            <label className="block mb-1">{t("addAnnonce.price")}</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 p-2 rounded">Annuler</button>
            <button type="submit" className="bg-blue-500 p-2 rounded text-white">Mettre à jour</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
