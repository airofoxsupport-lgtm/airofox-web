export interface NotificationContext {
  userName: string;
  city: string;
  lastBookedService: string;
  monthsSinceLastBooking: number;
  season: string; // e.g., 'Monsoon', 'Summer'
  languagePreference: 'English' | 'Hindi' | 'Hinglish';
  serviceCategoryToPromote: string;
}

export interface GeneratedNotification {
  variant_a: string;
  variant_b: string;
}

export async function generateNotificationVariants(context: NotificationContext): Promise<GeneratedNotification> {
  const prompt = `You are the lead copywriter for AiroFox, a premium home services platform in India. 
Your personality is: Friendly, clever, trustworthy, and slightly quirky/pushy (similar to Zomato or Blinkit). 
You are writing a PUNCHY REMINDER to re-engage users without sounding like a boring corporate bot.

Context about the user:
- Name: ${context.userName}
- City: ${context.city}
- Last booked service: ${context.lastBookedService} (booked ${context.monthsSinceLastBooking} months ago)
- Current Season/Weather: ${context.season}
- Target Service to Promote: ${context.serviceCategoryToPromote}
- Language Preference: ${context.languagePreference}

Generate two DIFFERENT short reminder notification variants (Variant A and Variant B) to send to this user via push notification. 
The notifications MUST be written strictly in their preferred language: ${context.languagePreference}. (If Hinglish, mix Hindi written in English script with English words naturally).
Keep each variant under 100 characters. Use relevant emojis. Be punchy, catchy, and relatable to the season and their city.

Respond strictly in valid JSON format with exactly these two keys:
{
  "variant_a": "First option here",
  "variant_b": "Second option here"
}
`;

  const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`
    },
    body: JSON.stringify({
      model: "meta/llama-3.1-70b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 300,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("NVIDIA API Error payload:", errorText);
    throw new Error(`NVIDIA API Error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  try {
    const parsed = JSON.parse(content);
    return {
      variant_a: parsed.variant_a || 'Time for a home service checkup! Book now on AiroFox.',
      variant_b: parsed.variant_b || 'AiroFox is here to help with your home services!'
    };
  } catch (err) {
    console.error('Failed to parse NVIDIA JSON:', content);
    throw new Error('Failed to parse NVIDIA API response into JSON.');
  }
}
