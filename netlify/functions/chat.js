const OpenAI = require("openai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Chỉ hỗ trợ POST" })
    };
  }

  try {
    const { message } = JSON.parse(event.body || "{}");

    if (!message || !message.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Vui lòng nhập câu hỏi" })
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-5",
      instructions:
        "Bạn là Duẩn AI.com, trợ lý AI được phát triển bởi Phú Cường. Hãy trả lời bằng tiếng Việt, thân thiện, rõ ràng và dễ hiểu.",
      input: message.trim()
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reply: response.output_text
      })
    };

  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error: "Không thể kết nối với AI."
      })
    };
  }
};
