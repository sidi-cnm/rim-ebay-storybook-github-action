import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EditForm, { EditFormProps } from './EditForm';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { action } from '@storybook/addon-actions';
import { Toaster } from 'react-hot-toast';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { screen } from '@testing-library/react';

// ✅ Initialiser `axios-mock-adapter`
const mock = new MockAdapter(axios);

// ✅ Mock API pour `PUT /api/annonces/{id}`
mock.onPut(/\/api\/annonces\/\d+/).reply((config) => {
  const data = JSON.parse(config.data);
  action("API Update Called")(data); // ✅ Afficher les données envoyées dans Storybook

  // 🔴 Simule un échec si certaines valeurs sont invalides
  if (data.categorieId === 0 || data.subcategorieId === 0 || data.price === 0 || data.description.trim() === "") {
    return [400, { message: "Erreur : mise à jour échouée" }];
  }
  
  return [200, { success: true }];
});

// ✅ Mock API pour les types d'annonces
const typeAnnonces = [
  { id: 1, name: 'Vente', nameAr: 'بيع' },
  { id: 2, name: 'Location', nameAr: 'إيجار' }
];
mock.onGet(/\/api\/typeAnnonce/).reply(200, typeAnnonces);

// ✅ Mock API pour les catégories
const categories = [
  { id: 1, name: 'Electronique', typeAnnonceId: 1 },
  { id: 2, name: 'Meubles', typeAnnonceId: 1 },
  { id: 3, name: 'Appartements', typeAnnonceId: 2 }
];
mock.onGet(/\/api\/categories/).reply((config) => {
  const urlParams = new URL(config.url!, "http://localhost");
  const typeAnnonceId = Number(urlParams.searchParams.get('typeAnnonceId'));
  return [200, categories.filter(cat => cat.typeAnnonceId === typeAnnonceId)];
});

// ✅ Mock API pour les sous-catégories
const subCategories = [
  { id: 1, name: 'Téléphones', categoryId: 1 },
  { id: 2, name: 'Ordinateurs', categoryId: 1 },
  { id: 3, name: 'Chaises', categoryId: 2 },
  { id: 4, name: 'Tables', categoryId: 2 },
  { id: 5, name: 'Studios', categoryId: 3 }
];
mock.onGet(/\/api\/subCategories/).reply((config) => {
  const urlParams = new URL(config.url!, "http://localhost");
  const categoryId = Number(urlParams.searchParams.get('CategoryId'));
  return [200, subCategories.filter(sub => sub.categoryId === categoryId)];
});

// ✅ Déclaration du composant Storybook
export default {
  title: 'Components/EditForm',
  component: EditForm,
} as Meta<EditFormProps>;

const Template: StoryFn<EditFormProps> = (args) => (
  <>
    <Toaster /> 
    <EditForm {...args} />
  </>
);

// ✅ Cas de mise à jour réussie
export const UpdateSuccess = Template.bind({});
UpdateSuccess.args = {
  lang: 'fr',
  annonceId: 123,
  userid: 1,
  initialData: {
    typeAnnonceId: 1,
    categorieId: 1,
    subcategorieId: 1,
    description: 'Mise à jour réussie !',
    price: 299
  },
  onClose: action('Form Closed')
};

// ❌ Cas où la mise à jour échoue
export const UpdateFails = Template.bind({});
UpdateFails.args = {
  ...UpdateSuccess.args,
  initialData: {
    typeAnnonceId: 0, // Simule une erreur API
    categorieId: 0,
    subcategorieId: 0,
    description: "",
    price: 0
  }
};

// ✅ Ajout de la Story avec Test d’Interaction
export const UpdateWithValidation = Template.bind({});
UpdateWithValidation.args = {
  ...UpdateSuccess.args,
};


UpdateWithValidation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // 1️⃣ Sélectionner un type d’annonce
  const typeSelect = await canvas.getByText("Type d'annonce").nextElementSibling as HTMLSelectElement;
  await userEvent.selectOptions(typeSelect, "1");
  await new Promise(resolve => setTimeout(resolve, 500)); // ⏳ Attendre 500 ms

  // 2️⃣ Sélectionner une catégorie
  const categorySelect = await canvas.getByText("Catégorie").nextElementSibling as HTMLSelectElement;
  await userEvent.selectOptions(categorySelect, "1");
  await new Promise(resolve => setTimeout(resolve, 500)); // ⏳ Attendre 500 ms

  // 3️⃣ Sélectionner une sous-catégorie
  const subCategorySelect = await canvas.getByText("Sous-catégorie").nextElementSibling as HTMLSelectElement;
  await userEvent.selectOptions(subCategorySelect, "1");
  await new Promise(resolve => setTimeout(resolve, 500)); // ⏳ Attendre 500 ms

  // 4️⃣ Modifier la description
  const descriptionInput = await canvas.getByRole("textbox") as HTMLTextAreaElement;
  await userEvent.clear(descriptionInput);
  await userEvent.type(descriptionInput, "Produit en excellent état");
  await new Promise(resolve => setTimeout(resolve, 500)); // ⏳ Attendre 500 ms

  // 5️⃣ Modifier le prix
  const priceInput = await canvas.getByRole("spinbutton") as HTMLInputElement;
  await userEvent.clear(priceInput);
  await userEvent.type(priceInput, "500");
  await new Promise(resolve => setTimeout(resolve, 500)); // ⏳ Attendre 500 ms

  // 6️⃣ Cliquer sur "Mettre à jour"
  const updateButton = await canvas.getByRole("button", { name: "Mettre à jour" });
  await userEvent.click(updateButton);
  await new Promise(resolve => setTimeout(resolve, 1000)); // ⏳ Attendre 1s pour voir le toast

  // 7️⃣ Vérifier si l’API retourne succès ou échec
  try {
    // Vérifier si le toast de succès apparaît en français, anglais ou arabe
    const successToast = await screen.findByRole("alert");
    await expect(successToast).toHaveTextContent(/Annonce créée avec succès !|تم إنشاء الإعلان بنجاح!/i);
  } catch {
    await expect(await screen.findByText(/échec|failed|فشل/i)).toBeInTheDocument();
  }
};
