# rim-ebay
 # comment utiliser ce projet
- utiliser bun 1.2.0 (ou plus recent) pour gerer les deps
- les workflow dans .github/workflows/deploy-nextjs-postgress.yml peut servir sur comment installer et utiliser ce projet en local ou dans le cloud
- 
# les modification faites
- actualiser la version de eslint 
- supprimer cypress pour minimiser le temps d'installation
- supprimer des fichier initule : ngrock package-lock.json ...
- la commande bun run build = prisma generate && next build
- prisma est optimise pour les enviroment serverless
- storybook est configure correctement pour Nextjs 14
