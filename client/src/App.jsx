import Heading from "./components/Heading";
import TransactionList from "./components/TransactionList";
import { Routes, Route } from "react-router-dom";
import TransactionForm from "./components/TransactionForm";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
    return (
        <GlobalProvider>
            <div className="flex justify-center">
                <div className="h-screen p-10 flex w-2/5 items-center min-w-375 max-w-500">
                    <div className="container rounded-lg flex-1 flex-col mx-auto justify-center ">
                        <div className="bg-gray-800 w-full rounded-sm flex-none p-5">
                            <Heading />
                        </div>
                        <Routes>
                            <Route
                                path="/"
                                element={<TransactionList />}
                                exact
                            />
                            <Route path="/add" element={<TransactionForm />} />
                            <Route
                                path="/edit/:id"
                                element={<TransactionForm />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        </GlobalProvider>
    );
}

export default App;
