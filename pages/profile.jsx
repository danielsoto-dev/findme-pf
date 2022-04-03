import React from "react";

import { useUser } from "@auth0/nextjs-auth0";
import { Header } from "../components/Header";
const Profile = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <>
      <Header />
    </>
  );
};
export default Profile;
