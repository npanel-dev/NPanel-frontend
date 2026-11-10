"use client";

import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  resetPassword,
  userLogin,
  userRegister,
} from "@workspace/ui/services/common/auth";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect, useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { USER_EMAIL, USER_PASSWORD } from "@/config";
import { useGlobalStore } from "@/stores/global";
import {
  getInviteCodeFromLocation,
  getRedirectUrl,
  setAuthorization,
} from "@/utils/common";
import type { AuthFormType } from "../types";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import ResetForm from "./reset-form";

type EmailAuthFormProps = {
  formType?: AuthFormType;
  onFormTypeChange?: Dispatch<SetStateAction<AuthFormType>>;
};

function getErrorCode(error: unknown) {
  const response = error as {
    data?: { code?: number };
    response?: { data?: { code?: number } };
  };
  return response.data?.code ?? response.response?.data?.code;
}

function getErrorMessage(error: unknown) {
  const response = error as {
    data?: { message?: string; msg?: string };
    response?: { data?: { message?: string; msg?: string } };
  };
  return (
    response.data?.message ||
    response.data?.msg ||
    response.response?.data?.message ||
    response.response?.data?.msg
  );
}

export default function EmailAuthForm({
  formType: controlledFormType,
  onFormTypeChange,
}: EmailAuthFormProps = {}) {
  const { t } = useTranslation("auth");
  const navigate = useNavigate();
  const { getUserInfo } = useGlobalStore();
  const searchParams = useSearch({ strict: false }) as { invite?: string };
  const [internalFormType, setInternalFormType] =
    useState<AuthFormType>("login");
  const formType = controlledFormType ?? internalFormType;
  const setFormType = onFormTypeChange ?? setInternalFormType;
  const [loading, startTransition] = useTransition();
  const [initialValues, setInitialValues] = useState<{
    email?: string;
    password?: string;
    invite?: string;
  }>({
    email: USER_EMAIL,
    password: USER_PASSWORD,
  });

  useEffect(() => {
    const invite = searchParams.invite || getInviteCodeFromLocation();
    if (invite) {
      localStorage.setItem("invite", invite);
      setInitialValues((prev) => ({ ...prev, invite }));
    }
  }, [searchParams.invite]);

  const handleFormSubmit = (params: any): Promise<boolean> => {
    const onLogin = async (token?: string) => {
      if (!token) return;
      setAuthorization(token);
      await getUserInfo();
      navigate({ to: getRedirectUrl() });
    };
    return new Promise((resolve) => {
      startTransition(async () => {
        try {
          switch (formType) {
            case "login": {
              const login = await userLogin(params);
              toast.success(t("login.success", "Login successful!"));
              onLogin(login.data.data?.token);
              break;
            }
            case "register": {
              const create = await userRegister(params, {
                skipErrorHandler: true,
              });
              toast.success(t("register.success", "Registration successful!"));
              onLogin(create.data.data?.token);
              break;
            }
            case "reset":
              await resetPassword(params);
              toast.success(t("reset.success", "Password reset successful!"));
              setFormType("login");
              break;
          }
          resolve(true);
        } catch (error) {
          if (formType === "register") {
            const code = getErrorCode(error);
            if (code === 20_001) {
              toast.error(
                t(
                  "register.emailExists",
                  "This email already exists, please try another email."
                )
              );
            } else if (code === 20_009) {
              // 邀请码错误（20009）：清空 localStorage 的 invite + 重置表单 invite 字段，
              // 否则邀请码输入框会被 localStorage 锁定（disabled），用户无法修改。
              localStorage.removeItem("invite");
              setInitialValues((prev) => ({ ...prev, invite: "" }));
              toast.error(
                getErrorMessage(error) ||
                  t(
                    "register.inviteError",
                    "Invitation code is invalid. Please check or leave it empty."
                  )
              );
            } else {
              toast.error(
                getErrorMessage(error) ||
                  t(
                    "register.failed",
                    "Registration failed. Please try again later."
                  )
              );
            }
          }
          resolve(false);
        }
      });
    });
  };

  let UserForm: ReactNode = null;
  switch (formType) {
    case "login":
      UserForm = (
        <LoginForm
          initialValues={initialValues}
          loading={loading}
          onSubmit={handleFormSubmit}
          onSwitchForm={setFormType}
          setInitialValues={setInitialValues}
        />
      );
      break;
    case "register":
      UserForm = (
        <RegisterForm
          initialValues={initialValues}
          loading={loading}
          onSubmit={handleFormSubmit}
          onSwitchForm={setFormType}
          setInitialValues={setInitialValues}
        />
      );
      break;
    case "reset":
      UserForm = (
        <ResetForm
          initialValues={initialValues}
          loading={loading}
          onSubmit={handleFormSubmit}
          onSwitchForm={setFormType}
          setInitialValues={setInitialValues}
        />
      );
      break;
  }

  return UserForm;
}
