import Link from "next/link"

const Header = () => {
  return (
    <>
      <header className="bg-white drop-shadow-md h-12 flex justify-center items-center">
        <Link href="/" className="text-xl mr-5 text-gray-800">
          top
        </Link>
        <Link href="/about" className="text-xl text-gray-800">
          about
        </Link>
        {/* <Link href="/blog" className="text-xl">
          blog
        </Link> */}
      </header>
    </>
  )
}

export default Header;