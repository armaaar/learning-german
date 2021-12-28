import { render } from 'solid-js/web';

import { PagesRouter } from './pages/PagesRouter';

import 'normalize.css'
import './index.scss'

render(() => <PagesRouter />, document.getElementById('root') as HTMLElement);
