import { NextResponse } from 'next/server';
import { detailedServices } from '@/lib/servicesPricing';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const categoryId = formData.get('categoryId') as string | null;

    if (!imageFile || !categoryId) {
      return NextResponse.json(
        { success: false, error: 'Image and category are required.' },
        { status: 400 }
      );
    }

    const categoryData = detailedServices.find(c => c.id === categoryId);
    if (!categoryData) {
      return NextResponse.json(
        { success: false, error: 'Invalid category.' },
        { status: 400 }
      );
    }

    // Dynamically build the catalog string for the prompt
    const catalogStructure: Record<string, Record<string, string[]>> = {};
    for (const sub of categoryData.subcategories) {
      catalogStructure[sub.name] = {};
      for (const srv of sub.services) {
        catalogStructure[sub.name][srv.name] = srv.variants.map(v => v.name);
      }
    }

    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');
    const mimeType = imageFile.type || 'image/jpeg';

    const prompt = `You are a home appliance and fixture identification expert for a home services app.
The user has selected the "${categoryData.category}" category.

Here is the exact catalog of available services and variants in our system:
${JSON.stringify(catalogStructure, null, 2)}

Analyze the image and identify the specific fixture or appliance shown. Then, map it STRICTLY to the most appropriate variant from the catalog above.

Important visual distinctions to look out for:
- "Shower Mixer" typically has a diverter knob/pull-lever on the spout and/or a connection port for a shower hose.
- "Hot & Cold Mixer" is a standard basin/sink mixer without any shower hose attachments or diverter knobs.
- Pay close attention to materials (e.g. PVC plastic vs Ceramic) for Flush Tanks.

Respond ONLY with a valid JSON object in this exact format (no markdown, no extra text):
{
  "subcategory": "<exact subcategory name from catalog>",
  "service": "<exact service name from catalog>",
  "variant": "<exact variant name from catalog>",
  "confidence": <float between 0.0 and 1.0>
}

If the image does not match anything in the catalog, set all fields to null and confidence to 0.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType,
                    data: base64,
                  },
                },
                { text: prompt },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 2048,
            responseMimeType: 'application/json',
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error('Gemini API error:', errText);
      let geminiMsg = 'AI service unavailable.';
      try {
        const errJson = JSON.parse(errText);
        geminiMsg = errJson?.error?.message || geminiMsg;
      } catch {}
      return NextResponse.json(
        { success: false, error: geminiMsg },
        { status: 502 }
      );
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    let jsonText = rawText;
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      jsonText = match[0];
    }

    let parsed: {
      subcategory: string | null;
      service: string | null;
      variant: string | null;
      confidence: number;
    };

    try {
      parsed = JSON.parse(jsonText);
    } catch {
      console.error('Failed to parse Gemini JSON. Raw text:', rawText);
      return NextResponse.json(
        { success: false, error: `Could not parse AI response. Raw output: ${rawText}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: parsed,
    });
  } catch (error: any) {
    console.error('identify-service error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
