const OpenAI = require("openai");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Chỉ hỗ trợ POST"
    });
  }

  try {
    const { message } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Vui lòng nhập câu hỏi"
      });
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

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Không thể kết nối với AI."
    });
  }
};