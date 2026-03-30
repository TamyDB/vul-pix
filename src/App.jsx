import { useState, useEffect } from 'react'
import vulpixLogo from '/vulpixLogo.svg'

const PokemonEmbed = ({ isVisible, onOpen, onClose }) => {
  const startGame = () => {
    onOpen();

    window.EJS_player = "#game";
    window.EJS_core = "gba";
    window.EJS_color = "#000000";
    window.EJS_startOnLoaded = true;
    window.EJS_pathtodata = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data";
    window.EJS_gameUrl = "https://cdn.jsdelivr.net/gh/7363272/ESPG@7aa7497bb64f4448ed3159d1fde86c7e82e6312d/games/pokemonfirered/rom.gba";

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/storage/emulatorjs/data/loader.js";
    script.async = true;
    document.body.appendChild(script);
  };

  if (!isVisible) {
    return (
      <button
        onClick={startGame}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 p-2 rounded-lg transition-all duration-500 ease-in-out bg-transparent hover:bg-black/40 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-37.5 transition-all duration-500 text-[10px] text-zinc-500 uppercase tracking-widest whitespace-nowrap">
          Launch Emulator
        </span>

        <div className="w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-colors shadow-sm" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 z-40 w-124 h-80 bg-transparent group">
      <div
        id="game"
        className="w-full h-full rounded-lg overflow-hidden"
      ></div>
      <button
        onClick={onClose}
        className="absolute -top-8 right-0 text-zinc-500 hover:text-zinc-700 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0)
  const [embeddStarted, setEmbedStarted] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <a
        href="https://github.com/tamydb/vul-pix"
        target="_blank"
      >
        <img src={vulpixLogo} className="h-32" alt="Vite logo" />
      </a>
      <h1
        className="text-6xl text-[#213547] font-bold mb-8"
      >
        Vul-Pix
      </h1>
      <div className="flex gap-4">
        <button
          className="cursor-pointer px-4 py-2 bg-white font-medium text-black border border-white hover:border-black transition-colors duration-300 rounded-lg"
          onClick={() => setCount((count) => count + 1)}
        >
          Contador está em {count}
        </button>
        <button
          className="cursor-pointer px-4 py-2 bg-white font-medium text-black border border-white hover:border-black transition-colors duration-300 rounded-lg"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
      <p className="animate-rainbow-fast bg-rainbow-vivid font-extrabold bg-clip-text text-transparent text-md">
        WIP
      </p>
      <p className="font-light">Clique aqui para ser redirecionado ao repositório do <a className="font-bold" href="https://github.com/tamydb/vul-pix">Github</a></p>
      <PokemonEmbed 
        isVisible={embeddStarted} 
        onOpen={() => setEmbedStarted(true)}
        onClose={() => setEmbedStarted(false)}
      />
    </div>
  )
}

export default App
