import './globals.css'
import AuthProvider from './_components/AuthProvider'
import { cookies } from 'next/headers'
import { CODER_CHANNEL_TOCKEN } from '../constants';
import axios from 'axios';

export const metadata = {
  title: "Coder'channel",
  description: 'A Coding and Development discussion app',
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies();
  const { value : initial_theme } = cookieStore.get('theme') || "dark";

  return (
    <html lang="en" className="">
      <AuthProvider initial_theme={initial_theme} tocken={null} >
        {children}
      </AuthProvider>
    </html>
  )
}
