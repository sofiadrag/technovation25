import  geminiconfig  from '../geminiconfig.json'
export async function fetchGeminiResponse(prompt: any) {
  const key = geminiconfig.api_key;
  const systemInstruction = 'Respond concisely in an academic style. Do not use special characters such as , #, or emojis unles needed. Write clear paragraphs without repetition. Write each new idea in a new paragraph. Write the responses in the same language as the question.'

  const body = {
    contents: [
      {
        parts: [
          { text: systemInstruction + "\n\nQuestion:" + prompt }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Eroare Gemini:", error);
    return "A apărut o eroare.";
  }
}
