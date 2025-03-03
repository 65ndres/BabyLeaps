import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Grid, GridItem } from "@/components/ui/grid";
import { StyleSheet} from 'react-native';
import { Progress, ProgressFilledTrack } from "@/components/ui/progress"
import { UnlockIcon, BellIcon} from "@/components/ui/icon";
import {
  ChevronDownIcon,
  Icon,
  MenuIcon,
  SettingsIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AlertCircle, type LucideIcon } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import Image from "@unitools/image";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { Input, InputField } from "@/components/ui/input";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import useRouter from "@unitools/router";
import { ProfileIcon } from "./assets/icons/profile";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Center } from "@/components/ui/center";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import {Platform } from "react-native";
import { SubscriptionIcon } from "./assets/icons/subscription";
import { DownloadIcon } from "./assets/icons/download";
import { FaqIcon } from "./assets/icons/faq";
import { NewsBlogIcon } from "./assets/icons/news-blog";
import { HomeIcon } from "./assets/icons/home";
import { GlobeIcon } from "./assets/icons/globe";
import { InboxIcon } from "./assets/icons/inbox";
import { HeartIcon } from "./assets/icons/heart";
import { Badge, BadgeIcon, BadgeText } from "@/components/ui/badge";
import { z } from "zod";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";


type MobileHeaderProps = {
  title: string;
};

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

type Icons = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
};
const SettingsList: Icons[] = [
  {
    iconName: ProfileIcon,
    iconText: "Profile",
  },
  {
    iconName: SettingsIcon,
    iconText: "Preferences",
  },
  {
    iconName: SubscriptionIcon,
    iconText: "Subscription",
  },
];
const ResourcesList: Icons[] = [
  {
    iconName: DownloadIcon,
    iconText: "Downloads",
  },
  {
    iconName: FaqIcon,
    iconText: "FAQs",
  },
  {
    iconName: NewsBlogIcon,
    iconText: "News & Blogs",
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
          {SettingsList.map((item, index) => {
            return (
              <Pressable
                onPress={() => handlePress(index)}
                key={index}
                className={`flex-row px-4 py-3 items-center gap-2 rounded
              ${
                index === selectedIndex
                  ? "bg-background-950 "
                  : "bg-background-0"
              }
              `}
              >
                <Icon
                  as={item.iconName}
                  className={`
              ${
                index === selectedIndex
                  ? "stroke-background-0 fill-background-800"
                  : "stroke-background-800 fill-none"
              }
              `}
                />
                <Text
                  className={`
              ${
                index === selectedIndex
                  ? "text-typography-0"
                  : "text-typography-700"
              }

              `}
                >
                  {item.iconText}
                </Text>
              </Pressable>
            );
          })}
        </VStack>
        <VStack className="w-full px-2 pt-3 pb-4" space="xs">
          <Text className="text-typography-600 px-4 py-2">RESOURCES</Text>
          {ResourcesList.map((item, index) => {
            return (
              <Pressable
                onPress={() => handlePressResources(index)}
                key={index}
                className={`flex-row px-4 py-3 items-center gap-2 rounded
              ${
                index === selectedIndexResources
                  ? "bg-background-950 "
                  : "bg-background-0"
              }
              `}
              >
                <Icon
                  as={item.iconName}
                  className={`
              ${
                index === selectedIndexResources
                  ? "stroke-background-0"
                  : "stroke-background-800"
              }
              
              h-10 w-10
              `}
                />
                <Text
                  className={`
              ${
                index === selectedIndexResources
                  ? "text-typography-0"
                  : "text-typography-700"
              }

              `}
                >
                  {item.iconText}
                </Text>
              </Pressable>
            );
          })}
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
    <VStack className="h-full bg-background-0 ">
      <Box className="md:hidden items-center">
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
          <VStack className="w-full flex-1">{props.children}</VStack>
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
              onPress={() => router.push("/news-feed/news-and-feed")}
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
    <HStack className="pt-4 pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
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
    <HStack >

          <HStack
            className="py-6 px-4 bg-background-0 items-center"
            space="md"
          >
        <Pressable
        onPress={() => 
          router.push("/dashboard/dashboard-layout")}
         >
          <Text className="text-xl w-full  font-medium">BabyLeaps</Text>
          </Pressable>
      </HStack>
    
    </HStack>
  );
}

const MainContent = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [leapStatus, setLeapStatus] = useState({
    currentLeap: "isFirstLeapActive",
    isFirstLeapActive: true,
    isSecondLeapActive: false,
    isThirdLeapActive: false,
    isFourthLeapActive: false,
    isFithLeapActive: false,
    isSixthLeapActive: false,
    isSeventhLeapActive: false,
    isEigthLeapActive: false,
    isNinthLeapActive: false,
  })


  const handleValueChange = (itemValue: string, itemIndex: number) => {
    setSelectedLanguage(itemValue);

    // get current state as a hash
    // get find current key and change the value 
    // find new key and change the value
    // update currentLeap
    // Trigger status change
    var status = leapStatus
    var prev   = status["currentLeap"]
    status[prev] = false
    status[itemValue] = true
    status["currentLeap"] = itemValue
    setLeapStatus(status)
  };
  

  return (
    <VStack style={styles.main_color} className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
      <ScrollView>
        <VStack style={{backgroundColor: "white", height: "auto"}} className="mt-5 rounded-lg px-4 h-full" space="lg">
          <Grid _extra={{className: "col-span-12"}}>
            <GridItem
              _extra={{className: "col-span-12 sm:col-span-6 lg:col-span-4"}}>
              <VStack className="rounded-lg px-4" space="sm">
                <Box className="self-start w-full py-5">
                  <Heading size="lg" className="font-roboto w-full text-typography-700">
                    <HStack className="justify-between w-full">
                      <HStack>
                        <Box className="self-start">
                          <Heading size="lg" className="font-roboto pt-3">
                            Current Leap
                          </Heading>
                        </Box>
                      </HStack>
                      <HStack className="items-center pb-0">
                        <Select style={{borderColor: "white"}} className="p-0 col-6 items-center" selectedValue="Leap 1" onValueChange={(value, ii) => handleValueChange(value, ii)}>
                        <SelectTrigger style={{backgroundColor: "white", borderBlockColor: "white", borderEndColor: "white", borderStartColor:"white"}} size="xl">
                          <SelectInput  style={{borderColor: "white"}} className="text-center items-center" placeholder="Select option" />
                          <SelectIcon className="mr-3 text-typography-black"  as={ChevronDownIcon} />
                        </SelectTrigger>
                        <SelectPortal style={{borderColor: "white"}}>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Leap 1" value="isFirstLeapActive" />
                            <SelectItem label="Leap 2" value="isSecondLeapActive" />
                            <SelectItem label="Leap 3" value="isThirdLeapActive" />
                            <SelectItem label="Leap 4" value="isFourthLeapActive" />
                            <SelectItem label="Leap 5" value="isFithLeapActive" />
                          </SelectContent>
                        </SelectPortal>
                        </Select>
                      </HStack>
                    </HStack>
                  </Heading>
                </Box>
                <VStack style={[leapStatus.isFirstLeapActive ? styles.active : styles.hidden]}>
                  <Box style={styles.primary_muted} className=" p-4 rounded-md w-full primary_muted">
                    <HStack>
                      <HStack style={{width: "15%"}}  className="items-center">
                        <Image
                          source={require("@/assets/profile-screens/profile/contrast.png")}
                          height={40}
                          width={40}
                          alt="Banner Image"/> 
                      </HStack>
                      <VStack style={{width: "85%"}}>
                        <Text style={{fontSize: "15", fontWeight: 600}} className="col-span-1 ml-5">
                          Leap 1: Sensations
                        </Text>
                        <Text style={{fontSize: "11", lineHeight:"smaller"}} className="col-span-1 ml-5">
                          Duration: 3 to 7 Days
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack className="my-5">
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Day 2 of 20
                      </Text>
                      <Text className="font-medium">
                        75% complete
                      </Text>
                    </HStack>
                    <Center className="w-[280px] h-[30px]">
                      <Progress value={40} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>
                  </VStack>
                  <VStack >
                    <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                      <Button variant="solid" action="primary" style={{width: "50%"}}>
                        <Icon as={BellIcon} size="lg" className="mx-1" />
                        <ButtonText>Signals</ButtonText>
                      </Button>
                      <Button className="items-center ml-1"  variant="solid" action="primary" style={{width: "50%"}}>
                      <Icon as={UnlockIcon} size="lg" className="mx-1" />
                        <ButtonText>Skills</ButtonText>
                      </Button>
                    </HStack>

                    <Text className="mb-10 mt-5" style={{backgroundColor:"white"}}>
                      Then it suddenly happens... the first leap of sensations. A leap when a baby's metabolism, internal organs
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                    </Text>
                    <VStack>
                    </VStack>
                  </VStack>
                </VStack>
                <VStack style={[leapStatus.isSecondLeapActive ? styles.active : styles.hidden]}>
                  <Box style={styles.primary_muted} className=" p-4 rounded-md w-full primary_muted">
                    <HStack>
                      <HStack style={{width: "15%"}}  className="items-center">
                        <Image
                          source={require("@/assets/profile-screens/profile/pattern-lock.png")}
                          height={40}
                          width={40}
                          alt="Banner Image"/> 
                      </HStack>
                      <VStack style={{width: "85%"}}>
                        <Text style={{fontSize: "15", fontWeight: 600}} className="col-span-1 ml-5">
                          Leap 2: Patterns
                        </Text>
                        <Text style={{fontSize: "11", lineHeight:"smaller"}} className="col-span-1 ml-5">
                          Duration: 0 to 7 Days
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack className="pt-4">
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Day 0 of 20
                      </Text>
                      <Text className="font-medium">
                        0% complete
                      </Text>
                    </HStack>
                    <Center className="w-[280px] h-[30px]">
                      <Progress value={0} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>
                  </VStack>
                  <VStack >
                    <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                      <Button variant="solid" action="primary" style={{width: "50%"}}>
                        <Icon as={BellIcon} size="lg" className="mx-1" />
                        <ButtonText>Signals</ButtonText>
                      </Button>
                      <Button className="items-center ml-1"  variant="solid" action="primary" style={{width: "50%"}}>
                      <Icon as={UnlockIcon} size="lg" className="mx-1" />
                        <ButtonText>Skills</ButtonText>
                      </Button>
                    </HStack>

                    <Text className="mb-10 mt-5" style={{backgroundColor:"white"}}>
                      Then it suddenly happens... the first leap of sensations. A leap when a baby's metabolism, internal organs
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                    </Text>
                    <VStack>
                    </VStack>
                  </VStack>
                </VStack>
                <VStack style={[leapStatus.isThirdLeapActive ? styles.active : styles.hidden]}>
                  <Box style={styles.primary_muted} className=" p-4 rounded-md w-full primary_muted">
                    <HStack>
                      <HStack style={{width: "15%"}}  className="items-center">
                        <Image
                          source={require("@/assets/profile-screens/profile/transition.png")}
                          height={40}
                          width={40}
                          alt="Banner Image"/> 
                      </HStack>
                      <VStack style={{width: "85%"}}>
                        <Text style={{fontSize: "15", fontWeight: 600}} className="col-span-1 ml-5">
                          Leap 3: Smooth Transitions
                        </Text>
                        <Text style={{fontSize: "11", lineHeight:"smaller"}} className="col-span-1 ml-5">
                          Duration: 0 to 7 Days
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack className="pt-4">
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Day 0 of 20
                      </Text>
                      <Text className="font-medium">
                        0% complete
                      </Text>
                    </HStack>
                    <Center className="w-[280px] h-[30px]">
                      <Progress value={0} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>
                  </VStack>
                  <VStack >
                    <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                      <Button variant="solid" action="primary" style={{width: "50%"}}>
                        <Icon as={BellIcon} size="lg" className="mx-1" />
                        <ButtonText>Signals</ButtonText>
                      </Button>
                      <Button className="items-center ml-1"  variant="solid" action="primary" style={{width: "50%"}}>
                      <Icon as={UnlockIcon} size="lg" className="mx-1" />
                        <ButtonText>Skills</ButtonText>
                      </Button>
                    </HStack>

                    <Text className="mb-10 mt-5" style={{backgroundColor:"white"}}>
                      Then it suddenly happens... the first leap of sensations. A leap when a baby's metabolism, internal organs
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                    </Text>
                    <VStack>
                    </VStack>
                  </VStack>
                </VStack>
                <VStack style={[leapStatus.isFourthLeapActive ? styles.active : styles.hidden]}>
                  <Box style={styles.primary_muted} className=" p-4 rounded-md w-full primary_muted">
                    <HStack>
                      <HStack style={{width: "15%"}}  className="items-center">
                        <Image
                          source={require("@/assets/profile-screens/profile/puzzle.png")}
                          height={40}
                          width={40}
                          alt="Banner Image"/> 
                      </HStack>
                      <VStack style={{width: "85%"}}>
                        <Text style={{fontSize: "15", fontWeight: 600}} className="col-span-1 ml-5">
                          Leap 4: Events
                        </Text>
                        <Text style={{fontSize: "11", lineHeight:"smaller"}} className="col-span-1 ml-5">
                          Duration: 0 to 7 Days
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack className="pt-4">
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Day 0 of 20
                      </Text>
                      <Text className="font-medium">
                        0% complete
                      </Text>
                    </HStack>
                    <Center className="w-[280px] h-[30px]">
                      <Progress value={0} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>
                  </VStack>
                  <VStack >
                    <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                      <Button variant="solid" action="primary" style={{width: "50%"}}>
                        <Icon as={BellIcon} size="lg" className="mx-1" />
                        <ButtonText>Signals</ButtonText>
                      </Button>
                      <Button className="items-center ml-1"  variant="solid" action="primary" style={{width: "50%"}}>
                      <Icon as={UnlockIcon} size="lg" className="mx-1" />
                        <ButtonText>Skills</ButtonText>
                      </Button>
                    </HStack>

                    <Text className="mb-10 mt-5" style={{backgroundColor:"white"}}>
                      Then it suddenly happens... the first leap of sensations. A leap when a baby's metabolism, internal organs
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                    </Text>
                    <VStack>
                    </VStack>
                  </VStack>
                </VStack>
                <VStack style={[leapStatus.isFithLeapActive ? styles.active : styles.hidden]}>
                  <Box style={styles.primary_muted} className=" p-4 rounded-md w-full primary_muted">
                    <HStack>
                      <HStack style={{width: "15%"}}  className="items-center">
                        <Image
                          source={require("@/assets/profile-screens/profile/interaction1.png")}
                          height={40}
                          width={40}
                          alt="Banner Image"/> 
                      </HStack>
                      <VStack style={{width: "85%"}}>
                        <Text style={{fontSize: "15", fontWeight: 600}} className="col-span-1 ml-5">
                          Leap 5: Relationships
                        </Text>
                        <Text style={{fontSize: "11", lineHeight:"smaller"}} className="col-span-1 ml-5">
                          Duration: 0 to 7 Days
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <VStack className="pt-4">
                    <HStack className="items-center justify-between">
                      <Text className="font-medium">
                        Day 0 of 20
                      </Text>
                      <Text className="font-medium">
                        0% complete
                      </Text>
                    </HStack>
                    <Center className="w-[280px] h-[30px]">
                      <Progress value={0} size="sm" orientation="horizontal">
                        <ProgressFilledTrack />
                      </Progress>
                    </Center>
                  </VStack>
                  <VStack >
                    <HStack style={styles.tips_and_skills_container} className="w-full justify-content-center" >
                      <Button variant="solid" action="primary" style={{width: "50%"}}>
                        <Icon as={BellIcon} size="lg" className="mx-1" />
                        <ButtonText>Signals</ButtonText>
                      </Button>
                      <Button className="items-center ml-1"  variant="solid" action="primary" style={{width: "50%"}}>
                      <Icon as={UnlockIcon} size="lg" className="mx-1" />
                        <ButtonText>Skills</ButtonText>
                      </Button>
                    </HStack>

                    <Text className="mb-10 mt-5" style={{backgroundColor:"white"}}>
                      Then it suddenly happens... the first leap of sensations. A leap when a baby's metabolism, internal organs
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                      ,and senses mature rapidly. It's a mejor event for "Nombre"! "Pronoun" has just got used to the world outside
                      your belly and everything changes again.
                    </Text>
                    <VStack>
                    </VStack>
                  </VStack>
                </VStack>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </ScrollView>
    </VStack>
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
    display: 'flex'
  },

  main_color: {
    backgroundColor: "#f0f5f3",
    height: "100%",
  },

  hidden: {
    display: 'none',
  },
  tips_and_skills_container: {
    display: 'flex',
    justifyContent: 'center',
    marginVertical: 10,
  },
  primary_muted: {
    backgroundColor: "#c9e7e8",
  },
  selector: {
  }
});

export const Leaps = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Company Name" isSidebarVisible={true}>
        <MainContent />
      </DashboardLayout>
      <MobileFooter footerIcons={bottomTabsList} />
    </SafeAreaView>
  );
};
