import { Redirect, Switch } from "react-router-dom";

function FormPage({ children }) {
  return (
    <>
      <Switch>
        {children}
        <Redirect exact from="/form" to="/form/basic-form" />
      </Switch>
    </>
  )
}

export default FormPage;