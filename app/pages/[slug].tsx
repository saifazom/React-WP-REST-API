import { useParams } from "react-router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { fetchWpPage } from "~/services/httpServices/wpService";

export default function DynamicPage() {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { page, loading, error } = useAppSelector((state) => state.wp);

  useEffect(() => {
    if (slug) {
      dispatch(fetchWpPage(slug));
    }
  }, [dispatch, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!page) return <div>No page found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1
        className="text-3xl font-bold mb-4"
        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
      />
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </div>
  );
}
