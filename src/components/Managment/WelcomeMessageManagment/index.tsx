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
import { fetchWelcomeMessages, updateWelcomeMessage } from "./services/solutionService";


export default function WelcomeMessageManagement() {
  const [welcomeMessages, setWelcomeMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const refresh = async () => {
    const data = await fetchWelcomeMessages();
    setWelcomeMessages(data);
  };

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  

  const handleEdit = (message) => {
    setSelectedMessage(message);
    setFormDrawerOpen(true);
  };


  const handleSubmit = async (values) => {
   await updateWelcomeMessage(selectedMessage.id, values);
    setFormDrawerOpen(false);
    await refresh();
  };

 
  return (
    <Container size="lg" my="xl">
      <Stack>
        <Title order={2} ta="center">
          Welcome Message Management
        </Title>
        
        <Paper shadow="md" radius="md" p="md" withBorder>
          {loading ? (
            <Center py="xl">
              <Loader size="lg" />
            </Center>
          ) : welcomeMessages.length === 0 ? (
            <Text ta="center" c="dimmed">
              No welcome messages found.
            </Text>
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover withColumnBorders>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Title</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {welcomeMessages.map((message) => (
                    <Table.Tr key={message.id}>
                      <Table.Td>{message.title}</Table.Td>
                      <Table.Td>{message.description}</Table.Td>
                      <Table.Td>
                        <Group gap="xs" justify="center">
                          <ActionIcon
                            color="blue"
                            variant="light"
                            onClick={() => handleEdit(message)}
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
          initialValues={selectedMessage}
          onSubmit={handleSubmit}
          loading={false}
        />
      </Drawer>

      
    </Container>
  );
}
