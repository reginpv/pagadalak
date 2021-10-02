import Head from 'next/head'
import { SITE_DESCRIPTION, SITE_TITLE } from '../../config/constants'

export default function Meta({ title = SITE_TITLE, description = SITE_DESCRIPTION }){
  return(
    <Head>

      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <title>{ title }</title>
      <meta name="description" content={ description } />

      <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
    </Head>

  )
}