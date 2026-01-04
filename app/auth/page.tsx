import { AuthForm } from "@/components/auth-form";

export default function AuthPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
            <AuthForm />
        </div>
    );
}
