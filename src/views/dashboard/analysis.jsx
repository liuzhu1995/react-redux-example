import { useRouteMatch } from "react-router-dom";

function AnalysisPage() {
  const value = useRouteMatch();
  console.log(value, 'useRouteMatch');
  return (
    <div>
      analysis page
    </div>
  );
}

export default AnalysisPage;