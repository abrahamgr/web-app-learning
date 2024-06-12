import { PageProps } from '@/types/page'
import { SignIn } from '@/ui/organisms/SignIn'

export default function Login({ searchParams }: PageProps) {
  return (
    <div className='flex h-screen items-center'>
      <SignIn callbackUrl={searchParams.callbackUrl} />
    </div>
  )
}
