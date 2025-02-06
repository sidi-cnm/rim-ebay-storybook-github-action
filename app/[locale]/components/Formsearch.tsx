import React, { useState , useEffect } from "react";
// import { AnnonceType, categories, subCategories } from '../my/add/data';
import { useI18n } from "@/locales/client"; 
import { useRouter } from "next/navigation";
import { Category, SubCategory, categories, subCategories } from '../my/add/data';
import axios from 'axios';
import { TypeAnnonce } from "@/app/types";
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from "next/navigation";

export default function FormSearch({lang="ar"}) {
  
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
  

  return (
    <div className="flex items-center justify-center h-48 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Formulaire</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="mb-6 relative">
            <label htmlFor="type" className="block text-gray-600 mb-2">
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
            </div>

            <div className="mb-6 relative">
            <label htmlFor="category" className="block text-gray-600 mb-2">
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
            <label htmlFor="subCategory" className="block text-gray-600 mb-2">
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


            <div>
              <label className="block text-gray-600 mb-2" htmlFor="input4">Prix</label>
              <input
                id="prix"
                type="number"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}





