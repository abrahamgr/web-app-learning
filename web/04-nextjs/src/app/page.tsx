import { paths } from '@/const/paths'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <p>Page</p>
      <Link href={paths.serverComponent}>Server Component</Link>
      <br />
      <Link href={paths.clientComponent}>Client Component</Link>
    </div>
  )
}
