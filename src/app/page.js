import Link from 'next/link'

export default function Home() {

  return (
    <main className="container mx-auto">
      <h1 className="text-5xl">Face Register</h1>
      <Link href="/dashboard"><button>view dashboard</button></Link>
    </main>
  )
}
