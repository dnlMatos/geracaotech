import ProductOption from "../models/ProductOption.js";

export const createProductOptions = async ({ product_id, option_values }) => {
  console.log("product_id:", product_id, "option_values:", option_values);

  try {
    const created = await Promise.all(
      option_values.map((opt) =>
        ProductOption.create({
          product_id,
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          option_values: Array.isArray(opt.values)
            ? opt.values.join(",")
            : opt.values || "",
        })
      )
    );

    return {
      options: created,
      message: "Opções do produto salvas com sucesso",
    };
  } catch (error) {
    throw new Error(error.message || "Erro ao criar opções do produto.");
  }
};
