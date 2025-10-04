// src/App.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  Avatar,
  Divider,
  alpha,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  TableChart as TableChartIcon,
  TrafficOutlined as TrafficIcon,
  Speed as SpeedIcon,
  Sensors as SensorsIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const API_URL = "https://traffic-backend-6ykq.onrender.com/fetch.php";

const drawerWidth = 280;

const sidebarItems = [
  { text: "Overview", icon: <DashboardIcon />, id: "overview" },
  { text: "Visualizations", icon: <TimelineIcon />, id: "charts" },
  { text: "Traffic Data", icon: <TableChartIcon />, id: "data" },
];

export default function App() {
  const [data, setData] = useState<any[]>([]);
  const [latest, setLatest] = useState<any>(null);
  const [activeSection, setActiveSection] = useState("overview");

  // Poll API every 3 seconds
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      if (Array.isArray(res.data)) {
        setData(res.data);
        setLatest(res.data[0]);
      } else {
        setData([res.data]);
        setLatest(res.data);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f7fa", minHeight: "100vh" }}>
      {/* Enhanced Sidebar */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            border: "none",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 3,
            bgcolor: alpha("#000", 0.1),
            borderBottom: `1px solid ${alpha("#fff", 0.1)}`,
          }}
        >
          <Avatar
            sx={{
              bgcolor: alpha("#fff", 0.2),
              color: "#fff",
              mr: 2,
              width: 48,
              height: 48,
            }}
          >
            <TrafficIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              Smart Traffic
            </Typography>
            <Typography
              variant="body2"
              sx={{ opacity: 0.8, fontSize: "0.85rem" }}
            >
              Control Center
            </Typography>
          </Box>
        </Box>

        <List sx={{ px: 2, py: 3 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.id} sx={{ mb: 1, borderRadius: 2 }}>
              <ListItemButton
                onClick={() => setActiveSection(item.id)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  px: 2,
                  bgcolor:
                    activeSection === item.id
                      ? alpha("#fff", 0.15)
                      : "transparent",
                  "&:hover": {
                    bgcolor: alpha("#fff", 0.1),
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",
                    minWidth: 40,
                    "& .MuiSvgIcon-root": {
                      filter:
                        activeSection === item.id
                          ? "drop-shadow(0 2px 4px rgba(255,255,255,0.3))"
                          : "none",
                    },
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: activeSection === item.id ? 600 : 400,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ bgcolor: alpha("#fff", 0.1), mx: 2 }} />

        <Box sx={{ p: 3, mt: "auto" }}>
          <Card
            sx={{
              bgcolor: alpha("#fff", 0.1),
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha("#fff", 0.1)}`,
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <SpeedIcon sx={{ color: "#10b981", mr: 1, fontSize: 20 }} />
                <Typography
                  variant="body2"
                  sx={{ color: "white", fontWeight: 500 }}
                >
                  System Status
                </Typography>
              </Box>
              <Chip
                label="Online"
                size="small"
                sx={{
                  bgcolor: "#10b981",
                  color: "white",
                  fontWeight: 500,
                }}
              />
            </CardContent>
          </Card>
        </Box>
      </Drawer>

      {/* Enhanced Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        {/* Enhanced Header */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: 1201,
            ml: `${drawerWidth}px`,
            width: `calc(100% - ${drawerWidth}px)`,
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            color: "#1e293b",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            backdropFilter: "blur(20px)",
            border: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: "#1e293b" }}
              >
                Smart Traffic Dashboard
              </Typography>
              <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
                Real-time traffic monitoring and analytics
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton sx={{ color: "#64748b" }}>
                <NotificationsIcon />
              </IconButton>
              <Chip
                label={`${data.length} Records`}
                variant="outlined"
                size="small"
                sx={{
                  color: "#3b82f6",
                  borderColor: "#3b82f6",
                  bgcolor: alpha("#3b82f6", 0.1),
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ pt: 12, px: 4, pb: 4 }}>{renderActiveSection()}</Box>
      </Box>
    </Box>
  );

  function renderActiveSection() {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "charts":
        return renderCharts();
      case "data":
        return renderDataTable();
      default:
        return renderOverview();
    }
  }

  function renderOverview() {
    return (
      <>
        {/* KPI Cards */}
        {latest && (
          <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
            <Box sx={{ flex: "1 1 calc(25% - 18px)", minWidth: "240px" }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                  color: "white",
                  height: 140,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <TrafficIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Current Road
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {latest.road}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Active monitoring
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    bgcolor: alpha("#fff", 0.1),
                  }}
                />
              </Card>
            </Box>

            <Box sx={{ flex: "1 1 calc(25% - 18px)", minWidth: "240px" }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  color: "white",
                  height: 140,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <SensorsIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      IR Sensor 1
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {latest.ir1}
                  </Typography>
                  <Chip
                    label={latest.ir1 > 500 ? "High Traffic" : "Normal"}
                    size="small"
                    sx={{ bgcolor: alpha("#fff", 0.2), color: "white" }}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1 1 calc(25% - 18px)", minWidth: "240px" }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  color: "white",
                  height: 140,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <SensorsIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      IR Sensor 2
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {latest.ir2}
                  </Typography>
                  <Chip
                    label={latest.ir2 > 500 ? "High Traffic" : "Normal"}
                    size="small"
                    sx={{ bgcolor: alpha("#fff", 0.2), color: "white" }}
                  />
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: "1 1 calc(25% - 18px)", minWidth: "240px" }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  height: 140,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ position: "relative", zIndex: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <SensorsIcon sx={{ mr: 1, fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      IR Sensor 3
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {latest.ir3}
                  </Typography>
                  <Chip
                    label={latest.ir3 > 500 ? "High Traffic" : "Normal"}
                    size="small"
                    sx={{ bgcolor: alpha("#fff", 0.2), color: "white" }}
                  />
                </CardContent>
              </Card>
            </Box>
          </Box>
        )}

        {/* Quick Stats */}
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          <Box sx={{ flex: "1 1 65%", minWidth: "600px" }}>
            <Card
              sx={{
                height: 400,
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <TrendingUpIcon sx={{ mr: 1, color: "#3b82f6" }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Traffic Flow Overview
                  </Typography>
                </Box>
                <LineChart width={700} height={300} data={data.slice(-10)}>
                  <Line
                    type="monotone"
                    dataKey="ir1"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="IR Sensor 1"
                  />
                  <Line
                    type="monotone"
                    dataKey="ir2"
                    stroke="#06b6d4"
                    strokeWidth={3}
                    name="IR Sensor 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="ir3"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="IR Sensor 3"
                  />
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                  <XAxis dataKey="id" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                </LineChart>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: "1 1 30%", minWidth: "300px" }}>
            <Card
              sx={{
                height: 400,
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Activity
                </Typography>
                <Box sx={{ height: 320, overflowY: "auto" }}>
                  {data
                    .slice(-5)
                    .reverse()
                    .map((record, index) => (
                      <Box
                        key={record.id}
                        sx={{
                          mb: 2,
                          p: 2,
                          bgcolor: alpha("#f1f5f9", 0.5),
                          borderRadius: 2,
                          border: `1px solid ${alpha("#e2e8f0", 0.5)}`,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, color: "#1e293b" }}
                        >
                          Road {record.road}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#64748b", mb: 1 }}
                        >
                          IR: {record.ir1}/{record.ir2}/{record.ir3}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          {new Date(record.created_at).toLocaleTimeString()}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </>
    );
  }

  function renderCharts() {
    return (
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}
        >
          Data Visualizations
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
          {/* Line Chart */}
          <Box sx={{ flex: "1 1 65%", minWidth: "600px" }}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Traffic Flow Trends
                </Typography>
                <LineChart width={800} height={400} data={data}>
                  <Line
                    type="monotone"
                    dataKey="ir1"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="IR Sensor 1"
                  />
                  <Line
                    type="monotone"
                    dataKey="ir2"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    name="IR Sensor 2"
                  />
                  <Line
                    type="monotone"
                    dataKey="ir3"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="IR Sensor 3"
                  />
                  <CartesianGrid stroke="#e2e8f0" strokeDasharray="5 5" />
                  <XAxis dataKey="id" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "12px",
                      boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                    }}
                  />
                </LineChart>
              </CardContent>
            </Card>
          </Box>

          {/* Summary Cards */}
          <Box sx={{ flex: "1 1 30%", minWidth: "280px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Average Traffic
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {data.length > 0
                      ? Math.round(
                          data.reduce(
                            (sum, item) =>
                              sum + (item.ir1 + item.ir2 + item.ir3) / 3,
                            0
                          ) / data.length
                        )
                      : 0}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Peak Traffic
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {data.length > 0
                      ? Math.max(
                          ...data.map((item) =>
                            Math.max(item.ir1, item.ir2, item.ir3)
                          )
                        )
                      : 0}
                  </Typography>
                </CardContent>
              </Card>

              <Card
                sx={{
                  background:
                    "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                  color: "white",
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Total Records
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {data.length}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  function renderDataTable() {
    return (
      <>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 3, color: "#1e293b" }}
        >
          Traffic Data Records
        </Typography>

        <Card
          sx={{
            background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
            border: `1px solid ${alpha("#e2e8f0", 0.8)}`,
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Road
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      IR Sensor 1
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      IR Sensor 2
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      IR Sensor 3
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        color: "#1e293b",
                        bgcolor: "#f8fafc",
                      }}
                    >
                      Created At
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:nth-of-type(odd)": {
                          bgcolor: alpha("#f8fafc", 0.5),
                        },
                        "&:hover": { bgcolor: alpha("#e2e8f0", 0.3) },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>{row.id}</TableCell>
                      <TableCell>
                        <Chip
                          label={`Road ${row.road}`}
                          size="small"
                          sx={{
                            bgcolor: "#3b82f6",
                            color: "white",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.ir1}
                          size="small"
                          color={row.ir1 > 500 ? "error" : "success"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.ir2}
                          size="small"
                          color={row.ir2 > 500 ? "error" : "success"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.ir3}
                          size="small"
                          color={row.ir3 > 500 ? "error" : "success"}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={
                            Math.max(row.ir1, row.ir2, row.ir3) > 500
                              ? "High Traffic"
                              : "Normal"
                          }
                          size="small"
                          color={
                            Math.max(row.ir1, row.ir2, row.ir3) > 500
                              ? "warning"
                              : "success"
                          }
                        />
                      </TableCell>
                      <TableCell sx={{ color: "#64748b" }}>
                        {new Date(row.created_at).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  }
}
