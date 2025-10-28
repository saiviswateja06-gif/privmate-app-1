
import { GoogleGenAI, Type } from "@google/genai";
import { AppPermission, Recommendation } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const generatePrompt = (apps: AppPermission[]): string => {
  let prompt = "Analyze the following app permission data and provide 3 actionable privacy recommendations. Focus on the most significant risks.\n\n";
  
  apps.forEach(app => {
    const enabledPermissions = Object.entries(app.permissions)
      .filter(([, isEnabled]) => isEnabled)
      .map(([permission]) => permission)
      .join(', ');
    
    if (enabledPermissions) {
      prompt += `- App "${app.name}" (${app.category}) has access to: ${enabledPermissions}.\n`;
    }
  });

  prompt += "\nBased on this, what are the top 3 recommendations to improve user privacy?";
  return prompt;
};


export const getPrivacyRecommendations = async (apps: AppPermission[]): Promise<Recommendation[]> => {
  const prompt = generatePrompt(apps);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: {
                    type: Type.STRING,
                    description: "A short, catchy title for the recommendation."
                  },
                  description: {
                    type: Type.STRING,
                    description: "A detailed explanation of the risk and the suggested action."
                  },
                  severity: {
                    type: Type.STRING,
                    enum: ["High", "Medium", "Low"],
                    description: "The risk level associated with this issue."
                  }
                },
                required: ["title", "description", "severity"]
              }
            }
          },
          required: ["recommendations"]
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);
    
    return parsed.recommendations as Recommendation[];

  } catch (error) {
    console.error("Error fetching recommendations from Gemini API:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
};
