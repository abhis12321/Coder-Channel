"use client"
import { useAuth } from "@/app/_components/AuthProvider"
import LoggedInUserProfile from "@/app/_components/LoggedInUserProfile";
import NotLoggedInUserProfile from "@/app/_components/NotLoggedInUserProfile";

export default function page({ params }) {
  const { user } = useAuth();
  return (
    <>
      {
        params?._id === user?._id ?
          <LoggedInUserProfile />
          :
          <NotLoggedInUserProfile params={params}/>
      }
    </>
  )
}
