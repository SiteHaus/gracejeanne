import {
  Home,
  Newspaper,
  ShoppingCart,
  PersonStanding,
  Menu,
  Book,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { login } from "@/lib/auth";
import { logout } from "@/lib/auth";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { useUser } from "@/stores/UserStore";

export const Navbar = () => {
  const { user } = useUser();
  const links = [
    { path: "/", title: "Home", icon: <Home /> },
    { path: "/about", title: "About", icon: <Book /> },
    { path: "/newsletter", title: "Newsletter", icon: <Newspaper /> },
    { path: "/cart", title: "Cart", icon: <ShoppingCart /> },
    {
      path: "https://iam.sitehaus.dev/account",
      title: "Account",
      icon: <PersonStanding />,
    },
  ];

  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  return (
    <>
      <div className="hidden absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent h-32 text-white md:flex justify-end items-start pt-5 pr-4">
        <nav className="flex gap-8 items-center">
          {links.map((link) => (
            <a
              key={link.path}
              href={link.path}
              className="flex flex-col items-center gap-1 hover:opacity-60 transition-opacity"
            >
              {link.icon}
              <span className="text-sm font-light tracking-wide">
                {link.title}
              </span>
            </a>
          ))}
          {token ? (
            <div className="flex flex-col items-center gap-2">
              <p>Welcome {user.firstName}</p>
              <Button
                onClick={logout}
                className="hover:shadow-lg hover:scale-105"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={login} className="hover:shadow-lg hover:scale-105">
              Log In
            </Button>
          )}
        </nav>
      </div>
      <div className="md:hidden absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent h-24 text-white flex justify-end items-start px-3 pt-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {links.map((link) => (
              <DropdownMenuItem>
                <a
                  key={link.path}
                  href={link.path}
                  className="flex  items-center gap-1 hover:opacity-60 transition-opacity"
                >
                  {link.icon}
                  <span className="text-sm font-light tracking-wide">
                    {link.title}
                  </span>
                </a>
              </DropdownMenuItem>
            ))}
            {token ? (
              <div className="flex flex-col items-center gap-2">
                <p>Welcome {user.firstName}</p>
                <Button
                  onClick={logout}
                  className="hover:shadow-lg hover:scale-105"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={login}
                className="hover:shadow-lg hover:scale-105"
              >
                Log In
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
