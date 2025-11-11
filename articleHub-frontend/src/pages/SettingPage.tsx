import React, { useState, useEffect } from "react";
import Setting from "./Setting";
import type { ProfileData } from "../interfaces/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getUserApi, updatePasswordApi, updateProfile } from "../api/userAuth";
import { toast } from "react-toastify";

const SettingPage: React.FC = () => {
   const [user, setUser] = useState<ProfileData | null>(null);
   const fetchUser = async () => {
      const response = await getUserApi()
      if (response.success) {
         setUser(response.data);
      }
   };
   useEffect(() => {
      fetchUser();
   }, []);

   const handleSaveProfile = async (updatedUser: ProfileData) => {

      const response = await updateProfile(updatedUser)
      if (response.success) {
         toast.success(response.message)
         fetchUser()
      }
   };

   const handleChangePassword = async (currentPass: string, newPass: string) => {
      const response = await updatePasswordApi(currentPass,newPass)
      if(response.success){
         toast.success(response.message)
      }
   };

   const handleCancel = () => {
      console.log("Cancel clicked");
   };

   if (!user) return <div>Loading...</div>;

   return (
      <>
         <Header page='setting' />
         <Setting
            user={user}
            onSaveProfile={handleSaveProfile}
            onChangePassword={handleChangePassword}
            onCancel={handleCancel}
         />
         <Footer />
      </>
   );
};

export default SettingPage;
