import './globals.css'
import AuthProvider from './_components/AuthProvider'
import { cookies } from 'next/headers'

export const metadata = {
  title: "Coder'channel",
  description: 'A Coding and Development discussion app',
}

export default function RootLayout({ children }) {
  const cookieStore = cookies();
  const { value : initial_theme } = cookieStore.get('theme') || "dark";

  return (
    <html lang="en" className="">
      <AuthProvider initial_theme={initial_theme}>
        {children}
      </AuthProvider>
    </html>
  )
}
