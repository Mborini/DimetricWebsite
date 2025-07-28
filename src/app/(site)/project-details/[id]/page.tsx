"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { project as ProjectType } from "@/types/project";
import SharePost from "@/components/Projects/SharePost";
import TagButton from "@/components/Projects/TagButton";
import Image from "next/image";
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Loader,
  Grid,
  Paper,
  Box,
  Divider,
} from "@mantine/core";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProjectDetails = async () => {
        try {
          const response = await fetch(`/api/projects/${id}`);
          if (!response.ok) throw new Error("Network response was not ok");
          const data = await response.json();
          setProject(data);
        } catch (error) {
          console.error("Error fetching project details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProjectDetails();
    }
  }, [id]);

  if (!project) {
    return <Text color="red">Error: Project not found.</Text>;
  }

  return (
    <Container size="lg" pt={120} pb={80}>
      {loading ? (
        <Group justify="center" mt="xl">
          <Loader color="blue" size="lg" />
        </Group>
      ) : (
        <>
          <Title order={2} mb="lg" className="text-[#354476] dark:text-white">
            {project.title}
          </Title>

          <Box mb="xl">
            <Box pos="relative" h={600}>
              <Image
                src={project.imagename}
                alt={project.title}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "var(--mantine-radius-md)",
                }}
              />
            </Box>
          </Box>
          <Box mb="xl">
            <Group
              mb="xl"
              wrap="wrap"
              gap="xl"
              justify="space-between"
              className="text-[#354476] dark:text-white"
            >
              {/* Partner */}
              {project.partner && (
                <Group gap="xs" wrap="nowrap">
                  <Text
                    className="text-[#354476] dark:text-white"
                    fw={700}
                    size="sm"
                  >
                    Partner:
                  </Text>

                  <Text c="gray.4" size="md">
                    {project.partner || "Not specified"}
                  </Text>
                </Group>
              )}

              {/* Tags */}
              {/* Location */}
              <Group gap="xs" wrap="nowrap">
                <Text
                  fw={700}
                  size="sm"
                  className="text-[#354476] dark:text-white"
                >
                  Location:
                </Text>
                <Text c="gray.4" size="md">
                  {project.location || "Not specified"}
                </Text>
              </Group>

              {/* Value */}
              <Group gap="xs" wrap="nowrap">
                <Text fw={700} size="sm">
                  Value (USD):
                </Text>
                <Text c="gray.4" size="md">
                  {project.value_usd
                    ? `$${project.value_usd.toLocaleString()}`
                    : "Not specified"}
                </Text>
              </Group>
            </Group>

            <Divider my="xl" />
            <Group justify="space-between" align="flex-start" wrap="wrap">
              {/* Client */}
              <Box>
                <Title
                  fw={700}
                  size="md"
                  className="text-[#354476] dark:text-white"
                >
                  Client
                </Title>
                <Text c="gray.1" size="lg">
                  {project.client || "Client not specified"}
                </Text>
              </Box>

              {/* Dates */}
              <Stack gap={4} align="flex-end">
                {project.start_date && (
                  <Text size="sm" c="gray.4">
                    <strong>Start Date:</strong>{" "}
                    {new Date(project.start_date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                      },
                    )}
                  </Text>
                )}
                {project.end_date && (
                  <Text size="sm" c="gray.4">
                    <strong>End Date:</strong>{" "}
                    {new Date(project.end_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                    })}
                  </Text>
                )}
              </Stack>
            </Group>
          </Box>
          <Title className="text-[#354476] dark:text-white" order={3} mb="sm">
            Project Description
          </Title>
          <Text c="gray.4" size="md" mb="xl">
            {project.description ||
              "No description available for this project."}
          </Text>
        </>
      )}
    </Container>
  );
};

export default BlogDetailsPage;
