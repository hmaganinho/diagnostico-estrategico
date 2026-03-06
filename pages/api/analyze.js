export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { answers } = req.body;
  if (!answers) return res.status(400).json({ error: "Missing answers" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "API key not configured" });

  const STEPS = [
    { id: "proposta_valor", groupTitle: "Modelo de Negócio", title: "Proposta de Valor", question: "O quê?" },
    { id: "relacionamento_clientes", groupTitle: "Modelo de Negócio", title: "Relacionamento com Clientes", question: "Que tipo de relação?" },
    { id: "segmentos_clientes", groupTitle: "Modelo de Negócio", title: "Segmentos de Clientes", question: "Para quem criamos valor?" },
    { id: "canais", groupTitle: "Modelo de Negócio", title: "Canais", question: "Como chegamos ao cliente?" },
    { id: "atividades_chave", groupTitle: "Modelo de Negócio", title: "Atividades-Chave", question: "O que fazemos?" },
    { id: "parcerias_chave", groupTitle: "Modelo de Negócio", title: "Parcerias-Chave", question: "Com quem?" },
    { id: "recursos_chave", groupTitle: "Modelo de Negócio", title: "Recursos-Chave", question: "O que precisamos?" },
    { id: "pontos_fortes", title: "Pontos Fortes", question: "Quais são os principais pontos fortes do modelo de negócio atual?" },
    { id: "pontos_fracos", title: "Pontos Fracos", question: "Quais são os principais pontos fracos do modelo de negócio atual?" },
    { id: "situacao_atual", title: "Situação Atual", question: "Como descreve a situação atual da organização?" },
    { id: "situacao_desejada", title: "Situação Desejada", question: "Como descreve a situação desejada para a organização?" },
    { id: "acoes_urgentes", title: "Ações Urgentes", question: "Que ações urgentes devem ser desenvolvidas?" },
    { id: "acoes_nao_urgentes", title: "Ações Não-Urgentes", question: "Que ações não-urgentes devem ser planeadas?" },
  ];

  const answerText = STEPS.map((step) => {
    const label = step.groupTitle ? `${step.groupTitle} > ${step.title}` : step.title;
    return `## ${label}\nPergunta Central: "${step.question}"\nResposta: ${answers[step.id] || "(Sem resposta)"}`;
  }).join("\n\n");

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
        max_tokens: 2000,
        system: `És um consultor de estratégia empresarial sénior especializado em diagnósticos organizacionais. A tua função é analisar as respostas de um gestor ao diagnóstico "Estratégia e Modelo de Negócio" e produzir uma análise qualitativa estruturada, profissional e orientada para a ação.

Para cada secção do diagnóstico, apresenta uma avaliação qualitativa clara e honesta, os principais riscos ou oportunidades identificados, e uma conclusão sintética.

No final, apresenta um diagnóstico global com o nível de intervenção recomendado entre estas quatro opções:
- MANUTENÇÃO: modelo sólido, ajustes pontuais
- AJUSTE: base sólida mas com áreas a melhorar
- TRANSFORMAÇÃO: mudanças significativas necessárias
- REESTRUTURAÇÃO: revisão profunda e urgente do modelo

Justifica a escolha do nível de intervenção. Escreve em português de Portugal. Sê direto, objetivo e construtivo.`,
        messages: [
          {
            role: "user",
            content: `Aqui estão as respostas do gestor ao diagnóstico de Estratégia e Modelo de Negócio:\n\n${answerText}\n\nGera a análise qualitativa completa por secção e o diagnóstico global com o nível de intervenção.`,
          },
        ],
      }),
    });

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("\n") || "";
    res.status(200).json({ analysis: text });
  } catch (err) {
    res.status(500).json({ error: "Erro ao gerar análise." });
  }
}
