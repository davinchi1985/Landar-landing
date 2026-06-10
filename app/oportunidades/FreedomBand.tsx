import { freedomIndex as f, sovereignRating as s } from "../lib/freedom-index";

// Banda "por qué ahora": ancla el radar a un dato real e internacional.
export default function FreedomBand() {
  const ranksClimbed = f.prevRank - f.rank;
  return (
    <section className="radar-freedom">
      <div className="radar-freedom__lead">
        <span className="eyebrow">Por qué ahora</span>
        <h2>
          Argentina fue el país que <em>más subió</em> en libertad económica
          del mundo en {f.year}.
        </h2>
      </div>

      <div className="radar-freedom__stats">
        <div className="radar-freedom__stat">
          <span className="radar-freedom__num">{f.score}</span>
          <span className="radar-freedom__lbl">
            Score {f.year}
            <span className="radar-freedom__up">▲ +{f.delta} pts</span>
          </span>
        </div>
        <div className="radar-freedom__stat">
          <span className="radar-freedom__num">#{f.rank}</span>
          <span className="radar-freedom__lbl">
            Ranking mundial
            <span className="radar-freedom__up">▲ {ranksClimbed} puestos</span>
          </span>
        </div>
        <div className="radar-freedom__stat">
          <span className="radar-freedom__num">#1</span>
          <span className="radar-freedom__lbl">en mejora, de todo el índice</span>
        </div>
        <div className="radar-freedom__stat">
          <span className="radar-freedom__num">{s.rating}</span>
          <span className="radar-freedom__lbl">
            Crédito soberano {s.agency}
            <span className="radar-freedom__up">▲ desde {s.prevRating}</span>
          </span>
        </div>
      </div>

      <div className="radar-freedom__srcs">
        <a className="radar-freedom__src" href={f.source.url} target="_blank" rel="noopener noreferrer">
          Fuente: {f.source.name} ↗
        </a>
        <a className="radar-freedom__src" href={s.source.url} target="_blank" rel="noopener noreferrer">
          Fuente: {s.source.name} ↗
        </a>
      </div>
    </section>
  );
}
