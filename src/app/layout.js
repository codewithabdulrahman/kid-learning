import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry'
import GlobalStyle from './styles/GlobalStyle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kid Math - Fun Learning for 3-4 Year Olds',
  description: 'Interactive math learning app with games, videos, and drawing activities for preschoolers',
  keywords: 'math, learning, preschool, counting, shapes, addition, interactive',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
