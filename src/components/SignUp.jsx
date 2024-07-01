/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import * as Yup from "yup";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import useFetch from "@/hooks/useFetch";
import { signup } from "@/db/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const { fetchUser } = UrlState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const link = searchParams.get("createNew");
  const { data, error, loading, fn: fnSignUp } = useFetch(signup, formData);
  useEffect(() => {
    if (error === null && data) {
      navigate(`/dashboard?${link ? `createNew${link}` : ""}`);
      fetchUser();
    }
  }, [data, error]);
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSignUp = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
          profile_pic:Yup.mixed().required("Profile Pic is required")
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignUp();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>if you dont have one</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            onChange={handleInputChange}
            value={formData.name}
          />
          {errors.name && <Error message={errors.name} />}
        </div>

        <div className="space-y-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
            value={formData.email}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
        <div className="space-y-1">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
            value={formData.password}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            type="file"
            name="profile_pic"
            onChange={handleInputChange}
            accept="image/*"
            // value={formData.profile_pic}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSignUp}>
          {loading ? <BeatLoader size={10} color="black" /> : "Create Account"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Signup;
