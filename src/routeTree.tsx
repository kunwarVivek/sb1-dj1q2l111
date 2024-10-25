import { Route, RootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Deals from './pages/Deals';
import Documents from './pages/Documents';
import DocumentDetail from './pages/documents/DocumentDetail';
import Analytics from './pages/Analytics';
import Prospecting from './pages/Prospecting';
import ProspectDetail from './pages/prospecting/ProspectDetail';
import VDR from './pages/VDR';
import PostMergerAnalysis from './pages/PostMergerAnalysis';
import TenantSettings from './pages/TenantSettings';

const rootRoute = new RootRoute({
  component: Layout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Dashboard,
});

const dealsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/deals',
  component: Deals,
});

const documentsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/documents',
  component: Documents,
});

const documentDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/documents/$id',
  component: DocumentDetail,
});

const analyticsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: Analytics,
});

const prospectingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/prospects',
  component: Prospecting,
});

const prospectDetailRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/prospects/$id',
  component: ProspectDetail,
});

const vdrRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/vdr',
  component: VDR,
});

const postMergerAnalysisRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/post-merger-analysis',
  component: PostMergerAnalysis,
});

const tenantSettingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/tenant-settings',
  component: TenantSettings,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  dealsRoute,
  documentsRoute,
  documentDetailRoute,
  analyticsRoute,
  prospectingRoute,
  prospectDetailRoute,
  vdrRoute,
  postMergerAnalysisRoute,
  tenantSettingsRoute,
]);