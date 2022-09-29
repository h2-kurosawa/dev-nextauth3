import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async signIn(_, account, profile) {
			console.log(account, profile)
			if (
				account.provider === 'google' &&
				profile.verified_email &&
				profile.email?.endsWith(process.env.PX_DOMAIN)
			) {
				return true
			} else {
				return false
			}
		},
		async session(session, _) {
			return session
		},
	},
})
