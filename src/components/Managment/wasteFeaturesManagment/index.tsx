"use client";

import {
  Table,
  Text,
  Group,
  Loader,
  Center,
  Container,
  Title,
  Paper,
  ScrollArea,
  ActionIcon,
  Stack,
  Drawer,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import ProjectForm from "./ProjectForm";
import { fetchWasteFeatures, updateWasteFeature } from "./services/solutionService";

export default function WasteManagement() {
  const [wasteFeatures, setWasteFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [selectedWasteFeature, setSelectedWasteFeature] = useState(null);

  const refresh = async () => {
    const data = await fetchWasteFeatures();
    setWasteFeatures(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleEdit = (wasteFeature) => {
    setSelectedWasteFeature(wasteFeature);
    setFormDrawerOpen(true);
  };

  const handleSubmit = async (values) => {
    await updateWasteFeature(selectedWasteFeature.id, values);
    setFormDrawerOpen(false);
    await refresh();
  };

  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Waste Management Features
        </Title>

        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : wasteFeatures.length === 0 ? (
            <Text ta="center" c="dimmed">
              No waste features found.
            </Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {wasteFeatures.map((wasteFeature) => (
                    <Table.Tr key={wasteFeature.id}>
                      <Table.Td>{wasteFeature.id}</Table.Td>
                      <Table.Td>{wasteFeature.title}</Table.Td>
                      <Table.Td>{wasteFeature.description}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(wasteFeature)}
                          >
                            <FaEdit />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </ScrollArea>
          )}
        </Paper>
      </Stack>

      <Drawer
        opened={formDrawerOpen}
        onClose={() => setFormDrawerOpen(false)}
        title="Edit Waste Feature"
        position="right"
        size="md"
      >
        <ProjectForm
          initialValues={selectedWasteFeature}
          onSubmit={handleSubmit}
          loading={false}
        />
      </Drawer>
    </Container>
  );
}
