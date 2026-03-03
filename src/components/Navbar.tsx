import Image from "next/image"
export default function Navbar() {
  return (
    <nav className="flex justify-between p-6">
      <div className="flex items-center space-x-2">
      <Image
        src="/logo_rounded.svg"
        alt="TableTap logo"
        width={32}
        height={32}
      />
      <h1 className="font-bold text-xl">TableTap</h1>
      </div>
      <div className="space-x-6">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <a href="#github">GitHub</a>
      </div>
    </nav>
  )
}