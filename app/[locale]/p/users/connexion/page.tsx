
import ConnexionForm from "./ConnexionForm";
 
export default function ConnexionPage({ params }: { params: { locale: string } }) {
  console.log('local cote server')
  console.log("sidi ::" ,params)
  return <ConnexionForm lang={params.locale}  />;
}
