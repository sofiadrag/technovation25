
export async function fetchOpenAIResponse(prompt: string): Promise<string> {
    const API_KEY = "sk-abcdef1234567890abcdef1234567890abcdef12"; 
  
    const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Eroare OpenAI:", error);
      return "A apărut o eroare.";
    }
  }
  