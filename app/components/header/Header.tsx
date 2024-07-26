export default function Header() {
  return (
    <header className="w-full h-24 border-b flex items-center justify-between">
      <div className="ml-5 w-2/6">
        <input type="text" className="w-auto p-2 h-10 border-black border shadow-sm rounded-md" placeholder="Pesquise o heroi" />
      </div>
      <div className="self-center w-full flex justify-center">
        <span>Desafio estagio Logisitca LTDA</span>
      </div>
    </header>
  )
}