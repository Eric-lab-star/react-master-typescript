import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {
  onClick: () => void;
  isDark: boolean;
}

const Router = ({ onClick, isDark }: IRouterProps) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/:coinId">
          <Coin isDark={isDark} />
        </Route>
        <Route path="/">
          <Coins onClick={onClick} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
