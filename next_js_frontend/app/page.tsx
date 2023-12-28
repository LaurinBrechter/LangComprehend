import Image from 'next/image'
import Link from 'next/link'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className='h-[93%]'>
      <div className='flex flex-col h-full'>
        <div className='grow flex items-center justify-center'>
          Home
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </main>
  )
}
