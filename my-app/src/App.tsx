import "./App.css";
import CreateCard from "./components/actions/createCard/CreateCard";
import CardsComponent from "./components/cards/Cards";
import MakeTransaction from "./components/actions/makeTransaction/MakeTransaction";
import Transactions from "./components/transactions/Transactions";
import "react-credit-cards/es/styles-compiled.css";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const [page, setPage] = useState<string>("transactions");
  const { t } = useTranslation();

  return (
    <div className="App">
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" onClick={() => setPage("home")}>
            {t("pages.home")}
          </Typography>
          <IconButton color="inherit" onClick={() => setPage("createCard")}>
          {t("pages.createCard")}
          </IconButton>
          <IconButton color="inherit" onClick={() => setPage("cards")}>
          {t("pages.allCards")}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => setPage("makeTransaction")}
          >
            {t("pages.makeTransaction")}
          </IconButton>
          <IconButton color="inherit" onClick={() => setPage("transactions")}>
          {t("pages.allTransactions")}
          </IconButton>
        </Toolbar>
      </AppBar>
      {page === "createCard" ? <CreateCard /> : null}
      {page === "cards" ? <CardsComponent /> : null}
      {page === "makeTransaction" ? <MakeTransaction /> : null}
      {page === "transactions" ? <Transactions /> : null}
    </div>
  );
}

export default App;
