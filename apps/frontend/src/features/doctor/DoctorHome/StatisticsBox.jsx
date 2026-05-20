import { Card, CardContent } from "@/components/ui/card";

const StatisticsBox = ({ title, icon, number }) => {
  return (
    <Card className="w-[33%]">
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-sm text-gray-600">{title}</p>
        </div>
        <p className="text-2xl font-bold mt-2">{number ?? 0}</p>
      </CardContent>
    </Card>
  );
};

export default StatisticsBox;
