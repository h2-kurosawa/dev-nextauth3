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
		async redirect(url, baseUrl) {
			if (url.startsWith('/')) return new URL(url, baseUrl).toString()
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url
			return baseUrl
		},
		async session(session, _) {
			return session
		},
	},
})
