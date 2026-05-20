import { useState } from "react";

const BASE = `You are a professional Ghanaian radio copywriter. Write a live presenter mention script for Pay Up, a fintech app by The Bakery Technologies Limited (Ghana).

PAY UP FEATURES:
- Send money internationally to the UK, USA, India, UAE, EU, Nigeria, and China
- Buy gift cards from major companies
- Create virtual cards for online shopping
- Create USD accounts

AUDIENCE: General Ghanaian radio listeners - workers, traders, students, diaspora families
FORMAT: Live presenter read. The host speaks directly to listeners.

REQUIREMENTS:
- Open with a strong hook
- Weave in 2-3 features naturally - not a bullet list
- Close with a punchy call to action including the name "Pay Up"
- Sound natural when read aloud on radio
- No corporate jargon
- 240 words maximum
- Output the script ONLY. No labels, no intro, no explanation.`;

const SERIOUS_PROMPT = `${BASE}

TONE: Serious and trustworthy. Lead with a relatable Ghanaian financial pain point. Feel confident and aspirational - like someone who genuinely wants to help the listener level up financially.`;

const WITTY_PROMPT = `${BASE}

TONE: Light and witty. Lead with a funny but painfully true Ghanaian scenario. Feel playful and fast-paced - like a friend who found the cheat code and can't stop laughing about it.`;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const wcColor = (count) => {
  if (count > 220) return "#ff6b35";
  if (count > 180) return "#f5c842";
  return "#4ade80";
};

const callAPI = async (prompt) => {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    const message =
      typeof data.error === "string"
        ? data.error
        : data.error?.message || `Request failed with status ${res.status}`;
    const type = data.error?.type ? ` (type: ${data.error.type})` : "";
    throw new Error(`${message}${type}`);
  }

  const text = data.content?.find((block) => block.type === "text")?.text?.trim();
  if (!text) {
    throw new Error(`Empty response. Full data: ${JSON.stringify(data).slice(0, 200)}`);
  }

  return text;
};

function ScriptCard({ label, tone, accent, script, loading }) {
  const [copied, setCopied] = useState(false);
  const wordCount = script ? countWords(script) : 0;

  const copy = async () => {
    if (!script) return;

    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${accent}33`,
        borderRadius: "4px",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        minHeight: "200px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <div
            style={{
              fontSize: "9px",
              textTransform: "uppercase",
              color: accent,
              fontFamily: "'Georgia', serif",
              marginBottom: "3px",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(240,237,230,0.3)",
              fontStyle: "italic",
              fontFamily: "'Georgia', serif",
            }}
          >
            {tone}
          </div>
        </div>
        {script && (
          <span style={{ fontSize: "11px", color: wcColor(wordCount), fontFamily: "'Georgia', serif" }}>
            {wordCount} / 240
          </span>
        )}
      </div>

      <div style={{ height: "1px", background: `linear-gradient(90deg, ${accent}55, transparent)` }} />

      {loading ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "20px 0" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              flexShrink: 0,
              border: `2px solid ${accent}33`,
              borderTop: `2px solid ${accent}`,
              borderRadius: "50%",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span style={{ fontSize: "12px", color: "rgba(240,237,230,0.3)", fontFamily: "'Georgia', serif" }}>
            Writing...
          </span>
        </div>
      ) : script ? (
        <>
          <p
            style={{
              margin: 0,
              fontFamily: "'Georgia', serif",
              fontSize: "14px",
              lineHeight: "1.9",
              color: "rgba(240,237,230,0.82)",
              whiteSpace: "pre-wrap",
              flexGrow: 1,
            }}
          >
            {script}
          </p>
          <button
            onClick={copy}
            style={{
              padding: "10px 14px",
              background: "transparent",
              color: copied ? "#4ade80" : "rgba(240,237,230,0.4)",
              border: `1px solid ${copied ? "rgba(74,222,128,0.3)" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "3px",
              fontFamily: "'Georgia', serif",
              fontSize: "11px",
              cursor: "pointer",
              transition: "all 0.2s",
              textTransform: "uppercase",
            }}
          >
            {copied ? "Copied" : "Copy Script"}
          </button>
        </>
      ) : null}
    </div>
  );
}

export default function PayUpGenerator() {
  const [serious, setSerious] = useState("");
  const [witty, setWitty] = useState("");
  const [loadingS, setLoadingS] = useState(false);
  const [loadingW, setLoadingW] = useState(false);
  const [error, setError] = useState("");
  const hasScripts = serious || witty;

  const generate = async () => {
    setSerious("");
    setWitty("");
    setError("");
    setLoadingS(true);
    setLoadingW(true);

    const [seriousResult, wittyResult] = await Promise.allSettled([
      callAPI(SERIOUS_PROMPT),
      callAPI(WITTY_PROMPT),
    ]);

    const errors = [];

    if (seriousResult.status === "fulfilled") {
      setSerious(seriousResult.value);
    } else {
      errors.push(`Serious failed: ${seriousResult.reason?.message || JSON.stringify(seriousResult.reason)}`);
    }

    if (wittyResult.status === "fulfilled") {
      setWitty(wittyResult.value);
    } else {
      errors.push(`Witty failed: ${wittyResult.reason?.message || JSON.stringify(wittyResult.reason)}`);
    }

    setError(errors.join(" | "));
    setLoadingS(false);
    setLoadingW(false);
  };

  const loading = loadingS || loadingW;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "'Georgia', serif",
        padding: "44px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "760px" }}>
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#dca000" }} />
            <span style={{ fontSize: "10px", color: "#dca000", textTransform: "uppercase" }}>
              The Bakery Technologies Ltd
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "40px",
              fontWeight: "400",
              color: "#f0ede6",
              lineHeight: 1.1,
            }}
          >
            Pay Up
            <span
              style={{
                display: "block",
                color: "rgba(240,237,230,0.3)",
                fontSize: "0.58em",
                fontStyle: "italic",
                marginTop: "4px",
              }}
            >
              Radio Script Generator
            </span>
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "3px",
            overflow: "hidden",
            marginBottom: "28px",
          }}
        >
          {[
            { label: "Format", value: "Radio Mention" },
            { label: "Audience", value: "Ghana Listeners" },
            { label: "Versions", value: "2 per run" },
            { label: "Word Cap", value: "240 each" },
          ].map((item) => (
            <div key={item.label} style={{ background: "#0e0e0e", padding: "13px 16px" }}>
                <div
                  style={{
                    fontSize: "9px",
                    color: "rgba(240,237,230,0.25)",
                    textTransform: "uppercase",
                    marginBottom: "3px",
                }}
              >
                {item.label}
              </div>
              <div style={{ fontSize: "13px", color: "#f0ede6" }}>{item.value}</div>
            </div>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={loading}
          style={{
            width: "100%",
            padding: "17px 24px",
            background: loading ? "rgba(220,160,0,0.08)" : "#dca000",
            color: loading ? "#dca000" : "#0a0a0a",
            border: loading ? "1px solid rgba(220,160,0,0.25)" : "none",
            borderRadius: "3px",
            fontFamily: "'Georgia', serif",
            fontSize: "13px",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span
                style={{
                  width: "12px",
                  height: "12px",
                  border: "2px solid rgba(220,160,0,0.25)",
                  borderTop: "2px solid #dca000",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              Generating...
            </span>
          ) : hasScripts ? (
            "Regenerate Both"
          ) : (
            "Generate Scripts"
          )}
        </button>

        {error && (
          <div
            style={{
              padding: "13px 16px",
              marginBottom: "20px",
              background: "rgba(255,80,80,0.06)",
              border: "1px solid rgba(255,80,80,0.18)",
              borderRadius: "3px",
              color: "#ff6b6b",
              fontSize: "13px",
            }}
          >
            {error}
          </div>
        )}

        {(hasScripts || loading) && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "14px",
            }}
          >
            <ScriptCard
              label="Version A - Serious"
              tone="Trustworthy - Aspirational"
              accent="#dca000"
              script={serious}
              loading={loadingS && !serious}
            />
            <ScriptCard
              label="Version B - Witty"
              tone="Playful - Cheeky"
              accent="#64a0ff"
              script={witty}
              loading={loadingW && !witty}
            />
          </div>
        )}
      </div>

      <p
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "36px",
          fontSize: "10px",
          color: "rgba(240,237,230,0.12)",
          textTransform: "uppercase",
        }}
      >
        Powered by The Bakery Technologies - RideMe & Pay Up
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        button:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
