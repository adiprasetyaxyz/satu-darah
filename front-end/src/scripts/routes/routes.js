import About from '../views/pages/about';
import CreateEvent from '../views/pages/create-event';
import CreateStock from '../views/pages/create-stock';
import Event from '../views/pages/event';
import Home from '../views/pages/home';
import Login from '../views/pages/login';
import Profile from '../views/pages/profile';
import Registration from '../views/pages/registration';
import Stock from '../views/pages/stock';
import UpdateStock from '../views/pages/update-stock';

const routes = {
  '/': Home, // default page
  '/home': Home,
  '/event': Event,
  '/stock-darah': Stock,
  '/about-us': About,
  '/register': Registration,
  '/login': Login,
  '/profile': Profile,
  '/create-event': CreateEvent,
  '/create-stock': CreateStock,
  '/update-stock': UpdateStock,
//   '/stock/:id': Detail,
};

export default routes;
