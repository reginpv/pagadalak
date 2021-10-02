import Footer from '../footer'
import Header from '../header'
import Meta from './meta'

const Basic = ({ children, className, meta }) => {

  return(
    <>
    <Meta {...meta} />
    <div className={`template template--basic min-h-screen flex flex-col text-16px ${className}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
    </>
  )
}
export default Basic;