"use client";

// firebase
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

// hooks
import { useState } from "react";
import { useToast } from "@/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";

// functions
import { registerUser } from "@/services/authService";
import { validateEmail } from "@/utils/helpers";

// components
import Logo from "@/components/Logo";

// style
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast("Invalid email address", "error");
      return;
    }
    setLoading(true);

    try {
      let firebaseUser;
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(result.user);
        firebaseUser = result.user;
      } catch (firebaseError) {
        if (firebaseError.code === "auth/email-already-in-use") {
          // Firebase user exists but may not be in DB — sign in to get the user
          const result = await signInWithEmailAndPassword(auth, email, password);
          firebaseUser = result.user;
        } else {
          throw firebaseError;
        }
      }
      await registerUser({ email, role });
      toast("Account ready! You can now log in.", "success");
      router.push("/auth/login");
    } catch (error) {
      toast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-[325px] flex flex-col items-center justify-center gap-12"
      onSubmit={handleSubmit}
    >
      <div className="cursor-pointer" onClick={() => router.push("/")}>
        <Logo className="w-[280px]" />
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-2xl font-semibold text-center">Create Account</h1>
        <p className="text-gray-500 text-center">
          Register to access the platform
        </p>
      </div>

      <div className="w-full flex flex-col items-end gap-2">
        <Input
          className="focus-visible:ring-primary-500"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          autoFocus
        />

        <Input
          className="focus-visible:ring-primary-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="your password"
        />

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-full focus:ring-primary-500">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="patient">Patient</SelectItem>
            <SelectItem value="doctor">Doctor</SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className="w-full"
          disabled={!email || password.length < 6 || loading}
        >
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Registering...
            </>
          ) : (
            "Register"
          )}
        </Button>
      </div>

      <div className="text-sm w-full flex justify-center">
        <span className="text-gray-500 mr-1">Already have an account?</span>
        <Link
          href="/auth/login"
          className="text-primary-500 font-semibold hover:underline"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
