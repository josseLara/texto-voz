import Mensaje from "./components/Mesaje"


function App() {

  return (
    <main className="flex flex-col justify-center items-start w-[100%] gap-5 h-[100vh] px-[10%] md:px-[0%] md:items-center">
      <h1 className='text-white text-3xl sm:text-5xl font-bold '><span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text ">Texto a Voz:</span> Tu Palabra con Voz Natural</h1>
      <p className="w-[100%] sm:w-[50%] text-gray-200 mb-6 text-start md:text-center">Convierte tus palabras en una experiencia auditiva auténtica con nuestra tecnología de 'Texto a Voz' y una voz natural de vanguardia.</p>
      <Mensaje />
    </main>
  )
}

export default App
