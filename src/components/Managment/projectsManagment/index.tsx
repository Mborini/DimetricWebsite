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
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "./services/projectsService";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ProjectForm from "./ProjectForm";

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedProject, setSelectedProject] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const refresh = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleCreate = () => {
    setFormMode("create");
    setSelectedProject(null);
    setFormDrawerOpen(true);
  };

  const handleEdit = (project) => {
    setFormMode("edit");
    setSelectedProject(project);
    setFormDrawerOpen(true);
  };

  const handleDelete = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (formMode === "create") {
      await createProject(values);
    } else {
      await updateProject(selectedProject.id, values);
    }
    setFormDrawerOpen(false);
    await refresh();
  };

  const confirmDelete = async () => {
    await deleteProject(projectToDelete.id);
    setDeleteModalOpen(false);
    await refresh();
  };

  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Projects Management
        </Title>
        <Button w={"15%"} radius="xl" variant="outline" onClick={handleCreate}>
          Create Project
        </Button>
        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : projects.length === 0 ? (
            <Text ta="center" c="dimmed">
              No projects found.
            </Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Client</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {projects.map((project) => (
                    <Table.Tr key={project.id}>
                      <Table.Td>{project.id}</Table.Td>
                      <Table.Td>{project.title}</Table.Td>
                      <Table.Td>{project.client}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(project)}
                          >
                            <FaEdit />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => handleDelete(project)}
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
        title={formMode === "create" ? "Create Project" : "Edit Project"}
        position="right"
        size="md"
      >
        <ProjectForm
          initialValues={selectedProject}
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
