// // app/layout/AdminLayoutWrapper.js
// "use client";

// import { usePathname } from "next/navigation";
// import SideNavigation from "../components/SideNavigation";

// export default function AdminLayoutWrapper({
//     children,
//     params,
//   }: Readonly<{
//     children: React.ReactNode;
//       params:{
//         locale:string
//       }
//   }>) {
//   const pathname = usePathname();

//   // Détecte si la route actuelle est une route d'administration
//   const isAdminRoute = pathname.startsWith("/admin");

//   return (
//     <>
//       {isAdminRoute && <SideNavigation />}
//       <main className={isAdminRoute ? "ml-64" : ""}>
//         {children}
//       </main>
//     </>
//   );
// }
