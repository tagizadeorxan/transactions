import styles from "./styles";
import { useTranslation } from "react-i18next";
import {
  FormControl,
  TextField,
  FormLabel,
  Select,
  MenuItem,
  Button
} from "@mui/material";
import { cards, transactions } from "../../../data/data";
import { Card, Transaction } from "../../../models/models";
import { useState } from "react";

const MakeTransaction = () => {
  const { t } = useTranslation();

  const [chosenCard, setChosenCard] = useState<number>(cards[0].cardAccount);
  const [data, setData] = useState<Transaction>({
    occupation: "",
    amount: 0,
    card: 0
  });

  const handleChange = (e: any) => {
    setChosenCard(Number(e.target.value));
    setData({ ...data, card: Number(e.target.value) });
  };

  const makeTransactionAction = () => {
      transactions.push(data)
  }

  return (
    <div style={styles.makeTransaction}>
      <FormControl>
        <FormLabel component="legend">{t("transaction.forWhat")}</FormLabel>
        <TextField
          onChange={(e) => setData({ ...data, occupation: e.target.value })}
        />
      </FormControl>
      <FormControl>
        <FormLabel component="legend">{t("transaction.amount")}</FormLabel>
        <TextField
          onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
        />
      </FormControl>
      <FormControl>
        <FormLabel component="legend">{t("transaction.card")}</FormLabel>
        <Select value={chosenCard} onChange={handleChange}>
          {cards.map((e: Card) => (
            <MenuItem key={e.cardID} value={e.cardAccount}>
              {e.cardAccount}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button style={styles.button} variant="outlined" onClick={makeTransactionAction}>
        {t("transaction.pay")}
      </Button>
    </div>
  );
};

export default MakeTransaction;
