import React, { useState } from "react";
import { Box, Heading, Text, Button, Input, Select, Grid, GridItem, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Image } from "@chakra-ui/react";

const Index = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Used Laptop",
      description: "Good condition laptop with minor scratches",
      condition: "used good",
      zipCode: "12345",
      price: 300,
      image: "https://images.unsplash.com/photo-1693206578613-144dd540b892?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx1c2VkJTIwbGFwdG9wfGVufDB8fHx8MTcxMTkxNDg5MXww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 2,
      title: "Brand New Sofa",
      description: "Comfortable sofa, never used",
      condition: "new",
      zipCode: "54321",
      price: 800,
      image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxuZXclMjBzb2ZhfGVufDB8fHx8MTcxMTkxNDg5MXww&ixlib=rb-4.0.3&q=80&w=1080",
    },
    // Add more initial items here
  ]);

  const [filteredItems, setFilteredItems] = useState(items);
  const [userZipCode, setUserZipCode] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    condition: "",
    zipCode: "",
    price: "",
  });

  const handleFilter = () => {
    let filtered = items;
    if (userZipCode) {
      filtered = filtered.filter((item) => item.zipCode === userZipCode);
    }
    if (priceFilter) {
      filtered = filtered.filter((item) => item.price <= parseInt(priceFilter));
    }
    setFilteredItems(filtered);
  };

  const handleLogin = () => {
    // Perform login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    const item = { ...newItem, id: items.length + 1 };
    setItems([...items, item]);
    setFilteredItems([...filteredItems, item]);
    setNewItem({
      title: "",
      description: "",
      condition: "",
      zipCode: "",
      price: "",
    });
    onClose();
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Marketplace
      </Heading>

      {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : <Button onClick={handleLogin}>Login</Button>}

      {isLoggedIn && (
        <Button onClick={onOpen} mt={4}>
          Sell an Item
        </Button>
      )}

      <Box mt={4}>
        <Input placeholder="Enter your zip code" value={userZipCode} onChange={(e) => setUserZipCode(e.target.value)} mr={2} />
        <Select placeholder="Filter by price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} mr={2}>
          <option value="">All</option>
          <option value="100">Under $100</option>
          <option value="500">Under $500</option>
          <option value="1000">Under $1000</option>
        </Select>
        <Button onClick={handleFilter}>Filter</Button>
      </Box>

      <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={4}>
        {filteredItems.map((item) => (
          <GridItem key={item.id} borderWidth={1} borderRadius="md" p={4}>
            <Image src={item.image} alt={item.title} mb={2} />
            <Heading as="h3" size="md" mb={2}>
              {item.title}
            </Heading>
            <Text mb={2}>{item.description}</Text>
            <Text mb={2}>Condition: {item.condition}</Text>
            <Text mb={2}>Zip Code: {item.zipCode}</Text>
            <Text fontWeight="bold">${item.price}</Text>
          </GridItem>
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sell an Item</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={newItem.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={newItem.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Condition</FormLabel>
              <Select name="condition" value={newItem.condition} onChange={handleInputChange}>
                <option value="">Select condition</option>
                <option value="new">New</option>
                <option value="used like new">Used - Like New</option>
                <option value="used very good">Used - Very Good</option>
                <option value="used good">Used - Good</option>
                <option value="used acceptable">Used - Acceptable</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Zip Code</FormLabel>
              <Input name="zipCode" value={newItem.zipCode} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input name="price" type="number" value={newItem.price} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleAddItem}>Add Item</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
