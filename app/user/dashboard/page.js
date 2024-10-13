import { auth, signOut } from "@/auth"
 
export default async function Page() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
    // console.log(session)
  return (
    <div>
        <br />
         <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
      <h1>{session.user.name}</h1>
      <h1>{session.user.role}</h1>
      <h1>{session.user.email}</h1>
    </div>
  )
}