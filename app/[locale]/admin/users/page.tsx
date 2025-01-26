// /app/admin/users/page.tsx

import Input from "../../components/InputAdmin";
import UserTable from "../../components/UserTable";
import { FaSearch, FaPlus } from "react-icons/fa";
 // Importez le composant pour afficher les utilisateurs

interface UserPageProps {
  params: { locale: string }; // Déclarez le paramètre de langue
}

const UserPage = async ({ params }: UserPageProps) => {

  const { locale } = params
  try {
    // Faites la requête vers l'API côté serveur
    const res = await fetch(`http://localhost:3000/${locale}/api/user`);  // Changez l'URL si nécessaire
    const users = await res.json();  // Récupérez les données au format JSON

    return (
      <div className="min-h-screen bg-gray-100">
        <div className="py-28 px-14">
          <div className="flex justify-between">
          <div className="text-2xl font-bold text-gray-800 uppercase mb-6">User Management</div>
          <Input />
          <button className="flex items-center px-7 w-20 h-10 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                  <FaPlus className="mr-2" />
            </button>
          </div>
          
          <UserTable users={users} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return (
      <div>Error: Unable to fetch users.</div>
    );
  }
};

export default UserPage;
