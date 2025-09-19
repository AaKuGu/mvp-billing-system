import { controllerFunc } from "@/shared/backend/utils/ControllerFunc";
import CustomError from "@/shared/backend/utils/error/CustomError";
import successResponse from "@/shared/backend/utils/success/successResponse";

export const POST = controllerFunc(async (req) => {
  const body = await req.json(); // parse request body
  const { englishName } = body;

  if (!englishName) {
    throw new CustomError(
      "English Name is required to get Hindi Name",
      400,
      "Error in POST /api/open_ai/generateHindiText"
    );
  }

  const open_ai_sk = process.env.OPEN_AI_SK;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${open_ai_sk}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that transliterates English product names into natural Hindi names used in Indian shops.",
        },
        {
          role: "user",
          content: `Transliterate this product name into Hindi: ${englishName}`,
        },
      ],
      max_tokens: 50,
    }),
  });

  const data = await response.json();
  // Only extract the Hindi letters from GPT response
  // Only extract the Hindi letters from GPT response
  let hindiText = "";
  if (data.choices && data.choices.length > 0) {
    hindiText = data.choices[0].message.content.trim();
    const match = hindiText.match(/[\u0900-\u097F\s]+/g); // keep only Hindi characters
    if (match) {
      hindiText = match.join(" ").trim(); // <-- trim here removes leading/trailing spaces
    }
  } else {
    hindiText = "❌ GPT failed";
  }

  return successResponse({ hindiText }, "Hindi Name", 201);
}, "Error in POST /api/open_ai/generateHindiText");
