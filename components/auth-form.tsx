"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const router = useRouter();

    const handleSubmit = async () => {
        if (isSignIn) {
            await authClient.signIn.email({
                email,
                password,
            }, {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                }
            });
        } else {
            await authClient.signUp.email({
                email,
                password,
                name,
            }, {
                onSuccess: () => {
                    router.push("/");
                },
                onError: (ctx) => {
                    alert(ctx.error.message);
                }
            });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white dark:bg-zinc-900 dark:border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {isSignIn ? "Welcome Back" : "Create Account"}
            </h2>
            <div className="space-y-4">
                {!isSignIn && (
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                            placeholder="John Doe"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        placeholder="name@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        placeholder="••••••••"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                    {isSignIn ? "Sign In" : "Sign Up"}
                </button>
                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        {isSignIn
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
