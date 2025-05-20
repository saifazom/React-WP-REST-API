import { Link } from "react-router";
import type { Route } from "../pages/+types/home";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { fetchWpPage, fetchWpPosts } from "~/services/httpServices/wpService";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const dispatch = useAppDispatch();
  const { page, posts, loading, error } = useAppSelector((state) => state.wp);

  useEffect(() => {
    dispatch(fetchWpPage("home")); // "home" slug, or Other page slug
    dispatch(fetchWpPosts());
  }, [dispatch]);

  // Debug: Log page data
  console.log("Fetched page:", page);
  console.log("Fetched posts:", posts);

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      {loading && <p>Loading ...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {page && (
        <div className="text-center mb-8">
          <h1
            className="text-4xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: page.title.rendered }}
          />
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      )}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {posts.map((post: any) => (
          <div key={post.id} className="mb-6 border-b pb-4">
            <h3
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        ))}
      </div>
    </div>
  );
}
