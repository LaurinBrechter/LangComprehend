import Image from 'next/image'
import Link from 'next/link'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className='h-[90%]'>
      Home
      {/* <Link href="/comprehension">users</Link> */}
      <Footer />
    </main>
  )
}
