import { useSession, signIn, signOut } from 'next-auth/client'

export default function Home() {
	//session情報を呼び出す
	const [session, loading] = useSession()

	//sessionがあればログイン状態
	if (session) {
		return (
			<>
				Signed in as {session.user.email}
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	} else {
		return (
			<>
				Not signed in <br />
				<button onClick={() => signIn()}>Sign in</button>
			</>
		)
	}
}
