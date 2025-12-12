import { useCallback, useState } from "react";
import { type Side, useStreetFighter } from "use-street-fighter";
import "./styles.css";

type CommandType =
  | "hadouken"
  | "shoryuken"
  | "tatsumaki"
  | "sonicboom"
  | "spinningbirdkick";

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
    sonicboom: 0,
    spinningbirdkick: 0,
  });

  const triggerEffect = useCallback((type: CommandType) => {
    const id = Date.now();
    setEffects((prev) => [...prev, { id, type }]);
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== id));
    }, 1200);
  }, []);

  useStreetFighter({
    side,
    onHadouken: () => triggerEffect("hadouken"),
    onShoryuken: () => triggerEffect("shoryuken"),
    onTatsumaki: () => triggerEffect("tatsumaki"),
    onSonicBoom: () => triggerEffect("sonicboom"),
    onSpinningBirdKick: () => triggerEffect("spinningbirdkick"),
  });

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">USE-STREET-FIGHTER</h1>
        <p className="subtitle">COMMAND INPUT HOOKS FOR REACT</p>
      </header>

      <div className="side-selector">
        <span className="side-label">PLAYER</span>
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
          name="HADOUKEN"
          japanese="波動拳"
          arrows={side === "1P" ? "↓ ↘ →" : "↓ ↙ ←"}
          button="P"
          notation={side === "1P" ? "236+P" : "214+P"}
          count={counts.hadouken}
          type="hadouken"
        />
        <CommandCard
          name="SHORYUKEN"
          japanese="昇龍拳"
          arrows={side === "1P" ? "→ ↓ ↘" : "← ↓ ↙"}
          button="P"
          notation={side === "1P" ? "623+P" : "421+P"}
          count={counts.shoryuken}
          type="shoryuken"
        />
        <CommandCard
          name="TATSUMAKI"
          japanese="竜巻旋風脚"
          arrows={side === "1P" ? "↓ ↙ ←" : "↓ ↘ →"}
          button="K"
          notation={side === "1P" ? "214+K" : "236+K"}
          count={counts.tatsumaki}
          type="tatsumaki"
        />
        <CommandCard
          name="SONIC BOOM"
          japanese="ソニックブーム"
          arrows={side === "1P" ? "← charge →" : "→ charge ←"}
          button="P"
          notation={side === "1P" ? "[4]6+P" : "[6]4+P"}
          count={counts.sonicboom}
          type="sonicboom"
        />
        <CommandCard
          name="SPINNING BIRD"
          japanese="スピニングバードキック"
          arrows="↓ charge ↑"
          button="K"
          notation="[2]8+K"
          count={counts.spinningbirdkick}
          type="spinningbirdkick"
        />
      </div>

      <div className="instructions">
        <h3>- CONTROLS -</h3>
        <div className="controls-grid">
          <div className="control-item">
            <span className="key-group arrows">↑↓←→</span>
            <span>or</span>
            <span className="key-group">WASD</span>
            <span className="control-label">MOVE</span>
          </div>
          <div className="control-item">
            <span className="key">P</span>
            <span className="control-label">PUNCH</span>
          </div>
          <div className="control-item">
            <span className="key">K</span>
            <span className="control-label">KICK</span>
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
  arrows,
  button,
  notation,
  count,
  type,
}: {
  name: string;
  japanese: string;
  arrows: string;
  button: string;
  notation: string;
  count: number;
  type: CommandType;
}) {
  return (
    <div className={`command-card ${type}`}>
      <div className="command-header">
        <h2 className="command-name">{name}</h2>
        <span className="command-japanese">{japanese}</span>
      </div>
      <div className="command-count">
        <span className="count-label">HIT</span>
        <span className="count-value">{String(count).padStart(2, "0")}</span>
      </div>
      <div className="command-input-row">
        <span className="command-input">
          <span className="command-arrows">{arrows}</span>{" "}
          <span className="command-button">{button}</span>
        </span>
        <span className="command-notation">{notation}</span>
      </div>
    </div>
  );
}

function EffectOverlay({ type }: { type: CommandType }) {
  const effectConfig = {
    hadouken: { text: "HADOUKEN!", japanese: "波動拳", color: "#58d8d8" },
    shoryuken: { text: "SHORYUKEN!", japanese: "昇龍拳", color: "#f89830" },
    tatsumaki: { text: "TATSUMAKI!", japanese: "竜巻旋風脚", color: "#58b858" },
    sonicboom: {
      text: "SONIC BOOM!",
      japanese: "ソニックブーム",
      color: "#d858d8",
    },
    spinningbirdkick: {
      text: "SPINNING BIRD!",
      japanese: "スピニングバードキック",
      color: "#d8d858",
    },
  };

  const config = effectConfig[type];

  return (
    <div
      className="effect-overlay"
      style={{ "--effect-color": config.color } as React.CSSProperties}
    >
      <div className="hit-marks pos1">★</div>
      <div className="hit-marks pos2">★</div>
      <div className="hit-marks pos3">★</div>
      <div className="effect-text">{config.text}</div>
      <div className="effect-subtitle">{config.japanese}</div>
    </div>
  );
}
