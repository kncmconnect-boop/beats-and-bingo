import './globals.css'

export const metadata = {
  title: 'Beats and Bingo',
  description: 'Music meets gaming - Interactive music bingo experience',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
