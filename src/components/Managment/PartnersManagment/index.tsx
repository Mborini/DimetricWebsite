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
  fetchPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "./services/projectsService";
import DeleteConfirmModal from "./DeleteConfirmModal";
import ProjectForm from "./ProjectForm";

export default function PartnersManagement() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);

  const refresh = async () => {
    const data = await fetchPartners();
    setPartners(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  const handleCreate = () => {
    setFormMode("create");
    setSelectedPartner(null);
    setFormDrawerOpen(true);
  };

  const handleEdit = (partner) => {
    setFormMode("edit");
    setSelectedPartner(partner);
    setFormDrawerOpen(true);
  };

  const handleDelete = (partner) => {
    setPartnerToDelete(partner);
    setDeleteModalOpen(true);
  };

  const handleSubmit = async (values) => {
    if (formMode === "create") {
      await createPartner(values);
    } else {
      await updatePartner(selectedPartner.id, values);
    }
    setFormDrawerOpen(false);
    await refresh();
  };

  const confirmDelete = async () => {
    await deletePartner(partnerToDelete.id);
    setDeleteModalOpen(false);
    await refresh();
  };

  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Partners Management
        </Title>
        <Button
          w={"15%"}
          radius="xl"
          variant="outline"
          onClick={handleCreate}
        >
          Create Partner
        </Button>
        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : partners.length === 0 ? (
            <Text ta="center" c="dimmed">
              No partners found.
            </Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ID</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Image</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {partners.map((partner) => (
                    <Table.Tr key={partner.id}>
                      <Table.Td>{partner.id}</Table.Td>
                      <Table.Td>{partner.name}</Table.Td>
                      <Table.Td>
                        <img src={partner.image_url} alt={partner.name} width={50} />
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(partner)}
                          >
                            <FaEdit />
                          </ActionIcon>
                          <ActionIcon
                            color="red"
                            variant="light"
                            onClick={() => handleDelete(partner)}
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
        title={formMode === "create" ? "Create Partner" : "Edit Partner"}
        position="right"
        size="md"
      >
        <ProjectForm
          initialValues={selectedPartner}
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
