import React, { useState } from "react";
import { Grid, GridItem } from "@/components/ui/grid";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { StyleSheet} from 'react-native';
import DateTimePicker, { DateType, getDefaultStyles } from 'react-native-ui-datepicker';
import {DatePicker} from "react-native-common-date-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  AlertCircleIcon,
  EditIcon,
  Icon,
  MenuIcon,
  CalendarDaysIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
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
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Platform } from "react-native";
import { SubscriptionIcon } from "./assets/icons/subscription";
import { DownloadIcon } from "./assets/icons/download";
import { FaqIcon } from "./assets/icons/faq";
import { NewsBlogIcon } from "./assets/icons/news-blog";
import { HomeIcon } from "./assets/icons/home";
import { GlobeIcon } from "./assets/icons/globe";
import { InboxIcon } from "./assets/icons/inbox";
import { HeartIcon } from "./assets/icons/heart";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"

import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";

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
    <VStack className="h-full w-full bg-background-0">
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
          <Text className="text-xl w-full font-medium">BabyLeaps</Text>
          </Pressable>
      </HStack>
    
    </HStack>
  );
}

const data = {"settings": {"first_name": "Gabriela", "last_name": "rojas", "dob": "05/27/2024", "dd": "06/06/2024"  }}

const MainContent = () => {

  const [showModal, setShowModal] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    // set update the state input and whats seen

    hideDatePicker();
  };

  const [isInvalid, setIsInvalid] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("12345")

  const handleSubmit = () => {
    if (inputValue.length < 6) {
      setIsInvalid(true)
    } else {
      setIsInvalid(false)
    }
  }

  return (
    <Box className="flex-1 ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: isWeb ? 0 : 100,
          flexGrow: 1,
        }}
        className="flex-1 mb-20 md:mb-2"
      >
        <VStack style={styles.main_color} className="p-4 pb-0 md:px-10 md:pt-6  w-full" space="2xl">
          <Grid _extra={{className: "gap-5"}}>
            <GridItem _extra={{className: "col-span-12 sm:col-span-6 lg:col-span-4"}}>
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
                          Gabriela Rojas
                        </Text>
                        <Text >
                          5 weeks old
                        </Text>
                      </VStack>
                    </HStack>
                  </HStack>
                  <VStack className="w-full p-4">

                    <FormControl
                      isInvalid={isInvalid}
                      size="md"
                      isDisabled={false}
                      isReadOnly={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>First Name</FormControlLabelText>
                      </FormControlLabel>
                      <Input className="mb-5" >
                        <InputField
                          type="text"
                          placeholder="first Name"
                          value={inputValue}
                          onChangeText={(text) => setInputValue(text)}
                        />
                      </Input>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={isInvalid}
                      size="md"
                      isDisabled={false}
                      isReadOnly={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Last Name</FormControlLabelText>
                      </FormControlLabel>
                      <Input className="my-1" >
                        <InputField
                          type="text"
                          placeholder="first Name"
                          value={inputValue}
                          onChangeText={(text) => setInputValue(text)}
                        />
                      </Input>
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={isInvalid}
                      size="md"
                      isDisabled={false}
                      isReadOnly={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Birth Date</FormControlLabelText>
                      </FormControlLabel>

                      

                      <HStack>
                        <Input style={{width: "76%"}} className="mr-3">
                          <InputField
                            type="text"
                            placeholder="first Name"
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                          />
                        </Input>

                        <Button variant="outline" action="primary" style={{width: "20%"}} onPress={showDatePicker}>
                          <Icon as={CalendarDaysIcon} size="lg" className="mx-1" />
                        </Button>

                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}/>
                      </HStack>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>
                    <FormControl
                      isInvalid={isInvalid}
                      size="md"
                      isDisabled={false}
                      isReadOnly={false}
                      isRequired={false}
                    >
                      <FormControlLabel>
                        <FormControlLabelText>Birth Date</FormControlLabelText>
                      </FormControlLabel>

                      

                      <HStack>
                        <Input style={{width: "76%"}}  isReadOnly={true} className="mr-3">
                          <InputField
                            type="text"
                            value={inputValue}
                            onChangeText={(text) => setInputValue(text)}
                          />
                        </Input>

                        <Button variant="outline" action="primary" style={{width: "20%"}} onPress={showDatePicker}>
                          <Icon as={CalendarDaysIcon} size="lg" className="mx-1" />
                        </Button>
                        
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}/>
                      </HStack>

                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>
                          Atleast 6 characters are required.
                        </FormControlErrorText>
                      </FormControlError>
                    </FormControl>




                    <Button className="w-full mt-10" size="md" onPress={handleSubmit}>
                      <ButtonText>Submit</ButtonText>
                    </Button>
                  </VStack>
                </VStack>
            </GridItem>
          </Grid>

        </VStack>
      </ScrollView>
    </Box>
  );
};

export const Profile = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Company Name" isSidebarVisible={true}>
        <MainContent />
      </DashboardLayout>
      <MobileFooter footerIcons={bottomTabsList} />
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