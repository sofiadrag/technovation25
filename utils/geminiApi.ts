export async function fetchGeminiResponse(prompt: any) {
  const API_KEY = "AIzaSyAXaLllif_4bHHF21oUpX8M5btwMHYPj2A"; 

  const body = {
    contents: [
      {
        parts: [
          { text: prompt } // Prompt-ul trimis la Gemini
        ]
      }
    ]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data.contents[0].parts[0].text.trim();
  } catch (error) {
    console.error("Eroare Gemini:", error);
    return "A apărut o eroare.";
  }
}