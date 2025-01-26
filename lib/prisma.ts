// lib/prisma.ts { PrismaClient }
//import  { PrismaClient }  from '../generated/client'

import { PrismaClient } from '@prisma/client';
 
 
// use `prisma` in your application to read and write data in your DB

// Créez une instance de PrismaClient
const prisma = new PrismaClient();

// Exposez cette instance pour pouvoir l'utiliser dans d'autres fichiers
export default prisma;
