import Solution from "./components/Solution";
import Check from "./components/Check";
import { MathJaxContext } from "better-react-mathjax";
import Nav from "./components/Nav";
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
    return (
        <MathJaxContext version={3}>
            {/* 顶端导航模块 */}
            <Nav />
            <Route />
        </MathJaxContext>
    );
}

export default App;
