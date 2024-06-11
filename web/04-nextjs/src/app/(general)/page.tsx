import { paths } from '@/const/paths'
import Link from 'next/link'

interface MenuLink {
  text: string
  url: string
}

const links: MenuLink[] = [
  {
    text: 'Server Component',
    url: paths.serverComponent,
  },
  {
    text: 'Client Component',
    url: paths.clientComponent,
  },
  {
    text: 'Characters',
    url: paths.allCharacters,
  },
  {
    text: 'Info',
    url: paths.info,
  },
  {
    text: 'About',
    url: paths.about,
  },
]

export default function Home() {
  return (
    <div className='flex h-screen flex-col justify-center'>
      <ul className='list-none'>
        {links.map((item) => (
          <li key={item.text}>
            <Link href={item.url} className='hover:underline'>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
      <br />
      <br />
    </div>
  )
}
