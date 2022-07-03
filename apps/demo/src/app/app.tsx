import Color from './context/Favourites/Color';
import FavouritesContextProvider from './context/FavouritesContextProvider';

import router from './router';

function App() {
  return (
    <div>
      <h1>App</h1>
      <FavouritesContextProvider color={Color.Red}>
        <router.Component />
      </FavouritesContextProvider>
    </div>
  );
}

export default App;
