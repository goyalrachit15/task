import React, { useState } from 'react';
import { Input, Button, VStack } from '@chakra-ui/react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <VStack spacing="4" mb="4">
      <Input
        placeholder="Search documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button colorScheme="teal" onClick={handleSearch}>
        Search
      </Button>
    </VStack>
  );
};

export default SearchBar;
