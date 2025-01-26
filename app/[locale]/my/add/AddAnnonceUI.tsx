"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Category, SubCategory, categories, subCategories } from './data';
import { useI18n } from "@/locales/client"; 
import axios from 'axios';
import { TypeAnnonce } from "@/app/types";
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from "next/navigation";
import prisma from "@/lib/prisma";

export default function AddAnnonceUI({ lang = "ar" , userid}: { lang?: string; userid: number }) {
  const router = useRouter();
  const t = useI18n();

  const [typeAnnonces, setTypeAnnonces] = useState<TypeAnnonce[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedTypeId, setSelectedTypeId] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number>();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const DataInsideNavigation = useSearchParams();

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
      console.log("selected type : " , selectedTypeId)
      if (selectedTypeId) {
        try {
          const response = await axios.get(`/${lang}/api/categories?typeAnnonceId=${selectedTypeId}`);
          setCategories(response.data);
          console.log("categories : " , response.data)

          // const categories = await prisma.category.findMany({
          //   where:  {
          //     typeAnnonceId: selectedTypeId ? selectedTypeId:undefined
          //   } ,
          //   orderBy: {
          //     priority: 'asc'
          //   }
          // });
            //setCategories(categories);
        } catch (error) {
          console.log("error ::" , error)
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
        console.log("selectedCategoryId" , selectedCategoryId)
        try {
          const response = await axios.get(`/${lang}/api/subCategories?CategoryId=${selectedCategoryId}`);
          console.log("response data" , response.data)
          setFilteredSubCategories(response.data);
        } catch (error) {
          console.log("error" , error)
          toast.error(t("errors.fetchSubCategories"));
        }
      } else {
        setFilteredSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [selectedCategoryId, lang,t]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = Number(e.target.value);
    const selectedType = typeAnnonces.find(type => type.id === typeId);
    if (selectedType) {
      setSelectedType(selectedType.name);
      setSelectedTypeId(typeId);
      setSelectedCategory('');
      setSelectedCategoryId(undefined);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      setSelectedCategory(category.name);
      setSelectedCategoryId(categoryId);
      setSelectedSubCategory('');
      setSelectedSubCategoryId(undefined);
      // setFilteredSubCategories(undefined);
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategoryId = Number(e.target.value);
    const subCategory = filteredSubCategories.find(subCat => subCat.id === subCategoryId);
    if (subCategory) {
      setSelectedSubCategory(subCategory.name);
      setSelectedSubCategoryId(subCategoryId);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const loadingToast = toast.loading(t("notifications.creating"));
    
    try {
      console.log("selectedSubCategoryId" , selectedSubCategoryId)
      const annonceData = {
        typeAnnonceId: selectedTypeId,
        categorieId: selectedCategoryId,
        subcategorieId: selectedSubCategoryId,
        lieuId: 1,
        userId: userid,
        title: "Titre",
        description: description,
        price: Number(price),
        contact: "contact",
        haveImage: false,
        firstImagePath: "",
        images: [],
        status: "active"
      };
      console.log("annonceData" , annonceData)

      // const response = await axios.post(`/${lang}/api/annonces`, annonceData, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      const res = await fetch(`/${lang}/api/annonces`, {
        method: "POST",
        body: JSON.stringify(annonceData),
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': "no-store"
        }
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Erreur lors de la création de l\'annonce');
      }

      toast.success(t("notifications.success"), {
        id: loadingToast,
      });
      
      setTimeout(() => {
        router.push('/my/list');
        router.refresh()
      }, 1000);

    } catch (error) {
      toast.error(t("notifications.error"), {
        id: loadingToast,
      });
      console.error('Erreur:', error);
    }
  };

  return (
    <main className="min-h-screen">
      <Toaster position="bottom-right" reverseOrder={false} />
      
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-700">
          {t("addAnnonce.addNew")}
        </h2>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
          <div className="mb-6 relative">
            <label htmlFor="type" className="block text-gray-700 text-sm font-bold mb-2">
              {t("addAnnonce.annonceType")}
            </label>
            <select
              id="type"
              value={selectedTypeId}
              onChange={handleTypeChange}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{t("addAnnonce.selectType")}</option>
              {typeAnnonces.map(type => (
                <option key={type.id} value={type.id}>
                  {lang === 'ar' ? type.nameAr : type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              {t("addAnnonce.category")}
            </label>
            <select
              id="category"
              value={selectedCategoryId || ''}
              onChange={handleCategoryChange}
              disabled={!selectedTypeId}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{t("addAnnonce.selectCategory")}</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {lang === 'ar' ? category.nameAr : category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="subCategory" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.subCategory") }
            </label>
            <select
              id="subCategory"
              value={selectedSubCategoryId || ''}
              onChange={handleSubCategoryChange}
              disabled={!selectedCategory}
              className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="">{ t("addAnnonce.selectSubCategory") }</option>
              {filteredSubCategories.map(subCategory => (
                <option key={subCategory.id} value={subCategory.id}>
                  {lang === 'ar' ? subCategory.nameAr : subCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.description") }
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              rows={4}
              required
            ></textarea>
          </div>

          <div className="mb-6 relative">
            <label htmlFor="prix" className="block text-gray-700 text-sm font-bold mb-2">
              { t("addAnnonce.price") }
            </label>
            <input
              type="number"
              id="prix"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow-sm border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              id="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            >
              { t("addAnnonce.submitButton") }
            </button>
            {submitStatus && <p>{submitStatus}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
