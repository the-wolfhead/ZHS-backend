// src/services/reconciliation.fix.js

const { prisma } = require "../config/prisma.js";
const { createDoubleEntry } = require "./doubleLedger.service.js";

export const fixMissingTransaction = async (txn) => {
  const walletAccount = await prisma.account.findFirst({
    where: { name: txn.accountNumber },
  });

  const systemAccount = await prisma.account.findFirst({
    where: { type: "SYSTEM" },
  });

  if (!walletAccount || !systemAccount) return;

  await createDoubleEntry({
    debitAccountId: systemAccount.id,
    creditAccountId: walletAccount.id,
    amount: txn.amount,
    reference: txn.reference,
    narration: "Reconciliation fix",
  });
};
