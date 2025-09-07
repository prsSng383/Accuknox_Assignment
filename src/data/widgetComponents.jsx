import React from "react";
import CloudAccountsChart from "../charts/CloudAccountsChart";
import RiskAssessmentChart from "../charts/RiskAssessmentChart";
import NoGraphData from "../components/NoGraphData";
import ImageRiskAssessment from "../charts/ImageRiskAssessment";

export const widgetComponents = {
  cloud_accounts: <CloudAccountsChart />,
  risk_assessment: <RiskAssessmentChart />,
  top5_alerts: <NoGraphData />,
  workload_alerts: <NoGraphData />,
  image_risk: <ImageRiskAssessment />,
  security_issues: <p>2 Total Images</p>,
  ticket_1: <p>Ticket Widget One</p>,
  ticket_2: <p>Ticket Widget Two</p>,
};
