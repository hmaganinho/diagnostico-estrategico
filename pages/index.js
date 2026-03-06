import { useState } from "react";
import Head from "next/head";

const TOPICS = [
  {
    id: "t1",
    number: 1,
    title: "Estratégia e Modelo de Negócio",
    subtitle: "Diagnóstico sobre Futuro e Visão da Organização",
    steps: [
      { id: "t1_proposta_valor", title: "Proposta de Valor", groupTitle: "Modelo de Negócio", description: "Descreve o conjunto de benefícios que resolvem os problemas dos clientes ou satisfazem as suas necessidades. É o motivo pelo qual os clientes escolhem a empresa.", question: "O quê?", placeholder: "Descreva de forma objetiva o que a sua empresa oferece e por que razão os clientes a escolhem..." },
      { id: "t1_relacionamento_clientes", title: "Relacionamento com Clientes", groupTitle: "Modelo de Negócio", description: "Descreve o tipo de relação que a empresa estabelece com cada Segmento de Clientes (ex: self-service, comunidades, serviço personalizado).", question: "Que tipo de relação?", placeholder: "Descreva como a empresa interage e mantém a relação com os seus clientes..." },
      { id: "t1_segmentos_clientes", title: "Segmentos de Clientes", groupTitle: "Modelo de Negócio", description: "Define os diferentes grupos de pessoas ou organizações que a empresa pretende alcançar e servir.", question: "Para quem criamos valor?", placeholder: "Identifique os segmentos de clientes que a empresa serve ou pretende servir..." },
      { id: "t1_canais", title: "Canais", groupTitle: "Modelo de Negócio", description: "Define como a empresa comunica e entrega a sua Proposta de Valor aos Segmentos de Clientes (canais de distribuição, comunicação e vendas).", question: "Como chegamos ao cliente?", placeholder: "Descreva os canais utilizados para chegar e servir os clientes..." },
      { id: "t1_atividades_chave", title: "Atividades-Chave", groupTitle: "Modelo de Negócio", description: "As ações mais importantes que a empresa deve executar para entregar a sua Proposta de Valor.", question: "O que fazemos?", placeholder: "Liste as atividades centrais que sustentam o modelo de negócio..." },
      { id: "t1_parcerias_chave", title: "Parcerias-Chave", groupTitle: "Modelo de Negócio", description: "A rede de fornecedores e parceiros que permitem ao modelo de negócio funcionar, complementando capacidades internas.", question: "Com quem?", placeholder: "Identifique os principais parceiros e fornecedores estratégicos..." },
      { id: "t1_recursos_chave", title: "Recursos-Chave", groupTitle: "Modelo de Negócio", description: "Os ativos mais importantes necessários para fazer funcionar o modelo de negócio (físicos, intelectuais, humanos, financeiros).", question: "O que precisamos?", placeholder: "Descreva os recursos essenciais para o funcionamento do modelo de negócio..." },
      { id: "t1_pontos_fortes", title: "Pontos Fortes", subtitle: "do Modelo de Negócio", description: "Identifique os elementos do modelo de negócio que constituem vantagens competitivas reais, capacidades distintivas ou fontes de valor consolidadas.", question: "Quais são os principais pontos fortes do modelo de negócio atual?", placeholder: "Descreva os pontos fortes que diferenciam e sustentam o modelo de negócio..." },
      { id: "t1_pontos_fracos", title: "Pontos Fracos", subtitle: "do Modelo de Negócio", description: "Identifique as lacunas, vulnerabilidades ou ineficiências que fragilizam o modelo de negócio e limitam o crescimento ou a competitividade.", question: "Quais são os principais pontos fracos do modelo de negócio atual?", placeholder: "Descreva os pontos fracos que limitam ou ameaçam o modelo de negócio..." },
      { id: "t1_situacao_atual", title: "Situação Atual", subtitle: "Estado presente", description: "Uma visão honesta e objetiva do estado atual da organização — onde está, o que funciona, o que não funciona, e qual o ponto de partida real para a transformação.", question: "Como descreve a situação atual da organização?", placeholder: "Descreva de forma objetiva o estado atual da organização, sem omitir as dificuldades..." },
      { id: "t1_situacao_desejada", title: "Situação Desejada", subtitle: "Visão de futuro", description: "A visão clara de onde a organização quer chegar — o estado futuro desejado que orienta as decisões estratégicas e as ações de transformação.", question: "Como descreve a situação desejada para a organização?", placeholder: "Descreva a visão de futuro para a organização, de forma concreta e ambiciosa..." },
      { id: "t1_acoes_urgentes", title: "Ações Urgentes", subtitle: "Ações a desenvolver", description: "As ações que requerem intervenção imediata — com impacto direto na estabilidade, competitividade ou sobrevivência do modelo de negócio.", question: "Que ações urgentes devem ser desenvolvidas?", placeholder: "Liste as ações prioritárias que devem ser implementadas de imediato..." },
      { id: "t1_acoes_nao_urgentes", title: "Ações Não-Urgentes", subtitle: "Ações a desenvolver", description: "As ações de médio e longo prazo que, embora não imediatas, são essenciais para o desenvolvimento sustentado e a evolução estratégica da organização.", question: "Que ações não-urgentes devem ser planeadas?", placeholder: "Liste as ações de médio e longo prazo que devem ser planeadas e acompanhadas..." },
    ],
  },
  {
    id: "t2", number: 2, title: "Gestão Comercial e Mercado", subtitle: "Diagnóstico da capacidade comercial e posicionamento no mercado",
    steps: [
      { id: "t2_pontos_fortes", title: "Pontos Fortes", subtitle: "Gestão Comercial e Mercado", description: "Identifique as vantagens competitivas na área comercial — carteira de clientes, força de vendas, processos comerciais, posicionamento e quota de mercado.", question: "Quais são os principais pontos fortes na gestão comercial e no mercado?", placeholder: "Descreva as forças comerciais que diferenciam a organização no mercado..." },
      { id: "t2_pontos_fracos", title: "Pontos Fracos", subtitle: "Gestão Comercial e Mercado", description: "Identifique as lacunas e vulnerabilidades comerciais — perdas de clientes, fraca prospeção, processos de venda ineficientes, dependência de poucos clientes ou mercados.", question: "Quais são os principais pontos fracos na gestão comercial e no mercado?", placeholder: "Descreva as fraquezas que limitam o desempenho comercial e a presença no mercado..." },
      { id: "t2_situacao_atual", title: "Situação Atual", subtitle: "Gestão Comercial e Mercado", description: "Uma avaliação objetiva do estado atual da função comercial — resultados, pipeline, equipa, processos e posição competitiva no mercado.", question: "Como descreve a situação atual da gestão comercial e da presença no mercado?", placeholder: "Descreva o estado atual da área comercial, incluindo resultados, equipa e posição no mercado..." },
      { id: "t2_situacao_desejada", title: "Situação Desejada", subtitle: "Gestão Comercial e Mercado", description: "A visão de futuro para a área comercial — que mercados atingir, que resultados alcançar, que tipo de organização comercial construir.", question: "Como descreve a situação desejada para a gestão comercial e o mercado?", placeholder: "Descreva onde quer chegar comercialmente — mercados, clientes, resultados e organização..." },
    ],
  },
  {
    id: "t3", number: 3, title: "Marketing e Comunicação", subtitle: "Diagnóstico da estratégia de marketing e presença comunicacional",
    steps: [
      { id: "t3_pontos_fortes", title: "Pontos Fortes", subtitle: "Marketing e Comunicação", description: "Identifique os ativos de marketing e comunicação mais sólidos — notoriedade da marca, presença digital, conteúdo, campanhas eficazes e reputação no mercado.", question: "Quais são os principais pontos fortes em marketing e comunicação?", placeholder: "Descreva o que funciona bem na estratégia de marketing e na comunicação da organização..." },
      { id: "t3_pontos_fracos", title: "Pontos Fracos", subtitle: "Marketing e Comunicação", description: "Identifique as lacunas em marketing e comunicação — fraca visibilidade, mensagem inconsistente, ausência digital, investimento insuficiente ou estratégia pouco definida.", question: "Quais são os principais pontos fracos em marketing e comunicação?", placeholder: "Descreva as fraquezas que limitam a eficácia do marketing e da comunicação..." },
      { id: "t3_situacao_atual", title: "Situação Atual", subtitle: "Marketing e Comunicação", description: "Avaliação do estado atual do marketing e da comunicação — canais utilizados, investimento, resultados obtidos e alinhamento com a estratégia comercial.", question: "Como descreve a situação atual do marketing e da comunicação?", placeholder: "Descreva o estado atual das atividades de marketing e comunicação da organização..." },
      { id: "t3_situacao_desejada", title: "Situação Desejada", subtitle: "Marketing e Comunicação", description: "A visão de futuro para o marketing e comunicação — que posicionamento construir, que canais dominar, que impacto gerar na notoriedade e na geração de negócio.", question: "Como descreve a situação desejada para o marketing e a comunicação?", placeholder: "Descreva o futuro desejado para o marketing e a comunicação da organização..." },
    ],
  },
  {
    id: "t4", number: 4, title: "Processos Globais", subtitle: "Diagnóstico da eficiência e maturidade dos processos organizacionais",
    steps: [
      { id: "t4_pontos_fortes", title: "Pontos Fortes", subtitle: "Processos Globais", description: "Identifique os processos mais eficientes e bem estruturados — fluxos de trabalho consolidados, sistemas de informação, automação, qualidade e controlo operacional.", question: "Quais são os principais pontos fortes nos processos globais da organização?", placeholder: "Descreva os processos que funcionam bem e que contribuem para a eficiência organizacional..." },
      { id: "t4_pontos_fracos", title: "Pontos Fracos", subtitle: "Processos Globais", description: "Identifique os processos problemáticos — ineficiências, duplicações, falta de standardização, sistemas obsoletos ou ausência de controlo e monitorização.", question: "Quais são os principais pontos fracos nos processos globais da organização?", placeholder: "Descreva os processos que falham, são ineficientes ou precisam de ser redesenhados..." },
      { id: "t4_situacao_atual", title: "Situação Atual", subtitle: "Processos Globais", description: "Avaliação do estado atual dos processos organizacionais — maturidade, nível de digitalização, interdependências e alinhamento com os objetivos estratégicos.", question: "Como descreve a situação atual dos processos globais da organização?", placeholder: "Descreva o estado atual dos processos, sistemas e fluxos de trabalho da organização..." },
      { id: "t4_situacao_desejada", title: "Situação Desejada", subtitle: "Processos Globais", description: "A visão de futuro para os processos — que nível de eficiência, automação e standardização atingir para suportar o crescimento e a estratégia da organização.", question: "Como descreve a situação desejada para os processos globais?", placeholder: "Descreva como devem estar os processos da organização no futuro..." },
    ],
  },
  {
    id: "t5", number: 5, title: "Recursos Humanos", subtitle: "Diagnóstico da gestão de pessoas e cultura organizacional",
    steps: [
      { id: "t5_pontos_fortes", title: "Pontos Fortes", subtitle: "Recursos Humanos", description: "Identifique os ativos humanos e organizacionais mais relevantes — talento, cultura, liderança, engagement, retenção e capacidade de atrair competências.", question: "Quais são os principais pontos fortes na gestão de recursos humanos?", placeholder: "Descreva os pontos fortes das pessoas, da cultura e da gestão de talentos na organização..." },
      { id: "t5_pontos_fracos", title: "Pontos Fracos", subtitle: "Recursos Humanos", description: "Identifique as vulnerabilidades na gestão de pessoas — rotatividade elevada, lacunas de competências, liderança frágil, fraco engagement ou cultura disfuncional.", question: "Quais são os principais pontos fracos na gestão de recursos humanos?", placeholder: "Descreva os problemas e fraquezas na gestão de pessoas e na cultura organizacional..." },
      { id: "t5_situacao_atual", title: "Situação Atual", subtitle: "Recursos Humanos", description: "Avaliação do estado atual dos recursos humanos — estrutura, competências, clima organizacional, processos de RH e alinhamento com a estratégia.", question: "Como descreve a situação atual dos recursos humanos?", placeholder: "Descreva o estado atual da equipa, da cultura e dos processos de gestão de pessoas..." },
      { id: "t5_situacao_desejada", title: "Situação Desejada", subtitle: "Recursos Humanos", description: "A visão de futuro para os recursos humanos — que organização construir, que cultura desenvolver, que competências adquirir para executar a estratégia.", question: "Como descreve a situação desejada para os recursos humanos?", placeholder: "Descreva como deve ser a organização, a equipa e a cultura no futuro..." },
    ],
  },
  {
    id: "t6", number: 6, title: "Produção", subtitle: "Diagnóstico da capacidade e eficiência produtiva",
    steps: [
      { id: "t6_pontos_fortes", title: "Pontos Fortes", subtitle: "Produção", description: "Identifique as capacidades produtivas mais sólidas — qualidade do produto, eficiência operacional, tecnologia, capacidade instalada e flexibilidade produtiva.", question: "Quais são os principais pontos fortes na área de produção?", placeholder: "Descreva os pontos fortes da capacidade produtiva e operacional da organização..." },
      { id: "t6_pontos_fracos", title: "Pontos Fracos", subtitle: "Produção", description: "Identifique as fragilidades produtivas — ineficiências, desperdícios, qualidade inconsistente, equipamentos obsoletos ou capacidade insuficiente.", question: "Quais são os principais pontos fracos na área de produção?", placeholder: "Descreva os problemas e ineficiências que afetam a produção..." },
      { id: "t6_situacao_atual", title: "Situação Atual", subtitle: "Produção", description: "Avaliação do estado atual da produção — volumes, capacidade, qualidade, custos, tecnologia e alinhamento com a procura do mercado.", question: "Como descreve a situação atual da produção?", placeholder: "Descreva o estado atual da capacidade produtiva, qualidade e eficiência operacional..." },
      { id: "t6_situacao_desejada", title: "Situação Desejada", subtitle: "Produção", description: "A visão de futuro para a produção — que capacidade, qualidade, eficiência e tecnologia desenvolver para suportar o crescimento e a competitividade.", question: "Como descreve a situação desejada para a produção?", placeholder: "Descreva como deve ser a produção no futuro em termos de capacidade, qualidade e eficiência..." },
    ],
  },
  {
    id: "t7", number: 7, title: "Logística", subtitle: "Diagnóstico da cadeia de abastecimento e distribuição",
    steps: [
      { id: "t7_pontos_fortes", title: "Pontos Fortes", subtitle: "Logística", description: "Identifique as capacidades logísticas mais robustas — rede de fornecedores, gestão de stocks, prazos de entrega, rastreabilidade e fiabilidade da cadeia de abastecimento.", question: "Quais são os principais pontos fortes na área de logística?", placeholder: "Descreva os pontos fortes da cadeia logística e de abastecimento da organização..." },
      { id: "t7_pontos_fracos", title: "Pontos Fracos", subtitle: "Logística", description: "Identifique as vulnerabilidades logísticas — atrasos, excesso ou rutura de stock, dependência de fornecedores críticos, custos elevados ou falta de visibilidade da cadeia.", question: "Quais são os principais pontos fracos na área de logística?", placeholder: "Descreva os problemas logísticos que afetam a operação e a satisfação dos clientes..." },
      { id: "t7_situacao_atual", title: "Situação Atual", subtitle: "Logística", description: "Avaliação do estado atual da logística — fornecedores, armazenagem, distribuição, custos e nível de serviço ao cliente.", question: "Como descreve a situação atual da logística?", placeholder: "Descreva o estado atual da cadeia de abastecimento, armazenagem e distribuição..." },
      { id: "t7_situacao_desejada", title: "Situação Desejada", subtitle: "Logística", description: "A visão de futuro para a logística — que cadeia de abastecimento construir, que nível de serviço atingir, que custos e prazos alcançar.", question: "Como descreve a situação desejada para a logística?", placeholder: "Descreva como deve ser a logística no futuro em termos de eficiência, custo e serviço..." },
    ],
  },
  {
    id: "t8", number: 8, title: "Financeira", subtitle: "Diagnóstico da saúde financeira e da gestão económica",
    steps: [
      { id: "t8_pontos_fortes", title: "Pontos Fortes", subtitle: "Financeira", description: "Identifique os pontos fortes financeiros — solidez do balanço, rentabilidade, geração de cash flow, acesso a financiamento e gestão orçamental eficaz.", question: "Quais são os principais pontos fortes na área financeira?", placeholder: "Descreva os pontos fortes da situação financeira e da gestão económica da organização..." },
      { id: "t8_pontos_fracos", title: "Pontos Fracos", subtitle: "Financeira", description: "Identifique as fragilidades financeiras — endividamento elevado, margens reduzidas, falta de liquidez, fraco controlo de custos ou ausência de planeamento financeiro.", question: "Quais são os principais pontos fracos na área financeira?", placeholder: "Descreva os problemas e vulnerabilidades financeiras da organização..." },
      { id: "t8_situacao_atual", title: "Situação Atual", subtitle: "Financeira", description: "Avaliação objetiva do estado financeiro atual — resultados, liquidez, endividamento, rentabilidade e capacidade de investimento.", question: "Como descreve a situação financeira atual da organização?", placeholder: "Descreva o estado atual da saúde financeira, resultados e capacidade de investimento..." },
      { id: "t8_situacao_desejada", title: "Situação Desejada", subtitle: "Financeira", description: "A visão de futuro financeira — que objetivos de rentabilidade, solidez e capacidade de investimento atingir para suportar a estratégia de crescimento.", question: "Como descreve a situação financeira desejada?", placeholder: "Descreva os objetivos financeiros de longo prazo — rentabilidade, solidez e capacidade de crescimento..." },
    ],
  },
  {
    id: "t9", number: 9, title: "Inovação e Desenvolvimento", subtitle: "Diagnóstico da capacidade de inovação e criação de futuro",
    steps: [
      { id: "t9_pontos_fortes", title: "Pontos Fortes", subtitle: "Inovação e Desenvolvimento", description: "Identifique as capacidades de inovação mais consolidadas — cultura de experimentação, investimento em I&D, parcerias com ecossistemas de inovação, novos produtos ou serviços.", question: "Quais são os principais pontos fortes em inovação e desenvolvimento?", placeholder: "Descreva o que a organização faz bem em termos de inovação, desenvolvimento e criação de futuro..." },
      { id: "t9_pontos_fracos", title: "Pontos Fracos", subtitle: "Inovação e Desenvolvimento", description: "Identifique as barreiras à inovação — cultura avessa ao risco, falta de investimento, ausência de processos de inovação estruturados ou desconexão com as tendências do mercado.", question: "Quais são os principais pontos fracos em inovação e desenvolvimento?", placeholder: "Descreva os obstáculos e fragilidades que limitam a inovação e o desenvolvimento na organização..." },
      { id: "t9_situacao_atual", title: "Situação Atual", subtitle: "Inovação e Desenvolvimento", description: "Avaliação do estado atual da inovação — iniciativas em curso, investimento, cultura, processos e resultados concretos em termos de novos produtos, serviços ou modelos.", question: "Como descreve a situação atual da inovação e desenvolvimento na organização?", placeholder: "Descreva o estado atual da capacidade de inovação, iniciativas em curso e resultados obtidos..." },
      { id: "t9_situacao_desejada", title: "Situação Desejada", subtitle: "Inovação e Desenvolvimento", description: "A visão de futuro para a inovação — que cultura, processos e investimento desenvolver para garantir a relevância e a competitividade da organização a longo prazo.", question: "Como descreve a situação desejada para a inovação e desenvolvimento?", placeholder: "Descreva como deve ser a organização em termos de inovação, desenvolvimento e criação de futuro..." },
    ],
  },
];

const ALL_STEPS = TOPICS.flatMap((t) =>
  t.steps.map((s) => ({ ...s, topicId: t.id, topicNumber: t.number, topicTitle: t.title }))
);
const TOTAL = ALL_STEPS.length;

function renderMarkdown(text) {
  if (!text) return [];
  const lines = text.split("\n");
  const elements = [];
  let key = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^###\s/.test(line)) {
      elements.push(<h3 key={key++} style={{ color: "#c9a84c", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "1.5rem", marginBottom: "0.35rem", fontFamily: "monospace" }}>{line.replace(/^###\s/, "")}</h3>);
    } else if (/^##\s/.test(line)) {
      elements.push(<h2 key={key++} style={{ color: "#f0ece4", fontSize: "1.1rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.5rem", fontFamily: "Georgia, serif", borderBottom: "1px solid rgba(201,168,76,0.25)", paddingBottom: "0.4rem" }}>{line.replace(/^##\s/, "")}</h2>);
    } else if (/^#\s/.test(line)) {
      elements.push(<h1 key={key++} style={{ color: "#f0ece4", fontSize: "1.3rem", fontWeight: 700, marginTop: "1rem", marginBottom: "0.75rem", fontFamily: "Georgia, serif" }}>{line.replace(/^#\s/, "")}</h1>);
    } else if (/^[-•]\s/.test(line.trim())) {
      elements.push(<div key={key++} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.3rem", paddingLeft: "0.5rem" }}><span style={{ color: "#c9a84c", flexShrink: 0 }}>·</span><span style={{ color: "#c8d8e8" }}>{renderInline(line.trim().replace(/^[-•]\s/, ""))}</span></div>);
    } else if (line.trim() === "") {
      elements.push(<div key={key++} style={{ height: "0.5rem" }} />);
    } else {
      elements.push(<p key={key++} style={{ color: "#c8d8e8", lineHeight: 1.75, marginBottom: "0.35rem" }}>{renderInline(line)}</p>);
    }
  }
  return elements;
}

function renderInline(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    /^\*\*[^*]+\*\*$/.test(part)
      ? <strong key={i} style={{ color: "#f0d080", fontWeight: 700 }}>{part.replace(/\*\*/g, "")}</strong>
      : part
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [showTopicTransition, setShowTopicTransition] = useState(false);
  const [transitionTopic, setTransitionTopic] = useState(null);

  const isIntro = step === 0;
  const isLast = step === TOTAL;
  const current = step > 0 && step <= TOTAL ? ALL_STEPS[step - 1] : null;
  const canProceed = isIntro
    ? companyName.trim().length > 0
    : current ? (answers[current.id] || "").trim().length > 0 : false;
  const pct = Math.round((step / TOTAL) * 100);

  // Detect topic change
  const prevStep = step > 1 ? ALL_STEPS[step - 2] : null;
  const isTopicChange = current && prevStep && current.topicId !== prevStep.topicId;

  async function handleFinish() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, companyName }),
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
    if (isLast) { handleFinish(); return; }
    const next = ALL_STEPS[step];
    const curr = step > 0 ? ALL_STEPS[step - 1] : null;
    if (next && curr && next.topicId !== curr.topicId) {
      setTransitionTopic(TOPICS.find((t) => t.id === next.topicId));
      setShowTopicTransition(true);
      return;
    }
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function continueFromTransition() {
    setShowTopicTransition(false);
    setTransitionTopic(null);
    setStep((s) => s + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setStep(0); setAnswers({}); setCompanyName(""); setAnalysis(""); setDone(false); setError(null);
  }

  return (
    <>
      <Head>
        <title>Diagnóstico Estratégico</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0d1a26; font-family: 'Segoe UI', system-ui, sans-serif; }
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 3px; }
          input:focus, textarea:focus { border-color: #c9a84c !important; outline: none; }
        `}</style>
      </Head>

      <div style={{ minHeight: "100vh", background: "#0d1a26", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem 1rem" }}>

        {/* Header */}
        <div style={{ width: "100%", maxWidth: "720px", marginBottom: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.2rem" }}>Diagnóstico Estratégico</div>
            <div style={{ fontSize: "0.85rem", color: "#4a6070", fontWeight: 500 }}>9 Tópicos · {TOTAL} Dimensões</div>
          </div>
          {companyName && (
            <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: "6px", padding: "0.4rem 0.9rem", color: "#c9a84c", fontSize: "0.8rem", fontWeight: 600 }}>{companyName}</div>
          )}
        </div>

        {/* Card */}
        <div style={{ width: "100%", maxWidth: "720px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "16px", padding: "2.5rem", boxShadow: "0 24px 80px rgba(0,0,0,0.4)", animation: "fadeUp 0.4s ease" }}>

          {/* Progress */}
          {!isIntro && !done && !showTopicTransition && (
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.7rem", color: "#8a9bb0", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace" }}>
                  {current && `Tópico ${current.topicNumber} — ${current.topicTitle}`}
                </span>
                <span style={{ fontSize: "0.7rem", color: "#c9a84c", fontFamily: "monospace", fontWeight: 700 }}>{step}/{TOTAL}</span>
              </div>
              <div style={{ height: "3px", background: "#1e2d3d", borderRadius: "2px" }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #c9a84c, #f0d080)", borderRadius: "2px", transition: "width 0.5s" }} />
              </div>
              {/* Topic dots */}
              <div style={{ display: "flex", gap: "4px", marginTop: "0.6rem" }}>
                {TOPICS.map((t) => {
                  const topicSteps = ALL_STEPS.filter((s) => s.topicId === t.id);
                  const firstIdx = ALL_STEPS.findIndex((s) => s.topicId === t.id);
                  const isActive = current && current.topicId === t.id;
                  const isDone = firstIdx + topicSteps.length <= step;
                  return (
                    <div key={t.id} title={t.title} style={{ flex: 1, height: "4px", borderRadius: "2px", background: isDone ? "#c9a84c" : isActive ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)", transition: "background 0.3s" }} />
                  );
                })}
              </div>
            </div>
          )}

          {/* INTRO */}
          {isIntro && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.75rem" }}>Diagnóstico Completo</div>
              <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#f0ece4", fontFamily: "Georgia, serif", lineHeight: 1.2, marginBottom: "1rem" }}>Diagnóstico Estratégico</h1>
              <p style={{ color: "#8a9bb0", lineHeight: 1.7, marginBottom: "1.5rem", fontSize: "0.95rem" }}>
                Este diagnóstico percorre <strong style={{ color: "#c9a84c" }}>9 tópicos estratégicos</strong> e {TOTAL} dimensões, gerando uma análise qualitativa completa da organização com níveis de intervenção por área.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                {TOPICS.map((t) => (
                  <span key={t.id} style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", padding: "0.25rem 0.6rem", fontSize: "0.75rem", color: "#8a9bb0", fontFamily: "monospace" }}>
                    {t.number}. {t.title}
                  </span>
                ))}
              </div>
              <label style={{ display: "block", color: "#c9a84c", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>Nome da Organização</label>
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

          {/* TOPIC TRANSITION */}
          {showTopicTransition && transitionTopic && (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <div style={{ fontSize: "0.65rem", color: "#c9a84c", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "1rem" }}>A seguir</div>
              <div style={{ fontSize: "3rem", fontWeight: 700, color: "rgba(201,168,76,0.15)", fontFamily: "monospace", marginBottom: "0.5rem" }}>{String(transitionTopic.number).padStart(2, "0")}</div>
              <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#f0ece4", fontFamily: "Georgia, serif", marginBottom: "0.75rem" }}>{transitionTopic.title}</h2>
              <p style={{ color: "#8a9bb0", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto 2rem" }}>{transitionTopic.subtitle}</p>
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
                {transitionTopic.steps.map((s) => (
                  <span key={s.id} style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", padding: "0.2rem 0.55rem", fontSize: "0.75rem", color: "#8a9bb0" }}>{s.title}</span>
                ))}
              </div>
              <button onClick={continueFromTransition} style={{ background: "linear-gradient(135deg, #c9a84c, #f0d080)", border: "none", borderRadius: "8px", padding: "0.75rem 2.5rem", color: "#0d1a26", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer" }}>
                Iniciar Tópico {transitionTopic.number} →
              </button>
            </div>
          )}

          {/* STEP */}
          {!isIntro && !done && !loading && !showTopicTransition && current && (
            <div>
              {current.groupTitle && (
                <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>{current.groupTitle} — Modelo de Negócio</div>
              )}
              {!current.groupTitle && current.subtitle && (
                <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>{current.subtitle}</div>
              )}
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f0ece4", marginBottom: "1.25rem", fontFamily: "Georgia, serif", lineHeight: 1.2 }}>{current.title}</h2>
              <div style={{ background: "rgba(201,168,76,0.07)", borderLeft: "3px solid #c9a84c", padding: "0.9rem 1.1rem", marginBottom: "1.5rem", borderRadius: "0 6px 6px 0" }}>
                <p style={{ color: "#9fb3c8", fontSize: "0.88rem", lineHeight: 1.65, margin: 0 }}>{current.description}</p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <div style={{ background: "#c9a84c", color: "#0d1a26", fontSize: "0.65rem", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.25rem 0.6rem", borderRadius: "3px", whiteSpace: "nowrap", fontFamily: "monospace", marginTop: "2px" }}>Pergunta Central</div>
                <p style={{ color: "#f0ece4", fontSize: "1.05rem", fontWeight: 600, margin: 0, lineHeight: 1.4, fontFamily: "Georgia, serif", fontStyle: "italic" }}>&ldquo;{current.question}&rdquo;</p>
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

          {/* LOADING */}
          {loading && (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ width: "48px", height: "48px", border: "3px solid rgba(201,168,76,0.2)", borderTop: "3px solid #c9a84c", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1.5rem" }} />
              <p style={{ color: "#8a9bb0", fontSize: "0.9rem" }}>A gerar análise qualitativa completa...</p>
              <p style={{ color: "#4a6070", fontSize: "0.8rem", marginTop: "0.5rem" }}>A analisar os 9 tópicos estratégicos</p>
            </div>
          )}

          {/* ERROR */}
          {error && !loading && (
            <div style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", borderRadius: "8px", padding: "1.25rem", color: "#e08080", fontSize: "0.9rem" }}>
              {error}
              <button onClick={handleFinish} style={{ display: "block", marginTop: "1rem", background: "rgba(201,168,76,0.15)", border: "1px solid #c9a84c", color: "#c9a84c", padding: "0.5rem 1.25rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>Tentar novamente</button>
            </div>
          )}

          {/* ANALYSIS */}
          {done && analysis && (
            <div>
              <div style={{ fontSize: "0.7rem", color: "#c9a84c", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace", marginBottom: "0.5rem" }}>Resultado do Diagnóstico</div>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f0ece4", marginBottom: "1.5rem", fontFamily: "Georgia, serif" }}>Análise Qualitativa Completa</h2>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "10px", padding: "1.75rem", fontSize: "0.92rem", maxHeight: "600px", overflowY: "auto" }}>
                {renderMarkdown(analysis)}
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          {!done && !loading && !showTopicTransition && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button
                onClick={() => { setStep((s) => Math.max(0, s - 1)); }}
                disabled={step === 0}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.65rem 1.25rem", color: step === 0 ? "#2a3d50" : "#8a9bb0", cursor: step === 0 ? "not-allowed" : "pointer", fontSize: "0.85rem" }}
              >← Anterior</button>
              <button
                onClick={handleNext}
                disabled={!canProceed}
                style={{ background: canProceed ? "linear-gradient(135deg, #c9a84c, #f0d080)" : "rgba(201,168,76,0.15)", border: "none", borderRadius: "8px", padding: "0.65rem 2rem", color: canProceed ? "#0d1a26" : "#3a5060", cursor: canProceed ? "pointer" : "not-allowed", fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em" }}
              >{isLast ? "Gerar Análise →" : "Seguinte →"}</button>
            </div>
          )}

          {done && (
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={reset} style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "8px", padding: "0.65rem 1.5rem", color: "#c9a84c", cursor: "pointer", fontSize: "0.85rem" }}>↩ Novo Diagnóstico</button>
            </div>
          )}
        </div>

        <div style={{ marginTop: "2rem", color: "#2a3d50", fontSize: "0.75rem", fontFamily: "monospace" }}>
          Diagnóstico Estratégico · 9 Tópicos · {TOTAL} Dimensões
        </div>
      </div>
    </>
  );
}
