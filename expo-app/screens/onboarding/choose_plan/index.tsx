import React, { useState } from "react";
import { Grid, GridItem } from "@/components/ui/grid";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { StyleSheet} from 'react-native';
import { Heading } from "@/components/ui/heading";
import { router } from "expo-router";
import {
  AlertCircleIcon,
  EditIcon,
  Icon,
  CheckIcon,
  CalendarDaysIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonIcon, ButtonText} from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import useRouter from "@unitools/router";
import { SafeAreaView } from "@/components/ui/safe-area-view";

import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";

type MobileHeaderProps = {
  title: string;
};


const Sidebar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedIndexResources, setSelectedIndexResources] =
    useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // router.push("/profile/profile");
  };
  const handlePressResources = (index: number) => {
    setSelectedIndexResources(index);
    // router.push("/profile/profile");
  };
  return (
    <ScrollView className=" h-full" contentContainerStyle={{ flexGrow: 1 }}>
      <VStack
        className="h-full flex-1 w-[280px] py-4 pr-4 pl-8 items-center border-r border-border-300"
        space="xl"
      >
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">SETTINGS</Text>
        </VStack>
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">RESOURCES</Text>

        </VStack>
      </VStack>
    </ScrollView>
  );
};

const DashboardLayout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible
  );
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden items-center">
        <MobileHeader title={props.title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {isSidebarVisible && <Sidebar />}
          </Box>
          <VStack className="w-full flex-1">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <HStack >

          <HStack
            className="py-6 px-4 bg-background-0 items-center"
            space="md"
          >
        <Pressable
        onPress={() => 
          router.push("/dashboard/dashboard-layout")}
         >
          <Text className="text-xl w-full font-medium">BabyLeaps</Text>
          </Pressable>
      </HStack>
    
    </HStack>
  );
}

const data = {"settings": {"first_name": "Gabriela", "last_name": "rojas", "dob": "05/27/2024", "dd": "06/06/2024"  }}

const MainContent = () => {
  return (
    <Box className="flex-1">
      <ScrollView
        style={styles.main_color}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 100,
            flexGrow: 1,
          }}
          className="flex-1 mb-20 md:mb-2 h-full"
        >
       <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full h-full" >
          <Grid _extra={{className: "gap-5 py-5 my-5 "}}>
            <VStack className="items-center w-full py-3">
              <Heading
                size="lg"
                className="font-roboto text-typography-700 "
              >
                Select Your Plan
              </Heading>
              <Text>
                Choose the perfect plan to start the journey
              </Text>
            </VStack>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
          
              <VStack
                style={{backgroundColor: "white"}}
                className="rounded-lg px-4 py-6 my-3 "
                space="sm"
              >
                <Box className="p-3">
                  <Box className="self-start">
                    <HStack className="flex justify-between w-full">
                      <Heading
                        size="lg"
                        className="font-roboto text-typography-700"
                      >
                        Lifetime
                      </Heading>

                      <Heading
                        size="lg"
                        className="font-roboto text-typography-700"
                      >
                        $19.99
                      </Heading>
                    </HStack>
                    <Text>
                      This is a brief description
                    </Text>
                    <VStack className="my-4">
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>


                    </VStack>
                    <Button action="primary" variant="solid"
                        onPress={() => {
                          router.push("/auth/create-password");
                        }}>
                        {/* <Icon as={BellIcon} size="lg" className="mx-1" /> */}
                      <ButtonText >Select Plan</ButtonText>
                    </Button>
                  </Box>
                </Box>
                
              </VStack>
            </GridItem>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >
          
              <VStack
                style={{backgroundColor: "white"}}
                className="rounded-lg px-4 py-6 my-3 "
                space="sm"
              >
                <Box className="p-3">
                  <Box className="self-start">
                    <HStack className="flex justify-between w-full">
                      <Heading
                        size="lg"
                        className="font-roboto text-typography-700"
                      >
                        Monthly
                      </Heading>

                      <Heading
                        size="lg"
                        className="font-roboto text-typography-700"
                      >
                        $4.99
                      </Heading>
                    </HStack>
                    <Text>
                      This is a brief description
                    </Text>
                    <VStack className="my-4">
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>
                      <HStack>
                        <Icon as={CheckIcon} size="md" />
                        <Text className="pb-1 pl-2">
                          This is a brief description
                        </Text>
                      </HStack>


                    </VStack>
                    <Button action="primary" variant="solid"
                        onPress={() => {
                          router.push("/auth/create-password");
                        }}>
                        {/* <Icon as={BellIcon} size="lg" className="mx-1" /> */}
                      <ButtonText >Select Plan</ButtonText>
                    </Button>
                  </Box>
                </Box>
                
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export const ChoosePlan = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Company Name" isSidebarVisible={true}>
        <MainContent />
      </DashboardLayout>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },

  active: {
    display: 'block',
    width: 400,
    height: 500,
  },
  main_color: {
    backgroundColor: "#f0f5f3",
    height: "100%",
  },

  tips_and_skills_container: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 10,
  },

  bubble: {
    backgroundColor: "white",
  }
});