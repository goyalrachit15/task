import React, { useState } from 'react';
import { Button, Input, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';

const DocumentUpload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const toast = useToast();

  const handleUpload = async () => {
    if (!files) {
      toast({
        title: 'No files selected.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('documents', file);
      });
      formData.append('isPublic', String(isPublic)); // Add public status

      await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast({
        title: 'Files uploaded successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      // Clear files after successful upload
      setFiles(null);
      setIsPublic(true);

    } catch {
      toast({
        title: 'Failed to upload files.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing="4">
      <Input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      <Button 
        colorScheme="teal" 
        onClick={() => setIsPublic(!isPublic)}
      >
        {isPublic ? 'Set as Private' : 'Set as Public'}
      </Button>
      <Button 
        colorScheme="teal" 
        onClick={handleUpload}
      >
        Upload Documents
      </Button>
    </VStack>
  );
};

export default DocumentUpload;
