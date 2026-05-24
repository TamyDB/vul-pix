import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DANIELE from '../assets/DANIELE_4mdp.PNG';
import { useLocation } from 'react-router-dom'
 
export default function PaginaCompra() {
  const { state } = useLocation()
  const card = state?.card
  const [quantidade, setQuantidade] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate();
 
  return (
    <div className="min-h-screen font-['Poppins',sans-serif] bg-gradient-to-b from-[#B5DBFF] to-[#458CBF]">
      
      {/* Header */}
      <header className="absolute left-3 top-3 text-[#0179be] text-3xl cursor-pointer transition-transform duration-300 hover:-translate-x-1 select-none">
        <img src={DANIELE} alt="logo" width={170} height={80} onClick={() => navigate('/')} />
      </header>
 
      {/* Fundo gradiente */}
      <div
        className="min-h-screen flex flex-col items-center px-[5%] pb-10 pt-[100px]"
      >
 
        {/* Card */}
        <div className="relative flex items-center gap-6 bg-[#DAE6F3] rounded-2xl p-4 w-full max-w-[950px] min-h-[340px] flex-col md:flex-row">
 
          {/* Voltar */}
          <span
            className="hover:scale-145 absolute left-5 top-2 text-[#0179be] text-3xl cursor-pointer transition-transform duration-300 hover:-translate-x-1 select-none"
            onClick={() => navigate('/')}
          >
            ‹
          </span>
 
          {/* Favorito */}
          <span
            className="hover:scale-145 absolute right-7 top-4 text-[#0179be] text-3xl cursor-pointer transition-transform duration-300 hover:-translate-x-1 select-none"
            onClick={() => setFavorito(f => !f)}
          >
            {favorito ? "❤" : "♡"}
          </span>
 
          {/* Imagem */}
          <img src={card?.image} alt={card?.name}
            className="w-[180px] max-w-[25%] rounded-lg flex-shrink-0 ml-14 mt-5 md:ml-14 md:mt-5 mx-auto mt-8 max-w-[55%] md:max-w-[25%]"
          />
 
          {/* Info */}
          <div className="flex flex-col gap-2 flex-1 items-center text-center md:items-start md:text-left">
            <h2 className="text-[#0179be] text-2xl md:ml-10">{card?.name}</h2>
            <p className="text-[#0179be] text-xl md:ml-20">Vendedor</p>
            <h3 className="text-[#00196d] font-bold text-2xl md:ml-5">R$ {card?.price?.toFixed(2)}</h3>
            <p className="text-[#0179be] text-lg md:ml-12">Em até 4x R$ {card?.price?.toFixed(2)}</p>
 
            {/* Contador */}
            <div className="flex items-center gap-3 text-[#0179be] font-bold mt-2 self-center md:self-end">
              <button
                className="bg-[#CADFE7] border-none rounded-full w-7 h-7 text-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:opacity-80"
                onClick={() => setQuantidade(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantidade}</span>
              <button
                className="bg-[#CADFE7] border-none rounded-full w-7 h-7 text-lg cursor-pointer transition-transform duration-200 hover:scale-105 hover:opacity-80"
                onClick={() => setQuantidade(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
 
        {/* Descrição */}
        <div className="text-[#00196d] font-bold w-full max-w-[950px] mt-5">
          <p className="text-sm md:text-base font-normal leading-relaxed">
            {card?.description}
          </p>
        </div>
 
        {/* Botões */}
        <div className="flex gap-[5%] pt-8 pb-10 w-full max-w-[950px] justify-center flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            className="w-[45%] max-w-[225px] h-[50px] rounded-3xl px-6 text-lg border-2 border-[#4a90b8] bg-white text-[#0179be] cursor-pointer transition-all duration-200 hover:opacity-85 hover:scale-103 sm:w-[45%] w-[85%]"
          >
            🛒 Carrinho
          </button>
          <button
            type="button"
            className="w-[45%] max-w-[225px] h-[50px] rounded-3xl px-6 text-lg bg-[#4a90b8] text-white border-none cursor-pointer transition-all duration-200 hover:opacity-85 hover:scale-103 sm:w-[45%] w-[85%]"
          >
            Compre agora
          </button>
        </div>
 
      </div>
    </div>
  );
}