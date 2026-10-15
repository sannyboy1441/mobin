import AdminLoginForm from "@/components/forms/AdminLoginForm";

export const metadata = {
  title: "Mob'in | Admin Login",
  description: "Log in to the Mob'in super admin panel.",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-sand-dark bg-white p-8 shadow-sm">
        <h1 className="text-center text-2xl font-semibold tracking-tight">
          Admin login
        </h1>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
