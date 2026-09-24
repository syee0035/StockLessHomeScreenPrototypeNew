import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Upload } from './pages/Upload';
import { ColumnMatching } from './pages/ColumnMatching';
import { DataCheck } from './pages/DataCheck';
import { Results } from './pages/Results';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'upload', Component: Upload },
      { path: 'columns', Component: ColumnMatching },
      { path: 'data-check', Component: DataCheck },
      { path: 'results', Component: Results },
    ],
  },
]);
