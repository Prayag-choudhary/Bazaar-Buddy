import { useState } from "react";
import AuthPage from "./pages/AuthPage";
import CustomerApp from "./pages/CustomerApp";
import ShopkeeperApp from "./pages/ShopkeeperApp";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) return <AuthPage onLogin={setUser} />;
  if (user.type === "customer") return <CustomerApp user={user} onLogout={() => setUser(null)} />;
  return <ShopkeeperApp user={user} onLogout={() => setUser(null)} />;
}
