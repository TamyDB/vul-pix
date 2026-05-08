import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import vulpixImg from '../assets/vulpix.png'

export default function PaginaCompra() {
  const [quantidade, setQuantidade] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate()

  return (
    <div className="min-h-screen font-['Poppins',sans-serif]">

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-[1000] px-5 py-[10px] flex items-center">
        <img src={vulpixImg} alt="logo" width={170} height={80} />
      </header>

      {/* Página */}
      <div
        className="min-h-screen pt-[100px] px-[5%] pb-10 flex flex-col items-center"
        style={{ background: 'linear-gradient(180deg, #B5DBFF, #458CBF)', backgroundAttachment: 'fixed' }}
      >

        {/* Card */}
        <div className="flex items-center gap-6 bg-[#DAE6F3] rounded-2xl p-4 relative w-full max-w-[950px] min-h-[340px] md:flex-col md:items-center md:pt-10">

          {/* Voltar */}
          <span
            className="absolute left-[30px] top-[1px] text-[clamp(24px,3vw,40px)] text-[#0179be] cursor-pointer transition-transform duration-300 hover:-translate-x-2 md:left-3 md:top-3"
            onClick={() => navigate('/')}
          >
            ‹
          </span>

          {/* Imagem da carta */}
          <img
            src="https://commondatastorage.googleapis.com/images.pricecharting.com/55cea396baa297a6201077c9ecc55019c23b7177bcacb19a3d5152536c87f0da/1600.jpg"
            alt="Blastoise EX"
            className="w-[180px] max-w-[25%] rounded-lg flex-shrink-0 ml-[60px] mt-5 md:w-[55%] md:max-w-[200px] md:ml-0 sm:w-[70%]"
          />

          {/* Informações */}
          <div className="flex flex-col gap-2 flex-1 md:items-center md:text-center">
            <h2 className="text-[clamp(18px,2.5vw,25px)] text-[#0179be] relative left-10 md:left-0">
              Cards EX
            </h2>
            <p className="text-[clamp(16px,2vw,24px)] text-[#0179be] relative left-20 md:left-0">
              Vendedor
            </p>
            <h3 className="text-[clamp(18px,2.5vw,30px)] text-[#00196d] font-bold relative left-5 md:left-0">
              PREÇO
            </h3>
            <p className="text-[clamp(14px,2vw,24px)] text-[#0179be] relative left-[45px] md:left-0">
              Em até 4x R$00,00
            </p>

            {/* Contador de quantidade */}
            <div className="flex items-center gap-3 text-[#0179be] font-bold self-end mt-2 md:self-center">
              <button
                className="bg-[#CADFE7] border-none rounded-full w-7 h-7 cursor-pointer text-base hover:opacity-80"
                onClick={() => setQuantidade(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantidade}</span>
              <button
                className="bg-[#CADFE7] border-none rounded-full w-7 h-7 cursor-pointer text-base hover:opacity-80"
                onClick={() => setQuantidade(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Favorito */}
          <span
            className="absolute right-[30px] top-4 text-[clamp(24px,3vw,40px)] cursor-pointer md:right-3 md:top-3"
            onClick={() => setFavorito(f => !f)}
            style={{ color: favorito ? "rgb(172, 197, 241)" : "#67819D" }}
          >
            {favorito ? "❤" : "♡"}
          </span>
        </div>

        {/* Descrição */}
        <div className="text-[#00196d] font-bold w-full max-w-[950px] mt-5">
          <p className="text-[clamp(14px,1.8vw,18px)] font-normal leading-relaxed">
            Blastoise ex é uma carta de Pokémon do tipo Água de Estágio 2, conhecida por sua alta
            resistência (geralmente 330 HP na série Scarlet & Violet) e alto potencial de dano. Ele
            evolui do Wartortle e se destaca pela habilidade "Carapaça Sólida" (recebe 30 a menos de
            dano) e pelo ataque "Canhões Gêmeos", capaz de desferir até 280 de dano.
          </p>
        </div>

        {/* Botões */}
        <div className="flex gap-[5%] py-[30px] w-full max-w-[950px] justify-center sm:flex-col sm:items-center sm:gap-3">
          <button
            type="button"
            className="w-[45%] max-w-[225px] h-[50px] rounded-3xl px-6 text-[clamp(16px,2vw,22px)] cursor-pointer transition-all duration-200 bg-white text-[#0179be] border-2 border-[#4a90b8] hover:opacity-85 hover:scale-[1.03] sm:w-[85%] sm:max-w-full"
          >
            🛒 Carrinho
          </button>
          <button
            type="button"
            className="w-[45%] max-w-[225px] h-[50px] rounded-3xl px-6 text-[clamp(16px,2vw,22px)] cursor-pointer transition-all duration-200 bg-[#4a90b8] text-white border-none hover:opacity-85 hover:scale-[1.03] sm:w-[85%] sm:max-w-full"
          >
            Compre agora
          </button>
        </div>

      </div>
    </div>
  );
}