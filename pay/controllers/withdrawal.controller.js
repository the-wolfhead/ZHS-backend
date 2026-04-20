// src/controllers/withdrawal.controller.js

const { withdrawFunds } =require "../services/withdrawal.service.js";

export const withdraw = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const { amount, bankCode, accountNumber, accountName } = req.body;

    const result = await withdrawFunds({
      userId,
      amount,
      bankCode,
      accountNumber,
      accountName,
    });

    res.json({
      message: "Withdrawal successful",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
