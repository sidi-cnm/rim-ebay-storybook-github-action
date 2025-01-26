import AddAnnonceUI from "./AddAnnonceUI";  
import { cookies } from "next/headers";

export default function AddAnnonce({ params }: { params: { locale: string } }) {
  const userid = cookies().get("user")
  const userIdConverted = userid ? parseInt(userid.value) : 0;
  console.log("userid : " , userIdConverted)
  return (
    <>
      <AddAnnonceUI lang={params.locale} userid={userIdConverted} />
    </>
  );
}
