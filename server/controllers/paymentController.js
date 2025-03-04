import { stripe } from "../config/stripe.js";

export const createPaymentIntent = async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: product.name,
        images: [product.image][0],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(
      "Erreur lors de la création de la session de paiement:",
      error
    );
    res
      .status(500)
      .send("Une erreur est survenue lors du traitement du paiement.");
  }
};
