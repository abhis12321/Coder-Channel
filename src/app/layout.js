import './globals.css'
import { cookies } from "next/headers";
import { getJWTUser } from '@/utilities/getJWTUser';
import AuthProvider from './_components/AuthProvider';

export const metadata = {
  title: "DevSphere",
  description: 'A Coding and Development discussion app',
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const { value : initial_theme } = cookieStore.get('theme') || "dark";
  const initialUserValue = getJWTUser();

  return (
    <html lang="en" className="">
      <AuthProvider initial_theme={initial_theme} initialUserValue={initialUserValue}>
        {children}
      </AuthProvider>
    </html>
  )
}
