import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PageTitle() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "Home";
    const title = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${title} - Hasan Web`;
  }, [location]);

  return null; // This component doesn’t render anything
}
