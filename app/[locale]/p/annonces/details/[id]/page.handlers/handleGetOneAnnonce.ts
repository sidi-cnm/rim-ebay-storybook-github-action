import dataOne from './data.itemOne.json'
import dataTwo from './data.itemTwo.json'
 
function estDivisibleParDeux(nombre: number) {
    return nombre % 2 === 0;
}
export const handleGetOneAnnonce = async (annonceId: number) => {
    const isPaire = estDivisibleParDeux(annonceId)
    if (isPaire) {
        return { ...dataTwo }
    }
    if (!isPaire) {
        return { ...dataOne }
    }
}