// src/utils/utilities.js
import { Op } from "sequelize";

// Paginação
export function utilities(query, defaultLimit = 12, maxLimit = 30) {
  let { limit = defaultLimit, page = 1 } = query;
  limit = parseInt(limit);
  if (isNaN(limit) || limit === 0) limit = defaultLimit;
  if (limit < -1) limit = defaultLimit;
  if (limit > maxLimit && limit !== -1) limit = maxLimit; // Limite máximo de 30
  if (limit === -1) limit = null;

  page = parseInt(page);
  if (isNaN(page) || page < 1) page = 1;

  const offset = limit ? (page - 1) * limit : undefined;
  return { limit, page, offset };
}

// Campos (fields)
export function parseFields(fields) {
  if (!fields) return undefined;
  return fields.split(",").map((f) => f.trim());
}

// Filtro de categorias
export function parseCategoryIds(category_ids) {
  if (!category_ids) return undefined;
  const ids = category_ids.split(",").map(Number).filter(Boolean);
  return ids.length > 0 ? ids : undefined;
}

// Filtro de faixa de preço
export function parsePriceRange(priceRange) {
  if (!priceRange) return {};
  const [min, max] = priceRange.split("-").map(Number);
  if (!isNaN(min) && !isNaN(max)) {
    return { price: { [Op.between]: [min, max] } };
  }
  return {};
}

// Filtro de opções dinâmicas (option[45]=GG,PP)
export function parseOptionFilters(optionFilters) {
  const optionWhere = [];
  Object.keys(optionFilters).forEach((key) => {
    if (key.startsWith("option[")) {
      const optionId = key.match(/option\[(\d+)\]/)?.[1];
      if (optionId) {
        const values = optionFilters[key].split(",").map((v) => v.trim());
        optionWhere.push({
          id: Number(optionId),
          value: { [Op.in]: values },
        });
      }
    }
  });
  return optionWhere;
}

// Busca textual (match)
export function buildMatchWhere(match, fields = ["name", "description"]) {
  if (!match) return {};
  return {
    [Op.or]: fields.map((field) => ({
      [field]: { [Op.like]: `%${match}%` },
    })),
  };
}
