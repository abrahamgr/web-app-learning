'use client'

import Image from 'next/image'
import { Character } from '@/types/character'
import starIcon from '@/icons/star.svg'
import starFilledIcon from '@/icons/star-filled.svg'
import { setFavoriteCharacterAction } from '@/actions/character'

interface CharacterComponentProps {
  character: Character
  isFavorite?: boolean
}

export function CharacterComponent({
  character: { name, image, status, gender, id },
  isFavorite,
}: CharacterComponentProps) {
  return (
    <div className='flex h-[100px] w-[250px] rounded-md bg-slate-700'>
      <Image
        src={image}
        alt='character'
        width={100}
        height={100}
        unoptimized
        className='rounded-l-md'
      />
      <div className='flex w-full flex-col p-2 text-xs'>
        <Image
          src={isFavorite ? starFilledIcon : starIcon}
          width={15}
          height={15}
          alt={`${isFavorite ? 'unmark' : 'mark'}-favorite`}
          className='cursor-pointer self-end'
          onClick={() => setFavoriteCharacterAction(id)}
        />
        <span>{name}</span>
        <span>
          {status} - {gender}
        </span>
      </div>
    </div>
  )
}
