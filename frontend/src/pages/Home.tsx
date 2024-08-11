import { Box, Heading, VStack } from '@chakra-ui/react';
import DocumentUpload from '../components/upload';
import AllDocumentList from '../components/AllDocuments';

const HomePage: React.FC = () => {
  return (
    <Box p="4">
      <Heading as="h1" mb="6">
        Document Manager
      </Heading>
      <VStack spacing="8">
        <DocumentUpload />
        <AllDocumentList/>
      </VStack>
    </Box>
  );
};

export default HomePage;
