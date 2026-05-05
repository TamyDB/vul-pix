import { useState } from "react";
import "./PaginaCompra.css";
import { useNavigate } from 'react-router-dom'
import vulpixImg from './vulpix.png'

export default function PaginaCompra() {
  const [quantidade, setQuantidade] = useState(1);
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate()


  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      {/* Header */}
      <header className="header">
        <img src={vulpixImg} alt="logo" width={170} height={80} />
      </header>

      <div className="pagina-compra">
        {/* Card */}
        <div className="card">
          <span
            className="voltar cursor-pointer transition-transform duration-300 hover:-translate-x-2"
            onClick={() => navigate('/')}
            >
            ‹
            </span>
          <img
            src="https://commondatastorage.googleapis.com/images.pricecharting.com/55cea396baa297a6201077c9ecc55019c23b7177bcacb19a3d5152536c87f0da/1600.jpg"
            alt="Blastoise EX"
            className="card-img"
          />

          <div className="info">
            <h2 className="titulo-carta">Cards EX</h2>
            <p className="vendedor">Vendedor</p>
            <h3 className="preco-label">PREÇO</h3>
            <p className="parcelas">Em até 4x R$00,00</p>

            <div className="contador">
              <button onClick={() => setQuantidade(q => Math.max(1, q - 1))}>−</button>
              <span>{quantidade}</span>
              <button onClick={() => setQuantidade(q => q + 1)}>+</button>
            </div>
          </div>

          <span
            className="favorito"
            onClick={() => setFavorito(f => !f)}
            style={{ color: favorito ? "rgb(172, 197, 241)" : "#67819D" }}
          >
            {favorito ? "❤" : "♡"}
          </span>
        </div>

        {/* Descrição */}
        <div className="descricao">
          <p>
            Blastoise ex é uma carta de Pokémon do tipo Água de Estágio 2, conhecida por sua alta
            resistência (geralmente 330 HP na série Scarlet & Violet) e alto potencial de dano. Ele
            evolui do Wartortle e se destaca pela habilidade "Carapaça Sólida" (recebe 30 a menos de
            dano) e pelo ataque "Canhões Gêmeos", capaz de desferir até 280 de dano.
          </p>
        </div>

        {/* Botões */}
        <div className="button1">
          <button type="button">🛒 Carrinho</button>
          <button type="button">Compre agora</button>
        </div>
      </div>
    </div>
  );
}