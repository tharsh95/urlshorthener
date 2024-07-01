import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link as Lnk, LogOut } from "lucide-react";
import { UrlState } from "@/context";
import useFetch from "@/hooks/useFetch";
import { logout } from "@/db/apiAuth";
import { BarLoader } from "react-spinners";
const Header = () => {
  const { loading, fn: fnLogout } = useFetch(logout);
  const navigate = useNavigate();
  const { user,fetchUser } = UrlState();
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="logo" className="h-16" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Lnk className="mr-2 h-4 w-4" />
                  My Links
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="mr-2 w-4 h-4" />
                  <span
                    onClick={() =>
                      fnLogout().then(() => {
                        fetchUser()
                        navigate("/");
                      })
                    }
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" color="#36d7b7" width={"100%"} />}
    </>
  );
};

export default Header;
