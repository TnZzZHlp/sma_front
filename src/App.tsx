import Solution from "./components/Solution";
import Check from "./components/Check";

const Route = () => {
    switch (window.location.pathname) {
        case "/":
            return <Solution />;
        case "/check":
            return <Check />;
        default:
            return <Solution />;
    }
};
function App() {
    return <Route />;
}

export default App;
