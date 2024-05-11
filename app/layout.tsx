import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProviders'
import UserProvider from '@/providers/userProvider'
import ModalProvider from '@/providers/ModalProviders'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrice from '@/actions/getActiveProductsWithPrice'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Listen to music',
}
export const revalidate=0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs=await getSongsByUserId();
  const products=await getActiveProductsWithPrice();
  return (
    <html lang="en">
      <body className={font.className}>
    <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
        
      </body>
    </html>
  )
}
