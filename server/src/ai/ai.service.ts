import type { Item } from "../types.ts";
import { ollamaService } from "../ollama/ollama.service.ts";
import { PriceSuggestionResultSchema } from "../validation.ts";

type PriceSuggestion = {
  title: string;
  price: number;
};

type PriceSuggestionResult = {
  summary: string;
  suggestions: PriceSuggestion[];
};

export const aiService = {
  async generateDescription(item: Item) {
    const prompt = `
      Ты помогаешь улучшать объявления для маркетплейса.

      Сгенерируй краткое, понятное и привлекательное описание товара на русском языке.
      Не выдумывай факты, которых нет.
      Не используй списки.
      Не пиши дисклеймеры и пояснения.
      Верни только готовый текст описания.

      Данные объявления:
      Категория: ${item.category}
      Название: ${item.title}
      Цена: ${item.price ?? "не указана"}
      Описание: ${item.description ?? "отсутствует"}
      Параметры: ${JSON.stringify(item.params)}
  `;

    const result = await ollamaService.generate(prompt);

    return result.trim();
  },

  async suggestPrices(item: Item): Promise<PriceSuggestionResult> {
    const categoryRules = getCategoryPricingRules(item.category);

    const prompt = `
      Ты помогаешь оценивать цену объявления для маркетплейса.

      Учитывай только реальные данные из объявления.
      Не выдумывай характеристики, которых нет.

      Особенно обрати внимание на:
      ${categoryRules}

      Верни только валидный JSON
      Не добавляй markdown
      Не добавляй текст до или после JSON
      Строго соблюдай JSON-синтаксис: двойные кавычки у всех ключей и строк, никаких лишних запятых.

      Формат ответа:
      {
        "summary": "краткое объяснение на русском языке",
        "suggestions": [
          { "title": "Ниже рынка", "price": 0 },
          { "title": "Рыночная", "price": 0 },
          { "title": "Выше рынка", "price": 0 }
        ]
      }

      Поле "summary":
      - должно быть кратким выводом
      - начинаться с "На основе анализа"
      - объяснять, от чего зависит цена (состояние, параметры, рынок)
      - НЕ пересказывать объявление

      Данные объявления:
      Категория: ${item.category}
      Название: ${item.title}
      Текущая цена: ${item.price ?? "не указана"}
      Описание: ${item.description ?? "отсутствует"}
      Параметры: ${JSON.stringify(item.params)}
    `;

    const result = await ollamaService.generate(prompt);
    return parsePriceSuggestions(result);
  },
};

function parsePriceSuggestions(raw: string): PriceSuggestionResult {
  const normalized = raw.trim();

  const jsonStart = normalized.indexOf("{");
  const jsonEnd = normalized.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new Error("AI returned invalid JSON boundaries");
  }

  const jsonString = normalized.slice(jsonStart, jsonEnd + 1);

  try {
    const parsed = JSON.parse(jsonString);
    return PriceSuggestionResultSchema.parse(parsed);
  } catch (error) {
    console.error("Raw AI response:", raw);
    console.error("Extracted JSON:", jsonString);
    throw error;
  }
}

function getCategoryPricingRules(category: Item["category"]): string {
  switch (category) {
    case "electronics":
      return `
        - состояние товара
        - бренд и модель
        - тип устройства
        - заполненность характеристик
        - общее впечатление по описанию
      `;
    case "auto":
      return `
        - бренд и модель
        - год выпуска
        - пробег
        - коробка передач
        - мощность двигателя
        - заполненность характеристик
      `;
    case "real_estate":
      return `
        - тип недвижимости
        - адрес
        - площадь
        - этаж
        - заполненность характеристик
        - общее качество описания
      `;
  }
}
