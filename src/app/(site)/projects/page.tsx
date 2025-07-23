"use client";

import { useEffect, useState } from "react";
import SingleProject from "@/components/Projects/SingleProject";
import Breadcrumb from "@/components/Common/Breadcrumb";
import {
  Container,
  Loader,
  SimpleGrid,
  Center,
  Stack,
  Text,
} from "@mantine/core";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Breadcrumb
        pageName="Projects"
        description="Explore our projects and get to know more about them."
      />

      <Stack py={40}>
        <Container size="xl">
          {loading ? (
            <Center>
              <Loader color="blue" size="lg" />
            </Center>
          ) : projects.length === 0 ? (
            <Center>
              <Text c="dimmed">No projects found.</Text>
            </Center>
          ) : (
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="lg"
              verticalSpacing="xl"
            >
              {projects.map((project) => (
                <SingleProject key={project.id} project={project} />
              ))}
            </SimpleGrid>
          )}
        </Container>
      </Stack>
    </>
  );
};

export default Project;
