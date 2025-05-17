// React Router'ı import ederiz. `HashRouter`, URL'nin hash kısmını kullanarak sayfa yönlendirmesi yapar.
// `Route` ise belirli bir URL'ye karşılık gelen component'leri render eder.
import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// Uygulama içerisindeki farklı component'ler
import TrelloBoard from "../components/TrelloBoard";
import Home from "../components/Home";

// AppRouter component'i, sayfa yönlendirmelerini ve route'ları tanımlar
const AppRouter = () => {
  return (
    <Router> {/* Router, tüm yönlendirmelerin yapılacağı wrapper'dır */}
      <div>
        {/* Ana sayfaya gitmek için `/` route'u, Home component'ini render eder */}
        <Route path="/" exact component={Home} />

        {/* Dinamik bir route tanımlanır. `:boardID` parametresi ile URL'den board ID'si alınır. */}
        <Route path="/:boardID" component={TrelloBoard} />
      </div>
    </Router>
  );
};

export default AppRouter;
