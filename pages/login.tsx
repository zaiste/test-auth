import { CurrentUserDocument } from "../generated/graphql";
import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import { useQuery } from "@apollo/client";
import { UserCard } from "@/components/UserCard";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  const { signOut } = useSaleorAuthContext();
  const { data, loading } = useQuery(CurrentUserDocument)

  if (loading) return (<div>Loading...</div>)

  return (
    <section className="w-full">
      {data?.me ? (
        <>
          <UserCard {...data.me} />
          <div className="mt-4">
            <button className="bg-slate-800 text-slate-200 hover:bg-slate-700 rounded py-2 px-4" onClick={() => signOut()}>
              Log Out
            </button>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </section>
  )
};
