import Portfolio from "./components/Portfolio";
import { PreferencesProvider } from "./components/Preferences";

export default function PortfolioApp() {
  return <PreferencesProvider><Portfolio /></PreferencesProvider>;
}
