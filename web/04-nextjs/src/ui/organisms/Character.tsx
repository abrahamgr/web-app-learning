import Image from 'next/image'
import { Character } from '@/types/Character'

interface CharacterComponentProps {
  character: Character
}

export function CharacterComponent({
  character: { name, image, status, gender },
}: CharacterComponentProps) {
  return (
    <div className='flex min-w-[250px] rounded-md bg-slate-700'>
      <Image
        src={image}
        alt='character'
        width={100}
        height={100}
        unoptimized
        className='rounded-l-md'
      />
      <div className='flex flex-col p-2 text-xs'>
        <span>{name}</span>
        <span>
          {status} - {gender}
        </span>
      </div>
    </div>
  )
}
