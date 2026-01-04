"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui/core";
import { Loader2 } from "lucide-react";

export function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
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
                        setIsLoading(false);
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
                        setIsLoading(false);
                    }
                });
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500 mb-2">
                    OmniShift
                </h1>
                <h2 className="text-xl font-semibold text-foreground">
                    {isSignIn ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-sm text-secondary mt-2">
                    {isSignIn ? "Enter your credentials to access your dashboard" : "Sign up to get started"}
                </p>
            </div>

            <div className="space-y-4">
                {!isSignIn && (
                    <div>
                        <label className="block text-sm font-medium mb-1.5 text-secondary">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-secondary/10 border border-transparent focus:border-primary/50 focus:bg-secondary/20 outline-none transition-all text-foreground placeholder:text-secondary/50"
                            placeholder="John Doe"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-secondary">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-secondary/10 border border-transparent focus:border-primary/50 focus:bg-secondary/20 outline-none transition-all text-foreground placeholder:text-secondary/50"
                        placeholder="name@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1.5 text-secondary">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-secondary/10 border border-transparent focus:border-primary/50 focus:bg-secondary/20 outline-none transition-all text-foreground placeholder:text-secondary/50"
                        placeholder="••••••••"
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full mt-6"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {isSignIn ? "Sign In" : "Create Account"}
                </Button>

                <div className="text-center mt-6">
                    <button
                        onClick={() => setIsSignIn(!isSignIn)}
                        className="text-sm text-secondary hover:text-primary transition-colors"
                    >
                        {isSignIn
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </Card>
    );
}
