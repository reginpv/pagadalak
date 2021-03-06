import 'tailwindcss/tailwind.css'
import '../styles/style.css'

import { GlobalProvider } from '../context/GlobalState';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
