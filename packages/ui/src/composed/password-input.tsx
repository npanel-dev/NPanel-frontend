import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  ref?: React.Ref<HTMLInputElement>;
  showPassword?: boolean;
  onShowPasswordChange?: (show: boolean) => void;
};

export function PasswordInput({
  className,
  disabled,
  ref,
  showPassword: showPasswordProp,
  onShowPasswordChange,
  ...props
}: PasswordInputProps) {
  const [internalShowPassword, setInternalShowPassword] = React.useState(false);
  const isControlled = showPasswordProp !== undefined;
  const showPassword = isControlled ? showPasswordProp : internalShowPassword;

  const toggleShowPassword = () => {
    const next = !showPassword;
    if (isControlled) {
      onShowPasswordChange?.(next);
      return;
    }
    setInternalShowPassword(next);
  };

  return (
    <div className={cn("relative w-full rounded-md", className)}>
      <Input
        className="pr-10"
        disabled={disabled}
        ref={ref}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <Button
        className="-translate-y-1/2 absolute end-1 top-1/2 h-6 w-6 rounded-md text-muted-foreground"
        disabled={disabled}
        onClick={toggleShowPassword}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </Button>
    </div>
  );
}
