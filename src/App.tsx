import { ArrowLeft, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from './components/ui/button'
import { useCardStore } from './store/useCardStore'
import afirmacoes from './data/afirmacoes_flavio_bolsonaro.json'
import './App.css'

type Card = {
  category: string
  title: string
  quote: string
  context: string
  sourceName: string
  sourceUrl: string
  date: string
  suit: string
}

const cards: Card[] = afirmacoes.map(({
  category, title, quote, context, sourceName, sourceUrl, date, suit
}) => ({
  category,
  title,
  quote,
  context,
  sourceName,
  sourceUrl,
  date,
  suit
})) as Card[]

function App() {
  const { activeIndex, showSource, setActiveIndex, setShowSource, changeCard } = useCardStore()
  const card = cards[activeIndex]

  return (
    <main className="mx-auto min-h-screen w-[min(100%-38px,1120px)] text-[var(--fg)] sm:w-[min(100%-64px,1120px)]">
      <header className="flex h-[65px] items-center justify-between border-b border-[var(--border)] font-mono text-[10px] tracking-[.08em] sm:h-[76px]">
        <a className="flex items-center gap-2.5 font-medium text-[var(--fg)] no-underline" href="#top" aria-label="Baralho público, início">
          <span className="grid size-7 place-items-center rounded-full bg-[var(--accent-light)] font-mono text-[11px] tracking-[-.08em]">BP</span>
          <span>BARALHO<span className="ml-[3px] text-[var(--muted)]">PÚBLICO</span></span>
        </a>
        <span className="hidden items-center gap-2 text-[var(--muted)] sm:flex"><span className="size-1.5 rounded-full bg-[var(--accent)]" /> ARQUIVO DE DECLARAÇÕES PÚBLICAS</span>
        <a className="flex items-center gap-2 text-[var(--fg)] no-underline" href="#sobre">Sobre o projeto <ArrowRight size={14} /></a>
      </header>

      <section className="border-b border-[var(--border)] py-[55px] sm:py-[75px]">
        <div className="flex items-center gap-2.5 font-mono text-[10px] text-[var(--muted)]"><span className="h-px w-[21px] bg-[var(--accent)]" /> POLÍTICA EM CARTAS, FONTES À MÃO</div>
        <h1 className="my-[27px] font-serif text-[clamp(58px,14vw,82px)] leading-[.99] tracking-[-.055em] sm:text-[clamp(58px,8vw,96px)]">As palavras<br />também <em className="text-[var(--accent)]">contam.</em></h1>
        <div className="flex items-end justify-between">
          <p className="m-0 max-w-[370px] text-xs leading-[1.7] text-[var(--muted)] sm:text-sm">Declarações públicas de Flávio Bolsonaro sobre direitos, democracia e vida cotidiana — com contexto e caminhos para conferir.</p>
          <div className="flex items-center gap-2.5 font-mono text-[9px] leading-[1.5] text-[var(--muted)]"><strong className="font-serif text-[32px] font-normal text-[var(--fg)]">0{cards.length}</strong><span>CARTAS<br />NO BARALHO</span></div>
        </div>
      </section>

      <section className="py-[29px] pb-11" aria-label="Baralho de declarações">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-[17px]"><span className="font-mono text-[9px] text-[var(--muted)]">01 / 0{cards.length}</span><span className="font-serif text-[21px]">O baralho</span></div>
          <span className="flex items-center gap-1.5 pt-[7px] font-mono text-[9px] text-[var(--muted)]"><ArrowLeft size={13} /><span className="hidden sm:inline">USE AS SETAS PARA EXPLORAR</span><ArrowRight size={13} /></span>
        </div>
        <div className="relative mx-auto my-[27px] h-[min(425px,calc((100vw-76px)*1.25))] w-[min(340px,calc(100vw-76px))] [perspective:1200px] sm:mb-[22px] sm:mt-[34px] sm:h-[425px] sm:w-[340px]">
          <div className="absolute inset-0 rounded-[7px] border border-[var(--border-card)] bg-[var(--bg-subtle)] [transform:rotate(5deg)_translate(11px,5px)]" />
            <article
              className={`playing-card absolute inset-0 ${showSource ? 'flipped' : ''}`}
             onClick={(event) => {
               if (event.target instanceof Element && event.target.closest('blockquote')) {
                 return;
               }
               setShowSource(!showSource);
             }}
             onKeyDown={(event) => {
               if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
                 event.preventDefault()
                 setShowSource(!showSource)
               }
             }}
             role="button"
             tabIndex={0}
             aria-label={showSource ? 'Mostrar frente da carta' : 'Virar carta para ver o QR code e a fonte'}
             aria-pressed={showSource}
           >
            <div className="card-face pointer-events-none absolute inset-0 flex flex-col rounded-[7px] border border-[var(--border-card)] bg-[var(--bg-card)] px-5 py-5 sm:px-6 sm:py-[23px]">
              <div className="flex items-center justify-between font-mono text-[9px] text-[var(--muted)]"><span>DECLARAÇÃO Nº 0{activeIndex + 1}</span><span className="font-serif text-[19px] text-[var(--accent)]">{card.suit}</span></div>
              <div className="my-[15px] mb-[29px] h-px bg-[var(--border)]" />
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase text-[var(--muted)]"><span className="size-[5px] rounded-full bg-[var(--accent)]" /> {card.category}</div>
              <h2 className="mb-[22px] mt-4 font-serif text-[27px] leading-[1.14] tracking-[-.03em] sm:text-[30px]">{card.title}</h2>
               <blockquote className="m-0 border-l-2 border-[var(--accent)] pl-[17px] font-serif text-[17px] leading-[1.48] text-[var(--quote-text)] sm:text-[19px] flex-grow overflow-y-auto min-h-0">{card.quote}</blockquote>
              <div className="mt-auto flex justify-between gap-2 border-t border-[var(--border)] pt-3.5 font-mono text-[8px] text-[var(--muted)]"><span>FLÁVIO BOLSONARO</span><span>BRASIL · {card.date.split(' · ')[0]}</span></div>
              <div className="absolute right-[23px] top-[107px] font-serif text-[42px] text-[var(--bg-subtle)]">{card.suit}</div>
            </div>
            <div className="card-face card-back pointer-events-none absolute inset-0 flex flex-col rounded-[7px] border border-[var(--border-card)] bg-[var(--bg-subtle)] px-5 py-5 sm:px-6 sm:py-[23px]">
              <div className="flex items-center justify-between font-mono text-[9px] text-[var(--muted)]"><span>FONTE & CONTEXTO</span><span className="font-serif text-[19px] text-[var(--accent)]">↗</span></div>
              <div className="my-[15px] mb-[29px] h-px bg-[var(--border)]" />
              <p className="mb-[11px] mt-[-15px] font-sans text-xs leading-[1.6] text-[var(--muted)]">{card.context}</p>
              <div className="grid place-items-center self-center rounded border border-[var(--border-card)] bg-[var(--bg-card)] p-[9px]"><QRCodeSVG value={card.sourceUrl} size={116} bgColor="var(--bg-card)" fgColor="var(--fg)" level="M" /></div>
              <a className="pointer-events-auto flex items-center justify-between gap-2 border-b border-[var(--border)] py-2.5 text-[10px] leading-[1.4] text-[var(--source)] no-underline hover:text-[var(--fg)]" href={card.sourceUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}><span>{card.sourceName}</span><ExternalLink size={14} /></a>
              <span className="mt-auto text-center font-mono text-[8px] tracking-[.06em] text-[var(--muted)]">APONTE A CÂMERA OU ACESSE A FONTE</span>
            </div>
          </article>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-[17px]">
          <Button variant="ghost" size="icon" onClick={() => changeCard(-1, cards.length)} aria-label="Carta anterior"><ArrowLeft size={17} /></Button>
          <div className="flex items-center gap-1.5" aria-label={`Carta ${activeIndex + 1} de ${cards.length}`}>
            {cards.map((item, index) => <button key={item.category} type="button" className={`size-[5px] cursor-pointer rounded-full border-0 bg-[var(--border)] p-0 ${index === activeIndex ? 'w-[18px] bg-[var(--accent)]' : ''}`} onClick={() => setActiveIndex(index)} aria-label={`Ir para carta ${index + 1}`} />)}
          </div>
          <span className="mx-1 font-mono text-[9px] text-[var(--muted)]">0{activeIndex + 1}<span className="text-[var(--muted)]"> / 0{cards.length}</span></span>
           <Button variant="ghost" size="icon" onClick={() => changeCard(1, cards.length)} aria-label="Próxima carta"><ArrowRight size={17} /></Button>
        </div>
      </section>

      <section className="grid gap-[11px] border-y border-[var(--border)] py-[22px] sm:grid-cols-[1fr_1.6fr_auto] sm:items-center sm:gap-[25px]" id="sobre">
        <div className="flex items-center gap-[9px] whitespace-nowrap font-mono text-[9px] text-[var(--muted)]"><ShieldCheck size={17} /><span>LEIA. CONFIRA. TIRE SUAS CONCLUSÕES.</span></div>
        <p className="m-0 font-sans text-[11px] leading-[1.65] text-[var(--muted)]">Arquivo em revisão editorial: as citações e links atuais são referências de pesquisa, não fontes primárias verificadas. Antes de publicar, confirme transcrição literal, autoria, data e contexto em registro oficial ou checagem identificada. Categorias descrevem temas, não são conclusões factuais. Citação atribuída não é endosso.</p>
        <a className="flex items-center gap-[7px] whitespace-nowrap font-mono text-[8px] text-[var(--muted)] no-underline" href={card.sourceUrl} target="_blank" rel="noreferrer">ABRIR FONTE DA CARTA <ExternalLink size={13} /></a>
      </section>
      <footer className="flex flex-col gap-2 py-[22px] pb-7 font-mono text-[8px] text-[var(--muted)] sm:flex-row sm:justify-between sm:gap-5"><span>BARALHO PÚBLICO <span className="mx-[7px] text-[var(--accent)]">/</span> UM ARQUIVO PARA CONSULTAR</span><span>FEITO PARA PENSAR, NÃO PARA SUBSTITUIR A CHECAGEM.</span></footer>
    </main>
  )
}

export default App
