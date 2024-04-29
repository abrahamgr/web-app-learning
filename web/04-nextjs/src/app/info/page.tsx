import { PageProps } from '@/types/page'
import { headers } from 'next/headers'

export default function InfoPage({ searchParams }: PageProps) {
  return (
    <div>
      <h1 className='p-12'>Info</h1>
      <pre>{JSON.stringify({ searchParams }, null, 2)}</pre>
    </div>
  )
}
