import { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne+Tactile&display=swap" rel="stylesheet"/>      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
