import ProductImage from "../models/ProductImage.js";

export const createProductImage = async ({ product_id, enabled, images }) => {
  try {
    // Verifica imagens
    if (!Array.isArray(images) || images.length === 0) {
      throw new Error("Pelo menos uma imagem deve ser enviada.");
    }

    // Cria imagens
    const created = await Promise.all(
      images.map((img) =>
        ProductImage.create({
          product_id,
          content: img.content,
          enabled: enabled,
          path: img.path,
        })
      )
    );

    return {
      images: created,
      message: "Imagens do produto salva com sucesso",
    };
  } catch (error) {
    throw new Error(error.message || "Erro ao criar imagem.");
  }
};
