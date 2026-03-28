import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const API_KEY = process.env.GROQ_API_KEY

    // Fallback if no GROQ key is set yet (so builder doesn't totally break in dev)
    if (!API_KEY) {
      console.warn("GROQ_API_KEY not found. Returning stub blocks.")
      return NextResponse.json({
        blocks: [
          {
            id: 'mock-1',
            type: 'hero',
            props: { headline: 'AI Magic Placeholder', subheadline: 'This is a mock generation since Groq is not configured.', buttonText: 'Add Groq Key' }
          }
        ]
      })
    }

    const systemPrompt = `You are a strict JSON builder for a drag-and-drop website editor.
    Do NOT return markdown framing or commentary.
    Return ONLY raw JSON in this EXACT schema:
    {
      "blocks": [
        {
          "id": "random-uuid-string",
          "type": "hero" | "features" | "cta" | "text",
          "props": { ... }
        }
      ]
    }
    
    Props schemas depending on type:
    "hero" -> headline (string), subheadline (string), buttonText (string)
    "features" -> feature1Title, feature1Desc, feature2Title, feature2Desc
    "cta" -> headline, buttonText
    "text" -> content.

    Based on the user's prompt, generate an array of up to 4 blocks that represents their requested website layout.`

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "llama3-8b-8192", // Fast logic model
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            temperature: 0.1,
            response_format: { type: "json_object" }
        })
    })

    if (!res.ok) {
        throw new Error("Failed to fetch from Groq")
    }

    const data = await res.json()
    const jsonContent = JSON.parse(data.choices[0].message.content)

    return NextResponse.json(jsonContent)
  } catch (error: unknown) {
    console.error("AI Generation API Error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
