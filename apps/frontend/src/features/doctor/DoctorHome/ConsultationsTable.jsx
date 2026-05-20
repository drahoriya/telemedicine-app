"use client";

import { DateTime } from "luxon";
import DataTable from "@/components/DataTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const transformStatus = (status) => {
  const map = {
    pending: "Pending",
    canceled: "Canceled",
    completed: "Completed",
    "in-progress": "In progress",
  };
  return map[status] || status;
};

const ConsultationsTable = ({ consultations }) => {
  const headers = ["Patient", "Date", "Status", "Created", "Updated"];

  const renderRow = (consultation, index) => {
    const date = consultation?.date
      ? DateTime.fromJSDate(new Date(consultation.date)).toFormat(
          "dd-MM-yyyy HH:mm",
        )
      : "-";
    const createdAt = consultation?.createdAt
      ? DateTime.fromJSDate(new Date(consultation.createdAt)).toFormat(
          "dd-MM-yyyy HH:mm",
        )
      : "-";
    const updatedAt = consultation?.updatedAt
      ? DateTime.fromJSDate(new Date(consultation.updatedAt)).toFormat(
          "dd-MM-yyyy HH:mm",
        )
      : "-";

    return (
      <tr key={index} className="border-b hover:bg-muted/50 text-xs">
        <td className="px-4 py-3">
          {consultation?.patient?.firstName} {consultation?.patient?.lastName}
        </td>
        <td className="px-4 py-3">{date}</td>
        <td className="px-4 py-3">{transformStatus(consultation?.status)}</td>
        <td className="px-4 py-3">{createdAt}</td>
        <td className="px-4 py-3">{updatedAt}</td>
      </tr>
    );
  };

  const tabs = [
    { value: "all", label: "All", filter: () => true },
    { value: "pending", label: "Pending", filter: (c) => c.status === "pending" },
    { value: "in-progress", label: "In progress", filter: (c) => c.status === "in-progress" },
    { value: "completed", label: "Completed", filter: (c) => c.status === "completed" },
    { value: "canceled", label: "Canceled", filter: (c) => c.status === "canceled" },
  ];

  return (
    <Tabs defaultValue="all">
      <TabsList className="grid grid-cols-5 w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:text-primary-500 data-[state=active]:border-t-2 data-[state=active]:border-primary-500 rounded-none"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          <DataTable
            data={(consultations || []).filter(tab.filter)}
            renderRow={renderRow}
            headers={headers}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ConsultationsTable;
