import './App.css';
import DynamicTable from './filter/FilterTable';
import SimpleTable from './table/SimpleTable';

function App() {
  return (
    <div className="App">
     <SimpleTable />
     <DynamicTable />
    </div>
  );
}

export default App;
