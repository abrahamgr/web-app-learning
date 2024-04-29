import { Spinner } from '@/ui/atoms/Spinner'

export default function Loading() {
  return (
    <div className='flex h-screen w-1/2 items-center justify-center'>
      <Spinner />
    </div>
  )
}
