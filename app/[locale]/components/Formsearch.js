import React, { useState } from "react";
import { AnnonceType, categories, subCategories } from '../my/add/data';
import { useI18n } from "@/locales/client"; 
export default function FormSearch() {
  const t = useI18n();
  const [selectedType, setSelectedType] = useState(''); // Type par défaut en chaîne vide
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]); // Un tableau vide pour les catégories filtrées
  const [filteredSubCategories, setFilteredSubCategories] = useState([]); // Ajout pour les sous-catégories filtrées
  const [selectedCategoryId, setSelectedCategoryId] = useState(''); 
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState();
  const handleTypeChange = (e) => {
    const type = e.target.value; // Récupère le type sélectionné
    setSelectedType(type);
    setSelectedCategory('');
    setFilteredCategories(categories.filter(category => category.type === type));
  };

  const handleSubCategoryChange = (e) => {
    const subCategoryName = e.target.value;
    setSelectedSubCategory(subCategoryName);
    const subCategory = subCategories.find(subcategory => subcategory.name === subCategoryName);
    if (subCategory) {
      setSelectedSubCategoryId(subCategory.id);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const category = categories.find(category => category.name === categoryName);
    if (category) {
      // Si la catégorie existe, filtrez les sous-catégories
      setFilteredSubCategories(subCategories.filter(sub => sub.categorie_id === category.id));
      setSelectedCategoryId(category.id);
    }
  };

  return (
    <div className="flex items-center justify-center h-48 bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Formulaire</h2>

        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-600 mb-2" htmlFor="typeSelect">Type</label>
              <select
                id="typeSelect"
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              >
                <option value="">Type</option>
                <option value={AnnonceType.Location}>Location</option>
                <option value={AnnonceType.Vente}>Vente</option>
                <option value={AnnonceType.Service}>Service</option>
                <option value={AnnonceType.Autre}>Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-2" htmlFor="categorySelect">Categrie</label>
              <select
                id="categorySelect"
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={!selectedType}
                className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              >
                <option value="">Categorie</option>
                {filteredCategories.map(category => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ajoutez d'autres champs d'entrée si nécessaire */}

            <div>
              <label className="block text-gray-600 mb-2" htmlFor="input3">subCategorie</label>
              <select
                  id="subCategory"
                  value={selectedSubCategory}
                  onChange={handleSubCategoryChange}
                  disabled={!selectedCategory}
                  className="shadow-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-300"
              >
                <option value="">{ t("addAnnonce.selectSubCategory") }</option>
                {filteredSubCategories.map(subCategory => (
                  <option key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
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
