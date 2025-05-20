import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "~/redux/store/hooks";
import { useEffect } from "react";
import { fetchWpMenu } from "~/services/httpServices/wpService";

export default function Header() {
  const dispatch = useAppDispatch();
  const { menu = [], loading, error } = useAppSelector((state) => state.wp);

  useEffect(() => {
    dispatch(fetchWpMenu());
  }, [dispatch]);

  return (
    <header className="border-b bg-amber-100">
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link to="/" className="text-xl font-bold">
          logo
        </Link>
        <nav className="flex gap-4">
          {loading && <span>Loading...</span>}
          {error && <span className="text-red-500">{error}</span>}
          {menu.map((item: any) => (
            <Link
              key={item.slug}
              to={`/${item.slug}`}
              className="hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
