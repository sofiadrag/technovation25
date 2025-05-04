import AsyncStorage from '@react-native-async-storage/async-storage';
import geminiconfig from '../geminiconfig.json';

export async function fetchGeminiResponse(prompt: any) {
  const key = geminiconfig.api_key;

  let userData = null;
  try {
    const json = await AsyncStorage.getItem("userData");
    if (json) userData = JSON.parse(json);
  } catch (e) {
    console.error("Eroare la citirea userData:", e);
  }

  const systemPrompt =
    "Respond concisely in an academic style. Do not use special characters such as *, #, or emojis unless needed. Write clear paragraphs without repetition. Write each new idea in a new paragraph. Write the responses in the same language as the question. Provide information and links when the user asks for a range of opportunities. Remember the conversation with the user" +
    (userData?.interests || "") +
    (userData?.type || "") +
    (userData?.opportunities) +
    (userData?.workstyle || "") +
    (userData?.skillsstrengths || "") +
    (userData?.motivations || "");

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 500
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: 3
      }
    ],
    tools: [],
    systemInstruction: {
      role: "system",
      parts: [{ text: systemPrompt }]
    }
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error("Eroare Gemini:", error);
    return "A apărut o eroare.";
  }
}
