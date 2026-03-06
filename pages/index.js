import { useState } from "react";
import Head from "next/head";

const ALL_STEPS = [
  {
    id: "proposta_valor",
    groupTitle: "Modelo de Negócio",
    title: "Proposta de Valor",
    description: "Descreve o conjunto de benefícios que resolvem os problemas dos clientes ou satisfazem as suas necessidades. É o motivo pelo qual os clientes escolhem a empresa.",
    question: "O quê?",
    placeholder: "Descreva de forma objetiva o que a sua empresa oferece e por que razão os clientes a escolhem...",
  },
  {
    id: "relacionamento_clientes",
    groupTitle: "Modelo de Negócio",
    title: "Relacionamento com Clientes",
    description: "Descreve o tipo de relação que a empresa estabelece com cada Segmento de Clientes (ex: self-service, comunidades, serviço personalizado).",
    question: "Que tipo de relação?",
    placeholder: "Descreva como a empresa interage e mantém a relação com os seus clientes...",
  },
  {
    id: "segmentos_clientes",
    groupTitle: "Modelo de Negócio",
    title: "Segmentos de Clientes",
    description: "Define os diferentes grupos de pessoas ou organizações que a empresa pretende alcançar e servir.",
    question: "Para quem criamos valor?",
    placeholder: "Identifique os segmentos de clientes que a empresa serve ou pretende servir...",
  },
  {
    id: "canais",
    groupTitle: "Modelo de Negócio",
    title: "Canais",
    description: "Define como a empresa comunica e entrega a sua Proposta de Valor aos Segmentos de Clientes (canais de distribuição, comunicação e vendas).",
    question: "Como chegamos ao cliente?",
    placeholder: "Descreva os canais utilizados para chegar e servir os clientes...",
  },
  {
    id: "atividades_chave",
    groupTitle: "Modelo de Negócio",
    title: "Atividades-Chave",
    description: "As ações mais importantes que a empresa deve executar para entregar a sua Proposta de Valor.",
    question: "O que fazemos?",
    placeholder: "Liste as atividades centrais que sustentam o modelo de negócio...",
  },
  {
    id: "parcerias_chave",
    groupTitle: "Modelo de Negócio",
    title: "Parcerias-Chave",
    description: "A rede de fornecedores e parceiros que permitem ao modelo de negócio funcionar, complementando capacidades internas.",
    question: "Com quem?",
    placeholder: "Identifique os principais parceiros e fornecedores estratégicos...",
  },
  {
    id: "recursos_chave",
    groupTitle: "Modelo de Negócio",
    title: "Recursos-Chave",
    description: "Os ativos mais importantes necessários para fazer funcionar o modelo de negócio (físicos, intelectuais, humanos, financeiros).",
    question: "O que precisamos?",
    placeholder: "Descreva os recursos essenciais para o funcionamento do modelo de negócio...",
  },
  {
    id: "pontos_fortes",
    title: "Pontos Fortes",
    subtitle: "do Modelo de Negócio",
    description: "Identifique os elementos do modelo de negócio que constituem vantagens competitivas reais, capacidades distintivas ou fontes de valor consolidadas.",
    question: "Quais são os principais pontos fortes do modelo de negócio atual?",
    placeholder: "Descreva os pontos fortes que diferenciam e sustentam o modelo de negócio...",
  },
  {
    id: "pontos_fracos",
    title: "Pontos Fracos",
    subtitle: "do Modelo de Negócio",
    description: "Identifique as lacunas, vulnerabilidades ou ineficiências que fragilizam o modelo de negócio e limitam o crescimento ou a competitividade.",
    question: "Quais são os principais pontos fracos do modelo de negócio atual?",
    placeholder: "Descreva os pontos fracos que limitam ou ameaçam o modelo de negócio...",
  },
  {
    id: "situacao_atual",
    title: "Situação Atual",
    subtitle: "Estado presente da organização",
    description: "Uma visão honesta e objetiva do estado atual da organização — onde está, o que funciona, o que não funciona, e qual o ponto de partida real para a transformação.",
    question: "Como descreve a situação atual da organização?",
    placeholder: "Descreva de forma objetiva o estado atual da organização, sem omitir as dificuldades...",
  },
  {
    id: "situacao_desejada",
    title: "Situação Desejada",
    subtitle: "Visão de futuro da organização",
    description: "A visão clara de onde a organização quer chegar — o estado futuro desejado que orienta as decisões estratégicas e as ações de transformação.",
    question: "Como descreve a situação desejada para a organização?",
    placeholder: "Descreva a visão de futuro para a organização, de forma concreta e ambiciosa...",
  },
  {
    id: "acoes_urgentes",
    title: "Ações Urgentes",
    subtitle: "Ações a desenvolver",
    description: "As ações que requerem intervenção imediata — com impacto direto na estabilidade, competitividade ou sobrevivência do modelo de negócio.",
    question: "Que ações urgentes devem ser desenvolvidas?",
    placeholder: "Liste as ações prioritárias que devem ser implementadas de imediato...",
  },
  {
    id: "acoes_nao_urgentes",
    title: "Ações Não-Urgentes",
    subtitle: "Ações a desenvolver",
    description: "As ações de médio e longo prazo que, embora não imediatas, são essenciais para o desenvolvimento sustentado e a evolução estratégica da organização.",
    question: "Que ações não-urgentes devem ser planeadas?",
    placeholder: "Liste as ações de médio e longo prazo que devem ser planeadas e acompanhadas...",
  },
];

const TOTAL = ALL_STEPS.length;

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const isIntro = step === 0;
  const isLast = step === TOTAL;
  const current = step > 0 && step <= TOTAL ? ALL_STEPS[step - 1] : null;
  const canProceed = isIntro
    ? companyName.trim().length > 0
    : current
    ? (answers[current.id] || "").trim().length > 0
    : false;
  const pct = Math.round((step / TOTAL) * 100);

  async function handleFinish() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnalysis(data.analysis);
      setDone(true);
    } catch (e) {
      setError("Ocorreu um erro ao gerar a análise. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (isLast) {
      handleFinish();
      return;
    }
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setStep(0);
    setAnswers({});
    setCompanyName("");
    setAnalysis("");
    setDone(false);
    setError(null);
  }

  return (
    <>
      <Head>
        <title>Diagnóstico Estratégico — Modelo de Negócio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0d1a26; font-family: 'Segoe UI', system-ui, sans-serif; }
          @keyframes spin { to { transform: rotate(360deg); } }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 3px; }
          input:focus, textarea:focus { border-color: #c9a84c !important; outline: none; }
          button:hover { opacity: 0.88; }
        `}</style>
      </Head>

      <div style={{ minHeight: "100vh", background: "#0d1a26", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem" }}>

        {/* Header */}
        <div style={{ width: "100%", maxWidth: "720px", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.2rem" }}>
              Diagnóstico Estratégico
            </div>
            <div style={{ fontSize: "0.85rem", color: "#4a6070", fontWeight: 500 }}>
              Estratégia &amp; Modelo de Negócio
            </div>
          </div>
          {companyName && (
            <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "6px", padding: "0.4rem 0.9rem", color: "#c9a84c", fontSize: "0.8rem", fontWeight: 600 }}>
              {companyName}
            </div>
          )}
        </div>

        {/* Card */}
        <div style={{ width: "100%", maxWidth: "720px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>

          {/* Progress */}
          {!isIntro && !done && (
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", color: "#8a9bb0", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace" }}>Progresso</span>
                <span style={{ fontSize: "0.75rem", color: "#c9a84c", fontFamily: "monospace", fontWeight: 700 }}>{step}/{TOTAL}</span>
              </div>
              <div style={{ height: "3px", background: "#1e2d3d", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #c9a84c, #f0d080)", borderRadius: "2px", transition: "width 0.5s" }} />
              </div>
            </div>
          )}

          {/* Intro */}
          {isIntro && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.75rem" }}>
                Tópico Estratégico 1
              </div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f0ece4", fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: "1rem" }}>
                Estratégia e Modelo de Negócio
              </h1>
              <p style={{ color: "#8a9bb0", lineHeight: 1.7, marginBottom: "2rem", fontSize: "0.95rem" }}>
                Este diagnóstico avalia a solidez e coerência do modelo de negócio atual, identifica pontos de força e vulnerabilidade, e orienta as ações estratégicas necessárias para atingir a situação desejada.
              </p>
              <label style={{ display: "block", color: "#c9a84c", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>
                Nome da Organização
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canProceed && handleNext()}
                placeholder="Introduza o nome da organização..."
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px", padding: "0.85rem 1rem", color: "#f0ece4", fontSize: "1rem", fontFamily: "inherit" }}
              />
            </div>
          )}

          {/* Step */}
          {!isIntro && !done && !loading && current && (
            <div>
              {current.groupTitle && (
                <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>
                  {current.groupTitle} — Modelo de Negócio
                </div>
              )}
              {!current.groupTitle && current.subtitle && (
                <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>
                  {current.subtitle}
                </div>
              )}
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f0ece4", marginBottom: "1.25rem", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>
                {current.title}
              </h2>
              <div style={{ background: "rgba(201,168,76,0.07)", borderLeft: "3px solid #c9a84c", padding: "0.9rem 1.1rem", marginBottom: "1.5rem", borderRadius: "0 6px 6px 0" }}>
                <p style={{ color: "#9fb3c8", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>
                  {current.description}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ background: "#c9a84c", color: "#0d1a26", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: "3px", whiteSpace: "nowrap", fontFamily: "monospace", marginTop: "2px" }}>
                  Pergunta Central
                </div>
                <p style={{ color: "#f0ece4", fontSize: "1.05rem", fontWeight: 600, margin: 0, lineHeight: 1.4, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                  &ldquo;{current.question}&rdquo;
                </p>
              </div>
              <textarea
                value={answers[current.id] || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [current.id]: e.target.value }))}
                placeholder={current.placeholder}
                rows={6}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "8px", padding: "1rem", color: "#f0ece4", fontSize: "0.92rem", lineHeight: 1.7, resize: "vertical", fontFamily: "inherit" }}
              />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ width: "48px", height: "48px", border: "3px solid rgba(201,168,76,0.2)", borderTop: "3px solid #c9a84c", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1.5rem" }} />
              <p style={{ color: "#8a9bb0", fontSize: "0.9rem" }}>A gerar análise qualitativa...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", borderRadius: "8px", padding: "1.25rem", color: "#e08080", fontSize: "0.9rem" }}>
              {error}
              <button onClick={handleFinish} style={{ display: "block", marginTop: "1rem", background: "rgba(201,168,76,0.15)", border: "1px solid #c9a84c", color: "#c9a84c", padding: "0.5rem 1.25rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>
                Tentar novamente
              </button>
            </div>
          )}

          {/* Analysis */}
          {done && analysis && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>
                Resultado do Diagnóstico
              </div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f0ece4", marginBottom: "1.5rem", fontFamily: "Georgia, serif" }}>
                Análise Qualitativa
              </h2>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "10px", padding: "1.75rem", color: "#c8d8e8", fontSize: "0.92rem", lineHeight: 1.8, whiteSpace: "pre-wrap", maxHeight: "520px", overflowY: "auto" }}>
                {analysis}
              </div>
            </div>
          )}

          {/* Navigation */}
          {!done && !loading && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.65rem 1.25rem", color: step === 0 ? "#2a3d50" : "#8a9bb0", cursor: step === 0 ? "not-allowed" : "pointer", fontSize: "0.85rem" }}
              >
                ← Anterior
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed}
                style={{ background: canProceed ? "linear-gradient(135deg, #c9a84c, #f0d080)" : "rgba(201,168,76,0.15)", border: "none", borderRadius: "8px", padding: "0.65rem 2rem", color: canProceed ? "#0d1a26" : "#3a5060", cursor: canProceed ? "pointer" : "not-allowed", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em" }}
              >
                {isLast ? "Gerar Análise →" : "Seguinte →"}
              </button>
            </div>
          )}

          {done && (
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={reset} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px", padding: "0.65rem 1.5rem", color: "#c9a84c", cursor: "pointer", fontSize: "0.85rem" }}>
                ↩ Novo Diagnóstico
              </button>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", color: "#2a3d50", fontSize: "0.75rem", fontFamily: "monospace" }}>
          Diagnóstico Estratégico · Modelo de Negócio
        </div>
      </div>
    </>
  );
}
