import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, Link, Button, Input, HStack } from '@chakra-ui/react';
import axios from 'axios';

interface Document {
  _id: string;
  name: string;
  url: string;
  isPublic: boolean;
}

const AllDocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get<Document[]>('http://localhost:5000/api/documents/search', {
          params: { query: searchQuery },
        });
        console.log(response.data);
        setDocuments(response.data);
      } catch (err) {
        setError('Failed to fetch documents');
      }
    };

    fetchDocuments();
  }, [searchQuery]);

  const handlePrivacyToggle = async (id: string, isPublic: boolean) => {
    try {
      await axios.patch('http://localhost:5000/api/documents/update-privacy', {
        id,
        isPublic: !isPublic,
        username : localStorage.getItem('username'),
      });
      setDocuments(documents.map(doc => doc._id === id ? { ...doc, isPublic: !isPublic } : doc));
    } catch (err) {
      setError('Failed to update document privacy');
    }
  };

  if (error) {
    return <Box color="red.500">{error}</Box>;
  }

  if (documents.length === 0) {
    return <Box>No documents found</Box>;
  }

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button colorScheme="teal" onClick={() => setSearchQuery(searchQuery)}>
          Search
        </Button>
      </HStack>
      <List spacing={3}>
        {documents.map((doc) => (
          <ListItem key={doc._id} display="flex" alignItems="center" justifyContent="space-between">
            <Link href={doc.url} isExternal color="blue.500">
              {doc.name} {doc.isPublic ? '(Public)' : '(Private)'}
            </Link>
            <Button
              colorScheme="teal"
              size="sm"
              onClick={() => handlePrivacyToggle(doc._id, doc.isPublic)}
            >
              {doc.isPublic ? 'Make Private' : 'Make Public'}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllDocumentList;
