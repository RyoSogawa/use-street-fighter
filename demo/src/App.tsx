import { useCallback, useState } from "react";
import { type Side, useHadoken } from "use-street-fighter";

export function App() {
  const [side, setSide] = useState<Side>("1P");
  const [count, setCount] = useState(0);
  const [lastTriggered, setLastTriggered] = useState<string | null>(null);

  const handleHadoken = useCallback(() => {
    setCount((c) => c + 1);
    setLastTriggered(new Date().toLocaleTimeString());
  }, []);

  useHadoken({
    side,
    onCommand: handleHadoken,
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>use-street-fighter Demo</h1>

      <div style={styles.card}>
        <h2>Side Selection</h2>
        <div style={styles.buttonGroup}>
          <button
            type="button"
            style={{
              ...styles.button,
              ...(side === "1P" ? styles.buttonActive : {}),
            }}
            onClick={() => setSide("1P")}
          >
            1P Side
          </button>
          <button
            type="button"
            style={{
              ...styles.button,
              ...(side === "2P" ? styles.buttonActive : {}),
            }}
            onClick={() => setSide("2P")}
          >
            2P Side
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h2>Command Input</h2>
        <p style={styles.command}>
          {side === "1P" ? "↓ ↘ → + P" : "↓ ↙ ← + P"}
        </p>
        <p style={styles.keys}>
          {side === "1P"
            ? "(ArrowDown → ArrowDown+ArrowRight → ArrowRight → P)"
            : "(ArrowDown → ArrowDown+ArrowLeft → ArrowLeft → P)"}
        </p>
      </div>

      <div style={styles.card}>
        <h2>Hadouken Count: {count}</h2>
        {lastTriggered && <p>Last triggered: {lastTriggered}</p>}
      </div>

      <div style={styles.instructions}>
        <h3>Instructions</h3>
        <ol>
          <li>Select your side (1P or 2P)</li>
          <li>Enter the Hadouken command using arrow keys + P</li>
          <li>The counter increases when the command is detected</li>
        </ol>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  card: {
    background: "#f5f5f5",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "2px solid #333",
    borderRadius: "4px",
    background: "white",
    cursor: "pointer",
  },
  buttonActive: {
    background: "#333",
    color: "white",
  },
  command: {
    fontSize: "32px",
    textAlign: "center",
    margin: "20px 0",
  },
  keys: {
    textAlign: "center",
    color: "#666",
    fontSize: "14px",
  },
  instructions: {
    marginTop: "30px",
    padding: "20px",
    background: "#e8f4ff",
    borderRadius: "8px",
  },
};
