"use client"; 
import Link from "next/link";
import { Annonce } from "@/app/types";
import PaginationUI from "./PaginationUI";
import { useState, useEffect } from "react";
import AnnonceItemUI from "../components/AllAnonnce/AnnonceItemUI";
import { useSearchParams } from "next/navigation"; 
export default function ListAnnoncesUI({
    totalPages,
    currentPage,
    annonces,
}: {
    totalPages: number;
    currentPage: number;
    annonces: Annonce[];
}) {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if there are any search parameters (filters)
        const hasFilters = Array.from(searchParams.keys()).length > 0;

        if (hasFilters) {
            setIsLoading(true); // Show loader if there are filters
        } else {
            setIsLoading(false); // Hide loader if no filters
        }
    }, [searchParams]); // Re-run effect when searchParams change

    // Simulate loading delay (remove in production)
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading) {
            timer = setTimeout(() => {
                setIsLoading(false); // Hide loader after delay
            }, 1000); // Adjust delay as needed
        }
        return () => clearTimeout(timer); // Clear timer on unmount or filter change
    }, [isLoading]);

    return (
        <div className="container  px-4">
            {isLoading ? ( // Show loader while filtering
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white">
                         
                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {annonces.map((annonce) => (
                            <Link
                                href={`/p/annonces/details/${annonce.id}`}
                                key={annonce.id}
                                className="block"
                            >
                                <AnnonceItemUI {...annonce} />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6">
                        <PaginationUI totalPages={totalPages} currentPage={currentPage} />
                    </div>
                </>
            )}
        </div>
    );
}