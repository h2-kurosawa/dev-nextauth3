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
		async signIn(_user, account, profile) {
			if (
				account.provider === 'google' &&
				profile.verified_email === true &&
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
