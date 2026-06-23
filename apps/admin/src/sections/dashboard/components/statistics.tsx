"use client";

import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Separator } from "@workspace/ui/components/separator";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import Empty from "@workspace/ui/composed/empty";
import { Icon } from "@workspace/ui/composed/icon";
import {
  queryServerTotalData,
  queryTicketWaitReply,
} from "@workspace/ui/services/admin/console";
import { formatBytes } from "@workspace/ui/utils/formatting";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { UserSubscribeDetail } from "@/sections/user/user-detail";
import { RevenueStatisticsCard } from "./revenue-statistics-card";
import SystemVersionCard from "./system-version-card";
import { UserStatisticsCard } from "./user-statistics-card";

const toNumber = (value: unknown) => Number(value ?? 0) || 0;

export default function Statistics() {
  const { t } = useTranslation("dashboard");

  const { data: TicketTotal } = useQuery({
    queryKey: ["queryTicketWaitReply"],
    queryFn: async () => {
      try {
        const response = await queryTicketWaitReply({ skipErrorHandler: true });
        return Number(response?.data?.data?.count ?? 0) || 0;
      } catch {
        return 0;
      }
    },
    initialData: 0,
    retry: false,
  });
  const { data: ServerTotal } = useQuery({
    queryKey: ["queryServerTotalData"],
    queryFn: async () => {
      const { data } = await queryServerTotalData();
      return data.data;
    },
  });

  const [dataType, setDataType] = useState<string | "nodes" | "users">("nodes");
  const [timeFrame, setTimeFrame] = useState<string | "today" | "yesterday">(
    "today"
  );

  const trafficData = {
    nodes: {
      today:
        ServerTotal?.server_traffic_ranking_today?.map((item) => ({
          name: item.name,
          traffic: toNumber(item.download) + toNumber(item.upload),
        })) || [],
      yesterday:
        ServerTotal?.server_traffic_ranking_yesterday?.map((item) => ({
          name: item.name,
          traffic: toNumber(item.download) + toNumber(item.upload),
        })) || [],
    },
    users: {
      today:
        ServerTotal?.user_traffic_ranking_today?.map((item) => ({
          name: item.sid,
          traffic: toNumber(item.download) + toNumber(item.upload),
        })) || [],
      yesterday:
        ServerTotal?.user_traffic_ranking_yesterday?.map((item) => ({
          name: item.sid,
          traffic: toNumber(item.download) + toNumber(item.upload),
        })) || [],
    },
  };
  const currentData =
    trafficData[dataType as "nodes" | "users"][
      timeFrame as "today" | "yesterday"
    ];

  const todayUpload = toNumber(ServerTotal?.today_upload);
  const todayDownload = toNumber(ServerTotal?.today_download);
  const monthlyUpload = toNumber(ServerTotal?.monthly_upload);
  const monthlyDownload = toNumber(ServerTotal?.monthly_download);
  const onlineServers = toNumber(ServerTotal?.online_servers);
  const offlineServers = toNumber(ServerTotal?.offline_servers);
  const onlineUsers = toNumber(ServerTotal?.online_users);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: t("onlineUsersCount", "Online Users"),
            value: onlineUsers,
            subtitle: t("currentlyOnline", "Currently Online"),
            icon: "uil:users-alt",
            href: "/dashboard/user",
            color: "text-blue-600 dark:text-blue-400",
            iconBg: "bg-blue-100 dark:bg-blue-900/30",
          },

          {
            title: t("todayTraffic", "Today Traffic"),
            value: formatBytes(todayUpload + todayDownload),
            subtitle: `↑${formatBytes(todayUpload)} ↓${formatBytes(todayDownload)}`,
            icon: "uil:exchange-alt",
            color: "text-purple-600 dark:text-purple-400",
            iconBg: "bg-purple-100 dark:bg-purple-900/30",
          },
          {
            title: t("monthTraffic", "Month Traffic"),
            value: formatBytes(monthlyUpload + monthlyDownload),
            subtitle: `↑${formatBytes(monthlyUpload)} ↓${formatBytes(monthlyDownload)}`,
            icon: "uil:cloud-data-connection",
            color: "text-orange-600 dark:text-orange-400",
            iconBg: "bg-orange-100 dark:bg-orange-900/30",
          },
          {
            title: t("totalServers", "Total Servers"),
            value: onlineServers + offlineServers,
            subtitle: `${t("online", "Online")} ${onlineServers} ${t("offline", "Offline")} ${offlineServers}`,
            icon: "uil:server-network",
            href: "/dashboard/servers",
            color: "text-green-600 dark:text-green-400",
            iconBg: "bg-green-100 dark:bg-green-900/30",
          },
          {
            title: t("pendingTickets", "Pending Tickets"),
            value: toNumber(TicketTotal),
            subtitle: t("pending", "Pending"),
            icon: "uil:clipboard-notes",
            href: "/dashboard/ticket",
            color: "text-red-600 dark:text-red-400",
            iconBg: "bg-red-100 dark:bg-red-900/30",
          },
        ].map((item, index) => (
          <Link
            className={item.href ? "" : "pointer-events-none"}
            key={index}
            to={item.href || "#"}
          >
            <Card className={`group ${item.href ? "cursor-pointer" : ""}`}>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="mb-2 font-medium text-muted-foreground text-sm">
                      {item.title}
                    </p>
                    <div className={`mb-1 font-bold text-2xl ${item.color}`}>
                      {item.value}
                    </div>
                    <div className="h-4 text-muted-foreground text-xs">
                      {item.subtitle}
                    </div>
                  </div>
                  <div
                    className={`rounded-full p-3 ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      className={`h-6 w-6 ${item.color}`}
                      icon={item.icon}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <SystemVersionCard />
      </div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <RevenueStatisticsCard />
        <UserStatisticsCard />
        <Card>
          <CardHeader className="!flex-row flex items-center justify-between">
            <CardTitle>{t("trafficRank", "Traffic Rank")}</CardTitle>
            <Tabs onValueChange={setTimeFrame} value={timeFrame}>
              <TabsList>
                <TabsTrigger value="today">{t("today", "Today")}</TabsTrigger>
                <TabsTrigger value="yesterday">
                  {t("yesterday", "Yesterday")}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-80">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="font-semibold">
                {dataType === "nodes"
                  ? t("nodeTraffic", "Node Traffic")
                  : t("userTraffic", "User Traffic")}
              </h4>
              <Select defaultValue="nodes" onValueChange={setDataType}>
                <SelectTrigger className="w-28">
                  <SelectValue
                    placeholder={t("selectTypePlaceholder", "Select Type")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nodes">{t("nodes", "Nodes")}</SelectItem>
                  <SelectItem value="users">{t("users", "Users")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {currentData.length > 0 ? (
              <ChartContainer
                className="max-h-80"
                config={{
                  traffic: {
                    label: t("traffic", "Traffic"),
                    color: "var(--primary)",
                  },
                  type: {
                    label: t("type", "Type"),
                    color: "var(--muted-foreground)",
                  },
                  label: {
                    color: "var(--foreground)",
                  },
                }}
              >
                <BarChart data={currentData} height={400} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    axisLine={false}
                    tickFormatter={(value) => formatBytes(toNumber(value))}
                    tickLine={false}
                    type="number"
                  />
                  <YAxis
                    axisLine={false}
                    dataKey="name"
                    interval={0}
                    tickFormatter={(_value, index) => String(index + 1)}
                    tickLine={false}
                    tickMargin={0}
                    type="category"
                    width={15}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => formatBytes(toNumber(value))}
                        label={true}
                        labelFormatter={(label, [payload]) =>
                          dataType === "nodes" ? (
                            `${t("nodes", "Nodes")}: ${label}`
                          ) : (
                            <>
                              <div className="w-80">
                                <UserSubscribeDetail
                                  enabled={true}
                                  id={payload?.payload.name}
                                />
                              </div>
                              <Separator className="my-2" />
                              <div>{`${t("users", "Users")}: ${label}`}</div>
                            </>
                          )
                        }
                      />
                    }
                    trigger="hover"
                  />
                  <Bar
                    dataKey="traffic"
                    fill="var(--primary)"
                    radius={[0, 4, 4, 0]}
                  >
                    <LabelList
                      className="fill-foreground"
                      dataKey="name"
                      fontSize={12}
                      offset={8}
                      position="insideLeft"
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Empty />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
