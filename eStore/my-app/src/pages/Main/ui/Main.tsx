
import Recommendation from "../../../widgets/Recommendation/ui/Recommendation";
import Catalog from "../../../widgets/Catalog/ui/Catalog";

import './Main.css';

const Main = () => {
    return (
        <main className="main">
            <Recommendation/>
            <Catalog/>
        </main>
    )
}

export default Main;