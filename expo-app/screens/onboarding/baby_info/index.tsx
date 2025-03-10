import React, { useState } from "react";
import { Grid, GridItem } from "@/components/ui/grid";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { router } from "expo-router";
import { postData } from '@/services/api';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import {
  AlertCircleIcon,
  Icon,
  CalendarDaysIcon,
} from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Button, ButtonText } from "@/components/ui/button";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField } from "@/components/ui/input";
import useRouter from "@unitools/router";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlErrorIcon,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";

type MobileHeaderProps = {
  title: string;
};

type Gender = 1 | 2 | 3;

const DashboardLayout = (props: any) => {
  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden items-center">
        <MobileHeader title={props.title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full"></Box>
          <VStack className="w-full flex-1">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <HStack>
      <HStack className="py-6 px-4 bg-background-0 items-center" space="md">
        <Pressable onPress={() => router.push("/dashboard/dashboard-layout")}>
          <Text className="text-xl w-full font-medium">BabyLeaps</Text>
        </Pressable>
      </HStack>
    </HStack>
  );
}

const data = {
  settings: {
    first_name: "Gabriela",
    last_name: "rojas",
    dob: "05/27/2024",
    dd: "06/06/2024",
  },
};

const MainContent = () => {
  const [firstName, setFirstName] = useState("Gabriela");
  const [dob, setDob] = useState<string | undefined>();
  const [selectedGender, setSelectedGender] = useState("")
  const [dueDate, setDueDate] = useState<string | undefined>();
  const [isDueDateDatePickerVisible, setDueDateDatePickerVisibility] =
    useState(false);
  const [isDobDatePickerVisible, setDobDatePickerVisibility] = useState(false);

  const showDueDateDatePicker = () => {
    setDueDateDatePickerVisibility(true);
  };

  const hideDueDateDatePicker = () => {
    setDueDateDatePickerVisibility(false);
  };

  const showDobDatePicker = () => {
    setDobDatePickerVisibility(true);
  };

  const hideDobDatePicker = () => {
    setDobDatePickerVisibility(false);
  };

  const handleDobConfirm = (date: Date) => {
    setDob(formatDate(date));
    hideDobDatePicker();
  };

  const handleDueDateConfirm = (date: Date) => {
    setDueDate(formatDate(date));
    hideDueDateDatePicker();
  };

  const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) return "Invalid Date";
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const [isInvalid, setIsInvalid] = useState(false);
  const [inputValue, setInputValue] = useState("12345");

  const handleSubmit = async () => {
    // navigation.navigate('C', dataToPass)
    try {
      const result = await postData('/babies', {name: firstName, dob: dob, due_date: dueDate, gender: selectedGender });
      // setResponse(result);
      // setFormData({ title: '', body: '', userId: 1 }); // Reset form
    } catch (err) {
      // setError(err.message || 'An error occurred');
    } finally {
      // debugger
      // setLoading(false);
      // render the different componenet
      // or redirect to a differen screent
    }

    router.replace("/onboarding/choose_plan/choose_plan?baby=5")

    // router.push("/onboarding/choose_plan/choose_plan", {})
    // router.push({
    //   pathname: '/choose_plan',
    //   params: {
    //     itemId: 42,
    //     otherParam: 'Hello from Home!',
    //   },
    // });
  };





  

  return (
    <Box className="flex-1">
      <ScrollView
        style={styles.main_color}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 0,
          flexGrow: 1,
        }}
        className="flex-1 mb-20 md:mb-2"
      >
        <VStack className="p-4 pb-0 md:px-10 md:pt-6 w-full" space="2xl">
          <Grid _extra={{ className: "gap-5" }}>
            <GridItem _extra={{ className: "col-span-12 sm:col-span-6 lg:col-span-4" }}>
              <VStack className="rounded-lg p-4" style={{ backgroundColor: "white" }} space="md">
                <HStack space="md" className="items-center justify-between">
                  <HStack className="items-center">
                    <Text>WELCOME!</Text>
                  </HStack>
                </HStack>
                <VStack className="w-full p-4">
                  <FormControl size="md">
                    <FormControlLabel>
                      <FormControlLabelText>First Name</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="mb-3">
                      <InputField
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </Input>
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
                      <Input style={{ width: "76%" }} isReadOnly={true} className="mr-3 mb-3">
                        <InputField
                          type="text"
                          placeholder="MM/DD/YYYY"
                          value={dob}
                        />
                      </Input>
                      <Button
                        variant="outline"
                        action="primary"
                        style={{ width: "20%" }}
                        onPress={showDobDatePicker}
                      >
                        <Icon as={CalendarDaysIcon} size="lg" className="mx-1" />
                      </Button>
                      <DateTimePickerModal
                        isVisible={isDobDatePickerVisible}
                        mode="date"
                        onConfirm={handleDobConfirm}
                        onCancel={hideDobDatePicker}
                      />
                    </HStack>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        At least 6 characters are required.
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
                      <FormControlLabelText>Due Date</FormControlLabelText>
                    </FormControlLabel>
                    <HStack>
                      <Input style={{ width: "76%" }} isReadOnly={true} className="mr-3 mb-3">
                        <InputField
                          type="text"
                          value={dueDate}
                          placeholder="MM/DD/YYYY"
                        />
                      </Input>
                      <Button
                        variant="outline"
                        action="primary"
                        style={{ width: "20%" }}
                        onPress={showDueDateDatePicker}
                      >
                        <Icon as={CalendarDaysIcon} size="lg" className="mx-1" />
                      </Button>
                      <DateTimePickerModal
                        isVisible={isDueDateDatePickerVisible}
                        mode="date"
                        onConfirm={handleDueDateConfirm}
                        onCancel={hideDueDateDatePicker}
                      />
                    </HStack>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        At least 6 characters are required.
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
                      <FormControlLabelText>Gender</FormControlLabelText>
                    </FormControlLabel>
                    <HStack>
                    <Select
                        selectedValue={selectedGender}
                        onValueChange={(value: Gender) => setSelectedGender(value)}
                      >
                        <SelectTrigger variant="outline" size="md">
                          <SelectInput placeholder="Female" />
                          <SelectIcon className="mr-3" />
                        </SelectTrigger>
                        <SelectPortal>
                          <SelectBackdrop />
                          <SelectContent>
                            <SelectDragIndicatorWrapper>
                              <SelectDragIndicator />
                            </SelectDragIndicatorWrapper>
                            <SelectItem label="Male" value="male" />
                            <SelectItem label="Female" value="female" />
                          </SelectContent>
                        </SelectPortal>
                      </Select>
                    </HStack>
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>
                        At least 6 characters are required.
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>

                  <Button className="w-full mt-10" size="md" 
                    onPress={handleSubmit}
                    // onPress={() => {
                    //   router.push("/onboarding/choose_plan/choose_plan");
                    // }}
                    >
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

export const BabyInfo = () => {
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
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
  active: {
    display: "block",
    width: 400,
    height: 500,
  },
  main_color: {
    backgroundColor: "#f0f5f3",
    height: "100%",
  },
  tips_and_skills_container: {
    display: "flex",
    justifyContent: "center",
    marginVertical: 10,
  },
  bubble: {
    backgroundColor: "white",
  },
});