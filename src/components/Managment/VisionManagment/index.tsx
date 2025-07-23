"use client";

import {
  Table,
  Text,
  Button,
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
import { FaEdit, FaTrash } from "react-icons/fa";

import ProjectForm from "./ProjectForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { fetchVisions, updateVision } from "./services/solutionService";


export default function VisionManagement() {
  const [visions, setVisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [selectedVision, setSelectedVision] = useState(null);

  const refresh = async () => {
    const data = await fetchVisions();
    setVisions(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  

  const handleEdit = (vision) => {
    setSelectedVision(vision);
    setFormDrawerOpen(true);
  };


  const handleSubmit = async (values) => {
   await updateVision(selectedVision.id, values);
    setFormDrawerOpen(false);
    await refresh();
  };

 
  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Vision Management
        </Title>
        
        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : visions.length === 0 ? (
            <Text ta="center" c="dimmed">
              No visions found.
            </Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {visions.map((vision) => (
                    <Table.Tr key={vision.id}>
                      <Table.Td>{vision.description}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(vision)}
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
        title={ "Edit Vision"}
        position="right"
        size="md"
      >
        <ProjectForm
          initialValues={selectedVision}
          onSubmit={handleSubmit}
          loading={false}
        />
      </Drawer>

      
    </Container>
  );
}
