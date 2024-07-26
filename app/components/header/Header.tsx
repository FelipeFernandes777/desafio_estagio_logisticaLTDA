import { Search } from "@mui/icons-material"

export default function Header() {
  return (
    <header className="w-full h-24 flex items-center bg-[#f7f7f7]">
      <div className="ml-5 relative flex items-center">
        <input type="text"
          className="w-full p-3 h-10 shadow-sm rounded-md focus:outline-none"
          placeholder={`Pesquise o heroi`}
        />
        <Search className="absolute right-1 opacity-20"/>
      </div>
    </header>
  )
}