import { useCallback, useState } from "react";
import {
  type Side,
  useStreetFightingCommand,
} from "use-street-fighting-command";
import "./styles.css";

type CommandType =
  | "hadouken"
  | "shoryuken"
  | "tatsumaki"
  | "sonicboom"
  | "spinningbirdkick"
  | "shinkuhadouken"
  | "shungokusatsu";

type CommandEffect = {
  id: number;
  type: CommandType;
};

export function App() {
  const [side, setSide] = useState<Side>("1P");
  const [effects, setEffects] = useState<CommandEffect[]>([]);
  const [shinkuRevealed, setShinkuRevealed] = useState(false);
  const [shunGokuRevealed, setShunGokuRevealed] = useState(false);
  const [counts, setCounts] = useState({
    hadouken: 0,
    shoryuken: 0,
    tatsumaki: 0,
    sonicboom: 0,
    spinningbirdkick: 0,
    shinkuhadouken: 0,
    shungokusatsu: 0,
  });

  const triggerEffect = useCallback((type: CommandType) => {
    const id = Date.now();
    setEffects((prev) => [...prev, { id, type }]);
    setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));

    setTimeout(() => {
      setEffects((prev) => prev.filter((e) => e.id !== id));
    }, 1200);
  }, []);

  const triggerShinkuHadouken = useCallback(() => {
    setShinkuRevealed(true);
    triggerEffect("shinkuhadouken");
  }, [triggerEffect]);

  const triggerShunGokuSatsu = useCallback(() => {
    setShunGokuRevealed(true);
    triggerEffect("shungokusatsu");
  }, [triggerEffect]);

  useStreetFightingCommand({
    side,
    onHadouken: () => triggerEffect("hadouken"),
    onShoryuken: () => triggerEffect("shoryuken"),
    onTatsumaki: () => triggerEffect("tatsumaki"),
    onSonicBoom: () => triggerEffect("sonicboom"),
    onSpinningBirdKick: () => triggerEffect("spinningbirdkick"),
    onShinkuHadouken: triggerShinkuHadouken,
    onShunGokuSatsu: triggerShunGokuSatsu,
  });

  return (
    <div className="container">
      <a
        href="https://github.com/RyoSogawa/use-street-fighting-command"
        className="github-corner"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">View source on GitHub</span>
        <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>
      <header className="header">
        <h1 className="title">USE-STREET-FIGHTING-COMMAND</h1>
        <p className="subtitle">COMMAND INPUT HOOKS FOR REACT</p>
        <p className="disclaimer">
          This is an unofficial fan-made project. Not affiliated with Capcom.
        </p>
        <code className="install-command">
          npm install use-street-fighting-command
        </code>
      </header>

      <div className="controls-panel">
        <div className="panel-section">
          <span className="panel-label">PLAYER</span>
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
        <div className="panel-section">
          <span className="panel-label">CONTROLS</span>
          <div className="controls-inline">
            <div className="control-item">
              <span className="control-label">MOVE</span>
              <div className="control-keys-wrap">
                <span className="key-group arrows">↑↓←→</span>
                <span className="key-group">WASD</span>
              </div>
            </div>
            <div className="control-item">
              <span className="control-label">PUNCH</span>
              <span className="key">P</span>
            </div>
            <div className="control-item">
              <span className="control-label">KICK</span>
              <span className="key">K</span>
            </div>
          </div>
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
          arrows={
            <>
              {side === "1P" ? "←" : "→"} <span className="charge">charge</span>{" "}
              {side === "1P" ? "→" : "←"}
            </>
          }
          button="P"
          notation={side === "1P" ? "[4]6+P" : "[6]4+P"}
          count={counts.sonicboom}
          type="sonicboom"
        />
        <CommandCard
          name="SPINNING BIRD"
          japanese="スピニングバードキック"
          arrows={
            <>
              ↓ <span className="charge">charge</span> ↑
            </>
          }
          button="K"
          notation="[2]8+K"
          count={counts.spinningbirdkick}
          type="spinningbirdkick"
        />
        <ShinkuHadoukenCard
          revealed={shinkuRevealed}
          side={side}
          count={counts.shinkuhadouken}
        />
        <ShunGokuSatsuCard
          revealed={shunGokuRevealed}
          side={side}
          count={counts.shungokusatsu}
        />
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
  arrows: React.ReactNode;
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

function ShinkuHadoukenCard({
  revealed,
  side,
  count,
}: {
  revealed: boolean;
  side: Side;
  count: number;
}) {
  if (!revealed) {
    return (
      <div className="command-card secret">
        <div className="command-header">
          <h2 className="command-name">???</h2>
          <span className="command-japanese">???</span>
        </div>
        <div className="command-count">
          <span className="count-label">HIT</span>
          <span className="count-value">00</span>
        </div>
        <div className="command-input-row">
          <span className="command-input">
            <span className="command-arrows">???</span>
          </span>
          <span className="command-notation">???</span>
        </div>
      </div>
    );
  }

  return (
    <div className="command-card shinkuhadouken">
      <div className="command-header">
        <h2 className="command-name">SHINKU HADOUKEN</h2>
        <span className="command-japanese">真空波動拳</span>
      </div>
      <div className="command-count">
        <span className="count-label">HIT</span>
        <span className="count-value">{String(count).padStart(2, "0")}</span>
      </div>
      <div className="command-input-row">
        <span className="command-input">
          <span className="command-arrows">
            {side === "1P" ? "↓ ↘ → ↓ ↘ →" : "↓ ↙ ← ↓ ↙ ←"}
          </span>{" "}
          <span className="command-button">P</span>
        </span>
        <span className="command-notation">
          {side === "1P" ? "236236+P" : "214214+P"}
        </span>
      </div>
    </div>
  );
}

function ShunGokuSatsuCard({
  revealed,
  side,
  count,
}: {
  revealed: boolean;
  side: Side;
  count: number;
}) {
  if (!revealed) {
    return (
      <div className="command-card secret">
        <div className="command-header">
          <h2 className="command-name">???</h2>
          <span className="command-japanese">???</span>
        </div>
        <div className="command-count">
          <span className="count-label">HIT</span>
          <span className="count-value">00</span>
        </div>
        <div className="command-input-row">
          <span className="command-input">
            <span className="command-arrows">???</span>
          </span>
          <span className="command-notation">???</span>
        </div>
      </div>
    );
  }

  return (
    <div className="command-card shungokusatsu">
      <div className="command-header">
        <h2 className="command-name">SHUN GOKU SATSU</h2>
        <span className="command-japanese">瞬獄殺</span>
      </div>
      <div className="command-count">
        <span className="count-label">HIT</span>
        <span className="count-value">{String(count).padStart(2, "0")}</span>
      </div>
      <div className="command-input-row">
        <span className="command-input">
          <span className="command-button">P P</span>{" "}
          <span className="command-arrows">{side === "1P" ? "→" : "←"}</span>{" "}
          <span className="command-button">K P</span>
        </span>
      </div>
    </div>
  );
}

function EffectOverlay({ type }: { type: CommandType }) {
  const effectConfig = {
    hadouken: { text: "HADOUKEN!", japanese: "波動拳", color: "#58a8d8" },
    shoryuken: { text: "SHORYUKEN!", japanese: "昇龍拳", color: "#e84040" },
    tatsumaki: { text: "TATSUMAKI!", japanese: "竜巻旋風脚", color: "#f8d830" },
    sonicboom: {
      text: "SONIC BOOM!",
      japanese: "ソニックブーム",
      color: "#58b858",
    },
    spinningbirdkick: {
      text: "SPINNING BIRD!",
      japanese: "スピニングバードキック",
      color: "#d858a8",
    },
    shinkuhadouken: {
      text: "SHINKU HADOUKEN!",
      japanese: "真空波動拳",
      color: "#a080ff",
    },
    shungokusatsu: {
      text: "SHUN GOKU SATSU!",
      japanese: "瞬獄殺",
      color: "#ffffff",
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
