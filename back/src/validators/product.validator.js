export const notNullFunction = (
  name,
  slug,
  stock,
  price,
  price_with_discount
) => {
  if (!name || !slug || stock == null || !price || !price_with_discount) {
    return { message: "Campos obrigatórios não preenchidos." };
  }
};
