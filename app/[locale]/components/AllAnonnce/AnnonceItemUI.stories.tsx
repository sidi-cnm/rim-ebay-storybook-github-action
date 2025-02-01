import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
// import EditForm, { EditFormProps } from './EditForm';
import AnnonceItemUI from './AnnonceItemUI';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { action } from '@storybook/addon-actions';
import { Toaster } from 'react-hot-toast';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { screen } from '@testing-library/react';
import { Annonce } from "@/app/types";


export default {
    title: 'Components/AnnonceItemUI',
    component: AnnonceItemUI,
  } as Meta<Annonce>;


  const Template: StoryFn<Annonce> = (args) => (
    <>
      <Toaster /> 
      <AnnonceItemUI {...args} />
    </>
  );

  export const AnnonceItemTest = Template.bind({});
  AnnonceItemTest.args={
    id: 2,
    typeAnnonceId: 1,
    categorieId: 1,
    lieuId: 1,
    userId: 2,
    subcategorie: {name:"",id:2,categorie_id:2, nameAr:""},
    title: 'Studio à louer',
    description: 'Studio moderne idéal pour étudiant.',
    price: 400,
    contact: '+22245000001',
    haveImage: false,
    firstImagePath: 'null',
    status: 'pending',
    typeAnnonceName: 'Location', 
    typeAnnonceNameAr: 'الإيجار',
    categorieName:'Appartement'  ,
    categorieNameAr:'شقة',
    images: []
      
  }
  


