import React from 'react';
import './App.css';
import {Messages} from "./features/messages/messages";
import {FormMessages} from "./features/form-messages/form-messages";
import {DateFormats, formatDate} from "./utils/date";

function App() {
    return (
        <div className="App">
            <Messages />
            <FormMessages />
        </div>
    );
}

export default App;
