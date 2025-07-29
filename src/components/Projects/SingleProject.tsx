"use client";

import { project as ProjectType } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  Text,
  Title,
  Badge,
  Box,
  Stack,
  Anchor,
  Center,
} from "@mantine/core";

const SingleProject = ({ project }: { project: ProjectType | undefined }) => {
  if (!project) {
    return <Text color="red">Error: Project data is not available.</Text>;
  }

  const { title, id, start_date, imagename } = project;
  const formattedDate = start_date ? new Date(start_date).getFullYear() : "N/A";

  return (
   <Card
  shadow="md"
  radius="xl"
  p="lg"
  style={{
    transition: "transform 0.3s",
    cursor: "pointer",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  }}
  className="hover:scale-[1.03]"
>

      <Anchor component={Link} href={`/project-details/${id}`}>
        <Box
          h={250}
          style={{
            overflow: "hidden",
            position: "relative",
            borderRadius: "12px",
          }}
        >
          <Badge
            color="blue"
            variant="filled"
            radius="lg"
            size="md"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 10,
            }}
          >
            {formattedDate}
          </Badge>

          {imagename &&
          (imagename.startsWith("http") || imagename.startsWith("/")) ? (
            <Image
              src={imagename}
              alt={title}
              fill
              style={{ objectFit: "cover", zIndex: 1 }}
            />
          ) : (
            <Center h="100%" bg="gray.2">
              <Text size="sm" color="gray">
                No Image
              </Text>
            </Center>
          )}
        </Box>
      </Anchor>
      <Stack mt="md">
        <Title order={3} size="h4" lineClamp={2}>
          <Anchor
            component={Link}
            href={`/product-details/${id}`}
            className="text-inherit !text-gray-400 dark:text-gray-900"
            fw={500}
          >
            {title}
          </Anchor>
        </Title>
      </Stack>
    </Card>
  );
};

export default SingleProject;
