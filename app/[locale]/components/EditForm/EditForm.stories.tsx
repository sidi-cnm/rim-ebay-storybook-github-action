// EditForm.stories.tsx
import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import EditForm, { EditFormProps } from './EditForm';  // Assurez-vous que le chemin est correct
import mockRouter from 'next-router-mock';  // Utiliser next-router-mock pour simuler le router

 
export default {
  title: 'Components/EditForm',
  component: EditForm,

} as Meta<EditFormProps>;

const Template: StoryFn<EditFormProps> = (args) => {
  // Simuler le Router ici pour cette histoire
  const [router] = useState(mockRouter);


  return (
      <EditForm {...args} />
  );
};

// Définir les arguments pour l'histoire Default
export const Default = Template.bind({});
Default.args = {
  lang: 'fr', // Propriétés requises par EditForm
  annonceId: 123,
  userid: 1,
  initialData: {
    typeAnnonceId: 1,
    categorieId: 2,
    subcategorieId: 3,
    description: 'Sample description',
    price: 100,
  },
  onClose: () => console.log('Closed'),
};
