import React from "react";
import { Text, Flex, Box, Divider } from "@chakra-ui/react";
import { useGetAllCaptionsQuery } from "../services/apiCalls";
const AllDescriptions = () => {
  const { data, isSuccess } = useGetAllCaptionsQuery();
  console.log(data);
  return (
    <Flex w={"90%"} mt={5} flexDirection={"column"}>
      <Flex w={"100%"} justifyContent={"space-evenly"} gap={3} mb={3}>
        <Box w={"30%"} textAlign={"center"}>
          <Text fontWeight={"bolder"}>Caption Id</Text>
        </Box>
        <Box w={"30%"} textAlign={"center"}>
          <Text fontWeight={"bolder"}>Caption</Text>
        </Box>
        <Box w={"30%"} textAlign={"center"}>
          <Text fontWeight={"bolder"}>Description</Text>
        </Box>
      </Flex>
      <Flex
        flexDirection={"column-reverse"}
        w={"100%"}
        mx={"auto"}
        overflowY={"auto"}
        h={"85%"}
      >
        {isSuccess &&
          data.data &&
          data.data.map((d) => (
            <Flex key={d.id} flexDirection={"column"}>
              <Flex
                w={"100%"}
                alignItems={"space-between"}
                gap={10}
                minH={"15%"}
              >
                {" "}
                <Box w={"30%"} textAlign={"center"} my={"auto"}>
                  <Text fontWeight={"bold"}># {d.id}</Text>
                </Box>
                <Box w={"30%"} textAlign={"start"} my={"auto"}>
                  <Text>{d.caption}</Text>
                </Box>
                <Box w={"30%"} textAlign={"start"}>
                  <Text>{d.description}</Text>
                </Box>
              </Flex>
              <Divider w={"55%"} orientation="horizontal" mx={"auto"} />
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};

export default AllDescriptions;
