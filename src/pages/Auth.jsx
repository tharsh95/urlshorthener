import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { UrlState } from "@/context";

const Auth = () => {
  const navigate=useNavigate()
  const [searchParams] = useSearchParams();
  const link = searchParams.get("createNew")
  const { isAuthenticated, loading } = UrlState();

  useEffect(()=>{
    if(isAuthenticated&&!loading){
      navigate(`/dashboard?${link?`createNew${link}`:""}`)
    }

  },[isAuthenticated,loading])
  return (
    <div className="flex flex-col mt-28 items-center gap-10">
      <h1 className="text-5xl font-extrabold">
        {link
          ? "Hold up! Let's login first"
          : "Login / SignUp"}
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="SignUp">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
