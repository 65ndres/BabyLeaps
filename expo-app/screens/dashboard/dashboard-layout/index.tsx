import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { UnlockIcon, Icon, MenuIcon, BellIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import type { LucideIcon } from "lucide-react-native";
import { InboxIcon } from "./assets/icons/inbox";
import { GlobeIcon } from "./assets/icons/globe";
import { Button, ButtonText } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Heading } from "@/components/ui/heading";
import { ScrollView } from "@/components/ui/scroll-view";
import { Divider } from "@/components/ui/divider";
import { Grid, GridItem } from "@/components/ui/grid";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress"
import Image from "@unitools/image";
import { Center } from "@/components/ui/center"
import { StyleSheet} from 'react-native';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import useRouter from "@unitools/router";
import { HomeIcon } from "./assets/icons/home";
import { HeartIcon } from "./assets/icons/heart";
import { ProfileIcon } from "./assets/icons/profile";
import { CalendarIcon } from "./assets/icons/calendar";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Platform } from "react-native";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge"
import { blue } from "react-native-reanimated/lib/typescript/Colors";
import { colorScheme } from "nativewind";

type MobileHeaderProps = {
  title: string;
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

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

type Icons = {
  iconName: LucideIcon | typeof Icon;
};
const list: Icons[] = [
  {
    iconName: HomeIcon,
  },
  {
    iconName: InboxIcon,
  },
  {
    iconName: GlobeIcon,
  },
  {
    iconName: HeartIcon,
  },
];
type BottomTabs = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
};
const bottomTabsList: BottomTabs[] = [
  {
    iconName: HomeIcon,
    iconText: "Home",
  },

  {
    iconName: GlobeIcon,
    iconText: "Community",
  },
  {
    iconName: InboxIcon,
    iconText: "Inbox",
  },
  {
    iconName: HeartIcon,
    iconText: "Favourite",
  },
  {
    iconName: ProfileIcon,
    iconText: "Profile",
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handlePress = (index: number) => {
    setSelectedIndex(index);
    // router.push("/dashboard/dashboard-layout");
  };

  return (
    <VStack
      className="w-14 pt-5 h-full items-center border-r border-border-300"
      space="xl"
    >
      {list.map((item, index) => {
        return (
          <Pressable
            key={index}
            className="hover:bg-background-50"
            onPress={() => handlePress(index)}
          >
            <Icon
              as={item.iconName}
              className={`w-[55px] h-9 stroke-background-800 
              ${index === selectedIndex ? "fill-background-800" : "fill-none"}

              `}
            />
          </Pressable>
        );
      })}
    </VStack>
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
      <Box className="md:hidden w-full items-center">
        <MobileHeader title={props.title} />
      </Box>
      <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {isSidebarVisible && <Sidebar />}
          </Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

function MobileFooter({ footerIcons }: { footerIcons: any }) {
  const router = useRouter();
  return (
    <HStack
      className={cn(
        "bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t",
        { "pb-5": Platform.OS === "ios" },
        { "pb-5": Platform.OS === "android" }
      )}
    >
      {footerIcons.map(
        (
          item: { iconText: string; iconName: any },
          index: React.Key | null | undefined
        ) => {
          return (
            <Pressable
              className="px-0.5 flex-1 flex-col items-center"
              key={index}
              onPress={() => router.push("/dashboard/dashboard-layout")}
            >
              <Icon
                as={item.iconName}
                size="md"
                className="h-[32px] w-[65px]"
              />
              <Text className="text-xs text-center text-typography-600">
                {item.iconText}
              </Text>
            </Pressable>
          );
        }
      )}
    </HStack>
  );
}

function WebHeader(props: HeaderProps) {
  return (
    <HStack className="pt-4  pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
      <HStack className="items-center">
        <Pressable
          onPress={() => {
            props.toggleSidebar();
          }}
        >
          <Icon as={MenuIcon} size="lg" className="mx-5" />
        </Pressable>
        <Text className="text-2xl">{props.title}</Text>
      </HStack>

      <Avatar className="h-9 w-9">
        <AvatarFallbackText className="font-light">A</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <VStack className="w-full items-center">

          <VStack
            className="py-6 px-4 w-full bg-background-0"
            space="md"
          >
          <Text className="text-xl w-full text-center font-medium">BabyLeaps</Text>
      </VStack>
    
    </VStack>
  );
}

const MainContent = () => {
  const router = useRouter();
  return (
    <Box className="flex-1 " >
      <ScrollView
        style={styles.main_color}
        className="flex-1 mb-20 md:mb-2 main_color"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}>
        <VStack className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
          <Grid _extra={{className: "gap-5"}}>
            <GridItem _extra={{className: "col-span-12 sm:col-span-6 lg:col-span-4"}}>
              <Pressable onPress={() => {router.push("profile/profile")}}>
                <VStack className="rounded-lg p-4 " style={{backgroundColor: "white"}} space="md">
                  <HStack space="md" className="items-center justify-between">         
                    <HStack className="items-center">
                      <Avatar size="xl">
                        <AvatarImage
                          source={require("@/assets/profile-screens/profile/avatar.jpg")}
                        />
                      </Avatar>
                      <VStack className="ml-5">
                        <Text className="font-bold" size="xl">
                          Gabriela's Leaps
                        </Text>
                        <Text >
                          5 weeks old
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                  <VStack>

                  <VStack>
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Current Leap: 2 of 20
                      </Text>
                      <Text className="font-medium">
                        75% complete
                      </Text>
                    </HStack>
                    <Center className="w-[330px] h-[30px]">
                      <Progress value={40} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>

                  </VStack>
                  </VStack>
                </VStack>
              </Pressable> 
            </GridItem>
          </Grid>
          <Grid _extra={{className: "gap-5 py-5 my-5"}}>
            <GridItem
              _extra={{
                className: "col-span-12 sm:col-span-6 lg:col-span-4",
              }}
            >

            <Pressable
              onPress={() => {
                router.push("/leaps/leaps");
              }}>            
              <VStack
                style={{backgroundColor: "white"}}
                className="rounded-lg px-4 py-6"
                space="sm"
              >
                <Box className="self-start">
                  <Heading
                    size="lg"
                    className="font-roboto text-typography-700"
                  >
                    Leap 2: Relationships
                  </Heading>
                </Box>

                <VStack >
                  <Text className="my-2">
                    atque corrupti quos dolores  occaecati cupiditate non dignissimos ducimus qui blanditiis praesentium voluptatum
                  </Text>
                </VStack>



                {/* Do not remove !!!!!!, yet lol */}
                {/* <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                  <Button variant="outline" action="secondary">
                    <Icon as={BellIcon} size="lg" className="mx-1" />
                    <ButtonText>Signals</ButtonText>
                  </Button>
                  <Button className="items-center ml-1"  variant="outline" action="secondary">
                  <Icon as={UnlockIcon} size="lg" className="mx-1" />
                    <ButtonText>Skills</ButtonText>
                  </Button>
                </HStack> */}
                
              <HStack className="my-2">
                <Badge className="mr-3" size="md" variant="solid" action="muted">
                  <BadgeText>Duration: 7 days</BadgeText>
                  <BadgeIcon as={GlobeIcon} className="ml-2" />
                </Badge>
                <Badge className="mr-3" size="md" variant="solid" action="muted">
                  <BadgeText>Started: Jan 15</BadgeText>
                  <BadgeIcon as={GlobeIcon} className="ml-2" />
                </Badge>
                </HStack>
                <Button action="primary" variant="solid">
                    {/* <Icon as={BellIcon} size="lg" className="mx-1" /> */}
                    <ButtonText >Signals</ButtonText>
                  </Button>

              </VStack>


              </Pressable>
            </GridItem>
          </Grid>
          <Grid _extra={{className: "gap-5"}}>
            <GridItem style={{paddingRight: 10, paddingBottom: 20}} _extra={{className: "col-span-6 sm:col-span-3 lg:col-span-2 ml-5"}}>
              <Pressable onPress={() => {router.push("profile/profile")}}>
                  <VStack className="rounded-lg p-4 w-full" style={{backgroundColor: "white"}} space="md">
                  <Box className={"w-full h-[140px] justify-center items-center"}>
                  <Heading
                    size="lg"
                    className="font-roboto text-typography-700 mb-2"
                  >
                    Calendar
                  </Heading>
                    <Image
                      source={require("@/assets/profile-screens/profile/calendar.png")}
                      height={"40%"}
                      width={"40%"}
                      alt="Banner Image"
                    />
                  </Box>
                  </VStack>
              </Pressable> 
            </GridItem>
            <GridItem style={{paddingLeft: 10}} _extra={{className: "col-span-6 sm:col-span-3 lg:col-span-2 ml-5"}}>
              <Pressable onPress={() => {router.push("profile/profile")}}>
                  <VStack className="rounded-lg p-4 w-full" style={{backgroundColor: "white"}} space="md">
                  <Box className={"w-full h-[140px] justify-center items-center"}>
                  <Heading
                    size="lg"
                    className="font-roboto text-typography-700 mb-2"
                  >
                    Settings
                  </Heading>
                    <Image
                      source={require("@/assets/profile-screens/profile/settings.jpg")}
                      height={"45%"}
                      width={"45%"}
                      alt="Banner Image"
                    />
                  </Box>
                  </VStack>
              </Pressable> 
            </GridItem>
          </Grid>
        </VStack>

      </ScrollView>
    </Box>
  );
};

{/* <VStack className="rounded-lg p-4 " style={{backgroundColor: "white"}} space="md"></VStack> */}

export const Dashboard = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Dashboard" isSidebarVisible={true}>
        <MainContent />
      </DashboardLayout>
      <MobileFooter footerIcons={bottomTabsList} />
    </SafeAreaView>
  );
};
