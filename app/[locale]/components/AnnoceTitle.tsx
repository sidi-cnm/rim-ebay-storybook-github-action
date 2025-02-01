import { useI18n } from "@/locales/client"; 
function AnnoceTitle() {
    const t = useI18n();
    return (
        <div>
             <p className="font-extrabold mr-10 text-xl  text-blue-600 sm:text-xl mb-2 sm:mb-0">{t("nav.Annoce")} </p>
        </div>
    )
}

export default AnnoceTitle
