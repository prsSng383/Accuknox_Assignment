export const initialDashboard = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        { id: "cloud_accounts", name: "Cloud Accounts", text: null },
        { id: "risk_assessment", name: "Cloud Account Risk Assessment", text: null },
      ],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        { id: "top5_alerts", name: "Top 5 Namespace Specific Alerts", text: null },
        { id: "workload_alerts", name: "Workload Alerts", text: null },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        { id: "image_risk", name: "Image Risk Assessment", text: null },
        { id: "security_issues", name: "Image Security Issues", text: null },
      ],
    },
  ],
};

export const widgetOptions = {
  cspm: [
    { id: "cloud_accounts", name: "Cloud Accounts" },
    { id: "risk_assessment", name: "Cloud Account Risk Assessment" },
  ],
  cwpp: [
    { id: "top5_alerts", name: "Top 5 Namespace Specific Alerts" },
    { id: "workload_alerts", name: "Workload Alerts" },
  ],
  image: [
    { id: "image_risk", name: "Image Risk Assessment" },
    { id: "security_issues", name: "Image Security Issues" },
  ],
  ticket: [
    { id: "ticket_1", name: "Ticket Widget One" },
    { id: "ticket_2", name: "Ticket Widget Two" },
  ],
};
