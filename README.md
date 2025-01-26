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

# dockrise for dev
vous avez besoin de podman et podman-compose installe

podman-compose -f docker-compose.dev.yml up --build
va creer une base des donnees postgres et lancer seed
puis on lance :
bun run dev et notre appliction est connecte a notre base des donnees local