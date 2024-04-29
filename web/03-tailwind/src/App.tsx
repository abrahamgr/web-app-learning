import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function Link({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  return (
    <a
      {...props}
      className={`font-medium text-[#646cff] decoration-inherit hover:text-[#535bf2] ${className ?? ''}`}
    />
  )
}

function Logo({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  return (
    <img
      {...props}
      className={`transiti hover:drop-shadow-[0 0 2em #646cffaa] h-[150px] p-6 ${className ?? ''}`}
    />
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex justify-center">
        <Link href="https://vitejs.dev" target="_blank">
          <Logo src={viteLogo} alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <Logo
            src={reactLogo}
            alt="React logo"
            className="hover:drop-shadow-[0 0 2em #61dafbaa] animate-spin-slow"
          />
        </Link>
      </div>
      <h1 className="text-5xl">Vite + React</h1>
      <div className="p-8">
        <button
          className="ligh: cursor-pointer rounded-lg border-[1px] border-transparent bg-[#1a1a1a] p-3 px-5 hover:border-[#646cff]"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-[#888]">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
