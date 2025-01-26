"use client"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FormSearch from "./Formsearch";
import { useI18n } from "@/locales/client"; 

export default function Input() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const t = useI18n();

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsAnimating(true), 150); // Petit délai pour permettre à l'animation de se produire
    };

    const closeModal = () => {
        setIsAnimating(false); // Démarrer l'animation de fermeture
        setTimeout(() => setIsOpen(false), 300); // Attendre la fin de l'animation avant de masquer le modal
    };

    return (
        <div>
            {/* Bouton pour ouvrir le modal avec l'icône de filtre */}
            <button
                onClick={openModal}
                className="bg-blue-800 text-white outline-none rounded-2xl hover:bg-blue-700 py-2 px-3 shadow-xl flex items-center gap-2"
            >
                <FontAwesomeIcon icon={faFilter} /> {/* Icône de filtre */}
                {t("nav.Recherche")}
            </button>

            {/* Modal centré avec superposition */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className={`p-4 rounded-lg shadow-lg max-w-md w-full h-auto relative transform transition-all duration-300 ease-in-out ${
                            isAnimating ? "scale-100" : "scale-50 opacity-0"
                        }`}>
                        {/* Bouton de fermeture */}
                        <button
                            onClick={closeModal}
                            className="absolute sm:bottom-56 bottom-80 rounded-lg px-3 right-10 text-red-600 hover:text-gray-900"
                        >
                            &#10005;
                        </button>
                        {/* Contenu du modal */}
                        <FormSearch />
                    </div>
                </div>
            )}
        </div>
    );
}
