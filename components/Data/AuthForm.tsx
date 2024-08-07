import GoogleIcon from "@/assets/staticSvgComponents/google";
import Button from "@/components/Ui/Button";
import CommonTextInput from "@/components/Ui/CommonTextInput";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthFormProps } from "@/interfaces/types";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuth } from "@/app/context/AuthContext";
import { auth } from "@/firebaseConfig";
interface AuthFormPageProps {
  type: string;
  onSubmit: (val: AuthFormProps) => Promise<void>;
  otherwiseRoute: string;
  otherwiseText: string;
  otherwiseLabel: string;
}
WebBrowser.maybeCompleteAuthSession();
const AuthForm = ({
  type,
  onSubmit,
  otherwiseText,
  otherwiseRoute,
  otherwiseLabel,
}: AuthFormPageProps) => {
  const authContext = useAuth();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "280143445792-37ggldk4l9753012vk5i8nnbrslq8njb.apps.googleusercontent.com",
    androidClientId:
      "280143445792-pki3n63938mu721pk89jlvijr8e26dla.apps.googleusercontent.com",
  });
  useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormProps>();
  const handleSignInWithGoogle = () => {
    promptAsync();
  };
  const router = useRouter();
  return (
    <>
      <View className="flex flex-col gap-5 mt-10">
        <View className="flex gap-1">
          <Controller
            control={control}
            name="email"
            defaultValue=""
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Must be a valid email",
              },
              required: { value: true, message: "Email is required" },
            }}
            render={({ field }) => (
              <CommonTextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Enter your email"
                variant={errors?.email ? "error" : "default"}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors?.email?.message && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>
        <View className="flex gap-1">
          <Controller
            control={control}
            name="password"
            defaultValue=""
            rules={{
              minLength: {
                value: 8,
                message: "Minimum 8 charecters required",
              },
              required: { value: true, message: "Passowrd is required" },
            }}
            render={({ field }) => (
              <CommonTextInput
                textContentType="password"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                placeholder="Enter your Password"
                variant={errors?.password ? "error" : "default"}
              />
            )}
          />
          {errors?.password?.message && (
            <Text className="text-red-500">{errors.password.message}</Text>
          )}
        </View>
      </View>
      <View className="w-fit mt-10 flex items-center">
        <Button onPress={handleSubmit(onSubmit)} variant={"default"} title={""}>
          <Text className="text-primary-500 font-semibold  text-lg">
            {type}
          </Text>
        </Button>
      </View>
      <Text className="text-center mt-10 text-lg">
        {otherwiseText}&nbsp;
        <Link href={otherwiseRoute} className="text-primary-500">
          {otherwiseLabel}!
        </Link>
      </Text>
      <View className="flex flex-row overflow-hidden gap-2 mt-10 items-center">
        <View className="border-t flex-1 border-gray-400" />
        <Text className="text-lg ">Or</Text>
        <View className="border-t flex-1  border-gray-400" />
      </View>
      <TouchableOpacity className="mt-10 flex flex-row items-center mx-auto w-fit border border-gray-400 rounded-md px-3 py-2">
        <GoogleIcon />
        <Text
          className="text-lg font-semibold"
          onPress={handleSignInWithGoogle}
        >
          &nbsp;Sign in with google
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AuthForm;
