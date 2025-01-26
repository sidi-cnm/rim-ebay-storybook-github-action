"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    const currentLocale = router.locale || "fr"; // Utilisez 'fr' par défaut si la langue n'est pas définie

    const handleBack = () => {
        router.back(); // Retourne à la page précédente
    };

    return (
        <button
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white text-2xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110 active:scale-95"
        >
            {currentLocale === "ar" ? "\u2192" : "\u2190"} {/* Flèche à droite pour ar, à gauche pour fr */}
        </button>
    );
}
