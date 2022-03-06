import { Redirect, Switch } from "react-router-dom";

function DashboardPage({ children }) {
  return (
    <>
      <Switch>
        {children}
        <Redirect exact from="/dashboard" to="/dashboard/analysis" />
      </Switch>
    </>
  )
}
export default DashboardPage