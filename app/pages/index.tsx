import { useSession, signIn, signOut } from 'next-auth/client'

export default function Home() {
	//session情報を呼び出す
	const [session, loading] = useSession()

	//sessionがあればログイン状態
	if (session) {
		return (
			<>
				It is next-auth@3.27 <br />
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	} else {
		return (
			<>
				It is next-auth@3.27 <br />
				Not signed in <br />
				<button onClick={() => signIn()}>Sign in</button>
			</>
		)
	}
}
