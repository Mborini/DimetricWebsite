"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { GoProjectRoadmap } from "react-icons/go";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { PiBuildingLight } from "react-icons/pi";
import { GiThreeFriends } from "react-icons/gi";
import {
  Box,
  Paper,
  Text,
  rem,
  Flex,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";

export default function Dashboard() {
  const router = useRouter();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";
    if (!isLoggedIn) router.push("/signin");
  }, []);

  const mockdata = [
    {
      title: "Projects",
      icon: GoProjectRoadmap ,
      color: "teal",
      path: "projectsManagmentPage",
    },
    {
      title: "solutions & Services",
      icon: LiaHandsHelpingSolid ,
      color: "indigo",
      path: "SolutionsAndServicesPage",
    },
    {
      title: "vision",
      icon: PiBuildingLight ,
      color: "pink",
      path: "VisionPage",
    },
    {
      title: "Partners",
      icon: GiThreeFriends ,
      color: "orange",
      path: "PartnersmanagmentPage",
    },
  ];

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Box
        w="fit-content"
        px="xl"
        py="lg"
        bg={isDark ? theme.colors.dark[6] : theme.colors.gray[0]}
        style={{
          borderRadius: rem(12),
          boxShadow: theme.shadows.lg,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <Flex gap="lg" wrap="wrap" justify="center">
          {mockdata.map(({ title, icon: Icon, color, path }) => (
            <Paper
              key={title}
              withBorder
              shadow="md"
              p="lg"
              radius="xl"
              style={{
                cursor: "pointer",
                textAlign: "center",
                width: rem(140),
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onClick={() =>
                path.startsWith("http")
                  ? window.open(path, "_blank")
                  : router.push(`/${path}`)
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = theme.shadows.xl;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = theme.shadows.md;
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: rem(64),
                  height: rem(64),
                  margin: "0 auto",
                  borderRadius: "50%",
                  backgroundColor: theme.colors[color][1],
                  marginBottom: rem(12),
                }}
              >
                <Icon size={28} color={theme.colors[color][7]} />
              </Box>
              <Text size="md" fw={600} c={isDark ? "gray.2" : "gray.7"}>
                {title}
              </Text>
            </Paper>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}
