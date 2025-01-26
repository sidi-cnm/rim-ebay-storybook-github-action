 
import React, { useState } from 'react';
import { Category,AnnonceType,SubCategory,categories,subCategories } from './data';

const FormulaireAnnonce: React.FC = () => {
  const [selectedType, setSelectedType] = useState<AnnonceType | ''>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as AnnonceType;
    const typeconvetred = parseInt(type);
    setSelectedType(type);
    setSelectedCategory('');
    setFilteredCategories(categories.filter(category => category.typeAnnonceId === typeconvetred));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const category = categories.find(category => category.name === categoryName);
    if (category) {
      setFilteredSubCategories(subCategories.filter(sub => sub.categorie_id === category.id));
    }
  };

  return (
    <form>
      <div>
        <label>Type d'annonce:</label>
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Sélectionnez un type</option>
          <option value={AnnonceType.Location}>Location</option>
          <option value={AnnonceType.Vente}>Vente</option>
          <option value={AnnonceType.Service}>Service</option>
          <option value={AnnonceType.Autre}>Autre</option>
        </select>
      </div>

      <div>
        <label>Catégorie:</label>
        <select value={selectedCategory} onChange={handleCategoryChange} disabled={!selectedType}>
          <option value="">Sélectionnez une catégorie</option>
          {filteredCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Sous-catégorie:</label>
        <select value={selectedCategory} disabled={!selectedCategory}>
          <option value="">Sélectionnez une sous-catégorie</option>
          {filteredSubCategories.map(subCategory => (
            <option key={subCategory.id} value={subCategory.name}>{subCategory.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default FormulaireAnnonce;
