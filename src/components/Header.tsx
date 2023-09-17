import { NavLink } from "react-router-dom";

export default function Header() {
  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "font-semibold text-white" : undefined;
  };

  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4">
        <section>
          <p>Logo</p>
        </section>
        <section className="text-sm text-gray-300 font-thin">
          <ul className="flex gap-4">
            <li>
              <NavLink to="/browse" className={isActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse/genre" className={isActiveLink}>
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink to="/browse/genre/movies" className={isActiveLink}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/latest" className={isActiveLink}>
                New & Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section>
          <p>Search Icon</p>
          <p>User info</p>
        </section>
      </nav>
    </header>
  );
}
