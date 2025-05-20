import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWpFooter } from "~/services/httpServices/wpService";

export default function Footer() {
  const dispatch = useDispatch();
  const [footerContent, setFooterContent] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWpFooter() as any).then((action: any) => {
      if (action.payload && action.type.endsWith("/fulfilled")) {
        setFooterContent(action.payload.content?.rendered || null);
      }
    });
  }, [dispatch]);

  return (
    <footer className="border-t">
      <div className="container py-6 mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          {footerContent ? (
            <span dangerouslySetInnerHTML={{ __html: footerContent }} />
          ) : (
            "© " +
            new Date().getFullYear() +
            " React Starter Kit. All rights reserved."
          )}
        </div>
      </div>
    </footer>
  );
}
