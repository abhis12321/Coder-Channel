"use client";
import Link from "next/link";
import { useAuth } from "/mongo/AuthProvider";

export default function Page() {
  let USER = useAuth();

  return (
    <>
      {USER.user ? (
        <>
          <h2>Hello Jack Sparrow..!</h2>
          <button onClick={USER.logout}> Logout</button>
        </>
      ) 
      :
      (
        <Link href={`/login`}>Login</Link>
      )}
    </>
  );
}
