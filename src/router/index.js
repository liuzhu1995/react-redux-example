import { DashboardPage, AnalysisPage, MonitorPage } from "../views/dashboard";
import { FormPage, BasicFormPage, StepFromPage } from "../views/form";

const routeList = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardPage,
    routes: [
      {
        path: '/dashboard/analysis',
        name: '分析页',
        component: AnalysisPage,
      },
      {
        path: '/dashboard/monitor',
        name: '监控页',
        component: MonitorPage,
      },
    ],
  },
  {
    path: '/form',
    name: '表单页',
    component: FormPage,
    routes: [
      {
        path: '/form/basic-form',
        name: '基础表单',
        component: StepFromPage,
      },
      {
        path: '/form/step-form',
        name: '分布表单',
        component: BasicFormPage,
      }
    ]
  }
];

export default routeList;