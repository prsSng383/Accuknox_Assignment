import CloudAccountsChart from "../charts/CloudAccountsChart";
import RiskAssessmentChart from "../charts/RiskAssessmentChart";
import ImageRiskAssessment from "../charts/ImageRiskAssessment";
import ImageSecurityChart from "../charts/ImageSecurityChart";
import TicketOverview from "../charts/TicketOverview";
import NoGraphData from "../components/NoGraphData";

export const widgetComponents = {
  cloud_accounts: CloudAccountsChart,
  risk_assessment: RiskAssessmentChart,
  top5_alerts: NoGraphData,
  workload_alerts: NoGraphData,
  image_risk: ImageRiskAssessment,
  security_issues: ImageSecurityChart,
  ticket_1: TicketOverview,
  ticket_2: TicketOverview,
};
