import { useCallback, useState } from "react";
import {
  type Side,
  useHadoken,
  useShoryuken,
  useTatsumaki,
} from "use-street-fighter";
import "./styles.css";

type CommandType = "hadouken" | "shoryuken" | "tatsumaki";

type CommandEffect = {
  id: number;
  type: CommandType;
};

export function App() {
  const [side, setSide] = useState<Side>("1P");
  const [effects, setEffects] = useState<CommandEffect[]>([]);
  const [counts, setCounts] = useState({
    hadouken: 0,
    shoryuken: 0,
    tatsumaki: 0,
  });

  const triggerEffect = useCallback((type: CommandType) => {
    const id = Date.now();
    setEffects((prev) => [...prev, { id, type }]);
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== id));
    }, 1500);
  }, []);

  useHadoken({
    side,
    onCommand: () => triggerEffect("hadouken"),
  });

  useShoryuken({
    side,
    onCommand: () => triggerEffect("shoryuken"),
  });

  useTatsumaki({
    side,
    onCommand: () => triggerEffect("tatsumaki"),
  });

  return (
    <div className="container">
      <div className="scroll-bg" />

      <header className="header">
        <h1 className="title">use-street-fighter</h1>
        <p className="subtitle">Master the Ancient Arts of Command Input</p>
      </header>

      <div className="side-selector">
        <span className="side-label">Choose Your Side</span>
        <div className="side-buttons">
          <button
            type="button"
            className={`side-btn ${side === "1P" ? "active" : ""}`}
            onClick={() => setSide("1P")}
          >
            1P
          </button>
          <button
            type="button"
            className={`side-btn ${side === "2P" ? "active" : ""}`}
            onClick={() => setSide("2P")}
          >
            2P
          </button>
        </div>
      </div>

      <div className="commands-grid">
        <CommandCard
          name="Hadouken"
          japanese="波動拳"
          command={side === "1P" ? "↓ ↘ → + P" : "↓ ↙ ← + P"}
          notation={side === "1P" ? "236P" : "214P"}
          count={counts.hadouken}
          type="hadouken"
        />
        <CommandCard
          name="Shoryuken"
          japanese="昇龍拳"
          command={side === "1P" ? "→ ↓ ↘ + P" : "← ↓ ↙ + P"}
          notation={side === "1P" ? "623P" : "421P"}
          count={counts.shoryuken}
          type="shoryuken"
        />
        <CommandCard
          name="Tatsumaki"
          japanese="竜巻旋風脚"
          command={side === "1P" ? "↓ ↙ ← + K" : "↓ ↘ → + K"}
          notation={side === "1P" ? "214K" : "236K"}
          count={counts.tatsumaki}
          type="tatsumaki"
        />
      </div>

      <div className="instructions">
        <h3>Controls</h3>
        <div className="controls-grid">
          <div className="control-item">
            <span className="key-group">↑↓←→</span>
            <span>or</span>
            <span className="key-group">WASD</span>
            <span className="control-label">Directions</span>
          </div>
          <div className="control-item">
            <span className="key">P</span>
            <span className="control-label">Punch</span>
          </div>
          <div className="control-item">
            <span className="key">K</span>
            <span className="control-label">Kick</span>
          </div>
        </div>
      </div>

      {effects.map((effect) => (
        <EffectOverlay key={effect.id} type={effect.type} />
      ))}
    </div>
  );
}

function CommandCard({
  name,
  japanese,
  command,
  notation,
  count,
  type,
}: {
  name: string;
  japanese: string;
  command: string;
  notation: string;
  count: number;
  type: CommandType;
}) {
  return (
    <div className={`command-card ${type}`}>
      <div className="card-ornament top-left" />
      <div className="card-ornament top-right" />
      <div className="card-ornament bottom-left" />
      <div className="card-ornament bottom-right" />

      <h2 className="command-name">{name}</h2>
      <p className="command-japanese">{japanese}</p>
      <div className="command-input">{command}</div>
      <div className="command-notation">{notation}</div>
      <div className="command-count">
        <span className="count-label">Executed</span>
        <span className="count-value">{count}</span>
      </div>
    </div>
  );
}

function EffectOverlay({ type }: { type: CommandType }) {
  const effectConfig = {
    hadouken: { text: "波動拳!", color: "#4da6ff", symbol: "🔥" },
    shoryuken: { text: "昇龍拳!", color: "#ff6b4d", symbol: "⚡" },
    tatsumaki: { text: "竜巻旋風脚!", color: "#7b68ee", symbol: "🌀" },
  };

  const config = effectConfig[type];

  return (
    <div
      className="effect-overlay"
      style={{ "--effect-color": config.color } as React.CSSProperties}
    >
      <div className="effect-symbol">{config.symbol}</div>
      <div className="effect-text">{config.text}</div>
    </div>
  );
}
