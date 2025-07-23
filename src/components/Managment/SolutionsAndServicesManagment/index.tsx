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
import {
 
  fetchSolutions,
  createSolution,
  updateSolution,
  deleteSolution,
} from "./services/solutionService";
import ProjectForm from "./ProjectForm";
import DeleteConfirmModal from "./DeleteConfirmModal";


export default function SolutionsManagement() {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState(null);

  const refresh = async () => {
    const data = await fetchSolutions();
    setSolutions(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleCreate = () => {
    setFormMode("create");
    setSelectedSolution(null);
    setFormDrawerOpen(true);
  };

  const handleEdit = (solution) => {
    setFormMode("edit");
    setSelectedSolution(solution);
    setFormDrawerOpen(true);
  };

  const handleDelete = (solution) => {
    setSolutionToDelete(solution);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (formMode === "create") {
      await createSolution(values);
    } else {
      await updateSolution(selectedSolution.id, values);
    }
    setFormDrawerOpen(false);
    await refresh();
  };

  const confirmDelete = async () => {
    await deleteSolution(solutionToDelete.id);
    setDeleteModalOpen(false);
    await refresh();
  };

  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Solutions Management
        </Title>
        <Button
          w={"15%"}
          radius="xl"
          variant="outline"
          onClick={handleCreate}
        >
          Create Solution
        </Button>
        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : solutions.length === 0 ? (
            <Text ta="center" c="dimmed">
              No solutions found.
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
                  {solutions.map((solution) => (
                    <Table.Tr key={solution.id}>
                      <Table.Td>{solution.id}</Table.Td>
                      <Table.Td>{solution.title}</Table.Td>
                      <Table.Td>{solution.description}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(solution)}
                          >
                            <FaEdit />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => handleDelete(solution)}
                          >
                            <FaTrash />
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
        title={formMode === "create" ? "Create Solution" : "Edit Solution"}
        position="right"
        size="md"
      >
        <ProjectForm
          initialValues={selectedSolution}
          onSubmit={handleSubmit}
          loading={false}
        />
      </Drawer>

      <DeleteConfirmModal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
