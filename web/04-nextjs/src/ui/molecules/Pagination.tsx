'use client'
import { Button } from '../atoms/Button'
import { useRouter } from 'next/navigation'

export interface PaginationProps {
  currentPage: string
  lastPage: string
  path: string
}

export function Pagination({ currentPage, lastPage, path }: PaginationProps) {
  const router = useRouter()
  const onPrev = () => {
    const pageNumber = Number(currentPage)
    router.push(`${path}?page=${pageNumber - 1}`)
  }
  const onNext = () => {
    const pageNumber = Number(currentPage)
    if (pageNumber > 0) router.push(`${path}?page=${pageNumber + 1}`)
  }
  return (
    <div className='flex w-[200px] justify-between'>
      <Button disabled={currentPage === '1'} onClick={onPrev}>
        Prev
      </Button>
      <span className='flex items-center'>{currentPage}</span>
      <Button disabled={currentPage === lastPage} onClick={onNext}>
        Next
      </Button>
    </div>
  )
}
