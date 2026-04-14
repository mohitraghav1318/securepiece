/**
 * Root Application Component
 *
 * This component acts as the main entry point for the UI layer.
 * It loads the application's routing configuration which decides
 * which page should render based on the URL.
 */

import AppRoutes from './routes/AppRoutes';



function App() {
  return (
    <>
      {/* Load all application routes */}
      <AppRoutes />
    </>
  );
}

export default App;
