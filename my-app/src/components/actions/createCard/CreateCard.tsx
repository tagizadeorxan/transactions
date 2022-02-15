import { cards } from "../../../data/data";
import styles from "./styles";
import { Formik, Form, Field } from "formik";
import { useTranslation } from "react-i18next";

const CreateCard = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        cardAccount: 0,
        maskedCardNumber: 0,
        expireDate: "",
        balance: 0,
        currency: t("currency.azn"),
        status: t("other.active")
      }}
      onSubmit={(values) => {
        setTimeout(() => {
          const newCard = {
            cardID: cards.length + 1,
            cardAccount: values.cardAccount,
            maskedCardNumber: values.maskedCardNumber,
            expireDate: values.expireDate,
            balance: values.balance,
            currency: values.currency,
            status: values.status
          };
          cards.push(newCard);
        }, 400);
      }}
    >
      {() => (
        <Form style={styles.form}>
          <label style={styles.label} htmlFor="cardAccount">
            {t("card.cardAccount")}
          </label>
          <Field style={styles.inputs} type="number" name="cardAccount" />
          <label style={styles.label} htmlFor="maskedCardNumber">
            {t("card.maskedCardNumber")}
          </label>
          <Field style={styles.inputs} type="number" name="maskedCardNumber" />
          <label style={styles.label} htmlFor="expireDate">
            {t("card.expireDate")}
          </label>
          <Field style={styles.inputs} type="text" name="expireDate" />
          <label style={styles.label} htmlFor="currency">
            {t("card.currency")}
          </label>
          <Field style={styles.inputs} as="select" name="currency">
            <option> {t("currency.azn")}</option>
            <option> {t("currency.eur")}</option>
            <option> {t("currency.usd")}</option>
          </Field>
          <label style={styles.label} htmlFor="status">
            {t("other.status")}
          </label>
          <Field style={styles.inputs} as="select" name="status">
            <option> {t("other.active")}</option>
            <option> {t("other.blocked")}</option>
          </Field>
          <label style={styles.label} htmlFor="balance">
            {t("card.balance")}
          </label>
          <Field style={styles.inputs} type="number" name="balance" />
          <button style={styles.inputs} type="submit">
            {t("other.submit")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCard;
