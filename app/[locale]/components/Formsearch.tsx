import React, { useState, useEffect } from "react";
import { useI18n } from "@/locales/client";
//import { Filters } from "@/app/page.handlers/handleGetAnnonces"; 
import {Filters} from "../page.handlers/handleGetAnnonces" // Import Filters type

interface FormSearchProps {
    lang?: string;
    onSubmit: (filters: Filters) => void;
}

export default function FormSearch({ lang = "ar", onSubmit }: FormSearchProps) {
    const t = useI18n();

    const [typeAnnonces, setTypeAnnonces] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);

    const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(undefined);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | undefined>(undefined);
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        // Fetch TypeAnnonces (replace with your actual API call)
        fetch(`/${lang}/api/typeAnnonce`)
            .then(res => res.json())
            .then(data => setTypeAnnonces(data))
            .catch(error => console.error("Error fetching typeAnnonces:", error));
    }, [lang]);

    useEffect(() => {
        if (selectedTypeId) {
            // Fetch Categories based on selectedTypeId (replace with your actual API call)
            fetch(`/${lang}/api/categories?typeAnnonceId=${selectedTypeId}`)
                .then(res => res.json())
                .then(data => setCategories(data))
                .catch(error => console.error("Error fetching categories:", error));
        } else {
            setCategories([]);
            setSubCategories([]); // Clear subcategories if no category is selected
        }
    }, [selectedTypeId, lang]);

    useEffect(() => {
        if (selectedCategoryId) {
            // Fetch Subcategories based on selectedCategoryId (replace with your actual API call)
            fetch(`/${lang}/api/subCategories?CategoryId=${selectedCategoryId}`)
                .then(res => res.json())
                .then(data => setSubCategories(data))
                .catch(error => console.error("Error fetching subcategories:", error));
        } else {
            setSubCategories([]);
        }
    }, [selectedCategoryId, lang]);


    const handleSearch = () => {
        const filters: Filters = {};

        if (selectedTypeId) filters.typeAnnonceId = selectedTypeId.toString();
        if (selectedCategoryId) filters.categorieId = selectedCategoryId.toString();
        if (selectedSubCategoryId) filters.subCategorieId = selectedSubCategoryId.toString();
        if (price) filters.price = price;
        if (description) filters.description = description;

        onSubmit(filters);
    };

    return (
        <div className="flex items-center justify-center  bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Formulaire</h2>

                <form>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-600 mb-2">{t("addAnnonce.annonceType")}</label>
                            <select
                                value={selectedTypeId || ''}
                                onChange={(e) => setSelectedTypeId(Number(e.target.value) || undefined)}
                                className="border rounded w-full p-2"
                            >
                                <option value="">{t("addAnnonce.selectType")}</option>
                                {typeAnnonces.map((type: any) => (
                                    <option key={type.id} value={type.id}>
                                        {lang === 'ar' ? type.nameAr : type.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">{t("addAnnonce.category")}</label>
                            <select
                                value={selectedCategoryId || ''}
                                onChange={(e) => setSelectedCategoryId(Number(e.target.value) || undefined)}
                                className="border rounded w-full p-2"
                            >
                                <option value="">{t("addAnnonce.selectCategory")}</option>
                                {categories.map((category: any) => (
                                    <option key={category.id} value={category.id}>
                                        {lang === 'ar' ? category.nameAr : category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">{t("addAnnonce.subCategory")}</label>
                            <select
                                value={selectedSubCategoryId || ''}
                                onChange={(e) => setSelectedSubCategoryId(Number(e.target.value) || undefined)}
                                className="border rounded w-full p-2"
                            >
                                <option value="">{t("addAnnonce.selectSubCategory")}</option>
                                {subCategories.map((subCategory: any) => (
                                    <option key={subCategory.id} value={subCategory.id}>
                                        {lang === 'ar' ? subCategory.nameAr : subCategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-600 mb-2">{t("addAnnonce.price")}</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="border rounded w-full p-2"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full bg-blue-800 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
                    >
                        {t("search")}
                    </button>
                </form>
            </div>
        </div>
    );
}