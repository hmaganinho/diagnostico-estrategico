const TOPICS = [
  {
    id: "t1", title: "Estratégia e Modelo de Negócio",
    steps: [
      { id: "t1_proposta_valor", label: "Proposta de Valor", question: "O quê?" },
      { id: "t1_relacionamento_clientes", label: "Relacionamento com Clientes", question: "Que tipo de relação?" },
      { id: "t1_segmentos_clientes", label: "Segmentos de Clientes", question: "Para quem criamos valor?" },
      { id: "t1_canais", label: "Canais", question: "Como chegamos ao cliente?" },
      { id: "t1_atividades_chave", label: "Atividades-Chave", question: "O que fazemos?" },
      { id: "t1_parcerias_chave", label: "Parcerias-Chave", question: "Com quem?" },
      { id: "t1_recursos_chave", label: "Recursos-Chave", question: "O que precisamos?" },
      { id: "t1_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes do modelo de negócio?" },
      { id: "t1_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos do modelo de negócio?" },
      { id: "t1_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual?" },
      { id: "t1_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada?" },
      { id: "t1_acoes_urgentes", label: "Ações Urgentes", question: "Que ações urgentes devem ser desenvolvidas?" },
      { id: "t1_acoes_nao_urgentes", label: "Ações Não-Urgentes", question: "Que ações não-urgentes devem ser planeadas?" },
    ],
  },
  {
    id: "t2", title: "Gestão Comercial e Mercado",
    steps: [
      { id: "t2_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes na gestão comercial?" },
      { id: "t2_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos na gestão comercial?" },
      { id: "t2_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual da gestão comercial?" },
      { id: "t2_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para a gestão comercial?" },
    ],
  },
  {
    id: "t3", title: "Marketing e Comunicação",
    steps: [
      { id: "t3_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes em marketing e comunicação?" },
      { id: "t3_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos em marketing e comunicação?" },
      { id: "t3_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual do marketing e comunicação?" },
      { id: "t3_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para o marketing e comunicação?" },
    ],
  },
  {
    id: "t4", title: "Processos Globais",
    steps: [
      { id: "t4_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes nos processos globais?" },
      { id: "t4_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos nos processos globais?" },
      { id: "t4_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual dos processos globais?" },
      { id: "t4_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para os processos globais?" },
    ],
  },
  {
    id: "t5", title: "Recursos Humanos",
    steps: [
      { id: "t5_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes nos recursos humanos?" },
      { id: "t5_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos nos recursos humanos?" },
      { id: "t5_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual dos recursos humanos?" },
      { id: "t5_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para os recursos humanos?" },
    ],
  },
  {
    id: "t6", title: "Produção",
    steps: [
      { id: "t6_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes na produção?" },
      { id: "t6_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos na produção?" },
      { id: "t6_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual da produção?" },
      { id: "t6_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para a produção?" },
    ],
  },
  {
    id: "t7", title: "Logística",
    steps: [
      { id: "t7_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes na logística?" },
      { id: "t7_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos na logística?" },
      { id: "t7_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual da logística?" },
      { id: "t7_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para a logística?" },
    ],
  },
  {
    id: "t8", title: "Financeira",
    steps: [
      { id: "t8_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes na área financeira?" },
      { id: "t8_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos na área financeira?" },
      { id: "t8_situacao_atual", label: "Situação Atual", question: "Como descreve a situação financeira atual?" },
      { id: "t8_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação financeira desejada?" },
    ],
  },
  {
    id: "t9", title: "Inovação e Desenvolvimento",
    steps: [
      { id: "t9_pontos_fortes", label: "Pontos Fortes", question: "Quais são os principais pontos fortes em inovação e desenvolvimento?" },
      { id: "t9_pontos_fracos", label: "Pontos Fracos", question: "Quais são os principais pontos fracos em inovação e desenvolvimento?" },
      { id: "t9_situacao_atual", label: "Situação Atual", question: "Como descreve a situação atual da inovação e desenvolvimento?" },
      { id: "t9_situacao_desejada", label: "Situação Desejada", question: "Como descreve a situação desejada para a inovação e desenvolvimento?" },
    ],
  },
];

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { answers, companyName } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const answerText = TOPICS.map((topic) => {
    const topicAnswers = topic.steps.map((s) =>
      `  - ${s.label}: ${answers[s.id] || "(Sem resposta)"}`
    ).join("\n");
    return `### ${topic.title}\n${topicAnswers}`;
  }).join("\n\n");

  const systemPrompt = `És um consultor de estratégia empresarial sénior especializado em diagnósticos organizacionais completos. Vais analisar as respostas de um gestor a um diagnóstico que cobre 9 tópicos estratégicos da organização.

Para cada tópico apresenta:
1. Uma avaliação qualitativa sintética (2-3 parágrafos)
2. Os principais riscos ou oportunidades identificados
3. Nível de intervenção recomendado: **MANUTENÇÃO**, **AJUSTE**, **TRANSFORMAÇÃO** ou **REESTRUTURAÇÃO**

No final, apresenta um **Diagnóstico Global** com:
- Síntese transversal dos 9 tópicos
- Os 3 tópicos mais críticos que requerem ação prioritária
- Nível de intervenção global recomendado com justificação clara

Escreve em português de Portugal. Usa ## para os títulos dos tópicos e ### para subsecções. Sê direto, objetivo e orientado para a ação.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{
          role: "user",
          content: `Organização: ${companyName || "Não identificada"}\n\nRespostas ao diagnóstico estratégico completo:\n\n${answerText}\n\nGera a análise qualitativa completa por tópico e o diagnóstico global.`,
        }],
      }),
    });

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("\n") || "";
    res.status(200).json({ analysis: text });
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar análise." });
  }
}
